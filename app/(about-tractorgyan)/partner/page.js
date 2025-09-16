import React from 'react';
import nextDynamic from 'next/dynamic';
const TG_PartnerWithUsPage = nextDynamic(
  () => import('@/src/features/partner-with-us/PartnerWithUsPage'),
  {
    ssr: true, // Changed to ssr: true
  }
);
export const dynamic = 'force-dynamic';

const page = () => {
  return (
    <>
      <TG_PartnerWithUsPage />
    </>
  );
};

export default page;
