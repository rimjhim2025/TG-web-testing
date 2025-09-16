import Image from "next/image";
import Link from "next/link";
import React from "react";
import TG_Button from "../../buttons/MainButtons";
import { tgi_arrow_right_white } from "@/src/utils/assets/icons";

const SecondHandTractorCard = ({
  data,
  pageUrl,
  currentLang,
  verticalView = false
}) => {
  currentLang = currentLang === "hi" ? "/hi" : "";

  return (
   <div className={`${verticalView ? 'md:flex-col' : 'md:flex-row lg:w-[49%] xl:w-[49%]'} hover:border-gray relative flex flex-col h-auto w-full overflow-hidden rounded-2xl border border-gray-light bg-white hover:bg-green-lighter`}>
   {/* <div className={`${verticalView ? 'md:flex-col' : 'md:flex-row'} hover:border-gray relative flex flex-col h-auto w-full overflow-hidden rounded-2xl border border-gray-light bg-white hover:bg-green-lighter lg:w-[49%] xl:w-[49%]`}> */}
      {/* Image Section */}
      <div className={`${verticalView ? '' : 'md:w-2/5'} relative min-h-[220px] w-full overflow-hidden`}>
        <Link
          href={currentLang + pageUrl}
          // title={${brandName} ${modelName} image}
          // aria-label={know more about ${brandName} in India}
        >
          <Image
            src={'/assets/images/buy-used-tractor.svg'}
            fill
            alt="image"
            // alt={${brandName} ${modelName} image}
            // title={${brandName} ${modelName} image}
            className="object-cover"
          />
        </Link>
      </div>

      {/* Details Section */}
      <div className="p-4">
        <div className="flex flex-col justify-between">
          {/* Location & Views */}
          <div className="mb-2 flex items-center justify-between">
            {/* Location */}
            <div className="flex items-center gap-1 text-[14px] font-medium text-[#4CAF50]">
              <Image
                src="/assets/images/address-icon.svg"
                height={50}
                width={50}
                alt="share-icon"
                title="share-icon"
                className="h-4 w-4 -ml-1"
              />
              <span className="text-xs text-gray-dark">Faridabad, Haryana</span>
            </div>

            {/* Views */}
            <div className="flex items-center gap-1 rounded-full bg-red-viewsBG px-2 py-1 font-medium text-white">
              {/* TODO:: Update Icon */}
              <Image
                src="https://images.tractorgyan.com/uploads/117331/677cd475d38ef-show-hide-icon_small.webp"
                height={16}
                width={16}
                alt="views-icon"
                title="views-icon"
                className="h-4 w-4 object-contain"
              />
              <span className="text-[10px]">250+ Views</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="mb-2 line-clamp-2 text-[16px] font-bold leading-snug text-black">
            Second Hand Swaraj 744 XT Tractor
          </h3>

          {/* Info Stats */}
          <div className="mb-3 flex overflow-hidden rounded-lg border border-green-mint bg-green-lighter text-center text-xs font-medium">
            <div className="w-1/3 py-2">
              <div className="text-gray-dark">Purchase</div>
              <div className="text-sm font-semibold text-black">2016</div>
            </div>
            <div className="w-1/3 border-x border-green-mint py-2">
              <div className="text-gray-dark">Running</div>
              <div className="text-sm font-semibold text-black">0-1000 Hrs</div>
            </div>
            <div className="w-1/3 py-2">
              <div className="text-gray-dark">Condition</div>
              <div className="text-sm font-semibold text-black">Very Good</div>
            </div>
          </div>

          {/* Price and Action */}
          <div className="mb-2 flex items-center justify-between">
            <div className="text-[18px] font-semibold text-green-lightest">₹ 8.90 Lakh</div>
            <div>
              <span className="text-sm text-gray-dark">EMI Starts:</span>
              <span className="text-sm font-semibold text-black">₹ 19,251*</span>
            </div>
          </div>
          <div className="flex items-center justify-between gap-4 md:gap-2">
            {/* TODO:: Update Share Icon */}
            <TG_Button
              variant="outline"
              icon="https://images.tractorgyan.com/uploads/119912/68467f5fec55b-green-arrow.webp"
            >
              Share
            </TG_Button>
            <TG_Button
              icon={tgi_arrow_right_white}
              iconPosition="right"
              className="flex-1"
            >
              View Tractor
            </TG_Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondHandTractorCard;