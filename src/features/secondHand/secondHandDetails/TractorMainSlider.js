'use client';
import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import Image from 'next/image';

import { useIsMobile } from '@/src/hooks/useIsMobile';

const TractorMainSlider = ({
  title,
  imgUrl,
  brandLogo,
  isPopular = false,
  isSoldOut = false,
  showThumbnails = false,
}) => {
  const isMobile = useIsMobile();
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  let sliderRef1 = useRef(null);
  let sliderRef2 = useRef(null);

  // Process imgUrl to handle both string and array formats
  const processImages = () => {
    if (!imgUrl) return [];

    if (Array.isArray(imgUrl)) {
      return imgUrl;
    }

    if (typeof imgUrl === 'string') {
      // Check if it's comma-separated
      if (imgUrl.includes(',')) {
        return imgUrl
          .split(',')
          .map(url => url.trim())
          .filter(url => url);
      }
      return [imgUrl];
    }

    return [];
  };

  const imageArray = processImages();
  const hasMultipleImages = imageArray.length > 1;

  useEffect(() => {
    if (sliderRef1.current && sliderRef2.current) {
      setNav1(sliderRef1.current);
      setNav2(sliderRef2.current);
    }
  }, []);

  const SoldOutStrip = () => {
    return (
      <div className="absolute bottom-0 z-10 flex w-full items-center justify-center gap-3 bg-[#D31A00] py-1">
        <Image
          src="https://img.icons8.com/emoji/48/000000/warning-emoji.png"
          height={50}
          width={50}
          alt={'brand-icon'}
          title={'brand-icon'}
          className="h-4 w-4"
          unoptimized // TODO:: Only for UI, remove later
        />
        <span className="text-medium text-sm text-white">Sold Out</span>
      </div>
    );
  };

  return (
    <>
      {isMobile ? (
        <div className="slider-container hello">
          {/* Main Slider for tyre detail mobile */}
          <div className="relative w-full">
            {isSoldOut && <SoldOutStrip />}
            <div className="flex w-full items-start justify-between">
              {brandLogo && (
                <Image
                  src={brandLogo}
                  height={100}
                  width={100}
                  className="w-full min-w-[44px] max-w-[44px]"
                  alt={'icon-' + title}
                  title={title}
                />
              )}
              {isPopular && (
                <span className="rounded-full border border-[#D31A00] px-3 py-1 text-xs text-[#D31A00] shadow-main">
                  Popular
                </span>
              )}
            </div>

            {/* Conditionally render slider or single image */}
            {hasMultipleImages ? (
              <Slider
                asNavFor={nav2}
                ref={sliderRef1}
                infinite={true}
                speed={500}
                slidesToShow={1}
                slidesToScroll={1}
                dots={!showThumbnails}
                autoplay={true}
                autoplaySpeed={2000}
              >
                {imageArray.map((image, index) => (
                  <Image
                    key={index}
                    src={
                      image.startsWith('http')
                        ? image
                        : `https://images.tractorgyan.com/uploads${image}`
                    }
                    height={500}
                    width={500}
                    alt={title || 'tractor image'}
                    title={title || 'tractor image'}
                    className="h-auto w-auto"
                  />
                ))}
              </Slider>
            ) : (
              // Single image without slider
              imageArray.length > 0 && (
                <Image
                  src={
                    imageArray[0].startsWith('http')
                      ? imageArray[0]
                      : `https://images.tractorgyan.com/uploads${imageArray[0]}`
                  }
                  height={500}
                  width={500}
                  alt={title || 'tractor image'}
                  title={title || 'tractor image'}
                  className="h-auto w-auto"
                />
              )
            )}
          </div>

          {/* Thumbnail Slider - only show if multiple images and showThumbnails is true */}
          {showThumbnails && hasMultipleImages && (
            <Slider
              asNavFor={nav1}
              ref={sliderRef2}
              slidesToShow={4}
              swipeToSlide={true}
              focusOnSelect={true}
              autoplaySpeed={3000}
              className="thumbnail-slider pt-5"
            >
              {imageArray.map((image, index) => (
                <div
                  key={index}
                  className="hover:shadow-lg mx-auto mt-4 h-[60px] w-full max-w-[90px] transform cursor-pointer overflow-hidden rounded-xl border-[1px] border-gray-secondary bg-white shadow-[0px_4px_37px_0px_#0f461021] transition-transform hover:scale-105 hover:border-green-main hover:bg-green-lighter"
                >
                  <Image
                    src={
                      image.startsWith('http')
                        ? image
                        : `https://images.tractorgyan.com/uploads${image}`
                    }
                    height={200}
                    width={200}
                    alt={title}
                    title={title}
                    className="h-full w-full object-contain"
                  />
                </div>
              ))}
            </Slider>
          )}
        </div>
      ) : (
        <div className="slider-container">
          {/* Main Slider for tyre detail page*/}
          <div className="relative max-h-[300px] w-full py-4">
            <div className="relative -top-4 flex w-full items-start justify-between">
              <div className="h-auto w-full min-w-[44px] max-w-[65px]">
                {brandLogo && (
                  <Image
                    src={brandLogo}
                    height={50}
                    width={50}
                    alt={'brand-icon'}
                    title={'brand-icon'}
                    className="h-full w-full"
                  />
                )}
              </div>
              {isPopular && (
                <span className="rounded-full border border-[#D31A00] px-3 py-1 text-xs text-[#D31A00] shadow-main">
                  Popular
                </span>
              )}
            </div>
            {isSoldOut && <SoldOutStrip />}

            {/* Conditionally render slider or single image */}
            {hasMultipleImages ? (
              <Slider
                asNavFor={nav2}
                ref={sliderRef1}
                dots={imageArray.length > 1}
                infinite={imageArray.length > 1}
                autoplay={imageArray.length > 1}
                speed={500}
                slidesToShow={1}
                slidesToScroll={1}
                autoplaySpeed={3000}
                focusOnSelect={true}
              >
                {imageArray.map((image, index) => (
                  <Image
                    key={index}
                    src={
                      image.startsWith('http')
                        ? image
                        : `https://images.tractorgyan.com/uploads${image}`
                    }
                    height={500}
                    width={500}
                    alt={title}
                    title={title}
                    className="mx-auto h-[240px] w-auto"
                  />
                ))}
              </Slider>
            ) : (
              // Single image without slider
              imageArray.length > 0 && (
                <div className="flex justify-center">
                  <Image
                    src={
                      imageArray[0].startsWith('http')
                        ? imageArray[0]
                        : `https://images.tractorgyan.com/uploads${imageArray[0]}`
                    }
                    height={500}
                    width={500}
                    alt={title}
                    title={title}
                    className="mx-auto h-[240px] w-auto"
                  />
                </div>
              )
            )}
          </div>

          {/* Thumbnail Slider - only show if multiple images */}
          {hasMultipleImages && (
            <Slider
              asNavFor={nav1}
              ref={sliderRef2}
              slidesToShow={4}
              swipeToSlide={true}
              focusOnSelect={true}
              autoplaySpeed={3000}
              className="pt-10"
            >
              {imageArray.map((image, index) => (
                <div key={index} className="w-full p-2">
                  <div className="mx-auto h-[60px] w-full max-w-[90px] transform cursor-pointer overflow-hidden rounded-xl border-[1px] border-gray-secondary bg-white transition-transform hover:scale-105 hover:border-green-main hover:bg-green-lighter hover:shadow-bottom">
                    <Image
                      src={
                        image.startsWith('http')
                          ? image
                          : `https://images.tractorgyan.com/uploads${image}`
                      }
                      height={200}
                      width={200}
                      alt={title}
                      title={title}
                      className="h-full w-full object-contain"
                    />
                  </div>
                </div>
              ))}
            </Slider>
          )}
        </div>
      )}
    </>
  );
};

export default TractorMainSlider;
