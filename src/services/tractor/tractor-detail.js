import { postData } from '../apiMethods';

export async function getTractorDetail({ productId, lang }) {
  try {
    const result = await postData('/api/tractor_detail', {
      product_id: productId,
      lang: lang,
    });

    if (result?.data?.[0]) {
      result.data[0].brand_logo = "https://images.tractorgyan.com/uploads" + result.data[0].brand_logo;
    }
    console.log('Tractor detail API response:', productId, lang);

    return result?.data?.[0] || null;
  } catch (error) {
    console.error('Error fetching tractor detail:', error);
    throw error; // Rethrow the error to be handled by the caller
  }
}
