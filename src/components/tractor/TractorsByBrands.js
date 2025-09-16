import BrandCards from '@/src/features/tyreComponents/components/tractorsByBrands/BrandCards';
import MainHeadings from '@/src/features/tyreComponents/commonComponents/MainHeadings';
import React from 'react';
import MainButton from '@/src/features/tyreComponents/commonComponents/buttons/MainButton';

const TractorsByBrands = ({
  heading,
  allTractorBrands,
  translation,
  langPrefix,
  cta,
  bgColor = '"bg-white',
}) => {
  return (
    <section className={bgColor}>
      <div className="container">
        {heading ? (
          <MainHeadings text={heading} />
        ) : (
          <MainHeadings text={translation.headings.tractorsbyBrands} />
        )}

        <div className="-mx-2 mb-4 flex flex-wrap justify-between md:-mx-4 md:mb-8 md:flex-nowrap">
          {allTractorBrands?.slice(0, 9).map((item, index) => (
            <div className="md:basis-1/9 basis-1/3 px-2 md:px-4">
              <BrandCards
                imgUrl={item.image}
                name={langPrefix == 'hi' ? item.name_hi : item.name}
                key={index}
                url={(langPrefix == 'hi' ? '/hi' : '') + item.url}
              />
            </div>
          ))}
        </div>
        <MainButton
          text={cta ? cta : translation.buttons.viewAllTractorbrands}
          linkUrl={`${langPrefix == 'en' ? '/' : '/' + langPrefix + '/'}tractor-brands`}
        />
      </div>
    </section>
  );
};

export default TractorsByBrands;
