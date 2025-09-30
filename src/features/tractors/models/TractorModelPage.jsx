import './globals.css';
import TittleAndCrumbs from '@/src/components/shared/TittleAndCrumbs/TittleAndCrumbs';
import NavComponents from '../../tyre/NavComponents';
import { getSelectedLanguage } from '@/src/services/locale';
import { getDictionary } from '@/src/lib/dictonaries';
import { isMobileView } from '@/src/utils';
import FooterComponents from '../../tyre/FooterComponents';
import JoinOurCommunityServer from '@/src/components/shared/community/JoinOurCommunityServer';
import WhatsAppTopButton from '../../tyreComponents/commonComponents/WhatsAppTopButton';
import TyreFAQs from '../../tyre/tyreFAQs/TyreFAQs';
import { getModelDetailFAQ } from '@/src/services/tractor/model-detail-faq';
import { getTyreBrands } from '@/src/services/tyre/tyre-brands';
import TractorGyanOfferings from '@/src/components/shared/offerings/TractorGyanOfferings';
import PopularSection from '@/src/components/shared/popularSection/PopularSection';
import TractorDetailsCard from '../TractorDetailsCard';
import TractorDetailsSpecs from './TractorModelSpecs';
import LoanCalculator from '../../loan/loanCalculator/LoanCalculator';
import TractorsByBrands from '@/src/components/tractor/TractorsByBrands';
import { getAllTractorBrands } from '@/src/services/tractor/all-tractor-brands';
import InquireForm from '../../tyreComponents/components/forms/InquireForm';
import TyreRatingAndReviews from '../../tyreComponents/components/tyreRatingAndReviews/TyreRatingAndReviews';
import RelatedTyres from '../../tyre/relatedTyres/RelatedTyres';
import { getOtherTractorModels } from '@/src/services/tractor/other-tractor-models';
import { getTractorDetail } from '@/src/services/tractor/tractor-detail';
import { getSimilarSecondHandTractors } from '@/src/services/tractor/similar-second-hand-tractors';
import SecondHandMiniTractorCards from '@/src/components/ui/cards/secondHandMiniTractorCards/secondHandMiniTractorCards';
import MainHeadings from '../../tyreComponents/commonComponents/MainHeadings';
import { getDetailPageHeaderSEO } from '@/src/services/detailPageHeaderSeo';
import SeoHead from '@/src/components/shared/header/SeoHead';
import {
  getRelatedTractorList,
  getCompareTractorsByHP,
} from '@/src/services/tractor/related-tractors';
import CompareTractorsSlider from '@/src/components/tractor/CompareTractorsSlider';
import { getTractorDealerUrls } from '@/src/services/tractor/get-tractor-dealer-urls';
import TyreDealersByStates from '../../tyre/TyreDealersByStates/TyreDealersByStates';
import { getTractorDetailBrandContent } from '@/src/services/tractor/tractor-detail-brand-content';

export const dynamic = 'force-dynamic';

// Preload critical images
const CRITICAL_IMAGES = [
  'https://images.tractorgyan.com/uploads/120828/68b2a79244bd5-tractor-review-image.webp',
  'https://images.tractorgyan.com/uploads/120363/1754067655Tractor-On-Road-Price.webp',
  'https://images.tractorgyan.com/uploads/120364/1754067673Tractor-On-Road-Price-Mobile.webp'
];

