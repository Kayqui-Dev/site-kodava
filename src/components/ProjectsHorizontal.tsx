'use client';

import { useRef, useEffect, useState } from 'react';
import { ArrowRight, Layout, Smartphone, Database, Zap, BrainCircuit } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const projects = [
  {
    title: 'Clyver Hub',
    desc: 'Hub operacional unificado para integração de anúncios, estoque, mensagens de WhatsApp e antecipação de crédito.',
    tags: ['SaaS', 'Fintech', 'E-commerce'],
    image: '/images/projects/clyver.png',
    link: 'https://clyver.com.br',
    category: 'saas'
  },
  {
    title: 'Centurion Scout',
    desc: 'Sistema avançado de gestão, scout e controle de performance para atletas de artes marciais mistas (MMA).',
    tags: ['Sistema', 'Esportes', 'Dashboard'],
    image: '/images/projects/centurion-scout.png',
    link: 'https://www.centurionfight.shop/auth/login',
    category: 'saas'
  },
  {
    title: 'Love Kodava',
    desc: 'Plataforma B2C de presentes digitais personalizados, retrospectivas animadas e linhas do tempo interativas com tráfego massivo.',
    tags: ['SaaS B2C', 'Escala', 'Animação'],
    image: '/images/projects/love-kodava.png',
    link: 'https://www.love-kodava.shop/',
    category: 'saas'
  },
  {
    title: 'LogGuard',
    desc: 'Plataforma profissional de monitoramento, centralização e análise de logs de sistemas e APIs corporativas.',
    tags: ['SaaS', 'DevOps', 'Segurança'],
    image: '/images/projects/logguard.png',
    link: 'https://logguard.clyver.com.br/',
    category: 'saas'
  },
  {
    title: 'NTG Wrestling',
    desc: 'Website institucional premium e dinâmico para centro de treinamento de wrestling olímpico de alto rendimento.',
    tags: ['Website', 'Institucional', 'Design'],
    image: '/images/projects/esporte-ntg.png',
    link: 'https://esportentg.com.br/',
    category: 'web'
  },
  {
    title: 'Capril Sparta',
    desc: 'Portal institucional focado em caprinocultura, apicultura e agroecologia familiar com design rústico-minimalista.',
    tags: ['Website', 'Agrobusiness', 'Institucional'],
    image: '/images/projects/capril-sparta.png',
    link: 'https://v0-capril-sparta.vercel.app/',
    category: 'web'
  },
  {
    title: 'Visão do Produto',
    desc: 'Sistema inteligente baseado em IA para análise competitiva de preços e monitoramento de e-commerces concorrentes.',
    tags: ['SaaS', 'Inteligência Artificial', 'BI'],
    image: '/images/projects/visao-do-produto.png',
    link: 'https://visaodoproduto.com.br/',
    category: 'saas'
  },
  {
    title: 'Faculdade da Luta',
    desc: 'Sistema social para gestão de matrículas, chamadas automatizadas e controle de presença em projetos esportivos.',
    tags: ['Sistema', 'Gestão Social', 'Dashboard'],
    image: '/images/projects/faculdade-da-luta.png',
    link: 'https://v0-faculdade-da-luta-sandy.vercel.app/',
    category: 'saas'
  },
  {
    title: 'EZ ERP Remave',
    desc: 'Plataforma ERP corporativa de faturamento, controle de estoque, ordens de compras e relatórios fiscais.',
    tags: ['Sistema', 'ERP', 'Enterprise'],
    image: '/images/projects/remave-erp.png',
    link: 'https://erp.remave.com.br/',
    category: 'saas'
  },
  {
    title: 'Açaí Puro',
    desc: 'Landing page premium de alta conversão e cardápio dinâmico para marca artesanal de açaí orgânico.',
    tags: ['Website', 'Premium', 'E-commerce'],
    image: '/images/projects/acai-puro.png',
    link: 'https://v0-acai-prototipo.vercel.app/',
    category: 'web'
  },
  {
    title: 'VTPDirect',
    desc: 'Sistema corporativo seguro de controle de fluxos logísticos e despacho de mercadorias em tempo real.',
    tags: ['Sistema', 'Logística', 'Security'],
    image: '/images/projects/vtp-system.png',
    link: 'https://vtpsystem.com.br/login.php',
    category: 'saas'
  },
  {
    title: 'Michael Douglas Portfolio',
    desc: 'Website interativo e portfólio técnico com efeitos avançados de transições e micro-animações.',
    tags: ['Website', 'Portfolio', 'Animação'],
    image: '/images/projects/micdog.png',
    link: 'https://micdog.cloud/',
    category: 'web'
  }
];

