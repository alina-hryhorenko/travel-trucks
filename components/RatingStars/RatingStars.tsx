import { RatingIcon } from '@/components/icons';
import styles from './RatingStars.module.css';

interface RatingStarsProps {
  rating: number;
  size?: number;
}

const STAR_COUNT = 5;

export function RatingStars({ rating, size = 16 }: RatingStarsProps) {
  const clampedRating = Math.max(0, Math.min(STAR_COUNT, rating));

  return (
    <div className={styles.wrapper} aria-label={`Rating: ${rating} out of ${STAR_COUNT}`}>
      {Array.from({ length: STAR_COUNT }).map((_, i) => {
        const fillPercent = Math.round(Math.max(0, Math.min(1, clampedRating - i)) * 100);
        return (
          <span key={i} className={styles.starWrapper} style={{ width: size, height: size }}>
            <RatingIcon size={size} className={styles.empty} />
            <span className={styles.starFillClip} style={{ width: `${fillPercent}%` }}>
              <RatingIcon size={size} className={styles.filled} />
            </span>
          </span>
        );
      })}
    </div>
  );
}
