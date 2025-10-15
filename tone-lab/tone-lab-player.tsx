"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Sample = {
  id: string;
  audioFile: string;
  label: string;
};

type PickupOption = {
  value: string;
  label: string;
};

type SampleRating = {
  sampleId: string;
  rating: number;
  guessedName: string;
  playCount: number;
};

type TestResult = {
  sample: {
    id: string;
    name: string;
    guitar: string;
    position: string;
    description: string;
    audioFile: string;
    isSirius: boolean;
  };
  userRating: number;
  userGuess: string | null;
  playCount: number;
  averageRating: number;
  totalRatings: number;
};

export default function ToneLabPlayer() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [samples, setSamples] = useState<Sample[]>([]);
  const [pickupOptions, setPickupOptions] = useState<PickupOption[]>([]);
  const [buffers, setBuffers] = useState<Record<string, AudioBuffer>>({});
  const [loading, setLoading] = useState(false);
  const [currentSample, setCurrentSample] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [testId, setTestId] = useState<string | null>(null);
  const [ratings, setRatings] = useState<Record<string, SampleRating>>({});
  const [playCounts, setPlayCounts] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<TestResult[]>([]);
  const [submitting, setSubmitting] = useState(false);

  // Initialize test session and fetch samples
  useEffect(() => {
    const initTest = async () => {
      try {
        // Create test session
        const testRes = await fetch("/api/tone-lab/test", {
          method: "POST",
        });
        const testData = await testRes.json();
        setTestId(testData.testId);

        // Fetch samples and pickup options
        const samplesRes = await fetch("/api/tone-lab/samples");
        const samplesData = await samplesRes.json();
        setSamples(samplesData.samples);
        setPickupOptions(samplesData.pickupOptions);

        // Initialize play counts
        const counts: Record<string, number> = {};
        samplesData.samples.forEach((s: Sample) => {
          counts[s.id] = 0;
        });
        setPlayCounts(counts);
      } catch (error) {
        console.error("Error initializing test:", error);
      }
    };

    initTest();
  }, []);

  // Initialize audio context (not on mount, wait for user gesture)
  const ensureContext = async () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 2048;
      dataArrayRef.current = new Uint8Array(analyserRef.current.frequencyBinCount);

      gainRef.current = audioContextRef.current.createGain();
      gainRef.current.connect(analyserRef.current);
      analyserRef.current.connect(audioContextRef.current.destination);
    }
    const context = audioContextRef.current!;
    if (context.state === "suspended") {
      await context.resume();
    }
    return context;
  };

  // Visualization draw loop
  useEffect(() => {
    let animationId: number;

    const draw = () => {
      const canvas = canvasRef.current;
      const analyser = analyserRef.current;
      const dataArray = dataArrayRef.current as Uint8Array | null;
      if (!canvas || !analyser || !dataArray) {
        animationId = requestAnimationFrame(draw);
        return;
      }
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        animationId = requestAnimationFrame(draw);
        return;
      }
      const ratio = window.devicePixelRatio || 1;
      const width = canvas.clientWidth * ratio;
      const height = canvas.clientHeight * ratio;
      canvas.width = width;
      canvas.height = height;
      analyser.getByteFrequencyData(dataArray as unknown as Uint8Array<ArrayBuffer>);
      ctx.fillStyle = "rgba(5, 7, 10, 0.9)";
      ctx.fillRect(0, 0, width, height);
      const barWidth = (width / dataArray.length) * 2.5;
      let x = 0;
      for (let i = 0; i < dataArray.length; i++) {
        const barHeight = dataArray[i] * 0.9;
        const gradient = ctx.createLinearGradient(0, height, 0, height - barHeight);
        gradient.addColorStop(0, "rgba(55,231,255,0)");
        gradient.addColorStop(0.7, "rgba(55,231,255,0.4)");
        gradient.addColorStop(1, "rgba(55,231,255,0.9)");
        ctx.fillStyle = gradient;
        ctx.fillRect(x, height - barHeight, barWidth, barHeight);
        x += barWidth + 1;
      }
      animationId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animationId);
  }, []);

  const track = (eventName: string, props?: Record<string, unknown>) => {
    if (typeof window !== "undefined" && (window as any).plausible) {
      (window as any).plausible(eventName, { props });
    }
  };

  const loadBuffer = async (sampleId: string) => {
    if (buffers[sampleId]) return buffers[sampleId];
    const context = await ensureContext();
    setLoading(true);
    const sample = samples.find((s) => s.id === sampleId)!;
    const response = await fetch(sample.audioFile);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await context.decodeAudioData(arrayBuffer);
    setBuffers((prev) => ({ ...prev, [sampleId]: audioBuffer }));
    setLoading(false);
    return audioBuffer;
  };

  const stopPlayback = () => {
    sourceNodeRef.current?.stop();
    sourceNodeRef.current?.disconnect();
    sourceNodeRef.current = null;
    setIsPlaying(false);
  };

  const startPlayback = async (sampleId: string) => {
    const context = await ensureContext();
    const buffer = await loadBuffer(sampleId);
    stopPlayback();

    const sourceNode = context.createBufferSource();
    sourceNode.buffer = buffer;
    sourceNode.loop = true;
    sourceNode.connect(gainRef.current!);
    sourceNode.start(0);
    sourceNodeRef.current = sourceNode;
    setIsPlaying(true);
    setCurrentSample(sampleId);

    // Increment play count
    setPlayCounts((prev) => ({
      ...prev,
      [sampleId]: (prev[sampleId] || 0) + 1,
    }));

    track("tone-lab-play", { sampleId });
  };

  const handleRating = (sampleId: string, rating: number) => {
    setRatings((prev) => ({
      ...prev,
      [sampleId]: {
        ...prev[sampleId],
        sampleId,
        rating,
        guessedName: prev[sampleId]?.guessedName || "",
        playCount: playCounts[sampleId] || 0,
      },
    }));
    track("tone-lab-rating", { sampleId, rating });
  };

  const handleGuess = (sampleId: string, pickupName: string) => {
    setRatings((prev) => ({
      ...prev,
      [sampleId]: {
        ...prev[sampleId],
        sampleId,
        rating: prev[sampleId]?.rating || 0,
        guessedName: pickupName,
        playCount: playCounts[sampleId] || 0,
      },
    }));
  };

  const handleSubmit = async () => {
    if (!testId) return;

    // Check if all samples are rated
    const allRated = samples.every((s) => ratings[s.id]?.rating);
    if (!allRated) {
      alert("Please rate all samples before submitting");
      return;
    }

    // Check if all samples have guesses
    const allGuessed = samples.every((s) => ratings[s.id]?.guessedName);
    if (!allGuessed) {
      alert("Please guess which pickup each sample is");
      return;
    }

    setSubmitting(true);
    stopPlayback();

    try {
      // Save all ratings and guesses
      await Promise.all(
        samples.map((s) =>
          fetch("/api/tone-lab/rating", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              testId,
              sampleId: s.id,
              rating: ratings[s.id].rating,
              playCount: playCounts[s.id] || 0,
              guessedName: ratings[s.id].guessedName,
            }),
          })
        )
      );

      // Submit test
      await fetch(`/api/tone-lab/test/${testId}/submit`, {
        method: "POST",
      });

      // Fetch results
      const resultsRes = await fetch(`/api/tone-lab/test/${testId}/results`);
      const resultsData = await resultsRes.json();
      setResults(resultsData.results);
      setShowResults(true);

      track("tone-lab-submit", { testId });
    } catch (error) {
      console.error("Error submitting test:", error);
      alert("Failed to submit test. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const allRated = samples?.length > 0 && samples.every((s) => ratings[s.id]?.rating);
  const allGuessed = samples?.length > 0 && samples.every((s) => ratings[s.id]?.guessedName);
  const canSubmit = allRated && allGuessed;

  // Show loading state while samples are being fetched
  if (!samples || samples.length === 0) {
    return (
      <div className="rounded-3xl border border-white/10 bg-[#0B0E12] p-6 text-center text-white/80">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-accent border-t-transparent" />
          <p className="mt-4 text-sm">Loading samples...</p>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="rounded-3xl border border-white/10 bg-[#0B0E12] p-6 text-sm text-white/80 shadow-smooth">
        <h2 className="mb-6 text-3xl font-bold text-white">Test Results</h2>
        <div className="space-y-6">
          {results.map((result, idx) => (
            <motion.div
              key={result.sample.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`rounded-2xl border p-6 ${
                result.sample.isSirius
                  ? "border-accent/30 bg-accent/5"
                  : "border-white/10 bg-black/30"
              }`}
            >
              <div className="mb-4 flex items-start gap-4">
                <button
                  onClick={async () => {
                    if (isPlaying && currentSample === result.sample.id) {
                      stopPlayback();
                    } else {
                      const context = await ensureContext();
                      let buffer = buffers[result.sample.id];
                      if (!buffer) {
                        setLoading(true);
                        setCurrentSample(result.sample.id);
                        const response = await fetch(result.sample.audioFile);
                        const arrayBuffer = await response.arrayBuffer();
                        buffer = await context.decodeAudioData(arrayBuffer);
                        setBuffers((prev) => ({ ...prev, [result.sample.id]: buffer }));
                        setLoading(false);
                      }
                      stopPlayback();
                      const sourceNode = context.createBufferSource();
                      sourceNode.buffer = buffer;
                      sourceNode.loop = true;
                      sourceNode.connect(gainRef.current!);
                      sourceNode.start(0);
                      sourceNodeRef.current = sourceNode;
                      setIsPlaying(true);
                      setCurrentSample(result.sample.id);
                    }
                  }}
                  className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-4 transition-all ${
                    currentSample === result.sample.id && isPlaying
                      ? "border-accent bg-accent text-black shadow-lg shadow-accent/50 scale-110"
                      : "border-accent/60 bg-accent/20 text-accent hover:border-accent hover:bg-accent/30 hover:scale-105 shadow-lg"
                  }`}
                  type="button"
                  disabled={loading && currentSample === result.sample.id}
                >
                  {loading && currentSample === result.sample.id ? (
                    <div className="h-7 w-7 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  ) : currentSample === result.sample.id && isPlaying ? (
                    <div className="flex gap-1">
                      <div className="h-6 w-1.5 bg-current" />
                      <div className="h-6 w-1.5 bg-current" />
                    </div>
                  ) : (
                    <div className="ml-1 h-0 w-0 border-y-[9px] border-l-[14px] border-y-transparent border-l-accent" />
                  )}
                </button>
                <div className="flex flex-1 items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-accent">{result.sample.name}</h3>
                      {result.sample.isSirius && (
                        <span className="rounded-full bg-accent px-2 py-0.5 text-xs font-bold text-black">
                          SIRIUS
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-white/60">
                      {result.sample.guitar} • {result.sample.position}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-white/60">Your Rating</div>
                    <div className="text-2xl font-bold text-white">{result.userRating}/10</div>
                  </div>
                </div>
              </div>
              {result.sample.description && (
                <p className="mb-4 text-sm text-white/70">{result.sample.description}</p>
              )}
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-xl bg-black/40 p-4">
                  <div className="text-xs uppercase tracking-wider text-accent/80">Community Average</div>
                  <div className="mt-1 text-2xl font-bold text-white">{result.averageRating.toFixed(1)}/10</div>
                  <div className="mt-1 text-xs text-white/50">{result.totalRatings} ratings</div>
                </div>
                <div className="rounded-xl bg-black/40 p-4">
                  <div className="text-xs uppercase tracking-wider text-accent/80">Total Plays</div>
                  <div className="mt-1 text-2xl font-bold text-white">{result.playCount}</div>
                  <div className="mt-1 text-xs text-white/50">by all users</div>
                </div>
                {result.userGuess && (
                  <div className="rounded-xl bg-black/40 p-4">
                    <div className="text-xs uppercase tracking-wider text-accent/80">Your Guess</div>
                    <div className="mt-1 text-sm text-white">{result.userGuess}</div>
                    <div className="mt-1 text-xs">
                      {result.userGuess === result.sample.name ? (
                        <span className="text-green-400">✓ Correct!</span>
                      ) : (
                        <span className="text-red-400">Incorrect</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 rounded-full bg-accent px-8 py-3 text-sm font-medium text-black transition hover:bg-accent/90"
          type="button"
        >
          Take Another Test
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-[#0B0E12] p-6 text-sm text-white/80 shadow-smooth">
      <div className="mb-6">
        <h2 className="mb-2 text-3xl font-bold text-white">Pickup Blind Test</h2>
        <p className="text-white/70">
          Listen to 3 different neck pickups on the same guitar. One is a Sirius pickup - can you identify it?
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
        <div className="space-y-4">
          {samples.map((sample, idx) => (
            <motion.div
              key={sample.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group rounded-2xl border border-white/10 bg-gradient-to-br from-black/40 to-black/20 p-6 backdrop-blur-sm transition hover:border-accent/30"
            >
              <div className="mb-4 flex items-center gap-4">
                <button
                  onClick={() => {
                    if (isPlaying && currentSample === sample.id) {
                      stopPlayback();
                    } else {
                      startPlayback(sample.id);
                    }
                  }}
                  className={`flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-4 transition-all ${
                    currentSample === sample.id && isPlaying
                      ? "border-accent bg-accent text-black shadow-lg shadow-accent/50 scale-110"
                      : "border-accent/60 bg-accent/20 text-accent hover:border-accent hover:bg-accent/30 hover:scale-105 shadow-lg"
                  }`}
                  type="button"
                  disabled={loading && currentSample === sample.id}
                >
                  {loading && currentSample === sample.id ? (
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  ) : currentSample === sample.id && isPlaying ? (
                    <div className="flex gap-1.5">
                      <div className="h-7 w-1.5 bg-current" />
                      <div className="h-7 w-1.5 bg-current" />
                    </div>
                  ) : (
                    <div className="ml-1 h-0 w-0 border-y-[10px] border-l-[16px] border-y-transparent border-l-accent" />
                  )}
                </button>
                <div className="flex-1">
                  <div className="text-xl font-bold text-white">{sample.label}</div>
                  <div className="text-xs text-white/50">Played {playCounts[sample.id] || 0} times</div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor={`rating-${sample.id}`} className="mb-2 block text-xs uppercase tracking-wider text-accent/80">
                    Rate this sample
                  </label>
                  <select
                    id={`rating-${sample.id}`}
                    value={ratings[sample.id]?.rating || ""}
                    onChange={(e) => handleRating(sample.id, Number(e.target.value))}
                    className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-white focus:border-accent focus:outline-none"
                  >
                    <option value="">Select rating...</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                      <option key={value} value={value}>
                        {value}/10 {value >= 8 ? "⭐" : value >= 5 ? "👍" : ""}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor={`guess-${sample.id}`} className="mb-2 block text-xs uppercase tracking-wider text-accent/80">
                    Which pickup is this?
                  </label>
                  <select
                    id={`guess-${sample.id}`}
                    value={ratings[sample.id]?.guessedName || ""}
                    onChange={(e) => handleGuess(sample.id, e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white focus:border-accent focus:outline-none"
                  >
                    <option value="">Select pickup...</option>
                    {pickupOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
          ))}

          <AnimatePresence>
            {canSubmit && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={handleSubmit}
                disabled={submitting}
                className="w-full rounded-full bg-gradient-to-r from-accent to-accent/80 px-8 py-4 text-base font-medium text-black shadow-lg shadow-accent/30 transition hover:shadow-accent/50 disabled:opacity-50"
                type="button"
              >
                {submitting ? "Submitting..." : "Submit Test & See Results"}
              </motion.button>
            )}
          </AnimatePresence>

          {!canSubmit && (
            <div className="rounded-xl border border-white/5 bg-black/20 p-4 text-center text-sm text-white/50">
              {!allRated && "Please rate all samples"}
              {allRated && !allGuessed && "Please guess which pickup each sample is"}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-black">
            <canvas ref={canvasRef} className="h-48 w-full" />
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/40 p-4 text-xs">
            <p className="mb-3 font-medium text-white/80">Test Progress</p>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-white/60">Samples rated:</span>
                <span className="font-medium text-accent">
                  {samples.filter((s) => ratings[s.id]?.rating).length}/{samples.length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/60">Guesses made:</span>
                <span className="font-medium text-accent">
                  {samples.filter((s) => ratings[s.id]?.guessedName).length}/{samples.length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/60">Total plays:</span>
                <span className="font-medium text-accent">{Object.values(playCounts).reduce((a, b) => a + b, 0)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
