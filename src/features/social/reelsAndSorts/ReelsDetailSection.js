'use client';
import { useEffect, useRef, useState } from 'react';
import MainHeadings from '@/src/features/tyreComponents/commonComponents/MainHeadings';
import Image from 'next/image';
import React from 'react';
import TittleAndCrumbs from '../../../components/shared/TittleAndCrumbs/TittleAndCrumbs';
import { TG_ReelsDetailCard } from '@/src/components/ui/cards/reels/ReelsCards';
import { useRouter } from 'next/navigation';
import { postVideoReelButtons } from '@/src/services/social/VideoReelButtons';

const ReelsDetailSection = ({ param, reelDetailData, isMobile, youtubeCount }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFirst, setIsFirst] = useState(false);
  const [isLast, setIsLast] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isIphone, setIsIphone] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // default true until we detect device
  const [iframeKey, setIframeKey] = useState(0); // force iframe reload when needed

  const reelData = reelDetailData?.data[0];
  const reelLatestVideo = reelDetailData?.latest_video;

  const router = useRouter();
  const videoRef = useRef(null);

  // client-only device detection
  useEffect(() => {
    setIsClient(true);
    if (typeof navigator === 'undefined') return;

    const ua = navigator.userAgent || '';
    const mobileRegex = /Mobi|Android/i;
    const iphoneRegex = /iPhone|iPad|iPod/i;

    const isiPhoneDevice = iphoneRegex.test(ua);
    const isMobileDevice = mobileRegex.test(ua) || isiPhoneDevice;
    const desktop = !isMobileDevice;

    setIsIphone(isiPhoneDevice);
    setIsDesktop(desktop);

    // Desktop: allow unmuted autoplay (most desktop browsers permit if user previously interacted or policy allows)
    // Mobile (including Android & iOS): start muted. We'll show tap-to-unmute overlay only for iPhone as requested.
    setIsMuted(!desktop); // desktop => muted=false, mobile => muted=true

    // Append YouTube platform script (you already had this; keep it)
    const scriptId = 'google-platform-js';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://apis.google.com/js/platform.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // build iframe src safely: preserves query markers and toggles mute param
  const buildIframeSrc = (baseUrl, muted) => {
    if (!baseUrl) return '';
    // if src already has autoplay/mute flags, remove them to re-add correct ones
    const urlObj = new URL(baseUrl, window.location.origin);
    // remove existing autoplay/mute/playsinline params that might be present
    urlObj.searchParams.delete('autoplay');
    urlObj.searchParams.delete('mute');
    urlObj.searchParams.delete('playsinline');

    urlObj.searchParams.set('autoplay', '1');
    urlObj.searchParams.set('playsinline', '1');
    urlObj.searchParams.set('mute', muted ? '1' : '0');

    // some provider-specific flags (you had them in allow attr) can remain in src if present
    return urlObj.toString();
  };

  const handleNavigation = async (btnType) => {
    setIsLoading(true);
    try {
      const payload = {
        video_id: reelData.id,
        video_type: 'reels',
        btn_type: btnType,
      };
      const response = await postVideoReelButtons(payload);
      if (response.hasOwnProperty('is_first')) {
        setIsFirst(response.is_first === 1);
      }
      if (response.hasOwnProperty('is_last')) {
        setIsLast(response.is_last === 1);
      }
      if (response.success && response.data && response.data.length > 0) {
        router.push(response.data[0].full_url);
      }
    } catch (error) {
      console.error('Error fetching navigation data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // When user chooses to unmute on iPhone, update state and reload iframe once
  const handleUnmuteTap = () => {
    // user interaction occurs here — iOS will allow playback with sound after this tap
    setIsMuted(false);
    // re-create iframe to ensure new src with mute=0 is loaded in the user-interaction context
    setIframeKey((k) => k + 1);
  };

  const formattedTitle = formatSlugToTitle(reelData?.title);

  function formatSlugToTitle(slug) {
    if (!slug) return '';

    const words = slug.split('-');

    const minorWords = ['of', 'into', 'for', 'the', 'and', 'in', 'on', 'with', 'to'];

    const formatted = words
      .map((word, index) => {
        if (minorWords.includes(word) && index !== 0) {
          return word;
        }
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');

    return formatted;
  }

  // Render
  return (
    <section className="pb-14 max-md:pt-3 lg:mt-[153px]">
      <div className="container relative">
        <TittleAndCrumbs
          title={formattedTitle}
          breadcrumbs={[
            { label: 'Home', href: '/', title: 'Home' },
            {
              label: 'Tractor & Implement Reels',
              href: '/tractor-reels-and-shorts',
              title: 'Tractor & Implement Reels',
            },
            {
              label: formattedTitle,
              title: formattedTitle,
              isCurrent: true,
            },
          ]}
          customClass={`max-sm:leading-[22px] md:!text-xl`}
        />
        <div className="grid w-full grid-cols-8 gap-4 md:grid-cols-8 lg:w-fit md:-mt-3">
          <div className="col-span-8 bg-gradient-to-r from-[#DBF5DB] via-[#F5FBF5] to-[#C3EFC3] rounded-2xl py-4 px-2.5 md:p-4 flex justify-center items-center gap-3 md:gap-8 relative">
            <button
              onClick={() => handleNavigation('prev')}
              disabled={isLoading || isFirst}
              className={`flex justify-center items-center md:gap-2 shadow-main font-medium md:text-lg rounded-xl bg-white p-3 md:px-3 md:py-2 text-gray-dark ${isLoading || isFirst ? ' cursor-not-allowed opacity-60' : ' hover:scale-105'
                }`}
            >
              <Image
                src={'https://images.tractorgyan.com/uploads/120941/68be875ce2b84-gray-next-arrow.webp'}
                height={100}
                width={200}
                alt="previous button icon"
                title="previous button icon"
                className=" w-auto max-w-8 h-3 min-h-3 rotate-90"
              />
              <span className="max-md:hidden">Prev</span>
            </button>

            <div
              ref={videoRef}
              className="relative max-md:mx-auto h-full min-h-[360px] w-full max-w-[205px] md:max-w-[210px] overflow-hidden rounded-[16px] md:max-h-[600px] md:min-h-[370px] xl:min-h-[415px] xl:max-w-[235px]"
            >
              {reelData?.url_of_video ? (
                // Key changes when we want to force a reload (used when unmuting on iPhone)
                <iframe
                  key={iframeKey}
                  width="100%"
                  height="100%"
                  src={
                    isClient
                      ? buildIframeSrc(reelData.url_of_video, isMuted)
                      : '' // avoid using window on server
                  }
                  title={reelData.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="bg-gray-200 text-gray-600 flex h-full items-center justify-center text-center text-sm">
                  Video loading or unavailable.
                </div>
              )}

              {/* iPhone-only tap to unmute overlay */}
              {isClient && isIphone && isMuted && (
                <button
                  onClick={handleUnmuteTap}
                  className="absolute inset-0 z-30 flex items-end justify-center pb-4 bg-black/0"
                  aria-label="Unmute video"
                >
                  <div className="bg-black/70 text-white px-3 py-1 rounded text-sm backdrop-blur-sm">
                    Tap to unmute
                  </div>
                </button>
              )}
            </div>

            <button
              onClick={() => handleNavigation('next')}
              disabled={isLoading || isLast}
              className={`flex justify-center items-center md:gap-2 shadow-main font-medium md:text-lg rounded-xl bg-white p-3 md:px-3 md:py-2 text-gray-dark ${isLoading || isLast ? ' cursor-not-allowed opacity-60' : ' hover:scale-105'
                }`}
            >
              <span className="max-md:hidden">Next</span>
              <Image
                src={'https://images.tractorgyan.com/uploads/120941/68be875ce2b84-gray-next-arrow.webp'}
                height={100}
                width={100}
                alt="next button icon"
                title="next button icon"
                className="-rotate-90 w-auto max-w-8 h-3 min-h-3"
              />
            </button>
          </div>

          <div className="col-span-8">
            <div className="mt-2 w-full">
              <MainHeadings text={'Latest reels'} />
            </div>

            <div className="grid grid-cols-2 gap-4 md:gap-5 sm:grid-cols-3 lg:grid-cols-4  xl:grid-cols-6">
              {reelLatestVideo?.map((item, index) => (
                <div key={index} className="col-span-1 lg:col-span-1">
                  <TG_ReelsDetailCard data={item} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReelsDetailSection;
