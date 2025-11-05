import { defineConfig } from '@sanity/cli'
import { structureTool } from '@sanity/structure'
import { visionTool } from '@sanity/vision'
import { noteSchema, discountCodeSchema } from './lib/sanity/schema'

const config = defineConfig({
  projectId: 't1y8nndf',
  dataset: 'production',
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