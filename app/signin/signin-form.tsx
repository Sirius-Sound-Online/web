"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function SignInForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/community";
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleOAuthSignIn = async (provider: string) => {
    setIsLoading(provider);
    await signIn(provider, { callbackUrl });
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading("email");
    await signIn("email", { email, callbackUrl });
  };

  return (
    <div className="w-full space-y-8">
      <header className="text-center">
        <Link href="/" className="inline-flex items-center gap-3 text-sm font-semibold tracking-[0.3em] text-white/90">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent text-black font-display text-xl">
            S
          </span>
        </Link>
        <h1 className="mt-6 font-display text-3xl text-white">Sign in to Sirius Sound</h1>
        <p className="mt-2 text-sm text-zinc-400">
          Choose your preferred sign-in method
        </p>
      </header>

      <div className="space-y-4">
        {/* OAuth Providers */}
        <button
          onClick={() => handleOAuthSignIn("github")}
          disabled={isLoading !== null}
          className="flex w-full items-center justify-center gap-3 rounded-full border border-white/20 bg-black/40 px-6 py-3 text-sm font-medium text-white transition hover:border-accent hover:bg-black/60 disabled:opacity-50"
        >
          {isLoading === "github" ? (
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white" />
          ) : (
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          )}
          Continue with GitHub
        </button>

        <button
          onClick={() => handleOAuthSignIn("google")}
          disabled={isLoading !== null}
          className="flex w-full items-center justify-center gap-3 rounded-full border border-white/20 bg-black/40 px-6 py-3 text-sm font-medium text-white transition hover:border-accent hover:bg-black/60 disabled:opacity-50"
        >
          {isLoading === "google" ? (
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white" />
          ) : (
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
          )}
          Continue with Google
        </button>

        <button
          onClick={() => handleOAuthSignIn("facebook")}
          disabled={isLoading !== null}
          className="flex w-full items-center justify-center gap-3 rounded-full border border-white/20 bg-black/40 px-6 py-3 text-sm font-medium text-white transition hover:border-accent hover:bg-black/60 disabled:opacity-50"
        >
          {isLoading === "facebook" ? (
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white" />
          ) : (
            <svg className="h-5 w-5" fill="#1877F2" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          )}
          Continue with Facebook
        </button>

        <button
          onClick={() => handleOAuthSignIn("twitter")}
          disabled={isLoading !== null}
          className="flex w-full items-center justify-center gap-3 rounded-full border border-white/20 bg-black/40 px-6 py-3 text-sm font-medium text-white transition hover:border-accent hover:bg-black/60 disabled:opacity-50"
        >
          {isLoading === "twitter" ? (
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white" />
          ) : (
            <svg className="h-5 w-5" fill="#1DA1F2" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
          )}
          Continue with Twitter
        </button>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-[#050608] px-4 text-zinc-500">Or continue with email</span>
          </div>
        </div>

        {/* Email Sign In */}
        <form onSubmit={handleEmailSignIn} className="space-y-4">
          <div>
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="w-full rounded-full border border-white/10 bg-black/60 px-5 py-3 text-sm text-white placeholder-zinc-500 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading !== null}
            className="w-full rounded-full bg-accent px-6 py-3 text-sm font-semibold text-black transition hover:bg-accent/90 disabled:opacity-50"
          >
            {isLoading === "email" ? (
              <span className="inline-flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/20 border-t-black" />
                Sending magic link...
              </span>
            ) : (
              "Send magic link"
            )}
          </button>
        </form>
      </div>

      <p className="text-center text-xs text-zinc-500">
        By signing in, you agree to our{" "}
        <Link href="/terms" className="underline hover:text-zinc-400">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="underline hover:text-zinc-400">
          Privacy Policy
        </Link>
      </p>
    </div>
  );
}
