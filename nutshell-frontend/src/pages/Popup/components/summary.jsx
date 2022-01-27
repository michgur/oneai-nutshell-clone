import React from 'react';
import { useRecoilState } from 'recoil';
import { summaryState } from '../lib/atoms';
import { DATA_LOADING, SUMMARY_ERROR } from '../lib/data-bus';
import { Spinner } from './spinner';
import { Section } from './wrappers';

export function SummarySection() {
  const [text, setText] = useRecoilState(summaryState);
  console.log('!!!!!!!!!!!!!!!!!!!', text);
  return (
    <Section className="pb-8 font-roboto text-lg leading-6">
      {text === '' ? null : (
        <>
          {text === DATA_LOADING ? (
            <>
              <span role="alert">Loading summary...</span>
              <Spinner className={'mt-4'} />
            </>
          ) : // 'Loading'
          text === SUMMARY_ERROR ? (
            <div role={'alert'}>{text}</div>
          ) : (
            <div>{text}</div>
          )}
        </>
      )}
    </Section>
  );
}
