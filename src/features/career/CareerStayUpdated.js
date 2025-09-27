import Image from 'next/image';
import { useMemo } from 'react';

const CareerStayUpdated = ({ isMobile }) => {
  const content = useMemo(() => ({
    title: "Stay updated with TractorGyan",
    linkedinUrl: "https://www.linkedin.com/company/tractorgyan",
    buttonText: "Follow us on LinkedIn",
    images: {
      mobile: "https://images.tractorgyan.com/uploads/120173/6880cff92571c-Frame-1000006124-(1).webp",
      desktop: "https://images.tractorgyan.com/uploads/120172/6880cfdd1f23d-Frame-1000006124.webp",
      linkedinIcon: "https://images.tractorgyan.com/uploads/120831/68b2bc9a5a6ab-Layer-2.webp"
    }
  }), []);

  const imageConfig = useMemo(() =>
    isMobile ? {
      src: content.images.mobile,
      width: 1184,
      height: 188,
      titleSize: "text-base",
      buttonClass: "max-h-[33px] max-w-[33px]"
    } : {
      src: content.images.desktop,
      width: 1184,
      height: 188,
      titleSize: "text-xl md:text-3xl",
      buttonClass: "h-[18px] w-[17px]",
      linkClass: "max-h-[45px] min-h-[45px] min-w-[300px] max-w-[300px]"
    }
    , [isMobile, content]);

  return (
    <div className="pt-8">
      <div className="container">
        <div className="relative">
          <Image
            src={imageConfig.src}
            width={imageConfig.width}
            height={imageConfig.height}
            title={content.title}
            alt={content.title}
            className="relative w-full"
            priority
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaUMk8EeNkfFfKOrH//2Q=="
          />

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <h2 className={`mb-3 font-bold leading-tight text-white lg:mb-4 ${imageConfig.titleSize}`}>
              {content.title}
            </h2>

            <a
              href={content.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              title={content.buttonText}
              aria-label={content.buttonText}
              className={imageConfig.linkClass || ''}
            >
              <button className="flex items-center gap-2 bg-blue-linkedInBlue px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                <Image
                  src={content.images.linkedinIcon}
                  width={isMobile ? 20 : 17}
                  height={isMobile ? 20 : 18}
                  title={content.buttonText}
                  alt="LinkedIn Icon"
                  className={imageConfig.buttonClass}
                />
                <span className="whitespace-nowrap text-white font-semibold">
                  {content.buttonText}
                </span>
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerStayUpdated;