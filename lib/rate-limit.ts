import type { NextRequest } from "next/server";

// Module-level store — resets on process restart.
// For distributed/serverless deployments, set UPSTASH_REDIS_REST_URL +
// UPSTASH_REDIS_REST_TOKEN to enable persistent cross-instance rate limiting.
const store = new Map<string, { count: number; firstRequest: number }>();

export function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
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
