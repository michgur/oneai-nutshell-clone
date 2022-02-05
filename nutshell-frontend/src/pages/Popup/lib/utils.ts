export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const requestHeader = {
  "accept": "application/json, text/plain, */*",
  "accept-language": "en-US,en;q=0.9",
  "access-token": "2871f444-86f4-4035-9946-68c1cf0159a9",
  "content-type": "application/json",
  "Referer": "https://studio.oneai.com/",
  "Referrer-Policy": "strict-origin-when-cross-origin"
}
export const requestSteps =
{
  extractHtml: {
    "skill": "extract-html",
    "input": "0",
    "id": "1"
  },
  emotions: {
    "skill": "emotions",
    "input": "0",
    "id": "1",
    "params": {
      "thresholds": {
        "happiness": 0.7,
        "sadness": 0.4,
        "surprise": 0.7,
        "fear": 0.8,
        "anger": 0.45
      }
    }
  },
  summarize: {
    "skill": "summarize",
    "input": "1",
    "id": "2",
    "params": {}
  }
}


