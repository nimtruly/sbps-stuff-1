import fs from 'node:fs';
import path from 'node:path';

const rootDir = path.resolve('../..');
const docsExportDir = path.join(rootDir, 'docs', 'content-export');
const pagesDir = path.join(docsExportDir, 'pages');
const postsDir = path.join(docsExportDir, 'posts');
const contentDir = path.resolve('src', 'content');

// Helper to ensure dir exists
function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

// 1. Site Settings
ensureDir(contentDir);
const siteSettings = {
  name: 'Social Baluni Public School',
  shortName: 'SBPS Dehradun',
  affiliationNo: '3530479',
  schoolCode: '81702',
  address: 'Haridwar Bypass Road, Brahmanwala, near Radhaswami Satsang Bhawan, Dehradun, Uttarakhand',
  geo: {
    lat: 30.2863,
    lng: 78.0264,
    verified: false,
  },
  phones: ['+91 96900 00890', '+91 96900 00895', '+91 90847 17836'],
  emails: ['info@sbpsdoon.com'],
  socials: [
    { platform: 'Facebook', url: 'https://www.facebook.com/SBPSDOON' },
    { platform: 'YouTube', url: 'https://www.youtube.com/channel/UChjGT-I6ev3a95G11FlZ6cw' },
  ],
  whatsappChannelUrl: 'https://wa.me/919690000890',
  admissionsOpen: true,
  admissionsSession: '2027–28',
  tickerItems: [
    'Admissions Open for Session 2027–28: Nursery to Class XII',
    'Integrated Coaching with Baluni Classes for NEET & JEE Main/Advanced',
    'Doon Baluni Defence Academy NDA & SSB Preparation Wing',
    'CBSE Affiliated • Day School & Day Boarding Facility',
  ],
  paymentLinks: [
    { label: 'Registration Fee (₹1,000)', url: 'https://pages.razorpay.com/sbps-registration-fee', amount: 1000, description: 'One-time non-refundable admission registration fee' },
    { label: 'Nursery to Class V Tuition Fee', url: 'https://pages.razorpay.com/sbps-fee-nur-v', amount: 7800, description: 'Quarterly tuition fee for Nursery to Class V' },
    { label: 'Class VI to VIII Tuition Fee', url: 'https://pages.razorpay.com/sbps-fee-vi-viii', amount: 8550, description: 'Quarterly tuition fee for Class VI to VIII' },
    { label: 'Class IX to X Tuition Fee', url: 'https://pages.razorpay.com/sbps-fee-ix-x', amount: 9150, description: 'Quarterly tuition fee for Class IX to X' },
    { label: 'Class XI to XII Tuition Fee', url: 'https://pages.razorpay.com/sbps-fee-xi-xii', amount: 10050, description: 'Quarterly tuition fee for Class XI to XII' },
  ],
};
fs.writeFileSync(path.join(contentDir, 'siteSettings.json'), JSON.stringify(siteSettings, null, 2));

// 2. Leaders
const leadersDir = path.join(contentDir, 'leaders');
ensureDir(leadersDir);

const leaders = [
  {
    id: 'chairman-psgc',
    name: 'Dr. K.S. Panwar',
    role: 'Chairman',
    org: 'Polygon & Social Group of Companies',
    credentials: 'Ph.D., Entrepreneur & Educationist',
    order: 1,
    photo: '/brand/leader-panwar.jpg',
    message: `Social Baluni Public School was conceived with a vision to impart quality education and holistic personality development. At SBPS, we believe every child possesses innate talents waiting to be nurtured. Our modern infrastructure, dedicated faculty, and value-based curriculum prepare students to excel in competitive arenas while remaining rooted in core human ethics. We invite parents to be our partners in this journey of transformative education.`,
  },
  {
    id: 'chairman-dbgi',
    name: 'Dr. Navin Baluni',
    role: 'Chairman',
    org: 'Dr. Baluni Group of Institutions',
    credentials: 'MBBS, MD',
    order: 2,
    photo: '/brand/leader-baluni.jpg',
    message: `For over two decades, Dr. Baluni Group of Education has guided thousands of aspirants into prestigious medical and engineering colleges across India. Social Baluni Public School bridges the crucial gap between CBSE schooling and competitive examinations. By integrating rigorous coaching into the school timetable, our students achieve dual excellence without the exhaustion of outside tuition.`,
  },
  {
    id: 'md-psgc',
    name: 'Mr. D.S. Panwar',
    role: 'Managing Director',
    org: 'Social & Polygon Group',
    credentials: 'Post Graduate, Management',
    order: 3,
    photo: '/brand/leader-ds-panwar.jpg',
    message: `Education is not merely the accumulation of facts; it is the ignition of curiosity and character. At SBPS, we ensure world-class facilities ranging from well-equipped science and computer laboratories to expansive athletic fields. Our day boarding facility provides structured academic supervision and wholesome sports development under one roof.`,
  },
  {
    id: 'md-dbgi',
    name: 'Mr. Vipin Baluni',
    role: 'Managing Director',
    org: 'Dr. Baluni Group',
    credentials: 'M.Tech / Management',
    order: 4,
    photo: '/brand/leader-vipin-baluni.jpg',
    message: `Our academic ecosystem at Social Baluni Public School synergises high academic standards with comprehensive support. Through experienced educators, state-of-the-art testing systems, and individualized mentoring, we ensure our students stand confident when competing on national platforms like JEE, NEET, and NDA.`,
  },
  {
    id: 'principal',
    name: 'Mr. Pankaj Nautiyal',
    role: 'Principal',
    org: 'Social Baluni Public School',
    credentials: 'M.Sc., B.Ed., M.A., LLB',
    order: 5,
    photo: '/brand/leader-principal.jpg',
    message: `It is with immense joy that I welcome you to Social Baluni Public School, Dehradun. Our school motto, "Learn to grow," inspires our educational philosophy. We adopt the experiential XSEED curriculum in foundational years and rigorous CBSE academics in middle and secondary stages. Together with sports academies and river-house traditions, we nurture balanced, capable citizens.`,
  },
];
for (const l of leaders) {
  fs.writeFileSync(path.join(leadersDir, `${l.id}.json`), JSON.stringify(l, null, 2));
}

// 3. Programmes (Integrated coaching)
const progDir = path.join(contentDir, 'programmes');
ensureDir(progDir);

const programmes = [
  {
    id: 'neet',
    title: 'Medical Stream: NEET (UG) Integrated Programme',
    slug: 'neet',
    duration: '2-Year & 4-Year Integrated',
    eligibility: 'Class IX / Class XI (Science with Biology)',
    summary: 'Comprehensive CBSE Senior Secondary education synchronized with intensive NEET (UG) coaching conducted by Baluni Classes medical faculty.',
    partner: 'Baluni Classes (Medical Division)',
    features: [
      'Synchronized CBSE board syllabus and NEET medical entrance curriculum',
      'Daily Practice Problem (DPP) sessions and weekly All-India rank test series',
      'In-house expert faculty for Physics, Chemistry, Botany and Zoology',
      'Dedicated doubt-clearing sessions during school day boarding hours',
      'No need for separate coaching centres or evening travel fatigue',
    ],
    body: `The NEET Integrated Programme at Social Baluni Public School combines senior secondary schooling with rigorous entrance preparation for the National Eligibility cum Entrance Test (NEET UG). 

Students receive comprehensive classroom instruction tailored to NCERT textbooks, supplemented by Baluni Classes' proven pedagogy that has mentored thousands of successful doctors across AIIMS, government medical colleges, and top institutions.

All coaching classes, concept drills, laboratory experiments, and rank test simulations take place during regular day boarding hours, allowing students to balance physical wellness, family time, and focused self-study.`,
  },
  {
    id: 'jee',
    title: 'Engineering Stream: JEE (Main & Advanced) Integrated Programme',
    slug: 'jee',
    duration: '2-Year, 4-Year & 5-Year Integrated',
    eligibility: 'Class VIII / IX / XI (Science with Mathematics)',
    summary: 'Rigorous engineering entrance foundation combining CBSE Physics, Chemistry, and Mathematics with advanced problem-solving methodologies.',
    partner: 'Baluni Classes (Engineering Division)',
    features: [
      'Comprehensive coverage of CBSE Class XI-XII and JEE Advanced concepts',
      'Advanced analytical thinking and timed problem-solving workshops',
      'Computer-based test (CBT) practice lab simulating NTA exam environment',
      'Specialised study material and comprehensive topic-wise archives',
      'Personalised mentoring to track concept mastery and test speed',
    ],
    body: `The Joint Entrance Examination (JEE) demands deep conceptual clarity, mathematical precision, and sustained stamina. SBPS integrates engineering coaching directly into the academic curriculum.

Under the guidance of seasoned Baluni Classes IIT-JEE mentors, students master foundational theory, multi-concept problems, and computer-based test strategies without the stress of external evening tuition.`,
  },
  {
    id: 'nda',
    title: 'Defence Services: NDA & SSB Preparation Pathway',
    slug: 'nda',
    duration: '2-Year (Class XI-XII) & 4-Year (Class IX-XII)',
    eligibility: 'Class IX to XII Students aiming for Armed Forces Careers',
    summary: 'A disciplined pathway preparing young leaders for National Defence Academy (NDA), Naval Academy, and Services Selection Board (SSB) interviews.',
    partner: 'Doon Baluni Defence Academy',
    features: [
      'Structured academic coaching for NDA written examination (Maths + GAT)',
      'Physical fitness regimen, obstacle training, and military endurance drills',
      'Personality development, group discussions, and SSB interview simulation',
      'Shooting, boxing, horse riding, and outdoor leadership camps',
      'Mentorship by retired defence officers and SSB assessment specialists',
    ],
    body: `Nestled in the valley of Dehradun, a city famed for military heritage, SBPS partners with Doon Baluni Defence Academy to deliver a world-class training wing for boys and girls aspiring to join the Indian Army, Navy, and Air Force.

Our integrated schedule balances CBSE academic excellence with intense daily physical fitness, obstacle courses, shooting academy sessions, current affairs symposiums, and SSB psychological testing preparation.`,
  },
  {
    id: 'ntse',
    title: 'Junior Foundation: Olympiads & NTSE Programme',
    slug: 'ntse',
    duration: '2-Year (Class IX–X) & Early Foundation (Class VI–VIII)',
    eligibility: 'Class VI to X Students',
    summary: 'Early analytical foundation developing scientific inquiry, mental ability (MAT), and scholastic aptitude for National Talent Search and Science/Maths Olympiads.',
    partner: 'Baluni Classes Foundation Wing',
    features: [
      'Strengthening fundamentals in Mathematics, Physics, Chemistry, and Biology',
      'Extensive Mental Ability Test (MAT) and logical reasoning modules',
      'Preparation for National Standard Examinations (NSEJS, PRMO, RMO)',
      'Fosters competitive mindset, intellectual curiosity, and high academic stamina',
    ],
    body: `The Foundation Programme nurtures young minds during their formative middle school years. Designed by Baluni Classes' academic directors, it builds a solid launchpad for future competitive achievements through experiential problem solving, mathematical reasoning, and inquiry-led science exploration.`,
  },
];
for (const p of programmes) {
  fs.writeFileSync(path.join(progDir, `${p.id}.json`), JSON.stringify(p, null, 2));
}

// 4. River Houses
const housesDir = path.join(contentDir, 'houses');
ensureDir(housesDir);
const houses = [
  {
    id: 'alaknanda',
    name: 'Alaknanda House',
    river: 'Alaknanda River',
    colorName: 'Azure Blue',
    colorHex: '#0284c7',
    motto: 'Purity, Resilience and Flow',
    description: 'Named after the mighty Alaknanda, the major source stream of the Ganges originating from Satopanth Glacier. Alaknanda house symbolises steady determination, calm wisdom, and relentless progress.',
  },
  {
    id: 'bhilangna',
    name: 'Bhilangna House',
    river: 'Bhilangna River',
    colorName: 'Emerald Green',
    colorHex: '#059669',
    motto: 'Vitality, Harmony and Growth',
    description: 'Named after the vibrant Bhilangna river rising from Khatling Glacier. Bhilangna house champions environmental consciousness, collaborative team spirit, and creative vitality.',
  },
  {
    id: 'bhagirathi',
    name: 'Bhagirathi House',
    river: 'Bhagirathi River',
    colorName: 'Solar Saffron',
    colorHex: '#d97706',
    motto: 'Courage, Radiance and Leadership',
    description: 'Named after the sacred Bhagirathi emerging from Gaumukh. Bhagirathi house stands for fierce courage, visionary leadership, and unwavering moral fortitude.',
  },
  {
    id: 'mandakini',
    name: 'Mandakini House',
    river: 'Mandakini River',
    colorName: 'Ruby Crimson',
    colorHex: '#b91c1c',
    motto: 'Passion, Service and Honor',
    description: 'Named after the swift Mandakini descending from Chorabari Glacier near Kedarnath, reflecting the school’s parent Mandakini Seva Samiti. Mandakini house embodies heartfelt service, passionate pursuit of excellence, and nobility of character.',
  },
];
for (const h of houses) {
  fs.writeFileSync(path.join(housesDir, `${h.id}.json`), JSON.stringify(h, null, 2));
}

// 5. Notices
const noticesDir = path.join(contentDir, 'notices');
ensureDir(noticesDir);
const notices = [
  {
    id: 'notice-admissions-2027',
    title: 'Admissions Open for Academic Session 2027–28: Nursery to Class XII',
    date: '2026-11-01',
    category: 'Admissions',
    pinned: true,
    notify: true,
    body: `Registration forms for admission to classes Nursery to Class XII (including Day Boarding and Integrated NEET/JEE/NDA batches) for the upcoming academic session 2027–28 are now available. 

Parents can register online through our Admissions portal or collect registration kits from the school administrative office between 8:30 AM and 2:30 PM on all working days. 

Selection tests and interactive counselling sessions will be held on scheduled Saturdays. Early registration is recommended due to limited seat capacity per section.`,
    attachments: [
      { title: 'Admission Guidelines & Criteria PDF', url: '/documents/admission-guidelines-2027.pdf' },
    ],
  },
  {
    id: 'notice-38th-national-games',
    title: '20 SBPS Students Selected for 38th National Games Uttarakhand Contingent',
    date: '2025-01-30',
    category: 'Events',
    pinned: true,
    notify: false,
    body: `Social Baluni Public School proudly announces the historic selection of 20 student-athletes representing Uttarakhand in the 38th National Games across Boxing, Shooting, Football, Table Tennis, and Athletics. 

The School Management, Principal, and physical education department extend heartfelt congratulations to our talented athletes and their dedicated academy coaches.`,
    attachments: [
      { title: 'Selected Student Athletes Roster PDF', url: '/documents/national-games-selected-students.pdf' },
    ],
  },
  {
    id: 'notice-pre-board-examinations',
    title: 'Schedule for Pre-Board Examinations for Class X and XII',
    date: '2025-11-15',
    category: 'Exams',
    pinned: false,
    notify: true,
    body: `The first phase of CBSE Pre-Board examinations for Class X and XII will commence according to the academic calendar. Detailed date sheets and reporting instructions have been distributed in classrooms. 

Students must carry their official school ID card and arrive in complete winter uniform by 8:15 AM sharp.`,
    attachments: [
      { title: 'Class X & XII Pre-Board Date Sheet PDF', url: '/documents/pre-board-exam-datesheet.pdf' },
    ],
  },
  {
    id: 'notice-winter-vacation',
    title: 'Annual Winter Vacation Schedule & Homework Guidelines',
    date: '2025-12-20',
    category: 'Holidays',
    pinned: false,
    notify: false,
    body: `The school will observe winter recess in accordance with state education directives. Students are advised to complete their experiential learning holiday assignments and read recommended literary classics. 

Administrative and admission enquiry desks will remain open from 9:00 AM to 1:00 PM throughout the break except on gazetted public holidays.`,
  },
];
for (const n of notices) {
  fs.writeFileSync(path.join(noticesDir, `${n.id}.json`), JSON.stringify(n, null, 2));
}

// 6. Blog Articles (Cleaned from legacy + 3 drafts)
const articlesDir = path.join(contentDir, 'articles');
ensureDir(articlesDir);

const articles = [
  {
    id: '38th-national-games-sbps-students',
    title: 'Historic Achievement: 20 SBPS Students Selected for 38th National Games Uttarakhand',
    slug: '38th-national-games-sbps-students',
    excerpt: 'A stellar milestone for Social Baluni Public School as twenty student athletes represent Uttarakhand at the 38th National Games in boxing, shooting, football, and athletics.',
    category: 'Achievements',
    author: 'Sports & Physical Education Dept',
    publishedAt: '2025-01-30',
    tags: ['Sports', 'National Games', 'Boxing', 'Shooting', 'Uttarakhand'],
    draft: false,
    body: `Social Baluni Public School (SBPS), Dehradun, marked a momentous achievement with 20 of its student athletes selected to represent the Uttarakhand state contingent at the prestigious 38th National Games.

Under the visionary guidance of the management and specialised sports academies — including the SBPS Boxing Academy, Shooting Club, and Cricket & Football Academy — our student champions demonstrated exceptional discipline, technical skill, and endurance during state trials.

Speaking on the occasion, the Principal commended the sports faculty and highlighted the school's unwavering commitment to balancing rigorous CBSE academics with elite athletic training. Facilities like the indoor shooting range and modern boxing rings allow students to train with certified coaches within campus hours.

The entire SBPS community congratulates the selected athletes and wishes them glory at the national arena.`,
  },
  {
    id: 'sfa-inter-school-competition-2024',
    title: 'SBPS Triumphs at the Prestigious 2024 SFA Inter-School Championships',
    slug: 'sfa-inter-school-competition-2024',
    excerpt: 'SBPS students secure multiple podium finishes and medals at the 2024 Sports For All (SFA) inter-school championship in Dehradun.',
    category: 'Achievements',
    author: 'SBPS Sports Desk',
    publishedAt: '2024-10-23',
    tags: ['Sports', 'SFA', 'Inter-School', 'Dehradun'],
    draft: false,
    body: `At the 2024 Sports For All (SFA) Inter-School Championship, Social Baluni Public School emerged as one of the top performing institutions, showcasing athletic prowess across track and field, badminton, football, and martial arts.

Competing against leading public and residential schools from across Uttarakhand, SBPS athletes bagged numerous gold, silver, and bronze honours. The performance reflects the school's holistic ethos where physical education is an integral pillar of character building.`,
  },
  {
    id: '5th-annual-sports-meet',
    title: 'Celebrating Athletic Spirit: Highlights from the 5th Annual Sports Meet',
    slug: '5th-annual-sports-meet',
    excerpt: 'March past, river house competitions, and athletic track events bring colour and energy to the 5th SBPS Annual Sports Meet.',
    category: 'News',
    author: 'Principal Office',
    publishedAt: '2024-11-20',
    tags: ['Annual Sports Meet', 'Houses', 'Athletics', 'Campus Life'],
    draft: false,
    body: `The 5th Annual Sports Meet of Social Baluni Public School concluded amidst tremendous enthusiasm and spirited competition among the four river houses: Alaknanda, Bhilangna, Bhagirathi, and Mandakini.

The event commenced with a disciplined march past led by the school head boy and head girl, followed by the lighting of the ceremonial torch and the athlete's oath. 

Students from pre-primary to senior secondary demonstrated stamina, sportsmanship, and teamwork across sprints, relays, high jump, and martial arts displays. The coveted Best House Trophy was awarded to the house exhibiting highest aggregate points and camaraderie.`,
  },
  {
    id: 'indian-air-force-induction-programme',
    title: 'Indian Air Force Conducts Induction & Career Orientation at SBPS Campus',
    slug: 'indian-air-force-induction-programme',
    excerpt: 'Senior IAF officers inspire senior secondary students with interactive sessions on pilot entry, technical branches, and defence career pathways.',
    category: 'News',
    author: 'Career Guidance Cell',
    publishedAt: '2024-09-15',
    tags: ['Air Force', 'NDA', 'Careers', 'Defence'],
    draft: false,
    body: `Social Baluni Public School hosted an inspiring Induction Publicity Programme by officers of the Indian Air Force. 

The interactive orientation provided senior students with valuable insights into career avenues in the Flying, Technical, and Ground Duty branches of the armed forces. Officers elaborated on the National Defence Academy (NDA) entry criteria, SSB interview methodologies, and the pride of serving the motherland.

Students actively participated in Q&A discussions regarding physical fitness, aptitude preparation, and leadership traits required in defence services.`,
  },
  // 3 Draft Evergreen SEO Articles (marked draft: true as per spec 10)
  {
    id: 'how-to-choose-a-cbse-school-in-dehradun',
    title: "How to Choose a CBSE School in Dehradun: A Parent's Practical Checklist",
    slug: 'how-to-choose-a-cbse-school-in-dehradun',
    excerpt: 'Key criteria parents should evaluate when selecting a CBSE school in Dehradun, from academic methodology and teacher retention to safety and competitive exam coaching.',
    category: 'Admissions Guides',
    author: 'SBPS Academic Advisory',
    publishedAt: '2026-11-13',
    tags: ['CBSE Schools', 'Dehradun', 'School Selection', 'Parenting'],
    draft: true,
    body: `Dehradun has long been celebrated as India's school capital. With dozens of residential, day boarding, and day schools, prospective parents often face a challenging decision. 

When evaluating a CBSE institution for your child, focus on four key dimensions:

1. Pedagogy Beyond Rote Learning: Look for schools implementing foundational experiential frameworks like XSEED that encourage inquiry and problem-solving from early years.
2. Integrated Competitive Preparation: A school that seamlessly aligns CBSE board preparation with NEET, JEE, and NDA coaching spares students the stress of external evening tuition.
3. Sports and Character Building: Dedicated sports academies (shooting, boxing, cricket, athletics) ensure balanced physical and mental stamina.
4. Transparent Governance: Check CBSE SARAS affiliation status, mandatory public disclosure records, and teacher qualifications.`,
  },
  {
    id: 'school-neet-jee-coaching-under-one-roof',
    title: 'School + NEET/JEE Coaching Under One Roof: How the SBPS Integrated Model Works',
    slug: 'school-neet-jee-coaching-under-one-roof',
    excerpt: 'Why dual preparation under a unified timetable eliminates travel burnout and elevates national entrance exam performance.',
    category: 'Integrated Coaching',
    author: 'Dr. Baluni Academic Team',
    publishedAt: '2026-11-13',
    tags: ['NEET', 'JEE', 'Integrated Coaching', 'Baluni Classes'],
    draft: true,
    body: `Preparing for national examinations like NEET and JEE while simultaneously managing Class XI and XII board syllabi often results in 14-hour exhausting days for students travelling between school and outside coaching institutes.

The SBPS Integrated Model addresses this challenge directly:

- Synchronised Curriculum: School lectures cover CBSE conceptual depth, while Baluni Classes faculty provide advanced problem-solving techniques in the same timetable.
- Day Boarding Study Hours: Supervised doubt-clearing sessions take place on campus, ensuring homework and concept practice are completed before leaving for home.
- Health and Balance: With evenings free of long commutes, students can focus on family dinner, rest, and personal hobbies without compromising on academic excellence.`,
  },
  {
    id: 'preparing-for-nda-from-class-ix-defence-pathway',
    title: 'Preparing for NDA from Class IX: The SBPS Defence Academy Pathway',
    slug: 'preparing-for-nda-from-class-ix-defence-pathway',
    excerpt: 'Developing discipline, physical stamina, and mathematical capability from high school for officer entry into the Indian Armed Forces.',
    category: 'Admissions Guides',
    author: 'Doon Baluni Defence Wing',
    publishedAt: '2026-11-13',
    tags: ['NDA', 'SSB', 'Defence Academy', 'Career'],
    draft: true,
    body: `Success at the National Defence Academy (NDA) examination and the subsequent 5-day Services Selection Board (SSB) interview requires years of disciplined cultivation.

Beginning preparation in Class IX gives students an unshakeable advantage:

- Mathematical Strength: NDA Mathematics questions demand speed and conceptual accuracy. Starting early solidifies algebra, trigonometry, and calculus basics.
- General Ability & Communication: Daily newspaper reading, debate clubs, and current affairs symposiums build articulate, well-informed personalities.
- Physical Rigour: Campus facilities like obstacle courses, shooting clubs, and cross-country runs instill endurance and agility.`,
  },
];
for (const a of articles) {
  fs.writeFileSync(path.join(articlesDir, `${a.id}.json`), JSON.stringify(a, null, 2));
}

// 7. Disclosure Docs (Appendix-IX)
const discDir = path.join(contentDir, 'disclosureDocs');
ensureDir(discDir);

const disclosureDocs = [
  // A. General Information
  { id: 'gen-school-name', title: 'Name of the School', group: 'General Information', value: 'Social Baluni Public School', updatedAt: '2026-01-28' },
  { id: 'gen-affiliation-no', title: 'Affiliation No. (CBSE)', group: 'General Information', value: '3530479', updatedAt: '2026-01-28' },
  { id: 'gen-school-code', title: 'School Code', group: 'General Information', value: '81702', updatedAt: '2026-01-28' },
  { id: 'gen-complete-address', title: 'Complete Address with Pin Code', group: 'General Information', value: 'Haridwar Bypass Road, Brahmanwala, Near Radhaswami Satsang Bhawan, Dehradun, Uttarakhand - 248001', updatedAt: '2026-01-28' },
  { id: 'gen-principal-name', title: 'Principal Name & Qualification', group: 'General Information', value: 'Mr. Pankaj Nautiyal (M.Sc., B.Ed., M.A., LLB)', updatedAt: '2026-01-28' },
  { id: 'gen-school-email', title: 'School Email ID', group: 'General Information', value: 'info@sbpsdoon.com', updatedAt: '2026-01-28' },
  { id: 'gen-contact-details', title: 'Contact Details (Landline / Mobile)', group: 'General Information', value: '+91 96900 00890, +91 96900 00895, 0135-2669696', updatedAt: '2026-01-28' },

  // B. Documents and Information
  { id: 'doc-affiliation-letter', title: 'Copies of Affiliation / Upgradation Letter & Recent Extension of Affiliation', group: 'Documents and Information', fileUrl: '/documents/1.-RECENT-EXTENSION-1.pdf', updatedAt: '2025-06-09' },
  { id: 'doc-society-renewal', title: 'Copies of Societies / Trust / Company Registration / Renewal Certificate', group: 'Documents and Information', fileUrl: '/documents/2.-SOCIETY-RENEWAL-CERTIFICATE-2.pdf', updatedAt: '2025-06-09' },
  { id: 'doc-rte-recognition', title: 'Copy of No Objection Certificate (NOC) Issued & Recognition Certificate under RTE Act 2009', group: 'Documents and Information', fileUrl: '/documents/3.-RECOGNITION-CERTIFICATE-UNDER-RTE-ACT-2009-1.pdf', validFrom: '2021-04-01', validTo: '2026-03-31', expired: true, updatedAt: '2025-06-09' },
  { id: 'doc-building-safety', title: 'Copy of Valid Building Safety Certificate as per National Building Code', group: 'Documents and Information', fileUrl: '/documents/5.-BUILDING-SAFETY-CERTIFICATE-1.pdf', updatedAt: '2025-06-09' },
  { id: 'doc-fire-safety', title: 'Copy of Valid Fire Safety Certificate Issued by Competent Authority', group: 'Documents and Information', fileUrl: '/documents/6.-FIRE-SAFETY-CERTIFICATE-1.pdf', updatedAt: '2025-06-09' },
  { id: 'doc-self-certification', title: 'Copy of the Self Certification Submitted by the School for Affiliation', group: 'Documents and Information', fileUrl: '/documents/7.-SELF-CERTIFICATION-BY-SCHOOL-1.pdf', updatedAt: '2025-06-09' },
  { id: 'doc-water-sanitation', title: 'Copies of Valid Water, Health and Sanitation Certificates', group: 'Documents and Information', fileUrl: '/documents/8.-WATER-HEALTH-AND-SANITION-CERTIFICATES-1.pdf', updatedAt: '2025-06-09' },

  // C. Results and Academics
  { id: 'res-fee-structure', title: 'Fee Structure of the School (Annual / Quarterly)', group: 'Results and Academics', fileUrl: '/documents/9.-FEE-STRUCTURE-OF-THE-SCHOOL-1.pdf', updatedAt: '2025-06-09' },
  { id: 'res-academic-calendar', title: 'Annual Academic Calendar', group: 'Results and Academics', fileUrl: '/documents/10.-ANNUAL-ACADEMIC-CALENDER-1.pdf', updatedAt: '2025-06-09' },
  { id: 'res-smc-list', title: 'List of School Management Committee (SMC)', group: 'Results and Academics', fileUrl: '/documents/11.-LIST-OF-SMC-1.pdf', updatedAt: '2025-06-09' },
  { id: 'res-pta-list', title: 'List of Parents Teachers Association (PTA) Members', group: 'Results and Academics', fileUrl: '/documents/12.-LIST-OF-PTA-MEMBERS-1.pdf', updatedAt: '2025-06-09' },
  { id: 'res-board-results', title: 'Last Three-Year Results of the Board Examination as per Applicability', group: 'Results and Academics', fileUrl: '/documents/13.-LAST-THREE-YEAR-RESULT-OF-THE-BOARD-EXAMINATION-1.pdf', updatedAt: '2025-06-09' },

  // D. Staff (Teaching)
  { id: 'staff-principal', title: 'Principal', group: 'Staff (Teaching)', value: '1', updatedAt: '2026-01-28' },
  { id: 'staff-total-teachers', title: 'Total No. of Teachers', group: 'Staff (Teaching)', value: '38 (PGT: 10, TGT: 14, PRT: 14)', updatedAt: '2026-01-28' },
  { id: 'staff-teacher-section-ratio', title: 'Teachers Section Ratio', group: 'Staff (Teaching)', value: '1.5 : 1', updatedAt: '2026-01-28' },
  { id: 'staff-special-educator', title: 'Details of Special Educator', group: 'Staff (Teaching)', value: 'Qualified Special Educator on rolls', updatedAt: '2026-01-28' },
  { id: 'staff-counsellor', title: 'Details of Counsellor & Wellness Teacher', group: 'Staff (Teaching)', value: 'Full-time Student Counsellor & Wellness Teacher appointed', updatedAt: '2026-01-28' },

  // E. School Infrastructure
  { id: 'infra-campus-area', title: 'Total Campus Area of the School', group: 'School Infrastructure', value: 'Spread across spacious green acreage on Haridwar Bypass Road', updatedAt: '2026-01-28' },
  { id: 'infra-classrooms', title: 'Total Number of Classrooms & Average Size', group: 'School Infrastructure', value: '42 Well-ventilated smart classrooms (>500 sq. ft. each)', updatedAt: '2026-01-28' },
  { id: 'infra-laboratories', title: 'Number of Laboratories with Size', group: 'School Infrastructure', value: '6 Labs: Physics, Chemistry, Biology, Mathematics, Composite Science, Computer Lab (>600 sq. ft. each)', updatedAt: '2026-01-28' },
  { id: 'infra-internet', title: 'Internet Facility & Digital Bandwidth', group: 'School Infrastructure', value: 'High-speed dedicated optical fibre Wi-Fi across campus', updatedAt: '2026-01-28' },
  { id: 'infra-toilets', title: 'Number of Toilets', group: 'School Infrastructure', value: 'Separate hygienic blocks for Boys and Girls on every floor; Barrier-free disabled toilets', updatedAt: '2026-01-28' },
  { id: 'infra-youtube-inspection', title: 'Inspection Video Link', group: 'School Infrastructure', value: 'https://www.youtube.com/watch?v=4ygbcVKNL9Q', updatedAt: '2026-01-28' },
];
for (const d of disclosureDocs) {
  fs.writeFileSync(path.join(discDir, `${d.id}.json`), JSON.stringify(d, null, 2));
}

