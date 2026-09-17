type Record = { count: number; resetTime: number };

const records = new Map<string, Record>();

const RATE_LIMIT_WINDOW = 60 * 1000;
const DEFAULT_MAX_REQUESTS = 100;

const cleanupRateLimitRecords = () => {
  const now = Date.now();
  for (const [key, record] of records) {
    if (now > record.resetTime) {
      records.delete(key);
    }
  }
};

setInterval(cleanupRateLimitRecords, 5 * 60 * 1000);

export function checkRateLimit(
  ip: string,
  maxRequests: number = DEFAULT_MAX_REQUESTS,
  windowMs: number = RATE_LIMIT_WINDOW
): { allowed: boolean; remaining: number } {
  const now = Date.now();
  let record = records.get(ip);

  if (!record || now > record.resetTime) {
    record = { count: 0, resetTime: now + windowMs };
    records.set(ip, record);
  }

  record.count++;

  if (record.count > maxRequests) {
    return { allowed: false, remaining: 0 };
  }

  return { allowed: true, remaining: maxRequests - record.count };
}
