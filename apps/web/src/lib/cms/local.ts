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

// Import raw JSON files
import siteSettingsRaw from '../../content/siteSettings.json';

// Leaders
import leaderPanwar from '../../content/leaders/chairman-psgc.json';
import leaderBaluni from '../../content/leaders/chairman-dbgi.json';
import leaderDsPanwar from '../../content/leaders/md-psgc.json';
import leaderVipinBaluni from '../../content/leaders/md-dbgi.json';
import leaderPrincipal from '../../content/leaders/principal.json';

// Programmes
import progNeet from '../../content/programmes/neet.json';
import progJee from '../../content/programmes/jee.json';
import progNda from '../../content/programmes/nda.json';
import progNtse from '../../content/programmes/ntse.json';

// Houses
import houseAlaknanda from '../../content/houses/alaknanda.json';
import houseBhilangna from '../../content/houses/bhilangna.json';
import houseBhagirathi from '../../content/houses/bhagirathi.json';
import houseMandakini from '../../content/houses/mandakini.json';

// Notices
import noticeAdm from '../../content/notices/notice-admissions-2027.json';
import noticeGames from '../../content/notices/notice-38th-national-games.json';
import noticePreBoard from '../../content/notices/notice-pre-board-examinations.json';
import noticeWinter from '../../content/notices/notice-winter-vacation.json';

// Articles
import artGames from '../../content/articles/38th-national-games-sbps-students.json';
import artSfa from '../../content/articles/sfa-inter-school-competition-2024.json';
import artSports from '../../content/articles/5th-annual-sports-meet.json';
import artAirForce from '../../content/articles/indian-air-force-induction-programme.json';
import artGuideSchool from '../../content/articles/how-to-choose-a-cbse-school-in-dehradun.json';
import artGuideCoaching from '../../content/articles/school-neet-jee-coaching-under-one-roof.json';
import artGuideNda from '../../content/articles/preparing-for-nda-from-class-ix-defence-pathway.json';

// Disclosure Docs
import genName from '../../content/disclosureDocs/gen-school-name.json';
import genAff from '../../content/disclosureDocs/gen-affiliation-no.json';
import genCode from '../../content/disclosureDocs/gen-school-code.json';
import genAddr from '../../content/disclosureDocs/gen-complete-address.json';
import genPrinc from '../../content/disclosureDocs/gen-principal-name.json';
import genMail from '../../content/disclosureDocs/gen-school-email.json';
import genContact from '../../content/disclosureDocs/gen-contact-details.json';
import docAff from '../../content/disclosureDocs/doc-affiliation-letter.json';
import docSoc from '../../content/disclosureDocs/doc-society-renewal.json';
import docRte from '../../content/disclosureDocs/doc-rte-recognition.json';
import docBldg from '../../content/disclosureDocs/doc-building-safety.json';
import docFire from '../../content/disclosureDocs/doc-fire-safety.json';
import docSelf from '../../content/disclosureDocs/doc-self-certification.json';
import docWater from '../../content/disclosureDocs/doc-water-sanitation.json';
import resFee from '../../content/disclosureDocs/res-fee-structure.json';
import resCal from '../../content/disclosureDocs/res-academic-calendar.json';
import resSmc from '../../content/disclosureDocs/res-smc-list.json';
import resPta from '../../content/disclosureDocs/res-pta-list.json';
import resBoard from '../../content/disclosureDocs/res-board-results.json';
import stfPrinc from '../../content/disclosureDocs/staff-principal.json';
import stfTotal from '../../content/disclosureDocs/staff-total-teachers.json';
import stfRatio from '../../content/disclosureDocs/staff-teacher-section-ratio.json';
import stfSpec from '../../content/disclosureDocs/staff-special-educator.json';
import stfCouns from '../../content/disclosureDocs/staff-counsellor.json';
import infArea from '../../content/disclosureDocs/infra-campus-area.json';
import infClass from '../../content/disclosureDocs/infra-classrooms.json';
import infLab from '../../content/disclosureDocs/infra-laboratories.json';
import infNet from '../../content/disclosureDocs/infra-internet.json';
import infToil from '../../content/disclosureDocs/infra-toilets.json';
import infYt from '../../content/disclosureDocs/infra-youtube-inspection.json';

// Policies
import polAntiCorp from '../../content/policies/anti-corporal-punishment.json';
import polChild from '../../content/policies/child-protection.json';
import polAntiBully from '../../content/policies/anti-bullying.json';
import polSubst from '../../content/policies/substance-abuse-prevention.json';
import polGriev from '../../content/policies/grievance-redressal.json';
import polDisc from '../../content/policies/rules-of-discipline.json';
import polLeave from '../../content/policies/leave-rules.json';
import polExam from '../../content/policies/test-exams-promotions.json';

// Fee Items
import feeReg from '../../content/feeItems/fee-reg.json';
import feeAdm1 from '../../content/feeItems/fee-adm-nur-ix.json';
import feeAdm2 from '../../content/feeItems/fee-adm-xi-xii.json';
import feeCaut from '../../content/feeItems/fee-caution.json';
import feeT1 from '../../content/feeItems/fee-tuition-nur-v.json';
import feeT2 from '../../content/feeItems/fee-tuition-vi-viii.json';
import feeT3 from '../../content/feeItems/fee-tuition-ix-x.json';
import feeT4 from '../../content/feeItems/fee-tuition-xi-xii.json';

