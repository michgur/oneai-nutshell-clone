import React from 'react';
import { SummaryButton, SummarySection } from './summary';

export default function Main() {
  return (
    <main>
      <Board />
      <Sections />
    </main>
  );
}

function Board() {
  return (
    <div className="grid grid-cols-1 pt-4 w-fit">
      <SummaryButton />
    </div>
  );
}

function Sections() {
  return (
    <div className="grid pt-4">
      <SummarySection />
    </div>
  );
}
