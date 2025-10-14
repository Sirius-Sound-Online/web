import { Metadata } from "next";
import DonateForm from "@/components/donate-form";

export const metadata: Metadata = {
  title: "Donate",
  description: "Support Sirius/Serious Sound R&D with one-time contributions via Stripe Checkout.",
};

export default function DonatePage() {
  return (
    <main className="bg-[#050608]">
      <div className="mx-auto w-full max-w-4xl px-6 py-16 sm:px-8">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-accent">Support</p>
          <h1 className="font-display text-4xl text-white">Fuel the R&D cadence</h1>
          <p className="text-base text-zinc-300">
            Donations keep our measurement rigs calibrated, cover road cases for tour testing, and support community sound
            designers. Every contribution gets a thank-you note and optional Hall of Backers listing.
          </p>
        </header>
        <section className="mt-10 grid gap-6 rounded-3xl border border-white/10 bg-[#0C0F13] p-8 md:grid-cols-[1.1fr,1fr]">
          <DonateForm />
          <aside className="space-y-4 rounded-2xl border border-white/10 bg-black/40 p-6 text-sm text-zinc-300">
            <h2 className="text-lg font-semibold text-white">Perks</h2>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>Access exclusive Tone Lab presets and measurement sessions.</li>
              <li>Optional listing in the Hall of Backers with your handle.</li>
              <li>Monthly behind-the-scenes video drop.</li>
            </ul>
          </aside>
        </section>
        <section className="mt-12 space-y-4">
          <h2 className="font-display text-2xl text-white">Hall of backers</h2>
          <ul className="grid gap-3 text-sm text-zinc-400 sm:grid-cols-2">
            {["@tonecraft", "@luthierlabs", "@mixgoddess"].map((name) => (
              <li key={name} className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3">
                {name}
              </li>
            ))}
            <li className="rounded-2xl border border-dashed border-accent/40 bg-black/20 px-4 py-3 text-accent/80">
              Your name goes here—opt in after donating.
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
