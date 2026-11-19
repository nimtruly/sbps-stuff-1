import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemas';
import { deskStructure } from './deskStructure';

export default defineConfig({
  name: 'default',
  title: 'Social Baluni Public School — Studio',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'sbps-doon',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

  plugins: [
    structureTool({
      structure: deskStructure,
    }),
  ],

  schema: {
    types: schemaTypes,
  },
});
