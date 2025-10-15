import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Data Deletion Instructions - Sirius Sound",
  description: "Instructions for requesting deletion of your personal data from Sirius Sound",
};

export default function DataDeletionPage() {
  return (
    <main className="bg-[#050608]">
      <div className="mx-auto w-full max-w-4xl px-6 py-16 sm:px-8">
        <header className="space-y-3">
          <p className="text-xs uppercase tracking-[0.3em] text-accent/80">User Rights</p>
          <h1 className="font-display text-3xl text-white sm:text-4xl">Data Deletion Instructions</h1>
          <p className="text-sm text-zinc-400">How to request deletion of your personal data</p>
        </header>

        <div className="prose prose-invert mt-10 max-w-none">
          <section className="space-y-6 text-zinc-300">
            <div className="rounded-2xl border border-accent/30 bg-accent/5 p-6">
              <h2 className="mb-3 text-xl font-semibold text-white">Quick Request</h2>
              <p className="leading-7">
                To request deletion of your data, send an email to{" "}
                <a href="mailto:privacy@sirius-sound.com" className="text-accent hover:underline">
                  privacy@sirius-sound.com
                </a>{" "}
                with the subject line &quot;Data Deletion Request&quot; from the email address associated with your account.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-semibold text-white">What Data Will Be Deleted?</h2>
              <p className="leading-7">
                When you request data deletion, we will permanently remove the following information from our systems:
              </p>
              <ul className="mt-3 space-y-2">
                <li className="leading-7">Your account profile (name, email address)</li>
                <li className="leading-7">OAuth authentication tokens and provider data</li>
                <li className="leading-7">Waitlist entries and referral information</li>
                <li className="leading-7">Survey responses and feedback submissions</li>
                <li className="leading-7">Any other personal data we have collected</li>
              </ul>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-semibold text-white">How to Request Data Deletion</h2>

              <h3 className="mb-3 mt-6 text-xl font-semibold text-white">Method 1: Email Request</h3>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <ol className="space-y-4">
                  <li className="leading-7">
                    <strong className="text-white">1. Compose an email</strong>
                    <br />
                    Send to:{" "}
                    <a href="mailto:privacy@sirius-sound.com" className="text-accent hover:underline">
                      privacy@sirius-sound.com
                    </a>
                  </li>
                  <li className="leading-7">
                    <strong className="text-white">2. Use your registered email</strong>
                    <br />
                    Send from the email address associated with your Sirius Sound account
                  </li>
                  <li className="leading-7">
                    <strong className="text-white">3. Include these details</strong>
                    <br />
                    Subject: &quot;Data Deletion Request&quot;
                    <br />
                    Body: Confirm your full name and state that you want to delete all your personal data
                  </li>
                  <li className="leading-7">
                    <strong className="text-white">4. Wait for confirmation</strong>
                    <br />
                    We will respond within 3 business days to confirm your request
                  </li>
                </ol>
              </div>

              <h3 className="mb-3 mt-6 text-xl font-semibold text-white">Method 2: Contact Form</h3>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <p className="leading-7">
                  You can also submit a data deletion request through our contact form:
                </p>
                <p className="mt-3">
                  <Link href="/about#contact" className="inline-flex items-center gap-2 text-accent hover:underline">
                    Visit Contact Form →
                  </Link>
                </p>
                <p className="mt-3 text-sm leading-6 text-zinc-400">
                  Make sure to select &quot;Data Deletion Request&quot; as the subject and include your registered email address.
                </p>
              </div>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-semibold text-white">Deletion Timeline</h2>
              <div className="mt-4 space-y-3">
                <div className="flex gap-4 rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-accent/20 text-sm font-semibold text-accent">
                    1
                  </div>
                  <div>
                    <p className="font-semibold text-white">Request Received</p>
                    <p className="mt-1 text-sm leading-6">
                      We acknowledge your request within 3 business days
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-accent/20 text-sm font-semibold text-accent">
                    2
                  </div>
                  <div>
                    <p className="font-semibold text-white">Identity Verification</p>
                    <p className="mt-1 text-sm leading-6">
                      We may ask for additional verification to protect your account security
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-accent/20 text-sm font-semibold text-accent">
                    3
                  </div>
                  <div>
                    <p className="font-semibold text-white">Data Deletion</p>
                    <p className="mt-1 text-sm leading-6">
                      Your data is permanently deleted within 30 days of verification
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-accent/20 text-sm font-semibold text-accent">
                    4
                  </div>
                  <div>
                    <p className="font-semibold text-white">Confirmation</p>
                    <p className="mt-1 text-sm leading-6">
                      We send you a final confirmation email once deletion is complete
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-semibold text-white">Important Notes</h2>

              <div className="space-y-4">
                <div className="rounded-2xl border border-yellow-500/30 bg-yellow-500/5 p-5">
                  <h4 className="mb-2 font-semibold text-yellow-400">⚠️ Data Deletion is Permanent</h4>
                  <p className="text-sm leading-6">
                    Once your data is deleted, it cannot be recovered. This action is irreversible. If you have active
                    pre-orders or pending transactions, please resolve those first.
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                  <h4 className="mb-2 font-semibold text-white">Third-Party Services</h4>
                  <p className="text-sm leading-6">
                    Data stored by third-party services (Disqus comments, Stripe payment records) is subject to their
                    respective deletion policies. We will remove our records, but you may need to contact these services
                    directly for complete removal:
                  </p>
                  <ul className="mt-3 space-y-1 text-sm">
                    <li>
                      <a href="https://help.disqus.com/en/articles/1717103-disqus-privacy-policy" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                        Disqus Data Deletion
                      </a>
                    </li>
                    <li>
                      <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                        Stripe Privacy Policy
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                  <h4 className="mb-2 font-semibold text-white">Legal Retention</h4>
                  <p className="text-sm leading-6">
                    Some data may be retained for legal, tax, or regulatory compliance purposes (e.g., transaction records
                    for 7 years as required by law). This data will be securely stored and not used for any other purpose.
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                  <h4 className="mb-2 font-semibold text-white">Active Pre-orders</h4>
                  <p className="text-sm leading-6">
                    If you have active pre-orders or pending refunds, we recommend waiting until those are resolved before
                    requesting data deletion, or contact us to cancel/refund them first.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-semibold text-white">Alternative Options</h2>
              <p className="leading-7">
                If you&apos;re not sure about permanent deletion, consider these alternatives:
              </p>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                  <h4 className="mb-2 font-semibold text-white">Account Deactivation</h4>
                  <p className="text-sm leading-6">
                    Temporarily disable your account without deleting data. You can reactivate later.
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                  <h4 className="mb-2 font-semibold text-white">Data Export</h4>
                  <p className="text-sm leading-6">
                    Request a copy of your data before deletion. Email us to receive your data export.
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                  <h4 className="mb-2 font-semibold text-white">Unsubscribe</h4>
                  <p className="text-sm leading-6">
                    Remove yourself from marketing emails while keeping your account active.
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                  <h4 className="mb-2 font-semibold text-white">Update Privacy Settings</h4>
                  <p className="text-sm leading-6">
                    Modify what data we collect and how we use it in your account settings.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-accent/30 bg-accent/5 p-6">
              <h2 className="mb-4 text-2xl font-semibold text-white">Need Help?</h2>
              <p className="leading-7">
                If you have questions about data deletion or need assistance with the process:
              </p>
              <ul className="mt-4 space-y-2">
                <li className="leading-7">
                  Email:{" "}
                  <a href="mailto:privacy@sirius-sound.com" className="text-accent hover:underline">
                    privacy@sirius-sound.com
                  </a>
                </li>
                <li className="leading-7">
                  Read our{" "}
                  <Link href="/privacy" className="text-accent hover:underline">
                    Privacy Policy
                  </Link>
                </li>
                <li className="leading-7">
                  Contact us through our{" "}
                  <Link href="/about#contact" className="text-accent hover:underline">
                    Contact Form
                  </Link>
                </li>
              </ul>
            </div>

            <div className="border-t border-white/10 pt-6 text-sm text-zinc-400">
              <p>
                This page satisfies data deletion requirements for OAuth applications and complies with GDPR, CCPA,
                and other privacy regulations.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
