

import DesktopHeader from '@/src/components/shared/header/DesktopHeader'
import { getDictionary } from '@/src/lib/dictonaries';
import { getSelectedLanguage } from '@/src/services/locale';
import { isMobileView } from '@/src/utils';
import React from 'react'
import FooterComponents from '../tyre/FooterComponents';
import MobileFooter from '@/src/components/shared/footer/MobileFooter';
import SeoHead from '@/src/components/shared/header/SeoHead';
import { getSEOByPage } from '@/src/services/seo/get-page-seo';
import { getApiUrl } from '@/src/utils/utils';
import WhatsAppTopButton from '../tyreComponents/commonComponents/WhatsAppTopButton';
import { getTyreTopContent } from '@/src/services/tyre/top-content';
import TractorImplementBrands from '@/src/components/shared/tractor-implement-brands/TractorImplementBrands';
import { getTyreReels, getTyreVideos, getTyreWebstories } from '@/src/services/tyre/tyre-brand-webstore';
import UpdatesSection from '../tyreComponents/components/updatesAbouteTyre/UpdatesSection';
import TractorGyanOfferings from '@/src/components/shared/offerings/TractorGyanOfferings';
import TyreFAQs from '../tyre/tyreFAQs/TyreFAQs';
import { getUsedTractorFAQs } from '@/src/services/second-hand-tractors/used-tractor-faqs';
import JoinOurCommunityServer from '@/src/components/shared/community/JoinOurCommunityServer';
import AboutTractorGyanServer from '@/src/components/shared/about/AboutTractorGyanServer';
import ConstructionMachineryTopSection from '../construction-machinery/ConstructionMachineryTopSection';
import { getTractorBrands } from '@/src/services/tractor/all-tractor-brands-v2';
import { getTractorBrandBlogNews } from '@/src/services/tractor/get-tractor-brand-blog-news';
import NewsSection from '../tyre/tyreNews/NewsSection';
import PopularSection from '@/src/components/shared/popularSection/PopularSection';
import { getTractorPopularDetails } from '@/src/services/tractor/tractor-popular-details';

export default async function MahindraAndMahindraTractorsPage({ searchParams, isSeriesListing = false,
    seriesName = null,
    hpRange = null,
    hpTitle = null }) {
    const apiUrl = getApiUrl();

    const currentLang = await getSelectedLanguage(); // Server-side language detection
    const translation = await getDictionary(currentLang);
    const isMobile = await isMobileView();
    const seoSlug = currentLang === "en" ? `mahindra-and-mahindra-tractors-in-india` : `hi/mahindra-and-mahindra-tractors-in-india`;
    const seoData = await getSEOByPage(seoSlug);
    let faqs;
    let allTractorBrands;
    const pageSlug = 'mahindra-and-mahindra-tractors-in-india';
    const topContent = await getTyreTopContent({
        ad_title: pageSlug,
        currentLang: currentLang,
        device_type: isMobile ? 'mobile' : 'desktop',
    });

    const [videos, reels, webstories, allTractorBrandsRes] = await Promise.all([
        getTyreVideos('tractor-tyre-in-india'),
        getTyreReels('tractor-tyre-in-india'),
        getTyreWebstories('tractor-tyre-in-india'),
        getTractorBrands(currentLang)
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

    if (allTractorBrandsRes.length > 0) {
        console.log('----old allTractorBrandsRes', allTractorBrandsRes)
        allTractorBrands = allTractorBrandsRes || [];
    } else {
        console.error("❌ Tractor Brands Error:", allTractorBrandsRes.reason);
    }

    const allTractorListingBrands = allTractorBrands.map((brand) => ({
        title: brand.name,
        brand_name: brand.name,
        imgSrc: brand.image,
        url: brand.url,
    }));

    const brandName = currentLang === "hi" ? 'महिंद्रा' : 'Mahindra';

    let tractorBrands = await getTractorBrands(currentLang);
    tractorBrands = tractorBrands.map(brand => ({
        ...brand,
        image: 'https://images.tractorgyan.com/uploads' + brand.image,
    }));

    const brandByLang = brandName

    // Fetch tractor brand blog news (skip for HP range)
    const news = await getTractorBrandBlogNews({
        brand_name: 'Mahindra',
    });

    const popularData = await getTractorPopularDetails(currentLang);
    const popularTractorsError = false;

    return (
        <>
            <SeoHead
                seo={seoData}
                staticMetadata={{}}
                preloadUrls={[]}
                paginationLinks={{
                    canonical: `${apiUrl}${currentLang === 'hi' ? '/hi' : ''}/mahindra-and-mahindra-tractors-in-india`,
                }}
            />
            <DesktopHeader
                isMobile={isMobile}
                translation={translation}
                currentLang={currentLang}
            />
            <main>
                <ConstructionMachineryTopSection
                    showBanner={true}
                    isMobile={isMobile}
                    translation={translation}
                    currentLang={currentLang}
                    headingKey={'headings.allTractorTyres'}
                    topContent={topContent}
                    deviceType={isMobile ? 'mobile' : 'desktop'}
                    tyreTopContent={topContent}
                    heading={translation.headings.MahindraMahindraTractorsinIndia}
                    parent={"brand-leading"}
                    parentHeading={translation.footer.mahindra}
                />
                <TractorImplementBrands
                    bgColor={'bg-section-gray'}
                    heading={translation.headings.TractorByBrands}
                    allImplementBrands={allTractorListingBrands}
                    itemsShown={isMobile ? 9 : 12}
                    translation={translation}
                    prefLang={currentLang}
                    parent={"brand-leading"}
                />
                <PopularSection
                    popularData={popularData}
                    popularDataError={popularTractorsError}
                    translation={translation}
                    langPrefix={currentLang}
                    isMobile={isMobile}
                    redirectRoute={"/tractors"}
                />
                {news ? (
                    <NewsSection
                        title={translation.headerNavbar.tractorBlogsNewsBrand.replace(
                            '{brandName}',
                            isSeriesListing
                                ? brandName +
                                ' ' +
                                seriesName
                                    .replace(/-/g, ' ')
                                    .replace(/\b\w/g, l => l.toUpperCase())
                                    .replace('Tractors', '')
                                : brandName
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
                    slug={'tractor/Mahindra'}
                    brandName={
                        isSeriesListing
                            ? brandByLang +
                            ' ' +
                            seriesName
                                .replace(/-/g, ' ')
                                .replace(/\b\w/g, l => l.toUpperCase())
                                .replace('Tractors', '')
                            : brandByLang
                    }
                    linkUrls={{
                        videos: `${currentLang === 'hi' ? '/hi' : ''}/tractor-videos`,
                        webstories: `${currentLang === 'hi' ? '/hi' : ''}/web-story-in-india`,
                        reels: `${currentLang === 'hi' ? '/hi' : ''}/tractor-reels-and-shorts`,
                    }}
                    moduleType="tractor"
                />
                <TyreFAQs
                    faqs={faqs}
                    translation={translation}
                    headingKey={'faqs.usedTractorfaqs'}
                    bgColor={'bg-section-white'}
                />

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

