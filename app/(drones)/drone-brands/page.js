import DroneAllBrandsPage from "@/src/features/drones/DroneAllBrandsPage";

export const dynamic = "force-dynamic";

export default async function page({ params, searchParams }) {
  return (
    <DroneAllBrandsPage params={params} searchParams={searchParams} />
  );
}
