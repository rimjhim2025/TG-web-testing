// "use client";

// import { useIsMobile } from "@/src/utils/useIsMobile";
import MainButton from '@/src/features/tyreComponents/commonComponents/buttons/MainButton';
import PopularDroneCard from './PopularDroneCard';
import MainHeadings from '@/src/features/tyreComponents/commonComponents/MainHeadings';
import TG_PopularCard from '@/src/components/ui/cards/PopularCard';
// import { postData } from "@/src/services/apiMethods";
// import React, { useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";
// import { getTyrePopularDetails } from "@/src/services/tyre/tyre-popular-details";
// import '../../i18n'
const PopularDrones = ({ bgColor, translation, isMobile, popularTyres, langPrefix }) => {
  // const { t, i18n } = useTranslation();
  // const currentLang = i18n.language;
  // const langPrefix = currentLang === "hi" ? "/hi" : "";
  // const [popularTyres, setPopularTyres] = useState([]);
  // const isMobile = useIsMobile();
  // useEffect(() => {
  //   const getData = async () => {
  //     const data = await getTyrePopularDetails(currentLang);
  //     setPopularTyres(data);
  //   };
  //   getData();
  // }, []);
  return (
    <section className={`${bgColor ? bgColor : ''}`}>
      <div className="container">
        <MainHeadings text={translation.headings.popularDrones} />
        {!isMobile ? (
          <div className="mb-8 grid grid-cols-4 gap-8">
            {popularTyres?.slice(0, 4).map((item, index) => {
              return (
                // TODO:: WIP
                // <TG_PopularCard
                //   key={index}
                //   title={item.title}
                //   detailUrl={(langPrefix == 'hi' ? '/hi' : '') + item.page_url}
                //   imageSrc={item.image_url}
                //   imageAlt={item.title}
                //   type="tyre"
                //   specs={{ Type: item.tyre_type, Size: item.size, Brand: item.brand_name }}
                // />
                <PopularDroneCard
                  key={index}
                  isMobile={isMobile}
                  langPrefix={langPrefix}
                  // title={item.title}
                  title={`${'Droni Drone'}`}
                  size={item.size}
                  // brand={item.brand_name}
                  brand={`${'Garuda Aerospace'}`}
                  imgUrl={item.image_url}
                  linkUrl={item.tyre_url}
                  type={item.tyre_type}
                  pageUrl={item.page_url}
                  popularTyres={popularTyres}
                  translation={translation}
                />
              );
            })}
          </div>
        ) : (
          <PopularDroneCard
            translation={translation}
            popularTyres={popularTyres}
            isMobile={isMobile}
            langPrefix={langPrefix}
          />
        )}
        <MainButton
          text={translation.buttons.viewAllPopularDrones}
          linkUrl={`${langPrefix == 'en' ? '' : '/' + langPrefix}/tyres`}
        />
      </div>
    </section>
  );
};

export default PopularDrones;
