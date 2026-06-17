'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Database, Network, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const blocks = [
  {
    icon: Database,
    title: 'Modelos Proprietários',
    desc: 'Treinamos redes neurais diretamente na sua base histórica e arquivos operacionais. A IA aprende a lógica, linguagem e regras específicas do seu negócio.',
    label: '01 // DATA TRAINING'
  },
  {
    icon: Network,
    title: 'Integração na Infraestrutura',
    desc: 'Sem expor dados a servidores públicos compartilhados. Integramos os sistemas de inteligência na sua nuvem privada (AWS, Azure, GCP) ou servidores locais.',
    label: '02 // ARCHITECTURE'
  },
  {
    icon: ShieldAlert,
    title: 'Sistemas Especialistas',
    desc: 'Diferente de IAs gerais de conversação (chatbots genéricos), criamos agentes hiper-focados em tarefas complexas como análises financeiras, jurídicas ou de produto.',
    label: '03 // SPECIFIC SYSTEM'
  }
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' }
  }
} as const;

export default function Positioning() {
  useEffect(() => {
    const stats = [
      { id: '#stat-reqs', endVal: 50 },
      { id: '#stat-latency', endVal: 85 },
      { id: '#stat-sla', endVal: 99 }
    ];

    const ctx = gsap.context(() => {
      stats.forEach((stat) => {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: stat.endVal,
          duration: 1.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: stat.id,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
          onUpdate: () => {
            const el = document.querySelector(stat.id);
            if (el) {
              el.textContent = Math.floor(obj.val).toString();
            }
          }
        });
      });
    }, '#diferenciais');

    return () => ctx.revert();
  }, []);

  return (
    <section id="diferenciais" className="relative py-24 bg-black overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        
        {/* Header Section */}
        <div className="max-w-3xl mb-16 flex flex-col gap-4 relative">
          <div className="absolute -inset-x-20 -inset-y-20 bg-[radial-gradient(circle_at_center,rgba(0,168,255,0.03),transparent_60%)] pointer-events-none z-0" />
          <span className="text-xs font-mono tracking-widest text-brand-green uppercase relative z-10">
            [ 01 // NOSSO POSICIONAMENTO ]
          </span>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-400 leading-tight tracking-tighter relative z-10">
            Engenharia de IA Real. <br />
            Sem Wrappers, Sem Atalhos.
          </h2>
          <p className="font-sans text-sm text-gray-400 leading-relaxed max-w-xl relative z-10">
            A maioria das empresas vende apenas interfaces bonitas conectadas ao ChatGPT. 
            Na Kodava, nós desenvolvemos a inteligência de fundo.
          </p>
        </div>

        {/* Diff Cards Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {blocks.map((block) => (
            <motion.div
              key={block.title}
              variants={cardVariants}
              className="bg-white/[0.01] border border-white/5 hover:border-white/10 transition-all duration-300 p-8 rounded-lg flex flex-col justify-between group"
            >
              <div className="flex flex-col gap-6">
                <div className="w-12 h-12 rounded bg-white/[0.02] border border-white/5 flex items-center justify-center group-hover:border-brand-blue/20 transition-colors">
                  <block.icon className="w-6 h-6 text-brand-blue" />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-mono text-brand-blue tracking-widest font-bold">
                    {block.label}
                  </span>
                  <h3 className="font-sans font-bold text-xl text-gray-200">
                    {block.title}
                  </h3>
                </div>
                <p className="font-sans text-xs text-gray-400 leading-relaxed">
                  {block.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/5 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-green" />
                <span className="text-[10px] font-mono text-brand-green tracking-widest uppercase">PROPRIETARY SECURITY READY</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Statistics section with GSAP animated counter */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 border-t border-white/5 relative z-10">
          <div className="flex flex-col gap-2 p-6 bg-white/[0.01] border border-white/5 rounded-lg">
            <span className="text-[10px] font-mono text-brand-primary tracking-widest uppercase">// REQUISIÇÕES / DIA</span>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl md:text-5xl font-sans font-extrabold text-white tracking-tight" id="stat-reqs">0</span>
              <span className="text-xl font-sans font-bold text-brand-primary">M+</span>
            </div>
            <span className="text-[9px] font-mono text-gray-500 uppercase">// PIPELINES DE IA PROCESSADOS</span>
          </div>

          <div className="flex flex-col gap-2 p-6 bg-white/[0.01] border border-white/5 rounded-lg">
            <span className="text-[10px] font-mono text-brand-secondary tracking-widest uppercase">// REDUÇÃO DE LATÊNCIA</span>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl md:text-5xl font-sans font-extrabold text-white tracking-tight" id="stat-latency">0</span>
              <span className="text-xl font-sans font-bold text-brand-secondary">%</span>
            </div>
            <span className="text-[9px] font-mono text-gray-500 uppercase">// COMPACTAÇÃO DE MODELOS</span>
          </div>

          <div className="flex flex-col gap-2 p-6 bg-white/[0.01] border border-white/5 rounded-lg">
            <span className="text-[10px] font-mono text-brand-green tracking-widest uppercase">// SLA DE DISPONIBILIDADE</span>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl md:text-5xl font-sans font-extrabold text-white tracking-tight" id="stat-sla">0</span>
              <span className="text-xl font-sans font-bold text-brand-green">%</span>
            </div>
            <span className="text-[9px] font-mono text-gray-500 uppercase">// SISTEMAS 100% PROPRIETÁRIOS</span>
          </div>
        </div>

        {/* Asymmetrical Quote */}
        <div className="mt-20 p-8 border-l border-white/10 bg-white/[0.01] max-w-4xl rounded-r-lg">
          <p className="font-sans italic text-lg sm:text-xl text-gray-300 leading-relaxed">
            "Wrappers de API expõem seu segredo de negócio e estão reféns de atualizações de terceiros. 
            Criar sua própria infraestrutura de IA protege sua propriedade intelectual e garante soberania tecnológica definitiva."
          </p>
          <span className="block mt-4 font-mono text-[10px] tracking-widest text-brand-blue uppercase">
            // EQUIPE DE ENGENHARIA, KODAVA SOLUTIONS
          </span>
        </div>

      </div>
    </section>
  );
}
