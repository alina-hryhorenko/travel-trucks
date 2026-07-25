import { RatingIcon } from '@/components/icons';
import styles from './RatingStars.module.css';

interface RatingStarsProps {
  rating: number;
  size?: number;
}

const STAR_COUNT = 5;

export function RatingStars({ rating, size = 16 }: RatingStarsProps) {
  const filledCount = Math.round(Math.max(0, Math.min(STAR_COUNT, rating)));

  return (
    <div className={styles.wrapper} aria-label={`Rating: ${rating} out of ${STAR_COUNT}`}>
      {Array.from({ length: STAR_COUNT }).map((_, i) => (
        <RatingIcon
          key={i}
          size={size}
          className={i < filledCount ? styles.filled : styles.empty}
        />
      ))}
    </div>
  );
}
