import { LocationIcon, RatingIcon } from '@/components/icons';
import type { CamperDetails } from '@/types/camper';
import styles from './CamperInfo.module.css';

export function CamperInfo({ camper }: { camper: CamperDetails }) {
  return (
    <div className={styles.card}>
      <div className={styles.headerGroup}>
        <h1 className={styles.title}>{camper.name}</h1>
        <div className={styles.metaRow}>
          <span className={`${styles.metaItem} ${styles.ratingItem}`}>
            <RatingIcon size={16} />
            {camper.rating}
            <span className={styles.reviewCount}>({camper.totalReviews} Reviews)</span>
          </span>
          <span className={`${styles.metaItem} ${styles.locationItem}`}>
            <LocationIcon size={16} />
            {camper.location}
          </span>
        </div>
        <p className={styles.price}>€{camper.price.toLocaleString('en-US')}</p>
      </div>
      <p className={styles.description}>{camper.description}</p>
    </div>
  );
}
