import React, { useMemo } from 'react';
import Image from 'next/image';

const CareerPerksBenefits = () => {
  const benefits = useMemo(() => [
    {
      title: 'Competitive',
      highlight: 'Salary',
      image: 'https://images.tractorgyan.com/uploads/120083/687f6e1bd0e32-Salary.webp',
      description: 'Receive a salary that reflects your skills and market value',
    },
    {
      title: 'Work-life',
      highlight: 'Balance',
      image: 'https://images.tractorgyan.com/uploads/120089/687f6ee136f05-Work-Life.webp',
      description: 'Enjoy flexible work hours that support both personal and professional life.',
    },
    {
      title: 'Menstrual',
      highlight: 'Leave',
      image: 'https://images.tractorgyan.com/uploads/120084/687f6e3db8c5d-Menstrual-Leave.webp',
      description: 'Prioritizing wellness with dedicated menstrual leave for all who need it.',
    },
    {
      title: 'Professional',
      highlight: 'Development',
      image: 'https://images.tractorgyan.com/uploads/120090/687f6ef89b4a7-Professional-Dev.webp',
      description: 'Grow your skills with learning resources and mentorship.',
    },
    {
      title: 'Innovative',
      highlight: 'Environment',
      image: 'https://images.tractorgyan.com/uploads/120088/687f6eb948062-Innovative-Env.webp',
      description: 'Collaborate in a culture that values creativity and fresh ideas.',
    },
    {
      title: 'Trust, Ownership and Endless',
      highlight: 'Support',
      image: 'https://images.tractorgyan.com/uploads/120086/687f6e7c58e7b-Endless-Support.webp',
      description: 'Take charge of your work with autonomy and thrive in a workplace where guidance and encouragement are always available.',
    },
  ], []);

  const BenefitCard = React.memo(({ benefit, index }) => (
    <div
      key={index}
      className="hover:shadow-lg rounded-lg bg-white p-0 shadow-[0px_0px_3px_-1px_#3f3d5696] transition-all duration-300 hover:-translate-y-1 sm:rounded-xl lg:rounded-xl"
    >
      <div className="mb-1 flex justify-center md:mb-4 lg:mb-6 lg:justify-start">
        <Image
          src={benefit.image}
          width={372}
          height={143}
          title={benefit.title}
          alt={benefit.title}
          className="h-24 rounded-t-lg sm:rounded-t-xl md:h-auto lg:rounded-t-2xl"
          loading={index > 1 ? "lazy" : "eager"} // Lazy load images below the fold
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaUMk8EeNkfFfKOrH//2Q=="
        />
      </div>

      <div className="p-2 md:p-4">
        <div className="mb-1 text-center md:mb-3 lg:mb-1 lg:text-left">
          <h3 className="text-md font-bold leading-tight text-black md:text-lg">
            {benefit.title}{' '}
            <span className="font-bold text-primary">{benefit.highlight}</span>
            {benefit.additionalText && (
              <span className="text-primary"> {benefit.additionalText}</span>
            )}
          </h3>
        </div>

        <p className="text-center text-xs font-bold leading-relaxed text-black md:text-sm lg:text-left">
          {benefit.description}
        </p>
      </div>
    </div>
  ));

  BenefitCard.displayName = 'BenefitCard';

  return (
    <div className="mt-0 w-full py-6 lg:mt-6 lg:py-2">
      <div className="mb-6 text-start lg:mb-10">
        <h2 className="mb-3 text-lg font-bold leading-tight text-black md:text-3xl lg:mb-2">
          Perks and Benefits Included with every TractorGyan Role
        </h2>
        <p className="text-base font-bold font-medium text-black md:text-base">
          Here&apos;s why you&apos;ll love working with us
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
        {benefits.map((benefit, index) => (
          <BenefitCard key={index} benefit={benefit} index={index} />
        ))}
      </div>
    </div>
  );
};

export default React.memo(CareerPerksBenefits);