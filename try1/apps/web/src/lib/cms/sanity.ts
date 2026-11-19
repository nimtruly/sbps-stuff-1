import { createClient } from '@sanity/client';
import { localDriver } from './local';
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

const projectId = import.meta.env.SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID;
const dataset = import.meta.env.SANITY_DATASET || process.env.SANITY_DATASET || 'production';
const apiVersion = import.meta.env.SANITY_API_VERSION || process.env.SANITY_API_VERSION || '2025-01-01';
const token = import.meta.env.SANITY_READ_TOKEN || process.env.SANITY_READ_TOKEN;

const client = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      token,
    })
  : null;

export const sanityDriver = {
  async getSiteSettings(): Promise<SiteSettings> {
    if (!client) return localDriver.getSiteSettings();
    try {
      const res = await client.fetch('*[_type == "siteSettings"][0]');
      return res || localDriver.getSiteSettings();
    } catch {
      return localDriver.getSiteSettings();
    }
  },

  async getLeaders(): Promise<Leader[]> {
    if (!client) return localDriver.getLeaders();
    try {
      const res = await client.fetch('*[_type == "leader"] | order(order asc)');
      return res?.length ? res : localDriver.getLeaders();
    } catch {
      return localDriver.getLeaders();
    }
  },

  async getLeaderById(id: string): Promise<Leader | undefined> {
    if (!client) return localDriver.getLeaderById(id);
    try {
      const res = await client.fetch('*[_type == "leader" && id == $id][0]', { id });
      return res || localDriver.getLeaderById(id);
    } catch {
      return localDriver.getLeaderById(id);
    }
  },

  async getProgrammes(): Promise<Programme[]> {
    if (!client) return localDriver.getProgrammes();
    try {
      const res = await client.fetch('*[_type == "programme"]');
      return res?.length ? res : localDriver.getProgrammes();
    } catch {
      return localDriver.getProgrammes();
    }
  },

  async getProgrammeBySlug(slug: string): Promise<Programme | undefined> {
    if (!client) return localDriver.getProgrammeBySlug(slug);
    try {
      const res = await client.fetch('*[_type == "programme" && slug == $slug][0]', { slug });
      return res || localDriver.getProgrammeBySlug(slug);
    } catch {
      return localDriver.getProgrammeBySlug(slug);
    }
  },

  async getHouses() {
    return localDriver.getHouses();
  },

  async getNotices(): Promise<Notice[]> {
    if (!client) return localDriver.getNotices();
    try {
      const res = await client.fetch('*[_type == "notice"] | order(pinned desc, date desc)');
      return res?.length ? res : localDriver.getNotices();
    } catch {
      return localDriver.getNotices();
    }
  },

  async getArticles(includeDrafts = false): Promise<Article[]> {
    if (!client) return localDriver.getArticles(includeDrafts);
    try {
      const query = includeDrafts
        ? '*[_type == "article"] | order(publishedAt desc)'
        : '*[_type == "article" && !draft] | order(publishedAt desc)';
      const res = await client.fetch(query);
      return res?.length ? res : localDriver.getArticles(includeDrafts);
    } catch {
      return localDriver.getArticles(includeDrafts);
    }
  },

  async getArticleBySlug(slug: string): Promise<Article | undefined> {
    if (!client) return localDriver.getArticleBySlug(slug);
    try {
      const res = await client.fetch('*[_type == "article" && slug == $slug][0]', { slug });
      return res || localDriver.getArticleBySlug(slug);
    } catch {
      return localDriver.getArticleBySlug(slug);
    }
  },

  async getDisclosureDocs(): Promise<DisclosureDoc[]> {
    if (!client) return localDriver.getDisclosureDocs();
    try {
      const res = await client.fetch('*[_type == "disclosureDoc"]');
      return res?.length ? res : localDriver.getDisclosureDocs();
    } catch {
      return localDriver.getDisclosureDocs();
    }
  },

  async getPolicies(): Promise<Policy[]> {
    if (!client) return localDriver.getPolicies();
    try {
      const res = await client.fetch('*[_type == "policy"]');
      return res?.length ? res : localDriver.getPolicies();
    } catch {
      return localDriver.getPolicies();
    }
  },

  async getPolicyBySlug(slug: string): Promise<Policy | undefined> {
    if (!client) return localDriver.getPolicyBySlug(slug);
    try {
      const res = await client.fetch('*[_type == "policy" && slug == $slug][0]', { slug });
      return res || localDriver.getPolicyBySlug(slug);
    } catch {
      return localDriver.getPolicyBySlug(slug);
    }
  },

  async getFeeItems(): Promise<FeeItem[]> {
    return localDriver.getFeeItems();
  },

  async getInstitutions(): Promise<Institution[]> {
    return localDriver.getInstitutions();
  },

  async getJobs(): Promise<Job[]> {
    if (!client) return localDriver.getJobs();
    try {
      const res = await client.fetch('*[_type == "job" && open == true]');
      return res?.length ? res : localDriver.getJobs();
    } catch {
      return localDriver.getJobs();
    }
  },

  async getFAQs(page?: string): Promise<FAQ[]> {
    return localDriver.getFAQs(page);
  },

  async getStats(onlyVerified = true): Promise<Stat[]> {
    return localDriver.getStats(onlyVerified);
  },

  async getAlbums(): Promise<Album[]> {
    if (!client) return localDriver.getAlbums();
    try {
      const res = await client.fetch('*[_type == "album"] | order(date desc)');
      return res?.length ? res : localDriver.getAlbums();
    } catch {
      return localDriver.getAlbums();
    }
  },

  async getAlbumBySlug(slug: string): Promise<Album | undefined> {
    if (!client) return localDriver.getAlbumBySlug(slug);
    try {
      const res = await client.fetch('*[_type == "album" && slug == $slug][0]', { slug });
      return res || localDriver.getAlbumBySlug(slug);
    } catch {
      return localDriver.getAlbumBySlug(slug);
    }
  },
};
