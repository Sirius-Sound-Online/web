"use client";

import { useState } from "react";

const AMOUNTS = [25, 50, 99, 150, 250];

export default function DonateForm() {
  const [amount, setAmount] = useState(50);
  const [custom, setCustom] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = custom ? Number(custom) : amount;
    if (!value || Number.isNaN(value)) {
      setMessage("Enter a valid amount");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: Math.round(value * 100) }),
      });
      if (!res.ok) throw new Error("Failed");
      const { url } = await res.json();
      window.location.href = url;
    } catch (error) {
      console.error(error);
      setStatus("error");
      setMessage("Unable to launch checkout. Try again soon.");
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 text-sm text-zinc-300">
      <h2 className="text-lg font-semibold text-white">Choose amount</h2>
      <div className="flex flex-wrap gap-2">
        {AMOUNTS.map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => {
              setAmount(value);
              setCustom("");
            }}
            className={`rounded-full px-4 py-2 text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 ${
              amount === value && !custom ? "bg-accent text-black" : "bg-white/5 text-white/70 hover:text-white"
            }`}
          >
            ${value}
          </button>
        ))}
      </div>
      <label className="block">
        <span className="text-xs uppercase tracking-[0.3em] text-accent/80">Custom amount</span>
        <input
          type="number"
          min={5}
          step={5}
          value={custom}
          onChange={(event) => {
            setCustom(event.target.value);
          }}
          className="mt-2 w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-white focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
          placeholder="Enter amount"
        />
      </label>
      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex w-full items-center justify-center rounded-full bg-accent px-6 py-3 font-semibold text-black transition hover:bg-accent-600 disabled:cursor-wait disabled:opacity-70"
      >
        {status === "loading" ? "Processing…" : "Donate via Stripe"}
      </button>
      {message && <p className={`text-xs ${status === "error" ? "text-rose-400" : "text-emerald-400"}`}>{message}</p>}
    </form>
  );
}
