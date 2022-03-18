import React from 'react';
import { EmotionsSection } from './emotions';
import { SummarySlider } from './slider';
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
      <SummarySlider />
      <EmotionsSection />
      <TableOfContents />
    </div>
  );
}
