import { getSelectedLanguage } from '@/src/services/locale';
import { getDictionary } from '@/src/lib/dictonaries';
import { isMobileView } from '@/src/utils';
import FooterComponents from '../tyre/FooterComponents';
import JoinOurCommunityServer from '@/src/components/shared/community/JoinOurCommunityServer';
import WhatsAppTopButton from '../tyreComponents/commonComponents/WhatsAppTopButton';
import TyreFAQs from '../tyre/tyreFAQs/TyreFAQs';
import { getTyreFAQs } from '@/src/services/tyre/tyre-faq';
import { getTyreBrands } from '@/src/services/tyre/tyre-brands';
import TractorGyanOfferings from '@/src/components/shared/offerings/TractorGyanOfferings';
import AboutTractorGyanServer from '@/src/components/shared/about/AboutTractorGyanServer';
import LoanCalculator from '../loan/loanCalculator/LoanCalculator';
import InquireForm from '../tyreComponents/components/forms/InquireForm';
import TyreRatingAndReviews from '../tyreComponents/components/tyreRatingAndReviews/TyreRatingAndReviews';
import RelatedTyres from '../tyre/relatedTyres/RelatedTyres';
import { getRelatedTractors } from '@/src/services/tractor/related-tractors';
import TittleAndCrumbs from '@/src/components/shared/TittleAndCrumbs/TittleAndCrumbs';
import NavComponents from '../tyre/NavComponents';
import TractorDetailsSpecs from '../tractors/models/TractorModelSpecs';
import {
  tgb_implement_on_road_price,
  tgb_implement_on_road_price_mobile,
} from '@/src/utils/assets/banners';
import { getAllImplementTypes } from '@/src/services/implement/all-implement-types';
import TractorImplementTypes from '@/src/components/shared/tractor-implements/TractorImplementTypes';
import TractorImplementBrands from '@/src/components/shared/tractor-implement-brands/TractorImplementBrands';
import ImplementsCategorySlider from '@/src/components/implements/ImplementsCategorySlider';
import TG_Banner from '@/src/components/shared/bannners/Banner';
import ImplementDetailsCard from './ImplementDetailsCard';
import Link from 'next/link';
import Image from 'next/image';

