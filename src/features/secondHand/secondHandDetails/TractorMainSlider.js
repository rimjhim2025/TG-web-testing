// ============ Used At ============
// 1. /tractor/massey-ferguson-241-r/965
// 2.
// =================================

'use client';
import { useIsMobile } from '@/src/hooks/useIsMobile';
import Image from 'next/image';
import React, { useState, useEffect, useRef, useMemo, useCallback, lazy, Suspense } from 'react';

// Lazy load react-slick to reduce initial bundle size
const Slider = lazy(() => import('react-slick'));

// Preload critical images
const PRELOADED_IMAGES = {
  warning: 'https://img.icons8.com/emoji/48/000000/warning-emoji.png',
  placeholder: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlRyYWN0b3IgSW1hZ2U8L3RleHQ+PC9zdmc+'
};

// Loading skeleton components
const SliderSkeleton = () => (
  <div className="max-h-[300px] w-full animate-pulse">
    <div className="flex h-[200px] items-center justify-center bg-gray-200 rounded-lg">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-green-600"></div>
    </div>
  </div>
);

const ThumbnailSkeleton = ({ count }) => (
  <div className="thumbnail-slider py-5">
    <div className="flex gap-2">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="h-[60px] w-[90px] animate-pulse rounded-xl bg-gray-200"
        />
      ))}
    </div>
  </div>
);

