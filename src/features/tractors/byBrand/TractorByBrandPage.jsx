import React from 'react';
import Link from 'next/link';
import { getSelectedLanguage } from '@/src/services/locale/index.js'; // For language
import { isMobileView } from '@/src/utils'; // For mobile detection
import { getDictionary } from '@/src/lib/dictonaries'; // For translations
import TyresPriceList from '@/src/features/tyre/tyre-price/ListingMainSection';

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
import { getTractorSeries } from '@/src/services/tractor/get-tractor-series';
import { getTractorWheelDrive } from '@/src/services/tractor/get-tractor-wheel-drive';
import { getBrandFromSlug } from '@/src/utils/tractor';
import Image from 'next/image';
import TyreDealersByStates from '@/src/features/tyre/TyreDealersByStates/TyreDealersByStates';
import NewsSection from '@/src/features/tyre/tyreNews/NewsSection';
import { getTractorBrandBlogNews } from '@/src/services/tractor/get-tractor-brand-blog-news';
import TractorSeriesSlider from '@/src/components/tractor/TractorSeriesSlider';
import TractorSeriesCard from '@/src/components/ui/cards/TractorSeriesCard';
import SecondHandMiniTractorCards from '@/src/components/ui/cards/secondHandMiniTractorCards/secondHandMiniTractorCards';
import TractorsByBrands from '@/src/components/tractor/TractorsByBrands';
import { getTractorBrandPriceList } from '@/src/services/tractor/get-tractor-brand-price-list';
import { getHpListingPriceList } from '@/src/services/tractor/hp-listing-price-list';
import { getTractorBrandTopContent } from '@/src/services/tractor/get-tractor-brand-top-content';
import TractorListingData from '@/src/features/tractors/listing/TractorListingData';
import { getSEOByPage } from '@/src/services/seo/get-page-seo';
import SeoHead from '@/src/components/shared/header/SeoHead';
import { getTractorBrandKeyHighlights } from '@/src/services/tractor/get-tractor-brand-key-highlights';
import { getBrandSecondHandTractors } from '@/src/services/second-hand-tractors/get-brand-second-hand-tractors';
import { getTractorBrandDealersByState } from '@/src/services/tractor/get-tractor-brand-dealers-by-state';
import { getTractorBrands } from '@/src/services/tractor/all-tractor-brands-v2';

export const dynamic = 'force-dynamic'; // Ensure the page is always rendered dynamically

