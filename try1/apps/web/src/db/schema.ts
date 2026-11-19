import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

export const enquiries = sqliteTable('enquiries', {
  id: text('id').primaryKey(),
  parentName: text('parent_name').notNull(),
  studentName: text('student_name').notNull(),
  grade: text('grade').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull(),
  preferredContact: text('preferred_contact').default('phone'),
  message: text('message'),
  ip: text('ip'),
  createdAt: text('created_at').notNull(),
});

export const applications = sqliteTable('applications', {
  id: text('id').primaryKey(),
  studentName: text('student_name').notNull(),
  gender: text('gender').notNull(),
  dob: text('dob').notNull(),
  grade: text('grade').notNull(),
  aadhaarChild: text('aadhaar_child'),
  previousSchool: text('previous_school'),
  previousBoard: text('previous_board'),
  lastClassPercentage: text('last_class_percentage'),
  fatherName: text('father_name').notNull(),
  fatherOccupation: text('father_occupation'),
  motherName: text('mother_name').notNull(),
  motherOccupation: text('mother_occupation'),
  mobile: text('mobile').notNull(),
  email: text('email').notNull(),
  address: text('address').notNull(),
  declaration: integer('declaration', { mode: 'boolean' }).notNull(),
  ip: text('ip'),
  createdAt: text('created_at').notNull(),
});

export const careerApplications = sqliteTable('career_applications', {
  id: text('id').primaryKey(),
  fullName: text('full_name').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull(),
  position: text('position').notNull(),
  experience: text('experience'),
  qualifications: text('qualifications'),
  coverNote: text('cover_note'),
  ip: text('ip'),
  createdAt: text('created_at').notNull(),
});

export const payments = sqliteTable('payments', {
  id: text('id').primaryKey(),
  orderId: text('order_id').notNull(),
  paymentId: text('payment_id'),
  signature: text('signature'),
  amount: real('amount').notNull(),
  currency: text('currency').default('INR'),
  status: text('status').notNull(), // 'created' | 'paid' | 'failed'
  feeCategory: text('fee_category').notNull(),
  studentName: text('student_name'),
  parentEmail: text('parent_email'),
  parentPhone: text('parent_phone'),
  notes: text('notes'),
  createdAt: text('created_at').notNull(),
});

export const subscribers = sqliteTable('subscribers', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  channel: text('channel').default('web'),
  createdAt: text('created_at').notNull(),
});

export const notifications = sqliteTable('notifications', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  message: text('message').notNull(),
  url: text('url'),
  channel: text('channel').notNull(), // 'onesignal' | 'brevo' | 'all'
  status: text('status').notNull(), // 'sent' | 'failed'
  sentAt: text('sent_at').notNull(),
});

export const rateLimits = sqliteTable('rate_limits', {
  key: text('key').primaryKey(), // ip:action
  count: integer('count').notNull(),
  resetAt: integer('reset_at').notNull(), // unix timestamp
});
