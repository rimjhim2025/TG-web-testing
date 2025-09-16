// Tractor Implement By Type Page
import React from 'react';

import { getSelectedLanguage } from '@/src/services/locale/index.js'; // For language
import { isMobileView, prepareTyreListingComponent } from '@/src/utils'; // For mobile detection
import { getDictionary } from '@/src/lib/dictonaries'; // For translations

import TyresListingClient from '@/src/features/tyre/allTyreListing/tyresListing/TyresListingClient';
import TyrePageHeader from '@/src/features/tyre/allTyreListing/tyresListing/TyrePageHeader';
import UpdatesSection from '@/src/features/tyreComponents/components/updatesAbouteTyre/UpdatesSection';
import TyreFAQs from '@/src/features/tyre/tyreFAQs/TyreFAQs';
import { getTyreBrands } from '@/src/services/tyre/tyre-brands';
import {
  getTyreReels,
  getTyreVideos,
  getTyreWebstories,
} from '@/src/services/tyre/tyre-brand-webstore';
import NavComponents from '@/src/features/tyre/NavComponents';
import FooterComponents from '@/src/features/tyre/FooterComponents';
import AboutTractorGyanServer from '@/src/components/shared/about/AboutTractorGyanServer';
import { getAllPriceList } from '@/src/services/tyre/all-price-list';
import { getTyreTopContent } from '@/src/services/tyre/top-content';
import TractorGyanOfferings from '@/src/components/shared/offerings/TractorGyanOfferings';
import JoinOurCommunityServer from '@/src/components/shared/community/JoinOurCommunityServer';
import WhatsAppTopButton from '@/src/features/tyreComponents/commonComponents/WhatsAppTopButton';
import TittleAndCrumbs from '@/src/components/shared/TittleAndCrumbs/TittleAndCrumbs';
import ListingHeroSection from '@/src/components/shared/listingHeroSection/ListingHeroSection';
import { getAllTractorBrands } from '@/src/services/tractor/all-tractor-brands';
import TractorListing from '@/src/features/tractors/listing/TractorListing';
import NewsSection from '@/src/features/tyre/tyreNews/NewsSection';
import TyrePriceInquireForm from '../tyreComponents/components/forms/InquireForm';
import TG_Banner from '@/src/components/shared/bannners/Banner';
import {
  tgb_implement_on_road_price,
  tgb_implement_on_road_price_mobile,
} from '@/src/utils/assets/banners';
import { tgi_implement_combine_harvester } from '@/src/utils/assets/icons';
import { getAllImplementTypes } from '@/src/services/implement/all-implement-types';
import SubCategoryTabs from '@/src/components/shared/sub-category-tabs/SubCategoryTabs';
import { getImplementNews } from '@/src/services/implement/implement-news';
import { getAllImplementBrandsByType } from '@/src/services/implement/all-implement-brands-by-type';
import { getImplementFAQs } from '@/src/services/implement/get-implement-faqs';
import { getImplementCategoryTopContent } from '@/src/services/implement/get-implement-category-top-content';

export const dynamic = 'force-dynamic'; // Ensure the page is always rendered dynamically

