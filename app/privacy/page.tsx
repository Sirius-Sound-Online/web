export default function PrivacyPage() {
  return (
    <main className="bg-[#050608]">
      <div className="mx-auto w-full max-w-4xl px-6 py-16 sm:px-8">
        <header className="space-y-3">
          <p className="text-xs uppercase tracking-[0.3em] text-accent/80">Legal</p>
          <h1 className="font-display text-3xl text-white">Privacy notice</h1>
          <p className="text-sm text-zinc-400">Last updated: 05 April 2024</p>
        </header>
        <section className="mt-8 space-y-5 text-sm text-zinc-300">
          <p>
            We collect account information (name, email, OAuth profile data) to manage authentication and the waitlist queue.
            Checkout is processed by Stripe; we never store full card details. Analytics run through Plausible with
            self-hosted, cookieless tracking.
          </p>
          <p>
            Waitlist entries require double opt-in. You can remove your email anytime by contacting privacy@sirius-sound.example.
          </p>
          <p>
            We honour <code>Do Not Track</code> and <code>prefers-reduced-motion</code> signals. WebGL enhancements degrade
            gracefully.
          </p>
        </section>
      </div>
    </main>
  );
}
