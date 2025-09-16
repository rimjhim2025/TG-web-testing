import React from 'react';
import Image from 'next/image';

const PopupWrapper = ({ children }) => (
  <div className="fixed left-0 right-0 top-0 z-30 flex h-full w-full items-center justify-center bg-gray-popup bg-opacity-45">
    <div className="container">{children}</div>
  </div>
);

const SuccessPopup = ({ message, onClose }) => {
  return (
    <PopupWrapper>
      <div className="relative mx-auto h-full max-h-[250px] w-full rounded-xl bg-white px-2.5 py-4 shadow-main md:max-w-[400px]">
        <div className="flex flex-col items-center justify-center gap-2 overflow-auto">
          <Image
            src="https://images.tractorgyan.com/uploads/113943/669c0b5d6481e-relatedSuccessIcon.webp"
            height={100}
            width={100}
            title="success icon"
            alt="success icon"
            className="mx-auto flex max-w-[60px]"
          />
          <button
            className="absolute right-2 top-2 flex h-6 w-6 min-w-6 items-center justify-center rounded-full"
            onClick={onClose}
          >
            <Image
              src={'https://images.tractorgyan.com/uploads/119880/1751721362close-icon.webp'}
              height={50}
              width={50}
              alt="close icon"
              title="close icon"
            />
          </button>
          <div className="text-center">
            <span className="md:text-md text-sm text-gray-main">{message}</span>
          </div>
          <button
            onClick={onClose}
            className="mx-auto flex rounded-lg bg-primary px-4 py-2 text-lg text-white"
          >
            OK
          </button>
        </div>
      </div>
    </PopupWrapper>
  );
};

export default SuccessPopup;
