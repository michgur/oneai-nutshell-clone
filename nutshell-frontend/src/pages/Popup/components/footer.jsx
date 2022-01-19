import { BsArrowRight } from '@react-icons/all-files/bs/BsArrowRight';
import React from 'react';
import { ExternalLink } from './link';

export default function Footer() {
  return (
    <footer className="grid justify-items-center py-2">
      <ExternalLink className="font-mono grid grid-cols-2-auto gap-x-4 items-center">
        by One Ai <BsArrowRight />
      </ExternalLink>
    </footer>
  );
}
