import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { entitiesStateAtom, summaryState } from '../lib/atoms';
import { DATA_LOADING, SUMMARY_ERROR } from '../lib/data-bus';
import { Label } from '../lib/interface';
import { useTitle } from '../lib/utils';
import { Spinner } from './spinner';
import { Section } from './wrappers';

export function SummarySection() {
  const text = useRecoilValue(summaryState);
  const title = useTitle();

  return (
    <>
      <h1 className="text-lg pb-2 pt-4 font-poppins font-semibold">{title}</h1>
      <Section className="font-poppins text-md mb-4 leading-6 h-summary overflow-auto">
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
    if (entitites === undefined) {
      return;
    }
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
      <div
        style={{ wordBreak: 'break-word' }}
        dangerouslySetInnerHTML={{ __html: textTransformed }}
      ></div>
    </>
  );
}
