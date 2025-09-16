import Image from 'next/image';
import TractorGyanFeaturesUI from './TractorGyanFeaturesUI';

const TyrePromotionSection = () => {
    const statsData = [
        {
            number: '9.6 Million+',
            title: 'Tractors Leads Generated',
        },
        {
            number: '3,65,685+',
            title: 'Tractors Leads Generated',
        },
        {
            number: '10+',
            title: 'Tractor Tyre Brands Listed',
        },
        {
            number: '32.04 Million+',
            title: 'Yearly Page Views',
        },
        {
            number: '97+',
            title: 'Tractor Tyre Models Listed',
        },
        {
            number: '288.3 Million',
            title: 'Yearly Web Impressions',
        },
    ];



    return (
        <TractorGyanFeaturesUI
            statsData={statsData}
            title="Tractor Tyre by TractorGyan"
            brandHeading={"Tyre brands that trust our expertise"}
            description="Tractor Gyan helps farmers find the best tyre for the tractor including its features, specification and prices. If you are a tyre brand and want to increase your brand’s reach amongst farmers we can help you in that."
            leftImageSrc="https://images.tractorgyan.com/uploads/120102/687f7d3e05f63-Tyres---01.webp"
            leftImageAlt="Increase your brand's reach with TractorGyan"
            rightImageSrc="https://images.tractorgyan.com/uploads/120103/687f7d7d143b0-Tyres---02.webp"
            rightImageAlt="Showcase your tractor tyres"
        />
    );
};

export default TyrePromotionSection;
