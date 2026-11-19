import { defineType, defineField } from 'sanity';

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'School Name', type: 'string' }),
    defineField({ name: 'shortName', title: 'Short Name', type: 'string' }),
    defineField({ name: 'affiliationNo', title: 'CBSE Affiliation No.', type: 'string' }),
    defineField({ name: 'schoolCode', title: 'School Code', type: 'string' }),
    defineField({ name: 'address', title: 'Address', type: 'text' }),
    defineField({
      name: 'phones',
      title: 'Phone Numbers',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'emails',
      title: 'Email Addresses',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'admissionsOpen',
      title: 'Admissions Open',
      type: 'boolean',
    }),
    defineField({
      name: 'admissionsSession',
      title: 'Admissions Session',
      type: 'string',
    }),
    defineField({
      name: 'tickerItems',
      title: 'Announcement Ticker Items',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
});

export const noticeType = defineType({
  name: 'notice',
  title: 'Notices & Circulars',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Notice Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'date', title: 'Date of Notice', type: 'date', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: ['Admissions', 'Exams', 'Holidays', 'Events', 'General'],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'pinned', title: 'Pin to Top', type: 'boolean' }),
    defineField({ name: 'notify', title: 'Trigger Push / Email Alert', type: 'boolean' }),
    defineField({ name: 'expiresAt', title: 'Expiry Date', type: 'date' }),
    defineField({ name: 'body', title: 'Notice Body', type: 'text', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'attachments',
      title: 'Document Attachments',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Attachment Title', type: 'string' },
            { name: 'file', title: 'PDF File', type: 'file' },
          ],
        },
      ],
    }),
  ],
});

export const articleType = defineType({
  name: 'article',
  title: 'Articles & News',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Article Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'excerpt', title: 'Summary / Excerpt', type: 'text' }),
    defineField({ name: 'cover', title: 'Cover Image', type: 'image' }),
    defineField({ name: 'author', title: 'Author Name', type: 'string' }),
    defineField({ name: 'publishedAt', title: 'Published At', type: 'datetime' }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: ['News', 'Achievements', 'Admissions Guides', 'Parent Tips', 'Integrated Coaching'],
      },
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({ name: 'body', title: 'Content', type: 'text' }),
    defineField({ name: 'draft', title: 'Is Draft (Hide from public)?', type: 'boolean' }),
  ],
});

export const leaderType = defineType({
  name: 'leader',
  title: 'Leadership Messages',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Leader Name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'role', title: 'Designation / Role', type: 'string' }),
    defineField({ name: 'org', title: 'Organization', type: 'string' }),
    defineField({ name: 'credentials', title: 'Credentials / Qualifications', type: 'string' }),
    defineField({ name: 'photo', title: 'Portrait Photo', type: 'image' }),
    defineField({ name: 'message', title: 'Leadership Message', type: 'text' }),
    defineField({ name: 'order', title: 'Sort Order', type: 'number' }),
  ],
});

export const programmeType = defineType({
  name: 'programme',
  title: 'Academic Programmes',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Programme Title', type: 'string' }),
    defineField({ name: 'slug', title: 'Slug', type: 'string' }),
    defineField({ name: 'duration', title: 'Duration', type: 'string' }),
    defineField({ name: 'eligibility', title: 'Eligibility', type: 'string' }),
    defineField({ name: 'summary', title: 'Summary', type: 'text' }),
    defineField({ name: 'partner', title: 'Coaching Partner', type: 'string' }),
    defineField({ name: 'features', title: 'Key Features', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'body', title: 'Description Body', type: 'text' }),
  ],
});

export const albumType = defineType({
  name: 'album',
  title: 'Photo Galleries',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Album Title', type: 'string' }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'date', title: 'Event Date', type: 'date' }),
    defineField({ name: 'category', title: 'Category', type: 'string' }),
    defineField({ name: 'cover', title: 'Cover Image', type: 'image' }),
    defineField({
      name: 'images',
      title: 'Gallery Images',
      type: 'array',
      of: [
        {
          type: 'image',
          fields: [
            { name: 'alt', title: 'Alt Text', type: 'string' },
            { name: 'caption', title: 'Caption', type: 'string' },
          ],
        },
      ],
    }),
  ],
});

