'use client';
import React, { useState, useEffect, useMemo } from 'react';
import ReviewsCard from '@/src/features/tyreComponents/components/tyreRatingAndReviews/ReviewsCard';
import TyreRatingForm from '@/src/features/tyreComponents/components/tyreRatingAndReviews/TyreRatingForm';
import { tg_getTittleFromNestedKey } from '@/src/utils';
import Image from 'next/image';
import { getTractorReatingReviews, getTyreRatingReviews } from '@/src/services/tyre/ratingReviewService';

const TyreRatingAndReviews = ({
  bgColor = 'bg-white',
  noReviewImg = 'https://images.tractorgyan.com/uploads/120267/68874f9862bd7-No-review-card-for-tyre.webp',
  headingTitleKey,
  dynamicTitle,
  translation,
  reviewTitleKey,
  modelId,
  brand,
  form_page_name = 'model_detail',
  model,
  showUserReviewTitle = true,
  isTractorReviewPage = false,
  // Implement-specific props
  mode = 'tyre',
  implementType,
  implementBrand,
  implementModel,
  formPageName
}) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Memoize titles to prevent recalculation on every render
  const { title, userReviewTitle } = useMemo(() => {
    let titleText = tg_getTittleFromNestedKey(translation, headingTitleKey) || '';
    titleText = titleText.replace('{title}', dynamicTitle || '');

    let userReviewText = tg_getTittleFromNestedKey(translation, reviewTitleKey) || '';
    userReviewText = userReviewText.replace('{title}', dynamicTitle || '');

    return {
      title: titleText,
      userReviewTitle: userReviewText
    };
  }, [translation, headingTitleKey, dynamicTitle, reviewTitleKey]);

  // Fetch reviews on component mount or when modelId changes
  useEffect(() => {
    const fetchReviews = async () => {
      if (!modelId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        let result;
        if (isTractorReviewPage) {
          result = await getTractorReatingReviews(modelId);
        } else {
          result = await getTyreRatingReviews(modelId);
        }

        console.log('Result from reviews API:', result);

        if (result?.success) {
          setReviews(result.data || []);
        } else {
          setError(result?.message || 'Failed to fetch reviews.');
        }
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError('An error occurred while fetching reviews.');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [modelId, isTractorReviewPage]);

  // Memoize the form props to prevent unnecessary re-renders
  const formProps = useMemo(() => ({
    translation,
    brand,
    model,
    form_page_name: formPageName || form_page_name,
    mode,
    implementType,
    implementBrand,
    implementModel
  }), [translation, brand, model, formPageName, form_page_name, mode, implementType, implementBrand, implementModel]);

  // Memoize the reviews rendering
  const renderReviews = useMemo(() => {
    if (loading) {
      return (
        <div className="flex h-full min-h-[250px] w-full items-center justify-center md:min-h-[400px]">
          <div className="flex flex-col items-center gap-4">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-primary"></div>
            <p className="text-gray-600">Loading reviews...</p>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex h-full min-h-[250px] w-full items-center justify-center md:min-h-[400px]">
          <div className="text-center text-red-600">
            <p>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 rounded bg-primary px-4 py-2 text-white hover:bg-primary-dark"
            >
              Retry
            </button>
          </div>
        </div>
      );
    }

    if (!reviews || reviews.length === 0) {
      return (
        <div className="flex h-full min-h-[250px] w-full items-center justify-center md:min-h-[400px]">
          <Image
            src={noReviewImg}
            height={400}
            width={400}
            alt="No reviews available"
            title="No reviews"
            className="h-auto max-h-[250px] w-full max-w-full object-contain md:max-h-[400px]"
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
        </div>
      );
    }

    return (
      <>
        {reviews.slice(0, 4).map(review => (
          <ReviewsCard
            key={review.sr_no || review.id || `review-${Math.random()}`}
            review={review}
          />
        ))}
      </>
    );
  }, [loading, error, reviews, noReviewImg]);

  return (
    <section id="review-section" className={bgColor}>
      <div className="container">
        <div className="space-y-12">
          <div className="rounded-2xl border-gray-light md:border-[1px] md:p-6">
            <h2 className="inline-block border-b-[3px] border-secondary pb-1 text-lg font-semibold leading-5 md:text-2xl md:leading-7">
              {title}
            </h2>
            <div className="grid grid-cols-7 gap-x-6 gap-y-8">
              {/* Rating Form Section */}
              <div className="col-span-7 border-gray-light md:col-span-3 md:border-e-[1px] md:pe-8">
                <TyreRatingForm {...formProps} />
              </div>

              {/* Reviews Section */}
              <div className="col-span-7 md:col-span-4">
                {showUserReviewTitle && (
                  <h2 className="inline-block border-b-[3px] border-secondary pb-1 text-lg font-semibold leading-5 md:text-2xl md:leading-7">
                    {userReviewTitle}
                  </h2>
                )}
                {renderReviews}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(TyreRatingAndReviews);