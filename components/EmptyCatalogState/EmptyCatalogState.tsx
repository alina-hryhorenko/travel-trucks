import Image from 'next/image';
import { ClearIcon } from '@/components/icons';
import styles from './EmptyCatalogState.module.css';

interface EmptyCatalogStateProps {
  onClearFilters: () => void;
}

export function EmptyCatalogState({ onClearFilters }: EmptyCatalogStateProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <Image src="/images/empty-catalog.png" alt="" width={488} height={463} />
        <div className={styles.textGroup}>
          <h2 className={styles.title}>No campers found</h2>
          <p className={styles.text}>
            We couldn&apos;t find any campers that match your filters.
            <br />
            Try adjusting your search or clearing some filters.
          </p>
        </div>
      </div>
      <div className={styles.actions}>
        <button type="button" onClick={onClearFilters} className={styles.secondaryButton}>
          <ClearIcon size={16} />
          Clear filters
        </button>
        <button type="button" onClick={onClearFilters} className={styles.primaryButton}>
          View all campers
        </button>
      </div>
    </div>
  );
}
