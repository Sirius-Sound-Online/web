"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const waitlistSchema = z.object({
  email: z.string().email(),
  role: z.enum(["player", "producer", "luthier", "engineer", "retailer", "partner"]),
  consent: z.boolean().refine((value) => value === true, {
    message: "Consent is required",
  }),
});

type WaitlistFormValues = z.infer<typeof waitlistSchema>;

export default function WaitlistForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<WaitlistFormValues>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: {
      role: "player",
      consent: false,
    },
  });

  const onSubmit = async (values: WaitlistFormValues) => {
    setStatus("loading");
    setMessage(null);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        throw new Error("Failed to register");
      }
      reset();
      setStatus("success");
      setMessage("Check your inbox for the confirmation email.");
    } catch (error) {
      console.error(error);
      setStatus("error");
      setMessage("We hit a snag. Please try again or email hello@sirius-sound.example.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-6 rounded-2xl border border-white/10 bg-black/40 p-6 sm:grid-cols-[1.5fr,1fr] sm:items-end"
    >
      <div className="grid gap-4">
        <label className="space-y-2 text-sm text-zinc-400">
          Email
          <input
            type="email"
            aria-label="Email address"
            placeholder="you@example.com"
            {...register("email")}
            className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-base text-white shadow-inner focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
          />
          {errors.email && <p className="text-xs text-rose-400">{errors.email.message}</p>}
        </label>
        <label className="space-y-2 text-sm text-zinc-400">
          Primary role
          <select
            {...register("role")}
            className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-base text-white shadow-inner focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="player">Player / guitarist</option>
            <option value="producer">Producer</option>
            <option value="luthier">Luthier / builder</option>
            <option value="engineer">Sound engineer</option>
            <option value="retailer">Retail / distribution</option>
            <option value="partner">Manufacturing partner</option>
          </select>
        </label>
      </div>
      <div className="space-y-4 text-sm text-zinc-300">
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            {...register("consent")}
            className="mt-1 h-4 w-4 rounded border-white/20 bg-black/50 text-accent focus:ring-accent"
          />
          <span>
            I agree to receive pre-release updates and understand we use double opt-in. See{" "}
            <a href="/privacy" className="underline underline-offset-2">
              privacy notice.
            </a>
          </span>
        </label>
        {errors.consent && <p className="text-xs text-rose-400">{errors.consent.message}</p>}
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex w-full items-center justify-center rounded-full bg-accent px-6 py-3 font-semibold text-black transition hover:bg-accent-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-wait disabled:opacity-70"
        >
          {status === "loading" ? "Sending…" : "Join waitlist"}
        </button>
        {message && (
          <p className={`text-xs ${status === "error" ? "text-rose-400" : "text-emerald-400"}`}>{message}</p>
        )}
      </div>
    </form>
  );
}
