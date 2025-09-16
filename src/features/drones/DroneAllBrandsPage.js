import React from 'react'
import DesktopHeader from '@/src/components/shared/header/DesktopHeader'
import { getDictionary } from '@/src/lib/dictonaries';
import { getSelectedLanguage } from '@/src/services/locale';
import { isMobileView } from '@/src/utils';
import FooterComponents from '../tyre/FooterComponents';
import MobileFooter from '@/src/components/shared/footer/MobileFooter';
import SeoHead from '@/src/components/shared/header/SeoHead';
import { getSEOByPage } from '@/src/services/seo/get-page-seo';
import { getApiUrl } from '@/src/utils/utils';
import WhatsAppTopButton from '../tyreComponents/commonComponents/WhatsAppTopButton';
import { getTyreTopContent } from '@/src/services/tyre/top-content';
import { getTyreReels, getTyreVideos, getTyreWebstories } from '@/src/services/tyre/tyre-brand-webstore';
import UpdatesSection from '../tyreComponents/components/updatesAbouteTyre/UpdatesSection';
import TractorGyanOfferings from '@/src/components/shared/offerings/TractorGyanOfferings';
import TyreFAQs from '../tyre/tyreFAQs/TyreFAQs';
import { getUsedTractorFAQs } from '@/src/services/second-hand-tractors/used-tractor-faqs';
import JoinOurCommunityServer from '@/src/components/shared/community/JoinOurCommunityServer';
import AboutTractorGyanServer from '@/src/components/shared/about/AboutTractorGyanServer';
import DroneTopSection from './DroneTopSection';
import DroneByBrands from './DroneByBrands';
import TittleAndCrumbs from '@/src/components/shared/TittleAndCrumbs/TittleAndCrumbs';
import DroneTypes from './DroneTypes';
import PopularDrones from './popularDrones/PopularDrones';
import { getTyrePopularDetails } from '@/src/services/tyre/tyre-popular-details';
import { getTyreNewsByBrand } from '@/src/services/tyre/tyre-news-by-brand';
import NewsSection from '../tyre/tyreNews/NewsSection';
import UpdatesData from '../tyreComponents/components/updatesAbouteTyre/UpdatesData';
import TyreFaqsData from '../tyre/tyreFAQs/TyreFaqsData';

export default async function DroneAllBrandsPage({ searchParams }) {
    const apiUrl = getApiUrl();
    const seoSlug = `drones-in-india`;
    const seoData = await getSEOByPage(seoSlug);
    const currentLang = await getSelectedLanguage(); // Server-side language detection
    const translation = await getDictionary(currentLang);
    const isMobile = await isMobileView();
    const popularTyres = await getTyrePopularDetails(currentLang);
    const news = await getTyreNewsByBrand('tyre-news,mrf,jk,apollo,ceat');

    let faqs;
    const pageSlug = 'tyres';
    const topContent = await getTyreTopContent({
        ad_title: pageSlug,
        currentLang: currentLang,
        device_type: isMobile ? 'mobile' : 'desktop',
    });

    const [videos, reels, webstories] = await Promise.all([
        getTyreVideos('tractor-tyre-in-india'),
        getTyreReels('tractor-tyre-in-india'),
        getTyreWebstories('tractor-tyre-in-india'),
    ]);
    try {

        faqs = await getUsedTractorFAQs({
            langPrefix: currentLang,
            slug: pageSlug,
        });
    } catch (error) {
        console.error('Error fetching data for FrontTyrePage:', error);
        return <div>Error loading page.</div>;
    }

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
                    canonical: `${apiUrl}/our-contacts`,
                }}
            />
            <DesktopHeader
                isMobile={isMobile}
                translation={translation}
                currentLang={currentLang}
            />
            <main className="lg:mt-36 pt-3 pb-0">
                <DroneByBrands bgColor={'bg-section-gray'}
                    heading='All Drone brands'
                    allBrands={droneBrands}
                    itemsShown={isMobile ? 9 : 20}
                    translation={translation}
                    currentLang={currentLang} mode="brand"
                    brandHeader={
                        <TittleAndCrumbs
                            title="Drone Brands in India"
                            breadcrumbs={[
                                {
                                    label: translation.breadcrubm.home,
                                    href: (currentLang == 'hi' ? '/hi' : '') + '/',
                                    title: translation.breadcrubm.home,
                                },
                                { label: translation.breadcrubm.droneBrands, title: translation.breadcrubm.droneBrands, isCurrent: true },
                            ]}
                        />
                    }
                />
                <section>
                    <div className='container'>
                        <DroneTypes translation={translation} />
                    </div>
                </section>
                <PopularDrones
                    langPrefix={currentLang}
                    popularTyres={popularTyres}
                    isMobile={isMobile}
                    translation={translation}
                    bgColor={'bg-section-gray'}
                />
                <NewsSection
                    translation={translation}
                    langPrefix={currentLang}
                    news={news}
                    bgColor={'bg-section-gray'}
                    title={translation.headings.droneNews}
                />

                <UpdatesData
                    slug="tractor-tyre-in-india"
                    linkUrls={{
                        videos: `${currentLang === 'hi' ? '/hi' : ''}/tractor-videos`,
                        webstories: `${currentLang === 'hi' ? '/hi' : ''}/web-story-in-india`,
                        reels: `${currentLang === 'hi' ? '/hi' : ''}/tractor-reels-and-shorts`,
                    }}
                />
                <TyreFaqsData pageSlug={'tractor-tyre-in-india'} headingKey={'tyrefaqs.tractorTyreHome'} />

                <WhatsAppTopButton translation={translation} currentLang={currentLang}
                    defaultEnquiryType={'Tyre'} />
                <JoinOurCommunityServer
                    translation={translation} currentLang={currentLang} />
                <TractorGyanOfferings translation={translation} />
                <AboutTractorGyanServer slug={pageSlug} translation={translation} />
            </main>
            <FooterComponents translation={translation} />
            {isMobile && <MobileFooter translation={translation} />}
        </>
    )
}

