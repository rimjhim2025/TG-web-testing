'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import MainButton from '@/src/features/tyreComponents/commonComponents/buttons/MainButton';
import MainHeadings from '@/src/features/tyreComponents/commonComponents/MainHeadings';

const BrandCard = ({ title, imgSrc, url, cssClass }) => {
    const safeHref = url && url.trim().length > 0 ? url : '#';
    const isDisabled = safeHref === '#';

    return (
        <Link
            href={safeHref}
            title={title}
            aria-disabled={isDisabled}
            className={`${cssClass ? 'w-[30%]' : 'max-md:w-[31%] md:w-[9.2%]'} flex flex-col items-center  ${isDisabled ? 'pointer-events-none opacity-70' : ''}`}
        >
            <div className={`${cssClass ? 'w-[80px] h-[80px] ' : 'w-[80px] md:w-[100px] h-[80px] md:h-[100px]'} flex justify-center items-center bg-white hover:bg-green-lighter shadow-[1px_5px_16px_0px_rgba(88,98,89,0.21)] mb-2 md:mb-4 p-2 border-[2px] hover:border-secondary border-transparent rounded-full  overflow-hidden`}>
                <Image
                    src={imgSrc || '/images/placeholder-logo.png'}
                    height={72}
                    width={72}
                    alt={`${title} logo`}
                    title={`${title} logo`}
                    className="object-contain"
                    loading="lazy"
                    sizes="80px"
                />
            </div>
            <p className="font-medium text-sm text-center">{title}</p>
        </Link>
    );
};

/**
 * Props:
 * - mode: 'normal' | 'brand'
 * - brandHeader: ReactNode to render at the top only on brand page (e.g., <TittleAndCrumbs ... />)
 */
const DroneByBrands = ({
    cssClass,
    heading,
    allBrands = [],
    itemsShown = 9,
    bgColor = 'bg-white',
    placedInFilter = false,
    currentLang = 'en',
    mode = 'normal',
    brandHeader, // <-- NEW
}) => {
    const isBrandPage = mode === 'brand';
    const langPrefix = currentLang && currentLang !== 'en' ? `/${currentLang}` : '';
    const brandsToRender = isBrandPage ? allBrands : allBrands.slice(0, itemsShown);

    return (
        <section className={bgColor}>
            <div className={`${placedInFilter ? '!px-0' : ''} ${cssClass ? '' : 'container'}`}>
                {/* Header area */}
                {isBrandPage
                    ? (brandHeader || (heading && <MainHeadings text={heading} />))
                    : (heading && <MainHeadings text={heading} />)
                }

                <div className={`${cssClass ? 'gap-2' : 'md:gap-6'} flex flex-wrap justify-start gap-2  mb-6`}>
                    {brandsToRender.map((item, index) => (
                        <BrandCard
                            key={item.id || item.slug || item.name || index}
                            title={item.name}
                            imgSrc={item.logo || ''}
                            url={item.href || ''}
                            cssClass={cssClass}
                        />
                    ))}
                    {brandsToRender.length === 0 && (
                        <p className="text-gray-500 text-sm">No brands available.</p>
                    )}
                </div>

                {/* Show the View All button ONLY on normal pages */}
                {!isBrandPage &&
                    <MainButton text="View All Brands" linkUrl={`${langPrefix}/drone-brands`} />
                }
            </div>
        </section>
    );
};

export default DroneByBrands;
