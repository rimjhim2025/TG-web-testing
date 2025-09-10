import { postData } from '../apiMethods';

export async function getTyreTopContent({ ad_title, currentLang, device_type }) {
  try {
    const result = await postData('/api/tyre_top_content', {
      ad_title,
      ad_type_content_lang: currentLang === 'hi' ? 'hindi' : 'english',
      device_type,
    });
    return result?.data ? result.data : [];
  } catch (error) {
    console.error('Error fetching tyre top content for ' + ad_title + ' :', error);
  }
}

export async function getMiniTractorTopContent(payload) {
  try {
    const result = await postData('/api/mini_tractor_top_content', payload);
    console.log("Mini Tractor Top Content Result:", payload, result);

    if (result.data) {
      // TODO to fix this
      // result.data.banner = []
      // result.data.banner = [{ image: `<img src="${result?.data?.banner}" />` }];
    }

    return result?.data ? result.data : [];
  } catch (error) {
    console.error('Error fetching mini tractor top content for ' + payload + ' :', error);
  }
}
