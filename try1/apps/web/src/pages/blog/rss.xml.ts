import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const articles = await getCollection('articles');
  const published = articles
    .filter((a) => !a.data.draft)
    .sort(
      (a, b) => new Date(b.data.publishedAt).getTime() - new Date(a.data.publishedAt).getTime()
    );

  return rss({
    title: 'School News & Articles | Social Baluni Public School, Dehradun',
    description: 'Latest news, sports updates, and educational articles from Social Baluni Public School, Dehradun.',
    site: context.site || 'https://www.sbpsdoon.com',
    items: published.map((item) => ({
      title: item.data.title,
      pubDate: new Date(item.data.publishedAt),
      description: item.data.excerpt,
      link: `/blog/${item.data.slug}/`,
    })),
    customData: `<language>en-in</language>`,
  });
}
