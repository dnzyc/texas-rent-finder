import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compare Apartments",
  description: "Compare up to 3 Texas apartments side by side. See ratings, prices, locations, and amenities at a glance.",
  alternates: { canonical: "/compare" },
  robots: { index: false, follow: true },
};

export default function CompareLayout({ children }: { children: React.ReactNode }) {
  return children;
}
