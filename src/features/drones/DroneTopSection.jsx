import React from 'react';
import GoogleAdHorizontalClientWrapper from '../social/GoogleAdHorizontal/GoogleAdHorizontalClientWrapper';
import GoogleAdVerticalClientWrapper from '../social/GoogleAdVertical/GoogleAdVerticalClientWrapper';
import TittleAndCrumbs from '@/src/components/shared/TittleAndCrumbs/TittleAndCrumbs';
import DroneTypes from './DroneTypes';
import DroneContentToggle from './drone-price/DroneContentToggle';
import Link from 'next/link';
import Image from 'next/image';

const DroneTopSection = ({
    isMobile,
    translation,
    currentLang,
    topContent,
    deviceType,
    tyreTopContent,
}) => {
    let content = '';
    let banners = [];
    if (tyreTopContent) {
        content = tyreTopContent?.ad_content || tyreTopContent?.content || '';
        banners = tyreTopContent?.banner || [];
    }

    if (topContent) {
        content = topContent.ad_content;
    }

    return (
        <>
            <section className="lg:mt-40 pt-3.5">
                <div className="relative container">
                    {/* Title + Breadcrumbs */}
                    <TittleAndCrumbs
                        title="Drones"
                        breadcrumbs={[
                            { label: 'Home', href: '/', title: 'Home' },
                            {
                                label: 'Drones',
                                title: 'Drones',
                                isCurrent: true,
                            },
                        ]}
                    />

                    {/* Content + Ads */}
                    <div className="flex lg:flex-row flex-col gap-8 w-full">
                        {/* Left side (Content + drone Types) */}
                        <div className="flex flex-col flex-[2] gap-4">
                            {/* Left Content */}
                            <div className="shadow-main p-4 rounded-2xl w-full font-normal text-gray-dark text-sm">
                                <div id="tyre-top-content" className="relative">
                                    <div
                                        className="z-10 absolute inset-0 pointer-events-none"
                                        aria-hidden="true"
                                        style={{ display: 'none' }}
                                    />
                                    <div
                                        className="tyre-top-content text-base leading-6 gg"
                                        dangerouslySetInnerHTML={{ __html: content }}
                                    // angerouslySetInnerHTML={content}
                                    />
                                    <DroneContentToggle deviceType={deviceType} maxMobileHeight={'max-h-36'} />
                                </div>
                            </div>

                            {/* drone Types */}
                            <DroneTypes translation={translation} />
                        </div>

                        {/* Right side (Ads) */}
                        <div className="flex-1 lg:max-w-[350px]">
                            {/* {isMobile ? <GoogleAdHorizontalClientWrapper /> : <GoogleAdVerticalClientWrapper />} */}
                            <div>
                                <Link
                                    href={`https://tractorgyan.com/${currentLang === 'hi' ? 'hi/' : ''}tractors`}
                                    className="lg:hidden rounded-2xl w-full h-full overflow-hidden"
                                >
                                    <Image
                                        src="https://images.tractorgyan.com/uploads/118100/67c190c6d514b-Implement-Listing-Banner-Mob.webp"
                                        height={500}
                                        width={500}
                                        alt="All Tractor Page Banner"
                                        title="All Tractor Page Banner"
                                        className="h-full object-cover"
                                    />
                                </Link>
                                <Link
                                    href={`https://tractorgyan.com/${currentLang === 'hi' ? 'hi/' : ''}tractors`}
                                    className="hidden lg:block mx-auto rounded-2xl w-full max-w-[270px] h-full max-h-[526px] overflow-hidden"
                                >
                                    <Image
                                        src={
                                            'https://images.tractorgyan.com/uploads/118099/67c1903aa3cb5-Implement-Listing-Banner-Desk.webp'
                                        }
                                        height={200}
                                        width={200}
                                        alt="All Tractor Page Banner"
                                        title="All Tractor Page Banner"
                                        className="w-full h-full object-center object-contain"
                                    />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default DroneTopSection;
