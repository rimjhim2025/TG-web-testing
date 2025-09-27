'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import Image from 'next/image';

export default function CareerMainSlider({
  isMobile,
  desktopImages,
  mobileImages,
  imageListError,
}) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = useMemo(() => {
    const images = isMobile ? mobileImages : desktopImages;
    return Array.isArray(images) ? images : [];
  }, [isMobile, mobileImages, desktopImages]);

  const goToSlide = useCallback((index) => {
    setCurrentSlide(index);
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrentSlide(prev => prev === 0 ? slides.length - 1 : prev - 1);
  }, [slides.length]);

  const goToNext = useCallback(() => {
    setCurrentSlide(prev => prev === slides.length - 1 ? 0 : prev + 1);
  }, [slides.length]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(goToNext, 4000);
    return () => clearInterval(timer);
  }, [goToNext, slides.length]);

  useEffect(() => {
    setCurrentSlide(0);
  }, [slides]);

  if (imageListError) {
    return (
      <div className="flex items-center justify-center h-screen max-h-[170px] md:max-h-[500px]">
        <h1 className="text-lg text-gray-600">Failed to fetch career images, please try again later</h1>
      </div>
    );
  }

  if (!slides.length) {
    return (
      <div className="flex items-center justify-center h-screen max-h-[170px] md:max-h-[500px] bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Career with Tractorgyan</h1>
          <p className="text-gray-600">No images available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen max-h-[170px] w-full overflow-hidden md:max-h-[500px]">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={`${slide.image_url}-${index}`}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
        >
          <Image
            src={`https://images.tractorgyan.com/uploads${slide.image_url}`}
            alt={`Career Slide ${index + 1}`}
            title={slide.image_url}
            className="h-full w-full object-cover"
            width={1400}
            height={800}
            priority={index === 0} // Priority for first image
            loading={index === 0 ? "eager" : "lazy"}
          />
          <div className="absolute inset-0 bg-black bg-opacity-40" />
        </div>
      ))}

      {/* Gradient Overlay */}
      <div className="pointer-events-none absolute bottom-0 left-0 z-10 h-1/3 w-full bg-gradient-to-t from-black/70 to-transparent" />

      {/* Title */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="absolute bottom-6 text-center">
          <h1 className="mx-auto mb-8 max-w-4xl text-2xl font-bold leading-tight text-white transition-opacity duration-1000 lg:text-4xl">
            Career with Tractorgyan
          </h1>
        </div>
      </div>

      {/* Navigation Dots */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 transform items-center space-x-3">
          <button
            onClick={goToPrevious}
            className="rounded-full bg-white p-2 transition-all duration-300 hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
            aria-label="Previous slide"
          >
            <svg className="h-3 w-3 text-[#212121]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 w-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white ${index === currentSlide ? 'scale-125 bg-primary' : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentSlide}
            />
          ))}

          <button
            onClick={goToNext}
            className="rounded-full bg-white p-2 transition-all duration-300 hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
            aria-label="Next slide"
          >
            <svg className="h-3 w-3 text-[#212121]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}

      {/* Decorative Elements */}
      <div className="absolute left-0 top-0 z-10 h-64 w-64 opacity-20">
        <div className="bg-green-400 absolute left-0 top-0 h-2 w-full origin-top-left -rotate-45 transform" />
        <div className="bg-gray-300 absolute left-0 top-4 h-2 w-full origin-top-left -rotate-45 transform" />
        <div className="bg-green-300 absolute left-0 top-8 h-2 w-full origin-top-left -rotate-45 transform" />
      </div>

      <div className="bg-green-400 absolute bottom-16 right-8 z-10 h-32 w-32 rounded-full opacity-10" />
    </div>
  );
}