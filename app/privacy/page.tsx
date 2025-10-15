import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Sirius Sound",
  description: "Privacy policy for Sirius Sound Guitar Pickups",
};

export default function PrivacyPage() {
  return (
    <main className="bg-[#050608]">
      <div className="mx-auto w-full max-w-4xl px-6 py-16 sm:px-8">
        <header className="space-y-3">
          <p className="text-xs uppercase tracking-[0.3em] text-accent/80">Legal</p>
          <h1 className="font-display text-3xl text-white sm:text-4xl">Privacy Policy</h1>
          <p className="text-sm text-zinc-400">Last updated: October 15, 2024</p>
        </header>

        <div className="prose prose-invert mt-10 max-w-none">
          <section className="space-y-6 text-zinc-300">
            <div>
              <h2 className="mb-4 text-2xl font-semibold text-white">Introduction</h2>
              <p className="leading-7">
                Sirius Sound (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your privacy and is committed to protecting your personal data.
                This privacy policy explains how we collect, use, disclose, and safeguard your information when you visit our
                website and use our services.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-semibold text-white">Information We Collect</h2>

              <h3 className="mb-3 mt-6 text-xl font-semibold text-white">Personal Information</h3>
              <p className="leading-7">When you create an account or use our services, we may collect:</p>
              <ul className="mt-3 space-y-2">
                <li className="leading-7">Name and email address</li>
                <li className="leading-7">OAuth profile information (when signing in with Google, Facebook, or Twitter)</li>
                <li className="leading-7">Profile picture from your OAuth provider</li>
                <li className="leading-7">User-generated content (comments, survey responses)</li>
              </ul>

              <h3 className="mb-3 mt-6 text-xl font-semibold text-white">Payment Information</h3>
              <p className="leading-7">
                Payment processing is handled securely by Stripe. We do not store your full credit card details on our servers.
                Stripe collects and processes payment information according to their own privacy policy.
              </p>

              <h3 className="mb-3 mt-6 text-xl font-semibold text-white">Usage Data</h3>
              <p className="leading-7">We collect analytics data through Plausible Analytics, a privacy-focused service that:</p>
              <ul className="mt-3 space-y-2">
                <li className="leading-7">Does not use cookies</li>
                <li className="leading-7">Does not track users across websites</li>
                <li className="leading-7">Does not collect personal information</li>
                <li className="leading-7">Provides aggregated statistics only</li>
              </ul>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-semibold text-white">How We Use Your Information</h2>
              <p className="leading-7">We use the information we collect to:</p>
              <ul className="mt-3 space-y-2">
                <li className="leading-7">Provide, operate, and maintain our services</li>
                <li className="leading-7">Manage your account and authentication</li>
                <li className="leading-7">Process pre-orders and donations</li>
                <li className="leading-7">Manage the waitlist queue</li>
                <li className="leading-7">Send you updates about your orders and account</li>
                <li className="leading-7">Respond to your comments and questions</li>
                <li className="leading-7">Improve our website and services</li>
                <li className="leading-7">Comply with legal obligations</li>
              </ul>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-semibold text-white">Third-Party Services</h2>
              <p className="leading-7">We use the following third-party services that may collect and process your data:</p>

              <div className="mt-4 space-y-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <h4 className="font-semibold text-white">Stripe</h4>
                  <p className="mt-2 text-sm leading-6">
                    Payment processing. See{" "}
                    <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                      Stripe&apos;s Privacy Policy
                    </a>
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <h4 className="font-semibold text-white">Plausible Analytics</h4>
                  <p className="mt-2 text-sm leading-6">
                    Privacy-friendly website analytics. See{" "}
                    <a href="https://plausible.io/privacy" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                      Plausible&apos;s Privacy Policy
                    </a>
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <h4 className="font-semibold text-white">Disqus</h4>
                  <p className="mt-2 text-sm leading-6">
                    Comment system. See{" "}
                    <a href="https://help.disqus.com/en/articles/1717103-disqus-privacy-policy" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                      Disqus&apos;s Privacy Policy
                    </a>
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <h4 className="font-semibold text-white">Formbricks</h4>
                  <p className="mt-2 text-sm leading-6">
                    Survey and feedback forms. See{" "}
                    <a href="https://formbricks.com/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                      Formbricks&apos;s Privacy Policy
                    </a>
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <h4 className="font-semibold text-white">OAuth Providers</h4>
                  <p className="mt-2 text-sm leading-6">
                    Google, Facebook, and Twitter for authentication. Each provider has their own privacy policy.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-semibold text-white">Data Storage and Security</h2>
              <p className="leading-7">
                We implement appropriate technical and organizational security measures to protect your personal information.
                Your data is stored securely in our database and we use industry-standard encryption for data transmission.
              </p>
              <p className="mt-4 leading-7">
                However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive
                to use commercially acceptable means to protect your personal data, we cannot guarantee its absolute security.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-semibold text-white">Your Rights</h2>
              <p className="leading-7">You have the right to:</p>
              <ul className="mt-3 space-y-2">
                <li className="leading-7">Access the personal information we hold about you</li>
                <li className="leading-7">Request correction of inaccurate data</li>
                <li className="leading-7">Request deletion of your personal data</li>
                <li className="leading-7">Object to processing of your personal data</li>
                <li className="leading-7">Request transfer of your data to another service</li>
                <li className="leading-7">Withdraw consent at any time</li>
              </ul>
              <p className="mt-4 leading-7">
                To exercise any of these rights, please contact us at{" "}
                <a href="mailto:privacy@sirius-sound.com" className="text-accent hover:underline">
                  privacy@sirius-sound.com
                </a>
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-semibold text-white">Cookies and Tracking</h2>
              <p className="leading-7">
                We use minimal cookies necessary for authentication and session management. Our analytics provider (Plausible)
                does not use cookies. We honor Do Not Track (DNT) browser signals.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-semibold text-white">Email Communications</h2>
              <p className="leading-7">
                We may send you emails about your account, orders, and important service updates. You can opt out of
                marketing communications at any time, but we may still send you transactional emails related to your account.
              </p>
              <p className="mt-4 leading-7">
                Waitlist entries require double opt-in confirmation.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-semibold text-white">Data Retention</h2>
              <p className="leading-7">
                We retain your personal information only for as long as necessary to provide our services and fulfill the
                purposes outlined in this privacy policy. We will retain and use your information to comply with legal
                obligations, resolve disputes, and enforce our agreements.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-semibold text-white">Children&apos;s Privacy</h2>
              <p className="leading-7">
                Our services are not intended for children under 13 years of age. We do not knowingly collect personal
                information from children under 13. If you become aware that a child has provided us with personal data,
                please contact us.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-semibold text-white">International Data Transfers</h2>
              <p className="leading-7">
                Your information may be transferred to and maintained on servers located outside of your state, province,
                country, or other governmental jurisdiction. We will take all steps reasonably necessary to ensure that
                your data is treated securely and in accordance with this privacy policy.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-semibold text-white">Changes to This Privacy Policy</h2>
              <p className="leading-7">
                We may update our privacy policy from time to time. We will notify you of any changes by posting the new
                privacy policy on this page and updating the &quot;Last updated&quot; date at the top of this policy.
              </p>
              <p className="mt-4 leading-7">
                You are advised to review this privacy policy periodically for any changes. Changes to this privacy policy
                are effective when they are posted on this page.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-semibold text-white">Accessibility</h2>
              <p className="leading-7">
                We honor <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-accent">prefers-reduced-motion</code>
                {" "}signals and ensure our WebGL enhancements degrade gracefully for users with accessibility needs.
              </p>
            </div>

            <div className="rounded-2xl border border-accent/30 bg-accent/5 p-6">
              <h2 className="mb-4 text-2xl font-semibold text-white">Contact Us</h2>
              <p className="leading-7">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <ul className="mt-4 space-y-2">
                <li className="leading-7">
                  By email:{" "}
                  <a href="mailto:privacy@sirius-sound.com" className="text-accent hover:underline">
                    privacy@sirius-sound.com
                  </a>
                </li>
                <li className="leading-7">
                  Through our website:{" "}
                  <a href="/about#contact" className="text-accent hover:underline">
                    Contact Form
                  </a>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
