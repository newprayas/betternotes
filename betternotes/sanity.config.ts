import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { noteSchema, discountCodeSchema } from './lib/sanity/schema'

const config = defineConfig({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 't1y8nndf',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  plugins: [
    structureTool({
      structure: (S: any) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Notes')
              .schemaType('note')
              .child(S.documentTypeList('note').title('Notes')),
            S.listItem()
              .title('Discount Codes')
              .schemaType('discountCode')
              .child(S.documentTypeList('discountCode').title('Discount Codes')),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: [noteSchema, discountCodeSchema],
  },
})

export default config