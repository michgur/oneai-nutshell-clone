import { useRecoilValue } from 'recoil';
import { extractHTMLAtom, pageTitleAtom } from './atoms';
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

export const useTitle = () => {
  const extractHTMLContent = useRecoilValue(extractHTMLAtom);
  const titleH1 = useRecoilValue(pageTitleAtom);
  let titleOneAI;
  try {
    titleOneAI = extractHTMLContent?.labels?.filter((label: any) => {
      return label.name === 'title';
    })[0];
  } catch (error) {
    titleOneAI = undefined;
  }
  const title =
    titleOneAI !== undefined && titleOneAI.value !== ''
      ? titleOneAI.value
      : titleH1;
  return title;
};

export const useSubheadings = () => {
  const extractHTMLContent = useRecoilValue(extractHTMLAtom);
  const subheadings =
    extractHTMLContent?.labels?.filter((label: any) => {
      return label.name === 'subheading';
    }) || [];
  return subheadings;
};

export const blackList = [
  { siteName: 'oneai.com' },
  { siteName: 'google.com' },
  { siteName: 'facebook.com' },
  { siteName: 'youtube.com' },
  { siteName: 'twitter.com' },
  { siteName: 'linkedin.com' },
  { siteName: 'github.com' },
  { siteName: 'amazon.com' },
  { siteName: 'instagram.com' },
  { siteName: 'yahoo.com' },
  { siteName: 'twitch.tv' },
  { siteName: 'reddit.com' },
  { siteName: 'pornhub.com' },
  { siteName: 'xvideos.com' },
  { siteName: 'xnxx.com' },
  { siteName: 'bit.ly' },
  { siteName: 'vk.com' },
  { siteName: 'office.com' },
  { siteName: 'discord.com' },
  { siteName: 'ebay.com' },
  { siteName: 'netflix.com' },
  { siteName: 'duckduckgo.com' },
  { siteName: 'bing.com' },
  { siteName: 'zoom.com' },
  { siteName: 'roblox.com' },
  { siteName: 'pinterest.com' },
  { siteName: 'tiktok.com' },
  { siteName: 'craigslist.com' },
  { siteName: 'paypal.com' },
  { siteName: 'aol.com' },
  { siteName: 'hulu.com' },
  { siteName: 'shoppify.com' },
];
