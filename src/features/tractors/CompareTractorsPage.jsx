import TittleAndCrumbs from '@/src/components/shared/TittleAndCrumbs/TittleAndCrumbs';
import NavComponents from '../tyre/NavComponents';
import { getSelectedLanguage } from '@/src/services/locale';
import { getDictionary } from '@/src/lib/dictonaries';
import { isMobileView } from '@/src/utils';
import WhatsAppTopButton from '../tyreComponents/commonComponents/WhatsAppTopButton';
import FooterComponents from '../tyre/FooterComponents';
import TractorGyanOfferings from '@/src/components/shared/offerings/TractorGyanOfferings';
import JoinOurCommunityServer from '@/src/components/shared/community/JoinOurCommunityServer';
import AboutTractorGyanServer from '@/src/components/shared/about/AboutTractorGyanServer';
import TractorsByBrands from '@/src/components/tractor/TractorsByBrands';
import { getAllTractorBrands } from '@/src/services/tractor/all-tractor-brands';
import PopularSection from '@/src/components/shared/popularSection/PopularSection';
import { getTractorPopularDetails } from '@/src/services/tractor/tractor-popular-details';
import { getAllTractorSubsidyStates } from '@/src/services/geo/get-subsidy-states';
import CompareTractorsSection from '@/src/components/tractor/CompareTractorsSection';
import EnhancedCompareTractorsSection from '@/src/components/tractor/EnhancedCompareTractorsSection';
import TractorComparisonDisplay from '@/src/components/tractor/TractorComparisonDisplay';
import Image from 'next/image';
import TG_Banner from '@/src/components/shared/bannners/Banner';
import MainHeadings from '../tyreComponents/commonComponents/MainHeadings';
import CompareTractorsFeaturesSection from '@/src/components/tractor/CompareTractorsFeaturesSection';
import SocialMediaLinksShare from '@/src/components/shared/social-media/SocialMediaShare';
import TyreDealersByStates from '../tyre/TyreDealersByStates/TyreDealersByStates';

export default async function CompareTractorsPage({ params }) {
  const currentLang = await getSelectedLanguage(); // Server-side language detection
  const translation = await getDictionary(currentLang);

  const isMobile = await isMobileView(); // Server-side mobile detection
  const allTractorBrands = await getAllTractorBrands();
  const popularTractors = await getTractorPopularDetails(currentLang);

  const payload = {
    pageSlug: 'tractor-dealers',
  };
  const dealerStates = await getAllTractorSubsidyStates(payload);

  // Check if this is a comparison result page or main selection page
  const isComparisonPage = params?.slug && params.slug.length > 0;
  const compareUrl = isComparisonPage ? params.slug.join('/') : '';

  // Generate page title based on whether it's comparison or main page
  const generatePageTitle = url => {
    if (!url) return translation?.headerNavbar?.compareTractor || 'Compare Tractors';

    const parts = url.split('-vs-');
    const tractorNames = parts.map(part =>
      part
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    );

    return `${tractorNames.join(' vs ')} - ${translation?.headerNavbar?.compareTractor || 'Compare Tractors'}`;
  };

  const pageTitle = generatePageTitle(compareUrl);

  // Generate breadcrumbs based on page type
  const breadcrumbs = [
    {
      label: translation?.breadcrumbs?.home || 'Home',
      href: '/',
      title: translation?.breadcrumbs?.home || 'Home',
    },
    {
      label: translation?.headerNavbar?.compareTractor || 'Compare Tractors',
      href: '/compare-tractors',
      title: translation?.headerNavbar?.compareTractor || 'Compare Tractors',
      isCurrent: !isComparisonPage,
    },
  ];

  if (isComparisonPage) {
    breadcrumbs.push({
      label: pageTitle,
      title: pageTitle,
      isCurrent: true,
    });
  }

  const compareFeaturesData = [
    {
      title: 'Engine',
      headers: ['Name of the Engine', 'SIMPSONS S325.1 TIII A', 'SIMPSONS S325.1 TIII A'],
      features: [1, 2, 3, 4, 5],
    },
    {
      title: 'Transmission',
      headers: ['Name of the Transmission', 'SIMPSONS S325.1 TIII A', 'SIMPSONS S325.1 TIII A'],
      features: [1, 2, 3, 4, 5, 6, 7],
    },
    {
      title: 'PTO',
      headers: ['PTO HP', 'SIMPSONS S325.1 TIII A', 'SIMPSONS S325.1 TIII A'],
      features: [1, 2, 3],
    },
  ];

  const aboutSectionSlot = (
    <div className="rounded-2xl border-[1px] border-gray-light p-4 pe-0 md:max-h-[468px]">
      <div className="pe-4">
        <h2 className="border-b-3 mb-6 inline-block border-secondary pb-1 text-lg font-semibold lg:text-2xl">
          Sonalika DI 47 RX v/s New holland 4710 4WD
        </h2>
      </div>
      <div className="custom-scroller h-full max-h-[340px] overflow-auto pe-4 text-sm font-normal text-gray-dark">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium quidem doloribus veniam
        corporis recusandae excepturi exercitationem cum modi rerum! Tenetur quo iste nobis velit
        adipisci sunt blanditiis maxime labore perspiciatis.
      </div>
      <button className="text-medium mt-3 flex items-center gap-2 text-sm">
        Read More
        <span>
          <Image
            src="https://images.tractorgyan.com/uploads/117142/676901b0c9bf7-gray-arrow.webp"
            height={20}
            width={20}
            alt="toggle-button-icon"
            title="toggle-button-icon"
            className="h-auto w-3"
          />
        </span>
      </button>
    </div>
  );

  return (
    <main className="tt-4 md:mt-[164px]">
      {/* TODO:: Setup Common Layout Class */}
      <NavComponents translation={translation} isMobile={isMobile} prefLang={currentLang} />
      <div className="container mx-auto">
        <TittleAndCrumbs title={pageTitle} breadcrumbs={breadcrumbs} />

        {!isComparisonPage && (
          <TG_Banner
            imgUrl={
              'https://images.tractorgyan.com/uploads/120275/1753706468Compare-Tractors-Desktop.webp'
            }
            mobileImgUrl={
              'https://images.tractorgyan.com/uploads/120276/1753706483Compare-Tractors-Mobile.webp'
            }
            title={translation?.headerNavbar?.compareTractor || 'Compare Tractors'}
            additionalClasses={'mb-6 md:mb-10'}
            pageUrl={'/'}
          />
        )}
      </div>

      {/* Conditional Content Based on Page Type */}
      {isComparisonPage ? (
        /* Comparison Results Page */
        <>
          {/* Main Comparison Display */}
          <section className="bg-white py-8">
            <div className="container">
              {compareUrl ? (
                <TractorComparisonDisplay compareUrl={compareUrl} translation={translation} />
              ) : (
                <div className="flex h-64 items-center justify-center">
                  <div className="text-center">
                    <h2 className="text-gray-600 mb-4 text-xl font-semibold">
                      {translation?.headerNavbar?.noTractorsSelected ||
                        'No tractors selected for comparison'}
                    </h2>
                    <p className="text-gray-500">
                      {translation?.headerNavbar?.pleaseSelectTractors ||
                        'Please select tractors from the compare section below'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Social Share */}
          <section className="bg-section-gray py-4">
            <div className="container">
              <div className="flex items-center justify-center gap-4">
                <span className="font-medium">
                  {translation?.headerNavbar?.shareThisComparison || 'Share this comparison:'}:
                </span>
                <SocialMediaLinksShare direction="flex-row" />
              </div>
            </div>
          </section>

          {/* Compare More Tractors */}
          <section className="bg-section-gray py-8">
            <div className="container">
              <EnhancedCompareTractorsSection
                heading={translation?.headerNavbar?.compareMoreTractors || 'Compare More Tractors'}
                cta={translation?.headerNavbar?.compareTractor || 'Compare Tractors'}
                bgColor="bg-white"
                translation={translation}
              />
            </div>
          </section>
        </>
      ) : (
        /* Main Selection Page */
        <section className="bg-section-gray py-8">
          <div className="container flex justify-between">
            <div className="hidden flex-col justify-center gap-4 pr-4 font-medium md:flex">
              Share
              <SocialMediaLinksShare direction="flex-col" />
            </div>
            <div className="w-full">
              <EnhancedCompareTractorsSection
                heading={translation?.headerNavbar?.compareTractor || 'Compare Tractors'}
                cta={translation?.headerNavbar?.compareTractor || 'Compare Tractors'}
                bgColor="bg-white"
                viewMode={false}
                allowChange={true}
                translation={translation}
                itemsToShow={3}
              />
            </div>
          </div>
        </section>
      )}

      {/* Common Sections for Both Pages */}
      <PopularSection
        langPrefix={currentLang}
        popularData={popularTractors}
        isMobile={isMobile}
        translation={translation}
        bgColor={isComparisonPage ? 'bg-white' : 'bg-section-gray'}
        redirectRoute="/tractors"
      />

      <TractorsByBrands
        translation={translation}
        langPrefix={currentLang}
        allTractorBrands={allTractorBrands}
      />

      <TyreDealersByStates
        title="Select Tyre Dealers by State"
        translation={translation}
        isMobile={isMobile}
        dealerStates={dealerStates}
        buttonText={'View All States'}
      />

      <JoinOurCommunityServer translation={translation} currentLang={currentLang} />

      <TractorGyanOfferings translation={translation} />

      <AboutTractorGyanServer slug={'tyres'} translation={translation} />

      <FooterComponents translation={translation} />

      <WhatsAppTopButton
        translation={translation}
        currentLang={currentLang}
        defaultEnquiryType={'Tractor'}
      />
    </main>
  );
}
