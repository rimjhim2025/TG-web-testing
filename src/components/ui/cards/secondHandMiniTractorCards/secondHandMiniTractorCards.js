'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import TG_Button from '../../buttons/MainButtons';
import MainHeadings from '@/src/features/tyreComponents/commonComponents/MainHeadings';
import MainButton from '@/src/features/tyreComponents/commonComponents/buttons/MainButton';
import TG_LinkButton from '../../buttons/TgLinkButton';
import Slider from 'react-slick';
import { tgi_arrow_right_white } from '@/src/utils/assets/icons';

const SecondHandMiniTractorCards = ({
  langPrefix = '',
  data = [],
  isMobile = false,
  heading,
  buttonText,
  showEmi = true,
  bgColor = 'bg-white',
  translation,
  currentLang,
  buttonRedirectUrl
}) => {
  const [windowWidth, setWindowWidth] = useState(1920);
  const sliderRef = useRef(null);

  // Handle window resize with debouncing
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Set initial width only on client side
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

  // Memoize tractors data
  const tractors = useMemo(() => data || [], [data]);

  // Memoize slides to show calculation
  const slidesToShow = useMemo(() => {
    if (windowWidth <= 440) return 1.2;
    if (windowWidth <= 600) return 1.5;
    if (windowWidth <= 768) return 1.8;
    if (windowWidth <= 970) return 2.2;
    if (windowWidth <= 1150) return 3.1;
    if (windowWidth <= 1280) return 3.5;
    return 4;
  }, [windowWidth]);

  // Memoize total dots calculation
  const totalDots = useMemo(() => {
    const itemsLength = tractors.length;
    if (itemsLength > Math.ceil(slidesToShow)) {
      return Math.ceil(itemsLength - slidesToShow) + 1;
    }
    return 0;
  }, [tractors.length, slidesToShow]);

  // Memoize slider settings
  const settings = useMemo(() => ({
    dots: totalDots > 0,
    centerMode: true,
    className: "center",
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: totalDots > 0,
    centerPadding: "32px",
    infinite: false,
  }), [totalDots]);

  // Memoize tractor card component
  const TractorCard = useCallback((tractor, showEmi, buttonType = 'fill') => {
    // Transform API data to component format
    const tractorName = `${tractor.manufacture || tractor.manufacture_en || ''} ${tractor.model || ''}`.trim();
    const tractorImage = tractor.show_image
      ? `https://images.tractorgyan.com/uploads/${tractor.show_image}`
      : 'https://images.tractorgyan.com/uploads/120269/68876242d4937-buy-used-tractor.webp';
    const location = `${tractor.tahsil || ''}, ${tractor.state || ''}`.replace(/^, |, $/, '');
    const formattedPrice = tractor.price
      ? `₹ ${parseInt(tractor.price).toLocaleString('en-IN')}`
      : translation?.secondHandTractors?.priceOnRequest || 'Price on request';

    const tractorUrl = `${currentLang === 'hi' ? '/hi' : ''}${tractor.page_url}`;

    return (
      <Link href={tractorUrl} className="block h-full" prefetch={false}>
        <div className="boxShadow-main hover:shadow-xl hover:bg-green-lighter relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl bg-white shadow-bottom transition-all duration-300 hover:scale-[1.02]">
          {/* For Sale Badge */}
          <div className="absolute left-0 top-5 w-[200px]">
            <div className="shadow-md absolute -left-12 -top-1 z-10 h-[43px] w-[180px] rotate-[-45deg] bg-gradient-to-r from-[#015401] via-[#46AA48] to-[#015401] py-3 text-center text-sm font-bold text-white">
              {translation?.secondHandTractors?.forSell || 'For Sale'}
            </div>
          </div>

          <div className="mb-4 flex h-full flex-col justify-between">
            {/* Tractor Image */}
            <div className="relative h-52 w-full">
              <Image
                src={tractorImage}
                alt={tractorName}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                loading="lazy"
              />
            </div>

            {/* Location */}
            <div className="px-3 pt-2">
              <div className="flex items-center gap-1 text-[14px] font-medium text-[#4CAF50]">
                <Image
                  src="https://images.tractorgyan.com/uploads/120270/688762588d9aa-blue-location-icon.webp"
                  height={16}
                  width={16}
                  alt="location icon"
                  title="location"
                  className="-ml-1 h-4 w-4 object-contain"
                />
                <span className="text-gray-dark">{location || translation?.secondHandTractors?.locationNotSpecified || 'Location not specified'}</span>
              </div>
            </div>

            {/* Tractor Name */}
            <span className="font-roboto mb-1 line-clamp-2 min-h-[50px] px-3 pt-2 text-[18px] font-bold text-black">
              {tractorName || translation?.secondHandTractors?.unnamedTractor || 'Unnamed Tractor'}
            </span>

            {/* Year and Price */}
            <div className="mx-auto flex w-full justify-between pb-2 text-center text-[#182C3D] md:py-2">
              <div className="flex w-[50%] flex-col items-center gap-[2px] px-4">
                <div className="text-xs text-[#595959]">
                  {translation?.secondHandTractors?.year || 'Year'}
                </div>
                <div className="text-md font-semibold">
                  {tractor.year_of_purchase || translation?.secondHandTractors?.na || 'NA'}
                </div>
              </div>
              <div className="flex w-[50%] flex-col items-center gap-[2px] border-l border-[#46AA48] px-4">
                <div className="text-xs text-[#595959]">
                  {translation?.secondHandTractors?.price || 'Price'}
                </div>
                <div className="text-md font-semibold">{formattedPrice}</div>
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-2 flex w-full justify-end px-3">
              {buttonType === 'FILL' ? (
                <div onClick={(e) => e.preventDefault()} className="w-full">
                  <TG_LinkButton
                    href={tractorUrl}
                    icon={tgi_arrow_right_white}
                    iconPosition="right"
                    className="mt-2 w-full"
                  >
                    {translation?.secondHandTractors?.viewTractorDetails || 'View Tractor Details'}
                  </TG_LinkButton>
                </div>
              ) : (
                <div onClick={(e) => e.preventDefault()}>
                  <TG_LinkButton
                    iconSrc="https://images.tractorgyan.com/uploads/117424/678657747b293-Arrow-Vector.webp"
                    iconPosition="right"
                    className="!mt-0 w-auto !py-1"
                    iconClass="w-3"
                    href={tractorUrl}
                  >
                    {translation?.secondHandTractors?.viewDetails || 'View Details'}
                  </TG_LinkButton>
                </div>
              )}
            </div>

            {/* EMI Information */}
            {showEmi && (
              <div className="mt-2 flex w-full flex-col items-center">
                <label className="text-sm text-green-lightest">
                  {translation?.secondHandTractors?.emiStarts || 'EMI Starts'}: ₹ 19,251*
                </label>
              </div>
            )}
          </div>
        </div>
      </Link>
    );
  }, [translation, currentLang]);

  // Memoize mobile slider component
  const MobileSlider = useMemo(() => {
    const Component = ({ items, showEmi }) => (
      <Slider ref={sliderRef} {...settings} className="custom-slider h-full py-2 -ml-8">
        {items.map((item, index) => (
          <div key={item.id || `tractor-${index}`} className="w-full px-2 pb-2">
            {TractorCard(item, showEmi)}
          </div>
        ))}
      </Slider>
    );
    return Component;
  }, [settings, TractorCard]);

  // Memoize sell tractor URL
  const sellTractorUrl = useMemo(() =>
    `${currentLang === 'hi' ? '/hi' : ''}/sell-old-tractor`,
    [currentLang]
  );

  // Memoize view all URL
  const viewAllUrl = useMemo(() =>
    buttonRedirectUrl || `${currentLang === 'hi' ? '/hi' : ''}/second-hand-tractor`,
    [buttonRedirectUrl, currentLang]
  );

  // Memoize desktop grid cards
  const desktopCards = useMemo(() => {
    if (tractors.length === 0) return null;

    return tractors.map(tractor => (
      <div key={tractor.id || `desktop-${tractor.model}`}>
        {TractorCard(tractor, showEmi)}
      </div>
    ));
  }, [tractors, showEmi, TractorCard]);

  return (
    <section className={bgColor}>
      <div className="container">
        {/* Header Section */}
        <div className="my-3 flex items-center justify-between">
          <div>
            <MainHeadings marginBottom={'mb-2 md:mb-8'} text={heading} />
          </div>
          {!isMobile && (
            <Link href={sellTractorUrl} className="hidden md:block">
              <TG_Button>
                {translation?.secondHandTractors?.sellYourTractor || 'Sell Your Tractor'}
              </TG_Button>
            </Link>
          )}
        </div>

        {/* Empty State */}
        {tractors.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-gray-500">
              {translation?.secondHandTractors?.noTractorsAvailable ||
                'No second-hand tractors available at the moment.'}
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Grid */}
            {!isMobile && (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {desktopCards}
              </div>
            )}

            {/* Mobile Slider */}
            {isMobile && (
              <div className={`updates-section ${totalDots > 0 ? 'mb-12' : '-mb-2'}`}>
                <MobileSlider items={tractors} showEmi={showEmi} />
              </div>
            )}
          </>
        )}

        {/* View All Button */}
        {buttonText && tractors.length > 0 && (
          <div className="mt-8 flex justify-center">
            <MainButton
              text={buttonText}
              linkUrl={viewAllUrl}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default React.memo(SecondHandMiniTractorCards);