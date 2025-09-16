'use client';
import React, { useState } from 'react';
import StarRatingIcon from '@/src/svgFiles/StarRatingIcon';
import { addTyreRatingReview } from '@/src/services/tyre/ratingReviewService';
import SuccessPopup from './SuccessPopup'; // Will create this component

const DroneRatingForm = ({ brand, model, form_page_name, translation }) => {
  const [selectedRating, setSelectedRating] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    user_message: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: '' });
    }
  };

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = translation.ratingForm.nameRequired;
    }
    if (!formData.mobile) {
      errors.mobile = translation.ratingForm.mobileRequired;
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      errors.mobile = translation.ratingForm.mobileInvalid;
    }
    if (!formData.user_message.trim()) {
      errors.user_message = translation.ratingForm.reviewRequired;
    }
    if (selectedRating === 0) {
      errors.rating = translation.ratingForm.ratingRequired;
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async e => {
    console.log('Post data is : ', brand, model);

    e.preventDefault();
    if (!validate()) {
      return;
    }
    setLoading(true);
    const postData = {
      ...formData,
      total_rating: selectedRating,
      brand,
      model,
      form_page_name,
    };

    try {
      const result = await addTyreRatingReview(postData);
      if (result.success) {
        setShowSuccessPopup(true);
        setFormData({ name: '', mobile: '', user_message: '' });
        setSelectedRating(0);
      } else {
        setFormErrors({ submit: result.text || translation.ratingForm.unknownError });
      }
    } catch (error) {
      setFormErrors({ submit: translation.ratingForm.submitError });
    } finally {
      setLoading(false);
    }
  };

  const handleRating = rating => {
    setSelectedRating(rating);
    if (formErrors.rating) {
      setFormErrors({ ...formErrors, rating: '' });
    }
  };

  if (showSuccessPopup) {
    return (
      <SuccessPopup
        message={translation.ratingForm.successMessage}
        onClose={() => setShowSuccessPopup(false)}
      />
    );
  }

  return (
    <div className="rounded-2xl p-4 shadow-main md:p-0 md:shadow-none">
      <div className="mb-6 w-full items-center justify-start gap-8 md:flex">
        <span className="mb-1.5 text-center font-semibold text-black">
          {translation.ratingForm.ratings}
        </span>
        <div className="flex items-center justify-center gap-[18px]">
          {[1, 2, 3, 4, 5].map(rating => (
            <div
              key={rating}
              className="h-[40px] w-[40px] cursor-pointer"
              onClick={() => handleRating(rating)}
            >
              <StarRatingIcon clicked={selectedRating >= rating} />
            </div>
          ))}
        </div>
      </div>
      {formErrors.rating && <p className="text-xs italic text-error-main">{formErrors.rating}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="name" className="mb-1 block text-base font-semibold text-black">
            {translation.ratingForm.name}
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="name"
              id="name"
              autoComplete="given-name"
              className={`ease w-full rounded-md border ${formErrors.name ? 'border-error-main' : 'border-gray-light'
                } bg-transparent px-3 py-2 text-sm transition duration-300 placeholder:text-gray-main hover:border-gray-main focus:border-gray-main focus:outline-none`}
              placeholder={translation.ratingForm.enterName}
              value={formData.name}
              onChange={handleInputChange}
            />
            {formErrors.name && <p className="text-xs italic text-error-main">{formErrors.name}</p>}
          </div>
        </div>
        <div className="mb-6">
          <label htmlFor="mobileNumber" className="mb-1 block text-base font-semibold text-black">
            {translation.ratingForm.mobile}
          </label>
          <div className="relative">
            <input
              id="mobileNumber"
              name="mobile"
              type="tel"
              className={`ease w-full rounded-md border ${formErrors.mobile ? 'border-error-main' : 'border-gray-light'
                } bg-transparent px-3 py-2 ps-10 text-sm transition duration-300 placeholder:text-gray-main hover:border-gray-main focus:border-gray-main focus:outline-none`}
              placeholder={translation.ratingForm.mobilePlaceholder}
              maxLength="10"
              value={formData.mobile}
              onChange={handleInputChange}
            />
            <div className="full absolute left-3 top-0 py-2 text-sm font-bold leading-[22px] text-black">
              <span>+91</span>
            </div>
          </div>
          {formErrors.mobile && (
            <p className="text-xs italic text-error-main">{formErrors.mobile}</p>
          )}
        </div>
        <div className="mb-6">
          <label htmlFor="review" className="mb-1 block text-base font-semibold text-black">
            {translation.ratingForm.writeReview}
          </label>
          <textarea
            id="review"
            name="user_message"
            rows="3"
            className={`ease w-full rounded-md border ${formErrors.user_message ? 'border-error-main' : 'border-gray-light'
              } bg-transparent px-3 py-2 text-sm transition duration-300 placeholder:text-gray-main hover:border-gray-main focus:border-gray-main focus:outline-none`}
            placeholder={translation.ratingForm.enterText}
            value={formData.user_message}
            onChange={handleInputChange}
          />
          {formErrors.user_message && (
            <p className="text-xs italic text-error-main">{formErrors.user_message}</p>
          )}
        </div>
        {formErrors.submit && (
          <p className="mb-2 text-center text-xs italic text-error-main">{formErrors.submit}</p>
        )}
        <button
          type="submit"
          className="mx-auto flex rounded-lg bg-primary px-4 py-2 text-lg text-white disabled:opacity-50"
          disabled={loading}
        >
          {loading ? translation.ratingForm.submitting : translation.ratingForm.submitReview}
        </button>
      </form>
    </div>
  );
};

export default DroneRatingForm;
