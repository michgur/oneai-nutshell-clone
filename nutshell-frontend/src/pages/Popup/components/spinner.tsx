import { default as React } from 'react';
import Lottie from 'react-lottie';
import loader from './loader.json';
import './spinner.css';

export function Spinner({ className }: { className: string }) {
  return (
    <>
      <LottieLoader />
    </>
  );
}

const LottieLoader = () => {
  const loaderAnimation = {
    loop: true,
    autoplay: true,
    isClickToPauseDisabled: false,
    animationData: loader,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <Lottie
      isClickToPauseDisabled={true}
      options={loaderAnimation}
      height={180}
      width={140}
      style={{ cursor: 'auto' }}
    />
  );
};