// Institutions
import instBaluni from '../../content/institutions/baluni-classes-dehradun.json';
import instDef from '../../content/institutions/doon-baluni-defence-academy.json';
import instKotdwar from '../../content/institutions/baluni-public-school-kotdwar.json';
import instAgra1 from '../../content/institutions/baluni-public-school-dayalbagh-agra.json';
import instAgra2 from '../../content/institutions/baluni-public-school-deori-road-agra.json';

// Jobs
import job1 from '../../content/jobs/pgt-physics.json';
import job2 from '../../content/jobs/tgt-mathematics.json';
import job3 from '../../content/jobs/prt-general.json';
import job4 from '../../content/jobs/sports-coach-shooting-boxing.json';

// FAQs
import faq1 from '../../content/faqs/faq-admission-process.json';
import faq2 from '../../content/faqs/faq-age-criteria.json';
import faq3 from '../../content/faqs/faq-integrated-coaching.json';
import faq4 from '../../content/faqs/faq-day-boarding.json';
import faq5 from '../../content/faqs/faq-transport.json';
import faq6 from '../../content/faqs/faq-fee-instalments.json';

// Stats
import stat1 from '../../content/stats/stat-cbse.json';
import stat2 from '../../content/stats/stat-founded.json';
import stat3 from '../../content/stats/stat-coaching.json';
import stat4 from '../../content/stats/stat-sports.json';
import stat5 from '../../content/stats/stat-national-athletes.json';
import statUnv1 from '../../content/stats/stat-unverified-topper.json';
import statUnv2 from '../../content/stats/stat-unverified-alumni.json';

// Albums
import alb1 from '../../content/albums/sports-meet-highlights.json';
import alb2 from '../../content/albums/campus-and-infrastructure.json';

export const localDriver = {
  async getSiteSettings(): Promise<SiteSettings> {
    return siteSettingsRaw as SiteSettings;
  },

  async getLeaders(): Promise<Leader[]> {
    const list = [leaderPanwar, leaderBaluni, leaderDsPanwar, leaderVipinBaluni, leaderPrincipal] as Leader[];
    return list.sort((a, b) => a.order - b.order);
  },

  async getLeaderById(id: string): Promise<Leader | undefined> {
    const leaders = await this.getLeaders();
    return leaders.find((l) => l.id === id);
  },

  async getProgrammes(): Promise<Programme[]> {
    return [progNeet, progJee, progNda, progNtse] as Programme[];
  },

  async getProgrammeBySlug(slug: string): Promise<Programme | undefined> {
    const progs = await this.getProgrammes();
    return progs.find((p) => p.slug === slug);
  },

  async getHouses() {
    return [houseAlaknanda, houseBhilangna, houseBhagirathi, houseMandakini];
  },

  async getNotices(): Promise<Notice[]> {
    const list = [noticeAdm, noticeGames, noticePreBoard, noticeWinter] as Notice[];
    // pinned first, then newest
    return list.sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  },

  async getArticles(includeDrafts = false): Promise<Article[]> {
    const list = [artGames, artSfa, artSports, artAirForce, artGuideSchool, artGuideCoaching, artGuideNda] as Article[];
    const filtered = includeDrafts ? list : list.filter((a) => !a.draft);
    return filtered.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  },

  async getArticleBySlug(slug: string): Promise<Article | undefined> {
    const articles = await this.getArticles(true);
    return articles.find((a) => a.slug === slug);
  },

  async getDisclosureDocs(): Promise<DisclosureDoc[]> {
    return [
      genName, genAff, genCode, genAddr, genPrinc, genMail, genContact,
      docAff, docSoc, docRte, docBldg, docFire, docSelf, docWater,
      resFee, resCal, resSmc, resPta, resBoard,
      stfPrinc, stfTotal, stfRatio, stfSpec, stfCouns,
      infArea, infClass, infLab, infNet, infToil, infYt,
    ] as DisclosureDoc[];
  },

  async getPolicies(): Promise<Policy[]> {
    return [polAntiCorp, polChild, polAntiBully, polSubst, polGriev, polDisc, polLeave, polExam] as Policy[];
  },

  async getPolicyBySlug(slug: string): Promise<Policy | undefined> {
    const policies = await this.getPolicies();
    return policies.find((p) => p.slug === slug);
  },

  async getFeeItems(): Promise<FeeItem[]> {
    return [feeReg, feeAdm1, feeAdm2, feeCaut, feeT1, feeT2, feeT3, feeT4] as FeeItem[];
  },

  async getInstitutions(): Promise<Institution[]> {
    return [instBaluni, instDef, instKotdwar, instAgra1, instAgra2] as Institution[];
  },

  async getJobs(): Promise<Job[]> {
    return [job1, job2, job3, job4] as Job[];
  },

  async getFAQs(page?: string): Promise<FAQ[]> {
    const list = [faq1, faq2, faq3, faq4, faq5, faq6] as FAQ[];
    if (page) {
      return list.filter((f) => f.page === page || f.page === 'general');
    }
    return list;
  },

  async getStats(onlyVerified = true): Promise<Stat[]> {
    const list = [stat1, stat2, stat3, stat4, stat5, statUnv1, statUnv2] as Stat[];
    if (onlyVerified) {
      return list.filter((s) => s.verified);
    }
    return list;
  },

  async getAlbums(): Promise<Album[]> {
    return [alb1, alb2] as Album[];
  },

  async getAlbumBySlug(slug: string): Promise<Album | undefined> {
    const albums = await this.getAlbums();
    return albums.find((a) => a.slug === slug);
  },
};
