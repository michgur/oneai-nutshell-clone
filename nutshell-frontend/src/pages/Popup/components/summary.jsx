import React from 'react';
import { useRecoilState } from 'recoil';
import { summaryState } from '../lib/atoms';
import { extractOutput } from '../lib/comm';
import { Button } from './button';
import { Spinner } from './spinner';
import { SectionHeader } from './text';
import { Section } from './wrappers';

const SUMMARY_LOADING = 'SUMMARY_LOADING';
const SUMMARY_ERROR = 'We ran into an issue. Sorry for that 😞';

export function SummarySection() {
  const [text, setText] = useRecoilState(summaryState);
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
  const [text, setText] = useRecoilState(summaryState);

  const onClick = async (event) => {
    const url =
      'https://donaldgmcneiljr1954.medium.com/trump-backs-boosters-clearly-someone-did-the-math-for-him-153a2ff62718';
    // 'https://medium.com/the-defi-wonderland/wonderland-update-transition-to-wmemo-d57845560832';
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
