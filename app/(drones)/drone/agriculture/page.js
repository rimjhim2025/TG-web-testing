// TractorByBrandPage
import DroneByTypePage from '@/src/features/drones/DroneByTypePage';
import '../../../tyreGlobals.css';

export const dynamic = 'force-dynamic';

export default async function page({ params, searchParams }) {
  return <DroneByTypePage params={params} searchParams={searchParams} droneType={'agriculture'} />;
}
