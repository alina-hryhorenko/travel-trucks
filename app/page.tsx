import type { Metadata } from 'next';
import { Hero } from '@/components/Hero/Hero';

export const metadata: Metadata = {
  title: 'TravelTrucks — Camper Rental',
  description: 'Rent the perfect camper van for your next adventure with TravelTrucks.',
};

export default function Home() {
  return <Hero />;
}
