import Image from 'next/image';
import { useMemo } from 'react';

const CareerCoreValue = () => {
  const coreValues = useMemo(() => [
    {
      title: 'Empathy',
      subtitle: 'We care and understand deeply.',
      icon: `https://images.tractorgyan.com/uploads/120091/687f76954a506-Frame-1000006539.webp`,
    },
    {
      title: 'Trust',
      subtitle: 'We do what we say.',
      icon: `https://images.tractorgyan.com/uploads/120091/687f76954a506-Frame-1000006539.webp`,
    },
    {
      title: 'Transparency',
      subtitle: 'We stay open and honest.',
      icon: `https://images.tractorgyan.com/uploads/120091/687f76954a506-Frame-1000006539.webp`,
    },
    {
      title: 'Innovation',
      subtitle: 'We think fresh and build smart.',
      icon: `https://images.tractorgyan.com/uploads/120091/687f76954a506-Frame-1000006539.webp`,
    },
  ], []);

  const ValueCard = useMemo(() => ({ value, index }) => (
    <div
      className="border-blue-borderBlue rounded-lg border bg-blue-lightest p-0 px-2 py-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-none sm:rounded-xl md:px-6 md:py-4 lg:rounded-xl"
    >
      <div className="mb-2 flex justify-start">
        <Image
          src={value.icon}
          title={value.title}
          alt={`${value.title} icon`}
          width={80}
          height={80}
          className="max-h-[60px] max-w-[60px] md:max-h-[80px] md:max-w-[80px]"
          loading="lazy"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaUMk8EeNkfFfKOrH//2Q=="
        />
      </div>

      <h3 className="text-md mb-1 font-bold text-black md:mb-0 md:text-2xl">
        {value.title}
      </h3>

      <p className="text-xs font-medium leading-[14px] md:text-xs md:leading-relaxed">
        {value.subtitle}
      </p>
    </div>
  ), []);

  ValueCard.displayName = 'ValueCard';

  return (
    <section className="w-full bg-white px-0 py-6 lg:py-6">
      <div className="w-full pb-5">
        <header className="mb-4 text-center lg:mb-8">
          <h2 className="mb-4 text-xl font-bold text-black md:text-3xl">
            Our Core Values
          </h2>
        </header>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {coreValues.map((value, index) => (
            <ValueCard key={`${value.title}-${index}`} value={value} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareerCoreValue;