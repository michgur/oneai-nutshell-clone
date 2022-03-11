import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageTitleAtom, summaryState } from '../lib/atoms';
import { DATA_LOADING, SUMMARY_ERROR } from '../lib/data-bus';
import { Spinner } from './spinner';
import { Section } from './wrappers';

export function SummarySection() {
  const [text, setText] = useRecoilState(summaryState);
  const title = useRecoilValue(pageTitleAtom);
  return (
    <>
      <h1 className="text-xl pb-4">{title}</h1>
      <Section className="mb-8 font-roboto text-lg leading-6 h-80 overflow-y-scroll	">
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
    </>
  );
}
