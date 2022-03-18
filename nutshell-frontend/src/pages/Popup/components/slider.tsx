// import Slider, { Handle, SliderTooltip } from 'rc-slider';

import Slider, { SliderThumb } from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import 'rc-slider/assets/index.css';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { summaryPercentState } from '../lib/atoms';

export function SummarySlider() {
  const [to, setTo] = useState<any>(null);
  const [summaryPercent, setSummaryPercent] =
    useRecoilState(summaryPercentState);

  const onChangeCommitted = (event: any, value: any) => {
    if (to !== null) {
      clearTimeout(to);
    }
    console.log(value);
    const to_ = setTimeout(() => {
      setSummaryPercent(value);
    }, 100);
    setTo(to_);
  };

  return (
    <div className="px-4">
      <OneAISlider
        components={{ Thumb: OneAISliderThumbComponent }}
        defaultValue={summaryPercent}
        // value={summaryPercent}
        onChangeCommitted={onChangeCommitted}
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
    backgroundColor: '#4D4DFF',
    color: 'white',
    fontSize: '10px',
    opacity: 1,
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
    height: 9,
  },
}));

function OneAISliderThumbComponent(props: any) {
  const { children, ...other } = props;
  return (
    <SliderThumb key={1} {...other}>
      {children}
      <span>{props.style.left}</span>
    </SliderThumb>
  );
}

OneAISliderThumbComponent.propTypes = {
  children: PropTypes.node,
};
