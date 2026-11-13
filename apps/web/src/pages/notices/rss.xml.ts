import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const notices = await getCollection('notices');
  const sorted = notices.sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );

  return rss({
    title: 'Notices & Circulars | Social Baluni Public School, Dehradun',
    description: 'Official notices, academic circulars, and announcements from Social Baluni Public School, Dehradun.',
    site: context.site || 'https://www.sbpsdoon.com',
    items: sorted.map((item) => ({
      title: item.data.title,
      pubDate: new Date(item.data.date),
      description: item.data.body.slice(0, 200) + '...',
      link: `/notices/${item.data.id}/`,
    })),
    customData: `<language>en-in</language>`,
  });
}
