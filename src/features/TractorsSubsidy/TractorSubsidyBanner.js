import TittleAndCrumbs from "@/src/components/shared/TittleAndCrumbs/TittleAndCrumbs";
import React from "react";

const TractorSubsidyBanner = ({ translation }) => {
  const bannerImageDesktop =
    "https://images.tractorgyan.com/uploads/119959/1752495858Tractor Subsidy - Desktop.webp";
  const bannerImageMobile =
    "https://images.tractorgyan.com/uploads/119958/1752495761Tractor Subsidy - Mobile.webp";
  return (
    <section className="lg:mt-[144px]">
      <div className="container relative">
        {/* <div className={isMobile ? `w-[90%] m-auto` : ``}>
        </div> */}
        <TittleAndCrumbs
          title={
            translation?.headings.tractorsSubsidyinIndia ||
            `"Tractors Subsidy in India"`
          }
          breadcrumbs={[
            {
              label: translation?.home || "Home",
              href: "/",
              title: translation?.home || "Home",
            },
            {
              label:
                translation?.breadcrubm.tractorsSubsidyinIndia ||
                "Tractors Subsidy in India",
              title:
                translation?.breadcrubm.tractorsSubsidyinIndia ||
                "Tractors Subsidy in India",
              isCurrent: true,
            },
          ]}
        />

        {/* Banner with Filter Overlay */}
        <div className="relative mb-4 h-full w-full overflow-hidden rounded-2xl shadow-bottom md:max-h-[350px] md:min-h-[175px] 2xl:max-h-[385px] 2xl:min-h-[370px]">
          {/* Banner Images */}
          <div className="hidden h-full w-full md:block">
            <img
              src={bannerImageDesktop}
              height={370}
              width={1260}
              alt="tyre price banner"
              className="h-full w-auto object-fill"
            />
          </div>
          <div className="h-full max-h-[100px] w-full overflow-hidden rounded-t-2xl sm:max-h-[143px] md:hidden">
            <img
              src={bannerImageMobile}
              height={1000}
              width={1000}
              alt="tyre price banner"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TractorSubsidyBanner;
