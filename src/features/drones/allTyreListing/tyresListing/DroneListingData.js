import React from 'react';
import { getSelectedLanguage } from '@/src/services/locale/index.js';
import { isMobileView, prepareDroneListingComponent } from '@/src/utils';
import { getDictionary } from '@/src/lib/dictonaries';
import DronesListing from './DronesListing';
import DronesListingClient from './DronesListingClient';
import DronePageHeader from './DronePageHeader';

export default async function DroneListingData({
  params,
  searchParams,
  basePath,
  tyreBrands,
  droneBrands,
  showBrandFilter = false,
  showSizeFilter = false,
  showTractorHPFilter = false,
  showTyreBrandsSection = false,
  showDroneBrandsSection = false,
  brandName = '',
  pageType = 'tyres',
}) {
  const param = await params;
  const searchParamsObj = await searchParams;
  const currentLang = await getSelectedLanguage();
  const translation = await getDictionary(currentLang);
  const isMobile = await isMobileView();
  const pageSlug = basePath || 'tyres';

  const { tyresListingClientProps, tyresListingProps } = await prepareDroneListingComponent({
    param: param,
    searchParamsObj: searchParamsObj,
    isMobile,
    showBrandFilter,
    showSizeFilter,
    showTractorHPFilter,
    showDroneBrandsSection,
    showTyreBrandsSection,
    filterBySize: 'all',
    pageSlug,
    pageType: pageType,
    prefLang: currentLang,
    translation,
    tyreBrands,
    ITEMS_PER_PAGE: 14,
    basePathFromUrl: basePath,
  });

  // Extract pagination info for parent component
  const paginationInfo = {
    hasNextPage: tyresListingProps.hasNextPage || false,
    currentPage: tyresListingProps.currentPage || 1,
    totalPages: tyresListingProps.totalPages || 1,
    totalItems: tyresListingProps.totalItems || 0,
  };

  const TyreListingComponent = (
    <section className="bg-section-gray py-6 md:py-8 lg:py-10">
      <div className="container mx-auto">
        <DronePageHeader
          isMobile={isMobile}
          brandName={brandName}
          translation={translation}
          activeFilters={tyresListingProps.activeFilters}
          tyresListingClientProps={tyresListingClientProps}
        />
        <div className="flex flex-col gap-6 md:flex-row lg:gap-2 xl:gap-6">
          {!isMobile && (
            <div className="md:w-[32%] lg:w-[24%] xl:w-[30%]">
              <DronesListingClient {...tyresListingClientProps} />
            </div>
          )}
          <div className="flex-1">
            <DronesListing {...tyresListingProps} />
          </div>
        </div>
      </div>
    </section>
  );

  return {
    component: TyreListingComponent,
    paginationInfo,
  };
}
