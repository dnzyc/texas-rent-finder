"use client";

import { usePathname } from "next/navigation";

const cityNames: Record<string, string> = {
  houston: "Houston",
  dallas: "Dallas",
  "san-antonio": "San Antonio",
  austin: "Austin",
  "fort-worth": "Fort Worth",
  "el-paso": "El Paso",
};

export function BreadcrumbJsonLd() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const itemListElement = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://texasrentfinder.com",
    },
  ];

  if (segments[0] === "place" && segments[1]) {
    itemListElement.push({
      "@type": "ListItem",
      position: 2,
      name: "Apartments",
      item: "https://texasrentfinder.com/place",
    });
  } else if (segments[0] === "texas" && segments[1]) {
    const cityName = cityNames[segments[1]] || segments[1];
    itemListElement.push({
      "@type": "ListItem",
      position: 2,
      name: `${cityName} Apartments`,
      item: `https://texasrentfinder.com/texas/${segments[1]}`,
    });
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement,
        }),
      }}
    />
  );
}
