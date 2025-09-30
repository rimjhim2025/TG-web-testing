import MainButton from '@/src/features/tyreComponents/commonComponents/buttons/MainButton';
import MainHeadings from '@/src/features/tyreComponents/commonComponents/MainHeadings';
import PopularCard from './PopularCard';
import React, { useMemo } from 'react';

const PopularSection = ({
  bgColor,
  heading,
  cta,
  translation,
  isMobile,
  popularData,
  langPrefix,
  redirectRoute = '/tyres',
  popularDataError,
  type = 'tractor',
  showViewAll = true
}) => {
  // Memoize error state
  const errorMessage = useMemo(() =>
    translation?.error_messages?.popular_tractors_unavailable ||
    'Popular tractors are currently unavailable.',
    [translation]
  );

  // Memoize heading text
  const headingText = useMemo(() =>
    heading || translation?.headings?.popularTractor || 'Popular Tractors',
    [heading, translation]
  );

  // Memoize button text
  const buttonText = useMemo(() =>
    cta || translation?.buttons?.viewAllPopularTractor || 'View All Popular Tractors',
    [cta, translation]
  );

  // Memoize redirect URL
  const redirectUrl = useMemo(() =>
    `${langPrefix === 'hi' ? '/hi' : ''}${redirectRoute}`,
    [langPrefix, redirectRoute]
  );

  // Memoize desktop popular cards
  const desktopCards = useMemo(() => {
    if (!popularData || popularData.length === 0) return null;

    return popularData.slice(0, 4).map((item, index) => (
      <PopularCard
        key={`${item.id || item.model || index}-${index}`}
        isMobile={isMobile}
        langPrefix={langPrefix}
        brand={item.brand}
        model={item.model}
        cylinder={item.cylinder}
        lifting_capacity={item.lifting_capacity}
        imgUrl={item.full_image}
        linkUrl={item.tyre_url}
        hp={item.hp}
        pageUrl={item.page_url}
        popularData={popularData}
        translation={translation}
        type={type}
        power={item.power}
        width={item.width}
        warranty={item.warranty}
      />
    ));
  }, [popularData, isMobile, langPrefix, translation, type]);

  // Memoize mobile popular card
  const mobileCard = useMemo(() => {
    if (!popularData || popularData.length === 0) return null;

    return (
      <PopularCard
        translation={translation}
        popularData={popularData}
        isMobile={isMobile}
        langPrefix={langPrefix}
        type={type}
      />
    );
  }, [popularData, translation, isMobile, langPrefix, type]);

  // Early return for error state
  if (popularDataError) {
    return (
      <section className={bgColor || ''}>
        <div className="container">
          <div className="py-5 text-center">
            <p className="text-gray-600">{errorMessage}</p>
          </div>
        </div>
      </section>
    );
  }

  // Early return if no data
  if (!popularData || popularData.length === 0) {
    return (
      <section className={bgColor || ''}>
        <div className="container">
          <div className="py-5 text-center">
            <p className="text-gray-600">
              {translation?.error_messages?.no_data_available || 'No data available'}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={bgColor || ''}>
      <div className="container">
        <MainHeadings text={headingText} />

        {/* Desktop View */}
        {!isMobile ? (
          <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {desktopCards}
          </div>
        ) : (
          /* Mobile View */
          <div className="mb-6">
            {mobileCard}
          </div>
        )}

        {/* View All Button */}
        {showViewAll && (
          <div className="text-center">
            <MainButton
              text={buttonText}
              linkUrl={redirectUrl}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default React.memo(PopularSection);