import { drizzle } from 'drizzle-orm/d1';
import * as schema from '../db/schema';

// In Cloudflare Workers/Pages, DB is passed via runtime env.
export function getDb(d1?: any) {
  if (d1) {
    return drizzle(d1, { schema });
  }
  return null;
}

export type Database = ReturnType<typeof getDb>;
