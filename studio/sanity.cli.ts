import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'sbps-doon',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
  vite: (config) => {
    return config;
  },
});
