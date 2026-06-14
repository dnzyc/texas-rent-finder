type Record = { count: number; resetTime: number };

const records = new Map<string, Record>();

const RATE_LIMIT_WINDOW = 60 * 1000;
const MAX_REQUESTS = 100;

export function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  let record = records.get(ip);

  if (!record || now > record.resetTime) {
    record = { count: 0, resetTime: now + RATE_LIMIT_WINDOW };
    records.set(ip, record);
  }

  record.count++;

  if (record.count > MAX_REQUESTS) {
    return { allowed: false, remaining: 0 };
  }

  return { allowed: true, remaining: MAX_REQUESTS - record.count };
}

export function cleanupOldRecords(): void {
  const now = Date.now();
  for (const [ip, record] of records.entries()) {
    if (now > record.resetTime) {
      records.delete(ip);
    }
  }
}

setInterval(cleanupOldRecords, RATE_LIMIT_WINDOW);
