import { getSocialMediaSubsCount } from "@/src/services/social/SubscriberCounts";
import { modifiedSubsCount } from "@/src/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// Preload the bell icon for better performance
const BELL_ICON = "https://images.tractorgyan.com/uploads/119244/6835a9d8d41db-Bell-icon_small.webp";

const YoutubeSubscribeButton = async ({ translation }) => {
  // Fetch data in parallel if there are other potential requests
  const response = await getSocialMediaSubsCount();
  const youtubeCount = response.youtube_count;
  const formattedCount = modifiedSubsCount(youtubeCount);

  return (
    <div className="flex w-fit gap-3 rounded-3xl bg-red-subBg p-1 max-md:mx-auto">
      <div className="flex cursor-pointer items-center justify-center gap-2">
        <Link
          target="_blank"
          rel="noopener noreferrer" // Security improvement
          title={translation?.footer?.VisitTractorsGyanYouTubechannel}
          aria-label={translation?.footer?.VisittheofficialYouTubechannelofTractorsGyan}
          href="https://www.youtube.com/@TractorGyan"
          className="rounded-full bg-red-subscribe px-4 py-1 text-sm text-white hover:bg-red-main transition-colors duration-200" // Added hover effect
        >
          <span>{translation?.social?.subscribe}</span>
        </Link>
        <Image
          src={BELL_ICON}
          height={28}
          width={28}
          alt={translation?.social?.bellIconAlt || "Notification bell icon"}
          title={translation?.social?.bellIconTitle}
          className="h-7 w-7"
          loading="lazy" // Lazy load non-critical image
          fetchPriority="low"
        />
      </div>
      <div className="flex flex-col border-s-[1px] border-gray-main px-5">
        <span className="text-base font-bold leading-4 text-black">
          {formattedCount} +
        </span>
        <span className="text-[10px] font-medium">
          {translation?.social?.onYoutubePrefix}
          <span className="text-primary">{translation?.social?.gyan}</span>{" "}
          {translation?.social?.onYoutubeSuffix}
        </span>
      </div>
    </div>
  );
};

export default YoutubeSubscribeButton;