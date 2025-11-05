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
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(0),
    },
    {
      name: 'originalPrice',
      title: 'Original Price',
      type: 'number',
    },
    {
      name: 'images',
      title: 'Images',
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
            },
          ],
        },
      ],
      validation: (Rule: any) => Rule.required().min(1),
    },
    {
      name: 'academicYear',
      title: 'Academic Year',
      type: 'string',
      options: {
        list: [
          { title: 'First Year', value: 'first-year' },
          { title: 'Second Year', value: 'second-year' },
          { title: 'Third Year', value: 'third-year' },
          { title: 'Fourth Year', value: 'fourth-year' },
          { title: 'Fifth Year', value: 'fifth-year' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
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
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'examType',
      title: 'Exam Type',
      type: 'string',
      options: {
        list: [
          { title: 'University Exam', value: 'university' },
          { title: 'Entrance Exam', value: 'entrance' },
          { title: 'Supplementary', value: 'supplementary' },
          { title: 'Revision Notes', value: 'revision' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
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
      media: 'images.0',
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
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'discountPercentage',
      title: 'Discount Percentage',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(1).max(100),
    },
    {
      name: 'validFrom',
      title: 'Valid From',
      type: 'datetime',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'validUntil',
      title: 'Valid Until',
      type: 'datetime',
      validation: (Rule: any) => Rule.required(),
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