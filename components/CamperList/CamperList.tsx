'use client';

import { useEffect } from 'react';
import { CamperCard } from '@/components/CamperCard/CamperCard';
import { CamperCardSkeleton } from '@/components/CamperCardSkeleton/CamperCardSkeleton';
import { EmptyCatalogState } from '@/components/EmptyCatalogState/EmptyCatalogState';
import { Loader } from '@/components/Loader/Loader';
import { useCampersInfinite } from '@/hooks/useCampersInfinite';
import type { CamperFilters } from '@/types/camper';
import styles from './CamperList.module.css';

const SKELETON_COUNT = 4;

interface CamperListProps {
  filters: CamperFilters;
  onClearFilters: () => void;
  onFilteringChange?: (isFiltering: boolean) => void;
}

export function CamperList({ filters, onClearFilters, onFilteringChange }: CamperListProps) {
  const { data, isPending, isError, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useCampersInfinite(filters);

  const isFilteringRefetch = isFetching && !isPending && !isFetchingNextPage;

  useEffect(() => {
    onFilteringChange?.(isFilteringRefetch);
  }, [isFilteringRefetch, onFilteringChange]);

  if (isPending) {
    return (
      <div className={styles.list}>
        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
          <CamperCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return <p className={styles.error}>Failed to load campers. Please try again later.</p>;
  }

  const campers = data.pages.flatMap((page) => page.campers);

  if (campers.length === 0) {
    return <EmptyCatalogState onClearFilters={onClearFilters} />;
  }

  return (
    <div className={styles.list}>
      {campers.map((camper, index) => (
        <CamperCard key={camper.id} camper={camper} priority={index === 0} />
      ))}
      {hasNextPage && (
        <button
          type="button"
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className={styles.loadMore}
        >
          {isFetchingNextPage && (
            <Loader
              size={20}
              label="Loading more campers"
              trackColor="var(--gray-light)"
              activeColor="var(--green-hover)"
            />
          )}
          Load more
        </button>
      )}
    </div>
  );
}
