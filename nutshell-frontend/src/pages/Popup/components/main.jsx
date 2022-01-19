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
    <div className="grid grid-cols-1 pt-2 border-b pb-6">
      <SummaryButton />
    </div>
  );
}

function Sections() {
  return (
    <div className="grid pt-6">
      <SummarySection />
    </div>
  );
}
