import React, { Suspense } from 'react';
import { isMobileView } from '@/src/utils';
import { getDictionary } from '@/src/lib/dictonaries';
import { getSelectedLanguage } from '@/src/services/locale';
import DesktopHeader from '@/src/components/shared/header/DesktopHeader';
import ScrollToTopNavigate from '@/src/components/shared/ScrollToTop/ScrollToTopOnNavigation';
import nextDynamic from 'next/dynamic';
import WhatsAppTopButton from '@/src/features/tyreComponents/commonComponents/WhatsAppTopButton';
import CareerPerksBenifits from './CareerPerksBenifits';
import CareerJoinUs from './CareerJoinUs';
import CareerCoreValue from './CareerCoreValue';
import CareerStayUpdated from './CareerStayUpdated';
import SeoHead from '@/src/components/shared/header/SeoHead';
import { getSEOByPage } from '@/src/services/seo/get-page-seo';
import { getApiUrl } from '@/src/utils/utils';
import CareerSliderData from './CareerSliderData';
import CarouselSkeletonUI from '@/src/components/ui/listingSkeleton/CaroselSkeleton';
import CareerJobOpeneingsData from './CareerJobOpeneingsData';

// Optimized dynamic imports with proper loading states
const MobileFooter = nextDynamic(() => import('@/src/components/shared/footer/MobileFooter'), {
  ssr: true,
  loading: () => null,
});

const FooterServer = nextDynamic(() => import('@/src/components/shared/footer/FooterServer'), {
  ssr: true,
  loading: () => null,
});

export const dynamic = 'force-dynamic';

const CareerPage = async () => {
  // Fetch all data in parallel for better performance
  const [prefLang, translation, isMobile, seoData] = await Promise.all([
    getSelectedLanguage().catch(() => 'en'),
    getSelectedLanguage()
      .then(lang => getDictionary(lang))
      .catch(() => ({})),
    isMobileView().catch(() => false),
    getSEOByPage('career').catch(() => null),
  ]);

  const apiUrl = getApiUrl();
  const currentSlug = 'career';
  const baseUrl = `${apiUrl}/career`;

  return (
    <>
      <SeoHead
        seo={seoData}
        staticMetadata={{}}
        preloadUrls={[]}
        currentSlug={currentSlug}
        fullUrl={baseUrl}
        paginationLinks={{
          canonical: baseUrl,
        }}
      />

      {/* Above the fold content - prioritize loading */}
      <DesktopHeader
        isMobile={isMobile}
        translation={translation}
        currentLang={prefLang}
        showLanguageSelector={false}
      />

      <main className="lg:mt-[159px]">
        <ScrollToTopNavigate />

        <section className="pt-0">
          {/* Critical content first */}
          <Suspense fallback={<CarouselSkeletonUI />}>
            <CareerSliderData params="career" translation={translation} />
          </Suspense>

          <div className="container">
            <CareerPerksBenifits />
            <CareerJoinUs isMobile={isMobile} />
            <CareerCoreValue />
          </div>

          {/* Non-critical content with proper suspense boundaries */}
          <Suspense fallback={<CarouselSkeletonUI />}>
            <CareerJobOpeneingsData params="career" translation={translation} />
          </Suspense>

          <CareerStayUpdated isMobile={isMobile} />
        </section>

        {/* Keep WhatsAppTopButton as is since it's likely already a client component */}
        <WhatsAppTopButton
          translation={translation}
          currentLang={prefLang}
          tyreBrands={[]}
          defaultEnquiryType="Tractor"
          isMobile={isMobile}
        />
      </main>

      {/* Footer components */}
      <FooterServer translation={translation} />
      {isMobile && <MobileFooter translation={translation} />}
    </>
  );
};

export default CareerPage;