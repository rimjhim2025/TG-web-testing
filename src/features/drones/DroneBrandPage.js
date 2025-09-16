import React from 'react';
import { getSelectedLanguage } from '@/src/services/locale/index.js';
import { isMobileView } from '@/src/utils';
import { getDictionary } from '@/src/lib/dictonaries';
import { getTyreBrands } from '@/src/services/tyre/tyre-brands';
import NavComponents from '@/src/features/tyre/NavComponents';
import FooterComponents from '@/src/features/tyre/FooterComponents';
import SeoHead from '@/src/components/shared/header/SeoHead';
import { getSEOByPage } from '@/src/services/seo/get-page-seo';
import { getTyreTopContent } from '@/src/services/tyre/top-content';
import { getAllPriceList } from '@/src/services/tyre/all-price-list';
import JoinOurCommunityServer from '@/src/components/shared/community/JoinOurCommunityServer';
import TractorGyanOfferings from '@/src/components/shared/offerings/TractorGyanOfferings';
import AboutTractorGyanServer from '@/src/components/shared/about/AboutTractorGyanServer';
import WhatsAppTopButton from '../tyreComponents/commonComponents/WhatsAppTopButton';
import DroneListingData from './allTyreListing/tyresListing/DroneListingData';
import TyrePriceInquireForm from '../tyreComponents/components/forms/InquireForm';
import UpdatesData from '../tyreComponents/components/updatesAbouteTyre/UpdatesData';
import { getCurrentPageTyreBrand } from '@/src/utils/tyre';
import DronePriceList from './drone-price/DronePriceList';
import DesktopHeader from '@/src/components/shared/header/DesktopHeader';
import TyreFaqsData from '../tyre/tyreFAQs/TyreFaqsData';
import Link from 'next/link';
import DronePriceInquireForm from './forms/InquireForm';
import { getTyreNewsByBrand } from '@/src/services/tyre/tyre-news-by-brand';
import NewsSection from '../tyre/tyreNews/NewsSection';

