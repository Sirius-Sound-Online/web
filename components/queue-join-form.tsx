"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const queueSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  consent: z.boolean().refine((value) => value === true, { message: "You must accept the terms" }),
});

type QueueValues = z.infer<typeof queueSchema>;

export default function QueueJoinForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QueueValues>({
    resolver: zodResolver(queueSchema),
    defaultValues: {
      consent: false,
    },
  });

  const onSubmit = async (values: QueueValues) => {
    setStatus("loading");
    setMessage(null);
    try {
      const response = await fetch("/api/queue/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to join queue");
      }

      setStatus("success");
      setMessage(`Redirecting to checkout... You'll be queue #${data.queueNumber}`);
      window.location.href = data.url;
    } catch (error) {
      console.error(error);
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Unable to start checkout. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <label className="block">
          <span className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">Email</span>
          <input
            type="email"
            {...register("email")}
            placeholder="you@example.com"
            className="mt-2 w-full rounded-xl border border-white/10 bg-black/60 px-5 py-4 text-base text-white placeholder-zinc-500 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
          />
          {errors.email && <p className="mt-2 text-sm text-rose-400">{errors.email.message}</p>}
        </label>

        <label className="flex items-start gap-3 text-sm text-zinc-300">
          <input
            type="checkbox"
            {...register("consent")}
            className="mt-1 h-5 w-5 rounded border-white/20 bg-black/60 text-accent focus:ring-accent"
          />
          <span>
            I understand this is a $100 deposit that reserves my place in the queue. I'll pay the remaining $450 when
            my pickup is ready to ship. This is a handmade product with lead times. Read the{" "}
            <a href="#terms" className="underline underline-offset-4 hover:text-accent">
              full terms
            </a>
            .
          </span>
        </label>
        {errors.consent && <p className="text-sm text-rose-400">{errors.consent.message}</p>}
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-full bg-accent px-8 py-4 text-base font-semibold text-black transition hover:bg-accent/90 disabled:cursor-wait disabled:opacity-60"
      >
        {status === "loading" ? "Preparing checkout..." : "Join the Queue — $100"}
      </button>

      {message && (
        <div
          className={`rounded-xl border p-4 text-center text-sm ${
            status === "error"
              ? "border-rose-500/20 bg-rose-500/10 text-rose-400"
              : "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
          }`}
        >
          {message}
        </div>
      )}
    </form>
  );
}