export default async function TractorByBrandPage({
  params,
  searchParams,
  isSeriesListing = false,
  seriesName = null,
  hpRange = null, // New parameter for HP range
  hpTitle = null
}) {
  const param = await params; // Get the params from the request
  const searchParamObj = await searchParams; // Get the search params from the request
  const currentLang = await getSelectedLanguage(); // Server-side language detection
  const translation = await getDictionary(currentLang);

  const isMobile = await isMobileView(); // Server-side mobile detection

  const brandName = hpRange ? '' : param['brand-name'].split('-').join(' '); // Convert slug to brand name

  const pageSlug = hpRange
    ? `${currentLang == 'hi' ? 'hi/' : ''}${hpRange}`
    : isSeriesListing && seriesName
      ? `${currentLang == 'hi' ? 'hi/' : ''}tractor/${param['brand-name']}/${seriesName}`
      : `${currentLang == 'hi' ? 'hi/' : ''}tractor/${param['brand-name']}`; // Dynamic based on listing type

  let tractorBrands = await getTractorBrands(currentLang);
  tractorBrands = tractorBrands.map(brand => ({
    ...brand,
    image: 'https://images.tractorgyan.com/uploads' + brand.image,
  }));

  const brandByLang = hpRange
    ? { name: '', brand_name_en: '' } // For HP range, no specific brand
    : getBrandFromSlug(`${param['brand-name']}`, tractorBrands);

  // Fetch tractor brand blog news (skip for HP range)
  const news = await getTractorBrandBlogNews({
    brand_name: hpRange ? hpRange : param['brand-name'],
  });

  const headingTitle = hpRange
    ? hpRange.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) // Format HP range title
    : isSeriesListing && seriesName
      ? `${brandByLang.name} ${seriesName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} ${seriesName.includes('tractors') ? '' : translation.headerNavbar.tractors}`
      : brandByLang.name + ' ' + translation.headerNavbar.tractors;

  const category = 'Tractors';

  const [videos, reels, webstories] = await Promise.all([
    getTyreVideos(pageSlug),
    getTyreReels(pageSlug),
    getTyreWebstories(pageSlug),
  ]);

  const seoData = await getSEOByPage(pageSlug);

  let faqs = [];
  try {
    const faqResponse = await getTractorFAQs({
      faq_tag: pageSlug,
      lang: currentLang,
    });
    if (faqResponse && faqResponse.success) {
      faqs = faqResponse.data || [];
    }
  } catch (error) {
    console.error('Failed to fetch FAQs:', error);
    faqs = [];
  }

  // Fetch price list - use HP listing API for HP range pages
  let priceList

  if (isSeriesListing && (seriesName.includes("2wd") || seriesName.includes("4wd"))) {
    priceList = await getTractorBrandPriceList({
      brand_name: param['brand-name'],
      lang: currentLang,
      series_name: seriesName.includes("2wd") ? '2wd' : '4wd',
    });

  } else {
    priceList = hpRange
      ? await getHpListingPriceList(hpRange, currentLang)
      : await getTractorBrandPriceList({
        lang: currentLang,
        brand_name: brandName,
        ...(isSeriesListing && { series_name: seriesName }),
      });

  }

  let topContent
  if (isSeriesListing && (seriesName.includes("2wd") || seriesName.includes("4wd"))) {
    topContent = await getTractorBrandTopContent({
      page_type: 'wd_tractor_page',
      brand_en: param['brand-name'],
      lang: currentLang,
      wd_type: seriesName.includes("2wd") ? '2WD' : '4WD',
    });
  } else {
    topContent = await getTractorBrandTopContent({
      ad_title: hpRange
        ? hpRange
        : `tractor/${param['brand-name']}${isSeriesListing ? '/' + seriesName : ''}`, // Use the brand slug for the ad title
      currentLang: currentLang,
      ad_type_content_lang: currentLang == 'en' ? 'english' : 'hindi',
      device_type: isMobile ? 'mobile' : 'desktop',
      ...hpRange && { ad_type_content_lang: currentLang == 'en' ? 'english' : 'hindi' }
    });

  }


  const keyHighlights = hpRange
    ? []
    : await getTractorBrandKeyHighlights({
      brand_name: brandName,
      lang: currentLang,
    });

  // Fetch brand-specific second-hand tractors (skip for HP range)
  let secondHandTractors = [];
  if (!hpRange) {
    try {
      const secondHandData = await getBrandSecondHandTractors({
        brand_name: brandName,
        start_limit: 0,
        end_limit: 4,
        ...isSeriesListing && { series_name: seriesName },
      });
      if (secondHandData && secondHandData.success) {
        secondHandTractors = secondHandData.data || [];
      }
    } catch (error) {
      console.error('Failed to fetch second-hand tractors:', error);
      secondHandTractors = [];
    }
  }

  // Fetch tractor series data from API (skip for HP range)
  let tractorSeriesData;
  if (!hpRange) {
    try {
      tractorSeriesData = await getTractorSeries({
        brand_name: brandName,
      });
    } catch (error) {
      console.error('Failed to fetch tractor series:', error);
      tractorSeriesData = null;
    }
  }

  // Fetch tractor wheel drive data from API (skip for HP range)
  let wheelDriveData;
  if (!hpRange) {
    try {
      wheelDriveData = await getTractorWheelDrive({
        brand_name: brandName,
      });
    } catch (error) {
      console.error('Failed to fetch wheel drive data:', error);
      wheelDriveData = null;
    }
  }

  if (!hpRange) {
    param.brand = brandName;
  }
  // Get pagination info from TractorListingData
  const { component: TractorListingComponent, paginationInfo } = await TractorListingData({
    params: param,
    searchParams: searchParamObj,
    basePath: hpRange
      ? `${currentLang == 'hi' ? '/hi/' : '/'}${hpRange}`
      : `${currentLang == 'hi' ? '/hi' : ''}/tractor/${param['brand-name']}${isSeriesListing && seriesName ? `/${seriesName}` : ''}`,
    tractorBrands,
    showBrandFilter: hpRange ? true : false,
    showSizeFilter: false,
    showTractorHPFilter: !hpRange, // Don't show HP filter for HP range pages
    showTyreBrandsSection: false,
    brandName: isSeriesListing
      ? brandByLang.name +
      ' ' +
      seriesName
        .replace(/-/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase())
        .replace('Tractors', '')
      : hpRange ? hpTitle : brandByLang.name,
    isSeriesListing, // Pass series listing flag
    seriesName, // Pass series name
    hpRange, // Pass HP range for HP-wise listing
  });

  // Extract pagination data
  const { hasNextPage, currentPage } = paginationInfo;

  // Generate base URL for pagination
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://tractorgyan.com';
  const langPrefix = currentLang == 'hi' ? '/hi' : '';

  let pageUrl;
  if (hpRange) {
    // For HP range pages: /25-30-hp-tractors-in-india
    pageUrl = `${langPrefix}/${hpRange}`;
  } else if (isSeriesListing && seriesName) {
    // For series pages: /tractor/mahindra/arjun-novo-tractors
    pageUrl = `${langPrefix}/tractor/${param['brand-name']}/${seriesName}`;
  } else {
    // For brand pages: /tractor/mahindra
    pageUrl = `${langPrefix}/tractor/${param['brand-name']}`;
  }

  const canonicalUrl = currentPage > 1 ? `${baseUrl}${pageUrl}?page=${currentPage}` : `${baseUrl}${pageUrl}`;
  const prevUrl = currentPage > 1
    ? currentPage === 2
      ? `${baseUrl}${pageUrl}`
      : `${baseUrl}${pageUrl}?page=${currentPage - 1}`
    : null;
  const nextUrl = hasNextPage ? `${baseUrl}${pageUrl}?page=${currentPage + 1}` : null;

  let dealerStates = [];
  let stateImages = '';

  let storyError = false;

  try {
    const response = await getTractorBrandDealersByState({
      brand_name: brandName,
      lang: currentLang,
    });
    if (response && response.success) {
      // Transform the data to match TyreDealersByStates expected structure
      dealerStates =
        response.data?.map(state => ({
          state_name: state.state, // Changed from 'name' to 'state_name'
          page_url: state.page_url,
          images: state.icon, // Changed from 'image' to 'images'
        })) || [];

      stateImages = response.state_images || '';
    } else {
      storyError = true;
    }
  } catch (err) {
    console.error('❌ Failed to fetch brand dealer states:', err);
    storyError = true;
  }

  // Process tractor series data for the slider component
  const tractorSeries =
    tractorSeriesData?.data?.map(series => ({
      title: series.series,
      img: series.image,
      url: series.page_url || series.full_url,
    })) || [];

  // Helper function to format price with Indian currency formatting
  const formatIndianPrice = price => {
    const numPrice = parseInt(price);
    if (isNaN(numPrice)) return price;

    // Convert to Indian currency format with commas
    const formattedPrice = numPrice.toLocaleString('en-IN');
    return `₹${formattedPrice}`;
  };

  // Helper function to format price range
  const formatPriceRange = priceRange => {
    if (!priceRange || typeof priceRange !== 'string') return priceRange;

    // Split the price range by ' - ' or '-'
    const prices = priceRange.split(/\s*-\s*/);

    if (prices.length === 2) {
      const minPrice = formatIndianPrice(prices[0].trim());
      const maxPrice = formatIndianPrice(prices[1].trim());
      return `${minPrice} - ${maxPrice}`;
    }

    // If it's a single price, just format it
    return formatIndianPrice(priceRange);
  };

  const KeyHighlights = ({ keyHighlightsData, brandName }) => {
    // Return null if no data is available
    if (!keyHighlightsData || !keyHighlightsData.success) {
      return null;
    }

    const {
      most_expensive_tractor,
      'most_affordable _tractor': most_affordable_tractor,
      popular_tractor,
    } = keyHighlightsData;

    return (
      <section className="container bg-white">
        <div class="mt-6 rounded-xl p-0 md:bg-section-gray md:p-6">
          <h2 class="border-b-3 mb-6 inline-block border-secondary text-xl font-bold md:text-2xl">
            {translation.tractorDetails.keyHighlightsBrand.replace('{brandName}', brandName)}
          </h2>

          <div
            class="grid overflow-hidden rounded-xl border border-gray-light md:grid-cols-3"
            itemScope
            itemType="https://schema.org/Table"
          >
            <div class="shadow-sm flex flex-col space-y-2 bg-white p-4">
              <div class="flex items-center space-x-2">
                {/* TODO:: Update Image */}
                <Image
                  src={keyHighlightsData?.iconUrls?.popular_tractor}
                  height={32}
                  width={32}
                  title="Popular Icon"
                  alt="Popular Icon"
                  className="h-5 w-auto"
                />
                <h3 class="font-semibold">
                  {translation.tractorDetails.popularTractorsBrand.replace(
                    '{brandName}',
                    brandName
                  )}
                </h3>
              </div>
              <ul class="text-gray-700 space-y-1 text-sm">
                {popular_tractor &&
                  popular_tractor.slice(0, 3).map((tractor, index) => (
                    <li key={index}>
                      <a
                        href={(currentLang == 'hi' ? '/hi' : '') + tractor.page_url}
                        className="transition-colors hover:text-primary"
                        title={`${tractor.brand} ${tractor.model}`}
                      >
                        {tractor.brand} {tractor.model}
                      </a>
                    </li>
                  ))}
              </ul>
            </div>

            <div class="shadow-sm flex flex-col space-y-2 border-y border-gray-light bg-green-lighter p-4 md:border-x md:border-y-0">
              <div class="flex items-center space-x-2">
                <Image
                  src={keyHighlightsData?.iconUrls?.most_expensive_tractor}
                  height={32}
                  width={32}
                  title="Most Expensive Icon"
                  alt="Most Expensive Icon"
                  className="h-5 w-auto"
                />
                <h3 class="font-semibold">
                  {translation.tractorDetails.mostExpensiveTractorBrand.replace(
                    '{brandName}',
                    brandName
                  )}
                </h3>
              </div>
              {most_expensive_tractor ? (
                <p class="text-gray-700 text-sm">
                  <a
                    href={(currentLang == 'hi' ? '/hi' : '') + most_expensive_tractor.page_url}
                    className="transition-colors hover:text-primary"
                    title={`${most_expensive_tractor.brand} ${most_expensive_tractor.model}`}
                  >
                    {most_expensive_tractor.brand} {most_expensive_tractor.model}
                  </a>{' '}
                  <br />
                  <span class="font-medium">
                    {formatPriceRange(most_expensive_tractor.price_range)}
                  </span>
                </p>
              ) : (
                <p class="text-gray-700 text-sm">{translation.tractorDetails.noDataAvailable}</p>
              )}
            </div>

            <div class="shadow-sm flex flex-col space-y-2 bg-white p-4">
              <div class="flex items-center space-x-2">
                <Image
                  src={keyHighlightsData?.iconUrls?.most_affordable_tractor}
                  height={32}
                  width={32}
                  title="Most Affordable Icon"
                  alt="Most Affordable Icon"
                  className="h-5 w-auto"
                />
                <h3 class="font-semibold">
                  {translation.tractorDetails.mostAffordableTractorBrand.replace(
                    '{brandName}',
                    brandName
                  )}
                </h3>
              </div>
              {most_affordable_tractor ? (
                <p class="text-gray-700 text-sm">
                  <a
                    href={(currentLang == 'hi' ? '/hi' : '') + most_affordable_tractor.page_url}
                    className="transition-colors hover:text-primary"
                    title={`${most_affordable_tractor.brand} ${most_affordable_tractor.model}`}
                  >
                    {most_affordable_tractor.brand} {most_affordable_tractor.model}
                  </a>{' '}
                  <br />
                  <span class="font-medium">
                    {formatPriceRange(most_affordable_tractor.price_range)}
                  </span>
                </p>
              ) : (
                <p class="text-gray-700 text-sm">{translation.tractorDetails.noDataAvailable}</p>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  };
  return (
    <main>
      {/* Using main as the root layout element */}
      <SeoHead
        seo={seoData}
        staticMetadata={{}}
        paginationLinks={{
          canonical: canonicalUrl,
          prev: prevUrl,
          next: nextUrl,
        }}
      />
      <NavComponents translation={translation} isMobile={isMobile} prefLang={currentLang} />
      <div className="lg:mt-[159px]">
        <TyresPriceList
          showBanner={true}
          headingTitle={headingTitle}
          currentLang={currentLang}
          translation={translation}
          priceList={priceList}
          tyreTopContent={topContent}
          brandName={
            isSeriesListing
              ? brandByLang.name +
              ' ' +
              seriesName
                .replace(/-/g, ' ')
                .replace(/\b\w/g, l => l.toUpperCase())
                .replace('Tractors', '')
              : hpRange ? hpTitle : brandByLang.name
          }
          category={category}
          tableHeaders={[
            {
              key: 'tractorModel',
              width: 'w-[45%]',
              dataKey: item => (
                <Link
                  href={item.page_url || '#'}
                  className="hover:text-primary-dark font-bold text-primary transition-colors duration-200"
                  title={`${item.brand} ${item.model}`}
                >
                  {`${item.brand} ${item.model}`}
                </Link>
              ),
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
          breadcrumbs={
            hpRange ? [
              {
                label: translation.breadcrubm.tractorGyanHome,
                href: (currentLang == 'hi' ? '/hi' : '') + '/',
                title: translation.breadcrubm.tractorGyanHome,
              },
              {
                label: hpRange.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                href: (currentLang == 'hi' ? '/hi' : '') + `/tractor/${brandName}/${hpRange}`,
                title: hpRange.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                isCurrent: true,
              }
            ] :
              [
                {
                  label: translation.breadcrubm.tractorGyanHome,
                  href: (currentLang == 'hi' ? '/hi' : '') + '/',
                  title: translation.breadcrubm.tractorGyanHome,
                },
                {
                  label: translation.breadcrumbs.tractorBrands,
                  href: (currentLang == 'hi' ? '/hi' : '') + '/tractor-brands',
                  title: translation.breadcrumbs.tractorBrands,
                },
                {
                  label: `${brandByLang.name} ${translation.headerNavbar.tractors}`,
                  title: `${brandByLang.name} ${translation.headerNavbar.tractors}`,
                  ...(isSeriesListing ? {} : { isCurrent: true }),
                  ...(isSeriesListing
                    ? { href: (currentLang == 'hi' ? '/hi' : '') + `/tractor/${param['brand-name']}` }
                    : {}),
                },
                ...(isSeriesListing
                  ? [
                    {
                      label: `${brandByLang.name} ${seriesName?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} ${seriesName.includes('tractors') ? '' : translation.headerNavbar.tractors}`,
                      title: `${brandByLang.name} ${seriesName?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} ${seriesName.includes('tractors') ? '' : translation.headerNavbar.tractors}`,
                      isCurrent: true,
                    },
                  ]
                  : []),
              ]}
          deviceType={isMobile ? 'mobile' : 'desktop'}
          productType="tractor"
        />
      </div>
      {/* Tractor Listing Section with Two-Column Layout */}
      {TractorListingComponent}
      {!hpRange ? (
        <section className="mt-0 md:mt-10">
          <div className="container">
            <div className="flex flex-col gap-6 md:flex-row">
              <div className="mb-6 rounded-xl border-0 border-gray-light p-0 md:mb-0 md:w-3/5 md:border md:p-6">
                <h2 className="border-b-3 mb-4 inline-block border-secondary pb-1 text-xl font-semibold md:text-2xl">
                  {translation.tractorDetails.tractorSeriesInIndia.replace(
                    '{brandName}',
                    brandByLang.name
                  )}
                </h2>
                {/* Display tractor series from API */}
                {tractorSeries.length > 0 ? (
                  isMobile ? (
                    <div className='grid grid-cols-3 gap-4 w-full'>
                      {tractorSeries?.map((tractor, index) => (
                        <TractorSeriesCard
                          key={index}
                          title={tractor.title}
                          imgSrc={tractor.img}
                          href={(currentLang == 'hi' ? '/hi' : '') + tractor.url}
                        />
                      ))}
                    </div>
                  ) : (
                    <TractorSeriesSlider
                      tractors={tractorSeries}
                      isMobile={isMobile}
                      currentLang={currentLang}
                    />
                  )
                ) : (
                  <p className="text-gray-500">
                    {translation.tractorDetails.noTractorSeriesAvailable.replace(
                      '{brandName}',
                      brandByLang.name
                    )}
                  </p>
                )}
              </div>
              <div className="rounded-xl border-0 border-gray-light p-0 md:w-2/5 md:border md:p-6 md:pb-10">
                <h2 className="border-b-3 mb-4 inline-block border-secondary pb-1 text-xl font-semibold md:text-2xl">
                  {translation.tractorDetails.selectTractorByWheelDrive.replace(
                    '{brandName}',
                    brandByLang.name
                  )}
                </h2>
                <div className="flex justify-between gap-4">
                  {wheelDriveData?.data ? (
                    <>
                      <TractorSeriesCard
                        title={wheelDriveData.data['2wd_tractor'] || `${brandName} 2WD Tractors`}
                        imgSrc={
                          wheelDriveData.data['2wd_tractor_image']
                            ? `https://images.tractorgyan.com/uploads${wheelDriveData.data['2wd_tractor_image']}`
                            : '/default-tractor-image.webp'
                        }
                        href={
                          (currentLang == 'hi' ? '/hi' : '') + wheelDriveData.data['2wd_page_url']
                        }
                      />
                      <TractorSeriesCard
                        title={wheelDriveData.data['4wd_tractor'] || `${brandName} 4WD Tractors`}
                        imgSrc={
                          wheelDriveData.data['4wd_tractor_image']
                            ? `https://images.tractorgyan.com/uploads${wheelDriveData.data['4wd_tractor_image']}`
                            : '/default-tractor-image.webp'
                        }
                        href={
                          (currentLang == 'hi' ? '/hi' : '') + wheelDriveData.data['4wd_page_url']
                        }
                      />
                    </>
                  ) : (
                    <>
                      <TractorSeriesCard
                        title={`${brandName} 2WD Tractors`}
                        imgSrc="/default-tractor-image.webp"
                      />
                      <TractorSeriesCard
                        title={`${brandName} 4WD Tractors`}
                        imgSrc="/default-tractor-image.webp"
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}
      {(!hpRange && !isSeriesListing) ? (
        <div className="mt-10">
          <KeyHighlights
            keyHighlightsData={keyHighlights}
            brandName={
              isSeriesListing
                ? brandByLang.name +
                ' ' +
                seriesName
                  .replace(/-/g, ' ')
                  .replace(/\b\w/g, l => l.toUpperCase())
                  .replace('Tractors', '')
                : brandByLang.name
            }
          />
        </div>
      ) : null}
      {news ? (
        <NewsSection
          title={translation.headerNavbar.tractorBlogsNewsBrand.replace(
            '{brandName}',
            isSeriesListing
              ? brandByLang.name +
              ' ' +
              seriesName
                .replace(/-/g, ' ')
                .replace(/\b\w/g, l => l.toUpperCase())
                .replace('Tractors', '')
              : brandByLang.name
          )}
          translation={translation}
          langPrefix={currentLang}
          news={news?.data || []}
          showFilter={false}
          bgColor={'bg-section-white'}
        />
      ) : null}
      <UpdatesSection
        bgColor={'bg-section-gray'}
        videos={videos}
        reels={reels}
        webstories={webstories}
        translation={translation}
        slug={pageSlug}
        brandName={
          isSeriesListing
            ? brandByLang.name +
            ' ' +
            seriesName
              .replace(/-/g, ' ')
              .replace(/\b\w/g, l => l.toUpperCase())
              .replace('Tractors', '')
            : brandByLang.name
        }
        linkUrls={{
          videos: `${currentLang === 'hi' ? '/hi' : ''}/tractor-videos`,
          webstories: `${currentLang === 'hi' ? '/hi' : ''}/web-story-in-india`,
          reels: `${currentLang === 'hi' ? '/hi' : ''}/tractor-reels-and-shorts`,
        }}
        moduleType="tractor"
      />
      {(!hpRange && secondHandTractors.length > 0) ? (
        <SecondHandMiniTractorCards
          heading={translation.tractorDetails.buySecondHandTractor.replace(
            '{brandName}',
            isSeriesListing
              ? brandByLang.name +
              ' ' +
              seriesName
                .replace(/-/g, ' ')
                .replace(/\b\w/g, l => l.toUpperCase())
                .replace('Tractors', '')
              : brandByLang.name
          )}
          showEmi={false}
          isMobile={isMobile}
          buttonText={
            translation.secondHandTractors?.viewAllSecondHandTractors?.replace(
              '{brandName}',
              isSeriesListing
                ? brandByLang.name +
                ' ' +
                seriesName
                  .replace(/-/g, ' ')
                  .replace(/\b\w/g, l => l.toUpperCase())
                  .replace('Tractors', '')
                : brandByLang.name
            ) || `View All Second Hand ${brandByLang.name} Tractors`
          }
          data={secondHandTractors}
          translation={translation}
          currentLang={currentLang}
          buttonRedirectUrl={`${currentLang == 'hi' ? '/hi' : ''}/second-hand-tractors/${param['brand-name']}`}
        />
      ) : null}
      <TractorsByBrands
        translation={translation}
        langPrefix={currentLang}
        allTractorBrands={tractorBrands}
        cta={translation.buttons.viewAllBrands || 'View All Brands'}
      />
      {!hpRange ? (
        <TyreDealersByStates
          heading={translation.tractorDetails.tractorDealers.replace(
            '{brandName}',
            isSeriesListing
              ? brandByLang.name +
              ' ' +
              seriesName
                .replace(/-/g, ' ')
                .replace(/\b\w/g, l => l.toUpperCase())
                .replace('Tractors', '')
              : brandByLang.name
          )}
          translation={translation}
          dealerStates={dealerStates}
          prefLang={currentLang}
        />
      ) : null}
      <TractorFAQs
        faqs={faqs}
        translation={translation}
        headingKey={'tractorfaqs.brandTractors'}
        isDynamicTitle={true}
        brandName={hpRange ? hpTitle : brandName}
        bgColor="bg-white"
      />
      <JoinOurCommunityServer translation={translation} currentLang={currentLang} />
      <TractorGyanOfferings translation={translation} />
      <AboutTractorGyanServer slug={pageSlug} translation={translation} />
      <FooterComponents translation={translation} />
      <WhatsAppTopButton translation={translation} currentLang={currentLang} />
    </main>
  );
}
