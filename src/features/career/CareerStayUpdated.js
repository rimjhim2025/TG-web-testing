import Image from 'next/image';

const CareerStayUpdated = ({ isMobile }) => {
  return (
    <>
      <div className="pt-8">
        <div className="container">
          <div className="relative">
            {isMobile ? (
              <div>
                <Image
                  src={`https://images.tractorgyan.com/uploads/120173/6880cff92571c-Frame-1000006124-(1).webp`}
                  width={1184}
                  height={188}
                  title="Stay updated with TractorGyan"
                  alt="Stay updated with TractorGyan"
                  className="relative"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <h2 className="mb-3 text-base font-bold leading-tight text-white lg:mb-4">
                    Stay updated with TractorGyan
                  </h2>
                  <a
                    href="https://www.linkedin.com/company/tractorgyan"
                    target="_"
                    title="Follow Tractor Gyan on LinkedIn"
                    aria-label="Follow Tractor Gyan on LinkedIn"
                  >
                    <Image
                      src={`https://images.tractorgyan.com/uploads/120174/6880d0172deda-Trending.webp`}
                      width={214}
                      height={33}
                      title="Follow us on LinkedIn"
                      alt="Follow us on LinkedIn"
                      className="max-h-[33px] max-w-[214px]"
                    />
                  </a>
                </div>
              </div>
            ) : (
              <div>
                <Image
                  src={`https://images.tractorgyan.com/uploads/120172/6880cfdd1f23d-Frame-1000006124.webp`}
                  width={1184}
                  height={188}
                  title="Stay updated with TractorGyan"
                  alt="Stay updated with TractorGyan"
                  className="relative"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <h2 className="mb-3 text-xl font-bold leading-tight text-white md:text-3xl lg:mb-4">
                    Stay updated with TractorGyan
                  </h2>
                  <a
                    href="https://www.linkedin.com/company/tractorgyan"
                    target="_"
                    title="Follow Tractor Gyan on LinkedIn"
                    aria-label="Follow Tractor Gyan on LinkedIn"
                  >
                    <Image
                      src={`https://images.tractorgyan.com/uploads/120174/6880d0172deda-Trending.webp`}
                      width={300}
                      height={45}
                      title="Follow us on LinkedIn"
                      alt="Follow us on LinkedIn"
                      className="max-h-[45px] max-w-[300px]"
                    />
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default CareerStayUpdated;
