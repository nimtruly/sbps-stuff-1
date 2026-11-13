import { useEffect, useRef, useState } from 'preact/hooks';

interface NavItem {
  title: string;
  href: string;
}
interface NavSection {
  title: string;
  href: string;
  items: NavItem[];
}

interface Props {
  sections: NavSection[];
  utility: NavItem[];
}

export default function MobileNav({ sections, utility }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const main = document.getElementById('main-content');
    const footer = document.querySelector('footer');
    const bar = document.querySelector('[data-mobile-bar]');
    const outside = [main, footer, bar].filter(Boolean) as HTMLElement[];

    if (isOpen) {
      document.documentElement.style.overflow = 'hidden';
      outside.forEach((el) => el.setAttribute('inert', ''));
      closeRef.current?.focus();
      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setIsOpen(false);
      };
      window.addEventListener('keydown', onKey);
      return () => window.removeEventListener('keydown', onKey);
    }
    document.documentElement.style.overflow = '';
    outside.forEach((el) => el.removeAttribute('inert'));
    return undefined;
  }, [isOpen]);

  const close = () => {
    setIsOpen(false);
    toggleRef.current?.focus();
  };

  return (
    <div class="lg:hidden">
      <button
        ref={toggleRef}
        type="button"
        class="inline-flex h-11 items-center gap-2 border-2 border-ink px-3 text-[0.9375rem] font-semibold text-ink"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        onClick={() => setIsOpen(true)}
      >
        <svg class="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M1 3.5h14M1 8h14M1 12.5h14" stroke="currentColor" stroke-width="1.75" />
        </svg>
        Menu
      </button>

      {isOpen && (
        <div id="mobile-menu" class="fixed inset-0 z-50 flex flex-col bg-paper-50" role="dialog" aria-modal="true" aria-label="Site menu">
          <div class="tie-band h-2" aria-hidden="true"></div>
          <div class="flex h-16 items-center justify-between border-b-2 border-ink px-4">
            <span class="font-display text-xl font-bold [font-stretch:78%]">Menu</span>
            <button
              ref={closeRef}
              type="button"
              class="inline-flex h-11 items-center gap-2 px-3 text-[0.9375rem] font-semibold"
              onClick={close}
            >
              Close
              <svg class="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="m3 3 10 10M13 3 3 13" stroke="currentColor" stroke-width="1.75" />
              </svg>
            </button>
          </div>

          <nav class="flex-1 overflow-y-auto px-4 pb-28" aria-label="Main">
            <ul role="list">
              {sections.map((s) => {
                const open = active === s.title;
                const id = `m-${s.title.replace(/\s+/g, '-').toLowerCase()}`;
                return (
                  <li class="border-b border-paper-300">
                    <button
                      type="button"
                      class="flex w-full items-center justify-between py-4 text-left font-display text-2xl font-bold [font-stretch:80%]"
                      aria-expanded={open}
                      aria-controls={id}
                      onClick={() => setActive(open ? null : s.title)}
                    >
                      {s.title}
                      <svg class={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} viewBox="0 0 12 12" fill="none" aria-hidden="true">
                        <path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" stroke-width="1.75" />
                      </svg>
                    </button>
                    <ul id={id} hidden={!open} class="pb-3" role="list">
                      {s.items.map((item) => (
                        <li>
                          <a href={item.href} class="block py-2.5 pl-4 text-base text-paper-800 hover:text-crimson-700">
                            {item.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              })}
            </ul>
            <ul class="mt-6 grid gap-1" role="list">
              {utility.map((u) => (
                <li>
                  <a href={u.href} class="block py-2 text-base font-semibold text-ink underline">
                    {u.title}
                  </a>
                </li>
              ))}
              <li>
                <a href="/search/" class="block py-2 text-base font-semibold text-ink underline">
                  Search
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}
