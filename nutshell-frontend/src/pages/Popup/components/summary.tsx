import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { entitiesStateAtom, pageTitleAtom, summaryState } from '../lib/atoms';
import { DATA_LOADING, SUMMARY_ERROR } from '../lib/data-bus';
import { Label } from '../lib/interface';
import { Spinner } from './spinner';
import { Section } from './wrappers';

export function SummarySection() {
  const text = useRecoilValue(summaryState);
  const title = useRecoilValue(pageTitleAtom);
  return (
    <>
      <h1 className="text-xl pb-8">{title}</h1>
      <Section className="font-roboto text-lg leading-6 h-summary overflow-auto">
        {text === '' ? null : (
          <>
            {text === DATA_LOADING ? (
              <Loading />
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

const Loading = () => {
  return (
    <div>
      <div className="h-full grid items-center grid-rows-auto-1fr">
        <span role="alert" className="h-fit">
          Loading summary...
        </span>
        <Spinner className={'mt-4'} />
      </div>
    </div>
  );
};

const replaceRange = (
  str: string,
  start: number,
  end: number,
  substitute: string
) => {
  return str.substring(0, start) + substitute + str.substring(end);
};

const highLightSpan = (text: string, label: Label) => {
  // debugger;
  return replaceRange(
    text,
    label.span[0],
    label.span[1],
    `<span class="text-cyan">${text.slice(label.span[0], label.span[1])}</span>`
  );
};

function SummaryText({ text }: { text: string }) {
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
      <div dangerouslySetInnerHTML={{ __html: textTransformed }}></div>
    </>
  );
}
