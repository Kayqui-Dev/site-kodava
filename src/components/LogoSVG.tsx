'use client';

export default function LogoSVG({ className = '' }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* SVG nativo com filtro de matriz de cor para key out do fundo branco no GPU */}
      <svg className="w-full h-full" viewBox="0 0 864 864" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="remove-white-bg-matrix">
            <feColorMatrix type="matrix" values="
              1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              -5 0 0 1 1.2
            " />
          </filter>
        </defs>
        <image 
          href="/images/logo.png" 
          x="0" 
          y="0" 
          width="864" 
          height="864" 
          filter="url(#remove-white-bg-matrix)" 
        />
      </svg>
    </div>
  );
}
