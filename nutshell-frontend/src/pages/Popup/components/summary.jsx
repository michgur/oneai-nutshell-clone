import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { summaryState, urlState } from '../lib/atoms';
import { extractOutput } from '../lib/comm';
import { Button } from './button';
import { Spinner } from './spinner';
import { SectionHeader } from './text';
import { Section } from './wrappers';

const SUMMARY_LOADING = 'SUMMARY_LOADING';
const SUMMARY_ERROR = 'We ran into an issue. Sorry for that 😞';

export function SummarySection() {
  const text = useRecoilValue(summaryState);
  return (
    <Section className="pb-8">
      {text === '' ? null : (
        <>
          <SectionHeader>Summary</SectionHeader>
          {text === SUMMARY_LOADING ? (
            <Spinner className={'justify-self-center'} />
          ) : // 'Loading'
          text === SUMMARY_ERROR ? (
            <div role={alert} className="mt-4">
              {text}
            </div>
          ) : (
            <div className="mt-4">{text}</div>
          )}
        </>
      )}
    </Section>
  );
}

export function SummaryButton() {
  const setText = useSetRecoilState(summaryState);
  const url = useRecoilValue(urlState);
  const onClick = async (event) => {
    console.log('result');
    setText(SUMMARY_LOADING);
    const result = await extractOutput(url);
    console.log(result);
    if (result === null) {
      setText(SUMMARY_ERROR);
    } else {
      setText(result.output[0].text);
    }
  };

  return (
    <Button onClick={onClick} className={'bg-yellow rounded-full text-dark'}>
      Summarize page
    </Button>
  );
}
