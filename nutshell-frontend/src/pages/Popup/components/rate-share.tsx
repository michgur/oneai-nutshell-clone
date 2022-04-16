import React from 'react';
import ReactTooltip from 'react-tooltip';
import { useEventLogger, UserEvent } from '../lib/event-logger';
import { IconButton } from './button';
import { ShareIcon, ThubsDownIcon, ThubsUpIcon } from './icons';

export default function RateShareSection() {
  return (
    <div className="mt-4 grid grid-cols-1fr-3-auto gap-x-4 items-center mb-4">
      <h2 className="font-poppins font-semibold">
        You can rate or share this summary
      </h2>
      <ThumbsUp />
      <ThumbsDown />
      <Share />
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
        className={
          '!bg-darkGray !rounded-none !p-3 !w-16 !h-16 text-blue hover:opacity-50 duration-300'
        }
      >
        <ThubsUpIcon />
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
        className={
          '!bg-darkGray !rounded-none !p-3 !w-16 !h-16 text-blue hover:opacity-50 duration-300'
        }
      >
        <ThubsDownIcon />
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
        className={
          '!bg-blue !rounded-none !p-3 !w-16 !h-16 text-white hover:opacity-50 duration-300'
        }
      >
        <ShareIcon />
      </IconButton>
      <ReactTooltip id={'controls-share'} />
    </>
  );
};