// 8. Fee Items (Marked verified: false until confirmed per spec)
const feesDir = path.join(contentDir, 'feeItems');
ensureDir(feesDir);

const feeItems = [
  { id: 'fee-reg', label: 'Registration Fee', classRange: 'Nursery to XII', type: 'one-time', refundable: false, amount: 1000, note: 'One-time, non-refundable upon registration', session: '2025–26 / 2026–27', verified: false },
  { id: 'fee-adm-nur-ix', label: 'Admission Fee', classRange: 'Nursery to IX', type: 'one-time', refundable: false, amount: 35000, note: 'Payable at time of provisional admission', session: '2025–26 / 2026–27', verified: false },
  { id: 'fee-adm-xi-xii', label: 'Admission Fee', classRange: 'XI to XII', type: 'one-time', refundable: false, amount: 50000, note: 'Includes entrance coaching enrolment', session: '2025–26 / 2026–27', verified: false },
  { id: 'fee-caution', label: 'Caution Money', classRange: 'All Classes', type: 'refundable', refundable: true, amount: 5000, note: 'Refundable on withdrawal / TC', session: '2025–26 / 2026–27', verified: false },
  { id: 'fee-tuition-nur-v', label: 'Tuition Fee (Monthly / Quarterly)', classRange: 'Nursery to V', type: 'quarterly', refundable: false, amount: 7800, note: '₹2,600/month payable quarterly in 4 instalments', session: '2025–26 / 2026–27', verified: false },
  { id: 'fee-tuition-vi-viii', label: 'Tuition Fee (Monthly / Quarterly)', classRange: 'VI to VIII', type: 'quarterly', refundable: false, amount: 8550, note: '₹2,850/month payable quarterly in 4 instalments', session: '2025–26 / 2026–27', verified: false },
  { id: 'fee-tuition-ix-x', label: 'Tuition Fee (Monthly / Quarterly)', classRange: 'IX to X', type: 'quarterly', refundable: false, amount: 9150, note: '₹3,050/month payable quarterly in 4 instalments', session: '2025–26 / 2026–27', verified: false },
  { id: 'fee-tuition-xi-xii', label: 'Tuition Fee (Monthly / Quarterly)', classRange: 'XI to XII', type: 'quarterly', refundable: false, amount: 10050, note: '₹3,350/month payable quarterly in 4 instalments', session: '2025–26 / 2026–27', verified: false },
];
for (const f of feeItems) {
  fs.writeFileSync(path.join(feesDir, `${f.id}.json`), JSON.stringify(f, null, 2));
}

// 9. Policies (Split from student-related-policy + legacy rules)
const policiesDir = path.join(contentDir, 'policies');
ensureDir(policiesDir);

const policies = [
  {
    id: 'anti-corporal-punishment',
    title: 'Policy on Prohibition of Corporal Punishment',
    slug: 'anti-corporal-punishment',
    summary: 'Absolute zero-tolerance policy against any form of physical harm or verbal humiliation of students.',
    body: `Social Baluni Public School strictly abides by CBSE regulations, the Right to Education (RTE) Act 2009, and international human rights principles prohibiting any form of corporal punishment or psychological harassment.

1. Definition: Any act causing physical pain, intimidation, mental distress, or humiliation to a child is classified as a punishable offence.
2. Code of Conduct for Staff: Faculty and administrative personnel are trained in positive behavioural guidance and empathetic counseling.
3. Grievance Redressal: Any student or guardian can report an incident directly to the Principal or the Child Protection Committee in complete confidentiality.`,
  },
  {
    id: 'child-protection',
    title: 'Child Protection and Safety Policy',
    slug: 'child-protection',
    summary: 'Comprehensive safety measures ensuring a secure physical and emotional environment on campus.',
    body: `The Child Protection Committee at SBPS guarantees round-the-clock physical security, CCTV surveillance in public corridors, background checks for staff, and safe transportation protocols with female attendants on school buses.`,
  },
  {
    id: 'anti-bullying',
    title: 'Anti-Bullying and Cyber-Safety Policy',
    slug: 'anti-bullying',
    summary: 'Ensuring mutual respect, zero intimidation, and digital safety for every learner.',
    body: `Bullying in any guise — verbal, physical, exclusionary, or cyberbullying — is categorically banned at Social Baluni Public School. 

The Anti-Bullying Committee regularly conducts sensitization workshops across all classes. Disciplinary measures for repeated misconduct include mandatory counselling, parent conferences, and suspension.`,
  },
  {
    id: 'substance-abuse-prevention',
    title: 'Drug, Tobacco and Substance Abuse Prevention Policy',
    slug: 'substance-abuse-prevention',
    summary: 'Maintaining a 100% clean, tobacco-free, and substance-free educational environment.',
    body: `The campus and an area within 100 metres radius of the school boundary are strictly designated Tobacco-Free and Substance-Free zones under the COTPA Act and CBSE statutory circulars.`,
  },
  {
    id: 'grievance-redressal',
    title: 'Parent and Student Grievance Redressal Mechanism',
    slug: 'grievance-redressal',
    summary: 'Structured, time-bound resolution of academic, administrative, and safety concerns.',
    body: `Parents are encouraged to voice queries and grievances through our designated channels:
1. Written correspondence to info@sbpsdoon.com
2. In-person meeting during Principal visiting hours (2:30 PM - 3:30 PM on working weekdays)
3. Formal review by the School Management Committee (SMC).`,
  },
  {
    id: 'rules-of-discipline',
    title: 'General Rules of Student Discipline',
    slug: 'rules-of-discipline',
    summary: 'Punctuality, uniform standards, campus etiquette, and student responsibilities.',
    body: `From legacy discipline archives:
- Students must report to morning assembly on time in clean, prescribed school uniform.
- Care of school property and library books is an individual student responsibility.
- Electronic gadgets, mobile phones, and valuable jewellery are not permitted on campus.`,
  },
  {
    id: 'leave-rules',
    title: 'Leave Rules and Attendance Policy',
    slug: 'leave-rules',
    summary: 'Attendance requirements for CBSE board examinations and formal leave application procedures.',
    body: `CBSE regulations mandate at least 75% aggregate attendance to be eligible for annual and board examinations. 

Leave must be applied for in advance via the student diary or written guardian note. Medical leave extending beyond two consecutive days requires a registered medical practitioner's certificate.`,
  },
  {
    id: 'test-exams-promotions',
    title: 'Examination, Evaluation and Promotion Criteria',
    slug: 'test-exams-promotions',
    summary: 'Continuous assessment, term examination weightages, and CBSE promotion norms.',
    body: `SBPS follows CBSE uniform assessment norms comprising Periodic Assessments, Mid-Term Examinations, Practical Lab Assessments, and Annual Examinations. 

Promotion to higher classes is determined by cumulative academic performance, project submissions, and attendance criteria.`,
  },
];
for (const p of policies) {
  fs.writeFileSync(path.join(policiesDir, `${p.id}.json`), JSON.stringify(p, null, 2));
}

