import { postData } from '../apiMethods';

export async function getImplementNews(newsType = 'implement-news') {
  console.log('Fetching implement news...', newsType);
  try {
    const encodedNewsType = encodeURIComponent(newsType);
    const result = await postData(`/api/implement_news?news_type=${encodedNewsType}`);
    return result.data;
  } catch (error) {
    console.error('Error fetching implement news:', error);
    throw error; // Rethrow the error to be handled by the caller
  }
}
