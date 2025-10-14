"use client";

import { useEffect, useRef } from "react";

export default function ToneSpectrum() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    const render = () => {
      frame += 1;
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);
      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, "rgba(55,231,255,0.05)");
      gradient.addColorStop(0.5, "rgba(55,231,255,0.6)");
      gradient.addColorStop(1, "rgba(55,231,255,0.05)");
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;

      ctx.beginPath();
      for (let x = 0; x <= width; x += 4) {
        const t = (x / width) * 4;
        const proto = Math.sin(t * 1.4 + frame * 0.01) * 20;
        const baseY = height / 2 + proto - Math.exp(-t) * 10;
        if (x === 0) ctx.moveTo(x, baseY);
        else ctx.lineTo(x, baseY);
      }
      ctx.stroke();

      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      ctx.strokeStyle = "rgba(255,255,255,0.35)";
      ctx.beginPath();
      for (let x = 0; x <= width; x += 6) {
        const t = (x / width) * 4;
        const control = Math.sin(t * 1.8 + frame * 0.014) * 14;
        const baseY = height / 2 + control;
        if (x === 0) ctx.moveTo(x, baseY);
        else ctx.lineTo(x, baseY);
      }
      ctx.stroke();
      ctx.restore();

      ctx.fillStyle = "rgba(255,255,255,0.08)";
      for (let i = 0; i < width; i += 32) {
        ctx.fillRect(i, 0, 1, height);
      }
      ctx.fillStyle = "rgba(255,255,255,0.18)";
      ctx.fillRect(0, height / 2, width, 1);

      requestAnimationFrame(render);
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const ratio = window.devicePixelRatio || 1;
      canvas.width = parent.clientWidth * ratio;
      canvas.height = parent.clientHeight * ratio;
      canvas.style.width = `${parent.clientWidth}px`;
      canvas.style.height = `${parent.clientHeight}px`;
    };

    resize();
    if (!prefersReducedMotion) {
      render();
    }
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="h-48 w-full rounded-xl bg-black/40" role="img" aria-label="Tone spectrum visualization" />;
}
