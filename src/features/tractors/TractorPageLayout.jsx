// Reusable Tractor Page Layout Component
import React, { Suspense } from 'react';
import { getSelectedLanguage } from '@/src/services/locale/index.js';
import { isMobileView } from '@/src/utils';
import { getDictionary } from '@/src/lib/dictonaries';

import UpdatesSection from '@/src/features/tyreComponents/components/updatesAbouteTyre/UpdatesSection';
import TractorFAQs from '@/src/features/tyre/tyreFAQs/TyreFAQs';
import {
  getTyreReels,
  getTyreVideos,
  getTyreWebstories,
} from '@/src/services/tyre/tyre-brand-webstore';
import NavComponents from '@/src/features/tyre/NavComponents';
import FooterComponents from '@/src/features/tyre/FooterComponents';
import AboutTractorGyanServer from '@/src/components/shared/about/AboutTractorGyanServer';
import { getTractorFAQs } from '@/src/services/tractor/get-tractor-faqs';
import TractorGyanOfferings from '@/src/components/shared/offerings/TractorGyanOfferings';
import JoinOurCommunityServer from '@/src/components/shared/community/JoinOurCommunityServer';
import WhatsAppTopButton from '@/src/features/tyreComponents/commonComponents/WhatsAppTopButton';
import { getTractorBrands } from '@/src/services/tractor/all-tractor-brands-v2';
import SecondHandMiniTractorCards from '@/src/components/ui/cards/secondHandMiniTractorCards/secondHandMiniTractorCards';
import TractorsByBrands from '@/src/components/tractor/TractorsByBrands';
import { getHomeSecondHandTractors } from '@/src/services/tractor/home-second-hand-tractor';
import CustomerReviews from '@/src/components/shared/customer-reviews/CustomerReviews';
import CompareTractorsSection from '@/src/components/tractor/CompareTractorsSection';
import MainHeadings from '../tyreComponents/commonComponents/MainHeadings';
import TyresPriceList from '@/src/features/tyre/tyre-price/ListingMainSection';
import AllTractorsListingData from '@/src/features/tractors/listing/AllTractorsListingData';
import ListingSkeleton from '@/src/components/ui/listingSkeleton/listingSkeleton';
import { getSEOByPage } from '@/src/services/seo/get-page-seo';
import SeoHead from '@/src/components/shared/header/SeoHead';
import { getAllPriceList } from '@/src/services/tyre/all-price-list';
import { getTyreTopContent } from '@/src/services/tyre/top-content';
import { getNewTractorSectionPriceList } from '@/src/services/tractor/new-tractor-section-price-list';
import { getTractorPageConfig } from './tractorPageConfigs';
export const dynamic = 'force-dynamic'; // Ensure the page is always rendered dynamically
import '../../../app/tyreGlobals.css';
import { getBrandSecondHandTractors } from '@/src/services/second-hand-tractors/get-brand-second-hand-tractors';

/**
 * Generic Tractor Page Layout Component
 * @param {Object|string} config - Configuration object for the page OR page type string
 * @param {Object} params - Next.js params
 * @param {Object} searchParams - Next.js search params
 */
