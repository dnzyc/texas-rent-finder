import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #059669 0%, #2563eb 100%)",
          fontFamily: "Geist",
          padding: 80,
        }}
      >
        <div style={{ display: "flex", fontSize: 72, fontWeight: 700, color: "white", marginBottom: 20 }}>
          Texas Rent Finder
        </div>
        <div style={{ display: "flex", fontSize: 32, color: "#d1fae5", marginBottom: 40 }}>
          5,600+ Apartments Across Texas
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#bbf7d0" }}>
          Prices · Ratings · Photos
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
