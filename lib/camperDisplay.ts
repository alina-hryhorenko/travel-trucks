import {
  PiCookingPot,
  PiDrop,
  PiFan,
  PiGasCan,
  PiOven,
  PiRadio,
  PiShower,
  PiSnowflake,
  PiTelevisionSimple,
} from 'react-icons/pi';
import type { IconType } from 'react-icons';
import type { CamperAmenity, CamperEngine, CamperForm, CamperTransmission } from '@/types/camper';

export const FORM_LABELS: Record<CamperForm, string> = {
  alcove: 'Alcove',
  panel_van: 'Panel Van',
  integrated: 'Integrated',
  semi_integrated: 'Semi Integrated',
};

export const ENGINE_LABELS: Record<CamperEngine, string> = {
  diesel: 'Diesel',
  petrol: 'Petrol',
  hybrid: 'Hybrid',
  electric: 'Electric',
};

export const TRANSMISSION_LABELS: Record<CamperTransmission, string> = {
  automatic: 'Automatic',
  manual: 'Manual',
};

export const AMENITY_LABELS: Record<CamperAmenity, string> = {
  ac: 'AC',
  bathroom: 'Bathroom',
  kitchen: 'Kitchen',
  tv: 'TV',
  radio: 'Radio',
  refrigerator: 'Refrigerator',
  microwave: 'Microwave',
  gas: 'Gas',
  water: 'Water',
};

export const AMENITY_ICONS: Record<CamperAmenity, IconType> = {
  ac: PiFan,
  bathroom: PiShower,
  kitchen: PiCookingPot,
  tv: PiTelevisionSimple,
  radio: PiRadio,
  refrigerator: PiSnowflake,
  microwave: PiOven,
  gas: PiGasCan,
  water: PiDrop,
};
