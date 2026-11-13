import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const siteSettings = defineCollection({
  loader: glob({ pattern: 'siteSettings.json', base: 'src/content' }),
  schema: z.object({
    name: z.string(),
    shortName: z.string(),
    affiliationNo: z.string(),
    schoolCode: z.string(),
    address: z.string(),
    geo: z.object({
      lat: z.number(),
      lng: z.number(),
      verified: z.boolean(),
    }),
    phones: z.array(z.string()),
    emails: z.array(z.string()),
    socials: z.array(z.object({
      platform: z.string(),
      url: z.string(),
    })),
    whatsappChannelUrl: z.string().optional(),
    admissionsOpen: z.boolean(),
    admissionsSession: z.string(),
    tickerItems: z.array(z.string()),
    paymentLinks: z.array(z.object({
      label: z.string(),
      url: z.string(),
      amount: z.number().optional(),
      description: z.string().optional(),
    })).optional(),
  }),
});

const leaders = defineCollection({
  loader: glob({ pattern: '**/*.json', base: 'src/content/leaders' }),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    role: z.string(),
    org: z.string(),
    credentials: z.string().optional(),
    photo: z.string().optional(),
    message: z.string(),
    order: z.number(),
  }),
});

const notices = defineCollection({
  loader: glob({ pattern: '**/*.json', base: 'src/content/notices' }),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    date: z.string(),
    category: z.enum(['Admissions', 'Exams', 'Holidays', 'Events', 'General']),
    body: z.string(),
    attachments: z.array(z.object({
      title: z.string(),
      url: z.string(),
    })).optional(),
    pinned: z.boolean().optional(),
    expiresAt: z.string().optional(),
    notify: z.boolean().optional(),
  }),
});

const articles = defineCollection({
  loader: glob({ pattern: '**/*.json', base: 'src/content/articles' }),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    slug: z.string(),
    excerpt: z.string(),
    cover: z.string().optional(),
    author: z.string(),
    publishedAt: z.string(),
    category: z.enum(['News', 'Achievements', 'Admissions Guides', 'Parent Tips', 'Integrated Coaching']),
    tags: z.array(z.string()),
    body: z.string(),
    draft: z.boolean().optional(),
  }),
});

export const collections = {
  siteSettings,
  leaders,
  notices,
  articles,
};
