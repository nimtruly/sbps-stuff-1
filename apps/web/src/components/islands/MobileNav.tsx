import { useState, useEffect } from 'preact/hooks';

interface NavSection {
  title: string;
  href: string;
  items?: { title: string; href: string; desc?: string }[];
}

const navSections: NavSection[] = [
  {
    title: 'About',
    href: '/about/',
    items: [
      { title: 'Our Story & Vision', href: '/about/', desc: 'Founded in 2014, Mandakini Seva Samiti unit' },
      { title: 'Leadership Messages', href: '/about/leadership/', desc: 'Messages from Chairmen, MDs & Principal' },
      { title: 'Campus & Facilities', href: '/about/campus/', desc: 'Labs, transport, sports, and infrastructure' },
      { title: 'River House System', href: '/about/house-system/', desc: 'Alaknanda, Bhilangna, Bhagirathi, Mandakini' },
      { title: 'Baluni Group', href: '/baluni-group/', desc: 'Sister institutions across Uttarakhand & UP' },
    ],
  },
  {
    title: 'Academics',
    href: '/academics/',
    items: [
      { title: 'Curriculum & Pedagogy', href: '/academics/', desc: 'Nursery to XII with XSEED experiential learning' },
      { title: 'Integrated Programme', href: '/academics/integrated-programme/', desc: 'School + NEET, JEE & NDA under one roof' },
      { title: 'Day Boarding', href: '/academics/day-boarding/', desc: 'Extended academic & sports day programme' },
      { title: 'Results & Achievers', href: '/academics/results/', desc: 'CBSE board performance & competitive exam ranks' },
    ],
  },
  {
    title: 'Admissions',
    href: '/admissions/',
    items: [
      { title: 'Admissions Process', href: '/admissions/', desc: 'Timeline, age criteria & document checklist' },
      { title: 'Fee Structure', href: '/admissions/fees/', desc: 'Transparent fee schedule & quarterly breakdown' },
      { title: 'Enquire Now', href: '/admissions/enquire/', desc: 'Request callback or schedule campus visit' },
      { title: 'Online Application', href: '/admissions/apply/', desc: 'Complete admission application form' },
      { title: 'Admissions FAQ', href: '/admissions/faq/', desc: 'Frequently asked parent questions' },
    ],
  },
  {
    title: 'Campus Life',
    href: '/campus-life/',
    items: [
      { title: 'Campus Life Overview', href: '/campus-life/', desc: 'Holistic learning beyond classrooms' },
      { title: 'Sports & Academies', href: '/campus-life/sports/', desc: '15 sports, boxing, shooting & cricket' },
      { title: 'Co-Curricular Activities', href: '/campus-life/co-curricular/', desc: 'Clubs, debates, arts & music' },
      { title: 'Photo Gallery', href: '/campus-life/gallery/', desc: 'Visual moments of campus events' },
    ],
  },
  {
    title: 'Parents',
    href: '/parents/',
    items: [
      { title: 'Parents Hub', href: '/parents/', desc: 'Central updates, portal links & notice board' },
      { title: 'Notices & Circulars', href: '/notices/', desc: 'Official administrative & exam notices' },
      { title: 'Academic Year Planner', href: '/parents/year-planner/', desc: 'Calendar of exams, holidays and events' },
      { title: 'Rules & Policies', href: '/parents/policies/', desc: 'Discipline, leaves, child protection & safety' },
      { title: 'Transfer Certificate (TC)', href: '/parents/transfer-certificate/', desc: 'TC procedure and issued certificates' },
      { title: 'Pay Tuition Fees', href: '/parents/pay-fees/', desc: 'Online fee payment via Razorpay' },
    ],
  },
  {
    title: 'Contact',
    href: '/contact/',
    items: [
      { title: 'Contact Us & Map', href: '/contact/', desc: 'Campus address, direct phone & directions' },
      { title: 'Careers', href: '/careers/', desc: 'Join our teaching & administrative faculty' },
      { title: 'CBSE Disclosure', href: '/disclosure/', desc: 'Mandatory Public Disclosure (Appendix-IX)' },
    ],
  },
];

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const toggleSection = (title: string) => {
    setActiveSection(activeSection === title ? null : title);
  };

  return (
    <div class="lg:hidden">
      <button
        type="button"
        class="p-2.5 rounded-md text-crimson-800 hover:text-crimson-900 hover:bg-paper-200 transition-colors focus-visible:outline-2 focus-visible:outline-crimson-700"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {isOpen && (
        <div class="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            class="fixed inset-0 bg-ink/50 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer */}
          <div class="relative ml-auto w-full max-w-sm bg-paper-100 h-full shadow-2xl flex flex-col z-10 overflow-y-auto">
            {/* Drawer Header */}
            <div class="p-4 border-b border-paper-300 flex items-center justify-between bg-paper-50">
              <span class="font-serif font-bold text-crimson-800 text-lg">Menu</span>
              <button
                type="button"
                class="p-2 text-paper-700 hover:text-crimson-800 rounded-md"
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
              >
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Quick Actions */}
            <div class="p-4 grid grid-cols-2 gap-2 bg-crimson-50 border-b border-crimson-100">
              <a
                href="/admissions/enquire/"
                class="flex items-center justify-center py-2 px-3 bg-crimson-700 text-white rounded font-medium text-xs text-center"
                onClick={() => setIsOpen(false)}
              >
                Enquire Now
              </a>
              <a
                href="/parents/pay-fees/"
                class="flex items-center justify-center py-2 px-3 bg-forest-800 text-white rounded font-medium text-xs text-center"
                onClick={() => setIsOpen(false)}
              >
                Pay Fees
              </a>
            </div>

            {/* Nav List */}
            <nav class="flex-1 px-4 py-4 space-y-1">
              <a
                href="/"
                class="block py-2.5 px-3 rounded-md text-sm font-semibold text-paper-900 hover:bg-paper-200"
                onClick={() => setIsOpen(false)}
              >
                Home
              </a>

              {navSections.map((sec) => (
                <div key={sec.title} class="border-b border-paper-200/60 pb-1">
                  <button
                    type="button"
                    class="w-full flex items-center justify-between py-2.5 px-3 rounded-md text-sm font-semibold text-paper-900 hover:bg-paper-200 text-left"
                    onClick={() => toggleSection(sec.title)}
                  >
                    <span>{sec.title}</span>
                    <svg
                      class={`h-4 w-4 text-paper-500 transition-transform ${activeSection === sec.title ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {activeSection === sec.title && sec.items && (
                    <div class="pl-4 pr-2 py-1 space-y-1 bg-paper-50/50 rounded-md">
                      {sec.items.map((item) => (
                        <a
                          key={item.href}
                          href={item.href}
                          class="block py-1.5 px-2 text-xs font-medium text-paper-800 hover:text-crimson-700 hover:bg-paper-200/60 rounded"
                          onClick={() => setIsOpen(false)}
                        >
                          <div class="font-semibold text-paper-900">{item.title}</div>
                          {item.desc && <div class="text-[11px] text-paper-600 line-clamp-1">{item.desc}</div>}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <a
                href="/search/"
                class="block py-2.5 px-3 rounded-md text-sm font-semibold text-paper-900 hover:bg-paper-200"
                onClick={() => setIsOpen(false)}
              >
                Search Site
              </a>
            </nav>

            {/* Drawer Footer Contact */}
            <div class="p-4 border-t border-paper-300 bg-paper-200/40 text-xs text-paper-700 space-y-1.5">
              <div class="font-semibold text-paper-900">Social Baluni Public School</div>
              <div>Haridwar Bypass Road, Brahmanwala, Dehradun</div>
              <div class="pt-1 flex items-center gap-3">
                <a href="tel:+919690000890" class="text-crimson-700 font-semibold hover:underline">
                  +91 96900 00890
                </a>
                <span>•</span>
                <a href="mailto:info@sbpsdoon.com" class="text-crimson-700 font-semibold hover:underline">
                  info@sbpsdoon.com
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
