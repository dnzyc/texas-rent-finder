import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { randomBytes } from "crypto";

export function proxy(request: NextRequest) {
  const nonce = randomBytes(16).toString("base64");

  const csp = [
    `default-src 'self'`,
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://va.vercel-scripts.com`,
    `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`,
    `img-src 'self' data: blob: https://*.supabase.co https://tile.openstreetmap.org https://cdnjs.cloudflare.com`,
    `font-src 'self' https://fonts.gstatic.com`,
    `connect-src 'self' https://*.supabase.co`,
    `frame-ancestors 'none'`,
    `base-uri 'self'`,
    `form-action 'self'`,
  ].join("; ");

  const response = NextResponse.next();
  response.headers.set("Content-Security-Policy", csp);
  response.headers.set("x-nonce", nonce);

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|.*\\.png$|.*\\.jpg$|.*\\.svg$).*)",
  ],
};