export const disclosureDocType = defineType({
  name: 'disclosureDoc',
  title: 'Mandatory Disclosure Documents',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Document Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'group',
      title: 'Appendix-IX Group',
      type: 'string',
      options: {
        list: [
          'General Information',
          'Documents and Information',
          'Results and Academics',
          'Staff (Teaching)',
          'School Infrastructure',
        ],
      },
    }),
    defineField({ name: 'file', title: 'Document PDF', type: 'file' }),
    defineField({ name: 'value', title: 'Text Value (if no file)', type: 'string' }),
    defineField({ name: 'validFrom', title: 'Valid From', type: 'date' }),
    defineField({ name: 'validTo', title: 'Valid To / Expiry', type: 'date' }),
    defineField({ name: 'updatedAt', title: 'Last Updated', type: 'date' }),
  ],
});

export const feeItemType = defineType({
  name: 'feeItem',
  title: 'Fee Structure Items',
  type: 'document',
  fields: [
    defineField({ name: 'label', title: 'Fee Head', type: 'string' }),
    defineField({ name: 'classRange', title: 'Class Range', type: 'string' }),
    defineField({
      name: 'type',
      title: 'Frequency Type',
      type: 'string',
      options: { list: ['one-time', 'quarterly', 'monthly', 'refundable'] },
    }),
    defineField({ name: 'refundable', title: 'Refundable?', type: 'boolean' }),
    defineField({ name: 'amount', title: 'Amount in INR', type: 'number' }),
    defineField({ name: 'session', title: 'Academic Session', type: 'string' }),
    defineField({ name: 'verified', title: 'Verified by Accounts (Never unverified in prod)?', type: 'boolean' }),
  ],
});

export const policyType = defineType({
  name: 'policy',
  title: 'School Policies',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Policy Title', type: 'string' }),
    defineField({ name: 'slug', title: 'Slug', type: 'string' }),
    defineField({ name: 'summary', title: 'Short Summary', type: 'text' }),
    defineField({ name: 'body', title: 'Policy Document Body', type: 'text' }),
  ],
});

export const statType = defineType({
  name: 'stat',
  title: 'School Statistics',
  type: 'document',
  fields: [
    defineField({ name: 'label', title: 'Metric Label', type: 'string' }),
    defineField({ name: 'value', title: 'Metric Value', type: 'string' }),
    defineField({ name: 'context', title: 'Contextual Description', type: 'string' }),
    defineField({ name: 'source', title: 'Verification Source', type: 'string' }),
    defineField({ name: 'verified', title: 'Verified (Hidden if false)', type: 'boolean' }),
  ],
});

export const jobType = defineType({
  name: 'job',
  title: 'Careers Openings',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Job Title', type: 'string' }),
    defineField({ name: 'department', title: 'Department', type: 'string' }),
    defineField({ name: 'type', title: 'Employment Type', type: 'string' }),
    defineField({ name: 'description', title: 'Role Description', type: 'text' }),
    defineField({ name: 'open', title: 'Position Open?', type: 'boolean' }),
  ],
});

export const faqType = defineType({
  name: 'faq',
  title: 'Frequently Asked Questions',
  type: 'document',
  fields: [
    defineField({ name: 'question', title: 'Question', type: 'string' }),
    defineField({ name: 'answer', title: 'Answer', type: 'text' }),
    defineField({
      name: 'page',
      title: 'Target Page',
      type: 'string',
      options: { list: ['admissions', 'home', 'fees', 'general'] },
    }),
    defineField({ name: 'verified', title: 'Verified by Leadership', type: 'boolean' }),
  ],
});

export const institutionType = defineType({
  name: 'institution',
  title: 'Sister Institutions',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Institution Name', type: 'string' }),
    defineField({ name: 'type', title: 'Type', type: 'string' }),
    defineField({ name: 'address', title: 'Address', type: 'text' }),
    defineField({ name: 'phones', title: 'Phones', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'url', title: 'Website URL', type: 'url' }),
  ],
});

export const schemaTypes = [
  siteSettingsType,
  noticeType,
  articleType,
  leaderType,
  programmeType,
  albumType,
  disclosureDocType,
  feeItemType,
  policyType,
  statType,
  jobType,
  faqType,
  institutionType,
];
