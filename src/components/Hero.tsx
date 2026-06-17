'use client';

import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import dynamic from 'next/dynamic';
import { ArrowRight, Bot, Shield, Cpu } from 'lucide-react';

const SplineWrapper = dynamic(() => import('./SplineWrapper'), { ssr: false });

export default function Hero() {
  const [isSplineLoading, setIsSplineLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll Parallax setup with Framer Motion
  const { scrollY } = useScroll();
  
  // Spring physics setup for weighty, organic scrolling motion
  const springConfig = { stiffness: 90, damping: 25, mass: 0.4 };
  
  const headlineY = useSpring(useTransform(scrollY, [0, 800], [0, -90]), springConfig);
  const splineY = useSpring(useTransform(scrollY, [0, 800], [0, 80]), springConfig);
  const backgroundY = useSpring(useTransform(scrollY, [0, 800], [0, 40]), springConfig);
  const opacityFade = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section 
      ref={containerRef}
      id="hero" 
      className="relative min-h-screen flex items-center pt-24 overflow-hidden bg-black"
    >
      {/* Background Grid Overlay with Parallax */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-0 pointer-events-none" 
      />

      {/* Glow shapes */}
      <div className="absolute top-20 right-1/4 w-[450px] h-[450px] bg-brand-blue/[0.04] rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-brand-green/[0.02] rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Text Area (with Spring Parallax) */}
        <motion.div 
          style={{ y: headlineY, opacity: opacityFade }}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="lg:col-span-7 flex flex-col gap-6 relative"
        >
          {/* Subtle Ambient Radial Glow behind the main headline */}
          <div className="absolute -inset-x-20 -inset-y-20 bg-[radial-gradient(circle_at_center,rgba(0,168,255,0.05),transparent_60%)] pointer-events-none z-0" />

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.02] border border-white/5 max-w-fit relative z-10">
            <Cpu className="w-3.5 h-3.5 text-brand-blue" />
            <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase">
              // IA proprietária e infraestrutura dedicada
            </span>
          </div>

          <h1 className="font-serif font-black text-4xl sm:text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-500 leading-[1.05] tracking-tighter relative z-10">
            Arquitetura de IA <br />
            Proprietária sob Medida.
          </h1>

          <p className="font-mono text-xs sm:text-sm text-gray-400 max-w-2xl leading-relaxed uppercase relative z-10">
            Diferente de simples wrappers que apenas repassam dados para APIs de terceiros, a{' '}
            <span className="text-brand-blue">Kodava Solutions</span> constrói ecossistemas de IA
            dedicados, treinados diretamente na sua base de conhecimento corporativa e integrados de forma
            100% segura à sua infraestrutura.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-4 relative z-10">
            <a
              href="#contato"
              className="inline-flex items-center justify-center gap-2 text-xs font-mono tracking-widest bg-white text-black px-8 py-4 rounded font-bold hover:bg-zinc-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-300 group"
            >
              FALAR COM ESPECIALISTA
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            
            <a
              href="#diferenciais"
              className="inline-flex items-center justify-center gap-2 text-xs font-mono tracking-widest border border-white/5 text-gray-400 hover:text-white hover:border-white/10 px-8 py-4 rounded transition-all duration-300"
            >
              NOSSOS DIFERENCIAIS
            </a>
          </div>

          {/* Core tech tags */}
          <div className="grid grid-cols-3 gap-6 pt-10 border-t border-white/5 max-w-xl relative z-10">
            <div className="flex flex-col gap-2">
              <Bot className="w-5 h-5 text-brand-blue" />
              <span className="text-[10px] font-mono tracking-widest text-gray-500 uppercase">MODELS:</span>
              <span className="text-xs font-mono text-gray-200 font-bold uppercase">TREINAMENTO DE REDES</span>
            </div>
            <div className="flex flex-col gap-2">
              <Shield className="w-5 h-5 text-brand-green" />
              <span className="text-[10px] font-mono tracking-widest text-gray-500 uppercase">SECURITY:</span>
              <span className="text-xs font-mono text-gray-200 font-bold uppercase">INFRA PRIVADA & LGPD</span>
            </div>
            <div className="flex flex-col gap-2">
              <Cpu className="w-5 h-5 text-brand-cyan" />
              <span className="text-[10px] font-mono tracking-widest text-gray-500 uppercase">SPEED:</span>
              <span className="text-xs font-mono text-gray-200 font-bold uppercase">SISTEMAS AUTÔNOMOS</span>
            </div>
          </div>
        </motion.div>

        {/* 3D Canvas Area (with Spring Parallax) */}
        <motion.div 
          style={{ y: splineY, opacity: opacityFade }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
          className="lg:col-span-5 h-[400px] lg:h-[600px] w-full relative flex items-center justify-center"
        >
          {isSplineLoading && (
            <div className="absolute flex flex-col items-center gap-3">
              <div className="w-8 h-8 rounded-full border-2 border-white/10 border-t-white animate-spin" />
              <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase animate-pulse">
                [ CARREGANDO NÚCLEO 3D... ]
              </span>
            </div>
          )}

          <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
            <SplineWrapper onLoad={() => setIsSplineLoading(false)} />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
