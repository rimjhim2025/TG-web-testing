import DroneDetailsCard from './DroneDetailsCard';
import DroneModelSlider from './DroneModelSlider';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const RelatedDrones = ({
  tyreId,
  tyres,
  isMobile,
  tyreDetail,
  translation,
  currentLang,
  mode = 'drone', // 'tyre', 'tractor', 'implement , 'drone'
  customHeading, // New prop for custom heading
}) => {
  // Get the appropriate detail object and heading based on mode
  const getItemDetail = () => {
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
            `${tyreDetail.brand_name || tyreDetail.brand} ${tyreDetail.model_name || tyreDetail.model}`,
          linkType: 'tractor-loan',
        };
      default: // tyre
        return {
          detail: tyreDetail,
          heading: customHeading || `${'Garuda Aerospace'} ${'Droni Drone'}`,
          linkType: 'tractor-loan',
        };
    }
  };

  const { detail, heading, linkType } = getItemDetail();

  return (
    <section className="m-0 bg-section-gray">
      <div className="container">
        <div className="items-center gap-4 lg:flex">
          <div className="w-full lg:max-w-[calc(100%_-_254px)] xl:max-w-[1000px]">
            <div className="border-b-3 mb-7 inline-block border-secondary pb-1 text-xl font-semibold leading-7 md:text-2xl">
              <h2>{customHeading || `${translation?.tyreDetail?.related} ${heading}`}</h2>
            </div>
            <div className="model-slider mb-4 min-h-[280px] w-full gap-2 rounded-2xl border-[1px] border-gray-gainsboro bg-white p-3 md:mb-16 md:flex md:px-0">
              {!isMobile ? (
                <DroneModelSlider tyres={tyres} currentLang={currentLang} mode={mode} />
              ) : (
                <>
                  {tyres?.map((tyre, index) => (
                    <DroneDetailsCard
                      key={index}
                      reviews={tyre.reviews || tyre.review_count}
                      rating={tyre.rating || tyre.avg_rating}
                      size={tyre.tyre_size || tyre.hp}
                      type={tyre.tyre_type || tyre.cylinder}
                      speed={'12 m/s'}
                      capacity={'3 acres per battery charge'}
                      // title={tyre.title}
                      title={`${'Droni Drone'}`}
                      brandName={`${'Garuda Aerospace'}`}
                      // brandName={tyre.brandName || tyre.brand_name}
                      imgUrl={tyre.imgUrl || tyre.images}
                      pageUrl={
                        (currentLang === 'hi' ? '/hi' : '') + (tyre.pageUrl || tyre.page_url)
                      }
                      popularTyre={tyre.popularTyre || tyre.popular_tyre}
                      isLast={index === tyres.length - 1}
                      mode={mode}
                    />
                  ))}
                </>
              )}
            </div>
          </div>
          <div className="flex items-center overflow-hidden rounded-2xl lg:w-[259px] xl:block xl:h-[400px] xl:w-[calc(100%_-_1000px)]">
            <Link
              href={`https://tractorgyan.com/${currentLang === 'hi' ? 'hi/' : ''}${linkType}`}
              className="block h-full max-h-[220px] w-full overflow-hidden rounded-2xl lg:hidden"
            >
              <Image
                src="https://images.tractorgyan.com/uploads/120266/68874ee7518ab-Frame-1000006006.webp"
                height={900}
                width={700}
                alt="add-img"
                title="Loan Image"
                className="h-full w-full object-contain object-center"
              />
            </Link>
            <Link
              href={`https://tractorgyan.com/${currentLang === 'hi' ? 'hi/' : ''}${linkType}`}
              className="hidden h-full max-h-[526px] w-full max-w-[270px] overflow-hidden rounded-2xl lg:block"
            >
              <Image
                src="https://images.tractorgyan.com/uploads/120244/6884911094708-Frame-1000005862.webp"
                height={5000}
                width={5000}
                alt="loan-img"
                title="Loan Image"
                className="h-full w-full object-contain object-center"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RelatedDrones;
