import { NextRequest, NextResponse } from "next/server";

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function getRateLimit(ip: string) {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);
  if (!limit || now > limit.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60 * 60 * 1000 }); // 1/hour
    return true;
  }
  if (limit.count >= 5) return false;
  limit.count++;
  return true;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";

  if (!getRateLimit(ip)) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  try {
    const body = await req.json();
    const { name, email, company, phone, message } = body;

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
    }

    if (name.length > 100 || email.length > 200 || (company && company.length > 100) || (phone && phone.length > 20) || (message && message.length > 2000)) {
      return NextResponse.json({ error: "Input too long." }, { status: 400 });
    }

    // Log to console (can be replaced with email service or DB)
    console.log("[Partner Inquiry]", {
      name,
      email,
      company: company || "",
      phone: phone || "",
      message: message || "",
      timestamp: new Date().toISOString(),
      ip,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
