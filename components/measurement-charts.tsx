"use client";

import { useEffect, useRef } from "react";

const responseData = [
  { freq: 80, proto: -2.1, control: -1.4 },
  { freq: 150, proto: -1.3, control: -2.4 },
  { freq: 400, proto: -0.4, control: -1.6 },
  { freq: 800, proto: 0.2, control: -1.2 },
  { freq: 1200, proto: 0.8, control: -0.6 },
  { freq: 1800, proto: 1.5, control: -0.3 },
  { freq: 2400, proto: 2.0, control: -0.6 },
  { freq: 3200, proto: 1.6, control: -1.4 },
  { freq: 4200, proto: 1.2, control: -2.2 },
  { freq: 5200, proto: 0.3, control: -3.1 },
];

const thdData = [
  { freq: 80, proto: 0.12, control: 0.22 },
  { freq: 400, proto: 0.1, control: 0.18 },
  { freq: 800, proto: 0.09, control: 0.17 },
  { freq: 1500, proto: 0.08, control: 0.19 },
  { freq: 2500, proto: 0.11, control: 0.24 },
  { freq: 4000, proto: 0.15, control: 0.29 },
];

function renderChart(canvas: HTMLCanvasElement, data: typeof responseData, options: { label: string; maxY: number; minY: number; unit: string; }) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const ratio = window.devicePixelRatio || 1;
  const width = canvas.clientWidth * ratio;
  const height = canvas.clientHeight * ratio;
  canvas.width = width;
  canvas.height = height;
  ctx.clearRect(0, 0, width, height);

  ctx.strokeStyle = "rgba(255,255,255,0.15)";
  ctx.lineWidth = 1;
  const lines = 4;
  for (let i = 0; i <= lines; i++) {
    const y = (height / lines) * i;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  const mapY = (value: number) => {
    const { maxY, minY } = options;
    return height - ((value - minY) / (maxY - minY)) * height;
  };

  const mapX = (index: number) => (index / (data.length - 1)) * width;

  ctx.lineWidth = 3;
  ctx.strokeStyle = "#37E7FF";
  ctx.beginPath();
  data.forEach((point, index) => {
    const x = mapX(index);
    const y = mapY(point.proto);
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();

  ctx.strokeStyle = "rgba(255,255,255,0.5)";
  ctx.beginPath();
  data.forEach((point, index) => {
    const x = mapX(index);
    const y = mapY(point.control);
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();

  ctx.fillStyle = "#37E7FF";
  ctx.font = `${14 * ratio}px Inter`;
  ctx.fillText(options.label, 16 * ratio, 28 * ratio);
}

export default function MeasurementCharts() {
  const responseRef = useRef<HTMLCanvasElement>(null);
  const thdRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const handle = () => {
      if (responseRef.current) {
        renderChart(responseRef.current, responseData, {
          label: "Frequency response (dB)",
          maxY: 4,
          minY: -4,
          unit: "dB",
        });
      }
      if (thdRef.current) {
        renderChart(thdRef.current, thdData as any, {
          label: "THD (%)",
          maxY: 0.35,
          minY: 0.05,
          unit: "%",
        });
      }
    };
    handle();
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <figure className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-black/40 p-6">
        <canvas ref={responseRef} className="h-64 w-full" role="img" aria-label="Frequency response comparison" />
        <figcaption className="text-sm text-zinc-400">
          Prototype vs. control single coil. Measured with sweep at -10 dBV.
        </figcaption>
      </figure>
      <figure className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-black/40 p-6">
        <canvas ref={thdRef} className="h-64 w-full" role="img" aria-label="THD comparison" />
        <figcaption className="text-sm text-zinc-400">Total harmonic distortion across spectrum.</figcaption>
      </figure>
    </div>
  );
}
