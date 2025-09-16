import Link from 'next/link';
import React from 'react';
import DroneDetailsClientInteractions from './DroneDetailsClientInteractions'; // Import the new client component
import TittleAndCrumbs from '@/src/components/shared/TittleAndCrumbs/TittleAndCrumbs';

const DroneDetailsAndFeatures = ({
  tyreId,
  tyreDetail,
  prefLang,
  isMobile,
  headingTitle,
  translation,
  brandSlug,
}) => {
  if (!tyreDetail) {
    // TODO: Proper loading state or not found component
    return (
      <section className="lg:mt-[144px]">
        <div className="container relative">
          <p>
            {translation?.error_messages?.loadingTyreDetails ||
              'Loading tyre details or tyre not found...'}
          </p>
        </div>
      </section>
    );
  }

  const features = tyreDetail?.feature ? tyreDetail.feature.split('\r\n') : [];

  // helper
  const fullName = `${'Garuda Aerospace'} ${'Droni Drone'}`

  // Function to render content based on language preference 
  const renderAboutContent = () => {
    if (tyreDetail?.about_tyre && tyreDetail.dynamic_content === 'No') {
      return <div>{tyreDetail.about_tyre}</div>;
    }

    const ns = translation?.droneDetail;

    //  Hindi content
    if (prefLang === 'hi' && ns) {
      return (
        <div>
          <h3 className="mb-3 text-base font-semibold text-secondary">
            {ns.aboutHeading?.replace('{fullName}', fullName) ||
              `भारत में ${fullName} के बारे में`}
          </h3>
          <p className="mb-3">
            {ns.aboutDescription?.replaceAll('{fullName}', fullName)}
          </p>

          <h3 className="mb-3 text-base font-semibold text-secondary">
            {ns.priceHeading?.replace('{fullName}', fullName) ||
              `भारत में 2025 में ${fullName} की कीमत क्या है?`}
          </h3>
          <p className="mb-3">
            {ns.priceDescription?.replaceAll('{fullName}', fullName)}
          </p>

          <h3 className="mb-3 text-base font-semibold text-secondary">
            {ns.dealerHeading?.replace('{fullName}', fullName) ||
              `मेरे पास ${fullName} डीलर खोजें`}
          </h3>
          <p className="mb-3">
            {ns.dealerDescription?.replaceAll('{fullName}', fullName)}
          </p>
        </div>
      );
    }

    //  English content
    return (
      <div>
        <h3 className="mb-3 text-base font-semibold text-secondary">
          {ns?.aboutHeading?.replace('{fullName}', fullName) ||
            `About ${fullName} in India`}
        </h3>
        <p className="mb-3">
          {ns?.aboutDescription?.replaceAll('{fullName}', fullName) ||
            `The top-performing ${fullName} is changing Indian agriculture by solving numerous farming difficulties. Its innovative technology and simple design make spraying precise and effortless. It also monitors crops and saves money over time. No matter how big or small your farm is, the ${fullName} is a good way to get more done while also being good for the environment.`}
        </p>

        <h3 className="mb-3 text-base font-semibold text-secondary">
          {ns?.priceHeading?.replace('{fullName}', fullName) ||
            `What is the ${fullName} Price in India in 2025?`}
        </h3>
        <p className="mb-3">
          {ns?.priceDescription?.replaceAll('{fullName}', fullName) ||
            `In India in 2025, the price of the ${fullName} will depend on where you live, how much the dealer charges, and the specifications of the drone. Farmers can receive incentives and support to fund their investments through government initiatives like the Agricultural Infrastructure Fund (AIF). Find an approved dealer nearby for the latest pricing.`}
        </p>

        <h3 className="mb-3 text-base font-semibold text-secondary">
          {ns?.dealerHeading?.replace('{fullName}', fullName) ||
            `Locate a ${fullName} Dealer Near Me`}
        </h3>
        <p className="mb-3">
          {ns?.dealerDescription?.replaceAll('{fullName}', fullName) ||
            `${fullName}s in India are accessible with a wide dealer network. All these dealers can help you buy the drone with genuine parts and great after-sale services. TractorGyan can also help you find a reliable brand-name drone dealer in any state through our dealer listing page.`}
        </p>
      </div>
    );
  };

  const aboutSectionSlot = (
    <div className="rounded-2xl border-[1px] border-gray-light p-4 pe-0 md:max-h-[468px]">
      <div className="pe-4">
        <h2 className="border-b-3 mb-6 inline-block border-secondary pb-1 text-lg font-semibold lg:text-2xl">
          {prefLang === 'hi' && translation?.droneDetail
            ? translation.droneDetail.aboutHeading?.replace('{fullName}', fullName) ||
            `${fullName} ${translation.droneDetail.about || 'के बारे में'}`
            : translation?.droneDetail?.aboutHeading?.replace('{fullName}', fullName) ||
            `${translation?.droneDetail?.about || 'About'} ${fullName}`}
        </h2>
      </div>
      <div className="custom-scroller h-full max-h-[340px] overflow-auto pe-4 text-sm font-normal text-gray-dark">
        {renderAboutContent()}
      </div>
    </div>
  );


  return (
    <section className="lg:mt-[144px]">
      <div className="container relative">
        <TittleAndCrumbs
          showBack={true}
          hideTitle={true}
          // title={`${tyreDetail.brand_name}  ${tyreDetail.model_name}`}
          breadcrumbs={[
            {
              label: translation.breadcrubm.home,
              href: prefLang === 'hi' ? '/hi' : '/',
              title: translation.breadcrubm.home,
            },
            {
              label: translation.breadcrubm.droneBrands,
              href: prefLang === 'hi' ? '/hi/drone-brands' : '/drone-brands',
              title: translation.breadcrubm.droneBrands,
            },
            {
              label: translation.breadcrubm.brandDrones.replace('{brand}', 'Garuda Aerospace'),
              href: `${prefLang === 'hi' ? '/hi' : ''}/drone/garuda-aerospace`,
              title: translation.breadcrubm.brandDrones.replace('{brand}', 'Garuda Aerospace'),
            },
            // {
            //   label: translation.breadcrubm.brandTyres.replace('{brand}', tyreDetail.brand_name),
            //   href: `${prefLang === 'hi' ? '/hi' : ''}/tyre/${brandSlug.split('-')[0]}-tractor-tyre-in-india`,
            //   title: translation.breadcrubm.brandTyres.replace('{brand}', tyreDetail.brand_name),
            // },
            {
              label: `${'Garuda Aerospace'} ${'Droni Drone'}`,
              title: `${'Garuda Aerospace'} ${'Droni Drone'}`,
              isCurrent: true,
            },
            // {
            //   label: `${tyreDetail.brand_name}  ${tyreDetail.model_name}`,
            //   title: `${tyreDetail.brand_name}  ${tyreDetail.model_name}`,
            //   isCurrent: true,
            // },
          ]}
        />
        {/* Breadcrumbs remain server-rendered */}

        {/* All interactive elements and their layout are now delegated to the client component */}
        <DroneDetailsClientInteractions
          translation={translation}
          tyreId={tyreId}
          tyreDetail={tyreDetail}
          features={features}
          aboutSectionSlot={aboutSectionSlot} // Pass the server-rendered "About" section
        />
      </div>
    </section>
  );
};

export default DroneDetailsAndFeatures;
