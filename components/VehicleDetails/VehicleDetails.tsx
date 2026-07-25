import { Badge } from '@/components/Badge/Badge';
import { FuelIcon, TransmissionIcon, VehicleTypeIcon } from '@/components/icons';
import {
  AMENITY_ICONS,
  AMENITY_LABELS,
  ENGINE_LABELS,
  FORM_LABELS,
  TRANSMISSION_LABELS,
} from '@/lib/camperDisplay';
import { toAmenityList, type CamperDetails } from '@/types/camper';
import styles from './VehicleDetails.module.css';

export function VehicleDetails({ camper }: { camper: CamperDetails }) {
  const amenities = toAmenityList(camper.amenities);

  const specs: Array<{ label: string; value: string }> = [
    { label: 'Form', value: FORM_LABELS[camper.form] },
    { label: 'Length', value: camper.length },
    { label: 'Width', value: camper.width },
    { label: 'Height', value: camper.height },
    { label: 'Tank', value: camper.tank },
    { label: 'Consumption', value: camper.consumption },
  ];

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>Vehicle details</h2>

      <div className={styles.badgeRow}>
        <Badge
          icon={<TransmissionIcon size={20} />}
          label={TRANSMISSION_LABELS[camper.transmission]}
        />
        <Badge icon={<FuelIcon size={20} />} label={ENGINE_LABELS[camper.engine]} />
        <Badge icon={<VehicleTypeIcon size={20} />} label={FORM_LABELS[camper.form]} />
        {amenities.map((amenity) => {
          const AmenityIcon = AMENITY_ICONS[amenity];
          return (
            <Badge key={amenity} icon={<AmenityIcon size={20} />} label={AMENITY_LABELS[amenity]} />
          );
        })}
      </div>

      <dl className={styles.specList}>
        {specs.map(({ label, value }) => (
          <div key={label} className={styles.specRow}>
            <dt className={styles.specLabel}>{label}</dt>
            <dd className={styles.specValue}>{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
