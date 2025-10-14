export default function CommunityGuidelinesPage() {
  return (
    <main className="bg-[#050608]">
      <div className="mx-auto w-full max-w-3xl px-6 py-16 sm:px-8">
        <header className="space-y-3">
          <p className="text-xs uppercase tracking-[0.3em] text-accent/80">Community</p>
          <h1 className="font-display text-3xl text-white">Guidelines</h1>
          <p className="text-sm text-zinc-400">
            We built Sirius/Serious Sound to elevate tone conversations. Keep feedback constructive and inclusive.
          </p>
        </header>
        <section className="mt-8 space-y-4 text-sm text-zinc-300">
          <p>
            1. Share measurable observations whenever possible—upload impulse responses, frequency plots, or audio clips.
          </p>
          <p>2. Respect fellow builders. No gatekeeping or dismissing boutique or DIY workflows.</p>
          <p>
            3. Keep NDAs intact. Do not leak unreleased OEM data or artist sessions without written consent.
          </p>
          <p>4. Stay on-topic: pickups, tone shaping, hardware integrations, and launch logistics.</p>
          <p>5. Report bugs and accessibility issues via the roadmap feedback widget.</p>
        </section>
      </div>
    </main>
  );
}
