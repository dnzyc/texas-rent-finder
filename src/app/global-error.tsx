"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f9fafb",
          fontFamily: "system-ui, -apple-system, sans-serif"
        }}>
          <div style={{
            maxWidth: "400px",
            width: "100%",
            padding: "32px",
            backgroundColor: "white",
            borderRadius: "16px",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            textAlign: "center"
          }}>
            <div style={{
              width: "64px",
              height: "64px",
              margin: "0 auto 24px",
              backgroundColor: "#fef2f2",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <svg style={{ width: "32px", height: "32px", color: "#dc2626" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 style={{
              fontSize: "20px",
              fontWeight: 600,
              color: "#111827",
              marginBottom: "8px"
            }}>
              Something went wrong
            </h2>
            <p style={{
              color: "#6b7280",
              marginBottom: "24px"
            }}>
              We&apos;re having trouble loading the page. Please try again.
            </p>
            <button
              onClick={() => reset()}
              style={{
                padding: "12px 24px",
                backgroundColor: "#059669",
                color: "white",
                fontWeight: 500,
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                fontSize: "14px"
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
