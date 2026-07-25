import { RatingStars } from '@/components/RatingStars/RatingStars';
import type { Review } from '@/types/camper';
import styles from './CamperReviews.module.css';

export function CamperReviews({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0) {
    return <p className={styles.empty}>No reviews yet.</p>;
  }

  return (
    <ul className={styles.list}>
      {reviews.map((review) => (
        <li key={review.id} className={styles.item}>
          <div className={styles.header}>
            <span className={styles.avatar}>{review.reviewer_name.charAt(0).toUpperCase()}</span>
            <div className={styles.meta}>
              <p className={styles.name}>{review.reviewer_name}</p>
              <RatingStars rating={review.reviewer_rating} size={14} />
            </div>
          </div>
          <p className={styles.comment}>{review.comment}</p>
        </li>
      ))}
    </ul>
  );
}
