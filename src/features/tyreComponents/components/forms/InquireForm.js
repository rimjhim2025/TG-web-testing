'use client';
import MainHeadings from '@/src/features/tyreComponents/commonComponents/MainHeadings';
import SubmitOtpForm from '@/src/features/tyreComponents/commonComponents/submitOtpForm/SubmitOtpForm';
import { fetchData, postData } from '@/src/services/apiMethods';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { getTyreModal } from '@/src/services/tyre/tyre-modal';
import { getAllTractorModels } from '@/src/services/tractor/all-tractor-models';
import { getAllStates } from '@/src/services/tyre/all-state';
import { getFetchDistricts } from '@/src/services/tyre/all-distric';
import { getFetchTehsil } from '@/src/services/tyre/all-tehsil';
import { tg_getTittleFromNestedKey } from '@/src/utils';
import { tgi_arrow_right } from '@/src/utils/assets/icons';
import { getAllImplementBrandListing } from '@/src/services/implement/get-all-implement-brand-listing';
import { getImplementEnquiryTypeId } from '@/src/services/implement/get-implement-enquiry-type-id';
import { getAllImplementTypes } from '@/src/services/implement/all-implement-types';

const TyrePriceInquireForm = ({
  hideBanner = false,
  bgColor = 'bg-white',
  formTitle,
  heading,
  tyreBrands,
  currentLang,
  translation,
  brandName,
  banner,
  mobileBanner,
  submitBtnText,
  type = 'TYRE',
  preFilledBrand,
  preFilledModel,
  preFilledModelId,
  imgUrl,
  mobileImgUrl,
  isMobile,
  pageName,
  pageSource,
  implementType,
  implementTypeId,
  implementDetail,
  showImplementTypeSelector = false
}) => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    selectedBrand: '',
    selectedModel: '',
    selectedState: '',
    selectedDistrict: '',
    selectedTehsil: '',
    selectedImplementType: '',
    product_id: ''
  });

  // UI state
  const [tyreModels, setTyreModels] = useState([]);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [tehsils, setTehsils] = useState([]);
  const [implementTypes, setImplementTypes] = useState([]);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [existVerified, setExistVerified] = useState('');
  const [otp, setOtp] = useState('');
  const [primaryId, setPrimaryId] = useState(null);
  const [typeId, setTypeId] = useState('');

  // Memoize heading title
  const headingTitle = useMemo(() => {
    let title = brandName ? tg_getTittleFromNestedKey(translation, heading) : heading;
    if (brandName || brandName === '') {
      title = title.replace('{brand}', brandName);
    }
    return title;
  }, [translation, heading, brandName]);

  // Memoize banner image
  const bannerImage = useMemo(() => {
    // Check for custom banner images first (for tractor)
    if (imgUrl && mobileImgUrl) {
      return isMobile ? mobileImgUrl : imgUrl;
    }

    if (isMobile) {
      return mobileBanner || (currentLang === 'hi'
        ? 'https://images.tractorgyan.com/uploads/118037/67b854179ace3-tyre-price-banner-mobile-hindi.webp'
        : 'https://images.tractorgyan.com/uploads/118035/67b85199eab88-tyre-price-banner.webp');
    } else {
      return banner || (currentLang === 'hi'
        ? 'https://images.tractorgyan.com/uploads/118038/67b8544f51f8e-Tyre-price-banner-desktop-hindi.webp'
        : 'https://images.tractorgyan.com/uploads/118036/67b851edaf33b-tyre-desktop-banner.webp');
    }
  }, [isMobile, banner, mobileBanner, currentLang, imgUrl, mobileImgUrl]);

  // Update form data helper
  const updateFormData = useCallback((updates) => {
    setFormData(prev => ({ ...prev, ...updates }));
  }, []);

  // Auto-clear error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // Set pre-filled values
  useEffect(() => {
    const updates = {};
    if (type === 'IMPLEMENT' && implementDetail) {
      updates.selectedBrand = implementDetail.brand_name_en;
      updates.selectedModel = implementDetail.model;
      updates.product_id = implementDetail.id;
    } else if (preFilledBrand) {
      updates.selectedBrand = preFilledBrand;
    }
    updateFormData(updates);
  }, [preFilledBrand, type, implementDetail, updateFormData]);

  // Fetch implement types
  useEffect(() => {
    const fetchImplementTypes = async () => {
      if (type === 'IMPLEMENT' && showImplementTypeSelector) {
        try {
          const data = await getAllImplementTypes();
          setImplementTypes(data || []);
        } catch (error) {
          console.error('Error fetching implement types:', error);
          setImplementTypes([]);
        }
      }
    };
    fetchImplementTypes();
  }, [type, showImplementTypeSelector]);

  // Fetch models based on selected brand
  useEffect(() => {
    const fetchModels = async () => {
      if (!formData.selectedBrand) return;

      try {
        let data;
        if (type === 'TRACTOR') {
          data = await getAllTractorModels(formData.selectedBrand);
        } else if (type === 'IMPLEMENT') {
          data = await getAllImplementBrandListing({
            brand: formData.selectedBrand,
            start_limit: 0,
            end_limit: 1000,
          });
          data = data?.items || [];

          // Add current implement to models if not present
          if (implementDetail && data && !data.find(item => item.id === implementDetail.id)) {
            data = [implementDetail, ...data];
          }
        } else {
          data = await getTyreModal(formData.selectedBrand);
        }

        setTyreModels(data || []);

        // Auto-select pre-filled model
        if (preFilledModel && data) {
          const modelItem = data.find(item =>
            (+item?.product_id === +preFilledModelId) ||
            (+item.id === +preFilledModelId)
          );
          if (modelItem) {
            updateFormData({
              product_id: modelItem.id,
              selectedModel: type === 'TRACTOR'
                ? modelItem.model_en || modelItem.model
                : type === 'IMPLEMENT'
                  ? modelItem.model
                  : modelItem.modal_name
            });
          }
        }
      } catch (error) {
        console.error('Error fetching models:', error);
        setTyreModels([]);
      }
    };

    fetchModels();
  }, [formData.selectedBrand, type, preFilledModel, preFilledModelId, implementDetail, updateFormData]);

  // Fetch states
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const data = await getAllStates();
        setStates(data || []);
      } catch (error) {
        console.error('Error fetching states:', error);
        setStates([]);
      }
    };
    fetchStates();
  }, []);

  // Set type ID for implement
  useEffect(() => {
    if (implementTypeId) {
      setTypeId(implementTypeId);
    }
  }, [implementTypeId]);

  // Fetch type_id for implement enquiry
  useEffect(() => {
    const fetchTypeId = async () => {
      const typeToUse = showImplementTypeSelector ? formData.selectedImplementType : implementType;
      if (type === 'IMPLEMENT' && typeToUse && !implementTypeId) {
        try {
          const result = await getImplementEnquiryTypeId({
            implement_type: typeToUse,
            device_type: isMobile ? 'mobile' : 'desktop'
          });
          if (result?.success) {
            setTypeId(result.enquiry_id);
          }
        } catch (error) {
          console.error('Error fetching type_id for implement:', error);
        }
      }
    };
    fetchTypeId();
  }, [type, implementType, formData.selectedImplementType, showImplementTypeSelector, implementTypeId, isMobile]);

  // Fetch districts when state changes
  useEffect(() => {
    const fetchDistricts = async () => {
      if (!formData.selectedState) return;

      try {
        const data = await getFetchDistricts(formData.selectedState);
        setDistricts(data || []);
        setTehsils([]);
        updateFormData({ selectedDistrict: '', selectedTehsil: '' });
      } catch (error) {
        console.error('Error fetching districts:', error);
        setDistricts([]);
      }
    };
    fetchDistricts();
  }, [formData.selectedState, updateFormData]);

  // Fetch tehsils when district changes
  useEffect(() => {
    const fetchTehsils = async () => {
      if (!formData.selectedDistrict) return;

      try {
        const data = await getFetchTehsil(formData.selectedDistrict);
        setTehsils(data || []);
        updateFormData({ selectedTehsil: '' });
      } catch (error) {
        console.error('Error fetching tehsils:', error);
        setTehsils([]);
      }
    };
    fetchTehsils();
  }, [formData.selectedDistrict, updateFormData]);

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.selectedTehsil) {
      setError('Tehsil is required');
      return;
    }
    if (type === 'IMPLEMENT' && showImplementTypeSelector && !formData.selectedImplementType) {
      setError('Implement type is required');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      let payload, apiEndpoint;
      const typeToUse = showImplementTypeSelector ? formData.selectedImplementType : implementType;

      if (type === 'TRACTOR') {
        payload = {
          'user-message': 'Enquiry',
          Enquiry: '',
          otp_type: 'form_submit_otp_send',
          name: formData.name,
          mobile_name: formData.mobile,
          manufacture_id: formData.selectedBrand,
          first: formData.selectedModel,
          district: formData.selectedDistrict,
          tahsil: formData.selectedTehsil,
          state: formData.selectedState,
          type_id: isMobile ? 6 : 5,
        };
        apiEndpoint = '/api/enquiry_data_otp_send';
      } else if (type === 'IMPLEMENT') {
        payload = {
          name: formData.name,
          mobile_name: formData.mobile,
          manufacture_id: formData.selectedBrand,
          first: formData.selectedModel,
          demo_field_4: '',
          district: formData.selectedDistrict,
          tahsil: formData.selectedTehsil,
          implement_type: typeToUse || '',
          state: formData.selectedState,
          type_id: typeId || '',
          'user-message': 'Enquiry',
          otp_type: 'form_submit_otp_send',
        };
        apiEndpoint = '/api/enquiry_data_otp_send';
      } else {
        payload = {
          name: formData.name,
          mobile_name: formData.mobile,
          implement_type: '',
          manufacture_id: formData.selectedBrand,
          first: formData.selectedModel,
          state: formData.selectedState,
          district: formData.selectedDistrict,
          tehsil: formData.selectedTehsil,
          type_id: isMobile ? 16 : 17,
          demo_field_4: 'demo_field_4',
          user_message: 'Enquiry',
          otp_type: 'form_submit_otp_send',
          form_name: 'tyre price',
        };
        apiEndpoint = 'api/price_show_enquiry_form';
      }

      const result = await postData(apiEndpoint, payload);

      if (result.status === 'success' || result.message === "success") {
        setOtp(result.otp);
        setShowOtpPopup(true);
        setPrimaryId(result.primary_id);
        setExistVerified(result.text);
      } else {
        setError(result.message || 'Submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('An error occurred during submission');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle input changes
  const handleInputChange = useCallback((field, value) => {
    updateFormData({ [field]: value });
  }, [updateFormData]);

  // Handle model selection
  const handleModelChange = useCallback((e) => {
    const selectedIndex = e.target.selectedIndex - 1;
    if (selectedIndex >= 0 && tyreModels[selectedIndex]) {
      const selectedModelItem = tyreModels[selectedIndex];
      const modelValue = type === 'TRACTOR'
        ? selectedModelItem.model_en
        : type === 'IMPLEMENT'
          ? selectedModelItem.model
          : selectedModelItem.modal_name;

      updateFormData({
        selectedModel: modelValue,
        product_id: selectedModelItem.id
      });
    } else {
      updateFormData({ selectedModel: '', product_id: '' });
    }
  }, [type, tyreModels, updateFormData]);

  // Memoize form description text
  const formDescription = useMemo(() => {
    switch (type) {
      case 'TRACTOR':
        return translation.enquiryForm.tractorTextForOtp;
      case 'IMPLEMENT':
        return translation.enquiryForm.implementTextForOtp || translation.enquiryForm.textForOtp;
      default:
        return translation.enquiryForm.tyreTextForOtp || translation.enquiryForm.textForOtp;
    }
  }, [type, translation]);

  // Memoize submit button text
  const submitButtonText = useMemo(() => {
    if (isSubmitting) return 'Submitting...';
    if (submitBtnText) return submitBtnText;

    switch (type) {
      case 'TRACTOR':
        return `₹ ${translation.enquiryForm.getTractorPrice || 'Get Tractor Price'}`;
      case 'IMPLEMENT':
        return `₹ ${translation.enquiryForm.getImplementPrice || 'Get Implement Price'}`;
      default:
        return `₹ ${translation.enquiryForm.getTyrePrice}`;
    }
  }, [isSubmitting, submitBtnText, type, translation]);

  return (
    <>
      <section className="container" id="inquire-section">
        <div>
          {headingTitle && <MainHeadings text={headingTitle} />}
          <div className="flex w-full flex-col gap-8 md:items-center md:justify-between lg:flex-row">
            <div className="w-full overflow-hidden rounded-2xl shadow-main lg:max-w-[calc(100%_-_270px)] xl:max-w-[982px]">
              {!hideBanner && (
                <div className={`${banner ? 'xl:max-h-[220px]' : 'xl:max-h-[200px]'} h-full max-h-[143px] w-full overflow-hidden`}>
                  <Image
                    src={bannerImage}
                    height={500}
                    width={500}
                    alt="Inquiry form banner"
                    title="Inquiry Form"
                    className="h-auto max-h-full w-full object-cover object-center"
                    loading="lazy"
                    priority={false}
                  />
                </div>
              )}
              <div className={`${bgColor} p-4 md:p-8`}>
                {formTitle && (
                  <div className="mb-2 text-center text-sm font-normal text-black">
                    <MainHeadings extraCss={'border-0'} marginBottom="mb-0" text={formTitle} />
                  </div>
                )}
                <div className="mb-4 text-center text-sm font-normal text-black md:mb-10">
                  <span>{formDescription}</span>
                </div>
                <form onSubmit={handleSubmit} className="mb-4 grid grid-cols-6 gap-x-4 gap-y-2">
                  {/* Name Field */}
                  <div className="col-span-6 md:col-span-3">
                    <label htmlFor="name" className="mb-0 block text-sm font-bold text-black">
                      {translation.enquiryForm.name}
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        id="name"
                        placeholder={translation.enquiryForm.enterName}
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                        autoComplete="given-name"
                        className="h-[38px] w-full rounded-lg border border-gray-light bg-transparent px-4 py-2 text-sm text-black placeholder:text-gray-main focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  {/* Mobile Field */}
                  <div className="col-span-6 md:col-span-3">
                    <label htmlFor="userMobile" className="mb-0 block text-sm font-bold text-black">
                      {translation.enquiryForm.mobile}
                    </label>
                    <div className="relative mt-2">
                      <input
                        type="tel"
                        id="userMobile"
                        placeholder=" xxxxxxxxxx"
                        value={formData.mobile}
                        onChange={(e) => handleInputChange('mobile', e.target.value)}
                        required
                        pattern="[6-9]{1}[0-9]{9}"
                        maxLength="10"
                        className="h-[38px] w-full rounded-lg border border-gray-light bg-transparent px-4 py-2 ps-10 text-sm text-black placeholder:text-gray-main focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-black">
                        <span>+91</span>
                      </div>
                    </div>
                  </div>

                  {/* Implement Type Selector */}
                  {type === 'IMPLEMENT' && showImplementTypeSelector && (
                    <div className="col-span-6 md:col-span-3">
                      <label htmlFor="implementType" className="mb-0 block text-sm font-bold text-black">
                        {translation.enquiryForm.implementType || 'Implement Type'}
                      </label>
                      <div className="mt-2">
                        <select
                          id="implementType"
                          value={formData.selectedImplementType}
                          onChange={(e) => handleInputChange('selectedImplementType', e.target.value)}
                          required
                          className="h-[38px] w-full rounded-lg border border-gray-light bg-transparent px-4 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="">
                            {translation.enquiryForm.selectImplementType || 'Select Implement Type'}
                          </option>
                          {implementTypes.map((implementTypeItem, index) => (
                            <option key={index} value={implementTypeItem.name_en || implementTypeItem.name}>
                              {implementTypeItem.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Brand Field */}
                  <div className={`${type === 'IMPLEMENT' && showImplementTypeSelector ? 'col-span-6 md:col-span-3' : 'col-span-3'}`}>
                    <label htmlFor="tyreBrand" className="mb-0 block text-sm font-bold text-black">
                      {type === 'TYRE'
                        ? translation.enquiryForm.tyreBrand
                        : type === 'TRACTOR'
                          ? translation.enquiryForm.tractorBrand
                          : type === 'IMPLEMENT'
                            ? translation.enquiryForm.implementBrand
                            : translation.enquiryForm.selectBrand}
                    </label>
                    <div className="mt-2">
                      <select
                        id="tyreBrand"
                        value={formData.selectedBrand}
                        onChange={(e) => handleInputChange('selectedBrand', e.target.value)}
                        className="h-[38px] w-full rounded-lg border border-gray-light bg-transparent px-4 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">{translation.enquiryForm.selectBrand}</option>
                        {tyreBrands?.map((brand, index) => (
                          <option key={index} value={brand.name}>
                            {brand.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Model Field */}
                  <div className={`${type === 'IMPLEMENT' && showImplementTypeSelector ? 'col-span-6 md:col-span-3' : 'col-span-3'}`}>
                    <label htmlFor="tyreModel" className="mb-0 block text-sm font-bold text-black">
                      {type === 'TYRE'
                        ? translation.enquiryForm.tyreModel
                        : type === 'TRACTOR'
                          ? translation.enquiryForm.tractorModel
                          : type === 'IMPLEMENT'
                            ? translation.enquiryForm.implementModel
                            : translation.enquiryForm.selectModel}
                    </label>
                    <div className="mt-2">
                      <select
                        id="tyreModel"
                        value={formData.selectedModel}
                        onChange={handleModelChange}
                        required
                        disabled={!formData.selectedBrand}
                        className="h-[38px] w-full rounded-lg border border-gray-light bg-transparent px-4 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-gray-50"
                      >
                        <option value="">{translation.enquiryForm.selectModel}</option>
                        {tyreModels.map((modelItem, index) => (
                          <option
                            key={index}
                            value={type === 'TRACTOR' ? modelItem.model : type === 'IMPLEMENT' ? modelItem.model : modelItem.modal_name}
                          >
                            {type === 'TRACTOR' ? modelItem.model : type === 'IMPLEMENT' ? modelItem.model : modelItem.modal_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Location Fields - State, District, Tehsil */}
                  {['State', 'District', 'Tehsil'].map((field, index) => {
                    const fieldKey = `selected${field}`;
                    const options = field === 'State' ? states : field === 'District' ? districts : tehsils;
                    const isDisabled = field === 'District' ? !formData.selectedState : field === 'Tehsil' ? !formData.selectedDistrict : false;
                    const colSpan = type === 'IMPLEMENT' && showImplementTypeSelector ? 'col-span-6 md:col-span-3' :
                      field === 'State' ? 'col-span-6 md:col-span-2' : 'col-span-3 md:col-span-2';

                    return (
                      <div key={field} className={colSpan}>
                        <label htmlFor={`select${field}`} className="mb-0 block text-sm font-bold text-black">
                          {translation.enquiryForm[`select${field}`]}
                        </label>
                        <div className="mt-2">
                          <select
                            id={`select${field}`}
                            value={formData[fieldKey]}
                            onChange={(e) => handleInputChange(fieldKey, e.target.value)}
                            required
                            disabled={isDisabled}
                            className="h-[38px] w-full rounded-lg border border-gray-light bg-transparent px-4 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-gray-50"
                          >
                            <option value="">{translation.enquiryForm[`select${field}`]}</option>
                            {options.map(option => (
                              <option key={option.id} value={option[field.toLowerCase()]}>
                                {option[field.toLowerCase()]}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    );
                  })}

                  {/* Terms and Conditions */}
                  <div className="col-span-6 mt-2">
                    <label className="inline-flex items-center gap-4">
                      <input
                        type="checkbox"
                        id="terms"
                        className="form-checkbox h-5 w-5 border-primary text-primary focus:ring-primary"
                        required
                        defaultChecked
                      />
                      <span className="text-sm text-gray-dark">
                        {translation.enquiryForm.termsConditionText}
                        <Link
                          href={'https://tractorgyan.com/terms-of-use'}
                          className="ms-1 font-bold text-primary hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {translation.enquiryForm.termsConditionLink}
                        </Link>
                      </span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="col-span-6 mt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="mx-auto flex w-full max-w-[263px] items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-lg text-white transition-colors hover:bg-primary-dark disabled:bg-gray-400"
                    >
                      <span>{submitButtonText}</span>
                      <Image
                        src={tgi_arrow_right}
                        height={20}
                        width={20}
                        alt="Submit"
                        className="h-2.5 w-2.5"
                        loading="lazy"
                      />
                    </button>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="col-span-6 mt-2">
                      <p className="text-center text-sm text-red-600">{error}</p>
                    </div>
                  )}
                </form>
              </div>
            </div>

            {/* Side Banner */}
            <Link
              href={`https://tractorgyan.com/${currentLang === 'hi' ? 'hi/' : ''}tractors`}
              className="h-full w-full overflow-hidden rounded-2xl lg:hidden"
            >
              <Image
                src="https://images.tractorgyan.com/uploads/118100/67c190c6d514b-Implement-Listing-Banner-Mob.webp"
                height={500}
                width={500}
                alt="All Tractor Page Banner"
                title="All Tractor Page Banner"
                className="h-full w-full object-cover"
                loading="lazy"
                priority={false}
              />
            </Link>
            <Link
              href={`https://tractorgyan.com/${currentLang === 'hi' ? 'hi/' : ''}tractors`}
              className="hidden h-full max-h-[526px] w-full max-w-[270px] overflow-hidden rounded-2xl lg:block"
            >
              <Image
                src="https://images.tractorgyan.com/uploads/118099/67c1903aa3cb5-Implement-Listing-Banner-Desk.webp"
                height={526}
                width={270}
                alt="All Tractor Page Banner"
                title="All Tractor Page Banner"
                className="h-full w-full object-cover object-center"
                loading="lazy"
                priority={false}
              />
            </Link>
          </div>
        </div>
      </section>

      {/* OTP Popup */}
      {showOtpPopup && (
        <SubmitOtpForm
          translation={translation}
          otp={otp}
          primaryId={primaryId}
          mobile={formData.mobile}
          bradn_name={formData.selectedBrand}
          product_id={formData.product_id}
          existVerified={existVerified}
          closeEnquryPopup={() => setShowOtpPopup(false)}
          enquiryType={type === 'TRACTOR' ? 'Tractor' : type === 'IMPLEMENT' ? 'Implement' : 'Tyre'}
          productNameSingular={type === 'TRACTOR' ? 'tractor' : type === 'IMPLEMENT' ? 'implement' : 'tyre'}
          productNamePlural={type === 'TRACTOR' ? 'tractors' : type === 'IMPLEMENT' ? 'implements' : 'tyres'}
          onClose={() => setShowOtpPopup(false)}
          tehsil={formData.selectedTehsil}
          state={formData.selectedState}
          district={formData.selectedDistrict}
          name={formData.name}
          successDealerFormShow={'No'}
          implementType={showImplementTypeSelector ? formData.selectedImplementType : implementType}
        />
      )}
    </>
  );
};

export default React.memo(TyrePriceInquireForm);