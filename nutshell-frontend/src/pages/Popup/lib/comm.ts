import { LS_PREFIX } from './atoms';
import { SUMMARY_ERROR } from './data-bus';
import { PipelineOpts } from './interface';
import { requestHeader, sendAddIDToElements } from './utils';
const apiURL = 'https://api.oneai.com/api/v0/pipeline';
const apiAnalytics = 'https://api.oneai.com/analytics/apps/nutshell';

const mock = false;

export async function sendBIEvent(eventData: any) {
  try {
    await fetch(apiAnalytics, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventData),
    });
  } catch (error) {
    console.error('[sendBIEvent] error:', error);
  }
}

export async function runPipeline(url: string, opts: PipelineOpts) {
  try {
    const rawResponse = await fetch(apiURL, {
      method: 'POST',
      headers: { ...requestHeader },
      body: JSON.stringify({
        text: url,
        input_type: 'article',
        steps: [
          { skill: 'extract-html' },
          { skill: 'emotions' },
          { skill: 'summarize', params: { find_origins: true } },
          { skill: 'entities' },
        ],
      }),
    });
    const response = await rawResponse.json();
    const title =
      response?.output?.[0]?.labels?.filter((label: any) => {
        return label.name === 'title';
      }) || '';
    const subheadings =
      response?.output?.[0]?.labels?.filter((label: any) => {
        return label.name === 'subheading';
      }) || [];
    sendAddIDToElements(subheadings);

    opts.setExtractHTML(response?.output?.[0]);
    opts.setArticleText(title);
    return response;
  } catch (error) {
    console.debug('[@@@@ runPipeline] error', error);
    return null;
  }
}

function sleep(ms: any) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const fromCache = (url: string, summary_percent: string) => {
  try {
    const result = { output: [{ labels: [] }, { text: '' }] };
    let summary = localStorage.getItem(
      `${LS_PREFIX}__${'summaryState'}__${url}__${summary_percent}`
    );
    let emotions = localStorage.getItem(
      `${LS_PREFIX}__${'emotionsLabelsState'}__${url}`
    );
    if (summary && emotions) {
      console.debug('[@@@@ fromCache] summary', summary);
      result.output[1].text = JSON.parse(summary);
      if (
        result.output[1].text === 'DATA_LOADING' ||
        result.output[1].text === SUMMARY_ERROR
      ) {
        return null;
      }
      result.output[0].labels = JSON.parse(emotions);
      return result;
    }
    console.debug('[@@@@ fromCache] summary null');
    return null;
  } catch (error) {
    console.debug('[@@@@ fromCache] summary error null');
    return null;
  }
};

const mockResponse = {
  input_text:
    "One month after the United States began what has become a troubled rollout of a national COVID vaccination campaign, the effort is finally gathering real steam.<div><div>I was very Sad.\nI was very Happy.\nI was very Sad.\nClose to a million doses -- over 951,000, to be more exact -- made their way into the arms of Americans in the past 24 hours, the U.S. Centers for Disease Control and Prevention reported Wednesday. That's the largest number of shots given in one day since the rollout began and a big jump from the previous day, when just under 340,000 doses were given, CBS News reported.\nThat number is likely to jump quickly after the federal government on Tuesday gave states the OK to vaccinate anyone over 65 and said it would release all the doses of vaccine it has available for distribution. Meanwhile, a number of states have now opened mass vaccination sites in an effort to get larger numbers of people inoculated, CBS News reported.</div></div>",
  status: 'success',
  output: [
    {
      text_generated_by_step_name: 'input',
      text_generated_by_step_id: 0,
      text: "One month after the United States began what has become a troubled rollout of a national COVID vaccination campaign, the effort is finally gathering real steam.<div><div>I was very Sad.\nI was very Happy.\nI was very Sad.\nClose to a million doses -- over 951,000, to be more exact -- made their way into the arms of Americans in the past 24 hours, the U.S. Centers for Disease Control and Prevention reported Wednesday. That's the largest number of shots given in one day since the rollout began and a big jump from the previous day, when just under 340,000 doses were given, CBS News reported.\nThat number is likely to jump quickly after the federal government on Tuesday gave states the OK to vaccinate anyone over 65 and said it would release all the doses of vaccine it has available for distribution. Meanwhile, a number of states have now opened mass vaccination sites in an effort to get larger numbers of people inoculated, CBS News reported.</div></div>",
      labels: [
        {
          type: 'emotion',
          name: 'happiness',
          span: [186, 203],
          value: null,
          output_spans: [{ section: 0, start: 186, end: 203 }],
          input_spans: null,
          span_text: 'I was very Happy.',
        },
        {
          type: 'emotion',
          name: 'sadness',
          span: [204, 219],
          value: null,
          output_spans: [{ section: 0, start: 204, end: 219 }],
          input_spans: null,
          span_text: 'I was very Sad.',
        },
        {
          type: 'emotion',
          name: 'sadness',
          span: [220, 354],
          value: null,
          output_spans: [{ section: 0, start: 220, end: 354 }],
          input_spans: null,
          span_text:
            'Close to a million doses -- over 951,000, to be more exact -- made their way into the arms of Americans in the past 24 hours, the U.S.',
        },
        {
          type: 'emotion',
          name: 'anger',
          span: [804, 960],
          value: null,
          output_spans: [{ section: 0, start: 804, end: 960 }],
          input_spans: null,
          span_text:
            'Meanwhile, a number of states have now opened mass vaccination sites in an effort to get larger numbers of people inoculated, CBS News reported.</div></div>',
        },
      ],
    },
    {
      text_generated_by_step_name: 'summarize',
      text_generated_by_step_id: 2,
      text: "Over 951,000 doses of the COVID vaccine were given in the past 24 hours. That's the largest number of shots given in one day since the rollout began. That number is likely to jump quickly after the federal government gave states the OK to vaccinate anyone over 65.",
      labels: [],
    },
  ],
};
