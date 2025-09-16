import Image from "next/image";
import Link from "next/link";
import React from "react";

const JoinOurTeamSection = ({ isMobile }) => {
    return (
        <>
            {isMobile ? (<>
                <section className="w-full py-1 px-5">
                    <div className="relative rounded-xl overflow-hidden  flex items-center justify-center min-h-[158px]">
                        {/* Background image */}
                        <Image
                            src="https://images.tractorgyan.com/uploads/120191/6881c3560c7d2-join-our-team-mobile-background.webp"

                            alt="Join Our Team Background"
                            fill
                            className="object-fill object-center "
                        />

                        {/* Overlay content */}
                        <div className="relative z-10 text-center px-2">
                            <h2 className="text-white font-bold text-xl  mb-3">
                                Join our team
                            </h2>
                            <p className="text-white text-xs font-medium  mx-auto mb-3">
                                and contribute to supporting the <br /> farmers of India
                            </p>
                            <Link href="/careers">
                                <button className="px-4 py-1 text-sm bg-white text-black font-medium rounded-sm hover:bg-gray-100 transition-all">
                                    Explore Careers
                                </button>
                            </Link>
                        </div>
                    </div>
                </section>
            </>) :
                (
                    <>
                        <section className="w-full py-12 px-4 sm:px-8 md:px-16 lg:px-24 relative">
                            <div className="relative rounded-xl overflow-hidden  min-h-[320px] flex items-center justify-center">
                                {/* Background image */}
                                <Image
                                    src="https://images.tractorgyan.com/uploads/120168/6880b300862e3-join-our-team-banner.webp"
                                    // src="https://images.tractorgyan.com/uploads/120161/68809274500d9-join-our-team.webp"
                                    alt="Join Our Team Background"
                                    fill
                                    className="object-cover object-center"
                                />

                                {/* Overlay content */}
                                <div className="relative z-10 text-center px-4 sm:px-12">
                                    <h2 className="text-white font-bold text-3xl  mb-3">
                                        Join our team
                                    </h2>
                                    <p className="text-white text-2xl font-medium max-w-xl mx-auto mb-6">
                                        and contribute to supporting the farmers of India
                                    </p>
                                    <Link href="/career">
                                        <button className="px-6 py-2 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-all">
                                            Explore Careers
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </section>
                    </>
                )
            }
        </>

    );
};

export default JoinOurTeamSection;
