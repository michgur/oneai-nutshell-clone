export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const requestHeader = {
  accept: 'application/json, text/plain, */*',
  'accept-language': 'en-US,en;q=0.9',
  'api-key': '9cdca5fa-94dd-40c0-b654-5820dd427b51',
  'content-type': 'application/json',
  Referer: 'https://studio.oneai.com/',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
};
export const requestSteps = {
  extractHtml: {
    skill: 'extract-html',
  },
  emotions: {
    skill: 'emotions',
    input: '0',
    id: '1',
    params: {
      thresholds: {
        happiness: 0.7,
        sadness: 0.4,
        surprise: 0.7,
        fear: 0.8,
        anger: 0.45,
      },
    },
  },
  summarize: {
    skill: 'summarize',
    params: {
      find_origins: true,
    },
  },
};
