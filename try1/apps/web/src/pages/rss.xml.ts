import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const articles = await getCollection('articles');
  const notices = await getCollection('notices');

  const articleItems = articles
    .filter((a) => !a.data.draft)
    .map((item) => ({
      title: item.data.title,
      pubDate: new Date(item.data.publishedAt),
      description: item.data.excerpt,
      link: `/blog/${item.data.slug}/`,
    }));

  const noticeItems = notices.map((item) => ({
    title: `[Notice] ${item.data.title}`,
    pubDate: new Date(item.data.date),
    description: item.data.body.slice(0, 200) + '...',
    link: `/notices/${item.data.id}/`,
  }));

  const combined = [...articleItems, ...noticeItems].sort(
    (a, b) => b.pubDate.getTime() - a.pubDate.getTime()
  );

  return rss({
    title: 'Social Baluni Public School, Dehradun — Feed',
    description: 'Combined feed of official circulars, news, and articles from Social Baluni Public School, Dehradun.',
    site: context.site || 'https://www.sbpsdoon.com',
    items: combined,
    customData: `<language>en-in</language>`,
  });
}
