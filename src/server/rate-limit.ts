const WINDOW_MS = 60_000; 
const MAX_REQUESTS = 20;

const hits = new Map<string, { count: number; windowStart: number }>();

export function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const record = hits.get(key);

  if (!record || now - record.windowStart > WINDOW_MS) {
    hits.set(key, { count: 1, windowStart: now });
    return true;
  }

  if (record.count >= MAX_REQUESTS) return false;

  record.count += 1;
  hits.set(key, record);
  return true;
}
