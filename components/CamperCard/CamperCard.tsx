import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/Badge/Badge';
import {
  FuelIcon,
  LocationIcon,
  RatingIcon,
  TransmissionIcon,
  VehicleTypeIcon,
} from '@/components/icons';
import {
  AMENITY_ICONS,
  AMENITY_LABELS,
  ENGINE_LABELS,
  FORM_LABELS,
  TRANSMISSION_LABELS,
} from '@/lib/camperDisplay';
import type { CamperListItem } from '@/types/camper';
import styles from './CamperCard.module.css';

const MAX_AMENITY_BADGES = 4;

export function CamperCard({
  camper,
  priority = false,
}: {
  camper: CamperListItem;
  priority?: boolean;
}) {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={camper.coverImage}
          alt={camper.name}
          fill
          sizes="290px"
          priority={priority}
          className={styles.image}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.headerRow}>
          <h3 className={styles.name}>{camper.name}</h3>
          <p className={styles.price}>€{camper.price.toLocaleString('en-US')}</p>
        </div>

        <div className={styles.metaRow}>
          <span className={styles.metaItem}>
            <RatingIcon className={styles.ratingIcon} size={16} />
            {camper.rating.toFixed(1)} ({camper.totalReviews} Reviews)
          </span>
          <span className={styles.metaItem}>
            <LocationIcon size={16} />
            {camper.location}
          </span>
        </div>

        {camper.description ? <p className={styles.description}>{camper.description}</p> : null}

        <div className={styles.badgeRow}>
          <Badge
            icon={<TransmissionIcon size={20} />}
            label={TRANSMISSION_LABELS[camper.transmission]}
          />
          <Badge icon={<FuelIcon size={20} />} label={ENGINE_LABELS[camper.engine]} />
          <Badge icon={<VehicleTypeIcon size={20} />} label={FORM_LABELS[camper.form]} />
          {camper.amenities.slice(0, MAX_AMENITY_BADGES).map((amenity) => {
            const AmenityIcon = AMENITY_ICONS[amenity];
            return (
              <Badge
                key={amenity}
                icon={<AmenityIcon size={20} />}
                label={AMENITY_LABELS[amenity]}
              />
            );
          })}
        </div>

        <Link
          href={`/catalog/${camper.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.showMore}
        >
          Show more
        </Link>
      </div>
    </article>
  );
}
