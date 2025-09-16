//  DroneTypes

import { getSelectedLanguage } from '@/src/services/locale';
import React from 'react';
import MainHeadings from '../tyreComponents/commonComponents/MainHeadings';
import Link from 'next/link';
import Image from 'next/image';

const TypeCard = ({ imgUrl, text, link, label, cardBg }) => {
    return (
        <Link
            href={link || "/"}
            title={text}
            aria-label={`Learn more about ${text} in India`}
            className="flex flex-col justify-center items-center bg-white hover:bg-green-lighter shadow-main p-2 border-2 hover:border-secondary border-transparent rounded-xl w-full max-w-[40%] md:max-w-[150px] 2xl:max-w-[160px] h-fit md:h-[150px]"
        >
            {/* <div className="relative flex justify-center items-center md:mb-2 rounded-lg w-full h-full overflow-hidden">
                {cardBg && (
                    <div className="absolute inset-0 flex justify-center items-center">
                        <Image
                            src={cardBg}
                            alt={`${text} background`}
                            title={`${text} background`}
                            fill
                            sizes="(max-width: 768px) 60px, 100px"
                            className="opacity-40 object-contain"
                        />
                    </div>
                )}

                <div className="z-10 relative bg-red-danger w-full h-[95%]">
                    <Image
                        src={imgUrl}
                        alt={`${text} image`}
                        title={`${text} image`}
                        fill
                        sizes="(max-width: 768px) 120px, 180px"
                        className="object-contain"
                    />
                </div>
            </div> */}
            <div className="w-auto h-[85%]">
                <Image
                    src={imgUrl}
                    alt={`${text} image`}
                    title={`${text} image`}
                    height={180}
                    width={180}
                    // fill
                    // sizes="(max-width: 768px) 120px, 180px"
                    className="w-full h-full object-contain"
                />
            </div>

            <div className="font-semibold text-black text-xs md:text-sm text-center">
                {text}
            </div>
        </Link>
    );
};

const DroneTypes = async ({ translation }) => {
    const currentLang = await getSelectedLanguage();

    const droneTypesData = [
        {
            id: 1,
            name: "Survey Drones",
            image: "https://images.tractorgyan.com/uploads/117940/67ad91e505382-survey-drone-icon.webp",
            link: "/drone/survey",
            cardBg: "https://images.tractorgyan.com/uploads/120643/68a3289f62396-Vector.webp"
        },
        {
            id: 2,
            name: "Agriculture Drones",
            image: "https://images.tractorgyan.com/uploads/117941/67ad91f269fa0-agriculture-drone-icon.webp",
            link: "/drone/agriculture",
            cardBg: "https://images.tractorgyan.com/uploads/120643/68a3289f62396-Vector.webp"
        },
    ];

    return (
        <div >
            <MainHeadings
                text={"Drone Types"}
            />


            <div className="flex flex-wrap justify-start sm:justify-center xl:justify-start items-center gap-3 md:gap-4 2xl:gap-6">
                {droneTypesData.map((item) => (
                    <TypeCard
                        key={item.id}
                        label={item.name}   // ✅ changed from item.label → item.name
                        text={translation?.tractorgyanOfferings?.[item.name] || item.name}
                        imgUrl={item.image} // ✅ changed from item.imgUrl → item.image
                        cardBg={item.cardBg} // ✅ changed from item.imgUrl → item.image
                        link={`${currentLang === "hi" ? "/hi" : ""}${item.link}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default DroneTypes;


