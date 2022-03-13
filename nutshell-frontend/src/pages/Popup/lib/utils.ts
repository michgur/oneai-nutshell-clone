import { Label } from './interface';

export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const ROOT_APP_ID = 'oneai-nutshell-root';

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
  },
  summarize: {
    skill: 'summarize',
    params: { min_length: 150, max_length: 150 },
  },
  entities: { skill: 'entities' },
};

export const labelToLabelID = (label: Label) => {
  return `oneai__emotion__${label.span[0]}_${label.span[1]}`;
};

export const sendShowEmotions = (emotionsLabels: Array<Label>) => {
  sendEmotions(emotionsLabels, 'SHOW_EMOTIONS');
};

export const sendToggleEmotions = (emotionsLabels: Array<Label>) => {
  sendEmotions(emotionsLabels, 'TOGGLE_EMOTIONS');
};

export const sendEmotions = (emotionsLabels: Array<Label>, subject: string) => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id || 0, {
      from: 'popup',
      subject: subject,
      data: emotionsLabels,
    });
  });
};

export const scrollToEmotion = (emotionLabelID: string) => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id || 0, {
      from: 'popup',
      subject: 'SCROLL_TO_EMOTION',
      data: emotionLabelID,
    });
  });
};
