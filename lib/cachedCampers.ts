import { cache } from 'react';
import { getCamperById, getCamperReviews } from '@/services/campers';

export const getCachedCamper = cache(getCamperById);
export const getCachedCamperReviews = cache(getCamperReviews);
