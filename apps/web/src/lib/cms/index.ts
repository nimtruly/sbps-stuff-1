import { localDriver } from './local';
import { sanityDriver } from './sanity';

const driverMode = import.meta.env.CMS_DRIVER || process.env.CMS_DRIVER || 'local';
const sanityProjectId = import.meta.env.SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID;

export const cms = driverMode === 'sanity' && sanityProjectId ? sanityDriver : localDriver;
export * from './types';
