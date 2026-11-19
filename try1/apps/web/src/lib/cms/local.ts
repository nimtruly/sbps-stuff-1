import type {
  SiteSettings,
  Leader,
  Programme,
  Notice,
  Article,
  DisclosureDoc,
  FeeItem,
  Policy,
  Institution,
  Job,
  FAQ,
  Stat,
  Album,
} from './types';

import siteSettingsRaw from '../../content/siteSettings.json';

/**
 * Local driver: reads every JSON file under src/content/<collection>/.
 * Adding or deleting a file is enough; no import list to maintain.
 */
const load = <T>(files: Record<string, unknown>): T[] => Object.values(files) as T[];

const leaders = load<Leader>(import.meta.glob('../../content/leaders/*.json', { eager: true, import: 'default' }));
const programmes = load<Programme>(import.meta.glob('../../content/programmes/*.json', { eager: true, import: 'default' }));
const houses = load<any>(import.meta.glob('../../content/houses/*.json', { eager: true, import: 'default' }));
const notices = load<Notice>(import.meta.glob('../../content/notices/*.json', { eager: true, import: 'default' }));
const articles = load<Article>(import.meta.glob('../../content/articles/*.json', { eager: true, import: 'default' }));
const disclosureDocs = load<DisclosureDoc & { order?: number }>(
  import.meta.glob('../../content/disclosureDocs/*.json', { eager: true, import: 'default' }),
);
const policies = load<Policy>(import.meta.glob('../../content/policies/*.json', { eager: true, import: 'default' }));
const feeItems = load<FeeItem & { order?: number }>(import.meta.glob('../../content/feeItems/*.json', { eager: true, import: 'default' }));
const institutions = load<Institution>(import.meta.glob('../../content/institutions/*.json', { eager: true, import: 'default' }));
const jobs = load<Job>(import.meta.glob('../../content/jobs/*.json', { eager: true, import: 'default' }));
const faqs = load<FAQ & { order?: number }>(import.meta.glob('../../content/faqs/*.json', { eager: true, import: 'default' }));
const stats = load<Stat & { order?: number }>(import.meta.glob('../../content/stats/*.json', { eager: true, import: 'default' }));
const albums = load<Album>(import.meta.glob('../../content/albums/*.json', { eager: true, import: 'default' }));

const byOrder = <T extends { order?: number }>(list: T[]) =>
  [...list].sort((a, b) => (a.order ?? 99) - (b.order ?? 99));

/** Production builds never show unverified data (BUILD-SPEC §0). */
const showUnverified = import.meta.env.DEV;
const visible = <T extends { verified?: boolean }>(list: T[]) =>
  showUnverified ? list : list.filter((item) => item.verified !== false);

const HOUSE_ORDER = ['alaknanda', 'bhilangna', 'bhagirathi', 'mandakini'];

export const localDriver = {
  async getSiteSettings(): Promise<SiteSettings> {
    return siteSettingsRaw as SiteSettings;
  },

  async getLeaders(): Promise<Leader[]> {
    return [...leaders].sort((a, b) => a.order - b.order);
  },

  async getLeaderById(id: string): Promise<Leader | undefined> {
    return leaders.find((l) => l.id === id);
  },

  async getProgrammes(): Promise<Programme[]> {
    return byOrder(programmes as (Programme & { order?: number })[]);
  },

  async getProgrammeBySlug(slug: string): Promise<Programme | undefined> {
    return programmes.find((p) => p.slug === slug);
  },

  async getHouses() {
    return [...houses].sort((a, b) => HOUSE_ORDER.indexOf(a.id) - HOUSE_ORDER.indexOf(b.id));
  },

  async getNotices(): Promise<Notice[]> {
    return [...notices].sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  },

  async getArticles(includeDrafts = false): Promise<Article[]> {
    const list = includeDrafts ? articles : articles.filter((a) => !a.draft);
    return [...list].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  },

  async getArticleBySlug(slug: string): Promise<Article | undefined> {
    return articles.find((a) => a.slug === slug);
  },

  async getDisclosureDocs(): Promise<DisclosureDoc[]> {
    return visible(byOrder(disclosureDocs as (DisclosureDoc & { order?: number; verified?: boolean })[]));
  },

  async getPolicies(): Promise<Policy[]> {
    return byOrder(policies as (Policy & { order?: number })[]);
  },

  async getPolicyBySlug(slug: string): Promise<Policy | undefined> {
    return policies.find((p) => p.slug === slug);
  },

  async getFeeItems(): Promise<FeeItem[]> {
    return byOrder(feeItems);
  },

  async getInstitutions(): Promise<Institution[]> {
    return [...institutions];
  },

  async getJobs(): Promise<Job[]> {
    return jobs.filter((j) => j.open);
  },

  async getFAQs(page?: string): Promise<FAQ[]> {
    const list = visible(byOrder(faqs));
    return page ? list.filter((f) => f.page === page || f.page === 'general') : list;
  },

  async getStats(onlyVerified = true): Promise<Stat[]> {
    const list = byOrder(stats);
    return onlyVerified ? list.filter((s) => s.verified) : list;
  },

  async getAlbums(): Promise<Album[]> {
    return [...albums].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  },

  async getAlbumBySlug(slug: string): Promise<Album | undefined> {
    return albums.find((a) => a.slug === slug);
  },
};
