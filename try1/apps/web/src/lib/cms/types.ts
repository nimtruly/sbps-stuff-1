export interface SiteSettings {
  name: string;
  shortName: string;
  affiliationNo: string;
  schoolCode: string;
  address: string;
  geo: {
    lat: number;
    lng: number;
    verified: boolean;
  };
  phones: string[];
  emails: string[];
  socials: {
    platform: string;
    url: string;
  }[];
  whatsappChannelUrl?: string;
  admissionsOpen: boolean;
  admissionsSession: string;
  tickerItems: string[];
  paymentLinks?: {
    label: string;
    url: string;
    amount?: number;
    description?: string;
  }[];
}

export interface PageContent {
  id: string;
  title: string;
  slug: string;
  section: string;
  summary: string;
  body: string;
  heroImage?: string;
  seo?: {
    title?: string;
    description?: string;
    ogImage?: string;
  };
}

export interface Leader {
  id: string;
  name: string;
  role: string;
  org: string;
  credentials?: string;
  photo?: string;
  message: string;
  order: number;
}

export interface Notice {
  id: string;
  title: string;
  date: string;
  category: 'Admissions' | 'Exams' | 'Holidays' | 'Events' | 'General';
  body: string;
  attachments?: {
    title: string;
    url: string;
  }[];
  pinned?: boolean;
  expiresAt?: string;
  notify?: boolean;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  cover?: string;
  author: string;
  publishedAt: string;
  category: 'News' | 'Achievements' | 'Admissions Guides' | 'Parent Tips' | 'Integrated Coaching';
  tags: string[];
  body: string;
  draft?: boolean;
  seo?: {
    title?: string;
    description?: string;
    ogImage?: string;
  };
}

export interface Album {
  id: string;
  title: string;
  slug: string;
  date: string;
  cover: string;
  category: string;
  images: {
    url: string;
    alt: string;
    caption?: string;
  }[];
}

export interface DisclosureDoc {
  id: string;
  title: string;
  group: 'General Information' | 'Documents and Information' | 'Results and Academics' | 'Staff (Teaching)' | 'School Infrastructure';
  fileUrl?: string;
  value?: string;
  validFrom?: string;
  validTo?: string;
  updatedAt: string;
  expired?: boolean;
}

export interface Programme {
  id: string;
  title: string;
  slug: string;
  duration: string;
  eligibility: string;
  summary: string;
  body: string;
  partner: string;
  features: string[];
}

export interface FeeItem {
  id: string;
  label: string;
  classRange: string;
  type: 'one-time' | 'quarterly' | 'monthly' | 'refundable';
  refundable: boolean;
  amount: number;
  note?: string;
  session: string;
  verified: boolean;
}

export interface Policy {
  id: string;
  title: string;
  slug: string;
  summary: string;
  body: string;
}

export interface Stat {
  id: string;
  label: string;
  value: string;
  context: string;
  source: string;
  verified: boolean;
}

export interface Achiever {
  id: string;
  name: string;
  exam: string;
  year: number;
  rankOrScore: string;
  photo?: string;
  verified: boolean;
}

export interface Testimonial {
  id: string;
  quote: string;
  person: string;
  relation: string;
  verified: boolean;
}

export interface Job {
  id: string;
  title: string;
  department: string;
  type: string;
  description: string;
  open: boolean;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  page: 'admissions' | 'home' | 'fees' | 'general';
  verified: boolean;
}

export interface Institution {
  id: string;
  name: string;
  type: string;
  address: string;
  phones: string[];
  email: string;
  url: string;
  logo?: string;
}
