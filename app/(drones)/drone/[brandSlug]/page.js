import DroneBrandPage from '@/src/features/drones/DroneBrandPage';
import TyreBrandPage from '@/src/features/tyre/TyreBrandPage';
import React from 'react';

export const dynamic = 'force-dynamic';

export default async function page({ params, searchParams }) {
  return (
    <>
      <DroneBrandPage params={params} searchParams={searchParams} />
    </>
  );
}
