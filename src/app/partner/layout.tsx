import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partner with Us",
  description: "List your properties on Texas Rent Finder. Reach thousands of renters across Texas with our apartment search platform.",
  alternates: { canonical: "/partner" },
  openGraph: {
    title: "Partner with Texas Rent Finder",
    description: "List your properties and connect with qualified renters across Texas.",
  },
};

export default function PartnerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
