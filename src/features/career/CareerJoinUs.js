import Image from 'next/image';
import { useMemo } from 'react';

const CareerJoinUs = ({ isMobile }) => {
  const content = {
    title: "JOIN US IN OUR MOVEMENT",
    heading: "#BuildingForBharat",
    description: "At TractorGyan, we're on a mission to empower rural India with technology, innovation, and knowledge. Our #BuildingForBharat movement is about creating impactful solutions that uplift farmers and drive real change in the agri-sector. If you're passionate about building for the heart of India, this is your calling. Come be part of something bigger—where your work truly matters."
  };

  const imageUrls = useMemo(() => ({
    mainImage: "https://images.tractorgyan.com/uploads/120092/687f76c321a99-image-76.webp",
    logoImage: "https://images.tractorgyan.com/uploads/115211/66e80b3c6d9ea-TractorGyan-logo.webp"
  }), []);

  // Mobile layout
  if (isMobile) {
    return (
      <div className="relative mt-4 h-[435px] w-full rounded-3xl bg-black">
        <div className="p-4">
          <div className="absolute left-1/2 top-4 w-[90%] -translate-x-1/2 transform">
            <Image
              src={imageUrls.mainImage}
              height={275}
              width={640}
              title="Join our movement"
              alt="TractorGyan movement illustration"
              className="w-full rounded-2xl"
              priority
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaUMk8EeNkfFfKOrH//2Q=="
            />
          </div>
          <div className="absolute bottom-12 left-[5%] top-[25%] w-[90%] text-white">
            <p className="mb-0 text-sm font-medium uppercase tracking-wide opacity-90">
              {content.title}
            </p>
            <h2 className="mb-2 text-2xl font-bold">{content.heading}</h2>
            <p className="text-sm font-light leading-6 opacity-95">
              {content.description}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Desktop layout
  return (
    <div className="relative mt-12 h-[380px] w-full rounded-3xl bg-black">
      <div className="p-4">
        {/* Image Section */}
        <div className="absolute right-[3%] top-10">
          <div className="relative">
            <Image
              src={imageUrls.mainImage}
              height={300}
              width={588}
              title="Join our movement"
              alt="TractorGyan movement illustration"
              className="rounded-2xl object-cover md:h-[300px] md:max-w-[290px] lg:h-[300px] lg:max-w-[390px] xl:h-[300px] xl:w-[588px]"
              priority
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaUMk8EeNkfFfKOrH//2Q=="
            />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 transform md:hidden lg:block">
              <Image
                src={imageUrls.logoImage}
                height={69}
                width={275}
                title="TractorGyan Logo"
                alt="TractorGyan Logo"
                className="max-w-[200px] lg:max-w-[275px]"
              />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="w-[50%] ps-[2%] pt-[2%] text-white">
          <p className="mb-4 text-sm font-medium uppercase tracking-wide opacity-90">
            {content.title}
          </p>
          <h2 className="mb-4 text-4xl font-bold">{content.heading}</h2>
          <p className="font-light leading-7 opacity-95 md:text-sm lg:text-base">
            {content.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CareerJoinUs;