export const dynamic = 'force-dynamic';
export default async function TractorImplementDetailPage({ params }) {
  const currentLang = await getSelectedLanguage(); // Server-side language detection
  const translation = await getDictionary(currentLang);

  const isMobile = await isMobileView(); // Server-side mobile detection

  const pageSlug = 'tractor/mahindra-575-di-xp-plus/440';
  const pageSlugTemp = 'tyres'; // Temporary as data is not fetched for above slug

  // const params = await searchParams;
  const headingTitle = 'John Deere Single Bottom MB Plough (MB3001M)';
  const brand = { name: 'John Deere' };

  const allImplementTypes = await getAllImplementTypes();

  const currentDate = new Date()
    .toLocaleDateString('en-GB', {
      month: 'short',
      year: 'numeric',
      day: 'numeric',
    })
    .replace(/,/g, '');

  const implementCategories = [
    { title: 'Fertilizer', url: 'tractor-implements/category/crop-protection' },
    { title: 'Brush Cutter', url: 'tractor-implements/category/crop-protection' },
    { title: 'Crop Protection', url: 'tractor-implements/category/crop-protection' },
    { title: 'Brush Cutter', url: 'tractor-implements/category/crop-protection' },
    { title: 'Crop Protection', url: 'tractor-implements/category/crop-protection' },
    { title: 'Harvest', url: 'tractor-implements/category/crop-protection' },
    { title: 'Brush Cutter', url: 'tractor-implements/category/crop-protection' },
    { title: 'Crop Protection', url: 'tractor-implements/category/crop-protection' },
    { title: 'Tillage', url: 'tractor-implements/category/crop-protection' },
  ];

  const allImplementBrands = [
    {
      title: 'Agristar',
      imgSrc: 'https://images.tractorgyan.com/uploads/implement_brand_logo/agristar.jpg',
      url: '/tractor-implements/agristar',
    },
    {
      title: 'Escorts',
      imgSrc:
        'https://images.tractorgyan.com/uploads/114335/66b48e312a1a7-escorts-Kubota-200x200-logo-01.png',
      url: '/tractor-implements/agristar',
    },
    {
      title: 'John Deere',
      imgSrc:
        'https://images.tractorgyan.com/uploads/115006/66e14394f37e9-john-deere-implement-logo.webp',
      url: '/tractor-implements/agristar',
    },
    {
      title: 'Agristar',
      imgSrc: 'https://images.tractorgyan.com/uploads/implement_brand_logo/agristar.jpg',
      url: '/tractor-implements/agristar',
    },
    {
      title: 'Escorts',
      imgSrc:
        'https://images.tractorgyan.com/uploads/114335/66b48e312a1a7-escorts-Kubota-200x200-logo-01.png',
      url: '/tractor-implements/agristar',
    },
    {
      title: 'John Deere',
      imgSrc:
        'https://images.tractorgyan.com/uploads/115006/66e14394f37e9-john-deere-implement-logo.webp',
      url: '/tractor-implements/agristar',
    },
    {
      title: 'Agristar',
      imgSrc: 'https://images.tractorgyan.com/uploads/implement_brand_logo/agristar.jpg',
      url: '/tractor-implements/agristar',
    },
    {
      title: 'Escorts',
      imgSrc:
        'https://images.tractorgyan.com/uploads/114335/66b48e312a1a7-escorts-Kubota-200x200-logo-01.png',
      url: '/tractor-implements/agristar',
    },
    {
      title: 'John Deere',
      imgSrc:
        'https://images.tractorgyan.com/uploads/115006/66e14394f37e9-john-deere-implement-logo.webp',
      url: '/tractor-implements/agristar',
    },
    {
      title: 'John Deere',
      imgSrc:
        'https://images.tractorgyan.com/uploads/115006/66e14394f37e9-john-deere-implement-logo.webp',
      url: '/tractor-implements/agristar',
    },
  ];

  const implementId = '13'; // 440

  const implementDetail = {
    name: 'John Deere Single Bottom MB Plough (MB3001M)',
    model_name: 'Single Bottom MB Plough (MB3001M)',
    brand_name: 'John Deere',
    power: '31.33 kW',
    warranty: '2100 Hours or 2 Years',
    images: ['113635/66823ed511fcb-john-deere-single-bottom-mb-plough1.webp'],
    brand_logo:
      'https://images.tractorgyan.com/uploads/115006/66e14394f37e9-john-deere-implement-logo.webp',
    features: ['This is a test feature', 'This is another feature', 'Third feature'],
  };

  const subModels = [
    {
      size: '6 Feet Model',
      specs: {
        '3 Point Linkage': '“Pyramid Type” for Strength',
        'Type of Blade': 'L Type “Japanese Technology”',
        'No. Of Blades': '42',
        'Rotor Shaft Pipe': 'FarmPower Uses Only High Grade “Seamless Pipe”',
        'Suitable Tractor': '40-50 HP',
      },
    },
    {
      size: '7 Feet Model',
      specs: {
        '3 Point Linkage': '“Pyramid Type” for Strength',
        'Type of Blade': 'L Type “Japanese Technology”',
        'No. Of Blades': '48',
        'Rotor Shaft Pipe': 'FarmPower Uses Only High Grade “Seamless Pipe”',
        'Suitable Tractor': '45-55 HP',
      },
    },
    {
      size: '8 Feet Model',
      specs: {
        '3 Point Linkage': '“Pyramid Type” for Strength',
        'Type of Blade': 'L Type “Japanese Technology”',
        'No. Of Blades': '54',
        'Rotor Shaft Pipe': 'FarmPower Uses Only High Grade “Seamless Pipe”',
        'Suitable Tractor': '55-65 HP',
      },
    },
  ];

  const relatedTractors = await getRelatedTractors({ implementId });

  // TODO:: WIP - Tractor About Section
  const aboutSectionSlot = (
    <div className="rounded-2xl border-[1px] border-gray-light p-4 pe-0 md:max-h-[468px]">
      <div className="pe-4">
        <h2 className="border-b-3 mb-4 inline-block border-secondary pb-1 text-lg font-semibold md:mb-6 lg:text-2xl">
          About {` ${implementDetail.brand_name}  ${implementDetail.model_name}`}
        </h2>
      </div>
      <div className="custom-scroller h-full max-h-[160px] overflow-auto pe-4 text-sm font-normal text-gray-dark md:max-h-[340px]">
        {implementDetail?.about_tractor && implementDetail.dynamic_content === 'No' ? (
          <div>{implementDetail.about_tractor}</div>
        ) : (
          <div>
            <p className="mb-3">
              With the help of {`${implementDetail.brand_name} ${implementDetail.model_name}`}, it's
              easy for a farmer to move the tractor in a field and use different kinds of
              implements.
            </p>
            <p className="mb-3">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis, assumenda
              expedita sunt libero delectus reiciendis omnis laborum aut iste aspernatur modi
              adipisci, necessitatibus quis accusamus at blanditiis? Possimus, sequi officiis?
            </p>
            <p className="mb-3">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis, assumenda
              expedita sunt libero delectus reiciendis omnis laborum aut iste aspernatur modi
              adipisci, necessitatibus quis accusamus at blanditiis? Possimus, sequi officiis?
            </p>
            <p className="mb-3">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis, assumenda
              expedita sunt libero delectus reiciendis omnis laborum aut iste aspernatur modi
              adipisci, necessitatibus quis accusamus at blanditiis? Possimus, sequi officiis?
            </p>
            <p className="mb-3">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis, assumenda
              expedita sunt libero delectus reiciendis omnis laborum aut iste aspernatur modi
              adipisci, necessitatibus quis accusamus at blanditiis? Possimus, sequi officiis?
            </p>
            <ul className="mb-3 flex list-disc flex-col gap-3 ps-4">
              <li>
                This tractor tyre is designed to carry heavy loads without any hassle. Farmers can
                attach compatible implements with the tractor using this tractor tyre and use them.
              </li>
            </ul>
            <p className="mb-3">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non modi nobis perspiciatis
              delectus aliquid velit vero fugit voluptatibus eveniet? Velit veniam minus dolorum
              animi assumenda aspernatur eum laboriosam ipsa pariatur.
            </p>
          </div>
        )}
      </div>
    </div>
  );

  const SubModelsTable = () => {
    return (
      <div>
        <div className="rounded-t-xl bg-black py-3 text-center text-lg font-semibold text-white">
          John Deere Plough Models
        </div>
        <div className="rounded-b-xl border border-gray-light">
          {subModels.map((model, idx) => (
            <div key={idx} className="border-t border-gray-light">
              <div className="bg-section-gray px-4 py-2 text-center text-sm font-medium">
                {model.size}
              </div>
              <div>
                {Object.entries(model.specs).map(([label, value], i, arr) => (
                  <div
                    key={i}
                    className={`${i === arr.length - 1 ? '' : 'border-b'} flex border-gray-light px-2 md:px-4`}
                  >
                    <div className="w-2/5 border-r border-gray-light py-2 text-xs font-medium md:text-sm">
                      {label}
                    </div>
                    <div className="w-3/5 py-2 pl-4 text-xs text-gray-description md:text-sm">
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const faqs = await getTyreFAQs({
    langPrefix: currentLang,
    slug: pageSlugTemp,
    // slug: pageSlug,
  });

  const tyreBrandsData = await getTyreBrands();

  return (
    <main>
      <NavComponents translation={translation} isMobile={isMobile} prefLang={currentLang} />
      {/* TODO:: Setup Common Layout Class */}
      <div className="container mx-auto !pt-4 md:mt-[164px]">
        <TittleAndCrumbs
          showBack={true}
          breadcrumbs={[
            { label: 'Home', href: '/', title: 'Home' },
            {
              label: 'Tractor Implements',
              href: '/tractor-brands',
              title: 'Tractor Implements',
            },
            {
              label: `${brand.name} Implements`,
              title: `${brand.name} Implements`,
            },
            {
              label: `${implementDetail.model_name}`,
              title: `${implementDetail.model_name}`,
              isCurrent: true,
            },
          ]}
        />
        {/* TODO:: WIP - Implement Model Detail Section */}
        <div className="gap-8 lg:flex">
          <div className="flex w-full flex-col gap-8 md:w-3/4">
            <ImplementDetailsCard
              implementId={implementId}
              implementDetail={implementDetail}
              currentLang={currentLang}
              isMobile={isMobile}
              translation={translation}
            />
            {aboutSectionSlot}
            <SubModelsTable />
          </div>
          <div className="relative mt-4 h-full w-full md:w-1/4">
            <TG_Banner
              imgUrl={'https://placehold.co/300x200/00522e/FFF?text=Custom+Ad+Banner+300x200'}
              mobileImgUrl={'https://placehold.co/300x200/00522e/FFF?text=Custom+Ad+Banner+300x200'}
              imageClasses="max-h-[200px]"
              unoptimized={true}
            />
            <TractorDetailsSpecs translation={translation} tractorDetail={implementDetail} />
            <div className="mt-1.5 text-center">
              <span className="mx-auto text-sm text-gray-main">
                {translation?.headings?.dataLastUpdatedOn || 'Data last updated on'}:{' '}
                {currentDate}{' '}
              </span>
            </div>
            <div className="mt-4 flex w-full justify-center">
              <Link
                href={'https://tractorgyan.com/tractors'}
                className="hidden h-full max-h-[526px] w-full max-w-[270px] overflow-hidden rounded-2xl lg:block"
              >
                <Image
                  src={
                    'https://images.tractorgyan.com/uploads/118099/67c1903aa3cb5-Implement-Listing-Banner-Desk.webp'
                  }
                  height={200}
                  width={200}
                  alt="All Tractor Page Banner"
                  title="All Tractor Page Banner"
                  className="h-full w-full object-contain object-center"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 md:mt-10">
        <RelatedTyres
          tyreId={implementId}
          tyres={relatedTractors}
          isMobile={isMobile}
          tyreDetail={implementDetail}
          translation={translation}
          currentLang={currentLang}
        />
      </div>

      <LoanCalculator
        title={'Calculate EMI'}
        translation={translation}
        currentLang={currentLang}
        isMobile={isMobile}
        allSectionUse={true}
        bgColor={'bg-white'}
      />

      <TyreRatingAndReviews
        reviewData={[]}
        headingTitleKey={'headings.tyreRatingAndReviews'}
        dynamicTitle={`test`}
        translation={translation}
        reviewTitleKey={'headings.tyreUserReview'}
        bgColor={'bg-section-gray'}
        brand={brand}
        modelId={implementId}
        model={implementDetail.model_name}
        // TODO:: Update No Review Image
        noReviewImg="https://images.tractorgyan.com/uploads/117235/6773e5b906cbc-no-review-card.webp"
      />

      {/* TODO:: Update it to make it generic */}
      <InquireForm
        translation={translation}
        currentLang={currentLang}
        brandName={brand.name}
        tyreBrands={tyreBrandsData}
        heading={'headings.inquireforTyrePrice'}
        banner={tgb_implement_on_road_price}
        mobileBanner={tgb_implement_on_road_price_mobile}
        submitBtnText="Send Enquiry"
      />

      <TractorImplementTypes
        heading="Implements By Types"
        allImplementTypes={allImplementTypes}
        floatingBg={true}
        slider={true}
        isMobile={isMobile}
      />

      <TractorImplementBrands
        bgColor={'bg-section-gray'}
        heading="Implements By Brands"
        allImplementBrands={allImplementBrands}
        itemsShown={isMobile ? 9 : 12}
      />

      <ImplementsCategorySlider
        isMobile={isMobile}
        heading="Implement By Category"
        categories={implementCategories}
      />

      <TyreFAQs faqs={faqs} translation={translation} headingKey={'tyrefaqs.allTractorTyres'} />

      <JoinOurCommunityServer translation={translation} currentLang={currentLang} />

      <TractorGyanOfferings translation={translation} />

      <AboutTractorGyanServer slug={'tyres'} translation={translation} />

      <FooterComponents translation={translation} />

      <WhatsAppTopButton
        translation={translation}
        currentLang={currentLang}
        tyreBrands={tyreBrandsData}
        defaultEnquiryType={'Tyre'}
      />
    </main>
  );
}
