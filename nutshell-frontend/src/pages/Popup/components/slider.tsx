// import Slider, { Handle, SliderTooltip } from 'rc-slider';

import Slider, { SliderThumb } from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import 'rc-slider/assets/index.css';
import React, { useState } from 'react';
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';
import { summaryPercentRangeSelector, summaryPercentState } from '../lib/atoms';
import { useEventLogger, UserEvent } from '../lib/event-logger';

const thumbValueAtom = atom({
  key: 'thumbValueAtom',
  default: 150,
});

export function SummarySlider() {
  const { eventLogger } = useEventLogger();
  const [to, setTo] = useState<any>(null);
  const summaryPercentRange = useRecoilValue(summaryPercentRangeSelector);
  const setThumbValue = useSetRecoilState(thumbValueAtom);
  const [summaryPercent, setSummaryPercent] =
    useRecoilState(summaryPercentState);
  const onChangeCommitted = (event: any, value: any) => {
    if (to !== null) {
      clearTimeout(to);
    }
    console.debug('[SummarySlider] moved slider:', value);
    const to_ = setTimeout(() => {
      setSummaryPercent(value);
    }, 100);
    eventLogger(UserEvent.MOVED_SLIDER, { summary_slider: value });
    setTo(to_);
  };

  const handleChange = (event: any) => {
    console.debug('[SummarySlider] handleChange:', event);
    setThumbValue(event.target.value);
  };

  const step = Math.floor(
    (summaryPercentRange[1] - summaryPercentRange[0]) / 10
  );
  console.log(
    '[SummarySlider] summaryPercentRange:',
    summaryPercentRange,
    'step:',
    step
  );

  return (
    <div className="px-4">
      <OneAISlider
        components={{ Thumb: OneAISliderThumbComponent }}
        defaultValue={summaryPercent}
        // value={summaryPercent}
        onChangeCommitted={onChangeCommitted}
        onChange={handleChange}
        step={step}
        min={10}
        max={summaryPercentRange[1]}
      />
    </div>
  );
}

const OneAISlider = styled(Slider)(({ theme }) => ({
  color: '#f23de9',
  height: 9,
  padding: '0 0',
  '& .MuiSlider-thumb': {
    height: 30,
    width: 30,
    backgroundColor: '#f23de9',
    color: 'white',
    fontSize: '10px',
    opacity: 1,
    boxShadow: '0 0 0 8px rgba(242, 61, 233, 0.2)',
    // border: '1px solid currentColor',
    '&:hover': {
      boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)',
    },
    // '& .custom-class-of-thumb': {
    //   height: 9,
    //   width: 1,
    //   backgroundColor: 'currentColor',
    //   marginLeft: 1,
    //   marginRight: 1,
    // },
  },
  '& .MuiSlider-rail': {
    color: '#f23de9',
    opacity: 1,
    height: 8,
    borderRadius: 0,
  },
}));

function OneAISliderThumbComponent(props: any) {
  const thumbValue = useRecoilValue(thumbValueAtom);
  const { children, ...other } = props;
  return (
    <SliderThumb key={1} {...other}>
      {children}
      <span>{thumbValue}</span>
    </SliderThumb>
  );
}

OneAISliderThumbComponent.propTypes = {
  children: PropTypes.node,
};
