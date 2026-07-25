import styles from './CamperCardSkeleton.module.css';

export function CamperCardSkeleton() {
  return (
    <div className={styles.card}>
      <div className={styles.image} />
      <div className={styles.content}>
        <div className={styles.row}>
          <div className={styles.titleBlock} />
          <div className={styles.priceBlock} />
        </div>
        <div className={styles.metaBlock} />
        <div className={styles.descLines}>
          <div className={styles.descLine} />
          <div className={styles.descLine} />
          <div className={styles.descLineShort} />
        </div>
        <div className={styles.badgeRow}>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className={styles.badgePlaceholder} />
          ))}
        </div>
      </div>
    </div>
  );
}
