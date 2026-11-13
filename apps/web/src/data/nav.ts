export interface NavItem {
  title: string;
  href: string;
}

export interface NavSection {
  title: string;
  href: string;
  items: NavItem[];
}

/** One navigation tree for the desktop header, the mobile menu and the footer. */
export const navSections: NavSection[] = [
  {
    title: 'About',
    href: '/about/',
    items: [
      { title: 'Our school', href: '/about/' },
      { title: 'Leadership', href: '/about/leadership/' },
      { title: 'Campus', href: '/about/campus/' },
      { title: 'House system', href: '/about/house-system/' },
      { title: 'Baluni Group', href: '/baluni-group/' },
    ],
  },
  {
    title: 'Academics',
    href: '/academics/',
    items: [
      { title: 'Curriculum', href: '/academics/' },
      { title: 'Integrated programmes', href: '/academics/integrated-programme/' },
      { title: 'Day boarding', href: '/academics/day-boarding/' },
      { title: 'Board results', href: '/academics/results/' },
    ],
  },
  {
    title: 'Admissions',
    href: '/admissions/',
    items: [
      { title: 'How admission works', href: '/admissions/' },
      { title: 'Fees', href: '/admissions/fees/' },
      { title: 'Enquire', href: '/admissions/enquire/' },
      { title: 'Apply online', href: '/admissions/apply/' },
      { title: 'Questions', href: '/admissions/faq/' },
    ],
  },
  {
    title: 'Campus life',
    href: '/campus-life/',
    items: [
      { title: 'Overview', href: '/campus-life/' },
      { title: 'Sports', href: '/campus-life/sports/' },
      { title: 'Co-curricular', href: '/campus-life/co-curricular/' },
      { title: 'Photo gallery', href: '/campus-life/gallery/' },
      { title: 'News', href: '/blog/' },
    ],
  },
  {
    title: 'Parents',
    href: '/parents/',
    items: [
      { title: 'For parents', href: '/parents/' },
      { title: 'Notices', href: '/notices/' },
      { title: 'Academic calendar', href: '/parents/year-planner/' },
      { title: 'Rules and policies', href: '/parents/policies/' },
      { title: 'Transfer certificate', href: '/parents/transfer-certificate/' },
      { title: 'Pay fees', href: '/parents/pay-fees/' },
    ],
  },
];

export const utilityLinks: NavItem[] = [
  { title: 'CBSE disclosure', href: '/disclosure/' },
  { title: 'Careers', href: '/careers/' },
  { title: 'Contact', href: '/contact/' },
];

export const school = {
  phone: '+91 96900 00890',
  phoneHref: 'tel:+919690000890',
  phones: ['+91 96900 00890', '+91 96900 00895', '+91 90847 17836'],
  email: 'info@sbpsdoon.com',
  address: 'Haridwar Bypass Road, Brahmanwala, near Radhaswami Satsang Bhawan, Dehradun, Uttarakhand',
  affiliation: '3530479',
  schoolCode: '81702',
  whatsapp: 'https://wa.me/919690000890',
};
