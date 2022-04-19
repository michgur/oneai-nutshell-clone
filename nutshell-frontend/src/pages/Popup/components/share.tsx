// import dotenv from 'dotenv';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  emotionsLabelsState,
  entitiesStateAtom,
  shareAtom,
  summaryPercentState,
  summaryState,
  urlState,
} from '../lib/atoms';
import { DATA_LOADING } from '../lib/data-bus';
import { useSubheadings, useTitle } from '../lib/utils';

// const docURL = 'http://localhost:3000/api/nutshell-share';
const docURL = 'https://oneai-website.herokuapp.com/api/nutshell-share';

const createDoc = async (data: any) => {
  try {
    const response = await fetch(docURL, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (response.status === 500) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
};

export const useShareKey = () => {
  const url = useRecoilValue(urlState);
  const summaryPercent = useRecoilValue(summaryPercentState);
  return `${url}__${summaryPercent}`;
};

export const useShare = () => {
  const url = useRecoilValue(urlState);
  const title = useTitle();
  const summary = useRecoilValue(summaryState);
  const emotionsLabels = useRecoilValue(emotionsLabelsState);
  const extractHTMLLabels = useSubheadings();
  const entitiesLabels = useRecoilValue(entitiesStateAtom);
  const [share, setShare] = useRecoilState(shareAtom);
  const shareKey = useShareKey();
  const shareCurrent = async () => {
    console.debug('[shareCurrent] summary:', summary);
    if (summary === DATA_LOADING) {
      return;
    }
    const id = (Math.random() + 1).toString(36).substring(5);
    if (shareKey in share) {
      return share[shareKey];
    }
    const data = {
      id,
      url,
      title,
      summary,
      emotionsLabels,
      extractHTMLLabels,
      entitiesLabels,
    };
    const res = await createDoc(data);
    if (res === false) {
      return false;
    }
    setShare((prev: any) => {
      return { ...prev, [shareKey]: id };
    });
    console.debug('[shareCurrent] data:', data);
    return { [shareKey]: id };
  };
  return { shareCurrent };
};
