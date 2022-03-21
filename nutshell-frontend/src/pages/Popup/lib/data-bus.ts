import { useEffect } from 'react';
import {
  SetterOrUpdater,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';
import {
  articleTextAtom,
  emotionsLabelsState,
  entitiesStateAtom,
  htmlDocumentState,
  openClosedAtom,
  summaryPercentState,
  summaryState,
  urlState,
} from './atoms';
import { extractTextFromHtml, fromCache } from './comm';
import { useEventLogger, UserEvent } from './event-logger';
import { sendShowEmotions } from './utils';

export const DATA_LOADING = 'DATA_LOADING';
export const SUMMARY_ERROR = 'We ran into an issue. Sorry for that 😞';
export const EMOTIONS_ERROR: any[] = [];

export default function DataBUS() {
  console.debug('[@@@@ DataBUS] start');
  const [text, setText]: any = useRecoilState(summaryState);
  const setEntities = useSetRecoilState(entitiesStateAtom);
  const setEmotionsLabels: any = useSetRecoilState(emotionsLabelsState);
  const summaryPercent = useRecoilValue(summaryPercentState);
  const htmlCode: string = useRecoilValue(htmlDocumentState);
  const setArticleText: SetterOrUpdater<string> =
    useSetRecoilState(articleTextAtom);
  const url: string = useRecoilValue(urlState);
  const openClosed = useRecoilValue(openClosedAtom);
  const { eventLogger } = useEventLogger();
  useEffect(() => {
    console.debug('[@@@@ DataBUS] start');
    if (openClosed === false) {
      console.debug('[@@@@ DataBUS] app is closed, not loading');
      return;
    }
    const loadData = async () => {
      if (url === '') {
        return;
      }
      let result;
      if (true) {
        const cacheRes = fromCache(url, String(summaryPercent));
        // const cacheRes = null;
        if (cacheRes !== null) {
          result = cacheRes;
        } else {
          setText(DATA_LOADING);
          console.debug(
            '[@@@@ DataBUS] extractTextFromHtm htmlCode.length',
            htmlCode.length
          );
          eventLogger(UserEvent.SUUMARIZED_ARTICLE, { url: url });
          result = await extractTextFromHtml(htmlCode, {
            summaryLength: summaryPercent,
            setArticleText,
          });
        }
      } else {
        result = JSON.parse(
          `{"input_text":"ArticleDan was very angry and sad. One month after the United States began what has become a troubled rollout of a national COVID vaccination campaign, the effort is finally gathering real steam. Close to a million doses -- over 951,000, to be more exact -- made their way into the arms of Americans in the past 24 hours, the U.S. Centers for Disease Control and Prevention reported Wednesday. That's the largest number of shots given in one day since the rollout began and a big jump from the previous day, when just under 340,000 doses were given, CBS News reported. That number is likely to jump quickly after the federal government on Tuesday gave states the OK to vaccinate anyone over 65 and said it would release all the doses of vaccine it has available for distribution. Meanwhile, a number of states have now opened mass vaccination sites in an effort to get larger numbers of people inoculated, CBS News reported.","status":"success","output":[{"text_generated_by_step_name":"input","text_generated_by_step_id":0,"text":"ArticleDan was very angry and sad. One month after the United States began what has become a troubled rollout of a national COVID vaccination campaign, the effort is finally gathering real steam. Close to a million doses -- over 951,000, to be more exact -- made their way into the arms of Americans in the past 24 hours, the U.S. Centers for Disease Control and Prevention reported Wednesday. That's the largest number of shots given in one day since the rollout began and a big jump from the previous day, when just under 340,000 doses were given, CBS News reported. That number is likely to jump quickly after the federal government on Tuesday gave states the OK to vaccinate anyone over 65 and said it would release all the doses of vaccine it has available for distribution. Meanwhile, a number of states have now opened mass vaccination sites in an effort to get larger numbers of people inoculated, CBS News reported.","labels":[{"type":"emotion","name":"sadness","span":[0,34],"value":null,"output_spans":[{"section":0,"start":0,"end":34}],"input_spans":null,"span_text":"ArticleDan was very angry and sad."}]},{"text_generated_by_step_name":"summarize","text_generated_by_step_id":1,"text":"Close to a million doses -- over 951,000, to be more exact -- made their way into the arms of Americans in the past 24 hours. That's the largest number of shots given in one day since the rollout began and a big jump from the previous day, when just under 340,000 doses were given. That number is likely to jump quickly after the federal government on Tuesday gave states the OK to vaccinate anyone over 65 and said it would release all the doses of vaccine it has available for distribution. Meanwhile, a number of states have now opened mass vaccination sites in an effort to get larger numbers of people inoculated, CBS News reported. The U.S. began what has become a troubled rollout of a national","labels":[{"type":"entity","name":"CARDINAL","span":[11,18],"value":"million","output_spans":[{"section":0,"start":11,"end":18}],"input_spans":null,"span_text":"million"},{"type":"entity","name":"CARDINAL","span":[33,40],"value":"951,000","output_spans":[{"section":0,"start":33,"end":40}],"input_spans":null,"span_text":"951,000"},{"type":"entity","name":"NORP","span":[94,103],"value":"Americans","output_spans":[{"section":0,"start":94,"end":103}],"input_spans":null,"span_text":"Americans"},{"type":"entity","name":"TIME","span":[107,124],"value":"the past 24 hours","output_spans":[{"section":0,"start":107,"end":124}],"input_spans":null,"span_text":"the past 24 hours"},{"type":"entity","name":"DATE","span":[170,177],"value":"one day","output_spans":[{"section":0,"start":170,"end":177}],"input_spans":null,"span_text":"one day"},{"type":"entity","name":"DATE","span":[222,238],"value":"the previous day","output_spans":[{"section":0,"start":222,"end":238}],"input_spans":null,"span_text":"the previous day"},{"type":"entity","name":"CARDINAL","span":[245,263],"value":"just under 340,000","output_spans":[{"section":0,"start":245,"end":263}],"input_spans":null,"span_text":"just under 340,000"},{"type":"entity","name":"DATE","span":[352,359],"value":"Tuesday","output_spans":[{"section":0,"start":352,"end":359}],"input_spans":null,"span_text":"Tuesday"},{"type":"entity","name":"DATE","span":[399,406],"value":"over 65","output_spans":[{"section":0,"start":399,"end":406}],"input_spans":null,"span_text":"over 65"},{"type":"entity","name":"ORG","span":[619,627],"value":"CBS News","output_spans":[{"section":0,"start":619,"end":627}],"input_spans":null,"span_text":"CBS News"},{"type":"entity","name":"GPE","span":[642,646],"value":"U.S.","output_spans":[{"section":0,"start":642,"end":646}],"input_spans":null,"span_text":"U.S."}]}]}`
        );
      }
      console.debug('[@@@@ DataBUS] await result', result);
      if (result === null) {
        setText(SUMMARY_ERROR);
        setEmotionsLabels(EMOTIONS_ERROR);
      } else {
        // debugger;
        setText(result?.output[1]?.text);
        setEntities(result?.output[1]?.labels);
        const emotionsLabels = result.output[0].labels;
        setEmotionsLabels(result.output[0].labels);
        setTimeout(() => {
          sendShowEmotions(emotionsLabels);
        }, 200);
      }
    };
    console.debug(
      '[@@@@ DataBUS]\nuseEffect url',
      url,
      'text.length',
      text?.length
    );
    if (htmlCode) {
      loadData();
    }
  }, [url, summaryPercent, htmlCode, openClosed]);

  return null;
}
