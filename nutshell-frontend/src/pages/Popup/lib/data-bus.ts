import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  emotionsLabelsState,
  summaryPercentState,
  summaryState,
  urlState,
} from './atoms';
import { extractOutput } from './comm';

export const DATA_LOADING = 'DATA_LOADING';
export const SUMMARY_ERROR = 'We ran into an issue. Sorry for that 😞';
export const EMOTIONS_ERROR: any[] = [];

export default function DataBUS() {
  const [text, setText]: any = useRecoilState(summaryState);
  const [emotionsLabels, setEmotionsLabels]: any =
    useRecoilState(emotionsLabelsState);
  const summaryPercent = useRecoilValue(summaryPercentState);
  const url: string = useRecoilValue(urlState);

  useEffect(() => {
    const loadData = async () => {
      setText(DATA_LOADING);
      const result = await extractOutput({
        url,
        summary_percent: summaryPercent,
      });
      console.log('[@@@@ DataBUS] await result', result);
      if (result === null) {
        setText(SUMMARY_ERROR);
        setEmotionsLabels(EMOTIONS_ERROR);
      } else {
        setText(result.output[1].text);
        setEmotionsLabels(result.output[0].labels);
      }
    };
    console.log(
      '[@@@@ DataBUS]\nuseEffect url',
      url,
      'text.length',
      text.length
    );
    if (url && text.length) {
      loadData();
    }
  }, [url, summaryPercent]);

  return null;
}
