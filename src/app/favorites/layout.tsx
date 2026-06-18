import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Favorites",
  description: "View and manage your saved apartment listings on Texas Rent Finder.",
};

export default function FavoritesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
