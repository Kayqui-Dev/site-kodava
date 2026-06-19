'use client';

import { useRef, useEffect } from 'react';
import { Layout, Smartphone, Database, Zap, BrainCircuit } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const services = [
  {
    icon: Layout,
    title: 'Websites de Elite',
    desc: 'Sites institucionais de altíssimo padrão visual, landing pages de alta conversão e portfólios imersivos com performance e SEO de nível internacional.',
    label: '01 // WEB CRAFTSMANSHIP',
    tech: 'NEXT.JS / TAILWIND / GSAP'
  },
  {
    icon: Smartphone,
    title: 'Aplicativos Sob Medida',
    desc: 'Criação de aplicativos mobile (iOS e Android) e web apps fluidos, modernos e focados em usabilidade e performance extrema.',
    label: '02 // MOBILE & WEB APPS',
    tech: 'REACT NATIVE / EXPO / TS'
  },
  {
    icon: Database,
    title: 'Sistemas & SaaS',
    desc: 'Sistemas corporativos complexos, plataformas SaaS, painéis administrativos e dashboards em tempo real altamente seguros.',
    label: '03 // ENTERPRISE SYSTEMS',
    tech: 'REACT / NODE.JS / POSTGRES'
  },
  {
    icon: Zap,
    title: 'Automação Inteligente',
    desc: 'Integração e automação completa de fluxos de trabalho, integrando ERPs, CRMs e APIs para eliminar tarefas manuais e otimizar processos operacionais.',
    label: '04 // WORKFLOW AUTOMATION',
    tech: 'N8N / WEBHOOKS / API INTEGRATION'
  },
  {
    icon: BrainCircuit,
    title: 'Inteligência Artificial',
    desc: 'Modelos de inteligência artificial customizados sob medida. Desenvolvimento de agentes autônomos cognitivos integrados à sua infraestrutura cloud privada.',
    label: '05 // CUSTOM COGNITION',
    tech: 'RAG / COGNITIVE AGENTS'
  }
];

export default function SolutionsHorizontal() {
  const targetRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run GSAP pinning on desktop viewports (>= 768px)
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    if (!mediaQuery.matches) return;

    const target = targetRef.current;
    const track = trackRef.current;
    if (!target || !track) return;

    const initGSAP = () => {
      const trackWidth = track.scrollWidth;
      const viewportWidth = window.innerWidth;
      const scrollAmount = trackWidth - viewportWidth;

      const cards = track.querySelectorAll('.service-card');

      const ctx = gsap.context(() => {
        // Pin the section and scrub horizontal animation
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: target,
            start: 'top top',
            end: () => `+=${scrollAmount}`,
            scrub: 1, // smooth scroll synchronization
            pin: true,
            invalidateOnRefresh: true,
          },
        });

        // Translate the track to the left
        tl.to(track, {
          x: -scrollAmount,
          ease: 'none',
        }, 0);

        // Individual card scale and focus shifts on horizontal scroll
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0.5, scale: 0.95, y: 15 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              ease: 'power1.out',
              scrollTrigger: {
                trigger: card,
                containerAnimation: tl, // bound to horizontal timeline
                start: 'left right-=8%',
                end: 'left center',
                scrub: true,
              },
            }
          );
        });
      }, targetRef);

      return ctx;
    };

    const ctxInstance = initGSAP();

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
    <div id="solucoes" className="relative">
      {/* 
        Desktop / Pinned Viewport Container
      */}
      <div ref={targetRef} className="hidden md:block relative h-screen w-full overflow-hidden bg-transparent">
        <div className="w-full h-full flex flex-col justify-center">
          
          {/* Header Area */}
          <div className="max-w-7xl mx-auto px-16 w-full mb-12 flex justify-between items-end relative z-10">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-mono tracking-widest text-brand-primary uppercase">
                [ 02 // ENGENHARIA DE PRODUTOS ]
              </span>
              <h2 className="font-serif font-black text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-400 leading-tight tracking-tight">
                Nossos Serviços.
              </h2>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono text-gray-500 uppercase">
                ROLAGEM VERTICAL // REVELAÇÃO HORIZONTAL
              </span>
              <p className="text-xs font-mono text-brand-secondary mt-1">// DESLIZE DA DIREITA PARA A ESQUERDA</p>
            </div>
          </div>

          {/* Horizontal Slider Track */}
          <div className="flex items-center w-full px-16 relative z-10">
            <div 
              ref={trackRef} 
              className="flex flex-row flex-nowrap gap-8 pr-[20vw] items-center"
            >
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <div
                    key={service.title}
                    className="service-card w-[35vw] h-[60vh] min-w-[420px] flex-shrink-0 backdrop-blur-md bg-zinc-900/30 border border-white/10 p-12 rounded-lg flex flex-col justify-between group hover:border-brand-primary/20 transition-all duration-300 relative overflow-hidden"
                  >
                    {/* Subtle glow on card */}
                    <div className="absolute top-0 right-0 w-40 h-40 bg-brand-primary/[0.02] rounded-full blur-3xl group-hover:bg-brand-primary/[0.05] transition-colors" />

                    <div className="flex flex-col gap-8">
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 rounded-md bg-white/[0.02] border border-white/10 flex items-center justify-center group-hover:border-brand-secondary/20 transition-colors">
                          <Icon className="w-6 h-6 text-brand-secondary text-glow-blue" />
                        </div>
                        <span className="text-[10px] font-mono text-gray-500 tracking-widest">
                          {service.label}
                        </span>
                      </div>

                      <div className="flex flex-col gap-4">
                        <h3 className="font-serif font-black text-4xl lg:text-5xl text-gray-100 group-hover:text-brand-secondary transition-colors duration-300 leading-none">
                          {service.title}
                        </h3>
                        <p className="font-sans text-xs text-gray-400 leading-relaxed">
                          {service.desc}
                        </p>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-white/5 flex justify-between items-center">
                      <span className="text-[10px] font-mono text-brand-secondary tracking-widest uppercase font-bold">
                        {service.tech}
                      </span>
                      <span className="text-[10px] font-mono text-gray-500 uppercase">
                        // SECURE FLOW
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
        Mobile Touch Scroll Layout
      */}
      <div className="md:hidden py-16 px-6 bg-transparent flex flex-col gap-8 relative z-10">
        <div className="flex flex-col gap-3">
          <span className="text-xs font-mono tracking-widest text-brand-primary uppercase">
            [ 02 // ENGENHARIA DE PRODUTOS ]
          </span>
          <h2 className="font-serif font-black text-3xl text-gray-100 leading-tight">
            Nossos Serviços.
          </h2>
        </div>

        {/* Horizontal mobile container */}
        <div className="flex gap-6 overflow-x-auto pb-6 no-scrollbar snap-x snap-mandatory">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="w-[320px] h-[360px] flex-shrink-0 backdrop-blur-md bg-zinc-900/30 border border-white/10 p-8 rounded-lg flex flex-col justify-between snap-center"
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
                    <h3 className="font-serif font-black text-3xl text-gray-200">
                      {service.title}
                    </h3>
                    <p className="font-sans text-[11px] text-gray-400 leading-relaxed">
                      {service.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                  <span className="text-[9px] font-mono text-brand-secondary tracking-widest uppercase font-bold">
                    {service.tech}
                  </span>
                  <span className="text-[9px] font-mono text-gray-500 uppercase">
                    // SWIPE ACTIVE
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
