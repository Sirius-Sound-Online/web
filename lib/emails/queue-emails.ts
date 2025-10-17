export const queueConfirmationEmail = (queueNumber: number, telegramUrl: string) => ({
  subject: `You're #${queueNumber} in the Sirius Sound Queue!`,
  html: `
    <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #0a0e14 0%, #1a1f2e 100%); border-radius: 16px; padding: 40px; text-align: center;">
        <h1 style="color: #00d4ff; font-size: 48px; margin: 0;">#{queueNumber}</h1>
        <p style="color: #ffffff; font-size: 24px; margin: 16px 0 8px;">Your Queue Position</p>
        <p style="color: #94a3b8; margin: 0;">Sirius Sound Pickup Queue</p>
      </div>

      <div style="margin: 32px 0;">
        <h2 style="color: #1e293b; font-size: 20px; margin-bottom: 16px;">Welcome to the Queue!</h2>
        <p style="color: #475569; line-height: 1.6;">
          Thank you for reserving your spot! Your $100 deposit has been received and your queue position is secured.
        </p>
      </div>

      <div style="background: #f1f5f9; border-radius: 12px; padding: 24px; margin: 24px 0;">
        <h3 style="color: #1e293b; font-size: 18px; margin-top: 0;">What's Next?</h3>
        <ol style="color: #475569; line-height: 1.8; padding-left: 20px;">
          <li><strong>Join our Telegram channel</strong> for exclusive updates</li>
          <li><strong>Customize your pickup</strong> in your profile anytime</li>
          <li><strong>Watch for updates</strong> as your position advances</li>
          <li><strong>We'll contact you</strong> when your turn approaches</li>
        </ol>
      </div>

      <div style="text-align: center; margin: 32px 0;">
        <a href="${telegramUrl}" style="display: inline-block; background: #00d4ff; color: #000; font-weight: 600; padding: 16px 32px; border-radius: 8px; text-decoration: none; margin-bottom: 16px;">
          Join Telegram Channel
        </a>
        <br/>
        <a href="${process.env.NEXTAUTH_URL}/community/profile" style="color: #00d4ff; text-decoration: none;">
          View Your Profile →
        </a>
      </div>

      <div style="border-top: 1px solid #e2e8f0; padding-top: 24px; margin-top: 32px;">
        <p style="color: #64748b; font-size: 14px; margin: 8px 0;">
          <strong>Your Details:</strong><br/>
          Queue Position: #${queueNumber}<br/>
          Deposit Paid: $100.00<br/>
          Remaining Balance: $450.00 (due when ready to ship)
        </p>
      </div>

      <div style="text-align: center; margin-top: 32px; padding-top: 24px; border-top: 1px solid #e2e8f0;">
        <p style="color: #94a3b8; font-size: 12px; margin: 0;">
          Questions? Contact us at <a href="mailto:info@sirius-sound.com" style="color: #00d4ff;">info@sirius-sound.com</a>
        </p>
      </div>
    </div>
  `,
});

export const contactCustomerEmail = (queueNumber: number, customerName: string) => ({
  subject: `Your Sirius Sound Pickup is Almost Ready! (Queue #${queueNumber})`,
  html: `
    <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #0a0e14 0%, #1a1f2e 100%); border-radius: 16px; padding: 40px; text-align: center;">
        <h1 style="color: #fbbf24; font-size: 36px; margin: 0;">Your Turn is Coming Up!</h1>
        <p style="color: #ffffff; font-size: 18px; margin: 16px 0 0;">Queue Position #${queueNumber}</p>
      </div>

      <div style="margin: 32px 0;">
        <p style="color: #1e293b; font-size: 16px;">Hi ${customerName || "there"},</p>
        <p style="color: #475569; line-height: 1.6;">
          Great news! We're getting close to your queue position and wanted to reach out to confirm your order details before we start crafting your pickup.
        </p>
      </div>

      <div style="background: #fef3c7; border-left: 4px solid #fbbf24; padding: 20px; margin: 24px 0;">
        <h3 style="color: #92400e; margin-top: 0;">Action Required</h3>
        <p style="color: #78350f; margin: 0;">
          Please review and confirm your pickup configuration in your profile. We'll need your final approval within the next 7 days.
        </p>
      </div>

      <div style="background: #f1f5f9; border-radius: 12px; padding: 24px; margin: 24px 0;">
        <h3 style="color: #1e293b; font-size: 18px; margin-top: 0;">Next Steps:</h3>
        <ol style="color: #475569; line-height: 1.8; padding-left: 20px;">
          <li>Review your pickup configuration in your profile</li>
          <li>Make any final changes to magnet type, grid, etc.</li>
          <li>Reply to this email to confirm you're ready</li>
          <li>We'll send the invoice for the remaining $450</li>
          <li>Your pickup will ship within 2-3 weeks of payment</li>
        </ol>
      </div>

      <div style="text-align: center; margin: 32px 0;">
        <a href="${process.env.NEXTAUTH_URL}/community/profile" style="display: inline-block; background: #00d4ff; color: #000; font-weight: 600; padding: 16px 32px; border-radius: 8px; text-decoration: none;">
          Review Your Configuration
        </a>
      </div>

      <div style="text-align: center; margin-top: 32px; padding-top: 24px; border-top: 1px solid #e2e8f0;">
        <p style="color: #94a3b8; font-size: 12px; margin: 0;">
          Questions? Reply to this email or contact us at <a href="mailto:info@sirius-sound.com" style="color: #00d4ff;">info@sirius-sound.com</a>
        </p>
      </div>
    </div>
  `,
});

export const remainingPaymentEmail = (queueNumber: number, paymentUrl: string) => ({
  subject: `Invoice Ready: Remaining $450 for Your Sirius Sound Pickup (#${queueNumber})`,
  html: `
    <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #065f46 0%, #047857 100%); border-radius: 16px; padding: 40px; text-align: center;">
        <h1 style="color: #ffffff; font-size: 36px; margin: 0;">Time to Complete Your Order</h1>
        <p style="color: #d1fae5; font-size: 18px; margin: 16px 0 0;">Queue #${queueNumber}</p>
      </div>

      <div style="margin: 32px 0;">
        <p style="color: #475569; line-height: 1.6;">
          Your configuration has been confirmed and we're ready to start crafting your Sirius Sound pickup!
        </p>
        <p style="color: #475569; line-height: 1.6;">
          To proceed, please complete the remaining payment of <strong>$450.00</strong>. Your original $100 deposit has already been applied.
        </p>
      </div>

      <div style="background: #f1f5f9; border-radius: 12px; padding: 24px; margin: 24px 0;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 12px 0; color: #64748b;">Deposit Paid</td>
            <td style="padding: 12px 0; color: #1e293b; text-align: right; font-weight: 600;">$100.00</td>
          </tr>
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 12px 0; color: #64748b;">Remaining Balance</td>
            <td style="padding: 12px 0; color: #1e293b; text-align: right; font-weight: 600;">$450.00</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; color: #1e293b; font-size: 18px; font-weight: 600;">Total</td>
            <td style="padding: 12px 0; color: #1e293b; text-align: right; font-size: 18px; font-weight: 600;">$550.00</td>
          </tr>
        </table>
      </div>

      <div style="text-align: center; margin: 32px 0;">
        <a href="${paymentUrl}" style="display: inline-block; background: #10b981; color: #ffffff; font-weight: 600; font-size: 18px; padding: 16px 40px; border-radius: 8px; text-decoration: none;">
          Pay $450.00 Now
        </a>
        <p style="color: #64748b; font-size: 14px; margin-top: 12px;">
          Secure payment via Stripe
        </p>
      </div>

      <div style="background: #ecfdf5; border-left: 4px solid #10b981; padding: 20px; margin: 24px 0;">
        <h3 style="color: #065f46; margin-top: 0;">After Payment:</h3>
        <p style="color: #047857; margin: 0;">
          We'll begin crafting your pickup immediately and ship within 2-3 weeks. You'll receive tracking information via email.
        </p>
      </div>

      <div style="text-align: center; margin-top: 32px; padding-top: 24px; border-top: 1px solid #e2e8f0;">
        <p style="color: #94a3b8; font-size: 12px; margin: 0;">
          Questions about payment? Contact <a href="mailto:info@sirius-sound.com" style="color: #00d4ff;">info@sirius-sound.com</a>
        </p>
      </div>
    </div>
  `,
});

export const shippedNotificationEmail = (queueNumber: number, trackingNumber: string, trackingUrl: string) => ({
  subject: `Your Sirius Sound Pickup Has Shipped! (#${queueNumber})`,
  html: `
    <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%); border-radius: 16px; padding: 40px; text-align: center;">
        <h1 style="color: #ffffff; font-size: 42px; margin: 0;">📦 It's On Its Way!</h1>
        <p style="color: #ede9fe; font-size: 18px; margin: 16px 0 0;">Your pickup has shipped</p>
      </div>

      <div style="margin: 32px 0;">
        <p style="color: #475569; line-height: 1.6;">
          Exciting news! Your handcrafted Sirius Sound pickup (#${queueNumber}) has been carefully packaged and shipped.
        </p>
      </div>

      <div style="background: #f5f3ff; border-radius: 12px; padding: 24px; margin: 24px 0; text-align: center;">
        <p style="color: #6b21a8; font-size: 14px; margin: 0 0 8px;">Tracking Number</p>
        <p style="color: #1e293b; font-size: 20px; font-weight: 600; font-family: monospace; margin: 0 0 16px;">${trackingNumber}</p>
        <a href="${trackingUrl}" style="display: inline-block; background: #7c3aed; color: #ffffff; font-weight: 600; padding: 12px 24px; border-radius: 8px; text-decoration: none;">
          Track Your Package
        </a>
      </div>

      <div style="background: #f1f5f9; border-radius: 12px; padding: 24px; margin: 24px 0;">
        <h3 style="color: #1e293b; font-size: 18px; margin-top: 0;">What's in the Box:</h3>
        <ul style="color: #475569; line-height: 1.8; padding-left: 20px;">
          <li>Your custom-configured Sirius Sound pickup</li>
          <li>Installation hardware and mounting screws</li>
          <li>Quick installation guide</li>
          <li>Specification sheet and warranty card</li>
        </ul>
      </div>

      <div style="background: #fef3c7; border-left: 4px solid #fbbf24; padding: 20px; margin: 24px 0;">
        <h3 style="color: #92400e; margin-top: 0;">Share Your Sound!</h3>
        <p style="color: #78350f; margin: 0;">
          Once you've installed your pickup, we'd love to hear it! Share your recordings in our Telegram channel or tag us on social media.
        </p>
      </div>

      <div style="text-align: center; margin-top: 32px; padding-top: 24px; border-top: 1px solid #e2e8f0;">
        <p style="color: #94a3b8; font-size: 12px; margin: 0;">
          Need help with installation? Email <a href="mailto:info@sirius-sound.com" style="color: #00d4ff;">info@sirius-sound.com</a>
        </p>
      </div>
    </div>
  `,
});
