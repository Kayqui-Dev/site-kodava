'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Terminal, BrainCircuit, Cable, RefreshCw } from 'lucide-react';

const services = [
  {
    icon: Terminal,
    title: 'Engenharia de Prompt',
    desc: 'Construção de pipelines de instrução dinâmicos, encadeamento de lógica (Chain of Thought) e RAG (Retrieval-Augmented Generation) para respostas precisas sem alucinações.',
    label: '01 // PROMPT PIPELINES',
    tech: 'RAG / GRAPH PIPELINES'
  },
  {
    icon: BrainCircuit,
    title: 'Agentes Autônomos',
    desc: 'Desenvolvimento de agentes especialistas com capacidades de tomada de decisão, navegação web, manipulação de banco de dados e execução de rotinas complexas.',
    label: '02 // COGNITIVE AGENTS',
    tech: 'AUTONOMOUS REASONING'
  },
  {
    icon: Cable,
    title: 'Integração de APIs de IA',
    desc: 'Conexão customizada com modelos de ponta do mercado (OpenAI, Gemini, Anthropic, Grok, Llama) com fallback automático, redução de latência e otimização de custo.',
    label: '03 // API ORCHESTRATION',
    tech: 'MULTI-MODEL FALLBACK'
  },
  {
    icon: RefreshCw,
    title: 'Automação de Processos',
    desc: 'Integração profunda de inteligência artificial com seus sistemas legados, ERPs e CRMs para automatizar triagens, relatórios, análises de contratos e mais.',
    label: '04 // WORKFLOW AUTOMATION',
    tech: 'LEGACY & API SYNC'
  }
];

export default function SolutionsHorizontal() {
  const targetRef = useRef<HTMLDivElement>(null);
  
  // Track scroll of the parent container
  const { scrollYProgress } = useScroll({
    target: targetRef
  });

  // Map scroll progress to horizontal translation (from 0 to -60% of track width)
  const x = useTransform(scrollYProgress, [0.08, 0.92], ['0%', '-62%']);
  
  // Apply smooth spring physics to make the horizontal scroll silky and weighted
  const xSpring = useSpring(x, { stiffness: 70, damping: 20, mass: 0.6 });

  // Transform scroll progress into individual card wipe effects (clip path)
  // Let's create clip paths that swipe open as they scroll
  const card1Clip = useTransform(scrollYProgress, [0.1, 0.25], ['polygon(0 0, 0 0, 0 100%, 0 100%)', 'polygon(0 0, 100% 0, 100% 100%, 0 100%)']);
  const card2Clip = useTransform(scrollYProgress, [0.25, 0.45], ['polygon(0 0, 0 0, 0 100%, 0 100%)', 'polygon(0 0, 100% 0, 100% 100%, 0 100%)']);
  const card3Clip = useTransform(scrollYProgress, [0.45, 0.65], ['polygon(0 0, 0 0, 0 100%, 0 100%)', 'polygon(0 0, 100% 0, 100% 100%, 0 100%)']);
  const card4Clip = useTransform(scrollYProgress, [0.65, 0.85], ['polygon(0 0, 0 0, 0 100%, 0 100%)', 'polygon(0 0, 100% 0, 100% 100%, 0 100%)']);

  const clips = [card1Clip, card2Clip, card3Clip, card4Clip];

  return (
    <div className="relative">
      {/* 
        Desktop / Sticky Scroll Container
        Only active on md screens and above.
      */}
      <div ref={targetRef} className="hidden md:block relative h-[350vh] bg-bg">
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
          
          {/* Header Area */}
          <div className="max-w-7xl mx-auto px-12 w-full mb-12 flex justify-between items-end">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-mono tracking-widest text-brand-blue uppercase">
                [ 02 // ENGENHARIA DE SOLUÇÕES ]
              </span>
              <h2 className="font-serif font-black text-4xl lg:text-5xl text-gray-100 leading-tight">
                Arquitetura de <br />IA Customizada.
              </h2>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono text-gray-500 uppercase">
                SCROLL VERTICAL // REVELAÇÃO HORIZONTAL
              </span>
              <p className="text-xs font-mono text-brand-cyan mt-1">// ROTACIONE PARA A ESQUERDA</p>
            </div>
          </div>

          {/* Sliding Track */}
          <div className="flex items-center w-full px-12">
            <motion.div 
              style={{ x: xSpring }} 
              className="flex gap-8 pr-[30vw]"
            >
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={service.title}
                    style={{ clipPath: clips[index] }}
                    className="w-[420px] h-[380px] flex-shrink-0 glass-card p-10 rounded-lg flex flex-col justify-between border-brand-cyan/20 group hover:border-brand-cyan/40 transition-colors duration-300 relative overflow-hidden"
                  >
                    {/* Glowing highlight in background */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-cyan/5 rounded-full blur-2xl group-hover:bg-brand-cyan/10 transition-colors" />

                    <div className="flex flex-col gap-6">
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 rounded bg-brand-cyan/5 border border-brand-cyan/20 flex items-center justify-center group-hover:border-brand-cyan/40 transition-colors">
                          <Icon className="w-6 h-6 text-brand-cyan text-glow-blue" />
                        </div>
                        <span className="text-[10px] font-mono text-gray-500 tracking-widest">
                          {service.label}
                        </span>
                      </div>

                      <div className="flex flex-col gap-3">
                        <h3 className="font-serif font-bold text-2xl text-gray-200">
                          {service.title}
                        </h3>
                        <p className="font-mono text-xs text-gray-400 uppercase leading-relaxed">
                          {service.desc}
                        </p>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-gray-800/60 flex justify-between items-center">
                      <span className="text-[9px] font-mono text-brand-cyan tracking-widest uppercase font-bold">
                        {service.tech}
                      </span>
                      <span className="text-[9px] font-mono text-gray-500 uppercase">
                        // SECURE DATA PIPELINE
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
          
        </div>
      </div>

      {/* 
        Mobile / Touch Responsive Layout
        Turns into a smooth horizontal touch scroller.
      */}
      <div className="md:hidden py-16 px-6 bg-bg flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <span className="text-xs font-mono tracking-widest text-brand-blue uppercase">
            [ 02 // ENGENHARIA DE SOLUÇÕES ]
          </span>
          <h2 className="font-serif font-black text-3xl text-gray-100 leading-tight">
            Arquitetura de <br />IA Customizada.
          </h2>
        </div>

        {/* Scrollable list on mobile */}
        <div className="flex gap-6 overflow-x-auto pb-6 no-scrollbar snap-x snap-mandatory">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="w-[300px] h-[340px] flex-shrink-0 glass-card p-8 rounded-lg flex flex-col justify-between border-brand-cyan/20 snap-center"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded bg-brand-cyan/5 border border-brand-cyan/20 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-brand-cyan" />
                    </div>
                    <span className="text-[9px] font-mono text-gray-500 tracking-widest">
                      {service.label}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <h3 className="font-serif font-bold text-lg text-gray-200">
                      {service.title}
                    </h3>
                    <p className="font-mono text-[10px] text-gray-400 uppercase leading-relaxed">
                      {service.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-800/60 flex justify-between items-center">
                  <span className="text-[8px] font-mono text-brand-cyan tracking-widest uppercase font-bold">
                    {service.tech}
                  </span>
                  <span className="text-[8px] font-mono text-gray-500 uppercase">
                    // MOBILE TOUCH ACTIVE
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
