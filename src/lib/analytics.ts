let ga4Module: typeof import("react-ga4").default | null = null;

async function getGA4() {
  if (typeof window === "undefined") return null;
  if (!ga4Module) {
    const mod = await import("react-ga4");
    ga4Module = mod.default;
  }
  return ga4Module;
}

export function initializeGA(trackingId: string) {
  if (typeof window === "undefined") return;
  getGA4().then((ga4) => {
    if (ga4) ga4.initialize(trackingId);
  });
}

export function logPageView(path?: string) {
  if (typeof window === "undefined") return;
  getGA4().then((ga4) => {
    if (ga4) {
      const url = path || window.location.pathname + window.location.search;
      ga4.send({ hitType: "pageview", page: url });
    }
  });
}

export function logEvent(event: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  getGA4().then((ga4) => {
    if (ga4) ga4.event(event, params);
  });
}
