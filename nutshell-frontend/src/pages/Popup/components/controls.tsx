import React from 'react';
import ReactTooltip from 'react-tooltip';
import ShareSVG from '../../../assets/img/share.svg';
import ThumbsDownSVG from '../../../assets/img/thumbs-down.svg';
import ThumbsUpSVG from '../../../assets/img/thumbs-up.svg';
import { useEventLogger, UserEvent } from '../lib/event-logger';
import { IconButton } from './button';
import { SummarySlider } from './slider';

export default function ControlsSection() {
  return (
    <div className="mt-8 grid grid-cols-1fr-3-auto">
      <SummarySlider />
      <ThumbsUp />
      <ThumbsDown />
      {/* <Share /> */}
    </div>
  );
}

const ThumbsUp = () => {
  const { eventLogger } = useEventLogger();
  return (
    <>
      <IconButton
        onClick={() => {
          eventLogger(UserEvent.CLICKED_LIKE);
        }}
        dataTip={'Like'}
        dataFor={'controls-like'}
        ariaLabel={'Like'}
      >
        <img src={ThumbsUpSVG} alt="like this summary" />
      </IconButton>
      <ReactTooltip id={'controls-like'} />
    </>
  );
};

const ThumbsDown = () => {
  const { eventLogger } = useEventLogger();
  return (
    <>
      <IconButton
        onClick={() => {
          eventLogger(UserEvent.CLICKED_DISLIKE);
        }}
        dataTip={'Dislike'}
        dataFor={'controls-dislike'}
        ariaLabel={'Dislike'}
      >
        <img src={ThumbsDownSVG} alt="Dislike this summary" />
      </IconButton>
      <ReactTooltip id={'controls-dislike'} />
    </>
  );
};

const Share = () => {
  const { eventLogger } = useEventLogger();
  return (
    <>
      <IconButton
        onClick={() => {
          eventLogger(UserEvent.CLICKED_SHARE);
        }}
        dataTip={'Share'}
        dataFor={'controls-share'}
        ariaLabel={'share'}
      >
        <img src={ShareSVG} alt="Share nutshell summary" />
      </IconButton>
      <ReactTooltip id={'controls-share'} />
    </>
  );
};
