import ConstructionMachineryPage from '@/src/features/construction-machinery/ConstructionMachineryPage';
import DronesInIndiaPage from '@/src/features/drones/DronesInIndiaPage';

export const dynamic = "force-dynamic";

export default async function page({ params, searchParams }) {
  return (
    <DronesInIndiaPage params={params} searchParams={searchParams} />
  );
}
