import React from 'react';
import { getDictionary } from '@/src/lib/dictonaries';
import { isMobileView } from '@/src/utils';
import WhatsAppTopButton from '@/src/features/tyreComponents/commonComponents/WhatsAppTopButton';
import TractorGyanOfferings from '@/src/components/shared/offerings/TractorGyanOfferings';
import JoinOurCommunityServer from '@/src/components/shared/community/JoinOurCommunityServer';
import AboutTractorGyanServer from '@/src/components/shared/about/AboutTractorGyanServer';
import FooterServer from '@/src/components/shared/footer/FooterServer';
import MobileFooter from '@/src/components/shared/footer/MobileFooter';
import { getSelectedLanguage } from '@/src/services/locale';
import ScrollToTopOnNavigation from '@/src/components/shared/ScrollToTopOnNavigation/ScrollToTopOnNavigation';
import DesktopHeader from '@/src/components/shared/header/DesktopHeader';
import ReelsDetailSectionData from './ReelsDetailSectionData';
import { postVideoReelDetails } from '@/src/services/social/VideoReelDetail';
import { getDetailPageHeaderSEO } from '@/src/services/detailPageHeaderSeo';
import { getSocialMediaSubsCount } from '@/src/services/social/SubscriberCounts';
import SeoHead from '@/src/components/shared/header/SeoHead';

export default async function TractorReelShortsDetailPage({ params }) {
  const prefLang = await getSelectedLanguage();
  const translation = await getDictionary(prefLang);
  const isMobile = await isMobileView();

  const param = params?.slug;

  let reelDetailData = null;
  let seoDescription = null;
  let youtubeCount = null;

  let reelDetailError = false;
  let seoError = false;
  let youtubeError = false;

  // Use Promise.allSettled to fetch data in parallel
  try {
    const [reelDetailsResult, seoDataResult, youtubeCountResult] = await Promise.allSettled([
      // 1. Fetch reel detail
      postVideoReelDetails({
        video_url: param,
        video_type: 'reels',
      }),

      // 2. Fetch SEO data
      getDetailPageHeaderSEO({
        video_url: param,
        page_type: 'reel_detail',
        video_type: 'reels',
      }),

      // 3. Fetch YouTube subscriber count
      getSocialMediaSubsCount()
    ]);

    // Process reel details result
    if (reelDetailsResult.status === 'fulfilled') {
      reelDetailData = reelDetailsResult.value;
    } else {
      console.error('❌ Failed to fetch reel detail:', reelDetailsResult.reason);
      reelDetailError = true;
    }

    // Process SEO data result
    if (seoDataResult.status === 'fulfilled') {
      seoDescription = seoDataResult.value?.data || null;
    } else {
      console.error('⚠️ SEO fetch failed:', seoDataResult.reason);
      seoError = true;
    }

    // Process YouTube count result
    if (youtubeCountResult.status === 'fulfilled') {
      youtubeCount = youtubeCountResult.value?.youtube_count ?? null;
      if (!youtubeCount) youtubeError = true;
    } else {
      console.error('⚠️ YouTube count fetch failed:', youtubeCountResult.reason);
      youtubeError = true;
    }
  } catch (err) {
    console.error('Error in parallel data fetching:', err);
    reelDetailError = true;
    seoError = true;
    youtubeError = true;
  }

  return (
    <>
      <SeoHead
        seo={{}}
        staticMetadata={{}}
        preloadUrls={[]}
        seoHTMLDescription={seoDescription}
      />
      <DesktopHeader
        showLanguageSelector={false}
        isMobile={isMobile}
        translation={translation}
        currentLang={prefLang}
      />

      <ScrollToTopOnNavigation />

      <main className="lg:mt-[0px]">
        <ReelsDetailSectionData
          param={param}
          reelDetailData={reelDetailData}
          isMobile={isMobile}
          youtubeCount={youtubeCount}
          reelDetailError={reelDetailError}
          youtubeError={youtubeError}
          seoError={seoError}
        />
        <WhatsAppTopButton translation={translation} currentLang={prefLang} isMobile={isMobile} />
        <JoinOurCommunityServer translation={translation} currentLang={prefLang} />
        <TractorGyanOfferings translation={translation} />
        <AboutTractorGyanServer slug={'tractor-reels-and-shorts'} translation={translation} />
      </main>
      <FooterServer translation={translation} />
      {isMobile && <MobileFooter translation={translation} />}
    </>
  );
}