import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

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

const albums = defineCollection({
  loader: glob({ pattern: '**/*.json', base: 'src/content/albums' }),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    slug: z.string(),
    date: z.string(),
    cover: z.string(),
    category: z.string(),
    images: z.array(z.object({
      url: z.string(),
      alt: z.string(),
      caption: z.string().optional(),
    })),
  }),
});

const disclosureDocs = defineCollection({
  loader: glob({ pattern: '**/*.json', base: 'src/content/disclosureDocs' }),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    group: z.string(),
    fileUrl: z.string().optional(),
    value: z.string().optional(),
    validFrom: z.string().optional(),
    validTo: z.string().optional(),
    updatedAt: z.string(),
    expired: z.boolean().optional(),
  }),
});

const feeItems = defineCollection({
  loader: glob({ pattern: '**/*.json', base: 'src/content/feeItems' }),
  schema: z.object({
    id: z.string(),
    label: z.string(),
    classRange: z.string(),
    type: z.enum(['one-time', 'quarterly', 'monthly', 'refundable']),
    refundable: z.boolean(),
    amount: z.number(),
    note: z.string().optional(),
    session: z.string(),
    verified: z.boolean(),
  }),
});

const policies = defineCollection({
  loader: glob({ pattern: '**/*.json', base: 'src/content/policies' }),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    slug: z.string(),
    summary: z.string(),
    body: z.string(),
  }),
});

const institutions = defineCollection({
  loader: glob({ pattern: '**/*.json', base: 'src/content/institutions' }),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    type: z.string(),
    address: z.string(),
    phones: z.array(z.string()),
    email: z.string(),
    url: z.string(),
    logo: z.string().optional(),
  }),
});

const jobs = defineCollection({
  loader: glob({ pattern: '**/*.json', base: 'src/content/jobs' }),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    department: z.string(),
    type: z.string(),
    description: z.string(),
    open: z.boolean(),
  }),
});

const faqs = defineCollection({
  loader: glob({ pattern: '**/*.json', base: 'src/content/faqs' }),
  schema: z.object({
    id: z.string(),
    question: z.string(),
    answer: z.string(),
    page: z.enum(['admissions', 'home', 'fees', 'general']),
    verified: z.boolean(),
  }),
});

const stats = defineCollection({
  loader: glob({ pattern: '**/*.json', base: 'src/content/stats' }),
  schema: z.object({
    id: z.string(),
    label: z.string(),
    value: z.string(),
    context: z.string(),
    source: z.string(),
    verified: z.boolean(),
  }),
});

const programmes = defineCollection({
  loader: glob({ pattern: '**/*.json', base: 'src/content/programmes' }),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    slug: z.string(),
    duration: z.string(),
    eligibility: z.string(),
    summary: z.string(),
    body: z.string(),
    partner: z.string(),
    features: z.array(z.string()),
  }),
});

const houses = defineCollection({
  loader: glob({ pattern: '**/*.json', base: 'src/content/houses' }),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    river: z.string(),
    colorName: z.string().optional(),
    colorHex: z.string().optional(),
    colour: z.string().optional(),
    motto: z.string().optional(),
    source: z.string().optional(),
    values: z.array(z.string()).optional(),
    description: z.string(),
  }),
});

export const collections = {
  siteSettings,
  leaders,
  notices,
  articles,
  albums,
  disclosureDocs,
  feeItems,
  policies,
  institutions,
  jobs,
  faqs,
  stats,
  programmes,
  houses,
};
