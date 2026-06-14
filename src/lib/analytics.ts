import ga4 from "react-ga4";

export function initializeGA(trackingId: string) {
  if (typeof window === "undefined") return;
  ga4.initialize(trackingId);
}

export function logPageView(path?: string) {
  if (typeof window === "undefined") return;
  const url = path || window.location.pathname + window.location.search;
  ga4.send({ hitType: "pageview", page: url });
}

export function logEvent(event: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  ga4.event(event, params);
}
