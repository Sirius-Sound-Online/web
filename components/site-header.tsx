import Link from "next/link";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { UserMenu } from "@/components/user-menu";

export async function SiteHeader() {
  const session = await getServerSession(authOptions);

  const links = [
    { href: "/product", label: "Product" },
    { href: "/tone-lab", label: "Tone Lab" },
    { href: "/blog", label: "Blog" },
    { href: "/community", label: "Community" },
    { href: "/press-kit", label: "Press" },
    { href: "/about", label: "About" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#040506]/90 backdrop-blur supports-[backdrop-filter]:bg-[#040506]/70">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4 sm:px-8">
        <Link href="/" className="flex items-center gap-3 text-sm font-semibold tracking-[0.3em] text-white/90">
          <Image
            src="/images/logo.png"
            alt="Sirius Sound"
            width={36}
            height={36}
            className="h-9 w-9"
          />
          Sirius Sound
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-white/60 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          {session?.user ? (
            <UserMenu user={session.user} />
          ) : (
            <Link
              href="/signin"
              className="rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white/80 transition hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
