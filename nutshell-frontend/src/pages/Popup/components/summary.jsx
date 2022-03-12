import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { entitiesStateAtom, pageTitleAtom, summaryState } from '../lib/atoms';
import { DATA_LOADING, SUMMARY_ERROR } from '../lib/data-bus';
import { Spinner } from './spinner';
import { Section } from './wrappers';

export function SummarySection() {
  const text = useRecoilValue(summaryState);
  const title = useRecoilValue(pageTitleAtom);
  return (
    <>
      <h1 className="text-xl pb-4">{title}</h1>
      <Section className="font-roboto text-lg leading-6 h-summary overflow-auto">
        {text === '' ? null : (
          <>
            {text === DATA_LOADING ? (
              <div>
                <span role="alert">Loading summary...</span>
                <Spinner className={'mt-4'} />
              </div>
            ) : // 'Loading'
            text === SUMMARY_ERROR ? (
              <div role={'alert'}>{text}</div>
            ) : (
              <SummaryText text={text} />
            )}
          </>
        )}
      </Section>
    </>
  );
}

const replaceRange = (str, start, end, substitute) => {
  return str.substring(0, start) + substitute + str.substring(end);
};

const highLightSpan = (text, label) => {
  // debugger;
  return replaceRange(
    text,
    label.span[0],
    label.span[1],
    `<span class="text-cyan">${text.slice(label.span[0], label.span[1])}</span>`
  );
};

function SummaryText({ text }) {
  const entitites = useRecoilValue(entitiesStateAtom);
  const [textTransformed, setTextTransformed] = React.useState('');
  // debugger;
  useEffect(() => {
    let t = text;
    entitites
      .slice(0, 6)
      .reverse()
      .forEach((label) => {
        t = highLightSpan(t, label);
      });
    setTextTransformed(t);
    // debugger;
  }, [text, entitites]);

  return (
    <>
      <span className="text-purple"></span>
      <div dangerouslySetInnerHTML={{ __html: textTransformed }}></div>
    </>
  );
}
