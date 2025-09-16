import React from 'react';
import { getSelectedLanguage } from '@/src/services/locale/index.js'; // For language
import { isMobileView } from '@/src/utils'; // For mobile detection
import { getDictionary } from '@/src/lib/dictonaries'; // For translations
import { getTyreBrands } from '@/src/services/tyre/tyre-brands';
import FooterComponents from '@/src/features/tyre/FooterComponents';
import AboutTractorGyanServer from '@/src/components/shared/about/AboutTractorGyanServer';
import TractorGyanOfferings from '@/src/components/shared/offerings/TractorGyanOfferings';
import JoinOurCommunityServer from '@/src/components/shared/community/JoinOurCommunityServer';
import WhatsAppTopButton from '@/src/features/tyreComponents/commonComponents/WhatsAppTopButton';
import SeoHead from '@/src/components/shared/header/SeoHead';
import { getSEOByPage } from '@/src/services/seo/get-page-seo';
import DroneListingData from './allTyreListing/tyresListing/DroneListingData';
import UpdatesData from '../tyreComponents/components/updatesAbouteTyre/UpdatesData';
import DesktopHeader from '@/src/components/shared/header/DesktopHeader';
import TyreFaqsData from '../tyre/tyreFAQs/TyreFaqsData';
import DronePriceInquireForm from './forms/InquireForm';
import DronePriceData from './drone-price/DronePriceData';
import Link from 'next/link';
import NewsSection from '../tyre/tyreNews/NewsSection';
import { getTyreNewsByBrand } from '@/src/services/tyre/tyre-news-by-brand';

export const dynamic = 'force-dynamic';

export default async function DroneByTypePage({ params, searchParams, droneType }) {
    const param = await params;
    const currentLang = await getSelectedLanguage();
    const translation = await getDictionary(currentLang);
    const isMobile = await isMobileView();
    const seoData = await getSEOByPage(`${currentLang === 'en' ? '' : `${currentLang}/`}tyres`);
    const news = await getTyreNewsByBrand('tyre-news,mrf,jk,apollo,ceat');

    console.log('Seo data for tyres page:', seoData);

    const tyreBrandsData = await getTyreBrands();

    // Get pagination info from DroneListingData
    const { component: TyreListingComponent, paginationInfo } = await DroneListingData({
        params,
        searchParams,
        basePath: '/tyres',
        tyreBrands: tyreBrandsData,
        showBrandFilter: true,
        showSizeFilter: true,
    });

    // Extract pagination data
    const { hasNextPage, currentPage } = paginationInfo;
    const toCapitalize = str => (str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : '');
    return (
        <main>
            <SeoHead
                seo={seoData}
                staticMetadata={{}}
                preloadUrls={[]}
                paginationLinks={{
                    canonical: `${process.env.NEXT_PUBLIC_API_URL || 'https://tractorgyan.com'}/tyres`,
                    prev:
                        currentPage > 1
                            ? `${process.env.NEXT_PUBLIC_API_URL || 'https://tractorgyan.com'}/tyres?page=${currentPage - 1}`
                            : null,
                    next: hasNextPage
                        ? `${process.env.NEXT_PUBLIC_API_URL || 'https://tractorgyan.com'}/tyres?page=${currentPage + 1}`
                        : null,
                }}
            />
            <DesktopHeader isMobile={isMobile} translation={translation} currentLang={currentLang} />{' '}
            <div className="lg:mt-[159px]">
                <DronePriceData
                    droneType={toCapitalize(droneType)}
                    tableHeaders={[
                        {
                            key: 'droneModel',
                            width: 'w-[60%]',
                            dataKey: item => (
                                <Link
                                    href={item.page_url || '#'}
                                    className="hover:text-primary-dark font-bold text-primary transition-colors duration-200"
                                    title={`${item.brand_name} ${item.modal_name}`}
                                >
                                    {`${item.brand_name} ${item.modal_name}`}
                                </Link>
                            ),
                        },
                        {
                            key: 'dronePrice',
                            width: 'w-[40%]',
                            dataKey: item => item.tyre_price,
                        },
                    ]}
                    breadcrumbs={[
                        {
                            label: translation.breadcrubm.home,
                            href: (currentLang == 'hi' ? '/hi' : '') + '/',
                            title: translation.breadcrubm.home,
                        },
                        {
                            label: translation.breadcrubm.drones,
                            href: (currentLang == 'hi' ? '/hi' : '') + '/drones-in-india',
                            title: translation.breadcrubm.drones,
                        },
                        {
                            label: `${toCapitalize(droneType) || ''} ${translation?.breadcrubm?.drones || ''}`,
                            title: `${toCapitalize(droneType) || ''} ${translation?.breadcrubm?.drones || ''}`,
                            isCurrent: true,
                        },
                    ]}
                />
                {TyreListingComponent}
                <DronePriceInquireForm
                    tyreBrands={tyreBrandsData}
                    heading={translation.headerNavbar.drones + ' ' + translation.headings.inquireforTyrePrice}
                    translation={translation}
                    currentLang={currentLang}
                    brandName={''}
                />
                <UpdatesData
                    slug="tyres"
                    linkUrls={{
                        videos: `${currentLang === 'hi' ? '/hi' : ''}/tractor-videos`,
                        webstories: `${currentLang === 'hi' ? '/hi' : ''}/web-story-in-india`,
                        reels: `${currentLang === 'hi' ? '/hi' : ''}/tractor-reels-and-shorts`,
                    }}
                />
                <NewsSection
                    translation={translation}
                    langPrefix={currentLang}
                    news={news}
                    bgColor={'bg-section-gray'}
                    title={translation.headings.tyreNews}
                />
                <TyreFaqsData pageSlug={'tractor-tyre-in-india'} headingKey={'tyrefaqs.tractorTyreHome'} />{' '}
                <WhatsAppTopButton
                    translation={translation}
                    currentLang={currentLang}
                    tyreBrands={tyreBrandsData}
                    defaultEnquiryType={'Tyre'}
                />
                <JoinOurCommunityServer translation={translation} currentLang={currentLang} />
                <TractorGyanOfferings translation={translation} />
                <AboutTractorGyanServer slug={'tyres'} translation={translation} />
            </div>
            <FooterComponents translation={translation} />
        </main>
    );
}
