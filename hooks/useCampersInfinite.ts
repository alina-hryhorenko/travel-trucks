import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { getCampers } from '@/services/campers';
import type { CamperFilters } from '@/types/camper';

export function useCampersInfinite(filters: CamperFilters) {
  return useInfiniteQuery({
    queryKey: ['campers', filters],
    queryFn: ({ pageParam }) => getCampers(pageParam, filters),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    placeholderData: keepPreviousData,
  });
}
