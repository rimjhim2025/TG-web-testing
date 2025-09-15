import HandleError from '@/src/components/shared/HandleError/HandleError';
import ReelsDetailSection from './ReelsDetailSection';

export default async function ReelsDetailSectionData({ ...props }) {
  const {
    param,
    reelDetailData,
    isMobile,
    youtubeCount,
    reelDetailError,
    youtubeError,
    seoError,
    translation
  } = props;

  // 4. Return JSX with SEOHead always
  return (
    <>
      {reelDetailError ? (
        <HandleError
          title={translation?.error_messages?.UnablefetchData || 'Something went wrong'}
          isNoData={true}
          description={translation?.error_messages?.tryAgainLater || 'Please try again later.'}
        />
      ) : (
        <ReelsDetailSection
          param={param}
          reelDetailData={reelDetailData}
          isMobile={isMobile}
          youtubeCount={youtubeCount}
          reelDetailError={reelDetailError}
          youtubeError={youtubeError}
          seoError={seoError}
        />
      )}
    </>
  );
}