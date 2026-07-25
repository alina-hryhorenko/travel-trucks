import type { Metadata } from 'next';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { CamperDetailsView } from '@/components/CamperDetailsView/CamperDetailsView';
import { getCachedCamper, getCachedCamperReviews } from '@/lib/cachedCampers';

type CamperPageProps = {
  params: Promise<{ camperId: string }>;
};

export async function generateMetadata({ params }: CamperPageProps): Promise<Metadata> {
  const { camperId } = await params;
  try {
    const camper = await getCachedCamper(camperId);
    return {
      title: camper.name,
      description: camper.description.slice(0, 160),
    };
  } catch {
    return { title: 'Camper details' };
  }
}

export default async function CamperDetailsPage({ params }: CamperPageProps) {
  const { camperId } = await params;
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['camper', camperId],
      queryFn: () => getCachedCamper(camperId),
    }),
    queryClient.prefetchQuery({
      queryKey: ['camper', camperId, 'reviews'],
      queryFn: () => getCachedCamperReviews(camperId),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CamperDetailsView camperId={camperId} />
    </HydrationBoundary>
  );
}