export default async function TractorModelPage({ params }) {
  const currentLang = await getSelectedLanguage();
  const translation = await getDictionary(currentLang);
  const isMobile = await isMobileView();

  // Extract product ID from params
  const { 'brand-name': brandName, modelOrSeries } = await params;
  const productId = modelOrSeries;

  // Parallel data fetching for critical content
  const [tractorDetail, seoData] = await Promise.allSettled([
    getTractorDetail({
      productId: productId,
      lang: currentLang,
    }),
    getDetailPageHeaderSEO({
      page_type: 'tractor_detail',
      id: productId,
      lang: currentLang,
      page_url: `tractor/${brandName}/${productId}`,
    })
  ]).then(([tractorResult, seoResult]) => [
    tractorResult.status === 'fulfilled' ? tractorResult.value : null,
    seoResult.status === 'fulfilled' ? seoResult.value : {}
  ]);

  if (!tractorDetail) {
    return <div>{translation?.error_messages?.tractorNotFound || 'Tractor not found'}</div>;
  }

  // Parallel fetch for secondary data
  const [
    allTractorBrands,
    otherTractorModels,
    tractorDealerStates,
    similarSecondHandTractors,
    compareTractors,
    faqs,
    tyreBrandsData,
    releatedTractors,
    banners,
    tractorDetailTopContent
  ] = await Promise.allSettled([
    getAllTractorBrands(),
    getOtherTractorModels({
      id: tractorDetail.id,
      lang: currentLang,
      startLimit: 0,
      endLimit: 5,
    }),
    getTractorDealerUrls({ brand_name: tractorDetail.brand_name_en, lang: currentLang, isStatePage: true }),
    getSimilarSecondHandTractors({
      productId: productId,
      lang: currentLang,
    }),
    getCompareTractorsByHP({
      productId: tractorDetail.id,
      hp: tractorDetail.hp,
      lang: currentLang,
    }),
    getModelDetailFAQ({
      product_id: tractorDetail.id,
      faq_lang: currentLang,
    }),
    getTyreBrands(),
    getRelatedTractorList({
      productId: tractorDetail.id,
      lang: currentLang,
    }),
    getTractorDetailBrandContent({
      ad_title: `tractor/${brandName}/${productId}`,
      ad_type_image_lang: currentLang,
      device_type: isMobile ? 'mobile' : 'desktop'
    })
  ]).then(results => results.map(result =>
    result.status === 'fulfilled' ? result.value : []
  ));

  const headingTitle = `${tractorDetail.brand} ${tractorDetail.model}`;
  const brand = {
    name: tractorDetail.brand || translation?.common?.unknownBrand || 'Unknown Brand',
  };
  const brand_en = {
    name: tractorDetail.brand_name_en || translation?.common?.unknownBrand || 'Unknown Brand',
  };

  // Process dealer states
  let dealerStates = [];
  const dealerStatesMap = new Map();
  if (tractorDealerStates && tractorDealerStates.length > 0) {
    tractorDealerStates.forEach(dealer => {
      if (!dealerStatesMap.has(dealer.state_name)) {
        dealerStatesMap.set(dealer.state_name, {
          state_name: dealer.state_name,
          page_url: dealer.page_url,
          images: dealer.state_logo,
        });
      }
    });
    dealerStates = Array.from(dealerStatesMap.values());
  }

  const aboutSectionSlot = (
    <div className="p-4 pe-0 border-[1px] border-gray-light rounded-2xl md:max-h-[550px]">
      <div className="pe-4">
        <h2 className="inline-block mb-4 md:mb-6 pb-1 border-secondary border-b-3 font-semibold text-lg lg:text-2xl">
          {`${currentLang == 'en' ? translation?.tractorDetails?.about : ''} ${tractorDetail.brand}  ${tractorDetail.model} ${currentLang == 'hi' ? translation?.tractorDetails?.about : ''}`}
        </h2>
      </div>
      <div className="pe-4 h-full max-h-[360px] md:max-h-[460px] overflow-auto font-normal text-gray-dark text-sm custom-scroller">
        {tractorDetail?.about_tractor ? (
          <div className="tg-html-content">
            <div
              dangerouslySetInnerHTML={{
                __html: isMobile
                  ? tractorDetail.mob_about_tractor || tractorDetail.about_tractor
                  : tractorDetail.about_tractor,
              }}
            />
          </div>
        ) : (
          <DefaultAboutContent tractorDetail={tractorDetail} translation={translation} />
        )}
      </div>
    </div>
  );

  const preloadUrls = [
    ...CRITICAL_IMAGES,
    ...(banners?.banner?.[0]?.image ? [banners.banner[0].image] : [])
  ].filter(Boolean);

  return (
    <main>
      <SeoHead
        seo={{}}
        staticMetadata={{}}
        preloadUrls={preloadUrls}
        seoHTMLDescription={seoData.data}
      />

      <NavComponents translation={translation} isMobile={isMobile} prefLang={currentLang} />

      <div className="mx-auto md:mt-[164px] pt-4 container">
        <div className="mt-2 md:mt-[170px]">
          <TittleAndCrumbs
            showBack={true}
            hideTitle={true}
            {...isMobile && { tooltipContent: generateTooltipContent(tractorDetail, translation) }}
            title={`${tractorDetail.brand} ${tractorDetail.model}`}
            breadcrumbs={generateBreadcrumbs(tractorDetail, translation, currentLang, brand, brand_en)}
          />
        </div>

        <div className="lg:flex gap-8">
          <div className="flex flex-col gap-8 w-full md:w-3/4">
            <TractorDetailsCard
              tractorId={tractorDetail.id}
              tractorDetail={tractorDetail}
              currentLang={currentLang}
              isMobile={isMobile}
              translation={translation}
              primaryBtnText={translation?.buttons?.checkPrice || 'Check Price'}
              secondaryBtnText={`${translation?.buttons?.compare || 'Compare'} ${tractorDetail.brand} ${tractorDetail.model}`}
            />
            <div className="hidden lg:block">{aboutSectionSlot}</div>
          </div>

          <div className="relative w-full md:w-1/4 h-full">
            <TractorDetailsSpecs
              currentLang={currentLang}
              translation={translation}
              tractorDetail={tractorDetail}
              bannerDetail={{
                imgUrl: banners?.banner?.[0]?.image || null,
                imageClasses: 'max-h-[200px]',
                unoptimized: true
              }}
            />
          </div>

          <div className="lg:hidden block">{aboutSectionSlot}</div>
        </div>
      </div>

      {/* Rest of your components remain the same */}
      <div className="mt-10">
        <RelatedTyres
          tyreId={tractorDetail.id}
          tyres={otherTractorModels}
          isMobile={isMobile}
          tyreDetail={tractorDetail}
          translation={translation}
          currentLang={currentLang}
          mode="tractor"
          customHeading={`${translation?.tractorSpecs?.others || 'Others'} ${tractorDetail.brand} ${tractorDetail.model} ${translation?.common?.tractors || 'Tractors'}`}
        />
      </div>

      <LoanCalculator
        title={translation?.emiCalcytranslate?.CalculateEMI || 'Calculate EMI'}
        translation={translation}
        currentLang={currentLang}
        isMobile={isMobile}
        allSectionUse={true}
        bgColor={'bg-white'}
        loanAmount={500000}
      />

      <TyreRatingAndReviews
        reviewData={[]}
        headingTitleKey={'headings.tyreRatingAndReviews'}
        dynamicTitle={`${tractorDetail.brand} ${tractorDetail.model}`}
        translation={translation}
        reviewTitleKey={'headings.tyreUserReview'}
        bgColor={'bg-section-gray'}
        brand={tractorDetail.brand_name_en}
        modelId={tractorDetail.id}
        model={tractorDetail.model_name_en}
        showUserReviewTitle={isMobile}
        isTractorReviewPage={true}
        noReviewImg="https://images.tractorgyan.com/uploads/120828/68b2a79244bd5-tractor-review-image.webp"
      />

      <InquireForm
        translation={translation}
        currentLang={currentLang}
        brandName={tractorDetail.brand + ' ' + tractorDetail.model}
        tyreBrands={allTractorBrands}
        heading={'headings.inquireforTyrePrice'}
        type="TRACTOR"
        preFilledBrand={tractorDetail.brand_name_en}
        preFilledModel={tractorDetail?.model_name_en}
        preFilledModelId={tractorDetail.id}
        imgUrl="https://images.tractorgyan.com/uploads/120363/1754067655Tractor-On-Road-Price.webp"
        mobileImgUrl="https://images.tractorgyan.com/uploads/120364/1754067673Tractor-On-Road-Price-Mobile.webp"
      />

      {compareTractors.length > 0 && (
        <section className="bg-white">
          <div className="container">
            <MainHeadings text={translation?.headings?.compareTractorWith.replace('{modelName}', tractorDetail.brand + ' ' + tractorDetail.model) || 'Compare Tractors'} />
            <CompareTractorsSlider
              cta={translation?.buttons?.compareTractor || 'Compare Tractors'}
              currentTractor={tractorDetail}
              compareTractors={compareTractors}
              isMobile={isMobile}
              tractorBrands={allTractorBrands}
            />
          </div>
        </section>
      )}

      <PopularSection
        heading={`${translation?.common?.similar || 'Related'} ${tractorDetail.brand} ${tractorDetail.model} ${translation?.common?.tractors || 'Tractors'}`}
        popularData={releatedTractors}
        popularDataError={!releatedTractors.length}
        translation={translation}
        langPrefix={currentLang}
        isMobile={isMobile}
        bgColor="bg-section-gray"
        redirectRoute={'/tractors'}
      />

      <SecondHandMiniTractorCards
        heading={`${translation?.common?.similar || 'Similar'} ${tractorDetail.brand} ${tractorDetail.model} ${translation?.footer?.secondHandTractors || 'Second Hand Tractors'}`}
        showEmi={false}
        isMobile={isMobile}
        translation={translation}
        data={similarSecondHandTractors}
        currentLang={currentLang}
      />

      {dealerStates.length > 0 && (
        <TyreDealersByStates
          title={translation.tractorDetails.tractorDealers.replace('{brandName}', `${tractorDetail.brand}`)}
          translation={translation}
          isMobile={isMobile}
          dealerStates={dealerStates}
          buttonText={translation?.tractorOnRoadPrice?.viewAllTractorDealers || 'View All Tractor Dealers'}
          prefLang={currentLang}
        />
      )}

      <TractorsByBrands
        translation={translation}
        langPrefix={currentLang}
        allTractorBrands={allTractorBrands}
      />

      <TyreFAQs
        faqs={faqs}
        translation={translation}
        headingKey={'tractorfaqs.brandTractors'}
        isDynamicTitle={true}
        brandName={tractorDetail.brand + ' ' + tractorDetail.model}
      />

      <JoinOurCommunityServer translation={translation} currentLang={currentLang} />
      <TractorGyanOfferings translation={translation} />
      <FooterComponents translation={translation} />

      <WhatsAppTopButton
        translation={translation}
        currentLang={currentLang}
        tyreBrands={tyreBrandsData}
        defaultEnquiryType={'Tractor'}
        isMobile={isMobile}
        preFilledTractorBrand={tractorDetail.brand_name_en}
        preFilledTractorModelId={tractorDetail.id}
      />
    </main>
  );
}

