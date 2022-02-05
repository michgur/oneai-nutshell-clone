import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  emotionsLabelsState,
  htmlDocumentState,
  summaryPercentState,
  summaryState,
  urlState,
} from "./atoms";
import { extractTextFromHtml, fromCache } from "./comm";

export const DATA_LOADING = "DATA_LOADING";
export const SUMMARY_ERROR = "We ran into an issue. Sorry for that 😞";
export const EMOTIONS_ERROR: any[] = [];

export default function DataBUS() {
  const [text, setText]: any = useRecoilState(summaryState);
  const [emotionsLabels, setEmotionsLabels]: any =
    useRecoilState(emotionsLabelsState);
  const summaryPercent = useRecoilValue(summaryPercentState);
  const htmlCode: string = useRecoilValue(htmlDocumentState);
  const url: string = useRecoilValue(urlState);
  useEffect(() => {
    const loadData = async () => {
      let result;
      const cacheRes = fromCache(url, String(summaryPercent));
      if (cacheRes !== null) {
        result = cacheRes;
      } else {
        setText(DATA_LOADING);
        result = await extractTextFromHtml(htmlCode);
      }
      console.log("[@@@@ DataBUS] await result", result);
      if (result === null) {
        setText(SUMMARY_ERROR);
        setEmotionsLabels(EMOTIONS_ERROR);
      } else {
        setText(result?.output[1]?.text);
        setEmotionsLabels(result.output[0].labels);
      }
    };
    console.log(
      "[@@@@ DataBUS]\nuseEffect url",
      url,
      "text.length",
      text.length,
      "htmlCode",
      htmlCode,
    );
    if (htmlCode) {
      loadData();
    }
  }, [url, summaryPercent, htmlCode]);

  return null;
}
