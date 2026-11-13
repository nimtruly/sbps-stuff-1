import type { APIRoute } from 'astro';
import { checkAdminAuth } from '../../../lib/adminAuth';
import { getDb } from '../../../lib/db';
import { enquiries, applications, careerApplications, payments } from '../../../db/schema';
import { desc } from 'drizzle-orm';
import { getEnv } from '../../../lib/forms';

export const prerender = false;

function toCsv(rows: Record<string, any>[]): string {
  if (rows.length === 0) return '';
  const headers = Object.keys(rows[0]);
  const escapeCsv = (val: any) => {
    if (val === null || val === undefined) return '';
    let str = String(val);
    // Guard against spreadsheet formula injection
    if (/^[=+\-@\t\r]/.test(str)) str = `'${str}`;
    str = str.replace(/"/g, '""');
    return `"${str}"`;
  };

  const lines = [
    headers.map((h) => `"${h}"`).join(','),
    ...rows.map((row) => headers.map((h) => escapeCsv(row[h])).join(',')),
  ];
  return lines.join('\r\n');
}

export const GET: APIRoute = async ({ request, locals }) => {
  const env = getEnv(locals);

  const authResponse = checkAdminAuth(request, env);
  if (authResponse) {
    return authResponse;
  }

  const db = getDb(env.DB);
  const url = new URL(request.url);
  const requested = url.searchParams.get('type') || 'enquiries';
  const type = ['enquiries', 'applications', 'careers', 'payments'].includes(requested) ? requested : 'enquiries';

  let data: any[] = [];
  let filename = `sbps_${type}_${new Date().toISOString().slice(0, 10)}.csv`;

  if (db) {
    try {
      if (type === 'enquiries') {
        data = await db.select().from(enquiries).orderBy(desc(enquiries.createdAt));
      } else if (type === 'applications') {
        data = await db.select().from(applications).orderBy(desc(applications.createdAt));
      } else if (type === 'careers') {
        data = await db.select().from(careerApplications).orderBy(desc(careerApplications.createdAt));
      } else if (type === 'payments') {
        data = await db.select().from(payments).orderBy(desc(payments.createdAt));
      }
    } catch (err) {
      console.warn(`Error querying ${type} for CSV export:`, err);
    }
  }

  const csvString = toCsv(data);

  return new Response(csvString, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control': 'no-store',
    },
  });
};
