export default function TermsPage() {
  return (
    <main className="bg-[#050608]">
      <div className="mx-auto w-full max-w-4xl px-6 py-16 sm:px-8">
        <header className="space-y-3">
          <p className="text-xs uppercase tracking-[0.3em] text-accent/80">Legal</p>
          <h1 className="font-display text-3xl text-white">Terms of use</h1>
          <p className="text-sm text-zinc-400">Last updated: 05 April 2024</p>
        </header>
        <section className="mt-8 space-y-5 text-sm text-zinc-300">
          <p>
            Sirius Sound grants you a revocable, non-exclusive, non-transferable license to access this pre-release
            hub. Do not reverse engineer private assets, and keep beta firmware within approved rigs.
          </p>
          <p>
            Pre-order deposits are fully refundable until capture. We reserve the right to adjust timelines based on supply
            chain updates.
          </p>
          <p>
            Questions? Email legal@sirius-sound.example.
          </p>
        </section>
      </div>
    </main>
  );
}
