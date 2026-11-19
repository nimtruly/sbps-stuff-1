import type { APIRoute } from 'astro';
import { enquiries } from '../../db/schema';
import { emailTable, enquirySchema, methodNotAllowed, newId } from '../../lib/forms';
import { handleSubmission } from '../../lib/submission';

export const prerender = false;

export const GET: APIRoute = () => methodNotAllowed();

export const POST: APIRoute = (ctx) =>
  handleSubmission(ctx, {
    form: 'enquiry',
    schema: enquirySchema,
    save: async (db, d, meta) => {
      await db.insert(enquiries).values({
        id: newId('enq'),
        parentName: d.parentName,
        studentName: d.studentName ?? 'Not specified',
        grade: d.grade,
        email: d.email ?? '',
        phone: d.phone,
        preferredContact: d.preferredContact,
        message: d.message ?? null,
        ip: meta.ip,
        createdAt: meta.createdAt,
      });
    },
    alert: (d) => ({
      subject: `New enquiry: ${d.grade} (${d.parentName})`.slice(0, 140),
      html: emailTable('New enquiry from the website', [
        ['Parent / visitor', d.parentName],
        ['Student', d.studentName],
        ['Class / topic', d.grade],
        ['Phone', d.phone],
        ['Email', d.email],
        ['Preferred contact', d.preferredContact],
        ['Message', d.message],
      ]),
    }),
  });
