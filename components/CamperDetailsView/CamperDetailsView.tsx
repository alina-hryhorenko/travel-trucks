'use client';

import { useQuery } from '@tanstack/react-query';
import { BookingForm } from '@/components/BookingForm/BookingForm';
import { CamperGallery } from '@/components/CamperGallery/CamperGallery';
import { CamperInfo } from '@/components/CamperInfo/CamperInfo';
import { CamperReviews } from '@/components/CamperReviews/CamperReviews';
import { Loader } from '@/components/Loader/Loader';
import { VehicleDetails } from '@/components/VehicleDetails/VehicleDetails';
import { getCamperById, getCamperReviews } from '@/services/campers';
import styles from './CamperDetailsView.module.css';

export function CamperDetailsView({ camperId }: { camperId: string }) {
  const camperQuery = useQuery({
    queryKey: ['camper', camperId],
    queryFn: () => getCamperById(camperId),
  });

  const reviewsQuery = useQuery({
    queryKey: ['camper', camperId, 'reviews'],
    queryFn: () => getCamperReviews(camperId),
  });

  if (camperQuery.isPending) {
    return (
      <div className={styles.loaderWrapper}>
        <Loader size={56} />
      </div>
    );
  }

  if (camperQuery.isError || !camperQuery.data) {
    return (
      <p className={styles.errorText}>Failed to load camper details. Please try again later.</p>
    );
  }

  const camper = camperQuery.data;

  return (
    <div className={styles.wrapper}>
      <div className={styles.layout}>
        <CamperGallery images={camper.gallery} alt={camper.name} />

        <div className={styles.infoGroup}>
          <CamperInfo camper={camper} />
          <VehicleDetails camper={camper} />
        </div>

        <div className={styles.reviewsColumn}>
          <h2 className={styles.reviewsHeading}>Reviews</h2>
          {reviewsQuery.isPending ? (
            <Loader size={32} className={styles.reviewsLoader} />
          ) : reviewsQuery.isError ? (
            <p className={styles.reviewsError}>Failed to load reviews.</p>
          ) : (
            <CamperReviews reviews={reviewsQuery.data ?? []} />
          )}
        </div>

        <BookingForm camperId={camper.id} camperName={camper.name} />
      </div>
    </div>
  );
}
