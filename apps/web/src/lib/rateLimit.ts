import { eq } from 'drizzle-orm';
import { rateLimits } from '../db/schema';
import type { Database } from './db';

// Fallback in-memory cache for local development without active D1 binding
const memoryLimits = new Map<string, { count: number; resetAt: number }>();

export async function checkRateLimit(
  db: Database,
  ip: string,
  action: string,
  maxRequests = 5,
  windowSeconds = 600
): Promise<{ allowed: boolean; remaining: number }> {
  const key = `${ip || '127.0.0.1'}:${action}`;
  const now = Math.floor(Date.now() / 1000);

  if (!db) {
    // Memory fallback
    const existing = memoryLimits.get(key);
    if (!existing || existing.resetAt < now) {
      memoryLimits.set(key, { count: 1, resetAt: now + windowSeconds });
      return { allowed: true, remaining: maxRequests - 1 };
    }
    if (existing.count >= maxRequests) {
      return { allowed: false, remaining: 0 };
    }
    existing.count += 1;
    return { allowed: true, remaining: maxRequests - existing.count };
  }

  try {
    const existing = await db
      .select()
      .from(rateLimits)
      .where(eq(rateLimits.key, key))
      .get();

    if (!existing || existing.resetAt < now) {
      await db
        .insert(rateLimits)
        .values({
          key,
          count: 1,
          resetAt: now + windowSeconds,
        })
        .onConflictDoUpdate({
          target: rateLimits.key,
          set: { count: 1, resetAt: now + windowSeconds },
        });
      return { allowed: true, remaining: maxRequests - 1 };
    }

    if (existing.count >= maxRequests) {
      return { allowed: false, remaining: 0 };
    }

    await db
      .update(rateLimits)
      .set({ count: existing.count + 1 })
      .where(eq(rateLimits.key, key));

    return { allowed: true, remaining: maxRequests - (existing.count + 1) };
  } catch (err) {
    console.warn('Rate limit check error:', err);
    return { allowed: true, remaining: maxRequests };
  }
}
