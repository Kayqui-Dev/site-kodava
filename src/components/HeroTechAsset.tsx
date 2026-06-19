'use client';

import { useState } from 'react';
import LogoSVG from './LogoSVG';

export default function HeroTechAsset() {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const nodes = [
    {
      id: 'web',
      name: 'Websites Premium',
      short: 'WEB',
      x: 250,
      y: 90,
      color: '#00e5ff',
      glow: 'rgba(0, 229, 255, 0.4)',
      icon: (
        <svg className="w-5 h-5 text-[#00e5ff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
          <circle cx="6" cy="7" r="1" fill="currentColor" />
          <circle cx="10" cy="7" r="1" fill="currentColor" />
        </svg>
      )
    },
    {
      id: 'apps',
      name: 'Apps Mobile',
      short: 'APP',
      x: 395,
      y: 195,
      color: '#0084ff',
      glow: 'rgba(0, 132, 255, 0.4)',
      icon: (
        <svg className="w-5 h-5 text-[#0084ff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="5" y="2" width="14" height="20" rx="2" />
          <line x1="12" y1="18" x2="12" y2="18.01" strokeWidth="3" />
        </svg>
      )
    },
    {
      id: 'saas',
      name: 'Sistemas & SaaS',
      short: 'SAAS',
      x: 340,
      y: 365,
      color: '#00ffcc',
      glow: 'rgba(0, 255, 204, 0.4)',
      icon: (
        <svg className="w-5 h-5 text-[#00ffcc]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
          <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
        </svg>
      )
    },
    {
      id: 'automation',
      name: 'Automações',
      short: 'AUTO',
      x: 160,
      y: 365,
      color: '#00ffcc',
      glow: 'rgba(0, 255, 204, 0.4)',
      icon: (
        <svg className="w-5 h-5 text-[#00ffcc]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      )
    },
    {
      id: 'ai',
      name: 'Inteligência Artificial',
      short: 'IA',
      x: 105,
      y: 195,
      color: '#00e5ff',
      glow: 'rgba(0, 229, 255, 0.4)',
      icon: (
        <svg className="w-5 h-5 text-[#00e5ff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        </svg>
      )
    }
  ];

  return (
    <div className="relative w-[320px] h-[320px] md:w-[460px] md:h-[460px] flex items-center justify-center">
      <style>{`
        @keyframes tech-spin-clockwise {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes tech-spin-counter {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        @keyframes tech-pulse {
          0%, 100% { opacity: 0.15; stroke-width: 1px; }
          50% { opacity: 0.4; stroke-width: 1.5px; }
        }
        @keyframes node-pulse {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 4px var(--glow-color, rgba(0, 132, 255, 0.2))); }
          50% { transform: scale(1.05); filter: drop-shadow(0 0 12px var(--glow-color, rgba(0, 132, 255, 0.5))); }
        }
        .animate-spin-slow {
          transform-origin: 250px 250px;
          animation: tech-spin-clockwise 45s linear infinite;
        }
        .animate-spin-reverse-slow {
          transform-origin: 250px 250px;
          animation: tech-spin-counter 30s linear infinite;
        }
        .animate-pulse-slow {
          animation: tech-pulse 4s ease-in-out infinite;
        }
        .tech-node-active {
          filter: drop-shadow(0 0 16px var(--glow-color, rgba(0, 132, 255, 0.6))) !important;
          transform: scale(1.1) !important;
        }
      `}</style>

      {/* Background SVG Grid / Orbits */}
      <svg 
        viewBox="0 0 500 500" 
        className="w-full h-full select-none animate-float"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Glowing background hub */}
        <defs>
          <radialGradient id="center-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0084ff" stopOpacity="0.18" />
            <stop offset="60%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
          <filter id="blur-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="15" />
          </filter>
        </defs>

        {/* Ambient Glow */}
        <circle cx="250" cy="250" r="180" fill="url(#center-glow)" />

        {/* External Concentric Ring */}
        <circle 
          cx="250" 
          cy="250" 
          r="210" 
          fill="none" 
          stroke="rgba(255, 255, 255, 0.03)" 
          strokeWidth="1" 
        />
        
        {/* Orbital Track 1: Outer Rotating dashes */}
        <circle 
          cx="250" 
          cy="250" 
          r="165" 
          fill="none" 
          stroke="rgba(0, 229, 255, 0.15)" 
          strokeWidth="1" 
          strokeDasharray="6 40 10 30" 
          className="animate-spin-slow"
        />

        {/* Orbital Track 2: Inner Rotating dashes */}
        <circle 
          cx="250" 
          cy="250" 
          r="130" 
          fill="none" 
          stroke="rgba(0, 132, 255, 0.12)" 
          strokeWidth="1" 
          strokeDasharray="15 25 5 15" 
          className="animate-spin-reverse-slow"
        />

        {/* Core static circles */}
        <circle 
          cx="250" 
          cy="250" 
          r="165" 
          fill="none" 
          stroke="rgba(255, 255, 255, 0.02)" 
          strokeWidth="1.5" 
          className="animate-pulse-slow" 
        />
        <circle 
          cx="250" 
          cy="250" 
          r="95" 
          fill="none" 
          stroke="rgba(255, 255, 255, 0.04)" 
          strokeWidth="1" 
        />

        {/* Orbital nodes connector lines */}
        {nodes.map((node) => (
          <line
            key={`line-${node.id}`}
            x1="250"
            y1="250"
            x2={node.x}
            y2={node.y}
            stroke={activeNode === node.id ? node.color : 'rgba(255, 255, 255, 0.03)'}
            strokeWidth={activeNode === node.id ? '1.5' : '1'}
            strokeDasharray={activeNode === node.id ? 'none' : '4 4'}
            className="transition-all duration-500"
          />
        ))}
      </svg>

      {/* Floating HTML Interactive Nodes Overlayed */}
      {nodes.map((node) => {
        const isActive = activeNode === node.id;
        return (
          <div
            key={node.id}
            className="absolute flex flex-col items-center group cursor-pointer transition-all duration-300"
            style={{
              left: `${(node.x / 500) * 100}%`,
              top: `${(node.y / 500) * 100}%`,
              transform: 'translate(-50%, -50%)',
              '--glow-color': node.glow,
            } as React.CSSProperties}
            onMouseEnter={() => setActiveNode(node.id)}
            onMouseLeave={() => setActiveNode(null)}
          >
            {/* Glowing Tech Node Ring */}
            <div 
              className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border bg-zinc-950/85 backdrop-blur-md transition-all duration-300 ${
                isActive 
                  ? 'border-white/20' 
                  : 'border-white/10 hover:border-white/20'
              }`}
              style={{
                boxShadow: isActive ? `0 0 20px ${node.glow}` : 'none',
                transform: isActive ? 'scale(1.1)' : 'scale(1)',
              }}
            >
              <div className="transition-transform duration-300 group-hover:scale-110">
                {node.icon}
              </div>
            </div>

            {/* Pillar short description / tag */}
            <div className={`mt-2 font-mono text-[8px] md:text-[9px] tracking-wider px-2 py-0.5 rounded border transition-all duration-300 ${
              isActive 
                ? 'bg-white/10 text-white border-white/20 shadow-[0_0_10px_rgba(255,255,255,0.05)]' 
                : 'bg-zinc-900/30 text-gray-500 border-white/5'
            }`}>
              {node.short}
            </div>

            {/* Floating Tooltip */}
            <div 
              className={`absolute top-[-35px] whitespace-nowrap bg-zinc-900 border border-white/10 text-[10px] font-mono tracking-widest text-white px-3 py-1.5 rounded shadow-xl pointer-events-none transition-all duration-300 ${
                isActive ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95'
              }`}
              style={{
                textShadow: `0 0 8px ${node.glow}`,
              }}
            >
              {node.name}
            </div>
          </div>
        );
      })}

      {/* Centered Brand Nucleus */}
      <div 
        className="absolute w-24 h-24 md:w-32 md:h-32 flex items-center justify-center bg-black/40 border border-white/10 backdrop-blur-lg rounded-2xl shadow-[0_0_35px_rgba(0,132,255,0.15)] group transition-all duration-500 hover:border-brand-primary/30"
        style={{
          boxShadow: activeNode 
            ? `0 0 40px ${nodes.find(n => n.id === activeNode)?.glow}` 
            : '0 0 35px rgba(0,132,255,0.15)',
        }}
      >
        <LogoSVG className="w-14 h-14 md:w-20 md:h-20 drop-shadow-[0_0_10px_rgba(0,132,255,0.35)] transition-transform duration-500 group-hover:scale-105" />
        
        {/* Interactive connection pulse */}
        <div className="absolute inset-0 rounded-2xl border border-brand-primary/20 opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
      </div>
    </div>
  );
}
