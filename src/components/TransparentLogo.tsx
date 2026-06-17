'use client';

import { useEffect, useState } from 'react';

export default function TransparentLogo({ 
  src, 
  alt, 
  className 
}: { 
  src: string; 
  alt: string; 
  className?: string; 
}) {
  const [processedSrc, setProcessedSrc] = useState(src);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = src;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      ctx.drawImage(img, 0, 0);
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;
      
      // Loop through pixels and turn white background into transparent
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        // If it's close to white, make it transparent
        if (r > 240 && g > 240 && b > 240) {
          data[i + 3] = 0; // Alpha = 0
        }
      }
      
      ctx.putImageData(imgData, 0, 0);
      setProcessedSrc(canvas.toDataURL());
    };
  }, [src]);

  return <img src={processedSrc} alt={alt} className={className} />;
}
