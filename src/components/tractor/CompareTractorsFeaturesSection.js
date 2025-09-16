// ============ Used At ============
// 1. /compare-tractors/mahindra-585-di-powerplus-bhoomiputra-vs-mahindra-575-di-xp-plus
// 2. 
// =================================
import React from "react";
import Image from "next/image";
import TG_ToggleSwitch from "../ui/inputs/TG_ToggleSwitch";

const CompareFeaturesRow = ({features, isLast = false}) => {
  return (
    <li className={`${isLast ? 'pt-3 pb-1' : 'border-b py-3'} flex gap-10 border-gray-light px-2`}>
      <div className="flex w-1/2 items-center justify-between">
        <span className="text-gray-dark">Feature</span>
      </div>
      <div className="w-1/2 font-medium text-black text-center">
        Value
      </div>
      <div className="w-1/2 font-medium text-black text-center">
        Value
      </div>
    </li>
  );
};

const CompareTractorsFeaturesSection = ({
  comparisionData
}) => {
  return (
    <section>
      <div className="container">
        <div className="flex justify-end pb-4">
          <TG_ToggleSwitch label="Hide Common Features" variant="OVERFLOW"/>
        </div>
      {comparisionData.map((group, index) => (
        <div className={`${index < 4 ? 'mb-10' : ''}`}>
          <div
            className={`${
              true && 'rounded-b-lg'
            } flex items-center justify-between gap-3 rounded-t-lg bg-primary p-4 text-base font-semibold leading-[18px] text-white shadow-main`}
          >
            <h3>{group.title}</h3>
            <button>
              <Image
                src={`${
                  true
                    ? 'https://images.tractorgyan.com/uploads/114119/66a8b1e63149d-upArrowFeature.png'
                    : 'https://images.tractorgyan.com/uploads/114118/66a8b19bd6d66-featureTableDown.png'
                }`}
                height={20}
                width={20}
                alt="toggle-button-image"
                title="toggle-button-image"
                className="h-5 w-full min-w-5 max-w-5"
              />
            </button>
          </div>
          <ul className="rounded-b-lg bg-white p-2 shadow-main text-xs md:text-sm">
            <li className="flex gap-10 border-b-[1px] border-gray-light px-2 py-[13px]">
              {group.headers.map((header, index) => (
                <div className={`${index ? 'text-black justify-center' : 'text-gray-dark'} flex w-1/3 items-center`}>
                  <span >{header}</span>
                </div>
              ))}
            </li>
            {group.features.map((feature, index) => (
              <CompareFeaturesRow key={index} isLast={index === group.features.length - 1} features={feature}/>
            ))}
          </ul>
        </div>
      ))}
      </div>
    </section>
  );
};

export default CompareTractorsFeaturesSection;
