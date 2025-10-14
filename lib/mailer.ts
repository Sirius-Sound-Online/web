import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: Number(process.env.EMAIL_SERVER_PORT ?? 587),
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

type SendMailOptions = {
  to: string;
  subject: string;
  html: string;
};

export async function sendMail({ to, subject, html }: SendMailOptions) {
  if (!process.env.EMAIL_FROM) {
    throw new Error("EMAIL_FROM missing");
  }
  await transport.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    html,
  });
}
