import { Metadata } from "next";
import QueueJoinForm from "@/components/queue-join-form";

export const metadata: Metadata = {
  title: "Join the Queue",
  description:
    "Secure your place in line for a handcrafted Sirius Sound pickup. Reserve with $100, get exclusive access, and customize your order.",
};

export default function JoinQueuePage() {
  return (
    <main className="bg-[#050608]">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-8">
        {/* Hero Section */}
        <header className="mx-auto max-w-3xl space-y-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-accent">Join the queue</p>
          <h1 className="font-display text-5xl text-white md:text-6xl">Secure Your Place in Line</h1>
          <p className="text-lg text-zinc-300">
            Reserve your spot with a $100 deposit. Get exclusive access to our community, customize your pickup, and be
            among the first to receive our handcrafted hybrid-core pickups.
          </p>
        </header>

        {/* Benefits Grid */}
        <section className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border border-white/10 bg-[#0C0F13] p-6 text-center">
            <div className="mb-3 text-4xl">🎯</div>
            <h3 className="text-lg font-semibold text-white">Your Queue Number</h3>
            <p className="mt-2 text-sm text-zinc-400">
              See your exact position and track progress in your profile
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#0C0F13] p-6 text-center">
            <div className="mb-3 text-4xl">💬</div>
            <h3 className="text-lg font-semibold text-white">Telegram Access</h3>
            <p className="mt-2 text-sm text-zinc-400">
              Private channel with production updates and early announcements
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#0C0F13] p-6 text-center">
            <div className="mb-3 text-4xl">🎸</div>
            <h3 className="text-lg font-semibold text-white">Full Customization</h3>
            <p className="mt-2 text-sm text-zinc-400">
              Choose magnet type, grid style, winding recipe, and more
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#0C0F13] p-6 text-center">
            <div className="mb-3 text-4xl">💰</div>
            <h3 className="text-lg font-semibold text-white">$100 Credit</h3>
            <p className="mt-2 text-sm text-zinc-400">
              Your deposit counts toward the final $550 price
            </p>
          </div>
        </section>

        {/* How It Works */}
        <section className="mt-16">
          <h2 className="mb-8 text-center font-display text-3xl text-white">How It Works</h2>
          <div className="mx-auto max-w-4xl space-y-6">
            <div className="flex gap-6 rounded-3xl border border-white/10 bg-[#0C0F13] p-6">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-accent text-xl font-bold text-black">
                1
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Pay $100 Deposit</h3>
                <p className="mt-2 text-sm text-zinc-300">
                  Secure your queue position with a $100 deposit. You'll immediately receive your queue number and
                  access to our private Telegram channel.
                </p>
              </div>
            </div>

            <div className="flex gap-6 rounded-3xl border border-white/10 bg-[#0C0F13] p-6">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-accent text-xl font-bold text-black">
                2
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Customize Your Pickup</h3>
                <p className="mt-2 text-sm text-zinc-300">
                  Use our configuration builder to choose your preferred magnet type, grid style, and other options.
                  Change your mind anytime before production starts.
                </p>
              </div>
            </div>

            <div className="flex gap-6 rounded-3xl border border-white/10 bg-[#0C0F13] p-6">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-accent text-xl font-bold text-black">
                3
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">We Contact You</h3>
                <p className="mt-2 text-sm text-zinc-300">
                  When your turn approaches, we'll reach out to confirm your configuration and provide a shipping
                  timeline. You'll have time to review everything.
                </p>
              </div>
            </div>

            <div className="flex gap-6 rounded-3xl border border-white/10 bg-[#0C0F13] p-6">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-accent text-xl font-bold text-black">
                4
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Pay Remaining $450 & Ship</h3>
                <p className="mt-2 text-sm text-zinc-300">
                  Once you confirm, we'll charge the remaining $450 and begin crafting your pickup. You'll receive it
                  within the agreed timeline with full tracking.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="mt-16 grid gap-8 lg:grid-cols-[1.2fr,1fr]">
          <div className="rounded-3xl border border-white/10 bg-[#0C0F13] p-8">
            <h2 className="mb-2 text-2xl font-semibold text-white">Reserve Your Spot</h2>
            <p className="mb-6 text-sm text-zinc-400">
              Enter your email to get started. You'll be redirected to Stripe for secure payment.
            </p>
            <QueueJoinForm />
          </div>

          <aside className="space-y-6 rounded-3xl border border-white/10 bg-black/40 p-8">
            <div>
              <h3 className="mb-3 text-lg font-semibold text-white">Important Details</h3>
              <ul className="space-y-3 text-sm text-zinc-300">
                <li className="flex gap-3">
                  <span className="text-accent">•</span>
                  <span>
                    <strong className="text-white">Pricing:</strong> $100 deposit now, $450 when ready (total $550)
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent">•</span>
                  <span>
                    <strong className="text-white">Handmade:</strong> Each pickup is individually crafted, not mass
                    produced
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent">•</span>
                  <span>
                    <strong className="text-white">Timeline:</strong> Lead time varies based on queue position and
                    production capacity
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent">•</span>
                  <span>
                    <strong className="text-white">Support:</strong> Your deposit helps fund R&D and faster market entry
                  </span>
                </li>
              </ul>
            </div>

            <div id="terms" className="rounded-2xl border border-white/5 bg-white/5 p-6">
              <h4 className="mb-3 text-base font-semibold text-white">Terms & Conditions</h4>
              <ul className="space-y-2 text-xs text-zinc-400">
                <li>• $100 deposit is non-refundable after payment is processed</li>
                <li>• Queue position is assigned upon successful payment</li>
                <li>• Final $450 payment due before shipping</li>
                <li>• Lead times are estimates and may vary</li>
                <li>• 30-day return policy after delivery (minus shipping)</li>
                <li>
                  • Questions? Email{" "}
                  <a href="mailto:info@sirius-sound.com" className="text-accent underline">
                    info@sirius-sound.com
                  </a>
                </li>
              </ul>
            </div>
          </aside>
        </section>

        {/* FAQ Section */}
        <section className="mt-16">
          <h2 className="mb-8 text-center font-display text-3xl text-white">Frequently Asked Questions</h2>
          <div className="mx-auto max-w-3xl space-y-4">
            <details className="group rounded-2xl border border-white/10 bg-[#0C0F13] p-6">
              <summary className="cursor-pointer text-lg font-semibold text-white">
                Why is there a queue system?
              </summary>
              <p className="mt-3 text-sm text-zinc-300">
                Our pickups are individually handcrafted, not mass-produced. The queue system ensures fair ordering and
                helps us manage production capacity while maintaining quality. Your support through deposits also helps
                fund R&D and accelerate our market entry.
              </p>
            </details>

            <details className="group rounded-2xl border border-white/10 bg-[#0C0F13] p-6">
              <summary className="cursor-pointer text-lg font-semibold text-white">
                How long until I receive my pickup?
              </summary>
              <p className="mt-3 text-sm text-zinc-300">
                Lead times depend on your queue position and our production capacity. You'll see your position in your
                profile and receive regular updates via Telegram. We'll contact you well in advance when your turn
                approaches.
              </p>
            </details>

            <details className="group rounded-2xl border border-white/10 bg-[#0C0F13] p-6">
              <summary className="cursor-pointer text-lg font-semibold text-white">
                Can I change my configuration later?
              </summary>
              <p className="mt-3 text-sm text-zinc-300">
                Yes! You can update your pickup configuration anytime before we contact you to start production. Once
                production begins, changes may not be possible.
              </p>
            </details>

            <details className="group rounded-2xl border border-white/10 bg-[#0C0F13] p-6">
              <summary className="cursor-pointer text-lg font-semibold text-white">
                Is the $100 deposit refundable?
              </summary>
              <p className="mt-3 text-sm text-zinc-300">
                The $100 deposit is non-refundable after payment is processed. However, if you're unsatisfied after
                receiving your pickup, we offer a 30-day return policy (minus shipping costs).
              </p>
            </details>

            <details className="group rounded-2xl border border-white/10 bg-[#0C0F13] p-6">
              <summary className="cursor-pointer text-lg font-semibold text-white">
                What happens if I don't pay the remaining $450?
              </summary>
              <p className="mt-3 text-sm text-zinc-300">
                When your turn comes, we'll reach out to confirm your order. If you decide not to proceed, your queue
                position will be forfeited, but you can rejoin the queue at a later time (new position assigned).
              </p>
            </details>
          </div>
        </section>
      </div>
    </main>
  );
}