// Helper Components
function DefaultAboutContent({ tractorDetail, translation }) {
  return (
    <div>
      <p className="mb-3">
        {translation?.tractorDetails?.helpDescription
          ?.replace('{tractorBrand}', tractorDetail.brand)
          ?.replace('{tractorModel}', tractorDetail.model) ||
          `With the help of ${tractorDetail.brand} ${tractorDetail.model}, it's easy for a farmer to move the tractor in a field and use different kinds of implements.`}
      </p>
      {/* Rest of the default content */}
    </div>
  );
}

function generateTooltipContent(tractorDetail, translation) {
  return `${tractorDetail.brand} ${tractorDetail.model} ${translation?.tractorDetails?.tooltipContent?.priceRange || 'Price range is between Rs'} ${tractorDetail.price_range || 'NA'}*. ${tractorDetail.brand} ${tractorDetail.model} ${translation?.tractorDetails?.tooltipContent?.horsepower || 'horsepower is'} ${tractorDetail.hp} ${translation?.tractorSpecs?.hp || 'hp'}. ${translation?.tractorDetails?.tooltipContent?.fuelTank || 'Its Fuel tank capacity is'} ${tractorDetail.fuel_tank_capacity || 'NA'}. ${tractorDetail.brand} ${tractorDetail.model} ${translation?.tractorDetails?.tooltipContent?.hasCylinders || 'has'} ${tractorDetail.cylinder} ${translation?.tractorDetails?.tooltipContent?.cylinders || 'cylinders'}, ${tractorDetail.displacement_cc} ${translation?.tractorDetails?.tooltipContent?.engine || 'engine'}. ${translation?.tractorDetails?.tooltipContent?.otherSpecs || 'Other key specifications include'} ${tractorDetail.pto_hp || 'NA'} PTO ${translation?.tractorSpecs?.hp || 'hp'}, ${tractorDetail.lifting_capacity} ${translation?.tractorDetails?.tooltipContent?.liftingCap || 'lifting capacity'}, ${tractorDetail.number_of_gears} ${translation?.tractorDetails?.tooltipContent?.gears || 'gears'}.`;
}

function generateBreadcrumbs(tractorDetail, translation, currentLang, brand, brand_en) {
  return [
    {
      label: translation?.breadcrubm?.tractorGyanHome,
      href: currentLang == 'hi' ? '/hi' : '/',
      title: translation?.breadcrubm?.tractorGyanHome || 'Home',
    },
    {
      label: translation.breadcrumbs.tractorBrands,
      href: (currentLang == 'hi' ? '/hi' : '') + '/tractor-brands',
      title: translation.breadcrumbs.tractorBrands,
    },
    {
      label: `${brand.name} ${translation?.common?.tractors || 'Tractors'}`,
      href: `${currentLang == 'hi' ? '/hi' : ''}/tractor/${brand_en.name.replaceAll(' ', '-')}`,
      title: `${brand.name} ${translation?.common?.tractors || 'Tractors'}`,
    },
    {
      label: `${tractorDetail.brand} ${tractorDetail.model}`,
      title: `${tractorDetail.brand} ${tractorDetail.model}`,
      isCurrent: true,
    },
  ];
}