export default function ProjectsHorizontal() {
  const targetRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  useEffect(() => {
    // Only run GSAP pinning on desktop viewports (>= 768px)
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    if (!mediaQuery.matches) return;

    const target = targetRef.current;
    const track = trackRef.current;
    if (!target || !track) return;

    // We wrap inside a timeout to allow React DOM updates to stabilize scrollWidth
    const timer = setTimeout(() => {
      const trackWidth = track.scrollWidth;
      const viewportWidth = window.innerWidth;
      const scrollAmount = trackWidth - viewportWidth;

      if (scrollAmount <= 0) return;

      const cards = track.querySelectorAll('.project-card');

      const ctx = gsap.context(() => {
        // Timeline for horizontal scroll: translating from left (-scrollAmount) to right (0)
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: target,
            start: 'top top',
            end: () => `+=${scrollAmount}`,
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
          },
        });

        // Set initial translation to shift the track to the left, showing Card 1 (rightmost)
        gsap.set(track, { x: -scrollAmount });

        // Translate the track to the right
        tl.to(track, {
          x: 0,
          ease: 'none',
        }, 0);

        // Individual card scale and float-in as they emerge from the bottom-left
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0.1, scale: 0.92, x: -50, y: 30 },
            {
              opacity: 1,
              scale: 1,
              x: 0,
              y: 0,
              ease: 'power1.out',
              scrollTrigger: {
                trigger: card,
                containerAnimation: tl,
                start: 'right left',
                end: 'right left+=30%',
                scrub: true,
              },
            }
          );
        });
      }, targetRef);

      return () => {
        ctx.revert();
        ScrollTrigger.refresh();
      };
    }, 100);

    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, [activeFilter]);

  return (
    <div id="projetos" className="relative border-t border-white/5">
      {/* 
        Desktop / Pinned Viewport Container
      */}
      <div ref={targetRef} className="hidden md:block relative h-screen w-full overflow-hidden bg-transparent">
        <div className="w-full h-full flex flex-col justify-center">
          
          {/* Header Area */}
          <div className="max-w-7xl mx-auto px-16 w-full mb-12 flex justify-between items-end relative z-10">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-mono tracking-widest text-brand-primary uppercase">
                [ 04 // PORTFÓLIO DE CASES ]
              </span>
              <h2 className="font-serif font-black text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-400 leading-tight tracking-tight">
                Cases Entregues.
              </h2>
            </div>
            
            {/* Filters */}
            <div className="flex gap-2">
              {['all', 'web', 'saas'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`text-[9px] font-mono tracking-widest px-5 py-2.5 rounded-full border transition-all duration-300 uppercase cursor-pointer ${
                    activeFilter === filter
                      ? 'bg-brand-primary border-brand-primary text-black font-bold shadow-[0_0_10px_rgba(0,132,255,0.25)]'
                      : 'bg-zinc-900/40 border-white/5 text-gray-400 hover:text-white hover:border-white/10'
                  }`}
                >
                  {filter === 'all' ? 'Tudo' : filter === 'web' ? 'Websites' : 'SaaS / Sistemas'}
                </button>
              ))}
            </div>
          </div>

          {/* Horizontal Slider Track (aligned right-to-left using flex-row-reverse) */}
          <div className="flex items-center w-full px-16 relative z-10">
            <div 
              ref={trackRef} 
              className="flex flex-row-reverse flex-nowrap gap-8 pl-[20vw] items-center"
            >
              {filteredProjects.map((project) => (
                <div
                  key={project.title}
                  className="project-card w-[35vw] h-[60vh] min-w-[420px] flex-shrink-0 backdrop-blur-md bg-zinc-900/30 border border-white/10 rounded-lg flex flex-col justify-between group hover:border-brand-primary/20 transition-all duration-300 relative overflow-hidden"
                >
                  {/* Image Container with Hover zoom */}
                  <div className="relative h-[28vh] w-full overflow-hidden border-b border-white/5 bg-zinc-950">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-top transition-transform duration-750 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Details */}
                  <div className="p-8 flex flex-col justify-between flex-grow gap-4">
                    <div className="flex flex-col gap-3">
                      <div className="flex gap-2 flex-wrap">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[8px] font-mono tracking-widest uppercase px-2 py-0.5 rounded bg-white/[0.02] border border-white/5 text-brand-secondary"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <h3 className="font-serif font-black text-2xl lg:text-3xl text-gray-100 group-hover:text-brand-primary transition-colors duration-300 leading-none">
                        {project.title}
                      </h3>
                      
                      <p className="font-sans text-xs text-gray-400 leading-relaxed line-clamp-3">
                        {project.desc}
                      </p>
                    </div>

                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[10px] font-mono tracking-widest text-white border border-white/10 group-hover:border-brand-primary/30 group-hover:text-brand-primary py-3 rounded-lg justify-center transition-all duration-300 w-full hover:bg-brand-primary/[0.02] cursor-pointer"
                    >
                      ACESSAR CASE
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>

      {/* 
        Mobile Touch Scroll Layout
      */}
      <div className="md:hidden py-16 px-6 bg-transparent flex flex-col gap-8 relative z-10">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono tracking-widest text-brand-primary uppercase">
              [ 04 // PORTFÓLIO DE CASES ]
            </span>
            <h2 className="font-serif font-black text-3xl text-gray-100 leading-tight">
              Cases Entregues.
            </h2>
          </div>
          
          {/* Mobile Filters */}
          <div className="flex gap-2 flex-wrap">
            {['all', 'web', 'saas'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`text-[8px] font-mono tracking-widest px-4 py-2 rounded-full border transition-all duration-300 uppercase cursor-pointer ${
                  activeFilter === filter
                    ? 'bg-brand-primary border-brand-primary text-black font-bold'
                    : 'bg-zinc-900/40 border-white/5 text-gray-400'
                }`}
              >
                {filter === 'all' ? 'Tudo' : filter === 'web' ? 'Websites' : 'SaaS'}
              </button>
            ))}
          </div>
        </div>

        {/* Horizontal mobile container */}
        <div className="flex gap-6 overflow-x-auto pb-6 no-scrollbar snap-x snap-mandatory">
          {filteredProjects.map((project) => (
            <div
              key={project.title}
              className="w-[320px] h-[440px] flex-shrink-0 backdrop-blur-md bg-zinc-900/30 border border-white/10 rounded-lg flex flex-col justify-between snap-center"
            >
              <div className="relative h-[180px] w-full overflow-hidden rounded-t-lg bg-zinc-950">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent pointer-events-none" />
              </div>

              <div className="p-6 flex flex-col justify-between flex-grow gap-4">
                <div className="flex flex-col gap-2">
                  <div className="flex gap-1.5 flex-wrap">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[7px] font-mono tracking-widest uppercase px-1.5 py-0.5 rounded bg-white/[0.02] border border-white/5 text-brand-secondary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="font-serif font-black text-2xl text-gray-200">
                    {project.title}
                  </h3>
                  <p className="font-sans text-[11px] text-gray-400 leading-relaxed line-clamp-3">
                    {project.desc}
                  </p>
                </div>

                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[9px] font-mono tracking-widest text-white border border-white/10 py-3 rounded-lg justify-center transition-all duration-300 w-full"
                >
                  ACESSAR CASE
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
