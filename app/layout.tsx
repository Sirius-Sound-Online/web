import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk as SpaceGrotesk } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { cn } from "@/lib/utils";
import Script from "next/script";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
  display: "swap",
});

const spaceGrotesk = SpaceGrotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sirius-sound.example"),
  title: {
    default: "Sirius/Serious Sound – Next-Gen Guitar Pickups",
    template: "%s · Sirius/Serious Sound",
  },
  description:
    "Pre-release hub for Sirius/Serious Sound pickups: immersive demos, tone lab, roadmap, and community for builders and players.",
  alternates: {
    canonical: "/",
    languages: {
      en: "/en",
      ru: "/ru",
    },
  },
  openGraph: {
    type: "website",
    url: "https://sirius-sound.example",
    title: "Sirius/Serious Sound – Next-Gen Guitar Pickups",
    description:
      "Experience the future of guitar tone. Explore the tone lab, join the waitlist, and shape the roadmap.",
    siteName: "Sirius/Serious Sound",
    locale: "en_US",
    images: [
      {
        url: "/images/og-default.svg",
        width: 1200,
        height: 630,
        alt: "Sirius/Serious Sound pre-release hub",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@siriussound",
    creator: "@siriussound",
    title: "Sirius/Serious Sound – The Future of Guitar Tone",
    description:
      "Join the pre-release community: interactive tone lab, measured data, roadmap, and pre-orders.",
    images: ["/images/og-default.svg"],
  },
  icons: {
    icon: "/images/logo-light.svg",
    shortcut: "/images/logo-light.svg",
    apple: "/images/logo-light.svg",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#00e5ff",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("bg-black text-white", inter.variable, spaceGrotesk.variable)}
    >
      <body className="min-h-screen bg-[#040506] text-zinc-100 antialiased">
        <Providers>
          <div className="noise-overlay" aria-hidden />
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </Providers>
        <Script
          src="https://plausible.io/js/script.js"
          data-domain="sirius-sound.example"
          strategy="lazyOnload"
        />
        <Script id="jsonld-org" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Sirius/Serious Sound",
            url: "https://sirius-sound.example",
            logo: "https://sirius-sound.example/images/logo-light.svg",
            sameAs: [
              "https://github.com/Sirius-Sound-Online",
              "https://instagram.com/siriussound"
            ]
          })}
        </Script>
      </body>
    </html>
  );
}
