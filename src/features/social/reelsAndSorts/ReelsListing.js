import React from 'react';
import TittleAndCrumbs from '../../../components/shared/TittleAndCrumbs/TittleAndCrumbs';
import CategoryComponent from '../CategoryComponent';
import SearchBarWithFilterButton from '../SearchBarWithFilterButton';
import Link from 'next/link';
import YoutubeSubscribeButton from '../../../components/shared/youtubeSubscribeButton/YoutubeSubscribeButton';
import { TG_ReelsCard } from '@/src/components/ui/cards/reels/ReelsCards';
import { tgi_arrow_right_white } from '@/src/utils/assets/icons';
import TG_Button from '@/src/components/ui/buttons/MainButtons';

// Memoized card component to prevent unnecessary re-renders
const MemoizedReelsCard = React.memo(({ data }) => (
  <TG_ReelsCard data={data} />
));

const ReelsListing = ({
  BrandReelData,
  currentPage,
  isMobile,
  parent,
  dataCount,
  placeholder,
  translation,
  prefLang,
}) => {
  const page = currentPage || 1;
  const showPagination = dataCount > 12;
  const isFirstPage = page <= 1;

  // Precompute URLs
  const prevPageUrl = `${prefLang === 'en' ? '' : '/hi'}/tractor-reels-and-shorts?page=${page - 1}`;
  const nextPageUrl = `${prefLang === 'en' ? '' : '/hi'}/tractor-reels-and-shorts?page=${page + 1}`;

  return (
    <section className="max-md:pt-3 lg:mt-[155px]">
      <div className="container relative">
        <TittleAndCrumbs
          title={translation?.breadcrubm?.TractorandImplementReelsNShorts}
          breadcrumbs={[
            {
              label: translation?.breadcrubm?.home,
              href: '/',
              title: 'Home',
            },
            {
              label: translation?.breadcrubm?.TractorandImplementReelsNShorts,
              title: translation?.breadcrubm?.TractorandImplementReelsNShorts,
              isCurrent: true,
            },
          ]}
        />

        {isMobile ? (
          <div className="grid gap-4">
            <div className="flex flex-col items-center justify-center gap-3">
              <SearchBarWithFilterButton
                parent={parent}
                placeholder={placeholder}
                translation={translation}
              />
              <YoutubeSubscribeButton translation={translation} />
            </div>
            <main className="h-full w-full">
              <div className="grid grid-cols-3 gap-6">
                {BrandReelData?.map((item, index) => (
                  <div key={item.id || index} className="col-span-3 sm:col-span-2 lg:col-span-1">
                    <MemoizedReelsCard data={item} />
                  </div>
                ))}
              </div>
              {showPagination && (
                <div className="mt-6 flex justify-center gap-4">
                  <Link
                    href={prevPageUrl}
                    scroll={false}
                    className={isFirstPage ? 'pointer-events-none opacity-50' : ''}
                  >
                    <TG_Button
                      disabled={isFirstPage}
                      icon={tgi_arrow_right_white}
                      iconPosition="left"
                      iconClass="rotate-180"
                      className="px-6 py-2 text-sm md:text-base"
                    >
                      {translation?.buttons.prev}
                    </TG_Button>
                  </Link>

                  <Link
                    href={nextPageUrl}
                    scroll={false}
                  >
                    <TG_Button
                      icon={tgi_arrow_right_white}
                      iconPosition="right"
                      className="px-6 py-2 text-sm md:text-base"
                    >
                      {translation?.buttons.next}
                    </TG_Button>
                  </Link>
                </div>
              )}
            </main>
          </div>
        ) : (
          <div className="flex flex-col gap-4 md:flex-row lg:gap-6 xl:gap-6">
            <CategoryComponent title={'Webstory Category'} />

            <main className="h-full w-full flex-1">
              <div className="mb-6 flex items-center justify-between">
                <SearchBarWithFilterButton
                  parent={parent}
                  placeholder={placeholder}
                  translation={translation}
                />
                <YoutubeSubscribeButton translation={translation} />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {BrandReelData?.map((item, index) => (
                  <div key={item.id || index} className="col-span-4 sm:col-span-2 lg:col-span-1">
                    <MemoizedReelsCard data={item} />
                  </div>
                ))}
              </div>
              {showPagination && (
                <div className="mt-6 flex justify-center gap-4">
                  <Link
                    href={prevPageUrl}
                    scroll={false}
                    className={isFirstPage ? 'pointer-events-none opacity-50' : ''}
                  >
                    <TG_Button
                      disabled={isFirstPage}
                      icon={tgi_arrow_right_white}
                      iconPosition="left"
                      iconClass="rotate-180"
                      className="px-6 py-2 text-sm md:text-base"
                    >
                      {translation?.buttons.prev}
                    </TG_Button>
                  </Link>

                  <Link
                    href={nextPageUrl}
                    scroll={false}
                  >
                    <TG_Button
                      icon={tgi_arrow_right_white}
                      iconPosition="right"
                      className="px-6 py-2 text-sm md:text-base"
                    >
                      {translation?.buttons.next}
                    </TG_Button>
                  </Link>
                </div>
              )}
            </main>
          </div>
        )}
      </div>
    </section>
  );
};

// Only re-render when props actually change
export default React.memo(ReelsListing, (prevProps, nextProps) => {
  return (
    prevProps.BrandReelData === nextProps.BrandReelData &&
    prevProps.currentPage === nextProps.currentPage &&
    prevProps.dataCount === nextProps.dataCount &&
    prevProps.translation === nextProps.translation
  );
});