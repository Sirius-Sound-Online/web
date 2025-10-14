"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const preorderSchema = z.object({
  email: z.string().email(),
  quantity: z.number().min(1).max(4),
  pickupFormat: z.enum(["s-style", "tele-neck", "p90"]),
  consent: z.boolean().refine((value) => value === true, { message: "Accepting terms is required" }),
});

type PreorderValues = z.infer<typeof preorderSchema>;

export default function PreorderForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PreorderValues>({
    resolver: zodResolver(preorderSchema),
    defaultValues: {
      quantity: 1,
      pickupFormat: "s-style",
      consent: false,
    },
  });

  const onSubmit = async (values: PreorderValues) => {
    setStatus("loading");
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        throw new Error("Checkout failed");
      }
      const { url } = await response.json();
      setStatus("success");
      setMessage("Redirecting to Stripe Checkout…");
      window.location.href = url;
    } catch (error) {
      console.error(error);
      setStatus("error");
      setMessage("Unable to start checkout. Please retry in a moment.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-sm text-zinc-300">
      <h2 className="text-lg font-semibold text-white">Reserve spot</h2>
      <label className="block">
        <span className="text-xs uppercase tracking-[0.3em] text-accent/80">Email</span>
        <input
          type="email"
          {...register("email")}
          className="mt-2 w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-white focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
        />
        {errors.email && <p className="mt-1 text-xs text-rose-400">{errors.email.message}</p>}
      </label>
      <label className="block">
        <span className="text-xs uppercase tracking-[0.3em] text-accent/80">Quantity</span>
        <input
          type="number"
          min={1}
          max={4}
          {...register("quantity", { valueAsNumber: true })}
          className="mt-2 w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-white focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
        />
        {errors.quantity && <p className="mt-1 text-xs text-rose-400">{errors.quantity.message}</p>}
      </label>
      <label className="block">
        <span className="text-xs uppercase tracking-[0.3em] text-accent/80">Format</span>
        <select
          {...register("pickupFormat")}
          className="mt-2 w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-white focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
        >
          <option value="s-style">S-Style (54mm/52mm)</option>
          <option value="tele-neck">Tele neck</option>
          <option value="p90">P90 route</option>
        </select>
        {errors.pickupFormat && <p className="mt-1 text-xs text-rose-400">{errors.pickupFormat.message}</p>}
      </label>
      <label className="flex items-start gap-3 text-xs text-zinc-400">
        <input type="checkbox" {...register("consent")} className="mt-1 h-4 w-4 rounded border-white/20" />
        <span>
          I agree to the refundable deposit terms and understand my payment will be manually captured later. Read the
          <a href="#policy" className="ml-1 underline underline-offset-4">
            policy
          </a>
          .
        </span>
      </label>
      {errors.consent && <p className="text-xs text-rose-400">{errors.consent.message}</p>}
      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex w-full items-center justify-center rounded-full bg-accent px-6 py-3 font-semibold text-black transition hover:bg-accent-600 disabled:cursor-wait disabled:opacity-60"
      >
        {status === "loading" ? "Preparing…" : "Start checkout"}
      </button>
      {message && (
        <p className={`text-xs ${status === "error" ? "text-rose-400" : "text-emerald-400"}`}>{message}</p>
      )}
    </form>
  );
}
