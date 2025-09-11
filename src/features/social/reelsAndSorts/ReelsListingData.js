import HandleError from "@/src/components/shared/HandleError/HandleError";
import ReelsListing from "./ReelsListing";

export default function ReelListingData({
  searchParams,
  translation,
  BrandReelData,
  isMobile,
  page,
  dataCount,
  reelError,
  prefLang
}) {

  // Early return for error state to avoid unnecessary processing
  if (reelError || BrandReelData.length === 0) {
    return (
      <HandleError
        title={translation?.error_messages?.UnablefetchData}
        isNoData={BrandReelData.length === 0}
        description={translation?.error_messages?.tryAgainLater}
      />
    );
  }

  return (
    <ReelsListing
      BrandReelData={BrandReelData}
      searchParams={searchParams}
      isMobile={isMobile}
      currentPage={page}
      translation={translation}
      prefLang={prefLang}
      parent={"tractor_reels"}
      dataCount={dataCount}
      placeholder={translation.buttons.SearchforTractorReelsShorts}
      categoriesError={reelError}
    />
  );
}