// 10. Sister Institutions (Baluni Group)
const instDir = path.join(contentDir, 'institutions');
ensureDir(instDir);

const institutions = [
  {
    id: 'baluni-classes-dehradun',
    name: 'Baluni Classes, Dehradun (Head Office)',
    type: 'Coaching Institute for Medical & Engineering',
    address: 'C-7, Nehru Colony, Near LIC Building, Haridwar Road, Dehradun, Uttarakhand - 248001',
    phones: ['0135-2669696', '+91 96900 00899'],
    email: 'info@balunigroup.org',
    url: 'https://www.balunigroup.org/',
    logo: '/brand/baluni-group-logo.webp',
  },
  {
    id: 'doon-baluni-defence-academy',
    name: 'Doon Baluni Defence Academy',
    type: 'Defence Academy (NDA, CDS, AFCAT, SSB, RIMC)',
    address: 'Near Radhaswami Satsang Bhawan, Haridwar Bypass Road, Dehradun',
    phones: ['+91 96900 00890'],
    email: 'info@doonbalunidefenceacademy.com',
    url: 'https://www.doonbalunidefenceacademy.com/',
    logo: '/brand/baluni-group-logo.webp',
  },
  {
    id: 'baluni-public-school-kotdwar',
    name: 'Baluni Public School, Kotdwar',
    type: 'CBSE Senior Secondary Co-ed School',
    address: 'Talla Motadhang, Near BEL Road, Kotdwar, Pauri Garhwal, Uttarakhand',
    phones: ['+91 96900 00893'],
    email: 'principal.bpskotdwar@gmail.com',
    url: 'https://www.sbpsdoon.com/baluni-group/',
    logo: '/brand/baluni-group-logo.webp',
  },
  {
    id: 'baluni-public-school-dayalbagh-agra',
    name: 'Baluni Public School, Dayalbagh, Agra',
    type: 'CBSE Senior Secondary Co-ed School',
    address: 'Sikandarpur, Dayalbagh, Agra, Uttar Pradesh',
    phones: ['+91 84770 04488', '+91 96900 00891', '+91 96900 00892'],
    email: 'frontoffice.bpsagra@gmail.com',
    url: 'https://www.sbpsdoon.com/baluni-group/',
    logo: '/brand/baluni-group-logo.webp',
  },
  {
    id: 'baluni-public-school-deori-road-agra',
    name: 'Baluni Public School, Deori Road, Agra',
    type: 'CBSE Secondary Co-ed School',
    address: 'Deori Road, Agra, Uttar Pradesh',
    phones: ['0562 3215972'],
    email: 'headmistress.bpsagra@gmail.com',
    url: 'https://www.sbpsdoon.com/baluni-group/',
    logo: '/brand/baluni-group-logo.webp',
  },
];
for (const inst of institutions) {
  fs.writeFileSync(path.join(instDir, `${inst.id}.json`), JSON.stringify(inst, null, 2));
}

// 11. Careers / Open Jobs
const jobsDir = path.join(contentDir, 'jobs');
ensureDir(jobsDir);

const jobs = [
  {
    id: 'pgt-physics',
    title: 'PGT Physics (CBSE + JEE/NEET Foundation)',
    department: 'Science & Senior Secondary',
    type: 'Full-time',
    description: 'Seeking dynamic educators with M.Sc. in Physics and B.Ed., possessing at least 3 years teaching experience in CBSE Class XI-XII and competitive entrance foundation.',
    open: true,
  },
  {
    id: 'tgt-mathematics',
    title: 'TGT Mathematics & Mental Ability',
    department: 'Middle & Secondary School',
    type: 'Full-time',
    description: 'Responsible for teaching Mathematics in Classes VI–X with strong conceptual grounding and Olympiad aptitude training. M.Sc./B.Sc. with B.Ed.',
    open: true,
  },
  {
    id: 'prt-general',
    title: 'Primary Teacher (PRT - Experiential Learning / XSEED)',
    department: 'Primary Wing',
    type: 'Full-time',
    description: 'Enthusiastic primary educators trained in child-centric experiential learning methods, activity-based science, and language development.',
    open: true,
  },
  {
    id: 'sports-coach-shooting-boxing',
    title: 'Sports Coach: Shooting Range & Boxing Academy',
    department: 'Physical Education',
    type: 'Full-time',
    description: 'Certified national/state medalists or NIS-certified coaches for managing the school indoor shooting range and boxing academy.',
    open: true,
  },
];
for (const j of jobs) {
  fs.writeFileSync(path.join(jobsDir, `${j.id}.json`), JSON.stringify(j, null, 2));
}

