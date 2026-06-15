import { InteractiveList } from "@/components/InteractiveList";

export default function Home({ searchParams }: { searchParams: Record<string, string | undefined> }) {
  return <InteractiveList initialFilters={searchParams as any} />;
}
