'use client';

import { Target, Zap, Rocket } from 'lucide-react';

const blocks = [
  {
    icon: Target,
    title: 'Foco em Alto Valor Técnico',
    desc: 'Buscamos resolver os gargalos de processos mais caros e trabalhosos do seu negócio. Não entregamos automações genéricas, entregamos ganho operacional mensurável.'
  },
  {
    icon: Zap,
    title: 'Agilidade Operacional',
    desc: 'Protótipos funcionais entregues de forma iterativa. Você acompanha o modelo funcionando desde a primeira semana de projeto, reduzindo o tempo de go-to-market.'
  },
  {
    icon: Rocket,
    title: 'Soberania Tecnológica',
    desc: 'Construímos soluções com o foco em transferir total controle e propriedade de código para o cliente. Sua IA vira um ativo permanente da sua empresa.'
  }
];

export default function About() {
  return (
    <section id="sobre" className="relative py-24 bg-black border-t border-white/5">
      <div className="absolute top-1/4 left-10 w-80 h-80 bg-brand-green/[0.01] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Area */}
          <div className="lg:col-span-5 flex flex-col gap-6 relative">
            <div className="absolute -inset-x-20 -inset-y-20 bg-[radial-gradient(circle_at_center,rgba(0,168,255,0.03),transparent_60%)] pointer-events-none z-0" />
            <span className="text-xs font-mono tracking-widest text-brand-green uppercase relative z-10">
              [ 04 // SOBRE NÓS ]
            </span>
            <h2 className="font-sans font-extrabold text-3xl sm:text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-400 leading-tight tracking-tighter relative z-10">
              Inovação Pragmática e Entrega de Alto Valor.
            </h2>
            <p className="font-sans text-sm text-gray-400 leading-relaxed relative z-10">
              A Kodava Solutions nasceu para aproximar a engenharia de ponta das reais necessidades de negócios. 
              Substituímos complexidade desnecessária por ecossistemas robustos de código limpo e inteligência autônoma.
            </p>
            <div className="mt-4 p-6 border border-white/5 rounded-md bg-white/[0.01] font-mono text-[10px] text-gray-400 leading-normal uppercase relative z-10">
              // NOSSO MANIFESTO: CÓDIGO PROJETADO PARA DURAR, MODELOS PROJETADOS PARA APRENDER, PROCESSO FOCADO EM RESULTADOS DE NEGÓCIO.
            </div>
          </div>

          {/* Cards Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {blocks.map((block, idx) => (
              <div 
                key={block.title}
                className={`bg-white/[0.01] border border-white/5 hover:border-white/10 transition-all duration-300 p-8 rounded-lg flex flex-col gap-4 ${
                  idx === 2 ? 'sm:col-span-2' : ''
                }`}
              >
                <div className="w-10 h-10 rounded-md bg-white/[0.02] border border-white/5 flex items-center justify-center">
                  <block.icon className="w-5 h-5 text-brand-green" />
                </div>
                <h3 className="font-sans font-bold text-lg text-gray-200">{block.title}</h3>
                <p className="font-sans text-xs text-gray-400 leading-relaxed">{block.desc}</p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
