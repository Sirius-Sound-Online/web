"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

const sources = [
  {
    id: "prototype",
    label: "Sirius prototype",
    file: "/audio/prototype-loop.wav",
  },
  {
    id: "control",
    label: "Standard single coil",
    file: "/audio/standard-single-coil.wav",
  },
];

type ToneState = {
  source: "prototype" | "control";
  capacitance: number;
  load: number;
  blind: boolean;
};

const defaultState: ToneState = {
  source: "prototype",
  capacitance: 220,
  load: 500,
  blind: false,
};

export default function ToneLabPlayer() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [buffers, setBuffers] = useState<Record<string, AudioBuffer>>({});
  const [state, setState] = useState<ToneState>(defaultState);
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [guess, setGuess] = useState<"prototype" | "control" | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());
    const nextState: ToneState = {
      source: params.source === "control" ? "control" : "prototype",
      capacitance: params.capacitance ? Number(params.capacitance) : defaultState.capacitance,
      load: params.load ? Number(params.load) : defaultState.load,
      blind: params.blind === "true",
    };
    setState(nextState);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const updateUrl = () => {
      const params = new URLSearchParams();
      params.set("source", state.source);
      params.set("capacitance", state.capacitance.toString());
      params.set("load", state.load.toString());
      params.set("blind", String(state.blind));
      router.replace(`${pathname}?${params.toString()}`);
    };
    updateUrl();
  }, [router, pathname, state.source, state.capacitance, state.load, state.blind]);

  useEffect(() => {
    let animationId: number;

    const draw = () => {
      const canvas = canvasRef.current;
      const analyser = analyserRef.current;
      const dataArray = dataArrayRef.current as Uint8Array | null;
      if (!canvas || !analyser || !dataArray) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
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

  const loadBuffer = async (sourceId: string) => {
    if (buffers[sourceId]) return buffers[sourceId];
    const context = await ensureContext();
    setLoading(true);
    const sourceMeta = sources.find((item) => item.id === sourceId)!;
    const response = await fetch(sourceMeta.file);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await context.decodeAudioData(arrayBuffer);
    setBuffers((prev) => ({ ...prev, [sourceId]: audioBuffer }));
    setLoading(false);
    return audioBuffer;
  };

  const stopPlayback = () => {
    sourceNodeRef.current?.stop();
    sourceNodeRef.current?.disconnect();
    sourceNodeRef.current = null;
    setIsPlaying(false);
  };

  const startPlayback = async (sourceId: "prototype" | "control") => {
    const context = await ensureContext();
    const buffer = await loadBuffer(sourceId);
    stopPlayback();
    const sourceNode = context.createBufferSource();
    sourceNode.buffer = buffer;
    sourceNode.loop = true;
    const biquad = context.createBiquadFilter();
    biquad.type = "lowshelf";
    biquad.frequency.value = state.capacitance * 5; // simulated effect
    biquad.gain.value = (state.load - 500) / 40;
    sourceNode.connect(biquad);
    biquad.connect(gainRef.current!);
    sourceNode.start(0);
    sourceNodeRef.current = sourceNode;
    setIsPlaying(true);
  };

  useEffect(() => {
    if (!isPlaying) return;
    startPlayback(state.source).catch((error) => console.error(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.source, state.capacitance, state.load]);

  const handleSourceChange = (nextSource: "prototype" | "control") => {
    setState((prev) => ({ ...prev, source: nextSource }));
    track("tone-lab-source", { source: nextSource });
    if (isPlaying) {
      startPlayback(nextSource).catch(console.error);
    }
  };

  const toggleBlind = () => {
    setResult(null);
    setGuess(null);
    setState((prev) => ({ ...prev, blind: !prev.blind }));
    track("tone-lab-blind", { enabled: !state.blind });
  };

  const submitGuess = () => {
    if (!guess) return;
    setResult(guess === state.source ? "Correct" : "Try again");
    track("tone-lab-guess", { correct: guess === state.source });
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-[#0B0E12] p-6 text-sm text-white/80 shadow-smooth">
      <div className="grid gap-8 md:grid-cols-[2fr,1fr]">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            {sources.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSourceChange(item.id as "prototype" | "control")}
                className={`rounded-full px-4 py-2 text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 ${
                  state.source === item.id ? "bg-accent text-black" : "bg-white/5 text-white/70 hover:text-white"
                }`}
                type="button"
                aria-pressed={state.source === item.id}
              >
                {state.blind ? `Source ${sources.findIndex((s) => s.id === item.id) + 1}` : item.label}
              </button>
            ))}
            <button
              onClick={() => {
                if (isPlaying) {
                  stopPlayback();
                  track("tone-lab-play", { state: "pause" });
                } else {
                  startPlayback(state.source)
                    .then(() => track("tone-lab-play", { state: "play", source: state.source }))
                    .catch(console.error);
                }
              }}
              className="rounded-full border border-white/20 px-4 py-2 text-sm transition hover:border-accent hover:text-accent"
              type="button"
            >
              {isPlaying ? "Pause" : loading ? "Loading" : "Play loop"}
            </button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2">
              <span className="text-xs uppercase tracking-[0.3em] text-accent/80">Cable capacitance (pF)</span>
              <input
                type="range"
                min={100}
                max={500}
                step={10}
                value={state.capacitance}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  setState((prev) => ({ ...prev, capacitance: value }));
                  track("tone-lab-capacitance", { value });
                }}
                className="w-full"
              />
              <span>{state.capacitance} pF</span>
            </label>
            <label className="space-y-2">
              <span className="text-xs uppercase tracking-[0.3em] text-accent/80">Load (kΩ)</span>
              <input
                type="range"
                min={200}
                max={800}
                step={20}
                value={state.load}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  setState((prev) => ({ ...prev, load: value }));
                  track("tone-lab-load", { value });
                }}
                className="w-full"
              />
              <span>{state.load / 10} kΩ</span>
            </label>
          </div>
          <motion.div
            layout
            className="flex flex-wrap items-center gap-3 rounded-2xl border border-white/10 bg-black/30 p-4"
          >
            <div className="flex items-center gap-2">
              <input type="checkbox" checked={state.blind} onChange={toggleBlind} id="blind-mode" />
              <label htmlFor="blind-mode" className="text-xs uppercase tracking-[0.3em] text-accent/80">
                Blind mode
              </label>
            </div>
            {state.blind && (
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <p className="text-white/70">Guess which source is playing:</p>
                {sources.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setGuess(item.id as "prototype" | "control")}
                    className={`rounded-full px-3 py-1.5 ${
                      guess === item.id ? "bg-accent text-black" : "bg-white/10 text-white/70"
                    }`}
                    type="button"
                  >
                    {item.label}
                  </button>
                ))}
                <button
                  onClick={submitGuess}
                  className="rounded-full border border-white/20 px-3 py-1.5 text-white/70 hover:border-accent hover:text-accent"
                  type="button"
                >
                  Submit
                </button>
                {result && <span className="text-accent">{result}</span>}
              </div>
            )}
          </motion.div>
        </div>
        <div className="flex flex-col gap-4">
          <canvas ref={canvasRef} className="h-56 w-full rounded-2xl border border-white/10 bg-black" />
          <div className="rounded-2xl border border-white/10 bg-black/40 p-4 text-xs text-zinc-400">
            <p className="text-white/80">Session log</p>
            <ul className="mt-2 space-y-1">
              <li>
                <strong className="text-accent">Source:</strong> {state.source === "prototype" ? "Prototype" : "Control"}
              </li>
              <li>
                <strong className="text-accent">Capacitance:</strong> {state.capacitance} pF
              </li>
              <li>
                <strong className="text-accent">Load:</strong> {state.load / 10} kΩ
              </li>
              <li>
                <strong className="text-accent">Blind mode:</strong> {state.blind ? "On" : "Off"}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
