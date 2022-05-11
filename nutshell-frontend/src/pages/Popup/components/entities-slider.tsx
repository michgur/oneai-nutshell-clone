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
import {
  entitiesShownAmountAtom,
  entitiesShownAmountRangeSelector,
} from '../lib/atoms';
import { useEventLogger, UserEvent } from '../lib/event-logger';

const entitiesThumbValueAtom = atom({
  key: 'entitiesThumbValueAtom',
  default: 6,
});

export function EntitiesSlider() {
  const { eventLogger } = useEventLogger();
  const [to, setTo] = useState<any>(null);
  const [entitiesShownAmount, setEntitiesShownAmount] = useRecoilState(
    entitiesShownAmountAtom
  );
  const entitiesRange = useRecoilValue(entitiesShownAmountRangeSelector);
  const setThumbValue = useSetRecoilState(entitiesThumbValueAtom);
  const onChangeCommitted = (event: any, value: any) => {
    if (to !== null) {
      clearTimeout(to);
    }
    console.debug('[EntitiesSlider] moved slider:', value);
    const to_ = setTimeout(() => {
      setEntitiesShownAmount(value);
    }, 100);
    eventLogger(UserEvent.MOVED_SLIDER, { entities_slider: value });
    setTo(to_);
  };

  const handleChange = (event: any) => {
    console.debug('[EntitiesSlider] handleChange:', event);
    setThumbValue(event.target.value);
  };

  const step = 1;
  console.log('[EntitiesSlider] entitiesRange:', entitiesRange, 'step:', step);

  return (
    <div className="px-4">
      <OneAISlider
        components={{ Thumb: OneAISliderThumbComponent }}
        defaultValue={entitiesShownAmount}
        // value={entitiesShownAmount}
        onChangeCommitted={onChangeCommitted}
        onChange={handleChange}
        step={step}
        min={entitiesRange[0]}
        max={entitiesRange[1]}
      />
    </div>
  );
}

const OneAISlider = styled(Slider)(({ theme }) => ({
  color: '#00FFFF',
  height: 9,
  padding: '0 0',

  // border-left: "35px solid transparent",
  // border-right: "35px solid transparent",
  // border-bottom: "70px solid,"
  '& .MuiSlider-thumb': {
    height: 30,
    width: 30,
    backgroundColor: 'transparent',
    color: '#1d1c29',
    fontSize: '10px',
    opacity: 1,
    // boxShadow: '0 0 0 8px rgba(0, 255, 255, 0.2)',
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
    color: '#00FFFF',
    opacity: 1,
    height: 8,
    borderRadius: 0,
  },
  '& .MuiSlider-thumbColorPrimary': {
    marginTop: -4,
    borderRight: 15,
    borderRightColor: 'transparent',
    borderRightStyle: 'solid',
    borderLeft: 15,
    borderLeftColor: 'transparent',
    borderLeftStyle: 'solid',
    borderBottom: 25,
    borderBottomColor: '#00FFFF',
    borderBottomStyle: 'solid',
    borderRadius: 2,
  },
}));

function OneAISliderThumbComponent(props: any) {
  const thumbValue = useRecoilValue(entitiesThumbValueAtom);
  const { children, ...other } = props;
  return (
    <SliderThumb key={1} {...other}>
      {children}
      {/* <div className="relative">
        <SliderShape />
        <span className="absolute top-50 left-50 -translate-y-1/2	translate-x-1/2">
          {thumbValue}
        </span>
      </div> */}
      <span className='mt-[35px] text-dark'>{thumbValue}</span>
    </SliderThumb>
  );
}

const SliderShape = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="29"
      height="22"
      viewBox="0 0 29 22"
      fill="none"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M14.5 0L0 22H29L14.5 0Z"
        fill="#00FFFF"
      />
    </svg>
  );
};

OneAISliderThumbComponent.propTypes = {
  children: PropTypes.node,
};
