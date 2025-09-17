import React from 'react';
import dynamic from 'next/dynamic';
import { getDictionary } from '@/src/lib/dictonaries';
import { isMobileView } from '@/src/utils';
import { getSelectedLanguage } from '@/src/services/locale';
import apiUrl from '@/src/services/apiUrl';
import { getSEOByPage } from '@/src/services/seo/get-page-seo';
import { getBrandVideos } from '@/src/services/social/TyreBrandVideos';
import SeoHead from '@/src/components/shared/header/SeoHead';
import ScrollToTopNavigate from '@/src/components/shared/ScrollToTop/ScrollToTopOnNavigation';

// Lazy/dynamic imports for chunk-splitting
// Keep server-rendering where possible (ssr: true) so server components remain server components
// For very heavy client-only components you can set ssr: false — do this only if that component is truly client-only.
const DesktopHeader = dynamic(() => import('@/src/components/shared/header/DesktopHeader'), { ssr: true });
const VideoListingData = dynamic(() => import('./VideoListingData'), { ssr: true });
const WhatsAppTopButton = dynamic(() => import('@/src/features/tyreComponents/commonComponents/WhatsAppTopButton'), { ssr: true });
const JoinOurCommunityServer = dynamic(() => import('@/src/components/shared/community/JoinOurCommunityServer'), { ssr: true });
const TractorGyanOfferings = dynamic(() => import('@/src/components/shared/offerings/TractorGyanOfferings'), { ssr: true });
const AboutTractorGyanServer = dynamic(() => import('@/src/components/shared/about/AboutTractorGyanServer'), { ssr: true });
const FooterServer = dynamic(() => import('@/src/components/shared/footer/FooterServer'), { ssr: true });
const MobileFooter = dynamic(() => import('@/src/components/shared/footer/MobileFooter'), { ssr: true });

// Constants outside component to avoid re-creating on each render
const PAGE_SLUG = 'tractor-videos';
const VIDEOS_PER_PAGE = 10;

// Helper to unwrap Promise.allSettled results with a fallback
function unwrapSettled(result, fallback = null) {
  if (!result) return fallback;
  if (result.status === 'fulfilled') return result.value;
  console.warn('Settled promise rejected:', result.reason);
  return fallback;
}

export default async function TractorVideosPage({ searchParams, porpsCurrentLang }) {
  // dev-time profiling (will be removed in prod or gated behind NODE_ENV)
  if (process.env.NODE_ENV !== 'production') console.time('TractorVideosPage:server-fetch');

  // Derived values
  const prefLang = porpsCurrentLang ? 'hi' : await getSelectedLanguage();
  const translation = await getDictionary(prefLang);
  const isMobile = await isMobileView();
  const page = Number.parseInt(searchParams?.page || '1', 10) || 1;
  const currentSlug = `${porpsCurrentLang ? 'hi/' : ''}${PAGE_SLUG}`;
  const baseUrl = `${apiUrl}${porpsCurrentLang ? '/hi' : ''}/${PAGE_SLUG}`;

  // Prepare fetch params
  const start = (page - 1) * VIDEOS_PER_PAGE;
  const end = page * VIDEOS_PER_PAGE;
  const payload = {
    video_type: 'videos',
    start_limit: start,
    end_limit: end,
  };

  // Run independent fetches concurrently and defensively handle failures.
  // Using Promise.allSettled avoids a single failure short-circuiting others.
  const [seoSettled, videosSettled] = await Promise.allSettled([
    (async () => await getSEOByPage(currentSlug))(),
    (async () => await getBrandVideos(payload))(),
  ]);

  const seoData = unwrapSettled(seoSettled, null);
  const brandVideosResponse = unwrapSettled(videosSettled, null);

  let brandVideoData = [];
  let hasNextPage = false;
  let storyError = false;

  if (brandVideosResponse && brandVideosResponse.data && Array.isArray(brandVideosResponse.data)) {
    brandVideoData = brandVideosResponse.data;
    hasNextPage = brandVideoData.length === VIDEOS_PER_PAGE;
  } else {
    storyError = true;
  }

  if (process.env.NODE_ENV !== 'production') console.timeEnd('TractorVideosPage:server-fetch');

  // SeoHead preload guidance: choose the highest-priority asset (first video thumbnail) for preload if available.
  const preloadUrls = [];
  if (brandVideoData[0] && brandVideoData[0].thumbnail_url) {
    preloadUrls.push(brandVideoData[0].thumbnail_url);
  }

  // Note on caching: backend is responsible for cache-control headers. If you need frontend caching in Next.js App Router,
  // you can use `fetch(..., { cache: 'force-cache' })` or `revalidate` options. Since backend handles caching, we avoid client-side cache here.
  // Example (commented):
  // const seoData = await getSEOByPage(currentSlug, { cache: 'force-cache' });

  return (
    <>
      <SeoHead
        seo={seoData}
        staticMetadata={{}}
        preloadUrls={preloadUrls}
        currentSlug={currentSlug}
        fullUrl={`${baseUrl}?page=${page}`}
        paginationLinks={{
          canonical: baseUrl,
          prev: page > 1 ? `${baseUrl}?page=${page - 1}` : null,
          next: hasNextPage ? `${baseUrl}?page=${page + 1}` : null,
        }}
      />

      {/* DesktopHeader is dynamically chunked for faster TTFB and smaller initial server bundle */}
      <DesktopHeader isMobile={isMobile} translation={translation} currentLang={prefLang} />

      <ScrollToTopNavigate />

      <main className="lg:mt-[155px]">
        <VideoListingData
          brandVideoData={brandVideoData}
          isMobile={isMobile}
          page={page}
          translation={translation}
          prefLang={prefLang}
          storyError={storyError}
        />

        {/* These components are chunked/dynamically imported above. They still render on server by default (ssr: true) */}
        <WhatsAppTopButton translation={translation} currentLang={prefLang} isMobile={isMobile} />
        <JoinOurCommunityServer translation={translation} currentLang={prefLang} />
        <TractorGyanOfferings translation={translation} currentLang={prefLang} />
        <AboutTractorGyanServer slug={PAGE_SLUG} translation={translation} />
      </main>

      <FooterServer translation={translation} />
      {isMobile && <MobileFooter translation={translation} />}
    </>
  );
}

// Performance notes (keep with the file but move to documentation):
// 1. Remove or defer third-party scripts (analytics, chat widgets) using next/script with strategy="afterInteractive" or "lazyOnload".
// 2. Ensure heavy images use next/image with width/height and priority only for above-the-fold assets.
// 3. Avoid large JSON payloads inlined into the HTML; paginate and fetch client-side for deeper pages if needed.
// 4. Use dynamic imports with ssr:true for large server components so they are split into smaller chunks and reduce initial server bundle.
// 5. For true client-only interactivity (like a heavy slider), use { ssr: false } in dynamic() so it doesn't run on server.
// 6. Prefetch links: set <Link prefetch={false}> on lists or when mapping many links to reduce router prefetch cost.
// 7. Run `next build && next export` and profile Lighthouse in production build. For local dev differences, remember to test production output.
// 8. bfcache: ensure pages don't block bfcache; avoid beforeunload handlers and keep unload listeners minimal.

// If you'd like, I can also provide a second pass that annotates which child components to convert to client components
// vs keep as server components (and show exact dynamic import change to ssr:false where appropriate) to push Lighthouse above 90 further.
