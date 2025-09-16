import React from "react";
import { isMobileView } from "@/src/utils";
import { getDictionary } from "@/src/lib/dictonaries";
import { getSelectedLanguage } from "@/src/services/locale";
import DesktopHeader from "@/src/components/shared/header/DesktopHeader";
import ScrollToTopNavigate from "@/src/components/shared/ScrollToTop/ScrollToTopOnNavigation";
import nextDynamic from "next/dynamic";
import WhatsAppTopButton from "@/src/features/tyreComponents/commonComponents/WhatsAppTopButton";
import TermsOfUseDescription from "./TermsOfUseDescription";
import SeoHead from "@/src/components/shared/header/SeoHead";
import { getApiUrl } from "@/src/utils/utils";
import { getSEOByPage } from "@/src/services/seo/get-page-seo";

const MobileFooter = nextDynamic(
    () => import("@/src/components/shared/footer/MobileFooter"),
    { ssr: true },
);
const TractorGyanOfferings = nextDynamic(
    () => import("@/src/components/shared/offerings/TractorGyanOfferings"),
    { ssr: true },
);
const FooterServer = nextDynamic(
    () => import("@/src/components/shared/footer/FooterServer"),
    { ssr: true },
);

export const dynamic = "force-dynamic";

const TermsOfUsePage = async () => {
    let prefLang = "en";
    let translation = {};
    let isMobile = false;
    let seoData = null;
    const apiUrl = getApiUrl();

    try {
        prefLang = await getSelectedLanguage();
    } catch (error) {
        console.error("Error fetching selected language:", error);
    }

    try {
        translation = await getDictionary(prefLang);
    } catch (error) {
        console.error("Error fetching dictionary:", error);
    }

    try {
        isMobile = await isMobileView();
    } catch (error) {
        console.error("Error determining mobile view:", error);
    }

    try {
        const seoSlug = `terms-of-use`;
        seoData = await getSEOByPage(seoSlug);
    } catch (err) {
        console.error("⚠️ Failed to fetch SEO:", err);
    }


    const currentSlug = `terms-of-use`;
    const baseUrl = `${apiUrl}/terms-of-use`;

    return (<>
        <SeoHead
            seo={seoData}
            staticMetadata={{}}
            preloadUrls={[]}
            currentSlug={currentSlug}
            fullUrl={baseUrl}
            paginationLinks={{
                canonical: baseUrl,
            }}
        />
        <DesktopHeader
            isMobile={isMobile}
            translation={translation}
            currentLang={prefLang}
        />
        <main className="lg:mt-[159px]">
            <ScrollToTopNavigate />
            <section className="max-md:pt-3">
                <div className={`container`}>
                    <TermsOfUseDescription translation={translation}
                        currentLang={prefLang} />
                </div>
            </section>
            <WhatsAppTopButton
                translation={translation}
                currentLang={prefLang}
                tyreBrands={[]}
                defaultEnquiryType={"Tractor"}
            />
            <TractorGyanOfferings translation={translation} />
        </main>
        <FooterServer translation={translation} />
        {isMobile && <MobileFooter translation={translation} />}
    </>)
};
export default TermsOfUsePage;