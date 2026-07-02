import type { NextRequest } from "next/server";

// Module-level store — resets on process restart.
// For distributed/serverless deployments, set UPSTASH_REDIS_REST_URL +
// UPSTASH_REDIS_REST_TOKEN to enable persistent cross-instance rate limiting.
const store = new Map<string, { count: number; firstRequest: number }>();

// Hard cap on distinct keys held in memory to prevent unbounded growth under
// key churn or a spoofed-IP flood.
const MAX_STORE_ENTRIES = 10_000;

/**
 * Evict entries whose window has elapsed, then — if still over the cap — drop the
 * oldest entries (Map preserves insertion order) until back under the limit.
 */
function evictStale(windowMs: number): void {
  const now = Date.now();
  for (const [k, v] of store) {
    if (now - v.firstRequest > windowMs) store.delete(k);
  }
  if (store.size > MAX_STORE_ENTRIES) {
    let excess = store.size - MAX_STORE_ENTRIES;
    for (const k of store.keys()) {
      store.delete(k);
      if (--excess <= 0) break;
    }
  }
}

export function getClientIp(req: NextRequest): string {
  // On Vercel (and similar platforms) the real client IP is appended as the
  // RIGHTMOST entry of x-forwarded-for by the trusted proxy hop; any values to
  // the left are client-supplied and therefore spoofable. Never trust the
  // leftmost value — use the rightmost (trusted) entry, then x-real-ip.
  const xff = req.headers.get("x-forwarded-for");
  if (xff) {
    const parts = xff.split(",").map((p) => p.trim()).filter(Boolean);
    if (parts.length > 0) return parts[parts.length - 1];
  }
  return req.headers.get("x-real-ip") ?? "unknown";
}

/**
 * Check and record a rate-limit hit for the given key.
 * @param key       Unique identifier (IP address or compound key)
 * @param maxReqs   Maximum allowed requests in the window (default: 5)
 * @param windowMs  Rolling window in milliseconds (default: 10 minutes)
 */
export async function checkRateLimit(
  key: string,
  maxReqs = 5,
  windowMs = 10 * 60 * 1000,
): Promise<{ allowed: boolean; retryAfterSeconds: number }> {
  // ── Upstash Redis (persistent, works across serverless instances) ──────────
  const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
  const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (upstashUrl && upstashToken) {
    try {
      const windowKey = Math.floor(Date.now() / windowMs);
      const redisKey = `rl:${key}:${windowKey}`;
      const ttlSeconds = Math.ceil(windowMs / 1000);

      // Pipeline: INCR + EXPIRE in one round-trip
      const pipelineRes = await fetch(`${upstashUrl}/pipeline`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${upstashToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          ["INCR", redisKey],
          ["EXPIRE", redisKey, ttlSeconds],
        ]),
      });

      if (pipelineRes.ok) {
        const results = (await pipelineRes.json()) as [{ result: number }, unknown];
        const count = results[0].result;
        if (count > maxReqs) {
          return { allowed: false, retryAfterSeconds: ttlSeconds };
        }
        return { allowed: true, retryAfterSeconds: 0 };
      }
    } catch {
      // Fall through to in-memory on Upstash failure
    }
  }

  // ── In-memory fallback ─────────────────────────────────────────────────────
  const now = Date.now();

  // Bound memory before admitting a potentially-new key.
  if (store.size >= MAX_STORE_ENTRIES) {
    evictStale(windowMs);
  }

  const entry = store.get(key);

  if (!entry || now - entry.firstRequest > windowMs) {
    store.set(key, { count: 1, firstRequest: now });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (entry.count >= maxReqs) {
    const retryAfterSeconds = Math.ceil((windowMs - (now - entry.firstRequest)) / 1000);
    return { allowed: false, retryAfterSeconds };
  }

  entry.count++;
  return { allowed: true, retryAfterSeconds: 0 };
}
