import React from 'react';
import { getSelectedLanguage } from '@/src/services/locale/index.js';
import { isMobileView } from '@/src/utils';
import { getDictionary } from '@/src/lib/dictonaries';
import { getAllPriceList } from '@/src/services/tyre/all-price-list';
import { getTyreTopContent } from '@/src/services/tyre/top-content';
import DronePriceList from './DronePriceList';

export default async function DronePriceData({
  breadcrumbs,
  droneType = 'agriculture',
  tableHeaders,
}) {
  const currentLang = await getSelectedLanguage();
  const translation = await getDictionary(currentLang);
  const isMobile = await isMobileView();
  const pageSlug = 'tyres';

  const priceList = await getAllPriceList({
    lang: currentLang,
    tyre_slug: pageSlug,
  });

  const tyreTopContent = await getTyreTopContent({
    ad_title: pageSlug,
    currentLang: currentLang,
    device_type: isMobile ? 'mobile' : 'desktop',
  });
  return (
    <DronePriceList
      headingKey={'headings.allDrones'}
      currentLang={currentLang}
      translation={translation}
      // priceList={priceList}
      tyreTopContent={tyreTopContent}
      deviceType={isMobile ? 'mobile' : 'desktop'}
      breadcrumbs={breadcrumbs}
      tableHeaders={tableHeaders}
      droneType={droneType}
      productType="drone"
      headingTitle={`All ${droneType} drones`}
    />
  );
}