export default async function TractorPageLayout(config, { params, searchParams }) {
  try {
    // If config is a string, get the predefined configuration
    const pageConfig = typeof config === 'string' ? getTractorPageConfig(config) : config;

    const {
      sectionName = '',
      basePath,
      pageSlug,
      headingTitleKey = 'headerNavbar.tractors',
      faqTag = 'tractors',
      seoPageKey = 'tractors',
      listingConfig = {},
      customHeadingTitle = null,
      breadcrumbKey = null,
      brandName = '',
    } = pageConfig;

    const param = await params; // Get the params from the request
    const searchParamObj = await searchParams; // Get the search params from the request
    const currentLang = await getSelectedLanguage(); // Server-side language detection
    const translation = await getDictionary(currentLang);

    const isMobile = await isMobileView(); // Server-side mobile detection

    const resolvedPageSlug = pageSlug || `${currentLang == 'hi' ? 'hi/' : ''}tractors`;

    // Fetch tractor brands with error handling
    let tractorBrands = [];
    try {
      const brandsData = await getTractorBrands(currentLang);
      tractorBrands = brandsData.map(brand => ({
        ...brand,
        image: 'https://images.tractorgyan.com/uploads' + brand.image,
      }));
    } catch (error) {
      console.error('Error fetching tractor brands:', error);
      tractorBrands = [];
    }

    // Get heading title from translation using the provided key path or use custom title
    let headingTitle;
    if (customHeadingTitle) {
      headingTitle = customHeadingTitle;
    } else {
      headingTitle =
        headingTitleKey.split('.').reduce((obj, key) => obj?.[key], translation) || 'All Tractors';
    }

    // Get breadcrumb title (can be different from heading title)
    const breadcrumbTitle = breadcrumbKey
      ? breadcrumbKey.split('.').reduce((obj, key) => obj?.[key], translation) || headingTitle
      : headingTitle;

    // Determine the appropriate listing to show based on page configuration
    // const listingType = isTyrePage ? 'tyres' : 'tractors';    // Fetch videos, reels, and webstories with error handling
    let videos = [],
      reels = [],
      webstories = [];
    try {
      const [videosData, reelsData, webstoriesData] = await Promise.all([
        getTyreVideos(seoPageKey),
        getTyreReels(seoPageKey),
        getTyreWebstories(seoPageKey),
      ]);
      videos = videosData || [];
      reels = reelsData || [];
      webstories = webstoriesData || [];
    } catch (error) {
      console.error('Error fetching videos/reels/webstories:', error);
      videos = [];
      reels = [];
      webstories = [];
    }

    // Fetch SEO data with error handling
    let seoData = {};
    try {
      seoData = await getSEOByPage((currentLang == 'hi' ? 'hi/' : '') + seoPageKey);
    } catch (error) {
      console.error('Error fetching SEO data:', error);
      seoData = {};
    }

    let faqs = [];
    try {
      const faqResponse = await getTractorFAQs({
        faq_tag: seoPageKey,
        lang: currentLang,
      });
      if (faqResponse && faqResponse.success) {
        faqs = faqResponse.data || [];
      }
    } catch (error) {
      console.error('Failed to fetch FAQs:', error);
      faqs = [];
    }

    // Fetch price list with error handling
    let priceList = [];
    try {
      priceList = await getNewTractorSectionPriceList({
        section_name: sectionName,
        lang: currentLang,
      });
    } catch (error) {
      console.error('Error fetching price list:', error);
      priceList = [];
    }

    // Fetch top content with error handling
    let topContent = [];
    try {
      topContent = await getTyreTopContent({
        ad_title: seoPageKey,
        currentLang: currentLang,
        device_type: isMobile ? 'mobile' : 'desktop',
      });
    } catch (error) {
      console.error('Error fetching top content:', error);
      topContent = {};
    }

    // Default listing configuration
    const defaultListingConfig = {
      showBrandFilter: true,
      showSizeFilter: false,
      showTractorHPFilter: true,
      showTyreBrandsSection: false,
      brandName: '',
    };

    // Check if this is a tyre-related page and adjust configuration
    const isTyrePage = sectionName?.includes('tyre') || pageConfig?.basePath?.includes('tyre');
    if (isTyrePage) {
      defaultListingConfig.showTyreBrandsSection = true;
      defaultListingConfig.showSizeFilter = true;
      defaultListingConfig.showTractorHPFilter = false;
    }

    // Get pagination info from AllTractorsListingData with error handling
    let TractorListingComponent = null;
    let paginationInfo = { hasNextPage: false, currentPage: 1 };

    try {
      const listingData = await AllTractorsListingData({
        params: param,
        searchParams: searchParamObj,
        basePath,
        tractorBrands,
        ...defaultListingConfig,
        ...listingConfig,
        sectionName: sectionName || undefined,
        brandName,
      });
      TractorListingComponent = listingData.component;
      paginationInfo = listingData.paginationInfo;
    } catch (error) {
      console.error('Error fetching tractor listing data:', error);
      // Create a fallback component
      TractorListingComponent = () => (
        <div className="container py-8 text-center">
          <p>
            {translation?.errors?.unableToLoadTractors ||
              'Unable to load tractor listings at the moment. Please try again later.'}
          </p>
        </div>
      );
    }

    // Extract pagination data
    const { hasNextPage, currentPage } = paginationInfo;

    // Second hand tractors with error handling
    let secondHandTractors = [];
    try {
      secondHandTractors = await getBrandSecondHandTractors({
        brand_name: seoPageKey,
        start_limit: 0,
        end_limit: 4,
      });
    } catch (error) {
      console.error('Error fetching second hand tractors:', error);
      secondHandTractors = [];
    }

    return (
      <main>
        <SeoHead
          seo={seoData}
          staticMetadata={{}}
          paginationLinks={{
            canonical:
              currentPage > 1
                ? `${process.env.NEXT_PUBLIC_API_URL || 'https://tractorgyan.com'}${basePath}?page=${currentPage}`
                : `${process.env.NEXT_PUBLIC_API_URL || 'https://tractorgyan.com'}${basePath}`,
            prev:
              currentPage > 1
                ? `${process.env.NEXT_PUBLIC_API_URL || 'https://tractorgyan.com'}${basePath}?page=${currentPage - 1}`
                : null,
            next: hasNextPage
              ? `${process.env.NEXT_PUBLIC_API_URL || 'https://tractorgyan.com'}${basePath}?page=${currentPage + 1}`
              : null,
          }}
        />
        <NavComponents translation={translation} isMobile={isMobile} prefLang={currentLang} />

        <div className="lg:mt-[159px]">
          {
            <TyresPriceList
              showBanner={true}
              headingTitle={headingTitle}
              currentLang={currentLang}
              translation={translation}
              priceList={priceList || []}
              tyreTopContent={topContent || {}}
              brandName=""
              tableHeaders={[
                {
                  key: 'tractorModel',
                  width: 'w-[45%]',
                  dataKey: item => `${item.brand} ${item.model}`,
                },
                {
                  key: 'tractorHP',
                  width: 'w-[20%]',
                  dataKey: item => item.hp,
                },
                {
                  key: 'tractorPrice',
                  width: 'w-[35%]',
                  dataKey: item => item.price_range,
                },
              ]}
              breadcrumbs={[
                {
                  label: translation?.breadcrubm?.tractorGyanHome,
                  href: (currentLang == 'hi' ? '/hi' : '') + '/',
                  title: translation?.breadcrubm?.tractorGyanHome,
                },
                {
                  label: breadcrumbTitle,
                  title: breadcrumbTitle,
                  isCurrent: true,
                },
              ]}
              deviceType={isMobile ? 'mobile' : 'desktop'}
              productType="tractor"
            />
          }
        </div>
        {/* Tractor Listing Section with Two-Column Layout */}
        {/* <Suspense fallback={<ListingSkeleton />}> */}
        {TractorListingComponent ? (
          TractorListingComponent
        ) : (
          <div className="container py-8 text-center">
            <p>
              {translation?.errors?.unableToLoadTractors ||
                'Unable to load tractor listings at the moment. Please try again later.'}
            </p>
          </div>
        )}
        {/* </Suspense> */}

        {/* Compare Tractors Section with error boundary */}
        {/* <section className="bg-white">
          <div className="container">
            <MainHeadings text="Compare Tractors" />
            <div className="flex gap-4">
              <CompareTractorsSection cta="Compare Tractors" viewMode={true} itemsToShow={2} />
              {!isMobile && (
                <CompareTractorsSection cta="Compare Tractors" viewMode={true} itemsToShow={2} />
              )}
            </div>
          </div>
        </section> */}

        {/* Tractor Brands Section - only render if we have brands data */}
        {isMobile && tractorBrands && tractorBrands.length > 0 && (
          <TractorsByBrands
            translation={translation}
            langPrefix={currentLang}
            allTractorBrands={tractorBrands}
            bgColor="bg-section-gray"
            cta={translation.buttons.viewAllBrands || 'View All Brands'}
          />
        )}

        {/* Second Hand Tractors Section - only render if we have data */}
        {secondHandTractors && secondHandTractors.length > 0 && (
          <SecondHandMiniTractorCards
            bgColor="bg-white"
            heading={
              translation?.tractorPages?.popularSecondHandTractors || 'Popular Second Hand Tractors'
            }
            buttonText={
              (translation?.buttons?.viewAllSecondHandTractors).replace('{brandName}', brandName) ||
              'View All Second Hand Tractors'
            }
            buttonRedirectUrl={seoPageKey.includes('mini-tractors') ? `${currentLang == 'hi' ? 'hi/' : ''}second-hand-tractor/mini-tractor` : null}
            showEmi={false}
            translation={translation}
            isMobile={isMobile}
            data={secondHandTractors.slice(0, 4)}
          />
        )}

        {/* Customer Reviews Section - only render if we have reviews */}
        {/* {customerReviews && customerReviews.length > 0 && (
          <CustomerReviews
            reviews={customerReviews}
            isMobile={isMobile}
            itemsCount={isMobile ? 3 : 4}
          />
        )} */}

        {/* Updates Section - only render if we have content */}
        {(videos.length > 0 || reels.length > 0 || webstories.length > 0) && (
          <UpdatesSection
            bgColor={'bg-section-gray'}
            videos={videos}
            reels={reels}
            webstories={webstories}
            translation={translation}
            slug={seoPageKey}
            brandName={brandName}
            linkUrls={{
              videos: `${currentLang === 'hi' ? '/hi' : ''}/tractor-videos`,
              webstories: `${currentLang === 'hi' ? '/hi' : ''}/web-story-in-india`,
              reels: `${currentLang === 'hi' ? '/hi' : ''}/tractor-reels-and-shorts`,
            }}
            moduleType="tractor"
          />
        )}

        {/* FAQs Section - only render if we have FAQs */}
        {faqs && faqs.length > 0 && (
          <TractorFAQs
            faqs={faqs}
            translation={translation}
            headingKey={'tractorfaqs.brandTractors'}
            isDynamicTitle={true}
            brandName={brandName}
            bgColor="bg-white"
          />
        )}
        <JoinOurCommunityServer translation={translation} currentLang={currentLang} />
        <TractorGyanOfferings translation={translation} />
        <AboutTractorGyanServer
          slug={(currentLang == 'hi' ? 'hi/' : '') + seoPageKey}
          translation={translation}
        />
        <FooterComponents translation={translation} />
        <WhatsAppTopButton translation={translation} currentLang={currentLang} />
      </main>
    );
  } catch (error) {
    console.error('Critical error in TractorPageLayout:', error);

    // Return a minimal error fallback page
    return (
      <main className="container py-8">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">
            {translation?.errors?.somethingWentWrong || 'Something went wrong'}
          </h1>
          <p className="text-gray-600 mb-4">
            {translation?.errors?.technicalDifficulties ||
              "We're experiencing technical difficulties. Please try refreshing the page or come back later."}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="hover:bg-primary-dark rounded bg-primary px-6 py-2 text-white"
          >
            {translation?.buttons?.refreshPage || 'Refresh Page'}
          </button>
        </div>
      </main>
    );
  }
}
