import React from 'react';
import ControlsSection from './controls';
import { EmotionsSection } from './emotions';
import RateShareSection from './rate-share';
import { SummarySection } from './summary';
import { TableOfContents } from './table-of-contents';

export default function Main() {
  return (
    <main className="px-4">
      <Sections />
    </main>
  );
}

function Sections() {
  return (
    <div className="grid text-white">
      <SummarySection />
      <TableOfContents />
      <ControlsSection />
      <EmotionsSection />
      <RateShareSection />
    </div>
  );
}
