'use client';
import React, { useState, useCallback, useMemo, lazy, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import TractorMainSlider from '../secondHand/secondHandDetails/TractorMainSlider';
import TG_Button from '@/src/components/ui/buttons/MainButtons';
import Tooltip from '@/src/features/tyreComponents/commonComponents/Tooltip';
import SocialMediaLinksShare from '@/src/components/shared/social-media/SocialMediaShare';
import WhatsAppTopButton from '@/src/features/tyreComponents/commonComponents/WhatsAppTopButton';
import { tgi_arrow_right_white, tgi_star } from '@/src/utils/assets/icons';
import Image from 'next/image';

// Lazy load heavy components
const LazyTractorMainSlider = lazy(() => import('../secondHand/secondHandDetails/TractorMainSlider'));

const TractorDetailsCard = ({
  tractorId,
  tractorDetail,
  primaryBtnText,
  secondaryBtnText,
  translation,
  currentLang,
  isMobile,
}) => {
  const [showWhatsAppForm, setShowWhatsAppForm] = useState(false);
  const router = useRouter();

  // Memoize expensive calculations
  const tooltipContent = useMemo(() =>
    `${tractorDetail.brand} ${tractorDetail.model} ${translation?.tractorDetails?.tooltipContent?.priceRange || 'Price range is between Rs'} ${tractorDetail.price_range || 'NA'}*. ${tractorDetail.brand} ${tractorDetail.model} ${translation?.tractorDetails?.tooltipContent?.horsepower || 'horsepower is'} ${tractorDetail.hp} ${translation?.tractorSpecs?.hp || 'hp'}. ${translation?.tractorDetails?.tooltipContent?.fuelTank || 'Its Fuel tank capacity is'} ${tractorDetail.fuel_tank_capacity || 'NA'}. ${tractorDetail.brand} ${tractorDetail.model} ${translation?.tractorDetails?.tooltipContent?.hasCylinders || 'has'} ${tractorDetail.cylinder} ${translation?.tractorDetails?.tooltipContent?.cylinders || 'cylinders'}, ${tractorDetail.displacement_cc} ${translation?.tractorDetails?.tooltipContent?.engine || 'engine'}. ${translation?.tractorDetails?.tooltipContent?.otherSpecs || 'Other key specifications include'} ${tractorDetail.pto_hp || 'NA'} PTO ${translation?.tractorSpecs?.hp || 'hp'}, ${tractorDetail.lifting_capacity} ${translation?.tractorDetails?.tooltipContent?.liftingCap || 'lifting capacity'}, ${tractorDetail.number_of_gears} ${translation?.tractorDetails?.tooltipContent?.gears || 'gears'}.`,
    [tractorDetail, translation]
  );

  // Memoize rating calculation
  const { rating, starImage, rawRating, reviews } = useMemo(() => {
    const rawRating = tractorDetail.avg_review || 0;
    const reviews = tractorDetail.total_review || 0;

    const roundToNearestHalf = num => Math.round(num * 2) / 2;
    const rating = roundToNearestHalf(rawRating);

    const starImages = {
      1: 'https://images.tractorgyan.com/uploads/117230/6773d16b0a195-star-yellow-icon_small.webp',
      1.5: 'https://images.tractorgyan.com/uploads/117231/6773d16b2e82e-star-half-yellow-icon_small.webp',
      2: 'https://images.tractorgyan.com/uploads/117231/6773d16b2e82e-star-half-yellow-icon_small.webp',
      2.5: 'https://images.tractorgyan.com/uploads/117231/6773d16b2e82e-star-half-yellow-icon_small.webp',
      3: 'https://images.tractorgyan.com/uploads/117231/6773d16b2e82e-star-half-yellow-icon_small.webp',
      3.5: 'https://images.tractorgyan.com/uploads/117227/6773957dea631-filled-yellow-star.webp',
      4: 'https://images.tractorgyan.com/uploads/117227/6773957dea631-filled-yellow-star.webp',
      4.5: 'https://images.tractorgyan.com/uploads/117227/6773957dea631-filled-yellow-star.webp',
      5: 'https://images.tractorgyan.com/uploads/117227/6773957dea631-filled-yellow-star.webp',
    };

    return {
      rating,
      starImage: starImages[rating] || '',
      rawRating,
      reviews
    };
  }, [tractorDetail.avg_review, tractorDetail.total_review]);

  // Memoize product highlights
  const productHighlight = useMemo(() => [
    { label: translation?.tractorSpecs?.hp || 'HP', value: tractorDetail.hp || 'NA' },
    {
      label: translation?.tractorSpecs?.cylinders || 'Cylinder',
      value: tractorDetail.cylinder || 'NA',
    },
    {
      label: translation?.tractorSpecs?.coolingSystem || 'Cooling System',
      value: tractorDetail.cooling_system || 'NA',
    },
    {
      label: translation?.tractorSpecs?.wheelBase || 'Wheel Base',
      value: tractorDetail.wheel_base || 'NA',
    },
    {
      label: translation?.tractorSpecs?.liftingCapacity || 'Lifting Capacity',
      value: tractorDetail.lifting_capacity || 'NA',
    },
    {
      label: translation?.tractorDetails?.specCategories?.warranty || 'Warranty',
      value: tractorDetail.warrenty || 'NA',
    },
  ], [tractorDetail, translation]);

  // Memoize filtered highlights for mobile
  const mobileHighlights = useMemo(() =>
    productHighlight
      .filter(({ value }) => value && value !== 'NA')
      .slice(0, 3),
    [productHighlight]
  );

  const desktopHighlights = useMemo(() =>
    productHighlight.filter(({ value }) => value && value !== 'NA'),
    [productHighlight]
  );

  // Optimize event handlers
  const scrollToReviewSection = useCallback(() => {
    const reviewSection = document.getElementById('review-section');
    if (reviewSection) {
      reviewSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleWhatsAppClick = useCallback(() => {
    setShowWhatsAppForm(true);
  }, []);

  const handleCompareClick = useCallback(() => {
    router.push(`${currentLang == 'hi' ? '/hi' : ''}/compare-tractors`);
  }, [router, currentLang]);

  const handleCloseWhatsApp = useCallback(() => {
    setShowWhatsAppForm(false);
  }, []);

  // Memoize render functions
  const renderHighlightItem = useCallback((label, value) => (
    <div className="flex flex-col justify-center items-center bg-green-lighter shadow-card p-2 rounded-lg">
      <span className="font-normal text-gray-dark text-xs text-center">{label}</span>
      <span className="font-semibold text-black text-base text-center">{value}</span>
    </div>
  ), []);

  const renderRatingSection = useCallback(() => {
    if (rawRating <= 0) {
      return (
        <div className="font-medium text-gray-main text-xs">
          {translation?.tractorDetails?.noReviews || 'No reviews yet'}
        </div>
      );
    }

    return (
      <div
        className="flex justify-end md:justify-start items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
        onClick={scrollToReviewSection}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && scrollToReviewSection()}
      >
        <div className="font-medium text-gray-main text-xs">{rawRating}</div>
        <div className="min-w-[17px] max-w-[17px]">
          {starImage ? (
            <Image
              src={starImage}
              height={17}
              width={17}
              alt={`Rating: ${rawRating}`}
              title={`Rating: ${rawRating}`}
              className="w-4"
              loading="lazy"
              priority={false}
            />
          ) : (
            <Image
              src="https://images.tractorgyan.com/uploads/117228/677395f732537-filled-gray-star.webp"
              height={17}
              width={17}
              alt={`Rating: ${rawRating}`}
              title={`Rating: ${rawRating}`}
              className="w-4"
              loading="lazy"
              priority={false}
            />
          )}
        </div>
        <div className="font-medium text-gray-main text-xs">
          ({reviews} {translation?.tractorDetails?.reviews || 'reviews'})
        </div>
      </div>
    );
  }, [rawRating, reviews, starImage, translation, scrollToReviewSection]);

  const renderMobileReviewButton = useCallback(() => (
    <button
      className="md:hidden flex justify-center items-center gap-1.5 mt-2 px-3 py-1.5 border-[1px] border-gray-light rounded-full"
      onClick={scrollToReviewSection}
      type="button"
    >
      <span className="w-3">
        <Image
          src={tgi_star}
          height={20}
          width={20}
          alt="star-icon"
          title="star-icon"
          className="w-full"
          loading="lazy"
          priority={false}
        />
      </span>
      <span className="font-medium text-gray-dark text-xs md:text-sm text-nowrap">
        Review Tractor
      </span>
    </button>
  ), [scrollToReviewSection]);

  const renderHighlightsGrid = useCallback((highlights, isMobileView = false) => (
    <div
      className={`mb-6 mt-4 grid min-h-[62px] gap-2 md:gap-4 ${isMobileView
          ? 'grid-cols-3 bg-green-lighter shadow-card'
          : 'grid-cols-3'
        }`}
    >
      {highlights.map(({ label, value }, index) => (
        <div key={`${label}-${index}`} className="flex flex-col justify-center items-center bg-green-lighter shadow-card p-2 rounded-lg">
          <span className="font-normal text-gray-dark text-xs text-center">{label}</span>
          <span className="font-semibold text-black text-base text-center">{value}</span>
        </div>
      ))}
    </div>
  ), []);

  return (
    <div className="md:flex justify-around md:shadow-main md:p-4 rounded-2xl">
      {/* Image Slider Section */}
      <div className="relative px-0 md:px-4 pt-0 md:pt-3 w-full md:max-w-[350px] lg:max-w-[335px] xl:max-w-[350px] h-full md:max-h-[480px]">
        <Suspense fallback={<div className="bg-gray-200 rounded-lg h-64 animate-pulse" />}>
          <TractorMainSlider
            title={`${tractorDetail.brand} ${tractorDetail.model} image`}
            imgUrl={tractorDetail.images}
            brandLogo={tractorDetail.brand_logo || ''}
            showThumbnails={true}
            isPopular={tractorDetail?.popular_tractor === '1'}
          />
        </Suspense>
      </div>

      {/* Content Section */}
      <div className="shadow-main md:shadow-none mt-8 md:mt-2 p-4 md:p-2 rounded-2xl w-full md:max-w-[370px] lg:max-w-[335px] xl:max-w-[450px]">
        {/* Desktop Heading with Tooltip */}
        {!isMobile && (
          <Tooltip content={tooltipContent}>
            <h1 className="mb-4 font-bold text-black text-lg md:text-2xl cursor-pointer">
              {`${tractorDetail.brand} ${tractorDetail.model}`}
            </h1>
          </Tooltip>
        )}

        {/* Rating and Share Section */}
        <div className="flex md:flex-row flex-row-reverse justify-between items-start">
          <div>
            {renderRatingSection()}
            {renderMobileReviewButton()}
          </div>

          <div>
            <span className="md:hidden block text-sm">Share</span>
            <SocialMediaLinksShare
              title={translation?.tractorDetails?.shareTitle || 'Check out this tractor on TractorGyan!'}
              url={'https://tractorgyan.com' + tractorDetail.page_url}
            />
          </div>
        </div>

        {/* Product Highlights */}
        {isMobile
          ? renderHighlightsGrid(mobileHighlights, true)
          : renderHighlightsGrid(desktopHighlights)
        }

        {/* Action Buttons */}
        <div className="flex md:flex-col gap-2 md:gap-4 mt-6 w-full">
          <TG_Button
            className={`${secondaryBtnText ? 'w-1/2' : 'w-full'} md:w-full md:flex-1`}
            icon={tgi_arrow_right_white}
            iconPosition="right"
            onClick={handleWhatsAppClick}
            aria-label="Get tractor price"
          >
            ₹ {translation?.buttons?.checkPrice || 'Get Tractor Price'}
          </TG_Button>

          {secondaryBtnText && (
            <TG_Button
              className="md:flex-1 w-1/2 md:w-full"
              variant="outline"
              onClick={handleCompareClick}
              aria-label="Compare tractors"
            >
              {isMobile ? translation?.buttons?.compare || 'Compare Tractors' : secondaryBtnText}
            </TG_Button>
          )}
        </div>
      </div>

      {/* WhatsApp Form Modal */}
      {showWhatsAppForm && (
        <WhatsAppTopButton
          translation={translation}
          currentLang={currentLang}
          isMobile={isMobile}
          defaultEnquiryType="Tractor"
          openEnquiryForm={showWhatsAppForm}
          preFilledTractorBrand={tractorDetail.brand}
          preFilledTractorModelId={tractorDetail.id}
          onClose={handleCloseWhatsApp}
        />
      )}
    </div>
  );
};

export default React.memo(TractorDetailsCard);