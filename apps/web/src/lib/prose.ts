/**
 * Renders the light markdown that school staff write in the CMS:
 * paragraphs, "### " headings, "- " lists, **bold** and [links](/path).
 * Everything is escaped first, so staff text can never inject HTML.
 */
const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const inline = (s: string) =>
  esc(s)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\(((?:https?:\/\/|\/|tel:|mailto:)[^)\s]*)\)/g, '<a href="$2">$1</a>');

export function renderProse(text: string): string {
  return (text || '')
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      if (block.startsWith('### ')) return `<h2>${inline(block.slice(4))}</h2>`;
      const lines = block.split('\n');
      if (lines.every((l) => l.startsWith('- '))) {
        return `<ul>${lines.map((l) => `<li>${inline(l.slice(2))}</li>`).join('')}</ul>`;
      }
      return `<p>${lines.map(inline).join('<br>')}</p>`;
    })
    .join('');
}
