import React from 'react';
import ReactTooltip from 'react-tooltip';
import { useRecoilValue } from 'recoil';
import { emotionsLabelsState } from '../lib/atoms';
import { DATA_LOADING } from '../lib/data-bus';
import { useEventLogger, UserEvent } from '../lib/event-logger';
import { Label } from '../lib/interface';
import {
  capitalizeFirstLetter,
  emotionLabelToLabelID,
  scrollToElement,
  sendToggleEmotions,
} from '../lib/utils';
import { IconButton } from './button';
import { EmptyEmotionsIcons, EyeIcon } from './icons';
import { SectionHeader } from './text';

export function EmotionsSection() {
  const { eventLogger } = useEventLogger();
  let emotionsLabels: any = useRecoilValue(emotionsLabelsState);
  return (
    <div className="mt-4 grid grid-cols-1 gap-y-4 bg-darkGray px-4 py-3">
      <div className="grid grid-cols-1fr-auto items-center">
        <SectionHeader>Emotions</SectionHeader>
        {/* <span className="w-8 h-8 grid items-center justify-items-center text-blue">
          <InfoIcon />
        </span> */}
      </div>
      {emotionsLabels === DATA_LOADING ? (
        'loading...'
      ) : emotionsLabels.length === 0 ? (
        <EmptyEmotions />
      ) : (
        <>
          <div className="grid grid-cols-1fr-auto gap-x-4">
            <EmotionsBar />
            <EmotionEye />
          </div>
          <EmotionsLegend />
        </>
      )}
    </div>
  );
}

const EmptyEmotions = () => {
  return (
    <div className="justify-self-center relative">
      <p className="absolute font-semibold font-poppins text-lg top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4	">
        No Emotions Found
      </p>
      <EmptyEmotionsIcons />
    </div>
  );
};

const EmotionEye = () => {
  const { eventLogger } = useEventLogger();
  const emotionsLabels: any = useRecoilValue(emotionsLabelsState);

  return (
    <>
      <IconButton
        onClick={() => {
          sendToggleEmotions(emotionsLabels);
          eventLogger(UserEvent.CLICKED_EMOTIONS_EYE);
        }}
        dataTip={'Show/hide emotions'}
        dataFor={'emotions-showhide'}
        ariaLabel={'Show/hide emotions'}
        className={'!p-0 !w-8 !h-8 text-button'}
      >
        <EyeIcon />
      </IconButton>
      <ReactTooltip id={'emotions-showhide'} />
    </>
  );
};

const emotionsMap = {
  happiness: { color: '#f23de9', exist: false },
  sadness: { color: '#4D4DFF', exist: false },
  surprise: { color: '#00FFFF', exist: false },
  fear: { color: '#00fb40', exist: false },
  anger: { color: '#ffe800', exist: false },
};

const EmotionsBar = () => {
  const emotionsLabels: any = useRecoilValue(emotionsLabelsState);
  const textLen = emotionsLabels[emotionsLabels.length - 1]?.span?.[1];
  const labels: any = { ...emotionsMap };
  const normalLen = 368 / textLen;
  const { eventLogger } = useEventLogger();
  return (
    <div className="w-full h-8 bg-darkGray relative">
      <div
        className="absolute w-full border-t bottom-2/4 "
        style={{ borderTopColor: '#343349' }}
      ></div>
      {emotionsLabels.map((emotionLabel: Label, index: number) => {
        return (
          <button
            onClick={() => {
              scrollToElement(emotionLabelToLabelID(emotionLabel));
              eventLogger(UserEvent.CLICKED_EMOTIONS_BAR, {
                label: emotionLabel,
              });
            }}
            key={index}
            className={`w-2 h-8 absolute`}
            style={{
              backgroundColor: labels[emotionLabel?.name].color,
              left: emotionLabel?.span?.[1] * normalLen,
            }}
          ></button>
        );
      })}
    </div>
  );
};

const EmotionsLegend = () => {
  const emotionsLabels: any = useRecoilValue(emotionsLabelsState);
  const labels: any = { ...emotionsMap };
  for (const emotionLabel of emotionsLabels) {
    labels[emotionLabel.name] = { ...labels[emotionLabel.name], exist: true };
  }
  return (
    <div className="flex flex-row flex-wrap gap-x-8">
      {Object.keys(labels).map((key: any, index: number) => {
        const label = labels[key];
        if (!label.exist) {
          return null;
        }
        return (
          <div
            key={index}
            className={`grid grid-cols-2-auto items-center gap-x-1`}
          >
            <div
              className={`w-2 h-2 border`}
              style={{
                border: `1px solid ${label.color}`,
                backgroundColor: label.exist ? label.color : '',
              }}
            ></div>
            <div className="text-sm">{capitalizeFirstLetter(key)}</div>
          </div>
        );
      })}
      {/* {JSON.stringify(emotionsLabels)} */}
    </div>
  );
};
