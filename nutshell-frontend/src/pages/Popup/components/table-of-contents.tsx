import React, { useState } from 'react';
import { Collapse } from 'react-collapse';
import { useRecoilValue } from 'recoil';
import { extractHTMLAtom } from '../lib/atoms';
import { scrollToElement, subheadingLabelToLabelID } from '../lib/utils';
import { IconButton } from './button';
import { ChevronDownIcon } from './icons';
// import { PlusIcon } from './icons';
import { SectionHeader } from './text';

export function TableOfContents() {
  const extractHTMLContent = useRecoilValue(extractHTMLAtom);

  const getSubheadings = () => {
    try {
      const res = extractHTMLContent?.labels?.filter((label: any) => {
        return label.name === 'subheading';
      });
      return res === undefined ? [] : res;
    } catch (error) {
      return [];
    }
  };

  const onClick = (subheadingLabel: any) => {
    scrollToElement(subheadingLabelToLabelID(subheadingLabel));
  };
  const subheadings = getSubheadings();

  if (subheadings.length === 0) {
    return null;
  }
  return (
    <div className="mt-4 grid grid-cols-1 bg-darkGray px-4 py-3">
      <Accordion>
        <AccordionSpacer height="16px" />
        <ul className="grid grid-cols-1fr gap-y-4">
          {subheadings.map((subheadingLabel: any) => (
            <li key={subheadingLabel.span[0]}>
              <button
                onClick={() => onClick(subheadingLabel)}
                className="text-left hover:text-blue duration-300"
              >
                {subheadingLabel?.value}
              </button>
            </li>
          ))}
        </ul>
      </Accordion>
    </div>
  );
}

export function Accordion({ children }: any) {
  const [isOpened, setState] = useState(false);
  const toggle = () => {
    console.log('TOGGLE');
    setState((prev) => !prev);
  };
  return (
    <>
      <div className="grid grid-cols-1fr-auto-auto items-center">
        <SectionHeader>Table Of Contents</SectionHeader>
        {/* <span className="w-8 h-8 grid items-center justify-items-center">
          <PlusIcon />
        </span> */}
        <IconButton
          onClick={toggle}
          ariaLabel="Close One AI nutshell"
          className={`!w-8 !h-8 text-blue hover:text-cyan origin-center rotate-0 ${
            isOpened ? '!rotate-180' : ''
          }`}
        >
          <ChevronDownIcon />
        </IconButton>
      </div>
      <Collapse isOpened={isOpened}>{children}</Collapse>
    </>
  );
}

export const AccordionSpacer = ({ height = '8px' }: { height?: string }) => {
  return <div style={{ height: height }}></div>;
};
