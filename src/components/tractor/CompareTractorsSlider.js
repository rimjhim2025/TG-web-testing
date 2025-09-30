'use client';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import Image from 'next/image';
import CompareTractorsSection from './CompareTractorsSection';

const CompareTractorsSlider = ({
  cta,
  currentTractor,
  compareTractors,
  isMobile,
  currentLang,
  isComparisonPage = false,
  tractorBrands,
  viewMode = true,
  showCheckPrice = true,
  translation = {}
}) => {
  const [windowWidth, setWindowWidth] = useState(1200);

  // Handle window resize with debouncing
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Set initial width
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  // Memoize slides to show calculation
  const slidesToShow = useMemo(() => {
    if (windowWidth <= 480) return 1;
    return 2;
  }, [windowWidth]);

  // Memoize slider controls requirement
  const showControls = useMemo(() => {
    return compareTractors && compareTractors.length > slidesToShow;
  }, [compareTractors, slidesToShow]);

  // Memoized ArrowButton component
  const ArrowButton = useCallback(({ onClick, position, rotate = false, alt }) => {
    return (
      <button
        className={`absolute ${showControls ? 'bottom-[-1.5rem]' : 'bottom-0'} ${position} z-10 h-7 w-7 translate-x-1/2 transform cursor-pointer overflow-hidden rounded-full border-none bg-transparent focus:outline-none focus:ring-2 focus:ring-primary`}
        onClick={onClick}
        aria-label={alt}
        type="button"
      >
        <Image
          src="https://images.tractorgyan.com/uploads/113917/6699f70b8b797-carousleRightArrow.webp"
          alt={alt}
          title={alt}
          height={28}
          width={28}
          className={`h-full w-full object-contain ${rotate ? 'rotate-180' : ''}`}
          loading="lazy"
        />
      </button>
    );
  }, [showControls]);

  // Memoized arrow components
  const NextArrow = useCallback(({ onClick }) => (
    <ArrowButton
      onClick={onClick}
      position="right-[30%] md:right-[40%]"
      alt="Next slide"
    />
  ), [ArrowButton]);

  const PrevArrow = useCallback(({ onClick }) => (
    <ArrowButton
      onClick={onClick}
      position="left-[calc(30%_-_20px)] md:left-[calc(40%_-_16px)]"
      rotate={true}
      alt="Previous slide"
    />
  ), [ArrowButton]);

  // Memoize slider settings
  const settings = useMemo(() => ({
    dots: showControls,
    arrows: showControls,
    speed: 500,
    slidesToShow: isMobile ? 1 : 2,
    slidesToScroll: 1,
    infinite: false,
    autoplay: false,
    autoplaySpeed: 2000,
    nextArrow: showControls ? <NextArrow /> : undefined,
    prevArrow: showControls ? <PrevArrow /> : undefined,
    adaptiveHeight: true,
  }), [showControls, isMobile, NextArrow, PrevArrow]);

  // Memoize slider items
  const sliderItems = useMemo(() => {
    if (!compareTractors || compareTractors.length === 0) return null;

    return compareTractors.map((compareTractor, index) => {
      const key = isComparisonPage
        ? `compare-${compareTractor?.tractor1?.id}-${compareTractor?.tractor2?.id}-${index}`
        : `compare-${currentTractor?.id}-${compareTractor?.id}-${index}`;

      return (
        <div key={key} className="w-full flex gap-4 mb-4">
          <CompareTractorsSection
            cta={cta}
            viewMode={viewMode}
            showCheckPrice={showCheckPrice}
            itemsToShow={2}
            currentTractor={isComparisonPage ? compareTractor?.tractor1 : currentTractor}
            compareTractor={isComparisonPage ? compareTractor?.tractor2 : compareTractor || null}
            currentLang={currentLang}
            tractorbrands={tractorBrands}
            translation={translation}
          />
        </div>
      );
    });
  }, [
    compareTractors,
    isComparisonPage,
    currentTractor,
    cta,
    viewMode,
    showCheckPrice,
    currentLang,
    tractorBrands,
    translation
  ]);

  // Early return if no compare tractors
  if (!compareTractors || compareTractors.length === 0) {
    return (
      <div className="w-full text-center py-8">
        <p className="text-gray-500">
          {translation?.noTractorsToCompare || 'No tractors available for comparison'}
        </p>
      </div>
    );
  }

  return (
    <div className='relative w-full'>
      <Slider {...settings} className="custom-gap-slider compare-tractors-slider mb-4 md:mb-6">
        {sliderItems}
      </Slider>
    </div>
  );
};

export default React.memo(CompareTractorsSlider);