const TractorMainSlider = ({
  title,
  imgUrl,
  brandLogo,
  isPopular = false,
  isSoldOut = false,
  showThumbnails = false
}) => {
  const isMobile = useIsMobile();
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [loadedImages, setLoadedImages] = useState(new Set());
  const sliderRef1 = useRef(null);
  const sliderRef2 = useRef(null);

  // Memoize image URLs processing
  const imageUrls = useMemo(() => {
    if (!imgUrl) return [];

    return typeof imgUrl === 'string'
      ? imgUrl
        .split(',')
        .map(url => url.trim())
        .filter(url => url)
        .map(url =>
          url.startsWith('http') ? url : `https://images.tractorgyan.com/uploads${url}`
        )
      : [];
  }, [imgUrl]);

  // Memoize slider settings to prevent recreations
  const mainSliderSettings = useMemo(() => ({
    infinite: imageUrls.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: imageUrls.length > 1,
    autoplay: imageUrls.length > 1,
    autoplaySpeed: 2000,
    lazyLoad: 'progressive',
    className: "max-h-[260px]"
  }), [imageUrls.length]);

  const desktopMainSettings = useMemo(() => ({
    asNavFor: nav2,
    dots: !showThumbnails,
    arrows: false,
    infinite: imageUrls.length > 2,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 3000,
    focusOnSelect: true,
    lazyLoad: 'progressive'
  }), [nav2, showThumbnails, imageUrls.length]);

  const thumbnailSettings = useMemo(() => ({
    asNavFor: nav1,
    slidesToShow: Math.min(3, imageUrls.length),
    swipeToSlide: true,
    focusOnSelect: true,
    autoplaySpeed: 3000,
    className: "thumbnail-slider py-5",
    lazyLoad: 'progressive'
  }), [nav1, imageUrls.length]);

  useEffect(() => {
    if (sliderRef1.current && sliderRef2.current) {
      setNav1(sliderRef1.current);
      setNav2(sliderRef2.current);
    }
  }, []);

  // FIXED: Safe image preloading using window.Image
  useEffect(() => {
    if (imageUrls.length > 0 && typeof window !== 'undefined') {
      const preloadImage = (url) => {
        try {
          const img = new window.Image(); // Use window.Image to avoid conflict
          img.src = url;
          img.onload = () => {
            setLoadedImages(prev => new Set(prev).add(url));
          };
          img.onerror = () => {
            console.warn(`Failed to preload image: ${url}`);
          };
        } catch (error) {
          console.warn('Image preloading failed:', error);
        }
      };

      preloadImage(imageUrls[0]);
    }
  }, [imageUrls]);

  const handleImageLoad = useCallback((url) => {
    setLoadedImages(prev => new Set(prev).add(url));
  }, []);

  // Memoize SoldOutStrip component
  const SoldOutStrip = useMemo(() => {
    if (!isSoldOut) return null;

    return (
      <div className="absolute bottom-0 z-10 flex w-full items-center justify-center gap-3 bg-[#D31A00] py-1">
        <Image
          src={PRELOADED_IMAGES.warning}
          height={16}
          width={16}
          alt="sold out warning"
          title="sold out"
          className="h-4 w-4"
          loading="eager"
          priority
        />
        <span className="text-medium text-sm text-white">Sold Out</span>
      </div>
    );
  }, [isSoldOut]);

  // Memoize brand logo component
  const BrandLogo = useMemo(() => {
    if (!brandLogo) return null;

    return (
      <div className="h-auto w-full min-w-[44px] max-w-[65px]">
        <Image
          src={brandLogo}
          height={50}
          width={50}
          alt={`${title} brand logo`}
          title={`${title} brand`}
          className="h-full w-full"
          loading="eager"
          priority={!isMobile}
        />
      </div>
    );
  }, [brandLogo, title, isMobile]);

  // Memoize Popular badge
  const PopularBadge = useMemo(() => {
    if (!isPopular) return null;

    return (
      <span className="rounded-full border border-[#D31A00] px-3 py-1 text-xs text-[#D31A00] shadow-main">
        Popular
      </span>
    );
  }, [isPopular]);

  // Optimized Image component with proper sizing
  const SliderImage = useCallback(({ src, alt, title: imageTitle, className, isThumbnail = false, index = 0 }) => (
    <div className={`relative ${isThumbnail ? 'h-[60px]' : 'h-[200px]'}`}>
      <Image
        src={src}
        height={isThumbnail ? 60 : 300}
        width={isThumbnail ? 90 : 400}
        alt={alt}
        title={imageTitle}
        className={`object-contain ${className || ''}`}
        loading={index === 0 ? "eager" : "lazy"}
        priority={index === 0 && !isThumbnail}
        placeholder="blur"
        blurDataURL={PRELOADED_IMAGES.placeholder}
        onLoad={() => handleImageLoad(src)}
        sizes={isThumbnail ? "90px" : isMobile ? "100vw" : "400px"}
      />
      {!loadedImages.has(src) && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-green-600"></div>
        </div>
      )}
    </div>
  ), [loadedImages, handleImageLoad, isMobile]);

  // Mobile slider content
  const MobileSlider = useMemo(() => (
    <div className="slider-container">
      <div className="relative w-full">
        {SoldOutStrip}
        <div className="flex w-full items-start justify-between">
          {BrandLogo}
          {PopularBadge}
        </div>
        <Suspense fallback={<SliderSkeleton />}>
          <Slider {...mainSliderSettings} ref={sliderRef1}>
            {imageUrls.map((image, index) => (
              <SliderImage
                key={`mobile-${title}-${index}`}
                src={image}
                alt={`${title} image ${index + 1}`}
                title={`${title} image ${index + 1}`}
                className="h-auto w-auto"
                index={index}
              />
            ))}
          </Slider>
        </Suspense>
      </div>
    </div>
  ), [SoldOutStrip, BrandLogo, PopularBadge, mainSliderSettings, imageUrls, title]);

  // Desktop slider content
  const DesktopSlider = useMemo(() => (
    <div className="slider-container">
      <div className="relative flex w-full items-start justify-between">
        {BrandLogo}
        {PopularBadge}
      </div>

      <Suspense fallback={<SliderSkeleton />}>
        <Slider {...desktopMainSettings} ref={sliderRef1}>
          {imageUrls.map((image, index) => (
            <div key={`desktop-${title}-${index}`} className="relative max-h-[300px] w-full">
              <SliderImage
                src={image}
                alt={`${title} ${index + 1}`}
                title={`${title} ${index + 1}`}
                className="mx-auto"
                index={index}
              />
            </div>
          ))}
        </Slider>
      </Suspense>

      {/* Thumbnail Slider */}
      {imageUrls.length > 1 && showThumbnails && (
        <Suspense fallback={<ThumbnailSkeleton count={Math.min(3, imageUrls.length)} />}>
          <Slider {...thumbnailSettings} ref={sliderRef2}>
            {imageUrls.map((image, index) => (
              <div
                key={`thumb-${title}-${index}`}
                className="mx-auto mt-4 h-[60px] w-full max-w-[90px] transform cursor-pointer overflow-hidden rounded-xl border-[1px] border-gray-secondary bg-white shadow-[0px_4px_37px_0px_#0f461021] transition-transform hover:scale-105 hover:border-green-main hover:bg-green-lighter"
              >
                <SliderImage
                  src={image}
                  alt={`${title} thumbnail ${index + 1}`}
                  title={`${title} thumbnail ${index + 1}`}
                  isThumbnail={true}
                  index={index}
                />
              </div>
            ))}
          </Slider>
        </Suspense>
      )}
    </div>
  ), [BrandLogo, PopularBadge, desktopMainSettings, imageUrls, title, thumbnailSettings, showThumbnails]);

  // Early return for no images
  if (imageUrls.length === 0) {
    return (
      <div className="flex h-[200px] w-full items-center justify-center bg-gray-100 rounded-lg">
        <span className="text-gray-500">No images available</span>
      </div>
    );
  }

  return isMobile ? MobileSlider : DesktopSlider;
};

export default React.memo(TractorMainSlider);