import { default as React } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactTooltip from 'react-tooltip';
import { useRecoilValue } from 'recoil';
import { summaryState } from '../lib/atoms';
import { DATA_LOADING } from '../lib/data-bus';
import { useEventLogger, UserEvent } from '../lib/event-logger';
import { IconButton } from './button';
import { ShareIcon, ThubsDownIcon, ThubsUpIcon } from './icons';
import { useShare, useShareKey } from './share';

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
  const { shareCurrent } = useShare();
  const summary = useRecoilValue(summaryState);
  const shareKey = useShareKey();

  const onClick = async () => {
    eventLogger(UserEvent.CLICKED_SHARE);
    if (summary === DATA_LOADING) {
      toast(`Please wait for summary to load`);
      return;
    }
    const res = await shareCurrent();
    if (res === false) {
      toast(`Sorry, something went wrong, We're checking!`);
      return;
    }

    if (res?.[shareKey]) {
      const link = `https://oneai.com/nutshell-share/${res?.[shareKey]}`;
      navigator.clipboard
        .writeText(link)
        .then(() => {
          toast('Link was copied to clipboard!');
        })
        .catch((err) => {
          console.debug('[Share] copy to clipboard error:', err);
          toast(`Here is your link: ${link}`);
        });
    }
  };

  return (
    <>
      <IconButton
        onClick={onClick}
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
      <ToastContainer
        toastClassName={'!bg-blue !text-white'}
        position="bottom-left"
        autoClose={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
      />
    </>
  );
};
