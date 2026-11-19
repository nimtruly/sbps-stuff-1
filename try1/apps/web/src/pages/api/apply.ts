import type { APIRoute } from 'astro';
import { applications } from '../../db/schema';
import { applicationRef, applicationSchema, emailTable, methodNotAllowed } from '../../lib/forms';
import { handleSubmission } from '../../lib/submission';

export const prerender = false;

export const GET: APIRoute = () => methodNotAllowed();

export const POST: APIRoute = (ctx) =>
  handleSubmission(ctx, {
    form: 'apply',
    schema: applicationSchema,
    fallbackRef: () => applicationRef(),
    save: async (db, d, meta) => {
      const ref = applicationRef();
      await db.insert(applications).values({
        id: ref,
        studentName: d.studentName,
        gender: d.gender,
        dob: d.dob,
        grade: d.grade,
        aadhaarChild: null,
        previousSchool: d.previousSchool ?? null,
        previousBoard: d.previousBoard ?? null,
        lastClassPercentage: d.lastClassPercentage ?? null,
        fatherName: d.fatherName,
        fatherOccupation: d.fatherOccupation ?? null,
        motherName: d.motherName,
        motherOccupation: d.motherOccupation ?? null,
        mobile: d.mobile,
        email: d.email,
        address: d.address,
        declaration: true,
        ip: meta.ip,
        createdAt: meta.createdAt,
      });
      return ref;
    },
    alert: (d, ref) => ({
      subject: `New application ${ref ?? ''}: ${d.studentName} (${d.grade})`.slice(0, 140),
      html: emailTable('New admission application', [
        ['Reference', ref],
        ['Student', d.studentName],
        ['Gender', d.gender],
        ['Date of birth', d.dob],
        ['Class applied for', d.grade],
        ['Previous school', d.previousSchool],
        ['Previous board', d.previousBoard],
        ['Last class result', d.lastClassPercentage],
        ['Father name', d.fatherName],
        ['Father occupation', d.fatherOccupation],
        ['Mother name', d.motherName],
        ['Mother occupation', d.motherOccupation],
        ['Mobile', d.mobile],
        ['Email', d.email],
        ['Address', d.address],
      ]),
    }),
  });
