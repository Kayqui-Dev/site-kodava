'use client';

import { useRef, useEffect } from 'react';
import { Terminal, BrainCircuit, Cable, RefreshCw } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

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
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run on desktop/tablet (width >= 768px)
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    if (!mediaQuery.matches) return;

    const target = targetRef.current;
    const track = trackRef.current;
    if (!target || !track) return;

    // Initialize GSAP ScrollTrigger timeline
    const initGSAP = () => {
      const trackWidth = track.scrollWidth;
      const viewportWidth = window.innerWidth;
      const scrollAmount = trackWidth - viewportWidth + 96; // accounting for padding/margins

      const cards = track.querySelectorAll('.service-card');

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: target,
            start: 'top top',
            end: () => `+=${trackWidth * 1.1}`,
            scrub: 1.2,
            pin: true,
            invalidateOnRefresh: true,
          },
        });

        // Move the track horizontally
        tl.to(track, {
          x: -scrollAmount,
          ease: 'none',
        }, 0);

        // Reveal the cards with clip-path wipe reveal
        cards.forEach((card, index) => {
          gsap.set(card, { clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)' });
          
          const start = index * 0.25;
          tl.to(card, {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            ease: 'power2.out',
          }, start);
        });
      }, targetRef);

      return ctx;
    };

    const ctxInstance = initGSAP();

    // Reinitialize on resize to ensure correct scroll calculations
    const handleResize = () => {
      ctxInstance?.revert();
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      ctxInstance?.revert();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div id="servicos" className="relative">
      {/* 
        Desktop / Sticky Scroll Container
        Only active on md screens and above.
      */}
      <div ref={targetRef} className="hidden md:block relative h-[350vh] bg-black">
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
          
          {/* Subtle Ambient Glow behind the horizontal track */}
          <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-brand-primary/[0.02] rounded-full blur-[140px] pointer-events-none z-0" />

          {/* Header Area */}
          <div className="max-w-7xl mx-auto px-12 w-full mb-12 flex justify-between items-end relative z-10">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-mono tracking-widest text-brand-primary uppercase">
                [ 02 // ENGENHARIA DE SOLUÇÕES ]
              </span>
              <h2 className="font-sans font-extrabold text-4xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-400 leading-tight tracking-tighter">
                Arquitetura de <br />IA Customizada.
              </h2>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono text-gray-500 uppercase">
                SCROLL VERTICAL // REVELAÇÃO HORIZONTAL
              </span>
              <p className="text-xs font-mono text-brand-secondary mt-1">// DESLIZE DA DIREITA PARA A ESQUERDA</p>
            </div>
          </div>

          {/* Sliding Track */}
          <div className="flex items-center w-full px-12 relative z-10">
            <div 
              ref={trackRef} 
              className="flex gap-8 pr-[30vw]"
            >
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <div
                    key={service.title}
                    className="service-card w-[420px] h-[380px] flex-shrink-0 bg-white/[0.01] border border-white/5 p-10 rounded-lg flex flex-col justify-between group hover:border-brand-primary/20 transition-colors duration-300 relative overflow-hidden"
                  >
                    {/* Glowing highlight in background */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-secondary/[0.02] rounded-full blur-2xl group-hover:bg-brand-secondary/[0.04] transition-colors" />

                    <div className="flex flex-col gap-6">
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 rounded-md bg-white/[0.02] border border-white/5 flex items-center justify-center group-hover:border-brand-secondary/20 transition-colors">
                          <Icon className="w-6 h-6 text-brand-secondary text-glow-blue" />
                        </div>
                        <span className="text-[10px] font-mono text-gray-500 tracking-widest">
                          {service.label}
                        </span>
                      </div>

                      <div className="flex flex-col gap-3">
                        <h3 className="font-sans font-bold text-2xl text-gray-200">
                          {service.title}
                        </h3>
                        <p className="font-sans text-xs text-gray-400 leading-relaxed">
                          {service.desc}
                        </p>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-white/5 flex justify-between items-center">
                      <span className="text-[9px] font-mono text-brand-secondary tracking-widest uppercase font-bold">
                        {service.tech}
                      </span>
                      <span className="text-[9px] font-mono text-gray-500 uppercase">
                        // SECURE DATA PIPELINE
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
        </div>
      </div>

      {/* 
        Mobile / Touch Responsive Layout
        Turns into a smooth horizontal touch scroller.
      */}
      <div className="md:hidden py-16 px-6 bg-black flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <span className="text-xs font-mono tracking-widest text-brand-primary uppercase">
            [ 02 // ENGENHARIA DE SOLUÇÕES ]
          </span>
          <h2 className="font-sans font-extrabold text-3xl text-gray-100 leading-tight">
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
                className="w-[300px] h-[340px] flex-shrink-0 bg-white/[0.01] border border-white/5 p-8 rounded-lg flex flex-col justify-between snap-center"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-md bg-white/[0.02] border border-white/5 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-brand-secondary" />
                    </div>
                    <span className="text-[9px] font-mono text-gray-500 tracking-widest">
                      {service.label}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <h3 className="font-sans font-bold text-lg text-gray-200">
                      {service.title}
                    </h3>
                    <p className="font-sans text-[10px] text-gray-400 leading-relaxed">
                      {service.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                  <span className="text-[8px] font-mono text-brand-secondary tracking-widest uppercase font-bold">
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