// 12. FAQs
const faqsDir = path.join(contentDir, 'faqs');
ensureDir(faqsDir);

const faqs = [
  {
    id: 'faq-admission-process',
    question: 'What is the admission procedure at Social Baluni Public School?',
    answer: 'Admissions commence with registration (online or offline), followed by an age-appropriate written interaction test and informal student-parent dialogue. Provisional admissions are finalized upon document verification and fee deposit.',
    page: 'admissions',
    verified: true,
  },
  {
    id: 'faq-age-criteria',
    question: 'What is the minimum age criterion for Nursery and Class I?',
    answer: 'As per CBSE and NEP 2020 guidelines, a child must be 3+ years old for Nursery and 6+ years old for Class I as of March 31 of the academic session year.',
    page: 'admissions',
    verified: true,
  },
  {
    id: 'faq-integrated-coaching',
    question: 'How does the Integrated NEET and JEE programme work?',
    answer: 'The programme synchronizes the CBSE Class XI–XII syllabus with intensive NEET/JEE problem-solving by Baluni Classes mentors within regular school day boarding hours, eliminating external coaching fatigue.',
    page: 'home',
    verified: true,
  },
  {
    id: 'faq-day-boarding',
    question: 'What facilities are included in the Day Boarding programme?',
    answer: 'Day boarding includes wholesome hygienic lunch and evening refreshments, supervised teacher-guided homework sessions, spoken English labs, and evening sports academy training.',
    page: 'home',
    verified: true,
  },
  {
    id: 'faq-transport',
    question: 'Does the school provide transport facilities across Dehradun?',
    answer: 'Yes, SBPS operates an extensive fleet of GPS-tracked school buses covering major routes in Dehradun, escorted by female attendants and equipped with first-aid safety kits.',
    page: 'admissions',
    verified: true,
  },
  {
    id: 'faq-fee-instalments',
    question: 'How are school fees payable?',
    answer: 'Tuition fees are payable in four equal quarterly instalments (April, July, October, January). Payments can be made online via our Razorpay portal, or at the school fee desk via DD/cheque/UPI.',
    page: 'fees',
    verified: true,
  },
];
for (const f of faqs) {
  fs.writeFileSync(path.join(faqsDir, `${f.id}.json`), JSON.stringify(f, null, 2));
}

// 13. Proof Stats (Factual verified vs unverified)
const statsDir = path.join(contentDir, 'stats');
ensureDir(statsDir);

const stats = [
  { id: 'stat-cbse', label: 'CBSE Affiliated', value: 'Nursery–XII', context: 'Co-educational day school & day boarding', source: 'CBSE Affiliation 3530479', verified: true },
  { id: 'stat-founded', label: 'Years of Excellence', value: 'Since 2014', context: 'Unit of Mandakini Seva Samiti', source: 'Foundation 30 March 2014', verified: true },
  { id: 'stat-coaching', label: 'Integrated Pathways', value: 'NEET • JEE • NDA', context: 'Coaching by Baluni Classes under one roof', source: 'Academic Programme', verified: true },
  { id: 'stat-sports', label: 'Sports & Academies', value: '15+ Sports', context: 'Shooting, Boxing, Cricket & Football Academies', source: 'Sports Curriculum', verified: true },
  { id: 'stat-national-athletes', label: 'National Games Selections', value: '20 Students', context: 'Represented Uttarakhand at 38th National Games', source: 'Official notification 2025', verified: true },
  // Unverified stats marked verified: false so they NEVER render in production
  { id: 'stat-unverified-topper', label: 'Unverified Board Topper %', value: '99.2%', context: 'Unconfirmed board topper score', source: 'Unverified Marketing', verified: false },
  { id: 'stat-unverified-alumni', label: 'Unverified Alumni Placements', value: '5000+', context: 'Unconfirmed count', source: 'Unverified Claim', verified: false },
];
for (const s of stats) {
  fs.writeFileSync(path.join(statsDir, `${s.id}.json`), JSON.stringify(s, null, 2));
}

// 14. Albums
const albumsDir = path.join(contentDir, 'albums');
ensureDir(albumsDir);

const albums = [
  {
    id: 'sports-meet-highlights',
    title: '5th Annual Sports Meet Highlights',
    slug: 'sports-meet-highlights',
    date: '2024-11-20',
    cover: '/brand/DSC09324-scaled.jpg',
    category: 'Sports',
    images: [
      { url: '/brand/DSC09324-scaled.jpg', alt: 'Annual Sports Meet track events and student athletes', caption: 'Athletics track competitions' },
      { url: '/brand/DSC04141-scaled.jpg', alt: 'House march past ceremony', caption: 'River houses marching contingent' },
      { url: '/brand/IMG_9867-scaled.jpg', alt: 'Medal ceremony and trophy presentation', caption: 'Medal distribution by leadership' },
    ],
  },
  {
    id: 'campus-and-infrastructure',
    title: 'Campus Life & State-of-the-art Infrastructure',
    slug: 'campus-and-infrastructure',
    date: '2025-01-15',
    cover: '/brand/DJI_20240917155020_0011_D-scaled.jpg',
    category: 'Campus',
    images: [
      { url: '/brand/DJI_20240917155020_0011_D-scaled.jpg', alt: 'Panoramic aerial campus view of Social Baluni Public School', caption: 'Lush campus on Haridwar Bypass Road' },
      { url: '/brand/IMG_7698-scaled.jpg', alt: 'Students engaged in composite science laboratory experiment', caption: 'Modern science laboratories' },
      { url: '/brand/IMG_0930-scaled.jpg', alt: 'Interactive digital classroom session', caption: 'Smart audio-visual classrooms' },
      { url: '/brand/IMG_0650-scaled.jpg', alt: 'School library and reading resources', caption: 'Extensive school library' },
    ],
  },
];
for (const a of albums) {
  fs.writeFileSync(path.join(albumsDir, `${a.id}.json`), JSON.stringify(a, null, 2));
}

console.log('Successfully generated all clean content collection records!');
