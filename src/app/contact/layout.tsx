import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Texas Rent Finder — questions, feedback, or help finding your perfect Texas apartment.",
  alternates: { canonical: "/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
