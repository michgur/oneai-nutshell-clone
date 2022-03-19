import React from 'react';
import ReactTooltip from 'react-tooltip';
import QuestionMark from '../../../assets/img/question-mark.svg';
import { useEventLogger, UserEvent } from '../lib/event-logger';
import { IconLink } from './link';

export default function Footer() {
  const { eventLogger } = useEventLogger();

  return (
    <footer className="grid grid-cols-1fr-auto items-center gap-x-4 p-4 py-2">
      <span className="text-gray font-light items-center">
        Built with One AI's Language Skills
      </span>
      <IconLink
        href={'https://www.oneai.com/skills?utm_source=nutshell'}
        dataTip={'View a full list of our skills!'}
        dataFor={'footer-skills'}
        ariaLabel={'View a full list of our skills!'}
        onClick={() => {
          eventLogger(UserEvent.CLICKED_POWERED_BY);
        }}
      >
        <img src={QuestionMark} alt="help" />
      </IconLink>
      <ReactTooltip place={'top'} id={'footer-skills'} />
    </footer>
  );
}
