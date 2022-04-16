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
  },
  entities: { skill: 'entities' },
};

export const emotionLabelToLabelID = (label: Label) => {
  return `oneai__emotion__${label.span[0]}_${label.span[1]}`;
};

export const subheadingLabelToLabelID = (label: Label) => {
  return `oneai__subheading__${label.span[0]}_${label.span[1]}`;
};

export const sendShowEmotions = (emotionsLabels: Array<Label>) => {
  sendMessage('SHOW_EMOTIONS', emotionsLabels);
};

export const sendAddIDToElements = (labels: Array<Label>) => {
  sendMessage('ADD_ID_TO_ELEMENTS', labels);
};

export const sendToggleEmotions = (emotionsLabels: Array<Label>) => {
  sendMessage('TOGGLE_EMOTIONS', emotionsLabels);
};

export const scrollToElement = (elementID: string) => {
  sendMessage('SCROLL_TO_ELEMENT', elementID);
};

export const sendMessage = (subject: string, data: any) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id || 0, {
      from: 'popup',
      subject,
      data,
    });
  });
};
