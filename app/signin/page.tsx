import { Metadata } from "next";
import SignInForm from "./signin-form";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to Sirius Sound with GitHub, Google, or email",
};

export default function SignInPage() {
  return (
    <main className="bg-[#050608]">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center px-6 py-16">
        <SignInForm />
      </div>
    </main>
  );
}
