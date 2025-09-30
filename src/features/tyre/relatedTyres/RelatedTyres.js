import TyreDetailsCard from '@/src/features/tyre/TyreDetailsCard';
import TyreModelSlider from '@/src/features/tyre/relatedTyres/TyreModelSlider';
import Image from 'next/image';
import Link from 'next/link';
import React, { useMemo } from 'react';

const RelatedTyres = ({
  tyreId,
  tyres,
  isMobile,
  tyreDetail,
  translation,
  currentLang,
  mode = 'tyre', // 'tyre', 'tractor', 'implement'
  customHeading, // New prop for custom heading
}) => {
  // Memoize item details based on mode
  const { detail, heading, linkType } = useMemo(() => {
    switch (mode) {
      case 'tractor':
        return {
          detail: tyreDetail,
          heading: customHeading || `${tyreDetail.brand} ${tyreDetail.model}`,
          linkType: 'tractor-loan',
        };
      case 'implement':
        return {
          detail: tyreDetail,
          heading:
            customHeading ||
            `${tyreDetail.brand_name || tyreDetail.brand || tyreDetail.brand_name_en} ${tyreDetail.model_name || tyreDetail.model}`,
          linkType: 'tractor-implement-loan',
        };
      default: // tyre
        return {
          detail: tyreDetail,
          heading: customHeading || `${tyreDetail.brand_name} ${tyreDetail.model_name}`,
          linkType: 'tractor-loan',
        };
    }
  }, [mode, tyreDetail, customHeading]);

  // Memoize banner images based on mode
  const bannerImages = useMemo(() => {
    switch (mode) {
      case 'implement':
        return {
          mobile: 'https://images.tractorgyan.com/uploads/121149/68d26eeaf0f8c-Implement-Loan-Banner-Mob-(1).webp',
          desktop: 'https://images.tractorgyan.com/uploads/121150/68d26f12ab7e8-Implement-Loan-Banner-(1).webp',
        };
      default:
        return {
          mobile: 'https://images.tractorgyan.com/uploads/120266/68874ee7518ab-Frame-1000006006.webp',
          desktop: 'https://images.tractorgyan.com/uploads/120244/6884911094708-Frame-1000005862.webp',
        };
    }
  }, [mode]);

  // Memoize loan URL
  const loanUrl = useMemo(() =>
    `https://tractorgyan.com/${currentLang === 'hi' ? 'hi/' : ''}${linkType}`,
    [currentLang, linkType]
  );

  // Memoize processed tyres data
  const processedTyres = useMemo(() =>
    tyres.map((tyre, index) => ({
      key: `${mode}-${tyre.id || index}-${tyre.model || tyre.title}`,
      reviews: tyre.reviews || tyre.review_count,
      rating: tyre.rating || tyre.avg_rating,
      size: tyre.tyre_size || tyre.hp || tyre.implement_power,
      type: tyre.tyre_type || tyre.cylinder,
      title: tyre.title || tyre.model,
      brandName: tyre.brandName || tyre.brand_name,
      imgUrl: tyre.imgUrl || tyre.images || tyre.image,
      pageUrl: (currentLang === 'hi' ? '/hi' : '') + (tyre.pageUrl || tyre.page_url),
      popularTyre: tyre.popularTyre || tyre.popular_tyre,
      isLast: index === tyres.length - 1,
      mode,
    })),
    [tyres, mode, currentLang]
  );

  // Early return if no tyres
  if (!tyres || tyres.length === 0) {
    return null;
  }

  // Memoize mobile tyre cards
  const mobileTyreCards = useMemo(() =>
    processedTyres.map((tyre) => (
      <TyreDetailsCard
        key={tyre.key}
        reviews={tyre.reviews}
        rating={tyre.rating}
        size={tyre.size}
        type={tyre.type}
        title={tyre.title}
        brandName={tyre.brandName}
        imgUrl={tyre.imgUrl}
        pageUrl={tyre.pageUrl}
        popularTyre={tyre.popularTyre}
        isLast={tyre.isLast}
        mode={tyre.mode}
        translation={translation}
      />
    )),
    [processedTyres, translation]
  );

  return (
    <section className="m-0 bg-section-gray">
      <div className="container">
        <div className="items-center gap-4 lg:flex">
          {tyres.length > 0 && (
            <div className="w-full lg:max-w-[calc(100%_-_254px)] xl:max-w-[1000px]">
              <div className="border-b-3 mb-7 inline-block border-secondary pb-1 text-xl font-semibold leading-7 md:text-2xl">
                <h2>{customHeading || `${translation?.tyreDetail?.related} ${heading}`}</h2>
              </div>
              <div className="model-slider mb-4 min-h-[280px] w-full gap-2 rounded-2xl border-[1px] border-gray-gainsboro bg-white p-3 md:mb-16 md:flex md:px-0">
                {!isMobile ? (
                  <TyreModelSlider
                    tyres={tyres}
                    currentLang={currentLang}
                    mode={mode}
                    translation={translation}
                  />
                ) : (
                  mobileTyreCards
                )}
              </div>
            </div>
          )}

          {/* Banner Section */}
          <div className="flex items-center overflow-hidden rounded-2xl lg:w-[259px] xl:block xl:h-[400px] xl:w-[calc(100%_-_1000px)]">
            {/* Mobile Banner */}
            <Link
              href={loanUrl}
              className="block h-full max-h-[220px] w-full overflow-hidden rounded-2xl lg:hidden"
              prefetch={false}
            >
              <Image
                src={bannerImages.mobile}
                height={220}
                width={400}
                alt="Tractor loan banner"
                title="Tractor Loan"
                className="h-full w-full object-contain object-center"
                loading="lazy"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
            </Link>

            {/* Desktop Banner */}
            <Link
              href={loanUrl}
              className="hidden h-full max-h-[526px] w-full max-w-[270px] overflow-hidden rounded-2xl lg:block"
              prefetch={false}
            >
              <Image
                src={bannerImages.desktop}
                height={526}
                width={270}
                alt="Tractor loan banner"
                title="Tractor Loan"
                className="h-full w-full object-contain object-center"
                loading="lazy"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(RelatedTyres);