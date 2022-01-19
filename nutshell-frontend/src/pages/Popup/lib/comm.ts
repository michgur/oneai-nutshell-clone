const apiURL = 'https://oneai-nutshell.herokuapp.com/extract-output/';
// const apiURL = 'http://localhost:8000/extract-output/';

export async function extractOutput(url: string) {
  try {
    const fullURL = new URL(apiURL);
    fullURL.searchParams.append('url', url);
    const rawResponse = await fetch(fullURL.href, {});
    const response = rawResponse.json();
    return response;
  } catch (error) {
    return null;
  }
}
