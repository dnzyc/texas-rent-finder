import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "List Your Property",
  description: "List your apartment or rental property on Texas Rent Finder. Reach thousands of Texas renters searching for their next home.",
  alternates: { canonical: "/list-property" },
};

export default function ListPropertyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
