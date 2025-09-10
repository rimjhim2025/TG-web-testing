import { postData } from '../apiMethods';

export async function getAllImplementBrandListing({
    search_keyword = '',
    start_limit,
    end_limit,
    latest_implement,
    popular_implement,
    brand,
    lang,
}) {
    try {

        console.log("Fetching all tractors listing with params:", {
            brand,
            search_keyword,
            start_limit,
            end_limit,
            latest_implement,
            popular_implement,
            lang,
        });

        const result = await postData('/api/implement_brand_common_main_list', {
            brand,
            search_keyword,
            start_limit,
            end_limit,
            latest_implement,
            popular_implement,
            lang,
        });

        console.log(
            'All tractors listing result:',
            {
                brand,
                search_keyword,
                start_limit,
                end_limit,
                latest_implement,
                popular_implement,
                lang,
            },
            result
        );

        if (result && result.success) {
            result.data = result.data.map(item => ({
                ...item,
                image: '/' + item.image,
            }));
            return {
                items: result.data || [],
                totalCount: result.count || 0,
            };
        }

        return { items: [], totalCount: 0 };
    } catch (error) {
        console.error('Error fetching all tractors listing:', error);
        throw error;
    }
}
