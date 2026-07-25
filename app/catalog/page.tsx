import type { Metadata } from 'next';
import { CatalogView } from '@/components/CatalogView/CatalogView';

export const metadata: Metadata = {
  title: 'Catalog',
  description: 'Browse and filter camper vans available for rent.',
};

export default function CatalogPage() {
  return <CatalogView />;
}
