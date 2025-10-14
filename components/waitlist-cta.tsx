import WaitlistForm from "@/components/waitlist-form";

export function WaitlistCta() {
  return (
    <section id="waitlist" className="bg-[#050608] py-20">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 rounded-3xl border border-white/5 bg-[#0C0F13] px-6 py-14 shadow-smooth sm:px-10">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-accent">Join the orbit</p>
          <h2 className="font-display text-3xl text-white">Waitlist priority & community briefings.</h2>
          <p className="max-w-2xl text-base text-zinc-300">
            Early supporters get quarterly measurement drops, tone lab presets, and first dibs on prototype kits. SSO
            via GitHub or Google gives you immediate access to the roadmap votes.
          </p>
        </div>
        <WaitlistForm />
      </div>
    </section>
  );
}
