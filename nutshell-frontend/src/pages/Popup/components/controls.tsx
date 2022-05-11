import React from 'react';
import { EntitiesSlider } from './entities-slider';
import RateShareSection from './rate-share';
import { SummarySlider } from './slider';
import { SectionHeader } from './text';

export default function ControlsSection() {
  return (
    <div className="mt-4 grid grid-cols-2 gap-y-4 bg-darkGray px-4 items-center">
      {/* <div className="grid grid-cols-1fr-auto items-center"> */}
        {/* <SectionHeader>Summary Settings</SectionHeader> */}
        {/* <span className="w-8 h-8 grid items-center justify-items-center text-blue">
          <InfoIcon />
        </span> */}
      {/* </div> */}
      {/* <SummarySlider /> */}
      {/* <div className=""></div> */}
      <EntitiesSlider />
      <RateShareSection />
    </div>
  );
}
