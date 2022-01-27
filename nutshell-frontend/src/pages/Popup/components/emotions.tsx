import React from 'react';
import ReactTooltip from 'react-tooltip';
import { useRecoilValue } from 'recoil';
import Eye from '../../../assets/img/eye.svg';
import { emotionsLabelsState } from '../lib/atoms';
import { DATA_LOADING } from '../lib/data-bus';
import { capitalizeFirstLetter } from '../lib/utils';
import { IconButton } from './button';

export function EmotionsSection() {
  const emotionsLabels: any = useRecoilValue(emotionsLabelsState);
  return (
    <div className="mt-20 grid grid-cols-1 gap-y-1">
      <div className="grid grid-cols-1fr-auto items-center">
        <h2 className="text-lg">Emotions</h2>
        <IconButton
          onClick={() => {}}
          dataTip={'Show/hide emotions'}
          dataFor={'emotions-showhide'}
          ariaLabel={'Show/hide emotions'}
        >
          <img src={Eye} alt="show/hide emotions in page" />
        </IconButton>
        <ReactTooltip id={'emotions-showhide'} />
      </div>
      {emotionsLabels === DATA_LOADING ? (
        'loading'
      ) : emotionsLabels.length === 0 ? (
        <div>No emotions found</div>
      ) : (
        <>
          <EmotionsBar />
          <EmotionsLegend />
        </>
      )}
    </div>
  );
}

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

  return (
    <div className="w-full h-8 bg-darkGray relative">
      {emotionsLabels.map((emotionLabel: any, index: number) => {
        return (
          <div
            key={index}
            className={`w-2 h-8 absolute`}
            style={{
              backgroundColor: labels[emotionLabel?.name].color,
              left: emotionLabel?.span?.[1] * normalLen,
            }}
          ></div>
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
    <div className="flex flex-row flex-wrap">
      {Object.keys(labels).map((key: any, index: number) => {
        const label = labels[key];
        return (
          <div
            key={index}
            className={`mr-2 grid grid-cols-2-auto items-center gap-x-1`}
          >
            <div
              className={`w-3 h-3 border`}
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
