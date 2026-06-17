'use client';

import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Trophy, Database, ExternalLink } from 'lucide-react';

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

// Custom 3D Tilt Card Component using Framer Motion Spring physics
function Card3D({ children, className = '', glowColor = 'rgba(0, 168, 255, 0.15)' }: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Motion values for mouse coordinates (percentage 0 to 1)
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  
  // Spring transforms for smooth rotation
  const rotateX = useSpring(useTransform(y, [0, 1], [12, -12]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(x, [0, 1], [-12, 12]), { stiffness: 150, damping: 20 });
  
  // State for tracking mouse coordinate variables for the glare glow position
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Update motion values
    x.set(mouseX / width);
    y.set(mouseY / height);
    
    // Update local state for CSS glare
    setMousePos({ x: mouseX, y: mouseY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Reset spring to center
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={`glass-card rounded-lg overflow-hidden relative transition-colors duration-300 ${className}`}
    >
      {/* Glare/Glow overlay that follows the mouse cursor */}
      {isHovered && (
        <div 
          className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 220px at ${mousePos.x}px ${mousePos.y}px, ${glowColor}, transparent 80%)`,
          }}
        />
      )}
      
      {/* Container to preserve 3D layering of content */}
      <div style={{ transform: 'translateZ(20px)' }} className="h-full flex flex-col justify-between">
        {children}
      </div>
    </motion.div>
  );
}

export default function BentoGrid() {
  return (
    <section id="portfolio" className="relative py-24 bg-bg border-t border-gray-900/50">
      
      {/* Glowing shapes */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-brand-green/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-10 w-96 h-96 bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        
        {/* Header Block */}
        <div className="max-w-3xl mb-16 flex flex-col gap-4">
          <span className="text-xs font-mono tracking-widest text-brand-green uppercase">
            [ 03 // BENTO GRID DE SISTEMAS ]
          </span>
          <h2 className="font-serif font-black text-3xl sm:text-4xl md:text-5xl text-gray-100 leading-tight">
            Ecossistemas Desenvolvidos. <br />
            Conceitos e Clientes.
          </h2>
          <p className="font-mono text-xs text-gray-400 uppercase leading-relaxed max-w-xl">
            Clique ou passe o cursor sobre as células do grid para interagir de forma tátil e explorar os detalhes do sistema.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
          
          {/* Card 1: Centurion Scout (Concept) - col-span-2 row-span-1 */}
          <Card3D 
            className="md:col-span-2 md:row-span-1 border-brand-green/20"
            glowColor="rgba(0, 255, 204, 0.15)"
          >
            <div className="p-8 h-full flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded bg-brand-green/5 border border-brand-green/20 flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-brand-green" />
                </div>
                <span className="text-[9px] font-mono text-brand-green tracking-widest uppercase font-bold">
                  // PRODUTO CONCEITO: ANALYTICS
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="font-serif font-bold text-2xl text-gray-100">Centurion Scout</h4>
                <p className="font-mono text-xs text-gray-400 uppercase leading-relaxed max-w-2xl">
                  Plataforma integrada de scouting esportivo e análise preditiva de lutas. Avaliação estatística de performance de wrestling e simulação de embates usando redes neurais.
                </p>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-gray-800/40">
                <span className="text-[8px] font-mono text-gray-500">// TENSORFLOW / PYTHON CORE</span>
                <span className="text-[9px] font-mono text-brand-green uppercase tracking-wider">[ 01 ]</span>
              </div>
            </div>
          </Card3D>

          {/* Card 2: Decide Aí Vida (Concept) - col-span-1 row-span-1 */}
          <Card3D className="border-brand-blue/20">
            <div className="p-8 h-full flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded bg-brand-blue/5 border border-brand-blue/20 flex items-center justify-center">
                  <Database className="w-5 h-5 text-brand-blue" />
                </div>
                <span className="text-[9px] font-mono text-brand-blue tracking-widest uppercase font-bold">
                  // DECISION AI
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="font-serif font-bold text-xl text-gray-100">Decide Aí Vida</h4>
                <p className="font-mono text-[10px] text-gray-400 uppercase leading-relaxed">
                  Rede de decisão autônoma alimentada por LLMs locais seguros. Avalia logs operacionais e riscos de crédito instantaneamente.
                </p>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-gray-800/40">
                <span className="text-[8px] font-mono text-gray-500">// SECURE LOCAL RAG</span>
                <span className="text-[9px] font-mono text-brand-blue uppercase tracking-wider">[ 02 ]</span>
              </div>
            </div>
          </Card3D>

          {/* Card 3: Centurion Fight Shop (Real) - col-span-1 row-span-2 */}
          <Card3D className="md:row-span-2 group">
            <div className="h-full flex flex-col justify-between">
              <div className="relative h-44 overflow-hidden border-b border-gray-900/60">
                <img 
                  src="/images/centurion.png" 
                  alt="Centurion Fight Shop" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg/90 to-transparent" />
              </div>
              <div className="p-8 flex-grow flex flex-col justify-between">
                <div className="flex flex-col gap-3">
                  <span className="text-[9px] font-mono text-brand-blue tracking-widest font-bold">// REAL SYSTEM</span>
                  <h4 className="font-serif font-bold text-xl text-gray-100">Centurion Fight Shop</h4>
                  <p className="font-mono text-[10px] text-gray-400 uppercase leading-relaxed">
                    E-commerce completo e sistema interno para cadastro, indexação de lutas e gestão financeira de atletas associados.
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-gray-800/40 flex justify-between items-center">
                  <span className="text-[8px] font-mono text-gray-500">// NEXT.JS / SHOPIFY API</span>
                  <a href="#" className="text-[10px] font-mono text-brand-blue hover:text-white transition-colors">
                    [ VISITAR ]
                  </a>
                </div>
              </div>
            </div>
          </Card3D>

          {/* Card 4: Empório Glass (Real) - col-span-2 row-span-1 */}
          <Card3D className="md:col-span-2 group">
            <div className="h-full flex flex-col md:flex-row justify-between">
              <div className="p-8 flex-grow flex flex-col justify-between">
                <div className="flex flex-col gap-3">
                  <span className="text-[9px] font-mono text-brand-cyan tracking-widest font-bold">// FRONTEND PREMIUM</span>
                  <h4 className="font-serif font-bold text-xl text-gray-100">Empório Glass</h4>
                  <p className="font-mono text-[10px] text-gray-400 uppercase leading-relaxed max-w-md">
                    Site institucional premium com catálogo dinâmico de vidraçaria, esquadrias e isolamento acústico de alto padrão.
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-gray-800/40 flex justify-between items-center">
                  <span className="text-[8px] font-mono text-gray-500">// TAILWIND / MOTION FRAMEWORKS</span>
                  <a href="#" className="text-[10px] font-mono text-brand-cyan hover:text-white transition-colors">
                    [ VISITAR ]
                  </a>
                </div>
              </div>
              <div className="relative w-full md:w-56 h-full overflow-hidden border-t md:border-t-0 md:border-l border-gray-900/60 flex-shrink-0">
                <img 
                  src="/images/emporioglass.png" 
                  alt="Empório Glass" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-bg/40 to-transparent" />
              </div>
            </div>
          </Card3D>

          {/* Card 5: Esporte NTG (Real) - col-span-1 row-span-1 */}
          <Card3D className="group">
            <div className="p-8 h-full flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <span className="text-[9px] font-mono text-gray-500 tracking-widest font-bold">
                  // CLIENT SYSTEM
                </span>
                <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-brand-blue transition-colors" />
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="font-serif font-bold text-lg text-gray-100">NTG Wrestling</h4>
                <p className="font-mono text-[10px] text-gray-400 uppercase leading-relaxed">
                  Gerenciamento esportivo e portal institucional de wrestling olímpico.
                </p>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-gray-800/40">
                <span className="text-[8px] font-mono text-gray-500">// HIGH SPEED CDN</span>
                <span className="text-[8px] font-mono text-gray-300">// ACTIVE</span>
              </div>
            </div>
          </Card3D>

          {/* Card 6: Capril Sparta (Real) - col-span-1 row-span-1 */}
          <Card3D className="group">
            <div className="p-8 h-full flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <span className="text-[9px] font-mono text-gray-500 tracking-widest font-bold">
                  // CLIENT SYSTEM
                </span>
                <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-brand-green transition-colors" />
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="font-serif font-bold text-lg text-gray-100">Capril Sparta</h4>
                <p className="font-mono text-[10px] text-gray-400 uppercase leading-relaxed">
                  Sistema de rastreabilidade e catálogo de agroecologia familiar.
                </p>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-gray-800/40">
                <span className="text-[8px] font-mono text-gray-500">// SERVERLESS ARCH</span>
                <span className="text-[8px] font-mono text-gray-300">// ACTIVE</span>
              </div>
            </div>
          </Card3D>

          {/* Card 7: VTP System (Real) - col-span-1 md:col-span-2 row-span-1 */}
          <Card3D className="md:col-span-2 group">
            <div className="h-full flex flex-col md:flex-row justify-between">
              <div className="p-8 flex-grow flex flex-col justify-between">
                <div className="flex flex-col gap-3">
                  <span className="text-[9px] font-mono text-brand-blue tracking-widest font-bold">// SECURE DASHBOARD</span>
                  <h4 className="font-serif font-bold text-xl text-gray-100">VTPDirect Dashboard</h4>
                  <p className="font-mono text-[10px] text-gray-400 uppercase leading-relaxed">
                    Painel administrativo criptografado para indexação de dados e análise operacional de frotas industriais.
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-gray-800/40 flex justify-between items-center">
                  <span className="text-[8px] font-mono text-gray-500">// MYSQL / ADMIN PANEL</span>
                  <a href="#" className="text-[10px] font-mono text-brand-blue hover:text-white transition-colors">
                    [ VISITAR ]
                  </a>
                </div>
              </div>
              <div className="relative w-full md:w-56 h-full overflow-hidden border-t md:border-t-0 md:border-l border-gray-900/60 flex-shrink-0">
                <img 
                  src="/images/vtpsystem.png" 
                  alt="VTP System" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-bg/40 to-transparent" />
              </div>
            </div>
          </Card3D>

        </div>

      </div>
    </section>
  );
}
