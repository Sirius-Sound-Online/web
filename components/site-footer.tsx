import Link from "next/link";

const footerLinks = [
  {
    heading: "Product",
    items: [
      { label: "Technology", href: "/product" },
      { label: "Tone Lab", href: "/tone-lab" },
      { label: "Roadmap", href: "/community#roadmap" }
    ]
  },
  {
    heading: "Company",
    items: [
      { label: "About", href: "/about" },
      { label: "Press Kit", href: "/press-kit" },
      { label: "Contact", href: "/about#contact" }
    ]
  },
  {
    heading: "Legal",
    items: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Returns", href: "/preorder#policy" }
    ]
  }
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#040506] py-12 text-sm text-white/60">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 sm:grid-cols-[2fr,1fr,1fr,1fr] sm:px-8">
        <div className="space-y-3 text-white/70">
          <p className="text-base font-semibold text-white">Sirius/Serious Sound</p>
          <p className="max-w-sm text-sm text-zinc-400">
            Next-generation pickup platform built with hybrid-core flux management. Join the community shaping launch.
          </p>
          <p className="text-xs text-zinc-500">© {new Date().getFullYear()} Sirius Sound Collective.</p>
        </div>
        {footerLinks.map((column) => (
          <div key={column.heading} className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">{column.heading}</p>
            <ul className="space-y-2">
              {column.items.map((item) => (
                <li key={item.href}>
                  <Link className="transition hover:text-white" href={item.href}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}
