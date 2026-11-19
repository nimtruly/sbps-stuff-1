import type { APIRoute } from 'astro';
import { careerApplications } from '../../db/schema';
import { careerSchema, emailTable, methodNotAllowed, newId } from '../../lib/forms';
import { handleSubmission } from '../../lib/submission';

export const prerender = false;

export const GET: APIRoute = () => methodNotAllowed();

export const POST: APIRoute = (ctx) =>
  handleSubmission(ctx, {
    form: 'careers',
    schema: careerSchema,
    save: async (db, d, meta) => {
      await db.insert(careerApplications).values({
        id: newId('job'),
        fullName: d.fullName,
        email: d.email,
        phone: d.phone,
        position: d.position,
        experience: d.experience ?? null,
        qualifications: d.qualifications ?? null,
        coverNote: d.coverNote ?? null,
        ip: meta.ip,
        createdAt: meta.createdAt,
      });
    },
    alert: (d) => ({
      subject: `Job application: ${d.position} (${d.fullName})`.slice(0, 140),
      html: emailTable('New job application', [
        ['Name', d.fullName],
        ['Position', d.position],
        ['Email', d.email],
        ['Phone', d.phone],
        ['Experience', d.experience],
        ['Qualifications', d.qualifications],
        ['Cover note', d.coverNote],
      ]),
    }),
  });
