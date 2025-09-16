'use client';

import React, { useState } from 'react';
import WhatsAppTopButton from '../../tyreComponents/commonComponents/WhatsAppTopButton';

const TyrePriceBannerClient = ({ currentLang, translation }) => {
  // State for WhatsApp component
  const [openEnquiryForm, setOpenEnquiryForm] = useState(false);

  // Function to handle banner click
  const handleBannerClick = () => {
    // Toggle the state or force re-opening by using a timestamp
    setOpenEnquiryForm(prev => (!prev ? true : Date.now()));
  };

  return (
    <>
      <div
        className="hover:shadow-lg flex w-full cursor-pointer items-center justify-center rounded-lg bg-white shadow-main transition-shadow duration-200"
        onClick={handleBannerClick}
      >
        <img
          src="https://images.tractorgyan.com/uploads/120391/689193e19856d-Banner-Tyre-for-price.webp"
          alt="Tyre Price Banner"
          className="max-h-full max-w-full object-fill"
        />
      </div>

      {/* WhatsApp Component - Always rendered but controlled by openEnquiryForm prop */}
      <WhatsAppTopButton
        currentLang={currentLang}
        translation={translation}
        isMobile={false} // Assuming desktop since this is for when price list is empty
        defaultEnquiryType="Tyre"
        openEnquiryForm={openEnquiryForm} // This tells the component to open the enquiry form
      />
    </>
  );
};

export default TyrePriceBannerClient;
