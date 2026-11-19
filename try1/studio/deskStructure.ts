import type { StructureResolver } from 'sanity/structure';

export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title('SBPS Content Management')
    .items([
      // 1. Notices First (for urgent school circulars)
      S.listItem()
        .title('📢 Notices & Circulars')
        .child(S.documentTypeList('notice').title('Notices & Circulars')),

      // 2. Articles (News & Blog)
      S.listItem()
        .title('📰 Articles & School News')
        .child(S.documentTypeList('article').title('Articles & News')),

      S.divider(),

      // 3. Mandatory Public Disclosure (Appendix-IX)
      S.listItem()
        .title('⚖️ CBSE Mandatory Disclosure (Appendix-IX)')
        .child(S.documentTypeList('disclosureDoc').title('Mandatory Disclosure Documents')),

      // 4. Academics & Integrated Coaching Programmes
      S.listItem()
        .title('🎓 Academic Programmes (NEET/JEE/NDA)')
        .child(S.documentTypeList('programme').title('Academic Programmes')),

      // 5. Admissions & Fee Items
      S.listItem()
        .title('💳 Fee Structure & Admissions')
        .child(S.documentTypeList('feeItem').title('Fee Structure Items')),

      // 6. Photo Galleries & Albums
      S.listItem()
        .title('📷 Photo Galleries')
        .child(S.documentTypeList('album').title('Galleries & Albums')),

      // 7. School Policies
      S.listItem()
        .title('📜 School Policies & Guidelines')
        .child(S.documentTypeList('policy').title('Policies')),

      // 8. Leadership Messages
      S.listItem()
        .title('👔 Leadership & Messages')
        .child(S.documentTypeList('leader').title('Leadership Messages')),

      // 9. Careers / Jobs
      S.listItem()
        .title('💼 Careers & Vacancies')
        .child(S.documentTypeList('job').title('Open Vacancies')),

      // 10. FAQs
      S.listItem()
        .title('❓ Frequently Asked Questions')
        .child(S.documentTypeList('faq').title('FAQs')),

      // 11. Baluni Group Sister Institutions
      S.listItem()
        .title('🏛️ Baluni Group Institutions')
        .child(S.documentTypeList('institution').title('Sister Institutions')),

      S.divider(),

      // 12. Site Settings Singleton
      S.listItem()
        .title('⚙️ Site Settings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Global Site Settings')
        ),
    ]);
