// Note schema for Sanity CMS
export const noteSchema = {
  name: 'note',
  title: 'Note',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: import('sanity').Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: import('sanity').Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule: import('sanity').Rule) => Rule.min(0),
    },
    {
      name: 'originalPrice',
      title: 'Original Price',
      type: 'number',
    },
    {
      name: 'pageNumber',
      title: 'Page Number',
      type: 'number',
      validation: (Rule: import('sanity').Rule) => Rule.min(1),
    },
    {
      name: 'images',
      title: '📸 Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              description: 'Describe the image for accessibility and SEO',
            },
          ],
          preview: {
            select: {
              title: 'alt',
              media: 'asset',
            },
            prepare: (selection: { title?: string; media?: any }) => ({
              title: selection.title || 'Untitled Image',
              media: selection.media,
            }),
          },
        },
      ],
      options: {
        layout: 'grid',
        addNewButton: '+ Add Image',
      },
      description: '🎯 **PRO TIP**: Select multiple image files on your computer and drag them here all at once! You can also paste images from clipboard.',
    },
    {
      name: 'academicYear',
      title: 'Academic Year',
      type: 'string',
      options: {
        list: [
          { title: 'Third Year', value: 'third-year' },
          { title: 'Fourth Year', value: 'fourth-year' },
          { title: 'Fifth Year', value: 'fifth-year' },
        ],
      },
    },
    {
      name: 'subject',
      title: 'Subject',
      type: 'string',
      options: {
        list: [
          { title: 'Anatomy', value: 'anatomy' },
          { title: 'Physiology', value: 'physiology' },
          { title: 'Biochemistry', value: 'biochemistry' },
          { title: 'Pathology', value: 'pathology' },
          { title: 'Pharmacology', value: 'pharmacology' },
          { title: 'Microbiology', value: 'microbiology' },
          { title: 'Forensic Medicine', value: 'forensic-medicine' },
          { title: 'Community Medicine', value: 'community-medicine' },
          { title: 'ENT', value: 'ent' },
          { title: 'Ophthalmology', value: 'ophthalmology' },
          { title: 'Medicine', value: 'medicine' },
          { title: 'Surgery', value: 'surgery' },
          { title: 'Obstetrics & Gynecology', value: 'obgyn' },
          { title: 'Pediatrics', value: 'pediatrics' },
          { title: 'Orthopedics', value: 'orthopedics' },
          { title: 'Dermatology', value: 'dermatology' },
          { title: 'Psychiatry', value: 'psychiatry' },
          { title: 'Radiology', value: 'radiology' },
          { title: 'Anesthesiology', value: 'anesthesiology' },
        ],
      },
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subject',
    },
  },
};

// Discount code schema for Sanity CMS
export const discountCodeSchema = {
  name: 'discountCode',
  title: 'Discount Code',
  type: 'document',
  fields: [
    {
      name: 'code',
      title: 'Code',
      type: 'string',
      validation: (Rule: import('sanity').Rule) => Rule.required(),
    },
    {
      name: 'discountPercentage',
      title: 'Discount Percentage',
      type: 'number',
      validation: (Rule: import('sanity').Rule) => Rule.required().min(1).max(100),
    },
    {
      name: 'validFrom',
      title: 'Valid From',
      type: 'datetime',
      validation: (Rule: import('sanity').Rule) => Rule.required(),
    },
    {
      name: 'validUntil',
      title: 'Valid Until',
      type: 'datetime',
      validation: (Rule: import('sanity').Rule) => Rule.required(),
    },
    {
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'usageLimit',
      title: 'Usage Limit',
      type: 'number',
    },
    {
      name: 'usedCount',
      title: 'Used Count',
      type: 'number',
      initialValue: 0,
    },
  ],
  preview: {
    select: {
      title: 'code',
      subtitle: 'discountPercentage',
    },
  },
};