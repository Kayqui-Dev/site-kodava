'use client';

import Spline from '@splinetool/react-spline';

interface SplineWrapperProps {
  onLoad: () => void;
}

export default function SplineWrapper({ onLoad }: SplineWrapperProps) {
  return (
    <div className="w-full h-full relative">
      <Spline 
        scene="https://prod.spline.design/v83Yuo5p7fxCDpWP/scene.splinecode" 
        onLoad={onLoad}
        style={{ width: '100%', height: '100%', display: 'block' }}
      />
    </div>
  );
}
