'use client';

import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Bot, Cpu, Database, Mail, MapPin, Phone, Shield, Terminal, MessageSquare, Code, CheckCircle2 } from 'lucide-react';

// Custom 3D Tilt Card Component using Framer Motion Spring physics
function Card3D({ children, className = '', glowColor = 'rgba(0, 132, 255, 0.08)' }: { children: React.ReactNode; className?: string; glowColor?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  
  const rotateX = useSpring(useTransform(y, [0, 1], [10, -10]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(x, [0, 1], [-10, 10]), { stiffness: 150, damping: 20 });
  
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    x.set(mouseX / rect.width);
    y.set(mouseY / rect.height);
    setMousePos({ x: mouseX, y: mouseY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className={`backdrop-blur-md bg-zinc-900/30 border border-white/10 rounded-lg overflow-hidden relative transition-all duration-300 ${className}`}
    >
      {isHovered && (
        <div 
          className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 200px at ${mousePos.x}px ${mousePos.y}px, ${glowColor}, transparent 80%)`,
          }}
        />
      )}
      <div style={{ transform: 'translateZ(15px)' }} className="h-full flex flex-col justify-between">
        {children}
      </div>
    </motion.div>
  );
}

export default function Home() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Ticket IA enviado:', formData);
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  const handleWhatsAppRedirect = () => {
    const phoneNumber = '5511999999999';
    const message = encodeURIComponent(
      'Olá! Gostaria de falar com um especialista sobre inteligência artificial proprietária da Kodava.'
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-black text-gray-100 relative selection:bg-brand-primary selection:text-black">
      
      {/* Background glowing effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(0,132,255,0.06),transparent_70%)] pointer-events-none z-0" />
      <div className="absolute top-[800px] left-10 w-80 h-80 bg-brand-secondary/[0.015] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[600px] right-10 w-96 h-96 bg-brand-primary/[0.015] rounded-full blur-[140px] pointer-events-none" />

      {/* Header/Navbar */}
      <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-black/60 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <motion.div 
              whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
              className="w-10 h-10 flex items-center justify-center relative"
            >
              {/* Official Crystalline Fluid Logo K */}
              <svg className="w-[38px] h-[38px] drop-shadow-[0_0_8px_rgba(0,132,255,0.35)]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="k-logo-grad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#00e5ff" />
                    <stop offset="50%" stopColor="#0084ff" />
                    <stop offset="100%" stopColor="#032e6a" />
                  </linearGradient>
                </defs>
                <path 
                  d="M24 15 C 24 15, 34 22, 34 50 C 34 78, 24 85, 24 85 L 34 85 C 34 85, 44 78, 44 50 C 44 22, 34 15, 34 15 Z" 
                  fill="url(#k-logo-grad)" 
                />
                <path 
                  d="M42 50 L 76 15 L 86 15 L 53 50 L 86 85 L 76 85 Z" 
                  fill="url(#k-logo-grad)" 
                  opacity="0.9" 
                />
                <circle cx="28" cy="12" r="3" fill="#00e5ff" />
                <circle cx="16" cy="19" r="2" fill="#0084ff" />
                <circle cx="18" cy="74" r="2.5" fill="#00e5ff" />
                <circle cx="82" cy="12" r="2.5" fill="#00e5ff" />
                <circle cx="88" cy="78" r="3" fill="#0084ff" />
              </svg>
            </motion.div>
            <span className="font-sans font-extrabold text-xl tracking-wider bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent group-hover:from-white group-hover:to-brand-primary transition-all duration-300">
              KODAVA
            </span>
          </a>

          <nav className="flex items-center gap-6">
            <a
              href="#solucoes"
              className="text-xs font-mono tracking-widest text-gray-400 hover:text-brand-primary transition-colors duration-300 uppercase hidden sm:block"
            >
              [ SOLUÇÕES ]
            </a>
            <a
              href="#contato"
              className="text-[11px] font-mono tracking-widest text-brand-primary border border-brand-primary/30 px-5 py-2 rounded-md hover:bg-brand-primary hover:text-black hover:shadow-[0_0_15px_rgba(0,132,255,0.4)] transition-all duration-300"
            >
              FALAR COM ESPECIALISTA
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-28 overflow-hidden z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_60%,transparent_100%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero text content */}
          <div className="lg:col-span-7 flex flex-col gap-6 relative">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.02] border border-white/5 max-w-fit">
              <Cpu className="w-3.5 h-3.5 text-brand-secondary" />
              <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase">
                // ARQUITETURA DE IA PROPRIETÁRIA
              </span>
            </div>

            <h1 className="font-sans font-extrabold text-5xl md:text-7xl leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-brand-primary">
              Sistemas de IA <br />
              Customizados para Negócios.
            </h1>

            <p className="font-sans text-sm md:text-base text-gray-400 max-w-xl leading-relaxed">
              Diferente de wrappers genéricos, a <span className="text-brand-primary font-semibold">Kodava Solutions</span> desenvolve ecossistemas de IA sob medida e privados. Treinados na sua base histórica, integrados de forma 100% segura à sua infraestrutura cloud sem expor dados.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <a
                href="#contato"
                className="inline-flex items-center justify-center gap-2 text-xs font-mono tracking-widest bg-white text-black px-8 py-4 rounded-md hover:bg-zinc-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all duration-300 group"
              >
                FALAR COM ENGENHARIA
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#solucoes"
                className="inline-flex items-center justify-center gap-2 text-xs font-mono tracking-widest border border-white/10 text-gray-400 hover:text-white hover:border-white/20 px-8 py-4 rounded-md transition-all duration-300"
              >
                VER SOLUÇÕES
              </a>
            </div>
          </div>

          {/* Hero visual representation of Kodava logo */}
          <div className="lg:col-span-5 flex justify-center items-center relative h-[380px] lg:h-[500px]">
            {/* Glowing background behind logo */}
            <div className="absolute w-72 h-72 bg-brand-primary/10 rounded-full blur-[100px] pointer-events-none" />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="relative w-72 h-72 flex items-center justify-center border border-white/5 bg-zinc-900/10 backdrop-blur-md rounded-2xl shadow-[0_0_50px_rgba(0,132,255,0.1)]"
            >
              <svg className="w-[180px] h-[180px] drop-shadow-[0_0_25px_rgba(0,132,255,0.4)]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="k-hero-grad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#00e5ff" />
                    <stop offset="50%" stopColor="#0084ff" />
                    <stop offset="100%" stopColor="#032e6a" />
                  </linearGradient>
                </defs>
                <path 
                  d="M24 15 C 24 15, 34 22, 34 50 C 34 78, 24 85, 24 85 L 34 85 C 34 85, 44 78, 44 50 C 44 22, 34 15, 34 15 Z" 
                  fill="url(#k-hero-grad)" 
                />
                <path 
                  d="M42 50 L 76 15 L 86 15 L 53 50 L 86 85 L 76 85 Z" 
                  fill="url(#k-hero-grad)" 
                  opacity="0.9" 
                />
                <circle cx="28" cy="12" r="3" fill="#00e5ff" />
                <circle cx="16" cy="19" r="2" fill="#0084ff" />
                <circle cx="18" cy="74" r="2.5" fill="#00e5ff" />
                <circle cx="82" cy="12" r="2.5" fill="#00e5ff" />
                <circle cx="88" cy="78" r="3" fill="#0084ff" />
              </svg>
            </motion.div>
          </div>

        </div>
      </section>

      {/* Solutions Grid Section */}
      <section id="solucoes" className="relative py-32 border-t border-white/5 z-10">
        <div className="max-w-7xl mx-auto px-6 w-full">
          
          <div className="max-w-3xl mb-20 flex flex-col gap-4">
            <span className="text-xs font-mono tracking-widest text-brand-secondary uppercase">
              [ 01 // NOSSO ECOSSISTEMA ]
            </span>
            <h2 className="font-sans font-extrabold text-3xl sm:text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-400 leading-tight tracking-tighter">
              Soluções Especializadas para Escala.
            </h2>
            <p className="font-sans text-sm text-gray-400 max-w-xl">
              Desenvolvemos e integramos componentes fundamentais de IA ajustados às regras operacionais do seu negócio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1: RAG & Knowledge bases */}
            <Card3D glowColor="rgba(0, 229, 255, 0.08)">
              <div className="p-8 h-full flex flex-col justify-between min-h-[300px]">
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-md bg-white/[0.02] border border-white/10 flex items-center justify-center">
                    <Database className="w-5 h-5 text-brand-secondary" />
                  </div>
                  <span className="text-[9px] font-mono text-brand-secondary tracking-widest uppercase font-bold">// DATA TRAINING</span>
                </div>
                <div className="flex flex-col gap-2 mt-6">
                  <h3 className="font-sans font-bold text-xl text-gray-100">Modelos Proprietários</h3>
                  <p className="font-sans text-xs text-gray-400 leading-relaxed">
                    Treinamos redes neurais diretamente em seu histórico de logs e conhecimento corporativo privado, mitigando alucinações.
                  </p>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-white/10 mt-6">
                  <span className="text-[8px] font-mono text-gray-500">// LLM / PYTORCH</span>
                  <span className="text-[9px] font-mono text-brand-secondary uppercase tracking-wider">[ 01 ]</span>
                </div>
              </div>
            </Card3D>

            {/* Card 2: Autonomous Agents */}
            <Card3D glowColor="rgba(0, 132, 255, 0.08)">
              <div className="p-8 h-full flex flex-col justify-between min-h-[300px]">
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-md bg-white/[0.02] border border-white/10 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-brand-primary" />
                  </div>
                  <span className="text-[9px] font-mono text-brand-primary tracking-widest uppercase font-bold">// AUTONOMY</span>
                </div>
                <div className="flex flex-col gap-2 mt-6">
                  <h3 className="font-sans font-bold text-xl text-gray-100">Agentes Cognitivos</h3>
                  <p className="font-sans text-xs text-gray-400 leading-relaxed">
                    Desenvolvimento de agentes de tomada de decisão aptos a interagir com bancos de dados, APIs de mercado e rotinas administrativas.
                  </p>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-white/10 mt-6">
                  <span className="text-[8px] font-mono text-gray-500">// ORCHESTRATION / AGENTS</span>
                  <span className="text-[9px] font-mono text-brand-primary uppercase tracking-wider">[ 02 ]</span>
                </div>
              </div>
            </Card3D>

            {/* Card 3: Secure Cloud Infrastructure */}
            <Card3D glowColor="rgba(0, 255, 204, 0.08)">
              <div className="p-8 h-full flex flex-col justify-between min-h-[300px]">
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-md bg-white/[0.02] border border-white/10 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-brand-green" />
                  </div>
                  <span className="text-[9px] font-mono text-brand-green tracking-widest uppercase font-bold">// PRIVATE ARCH</span>
                </div>
                <div className="flex flex-col gap-2 mt-6">
                  <h3 className="font-sans font-bold text-xl text-gray-100">Infraestrutura Dedicada</h3>
                  <p className="font-sans text-xs text-gray-400 leading-relaxed">
                    Hospedagem das inteligências artificiais na nuvem privada de sua empresa (AWS, Azure, GCP) garantindo conformidade com a LGPD.
                  </p>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-white/10 mt-6">
                  <span className="text-[8px] font-mono text-gray-500">// CLOUD SECURITY</span>
                  <span className="text-[9px] font-mono text-brand-green uppercase tracking-wider">[ 03 ]</span>
                </div>
              </div>
            </Card3D>

          </div>

        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contato" className="relative py-32 border-t border-white/5 z-10">
        <div className="max-w-7xl mx-auto px-6 w-full">
          
          <div className="max-w-3xl mb-16 flex flex-col gap-4">
            <span className="text-xs font-mono tracking-widest text-brand-primary uppercase">
              [ 02 // CANAL DE PARCERIA ]
            </span>
            <h2 className="font-sans font-extrabold text-3xl sm:text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-400 leading-tight tracking-tighter">
              Inicie seu Projeto <br />
              de Inteligência Artificial.
            </h2>
            <p className="font-sans text-sm text-gray-400">
              Descreva as dores operacionais e infraestrutura da sua empresa para abrirmos um canal direto de desenvolvimento.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Contact Details */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              <div className="bg-zinc-900/10 backdrop-blur-md border border-white/5 p-8 rounded-lg flex flex-col gap-6">
                <span className="text-[10px] font-mono text-brand-primary tracking-widest font-bold uppercase">
                  // COMUNICADO DE TI
                </span>
                
                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-brand-primary mt-0.5" />
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-mono text-gray-500 uppercase">EMAIL:</span>
                    <span className="text-xs font-mono text-gray-200 uppercase">CONTATO@KODAVASOLUTIONS.COM</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-brand-primary mt-0.5" />
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-mono text-gray-500 uppercase">LOCALIZAÇÃO:</span>
                    <span className="text-xs font-mono text-gray-200 uppercase">SÃO PAULO // BRASIL</span>
                  </div>
                </div>
              </div>

              {/* WhatsApp direct route */}
              <div className="p-8 rounded-lg border border-brand-green/20 bg-brand-green/[0.01] flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-brand-green" />
                  <span className="text-[10px] font-mono text-brand-green tracking-widest font-bold uppercase">SUPORTE E VENDAS RÁPIDO</span>
                </div>
                <p className="font-sans text-xs text-gray-400 leading-relaxed">
                  Para alinhar escopo de projetos imediatamente via celular corporativo, inicie a conexão direta por WhatsApp.
                </p>
                <button 
                  onClick={handleWhatsAppRedirect}
                  className="w-full text-center text-xs font-mono tracking-widest text-brand-green border border-brand-green/30 py-3.5 rounded-md hover:bg-brand-green hover:text-black hover:shadow-[0_0_20px_rgba(0,255,204,0.4)] transition-all duration-300 font-bold cursor-pointer"
                >
                  [ CONECTAR WHATSAPP ]
                </button>
              </div>
            </div>

            {/* Simple Form */}
            <div className="lg:col-span-7">
              <form onSubmit={handleSubmit} className="bg-zinc-900/10 backdrop-blur-md border border-white/5 p-8 rounded-lg flex flex-col gap-6">
                <span className="text-[10px] font-mono text-gray-500 uppercase">// NOVO TICKET DE DESENVOLVIMENTO</span>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-mono text-gray-400 uppercase">Seu Nome</label>
                  <input 
                    type="text" 
                    required
                    placeholder="EX: CLAUDIO SOUZA"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-black/40 border border-white/5 focus:border-brand-primary/50 text-xs font-mono text-gray-100 p-4 outline-none rounded-md transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-mono text-gray-400 uppercase">E-mail Corporativo</label>
                  <input 
                    type="email" 
                    required
                    placeholder="EX: CLAUDIO@EMPRESA.COM"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-black/40 border border-white/5 focus:border-brand-primary/50 text-xs font-mono text-gray-100 p-4 outline-none rounded-md transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-mono text-gray-400 uppercase">Desafio de IA</label>
                  <textarea 
                    required
                    rows={4}
                    placeholder="EX: GOSTARÍAMOS DE TREINAR UM MODELO PRIVADO PARA ATENDIMENTO FINANCEIRO..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="bg-black/40 border border-white/5 focus:border-brand-primary/50 text-xs font-mono text-gray-100 p-4 outline-none rounded-md resize-none transition-colors"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 text-xs font-mono tracking-widest bg-white text-black py-4 rounded-md font-bold hover:bg-zinc-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all duration-300 cursor-pointer"
                >
                  {isSent ? 'TICKET RECEBIDO!' : 'ENVIAR TICKET IA'}
                </button>

                {isSent && (
                  <span className="text-center text-[10px] font-mono text-brand-green uppercase animate-pulse">
                    // SOLICITAÇÃO ENVIADA COM SUCESSO. RETORNAREMOS EM ATÉ 24 HORAS.
                  </span>
                )}
              </form>
            </div>

          </div>

          {/* Footer info */}
          <div className="mt-32 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="text-[10px] font-mono text-gray-500 uppercase">
              © 2026 KODAVA SOLUTIONS. TODOS OS DIREITOS RESERVADOS.
            </span>
            <span className="text-[10px] font-mono text-gray-500 uppercase">
              // SEGURANÇA, INTELIGÊNCIA & ESCALABILIDADE
            </span>
          </div>

        </div>
      </section>

    </div>
  );
}
