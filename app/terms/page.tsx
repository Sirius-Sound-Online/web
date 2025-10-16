import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - Sirius Sound",
  description: "Terms of Service for Sirius Sound platform, products, and services.",
};

export default function TermsPage() {
  return (
    <main className="bg-[#050608]">
      <div className="mx-auto w-full max-w-4xl px-6 py-16 sm:px-8">
        <header className="space-y-3">
          <p className="text-xs uppercase tracking-[0.3em] text-accent/80">Legal</p>
          <h1 className="font-display text-3xl text-white sm:text-4xl">Terms of Service</h1>
          <p className="text-sm text-zinc-400">Last updated: January 15, 2025</p>
        </header>

        <section className="mt-12 space-y-8 text-sm leading-relaxed text-zinc-300">
          {/* 1. Acceptance of Terms */}
          <div>
            <h2 className="mb-3 text-lg font-semibold text-white">1. Acceptance of Terms</h2>
            <div className="space-y-3">
              <p>
                Welcome to Sirius Sound. By accessing or using our website, services, products, or participating in our community
                (collectively, the "Services"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to
                these Terms, please do not use our Services.
              </p>
              <p>
                These Terms constitute a legally binding agreement between you and Sirius Sound ("we," "us," or "our"). We reserve
                the right to update these Terms at any time, and your continued use of the Services constitutes acceptance of any changes.
              </p>
            </div>
          </div>

          {/* 2. Description of Service */}
          <div>
            <h2 className="mb-3 text-lg font-semibold text-white">2. Description of Service</h2>
            <div className="space-y-3">
              <p>
                Sirius Sound provides a platform for guitar enthusiasts to discover, pre-order, and engage with high-quality guitar
                pickups and related products. Our Services include:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Product information and pre-order capabilities</li>
                <li>Waitlist registration for product launches and updates</li>
                <li>Tone Lab - an interactive blind testing tool for audio comparison</li>
                <li>Community features and user accounts</li>
                <li>Educational content and blog</li>
                <li>Customer support and communication channels</li>
              </ul>
            </div>
          </div>

          {/* 3. User Accounts and Registration */}
          <div>
            <h2 className="mb-3 text-lg font-semibold text-white">3. User Accounts and Registration</h2>
            <div className="space-y-3">
              <p>
                <strong>Account Creation:</strong> To access certain features, you may need to create an account. You can register
                using email or third-party authentication providers (Google, Facebook, Twitter, GitHub).
              </p>
              <p>
                <strong>Account Security:</strong> You are responsible for maintaining the confidentiality of your account credentials
                and for all activities that occur under your account. Notify us immediately of any unauthorized use.
              </p>
              <p>
                <strong>Accurate Information:</strong> You agree to provide accurate, current, and complete information during registration
                and to update it as necessary to maintain its accuracy.
              </p>
              <p>
                <strong>Account Termination:</strong> We reserve the right to suspend or terminate accounts that violate these Terms or
                engage in fraudulent, abusive, or illegal activities.
              </p>
            </div>
          </div>

          {/* 4. Pre-orders and Payments */}
          <div>
            <h2 className="mb-3 text-lg font-semibold text-white">4. Pre-orders and Payments</h2>
            <div className="space-y-3">
              <p>
                <strong>Pre-order Process:</strong> When you place a pre-order, you authorize us to process payment through our
                payment processor, Stripe. Pre-orders require payment authorization at the time of order.
              </p>
              <p>
                <strong>Payment Authorization:</strong> Your payment method will be authorized but not immediately charged. The full
                charge will be processed when the product is ready to ship or as otherwise specified during checkout.
              </p>
              <p>
                <strong>Refunds:</strong> Pre-order deposits are fully refundable until the payment is captured (typically when the
                product ships). To request a refund, contact us at support@sirius-sound.com.
              </p>
              <p>
                <strong>Pricing:</strong> All prices are displayed in USD and are subject to change. We will honor the price displayed
                at the time of your pre-order.
              </p>
              <p>
                <strong>Product Availability:</strong> We reserve the right to adjust delivery timelines based on manufacturing schedules,
                supply chain conditions, and other factors beyond our control. We will communicate any significant delays promptly.
              </p>
              <p>
                <strong>Taxes:</strong> Prices may not include applicable taxes, duties, or shipping fees, which will be calculated at checkout.
              </p>
            </div>
          </div>

          {/* 5. Waitlist Terms */}
          <div>
            <h2 className="mb-3 text-lg font-semibold text-white">5. Waitlist Terms</h2>
            <div className="space-y-3">
              <p>
                <strong>Registration:</strong> Joining our waitlist provides early access to product launches, exclusive updates,
                and community features. Waitlist registration requires email confirmation.
              </p>
              <p>
                <strong>Position and Priority:</strong> Waitlist positions are assigned based on registration time. Early registrants
                may receive priority access to limited product releases.
              </p>
              <p>
                <strong>No Guarantee:</strong> Waitlist membership does not guarantee product availability or the right to purchase.
                Products are subject to availability and manufacturing capacity.
              </p>
              <p>
                <strong>Communications:</strong> By joining the waitlist, you consent to receive emails about product updates, launches,
                and relevant news. You may unsubscribe at any time.
              </p>
            </div>
          </div>

          {/* 6. Tone Lab */}
          <div>
            <h2 className="mb-3 text-lg font-semibold text-white">6. Tone Lab</h2>
            <div className="space-y-3">
              <p>
                <strong>Interactive Testing:</strong> Tone Lab is a blind testing tool that allows users to compare audio samples
                and provide ratings. Your participation is voluntary and subject to these Terms.
              </p>
              <p>
                <strong>Data Collection:</strong> We collect anonymous usage data and ratings to improve our products and Services.
                If you are logged in, your test results may be associated with your account for personalized statistics.
              </p>
              <p>
                <strong>Audio Samples:</strong> All audio samples are owned by Sirius Sound or used with permission. You may not
                download, distribute, or use these samples outside the Tone Lab platform without authorization.
              </p>
              <p>
                <strong>Fair Use:</strong> Do not attempt to reverse engineer, manipulate, or abuse the Tone Lab system. We reserve
                the right to invalidate results or restrict access for suspicious activity.
              </p>
            </div>
          </div>

          {/* 7. Intellectual Property */}
          <div>
            <h2 className="mb-3 text-lg font-semibold text-white">7. Intellectual Property</h2>
            <div className="space-y-3">
              <p>
                <strong>Our Content:</strong> All content on our Services, including text, graphics, logos, audio samples, images,
                software, and design elements, is owned by Sirius Sound or our licensors and protected by copyright, trademark, and
                other intellectual property laws.
              </p>
              <p>
                <strong>License:</strong> We grant you a limited, revocable, non-exclusive, non-transferable license to access and
                use our Services for personal, non-commercial purposes. You may not:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Reproduce, distribute, modify, or create derivative works from our content</li>
                <li>Reverse engineer, decompile, or disassemble any software or firmware</li>
                <li>Remove copyright, trademark, or other proprietary notices</li>
                <li>Use our content for commercial purposes without written permission</li>
                <li>Frame or mirror any content from our Services</li>
              </ul>
              <p>
                <strong>Trademarks:</strong> "Sirius Sound" and our logos are trademarks of Sirius Sound. You may not use our trademarks
                without prior written consent.
              </p>
            </div>
          </div>

          {/* 8. User Conduct */}
          <div>
            <h2 className="mb-3 text-lg font-semibold text-white">8. User Conduct</h2>
            <div className="space-y-3">
              <p>You agree not to:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe on the rights of others, including intellectual property rights</li>
                <li>Transmit harmful code, viruses, or malicious software</li>
                <li>Attempt to gain unauthorized access to our systems or networks</li>
                <li>Harass, threaten, or harm other users</li>
                <li>Impersonate others or provide false information</li>
                <li>Spam or send unsolicited commercial messages</li>
                <li>Interfere with the proper functioning of our Services</li>
                <li>Collect user data without consent</li>
                <li>Engage in fraudulent activities or payment disputes in bad faith</li>
              </ul>
            </div>
          </div>

          {/* 9. User Content */}
          <div>
            <h2 className="mb-3 text-lg font-semibold text-white">9. User Content</h2>
            <div className="space-y-3">
              <p>
                <strong>Submissions:</strong> If you submit content to our Services (comments, reviews, forum posts, etc.), you grant
                us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and display that content in connection
                with our Services.
              </p>
              <p>
                <strong>Responsibility:</strong> You are solely responsible for the content you submit and represent that you have all
                necessary rights to grant the license above.
              </p>
              <p>
                <strong>Moderation:</strong> We reserve the right to remove any user content that violates these Terms or is otherwise
                objectionable, at our sole discretion.
              </p>
            </div>
          </div>

          {/* 10. Third-Party Services */}
          <div>
            <h2 className="mb-3 text-lg font-semibold text-white">10. Third-Party Services</h2>
            <div className="space-y-3">
              <p>
                Our Services integrate with third-party services including:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li><strong>Stripe:</strong> Payment processing</li>
                <li><strong>Plausible Analytics:</strong> Privacy-friendly website analytics</li>
                <li><strong>Disqus:</strong> Comment system for blog posts</li>
                <li><strong>OAuth Providers:</strong> Google, Facebook, Twitter, GitHub for authentication</li>
                <li><strong>Formbricks:</strong> User feedback collection</li>
              </ul>
              <p>
                Your use of these third-party services is subject to their respective terms and privacy policies. We are not responsible
                for their practices or any issues arising from their services.
              </p>
            </div>
          </div>

          {/* 11. Disclaimer of Warranties */}
          <div>
            <h2 className="mb-3 text-lg font-semibold text-white">11. Disclaimer of Warranties</h2>
            <div className="space-y-3">
              <p>
                OUR SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED,
                INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
              </p>
              <p>
                We do not warrant that:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Our Services will be uninterrupted, secure, or error-free</li>
                <li>Defects will be corrected</li>
                <li>Our Services are free from viruses or harmful components</li>
                <li>The results from using our Services will meet your expectations</li>
                <li>Product delivery dates will be met without delay</li>
              </ul>
              <p>
                <strong>Beta/Pre-release Content:</strong> Some features may be labeled as beta, experimental, or pre-release. These
                features are provided for testing purposes and may contain bugs or change without notice.
              </p>
            </div>
          </div>

          {/* 12. Limitation of Liability */}
          <div>
            <h2 className="mb-3 text-lg font-semibold text-white">12. Limitation of Liability</h2>
            <div className="space-y-3">
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, SIRIUS SOUND SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
                CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY,
                OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES RESULTING FROM:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Your access to or use of (or inability to access or use) our Services</li>
                <li>Any conduct or content of third parties on our Services</li>
                <li>Unauthorized access, use, or alteration of your content or data</li>
                <li>Delays or failures in product delivery due to supply chain issues</li>
                <li>Any bugs, viruses, or harmful code transmitted through our Services</li>
              </ul>
              <p>
                OUR TOTAL LIABILITY FOR ANY CLAIMS ARISING FROM THESE TERMS OR YOUR USE OF OUR SERVICES SHALL NOT EXCEED THE AMOUNT
                YOU PAID US IN THE 12 MONTHS PRECEDING THE CLAIM, OR $100, WHICHEVER IS GREATER.
              </p>
            </div>
          </div>

          {/* 13. Indemnification */}
          <div>
            <h2 className="mb-3 text-lg font-semibold text-white">13. Indemnification</h2>
            <div className="space-y-3">
              <p>
                You agree to indemnify, defend, and hold harmless Sirius Sound and its officers, directors, employees, agents, and
                affiliates from any claims, liabilities, damages, losses, costs, or expenses (including reasonable attorneys' fees)
                arising from:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Your violation of these Terms</li>
                <li>Your violation of any rights of another party</li>
                <li>Your use or misuse of our Services</li>
                <li>Any content you submit to our Services</li>
              </ul>
            </div>
          </div>

          {/* 14. Termination */}
          <div>
            <h2 className="mb-3 text-lg font-semibold text-white">14. Termination</h2>
            <div className="space-y-3">
              <p>
                We may suspend or terminate your access to our Services at any time, with or without cause or notice, including for
                violation of these Terms. Upon termination:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Your right to use our Services immediately ceases</li>
                <li>We may delete your account and data (subject to legal retention requirements)</li>
                <li>Outstanding financial obligations remain in effect</li>
                <li>Provisions that by their nature should survive termination will continue to apply</li>
              </ul>
            </div>
          </div>

          {/* 15. Dispute Resolution and Governing Law */}
          <div>
            <h2 className="mb-3 text-lg font-semibold text-white">15. Dispute Resolution and Governing Law</h2>
            <div className="space-y-3">
              <p>
                <strong>Informal Resolution:</strong> Before filing a claim, you agree to contact us at legal@sirius-sound.com to
                attempt to resolve the dispute informally.
              </p>
              <p>
                <strong>Governing Law:</strong> These Terms are governed by the laws of the United States, without regard to conflict
                of law provisions.
              </p>
              <p>
                <strong>Jurisdiction:</strong> You agree to submit to the personal jurisdiction of the courts located within the United
                States for resolution of any disputes.
              </p>
            </div>
          </div>

          {/* 16. Changes to Terms */}
          <div>
            <h2 className="mb-3 text-lg font-semibold text-white">16. Changes to Terms</h2>
            <div className="space-y-3">
              <p>
                We reserve the right to modify these Terms at any time. We will notify users of material changes by:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Updating the "Last Updated" date</li>
                <li>Posting a notice on our website</li>
                <li>Sending an email notification (for significant changes)</li>
              </ul>
              <p>
                Your continued use of our Services after changes take effect constitutes acceptance of the modified Terms.
              </p>
            </div>
          </div>

          {/* 17. Miscellaneous */}
          <div>
            <h2 className="mb-3 text-lg font-semibold text-white">17. Miscellaneous</h2>
            <div className="space-y-3">
              <p>
                <strong>Entire Agreement:</strong> These Terms, along with our Privacy Policy, constitute the entire agreement between
                you and Sirius Sound regarding our Services.
              </p>
              <p>
                <strong>Severability:</strong> If any provision of these Terms is found to be unenforceable, the remaining provisions
                will remain in full effect.
              </p>
              <p>
                <strong>No Waiver:</strong> Our failure to enforce any right or provision of these Terms will not be deemed a waiver of
                such right or provision.
              </p>
              <p>
                <strong>Assignment:</strong> You may not assign or transfer these Terms without our written consent. We may assign our
                rights without restriction.
              </p>
              <p>
                <strong>Force Majeure:</strong> We are not liable for delays or failures in performance resulting from causes beyond our
                reasonable control, including supply chain disruptions, natural disasters, or pandemics.
              </p>
            </div>
          </div>

          {/* 18. Contact Information */}
          <div>
            <h2 className="mb-3 text-lg font-semibold text-white">18. Contact Information</h2>
            <div className="space-y-3">
              <p>
                If you have questions about these Terms of Service, please contact us:
              </p>
              <div className="rounded-lg bg-white/5 p-4">
                <p className="font-medium text-white">Sirius Sound</p>
                <p className="mt-2">Email: legal@sirius-sound.com</p>
                <p>Support: support@sirius-sound.com</p>
              </div>
            </div>
          </div>

          {/* Acknowledgment */}
          <div className="border-t border-white/10 pt-8">
            <p className="text-xs text-zinc-400">
              BY USING OUR SERVICES, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO BE BOUND BY THESE TERMS OF SERVICE.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