export default async function DroneBrandPage({ params, searchParams }) {
  const param = await params;
  const searchParamsObj = await searchParams;
  const basePath = `/tyre/${param.brandSlug}`;

  // Extract page from searchParams
  const page = parseInt(searchParamsObj?.page) || 1;
  console.log("param________brand", param.brandSlug)
  const prefLang = await getSelectedLanguage();
  const translation = await getDictionary(prefLang);
  const isMobile = await isMobileView();
  const tyreBrands = await getTyreBrands();
  const droneBrand = param.brandSlug
  const brand = getCurrentPageTyreBrand(tyreBrands, 'tyre/mrf-tractor-tyre-in-india');
  // const brand = getCurrentPageTyreBrand(tyreBrands, 'tyre/' + param.brandSlug);
  const pageSlug = prefLang === 'en' ? brand.url : `${prefLang}/${brand.url}`;
  const seoData = await getSEOByPage(pageSlug);
  const news = await getTyreNewsByBrand('tyre-news,mrf,jk,apollo,ceat');


  const tyreTopContent = await getTyreTopContent({
    ad_title: brand.url,
    currentLang: prefLang,
    device_type: isMobile ? 'mobile' : 'desktop',
  });

  const priceList = await getAllPriceList({
    lang: prefLang,
    tyre_slug: brand.url,
  });
  param.brand = brand.name;

  // Get pagination info from DroneListingData
  const { component: TyreListingComponent, paginationInfo } = await DroneListingData({
    params: param,
    searchParams: searchParamsObj,
    basePath,
    tyreBrands,
    showBrandFilter: false,
    showSizeFilter: true,
    showDroneBrandsSection: true,
    brandName: prefLang === 'hi' ? brand?.name_hi : brand?.name,
  });
  // { console.log("showDroneBrandsSection______1", showDroneBrandsSection) }

  // Extract pagination data
  const { hasNextPage, currentPage } = paginationInfo;

  // Breadcrumbs for Tyre Brand Page (home/tractorTyres/brandName)
  const breadcrumbs = [
    {
      label: translation.breadcrubm.home,
      href: prefLang === 'hi' ? '/hi' : '/',
      title: translation.breadcrubm.home,
    },
    {
      label: translation.breadcrubm.droneBrands,
      href: (prefLang == 'hi' ? '/hi' : '') + '/drone-brands',
      title: translation.breadcrubm.droneBrands,
    },
    {
      label: droneBrand,
      title: droneBrand,
      isCurrent: true,
    },
  ];
  const droneBrands = [
    {
      name: "IoTech",
      href: "/drone/iotech",
      logo: "https://images.tractorgyan.com/uploads/drone-brand-logo/1739167310iotech-webp-logos.webp",
    },
    {
      name: "Garuda Aerospace",
      href: "/drone/garuda-aerospace",
      logo: "https://images.tractorgyan.com/uploads/drone-brand-logo/1739167426garuda-aerospace-webp-logos.webp",
    },
    {
      name: "Asteria Aerospace",
      href: "/drone/asteria-aerospace",
      logo: "https://images.tractorgyan.com/uploads/drone-brand-logo/1739167651asteria-aerospace-webp-logos.webp",
    },
    {
      name: "Dhaksha",
      href: "/drone/dhaksha",
      logo: "https://images.tractorgyan.com/uploads/drone-brand-logo/1739167827dhaksha-unmanned-systems-webp-logos.webp",
    },
    {
      name: "Thanos",
      href: "/drone/thanos",
      logo: "https://images.tractorgyan.com/uploads/drone-brand-logo/1739167918thanos-technologies-webp-logos.webp",
    },
    {
      name: "Paras Aerospace",
      href: "/drone/paras-aerospace",
      logo: "https://images.tractorgyan.com/uploads/drone-brand-logo/1739966611paras-aerospace-webp-logos.webp",
    },
    {
      name: "Enercomp",
      href: "/drone/enercomp",
      logo: "https://images.tractorgyan.com/uploads/drone-brand-logo/1739967103enercomp.webp",
    },
    {
      name: "Marut Drones",
      href: "/drone/marut-drones",
      logo: "https://images.tractorgyan.com/uploads/drone-brand-logo/1739967361marut-drones.webp",
    },
    {
      name: "Amber Wings",
      href: "/drone/amber-wings",
      logo: "https://images.tractorgyan.com/uploads/drone-brand-logo/1739967476amber-wings.webp",
    },
    {
      name: "Vyomastra",
      href: "/drone/vyomastra",
      logo: "https://images.tractorgyan.com/uploads/drone-brand-logo/1739967570vyomastra.webp",
    },
    {
      name: "Indrones",
      href: "/drone/indrones",
      logo: "https://images.tractorgyan.com/uploads/drone-brand-logo/1739967646indrones.webp",
    },
    {
      name: "Aero360",
      href: "/drone/aero360",
      logo: "https://images.tractorgyan.com/uploads/drone-brand-logo/1739967727aero360.webp",
    },
    {
      name: "AVPL",
      href: "/drone/avpl",
      logo: "https://images.tractorgyan.com/uploads/drone-brand-logo/1739967797avpl.webp",
    },
    {
      name: "Airbots Aerospace",
      href: "/drone/airbots-aerospace",
      logo: "https://images.tractorgyan.com/uploads/drone-brand-logo/1740383381airbot-aerospace-logo.png",
    },
    {
      name: "Aerosys Aviation",
      href: "/drone/aerosys-aviation",
      logo: "https://images.tractorgyan.com/uploads/drone-brand-logo/1740383556aerosys-aviation-india-private-limited.png",
    },
    {
      name: "Drone Destination",
      href: "/drone/drone-destination",
      logo: "https://images.tractorgyan.com/uploads/drone-brand-logo/1740385834drone-destination-logo.png",
    },
    {
      name: "Fuselage Innovation",
      href: "/drone/fuselage-innovation",
      logo: "https://images.tractorgyan.com/uploads/drone-brand-logo/1740386204fuselage-innovation-logo.png",
    },
  ];
  return (
    <>
      <SeoHead
        seo={seoData}
        staticMetadata={{}}
        preloadUrls={[]}
        paginationLinks={{
          canonical:
            currentPage > 1
              ? `${process.env.NEXT_PUBLIC_API_URL || 'https://tractorgyan.com'}/tyre/${param.brandSlug}?page=${currentPage}`
              : `${process.env.NEXT_PUBLIC_API_URL || 'https://tractorgyan.com'}/tyre/${param.brandSlug}`,
          prev:
            currentPage > 1
              ? `${process.env.NEXT_PUBLIC_API_URL || 'https://tractorgyan.com'}/tyre/${param.brandSlug}?page=${currentPage - 1}`
              : null,
          next: hasNextPage
            ? `${process.env.NEXT_PUBLIC_API_URL || 'https://tractorgyan.com'}/tyre/${param.brandSlug}?page=${currentPage + 1}`
            : null,
        }}
      />
      <DesktopHeader isMobile={isMobile} translation={translation} currentLang={prefLang} />{' '}
      <div className="lg:mt-[159px]">
        <DronePriceList
          // brandName={prefLang === 'hi' ? brand?.name_hi : brand?.name}
          brandName={droneBrand}
          tyreTopContent={tyreTopContent}
          deviceType={isMobile ? 'mobile' : 'desktop'}
          currentLang={prefLang}
          priceList={priceList}
          translation={translation}
          adTitleUrl={brand.url}
          headingTitle={translation.headings.allBrandDronesHeading.replace(
            '{brand}', droneBrand
            // prefLang === 'hi' ? brand?.name_hi : brand?.name || 'N/A'
          )}
          pageName={brand.name.replace(/\s+/g, '-').toLowerCase()}
          breadcrumbs={breadcrumbs}
          tableHeaders={[
            {
              key: 'droneModel',
              width: 'w-[60%]',
              dataKey: item => (
                <Link
                  href={item.page_url || '#'}
                  className="hover:text-primary-dark font-bold text-primary transition-colors duration-200"
                  title={`${item.brand_name} ${item.modal_name
                    }`}
                >
                  {`${item.brand_name} ${item.modal_name
                    }`}
                </Link>
              ),
            },
            {
              key: 'dronePrice',
              width: 'w-[40%]',
              dataKey: item => item.tyre_price,
            },
          ]}
        />
        {TyreListingComponent}
        <DronePriceInquireForm
          translation={translation}
          currentLang={prefLang}
          brandName={droneBrand}
          tyreBrands={tyreBrands}
          heading={'headings.inquireforTyrePrice'}
        />
        <NewsSection
          translation={translation}
          langPrefix={prefLang}
          news={news}
          bgColor={'bg-section-gray'}
          title={translation.headings.tyreNews}
        />
        <UpdatesData
          slug={brand.url}
          brandName={
            (prefLang === 'hi' ? brand?.name_hi : brand?.name) +
            ' ' +
            translation.tractorgyanOfferings.tractor +
            ' '
          }
          linkUrls={{
            videos: `${prefLang === 'hi' ? '/hi' : ''}/tractor-videos`,
            webstories: `${prefLang === 'hi' ? '/hi' : ''}/web-story-in-india`,
            reels: `${prefLang === 'hi' ? '/hi' : ''}/tractor-reels-and-shorts`,
          }}
        />


        <TyreFaqsData
          pageSlug={brand.url}
          brandName={prefLang === 'hi' ? brand?.name_hi : brand?.name}
          headingKey={'tyrefaqs.allBrandTractorTyres'}
        />        <WhatsAppTopButton
          translation={translation}
          currentLang={prefLang}
          tyreBrands={tyreBrands}
          defaultEnquiryType={'Tyre'}
        />
        <JoinOurCommunityServer translation={translation} currentLang={prefLang} />
        <TractorGyanOfferings translation={translation} />
        <AboutTractorGyanServer
          slug={`${prefLang == 'en' ? '' : 'hi/'}${brand.url}`}
          translation={translation}
        />
      </div>
      <FooterComponents translation={translation} />
    </>
  );
}