export default async function TractorImplementTypePage({ params, searchParams }) {
  const param = await params; // Get the params from the request
  const searchParamObj = await searchParams; // Get the search params from the request
  const currentLang = await getSelectedLanguage(); // Server-side language detection
  const translation = await getDictionary(currentLang);

  const isMobile = await isMobileView(); // Server-side mobile detection

  const pageSlug = 'tractor/Massey-ferguson'; // Static for this page
  // const pageSlug = 'tyres'; // Temporary as data is not fetched for above slug

  // const params = await params;

  const tractorBrands = await getAllTractorBrands();

  // TODO::
  // const brand = getBrandFromSlug('Massey-ferguson', tractorBrands);
  const brand = { name: 'Plough' };

  let news;
  try {
    news = await getImplementNews('implement-news');
  } catch (error) {
    news = [];
  }

  const headingTitle = 'Tractors ' + brand.name + ' Implements';

  const category = 'Implements';

  const tyreBrandsData = await getTyreBrands();
  const [videos, reels, webstories] = await Promise.all([
    getTyreVideos('tractor-tyre-in-india'),
    getTyreReels('tractor-tyre-in-india'),
    getTyreWebstories('tractor-tyre-in-india'),
  ]);
  
  const priceList = await getAllPriceList({
    lang: currentLang,
    tyre_slug: pageSlug,
  });

  // const seoData = await getSEOByPage("tyres");

  let topContent;
  try {
    topContent = await getImplementCategoryTopContent({
      category_slug:  'seeding-and-planting', //param.slug
      ad_type_content_lang: currentLang,
      device_type: isMobile ? 'mobile' : 'desktop',
    })
  } catch (error) {
    console.error('Failed to fetch implement top content::', error);
    allImplementBrands = [];
  }

  let allImplementBrands;
  try {
    allImplementBrands = await getAllImplementBrandsByType('plough');
  } catch (error) {
    console.error('Failed to fetch implement brands data:', error);
    allImplementBrands = [];
  }

  const allImplementTypes = await getAllImplementTypes();
  
  let faqs = [];
  try {
    const faqResponse = await getImplementFAQs({
      category_slug: param.slug, // 'seeding-and-planting'
      lang: currentLang,
    });
    if (faqResponse && faqResponse.success) {
      faqs = faqResponse.data || [];
    }
  } catch (error) {
    console.error('Failed to fetch FAQs:', error);
    faqs = [];
  }

  // TODO:: For UI Only
  const subcategories = [
    {name: 'Self Propelled', img: tgi_implement_combine_harvester},
    {name: 'Tractor Mounted', img: tgi_implement_combine_harvester},
    {name: 'Sugarcane', img: tgi_implement_combine_harvester}
  ];

  const { tyresListingClientProps, tyresListingProps } = await prepareTyreListingComponent({
    param: params,
    isMobile,
    pageOrigin: 'tractorsByBrand',
    pageSlug,
    pageType: 'implements',
    prefLang: currentLang,
    translation,
    tyreBrands: allImplementBrands,
    allImplementTypes: allImplementTypes,
    ITEMS_PER_PAGE: 16,
    searchParamsObj: searchParamObj,
    showImplementBrandsSection: true,
    showImplementTypesSection: true,
    subcategories: subcategories,
  });

  return (
    <main>
      {' '}
      {/* Using main as the root layout element */}
      {/* <SeoHead seo={seoData} staticMetadata={{}} /> */}
      <NavComponents translation={translation} isMobile={isMobile} prefLang={currentLang} />
      {/* TODO:: Setup Common Layout Class */}
      <div className="container mx-auto mt-[16px] md:mt-[180px]">
        <TittleAndCrumbs
          title={headingTitle}
          breadcrumbs={[
            { label: 'Home', href: '/', title: 'Home' },
            {
              label: translation.breadcrumbs.tractorBrands,
              href: '/tractor-implements-in-india',
              title: 'Tractor Implements',
            },
            {
              label: `Tractors ${brand.name} Implements`,
              title: `Tractors ${brand.name} Implements`,
              isCurrent: true,
            },
          ]}
        />

        {/* TODO:: Promotional Banner */}
        <TG_Banner
          imgUrl={'/assets/images/placeholder-banner-01.svg'}
          mobileImgUrl={'/assets/images/placeholder-banner-01-mobile.svg'}
          additionalClasses="max-h-auto"
        />
        {topContent.full_ad_image && (
          <div 
            className="rounded-xl overflow-hidden mb-6 border border-gray-light shadow-main" 
            dangerouslySetInnerHTML={{ __html: topContent.full_ad_image }} 
          />
        )}

        <ListingHeroSection
          headingKey={'headings.allTractorTyres'}
          currentLang={currentLang}
          translation={translation}
          priceList={priceList}
          topContent={topContent}
          brandName={brand.name}
          category={category}
          deviceType={isMobile ? 'mobile' : 'desktop'}
        />
      </div>
      {/* Tyre Listing Section with Two-Column Layout */}
      <section className="mt-10 bg-section-gray py-6 md:py-8 lg:py-10">
        <div className="container mx-auto">
          <TyrePageHeader
            isMobile={isMobile}
            brandName={brand.name}
            translation={translation}
            heading={translation?.headings?.allTractorsByBrand}
            activeFilters={tyresListingProps.activeFilters}
            tyresListingClientProps={tyresListingClientProps}
            searchPlaceholder="Search for Implements"
          />
          {/* Sub Category Filter */}
          {subcategories?.length && isMobile && (
            <SubCategoryTabs heading="Combine Harvester By Category" subcategories={subcategories}/>
          )}
          <div className="flex flex-col gap-6 md:flex-row lg:gap-2 xl:gap-6">
            {/* Filters Column */}
            {!isMobile && (
              <div className="md:w-[32%] lg:w-[24%] xl:w-[30%]">
                <TyresListingClient {...tyresListingClientProps} />
              </div>
            )}

            {/* Results Column */}
            <div className="flex-1">
              <TractorListing {...tyresListingProps} />
            </div>
          </div>
        </div>
      </section>
      {/* TODO:: Update the props to make them generic */}
      <TyrePriceInquireForm
        bgColor="bg-green-lighter"
        formTitle={`Get ${brand.name} Implement Price`}
        tyreBrands={tractorBrands}
        translation={translation}
        currentLang={currentLang}
        banner={tgb_implement_on_road_price}
        mobileBanner={tgb_implement_on_road_price_mobile}
      />
      <NewsSection
        translation={translation}
        langPrefix={currentLang}
        news={news}
        title={'News'}
        bgColor={'bg-section-gray'}
        showFilter={false}
      />
      <UpdatesSection
        bgColor={'bg-section-gray'}
        videos={videos}
        reels={reels}
        webstories={webstories}
        translation={translation}
        slug={'tractor-tyre-in-india'}
        brandName={''}
        linkUrls={{
          videos: `${currentLang === 'hi' ? '/hi' : ''}/tractor-videos`,
          webstories: `${currentLang === 'hi' ? '/hi' : ''}/web-story-in-india`,
          reels: `${currentLang === 'hi' ? '/hi' : ''}/tractor-reels-and-shorts`,
        }}
      />
      <TyreFAQs
        faqs={faqs}
        translation={translation}
        headingKey={'tyrefaqs.allTractorTyres'}
        bgColor="bg-white"
      />
      <JoinOurCommunityServer translation={translation} currentLang={currentLang} />
      <TractorGyanOfferings translation={translation} />
      <AboutTractorGyanServer slug={'tractor-implements-in-india'} translation={translation} />
      <FooterComponents translation={translation} />
      <WhatsAppTopButton
        translation={translation}
        currentLang={currentLang}
        tyreBrands={tyreBrandsData}
        defaultEnquiryType={'Tyre'}
      />
    </main>
  );
}
