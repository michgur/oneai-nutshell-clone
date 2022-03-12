import { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  emotionsLabelsState,
  entitiesStateAtom,
  htmlDocumentState,
  summaryPercentState,
  summaryState,
  urlState,
} from './atoms';
import { extractTextFromHtml, fromCache } from './comm';

export const DATA_LOADING = 'DATA_LOADING';
export const SUMMARY_ERROR = 'We ran into an issue. Sorry for that 😞';
export const EMOTIONS_ERROR: any[] = [];

export default function DataBUS() {
  console.log('[@@@@ DataBUS] start');
  const [text, setText]: any = useRecoilState(summaryState);
  const setEntities = useSetRecoilState(entitiesStateAtom);
  const setEmotionsLabels: any = useSetRecoilState(emotionsLabelsState);
  const summaryPercent = useRecoilValue(summaryPercentState);
  const htmlCode: string = useRecoilValue(htmlDocumentState);
  const url: string = useRecoilValue(urlState);
  useEffect(() => {
    console.log('[@@@@ DataBUS] start');
    const loadData = async () => {
      let result;
      const cacheRes = fromCache(url, String(summaryPercent));
      if (cacheRes !== null) {
        result = cacheRes;
      } else {
        setText(DATA_LOADING);
        console.log(
          '[@@@@ DataBUS] extractTextFromHtm htmlCode.length',
          htmlCode.length
        );
        result = await extractTextFromHtml(htmlCode, { summaryPercent });
      }
      console.log('[@@@@ DataBUS] await result', result);
      if (result === null) {
        setText(SUMMARY_ERROR);
        setEmotionsLabels(EMOTIONS_ERROR);
      } else {
        // debugger;
        setText(result?.output[1]?.text);
        setEntities(result?.output[1]?.labels);
        setEmotionsLabels(result.output[0].labels);
      }
    };
    console.log(
      '[@@@@ DataBUS]\nuseEffect url',
      url,
      'text.length',
      text?.length
    );
    if (htmlCode) {
      loadData();
    }
  }, [url, summaryPercent, htmlCode]);

  return null;
}
