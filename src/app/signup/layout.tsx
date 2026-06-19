import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create a free Texas Rent Finder account to save favorites and find your perfect Texas apartment.",
  alternates: { canonical: "/signup" },
};

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
