import { api } from '@/lib/api';
import type {
  BookingRequestPayload,
  BookingRequestResponse,
  CamperDetails,
  CamperFilters,
  CamperListResponse,
  Review,
} from '@/types/camper';

const CAMPERS_PER_PAGE = 4;

export async function getCampers(
  page: number,
  filters: CamperFilters,
): Promise<CamperListResponse> {
  const { data } = await api.get<CamperListResponse>('/campers', {
    params: {
      page,
      perPage: CAMPERS_PER_PAGE,
      location: filters.location || undefined,
      form: filters.form || undefined,
      transmission: filters.transmission || undefined,
      engine: filters.engine || undefined,
    },
  });
  return data;
}

export async function getCamperById(camperId: string): Promise<CamperDetails> {
  const { data } = await api.get<CamperDetails>(`/campers/${camperId}`);
  return data;
}

export async function getCamperReviews(camperId: string): Promise<Review[]> {
  const { data } = await api.get<Review[]>(`/campers/${camperId}/reviews`);
  return data;
}

export async function createBookingRequest(
  camperId: string,
  payload: BookingRequestPayload,
): Promise<BookingRequestResponse> {
  const { data } = await api.post<BookingRequestResponse>(
    `/campers/${camperId}/booking-requests`,
    payload,
  );
  return data;
}
