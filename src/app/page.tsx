import { InteractiveList } from "@/components/InteractiveList";
import { FilterState } from "@/types";

export default async function Home({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const params = await searchParams;
  const filters: FilterState = {
    county: typeof params.county === "string" ? params.county : "",
    city: typeof params.city === "string" ? params.city : "",
    zip: typeof params.zip === "string" ? params.zip : "",
    minRating: typeof params.min_rating === "string" ? Number(params.min_rating) || 0 : 0,
    query: typeof params.q === "string" ? params.q : "",
  };
  return <InteractiveList initialFilters={filters} />;
}
