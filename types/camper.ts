export type CamperForm = 'alcove' | 'panel_van' | 'integrated' | 'semi_integrated';
export type CamperTransmission = 'automatic' | 'manual';
export type CamperEngine = 'diesel' | 'petrol' | 'hybrid' | 'electric';
export type CamperAmenity =
  'ac' | 'bathroom' | 'kitchen' | 'tv' | 'radio' | 'refrigerator' | 'microwave' | 'gas' | 'water';

export interface CamperListItem {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  // Not declared in the published OpenAPI schema, but present on live responses.
  description?: string;
  form: CamperForm;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  transmission: CamperTransmission;
  engine: CamperEngine;
  amenities: CamperAmenity[];
  coverImage: string;
  totalReviews: number;
}

export interface CamperListResponse {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  campers: CamperListItem[];
}

export interface CamperImage {
  id: string;
  camperId: string;
  thumb: string;
  original: string;
  order: number;
}

export interface CamperDetails {
  id: string;
  name: string;
  price: number;
  rating: number;
  totalReviews: number;
  location: string;
  description: string;
  form: CamperForm;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  transmission: CamperTransmission;
  engine: CamperEngine;
  // API schema marks this as a single enum value, but real payloads may return
  // an array (matching CamperListItem). Normalize with toAmenityList().
  amenities: CamperAmenity | CamperAmenity[];
  gallery: CamperImage[];
  createdAt: string;
  updatedAt: string;
}

export function toAmenityList(amenities: CamperAmenity | CamperAmenity[]): CamperAmenity[] {
  return Array.isArray(amenities) ? amenities : [amenities];
}

export interface Review {
  id: string;
  camperId: string;
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
  createdAt: string;
}

export interface CamperFilters {
  location?: string;
  form?: CamperForm;
  transmission?: CamperTransmission;
  engine?: CamperEngine;
}

export interface BookingRequestPayload {
  name: string;
  email: string;
}

export interface BookingRequestResponse {
  message: string;
}
