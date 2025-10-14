import { Metadata } from "next";
import PreorderForm from "@/components/preorder-form";

export const metadata: Metadata = {
  title: "Pre-order",
  description:
    "Reserve a Sirius/Serious Sound pickup set with manual Stripe capture. Review refundable deposit terms and shipping windows.",
};

export default function PreorderPage() {
  return (
    <main className="bg-[#050608]">
      <div className="mx-auto w-full max-w-4xl px-6 py-16 sm:px-8">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-accent">Pre-order</p>
          <h1 className="font-display text-4xl text-white">Reserve your pickup set</h1>
          <p className="text-base text-zinc-300">
            We authorise (not capture) $99 via Stripe. When the launch batch is ready, you’ll receive a confirmation email
            7 days prior to capture. Cancel anytime for a full refund.
          </p>
        </header>
        <section className="mt-10 grid gap-6 rounded-3xl border border-white/10 bg-[#0C0F13] p-8 md:grid-cols-[1.2fr,1fr]">
          <PreorderForm />
          <aside className="space-y-4 rounded-2xl border border-white/10 bg-black/40 p-6 text-sm text-zinc-300">
            <h2 className="text-lg font-semibold text-white">Launch policy</h2>
            <ul className="space-y-2 text-xs text-zinc-400" id="policy">
              <li>Deposit: $99, fully refundable until capture.</li>
              <li>Estimated ship window: Q3 2024 for early supporters.</li>
              <li>Capture occurs once your serial is ready; you’ll get an email 7 days prior.</li>
              <li>Returns: 30 days after delivery, minus shipping fee.</li>
              <li>Need assistance? Email preorder@sirius-sound.example.</li>
            </ul>
          </aside>
        </section>
      </div>
    </main>
  );
}
