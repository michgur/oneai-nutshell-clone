import { LS_PREFIX } from './atoms';
import { SUMMARY_ERROR } from './data-bus';
import { PipelineOpts } from './interface';
import { requestHeader, requestSteps } from './utils';
const apiURL = 'https://api.oneai.com/api/v0/pipeline';

const mock = false;

export async function extractTextFromHtml(
  htmlCode: string,
  opts: PipelineOpts
) {
  try {
    const rawResponse = await fetch(apiURL, {
      method: 'POST',
      headers: { ...requestHeader },
      body: JSON.stringify({
        text: htmlCode,
        input_type: 'article',
        steps: [{ ...requestSteps.extractHtml }],
      }),
    });
    const response = await rawResponse.json();
    const textFromHTml = response?.output?.[0]?.text || '';
    const responseEmotions = await extractEmotions(textFromHTml);
    const responseSummarize = await extractSummarize(textFromHTml, opts);
    console.debug('[@@@@ extractOutput] response', response);
    console.debug('[@@@@ responseEmotions]', responseEmotions);
    console.debug('[@@@@ responseSummarize]', responseSummarize);
    responseEmotions.output = [
      ...responseEmotions.output,
      ...responseSummarize.output,
    ];
    return responseEmotions;
  } catch (error) {
    console.debug('[@@@@ extractOutput] error', error);
    return null;
  }
}

export async function extractEmotions(text: string) {
  try {
    const rawResponse = await fetch(apiURL, {
      method: 'POST',
      headers: { ...requestHeader },
      body: JSON.stringify({
        text: text,
        input_type: 'auto-detect',
        steps: [{ ...requestSteps.emotions }],
      }),
    });
    const response = await rawResponse.json();
    console.debug('[@@@@ extractEmotions] response', response);
    return response;
  } catch (error) {
    console.debug('[@@@@ extractEmotions] error', error);
    return null;
  }
}

export async function extractSummarize(text: string, opts: PipelineOpts) {
  // const length = Math.floor((text.length * opts.summaryPercent) / 100);
  // const range = 40;
  // const params = {
  //   params: { min_length: length - range, max_length: length + range },
  // };
  // const steps = [{ ...requestSteps.summarize, ...params }];
  const params = {
    min_length: opts.summaryLength,
    max_length: opts.summaryLength,
  };
  const steps = [
    { ...requestSteps.summarize, params },
    { ...requestSteps.entities },
  ];
  console.debug('[@@@@ extractSummarize] steps', steps);
  try {
    const rawResponse = await fetch(apiURL, {
      method: 'POST',
      headers: { ...requestHeader },
      body: JSON.stringify({
        text: text,
        input_type: 'auto-detect',
        steps,
      }),
    });
    const response = await rawResponse.json();
    console.debug('[@@@@ extractSummarize] response', response);
    return response;
  } catch (error) {
    console.debug('[@@@@ extractSummarize] error', error);
    return null;
  }
}

export async function extractOutput({
  url,
  summary_percent,
}: {
  url: string;
  summary_percent: number;
}) {
  try {
    const fullURL = new URL(apiURL);
    fullURL.searchParams.append('url', url);
    fullURL.searchParams.append('summary_percent', String(summary_percent));
    const cacheRes = fromCache(url, String(summary_percent));
    console.debug('[@@@@ extractOutput] cacheRes', cacheRes);
    if (cacheRes !== null) {
      return cacheRes;
    }
    if (mock) {
      await sleep(2000);
      return mockResponse;
    }
    const rawResponse = await fetch(fullURL.href, {});
    const response = await rawResponse.json();
    console.debug('[@@@@ extractOutput] response', response);
    return response;
  } catch (error) {
    console.debug('[@@@@ extractOutput] error', error);
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
