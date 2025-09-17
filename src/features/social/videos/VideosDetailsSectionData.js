import { getDictionary } from "@/src/lib/dictonaries";
import { isMobileView } from "@/src/utils";
import { getSelectedLanguage } from "@/src/services/locale";
import HandleError from "@/src/components/shared/HandleError/HandleError";
import { postVideoReelDetails } from "@/src/services/social/VideoReelDetail";
import { getSocialMediaSubsCount } from "@/src/services/social/SubscriberCounts";
import VideosDetailSection from "./VideosDetailSection";

// Cache for API responses to avoid duplicate calls in the same request
const cache = new Map();

export default async function VideosDetailsSectionData({ params }) {
  const prefLang = await getSelectedLanguage();
  const [translation, isMobile] = await Promise.all([
    getDictionary(prefLang),
    isMobileView()
  ]);

  const param = params?.slug;

  // Generate cache keys
  const videoCacheKey = `video-${param}`;
  const youtubeCacheKey = 'youtube-count';

  let videoDetailData = cache.get(videoCacheKey);
  let youtubeCount = cache.get(youtubeCacheKey);

  let reelDetailError = !videoDetailData;
  let youtubeError = !youtubeCount;

  // Only fetch video details if not in cache
  if (!videoDetailData) {
    try {
      const payload = {
        video_url: param,
        video_type: "videos",
      };

      const videoDetails = await postVideoReelDetails(payload);

      if (videoDetails) {
        videoDetailData = videoDetails;
        cache.set(videoCacheKey, videoDetailData);
        reelDetailError = false;
      } else {
        reelDetailError = true;
      }
    } catch (err) {
      console.error("❌ Failed to fetch reel detail:", err);
      reelDetailError = true;
    }
  }

  // Only fetch YouTube count if not in cache
  if (!youtubeCount) {
    try {
      const response = await getSocialMediaSubsCount();
      if (response) {
        youtubeCount = response.youtube_count;
        cache.set(youtubeCacheKey, youtubeCount);
        youtubeError = false;
      } else {
        youtubeError = true;
      }
    } catch (err) {
      console.error("⚠️ YouTube count fetch failed:", err);
      youtubeError = true;
    }
  }

  if (reelDetailError) {
    return (
      <HandleError
        title={
          translation?.error_messages?.UnablefetchData || "Something went wrong"
        }
        isNoData={true}
        description={
          translation?.error_messages?.tryAgainLater ||
          "Please try again later."
        }
      />
    );
  }

  return (
    <VideosDetailSection
      translation={translation}
      param={param}
      videoDetailData={videoDetailData}
      isMobile={isMobile}
      youtubeCount={youtubeError ? null : youtubeCount}
    />
  );
}