import BrandCards from '@/src/features/tyreComponents/components/tractorsByBrands/BrandCards';
import MainHeadings from '@/src/features/tyreComponents/commonComponents/MainHeadings';
import React, { useMemo } from 'react';
import MainButton from '@/src/features/tyreComponents/commonComponents/buttons/MainButton';
import TractorBrandToggle from './TractorBrandToggle';
import "@/src/features/tractors/models/globals.css"

const TractorsByBrands = ({
  heading,
  allTractorBrands,
  translation,
  langPrefix,
  cta,
  bgColor = 'bg-white',
  toggleView = false,
  isDealerPage = false
}) => {
  // Memoize safe brands data
  const safeTractorBrands = useMemo(() =>
    allTractorBrands || [],
    [allTractorBrands]
  );

  // Memoize heading text
  const headingText = useMemo(() =>
    heading || translation?.headings?.tractorsbyBrands || 'Tractors by Brands',
    [heading, translation]
  );

  // Memoize button text
  const buttonText = useMemo(() =>
    cta || translation?.buttons?.viewAllTractorbrands || 'View All Tractor Brands',
    [cta, translation]
  );

  // Memoize view all URL
  const viewAllUrl = useMemo(() =>
    `${langPrefix === 'en' ? '/' : `/${langPrefix}/`}tractor-brands`,
    [langPrefix]
  );

  // Memoize URL generator function
  const generateBrandUrl = useMemo(() => (brand) => {
    if (isDealerPage) {
      const brandSlug = brand.name?.toLowerCase().replace(/\s+/g, '-') || 'brand';
      return `${langPrefix === 'hi' ? '/hi' : ''}/tractor-dealers/${brandSlug}`;
    }
    return `${langPrefix === 'hi' ? '/hi' : ''}${brand.url || '#'}`;
  }, [isDealerPage, langPrefix]);

  // Memoize toggle view content
  const toggleViewContent = useMemo(() => {
    if (safeTractorBrands.length === 0) {
      return (
        <div className="py-8 text-center">
          <p className="text-gray-500">
            {translation?.noBrandsAvailable || 'No tractor brands available.'}
          </p>
        </div>
      );
    }

    return (
      <>
        <div id="tractor-brands-grid">
          <div className="tractor-brands-grid mb-4 grid grid-cols-3 gap-4 md:grid-cols-9 md:gap-8">
            {safeTractorBrands.map((item, index) => (
              <div
                key={`${item.name}-${item.id || index}`}
                className={index >= 9 ? 'tractor-brand-hidden' : ''}
              >
                <BrandCards
                  imgUrl={item.image}
                  name={item.name}
                  url={generateBrandUrl(item)}
                />
              </div>
            ))}
          </div>
        </div>

        {safeTractorBrands.length > 9 && (
          <div className="mb-4 flex justify-center">
            <TractorBrandToggle
              translation={translation}
              buttonText={cta || translation?.buttons?.viewAllBrands || 'View All Brands'}
            />
          </div>
        )}
      </>
    );
  }, [safeTractorBrands, generateBrandUrl, translation, cta]);

  // Memoize normal view content
  const normalViewContent = useMemo(() => {
    if (safeTractorBrands.length === 0) {
      return (
        <div className="py-8 text-center">
          <p className="text-gray-500">
            {translation?.noBrandsAvailable || 'No tractor brands available.'}
          </p>
        </div>
      );
    }

    const visibleBrands = safeTractorBrands.slice(0, 9);

    return (
      <>
        <div className="-mx-2 mb-4 flex flex-wrap justify-between md:-mx-4 md:mb-8 md:flex-nowrap">
          {visibleBrands.map((item, index) => (
            <div
              key={`${item.name}-${item.id || index}`}
              className="basis-1/3 px-2 md:basis-1/9 md:px-4"
            >
              <BrandCards
                imgUrl={item.image}
                name={item.name}
                url={generateBrandUrl(item)}
              />
            </div>
          ))}
        </div>
        <MainButton
          text={buttonText}
          linkUrl={viewAllUrl}
        />
      </>
    );
  }, [safeTractorBrands, generateBrandUrl, buttonText, viewAllUrl, translation]);

  return (
    <section className={bgColor}>
      <div className="container">
        <MainHeadings text={headingText} />

        {toggleView ? toggleViewContent : normalViewContent}
      </div>
    </section>
  );
};

export default React.memo(TractorsByBrands);