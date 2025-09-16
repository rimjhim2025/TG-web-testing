import React from 'react';
import { getSelectedLanguage } from '@/src/services/locale/index.js';
import { isMobileView } from '@/src/utils';
import { getDictionary } from '@/src/lib/dictonaries';
import { getTyreBrands } from '@/src/services/tyre/tyre-brands';
import FooterComponents from '@/src/features/tyre/FooterComponents';
import SeoHead from '@/src/components/shared/header/SeoHead';
import DroneDetailsAndFeatures from './droneDetailsSection/DroneDetailsAndFeatures';
import { getTyreDetail } from '@/src/services/tyre/tyre-detail';
import RelatedDrones from './relatedDrones/RelatedDrones';
import { getRelatedTyres } from '@/src/services/tyre/related-tyres';
import { getTyrePopularDetails } from '@/src/services/tyre/tyre-popular-details';
import WhatsAppTopButton from '../tyreComponents/commonComponents/WhatsAppTopButton';
import JoinOurCommunityServer from '@/src/components/shared/community/JoinOurCommunityServer';
import TractorGyanOfferings from '@/src/components/shared/offerings/TractorGyanOfferings';
import { getDetailPageHeaderSEO } from '@/src/services/detailPageHeaderSeo';
import DesktopHeader from '@/src/components/shared/header/DesktopHeader';
import DronePriceInquireForm from './forms/InquireForm';
import DroneRatingAndReviews from './droneRatingAndReviews/DroneRatingAndReviews';
import PopularDrones from './popularDrones/PopularDrones';
import DroneByBrands from './DroneByBrands';
import TyreFaqsData from '../tyre/tyreFAQs/TyreFaqsData';

export default async function DroneDetailPage({ params }) {
    const param = await params;
    const prefLang = await getSelectedLanguage();
    const translation = await getDictionary(prefLang);
    const isMobile = await isMobileView();
    const tyreId = '13';
    const brandSlug = 'mrf-shakti-3-rib-6-x-16';
    // const tyreId = param.id;
    // const brandSlug = param.brandSlug;
    const tyreBrands = await getTyreBrands();
    const popularTyres = await getTyrePopularDetails(prefLang);
    const tyreDetail = await getTyreDetail({ tyreId, lang: prefLang });
    const relatedTyres = await getRelatedTyres({ tyreId, lang: prefLang });
    const seoRes = await getDetailPageHeaderSEO({
        id: tyreId,
        page_type: 'tyre_detail',
        lang: prefLang,
        page_url: `tyre/${brandSlug}/${tyreId}`,
    });

    const seoHTMLDescription = seoRes?.data;
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
                seo={{
                    canonical: `${process.env.NEXT_PUBLIC_API_URL || 'https://tractorgyan.com'}${prefLang == 'en' ? '' : `/${prefLang}`}/tyre/${brandSlug}/${tyreId}`,
                }}
                staticMetadata={{}}
                preloadUrls={[]}
                seoHTMLDescription={seoHTMLDescription}
            />
            <DesktopHeader currentLang={prefLang} translation={translation} isMobile={isMobile} />
            <div className="lg:mt-[159px]">
                <DroneDetailsAndFeatures
                    translation={translation}
                    isMobile={isMobile}
                    tyreId={tyreId}
                    tyreDetail={tyreDetail}
                    prefLang={prefLang}
                    brandSlug={brandSlug}
                />
                {/* <RelatedDrones
                    tyreId={tyreId}
                    tyres={relatedTyres}
                    isMobile={isMobile}
                    tyreDetail={tyreDetail}
                    translation={translation}
                    currentLang={prefLang}
                /> */}
                <DronePriceInquireForm
                    tyreBrands={tyreBrands}
                    heading={'headings.inquireforTyrePrice'}
                    translation={translation}
                    currentLang={prefLang}
                    brandName={`${'Garuda Aerospace'} ${'Droni Drone'}`}
                // brandName={`${tyreDetail.brand_name} ${tyreDetail.model_name}`}
                />
                <DroneRatingAndReviews
                    reviewData={[]}
                    modelId={tyreDetail.id}
                    brand={tyreDetail.brand_name}
                    model={tyreDetail.model_name}
                    headingTitleKey={'headings.tyreRatingAndReviews'}
                    // dynamicTitle={`${tyreDetail.brand_name} ${tyreDetail.model_name}`}
                    dynamicTitle={`${'Garuda Aerospace'} ${'Droni Drone'}`}
                    translation={translation}
                    reviewTitleKey={'headings.tyreUserReview'}
                    showUserReviewTitle={isMobile}
                />
                <PopularDrones
                    langPrefix={prefLang}
                    popularTyres={popularTyres}
                    isMobile={isMobile}
                    translation={translation}
                    bgColor={'bg-section-gray'}
                />
                <DroneByBrands
                    heading='Drones By Brands'
                    allBrands={droneBrands}
                    itemsShown={isMobile ? 9 : 20}
                // currentLang={currentLang}
                />
                <TyreFaqsData headingKey={'tyrefaqs.allTractorTyres'} pageSlug={'tractor-tyre-in-india'} />

                <WhatsAppTopButton
                    translation={translation}
                    currentLang={prefLang}
                    tyreBrands={tyreBrands}
                    defaultEnquiryType={'Tyre'}
                />
                <JoinOurCommunityServer translation={translation} currentLang={prefLang} />
                <TractorGyanOfferings translation={translation} />
            </div>
            <FooterComponents translation={translation} />
        </>
    );
}
