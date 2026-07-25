'use client';

import { useState } from 'react';
import { CamperList } from '@/components/CamperList/CamperList';
import { FilterPanel } from '@/components/FilterPanel/FilterPanel';
import { LoadingOverlay } from '@/components/LoadingOverlay/LoadingOverlay';
import type { CamperFilters } from '@/types/camper';
import styles from './CatalogView.module.css';

export function CatalogView() {
  const [filters, setFilters] = useState<CamperFilters>({});
  const [filterPanelKey, setFilterPanelKey] = useState(0);
  const [isFiltering, setIsFiltering] = useState(false);

  function handleClearFilters() {
    setFilters({});
    setFilterPanelKey((key) => key + 1);
  }

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.srOnly}>Camper catalog</h1>
      <FilterPanel key={filterPanelKey} onApply={setFilters} />
      <CamperList
        filters={filters}
        onClearFilters={handleClearFilters}
        onFilteringChange={setIsFiltering}
      />
      {isFiltering && <LoadingOverlay />}
    </div>
  );
}
