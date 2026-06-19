'use client';

import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Mail, MapPin, Phone, Code, Laptop } from 'lucide-react';
import LogoSVG from '@/components/LogoSVG';
import SolutionsHorizontal from '@/components/SolutionsHorizontal';
import HeroTechAsset from '@/components/HeroTechAsset';

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
      'Olá! Gostaria de falar com um especialista sobre desenvolvimento de websites e softwares da Kodava.'
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-transparent text-gray-100 relative selection:bg-brand-primary selection:text-black">
      
      {/* Background glowing effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(0,132,255,0.06),transparent_70%)] pointer-events-none z-0" />
      <div className="absolute top-[800px] left-10 w-80 h-80 bg-brand-secondary/[0.015] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[600px] right-10 w-96 h-96 bg-brand-primary/[0.015] rounded-full blur-[140px] pointer-events-none" />

      {/* Header/Navbar */}
      <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-black/60 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="w-10 h-10 flex items-center justify-center relative"
            >
              <LogoSVG className="w-9 h-9 drop-shadow-[0_0_8px_rgba(0,132,255,0.35)]" />
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
              <Code className="w-3.5 h-3.5 text-brand-secondary" />
              <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase">
                // WEBSITES PREMIUM & DESENVOLVIMENTO DE SOFTWARE DE ELITE
              </span>
            </div>

            <h1 className="font-sans font-extrabold text-5xl md:text-7xl leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-brand-primary">
              Websites Premium <br />
              & Softwares de Elite.
            </h1>

            <p className="font-sans text-sm md:text-base text-gray-400 max-w-xl leading-relaxed">
              Criamos websites institucionais de altíssimo padrão visual e performance, além de aplicativos, SaaS, automações inteligentes e sistemas de inteligência artificial customizados para o seu negócio.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <a
                href="#contato"
                className="inline-flex items-center justify-center gap-2 text-xs font-mono tracking-widest bg-white text-black px-8 py-4 rounded-md hover:bg-zinc-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all duration-300 group"
              >
                INICIAR PROJETO
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#solucoes"
                className="inline-flex items-center justify-center gap-2 text-xs font-mono tracking-widest border border-white/10 text-gray-400 hover:text-white hover:border-white/20 px-8 py-4 rounded-md transition-all duration-300"
              >
                VER SERVIÇOS
              </a>
            </div>
          </div>

          {/* Hero visual representation of Kodava */}
          <div className="lg:col-span-5 flex justify-center items-center relative h-[380px] lg:h-[500px]">
            {/* Glowing background behind asset */}
            <div className="absolute w-80 h-80 bg-brand-primary/10 rounded-full blur-[100px] pointer-events-none" />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="relative w-full h-full flex items-center justify-center"
            >
              <HeroTechAsset />
            </motion.div>
          </div>

        </div>
      </section>

      {/* Solutions Section (GSAP Scroll Slider) */}
      <SolutionsHorizontal />

      {/* Jobs-to-be-Done / Bento Grid Section */}
      <section id="manifesto" className="relative py-32 border-t border-white/5 z-10">
        <div className="max-w-7xl mx-auto px-6 w-full">
          
          <div className="max-w-3xl mb-20 flex flex-col gap-4">
            <span className="text-xs font-mono tracking-widest text-brand-primary uppercase">
              [ 03 // POR QUE A KODAVA ]
            </span>
            <h2 className="font-serif font-black text-4xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-400 leading-tight tracking-tight">
              O trabalho que resolvemos <br />
              para o seu negócio.
            </h2>
            <p className="font-sans text-sm text-gray-400 max-w-xl">
              Nossos clientes não contratam apenas desenvolvimento. Eles nos contratam para resolver desafios estéticos, operacionais e de segurança.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Bento Card 1: Websites */}
            <div className="backdrop-blur-md bg-zinc-900/10 border border-white/5 p-10 rounded-2xl flex flex-col justify-between hover:border-brand-primary/20 transition-all duration-300 relative group overflow-hidden min-h-[340px]">
              <div className="absolute top-0 right-0 w-40 h-40 bg-brand-primary/[0.01] rounded-full blur-3xl group-hover:bg-brand-primary/[0.03] transition-colors" />
              <div className="flex items-start justify-between">
                {/* SVG website asset */}
                <div className="w-16 h-16 rounded-xl bg-white/[0.01] border border-white/5 flex items-center justify-center group-hover:border-brand-secondary/20 transition-colors">
                  <svg className="w-10 h-10 text-brand-secondary" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="10" y="20" width="80" height="60" rx="6" stroke="currentColor" strokeWidth="2" />
                    <line x1="10" y1="35" x2="90" y2="35" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                    <circle cx="20" cy="27" r="3" fill="currentColor" />
                    <circle cx="30" cy="27" r="3" fill="currentColor" />
                    <circle cx="40" cy="27" r="3" fill="currentColor" />
                    <rect x="20" y="45" width="25" height="25" rx="3" stroke="currentColor" strokeWidth="2" className="animate-pulse" />
                    <line x1="55" y1="50" x2="80" y2="50" stroke="currentColor" strokeWidth="2" />
                    <line x1="55" y1="60" x2="75" y2="60" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
                <span className="font-serif font-black italic text-5xl md:text-6xl text-zinc-800/40 group-hover:text-brand-secondary/15 transition-colors">
                  01
                </span>
              </div>
              <div className="flex flex-col gap-3 mt-8 relative z-10">
                <span className="text-[9px] font-mono text-brand-secondary tracking-widest uppercase">// JOB: AUTORIDADE ESTÉTICA &amp; CONVERSÃO</span>
                <h3 className="font-serif font-black text-2xl text-gray-100 group-hover:text-brand-secondary transition-colors duration-300">
                  Websites que Elevam seu Ticket.
                </h3>
                <p className="font-sans text-xs text-gray-400 leading-relaxed">
                  Empresas líderes precisam que sua interface transmita excelência. Desenvolvemos sites institucionais cinematográficos e velozes para posicionar seu negócio com autoridade imediata.
                </p>
              </div>
            </div>

            {/* Bento Card 2: Automações */}
            <div className="backdrop-blur-md bg-zinc-900/10 border border-white/5 p-10 rounded-2xl flex flex-col justify-between hover:border-brand-primary/20 transition-all duration-300 relative group overflow-hidden min-h-[340px]">
              <div className="absolute top-0 right-0 w-40 h-40 bg-brand-primary/[0.01] rounded-full blur-3xl group-hover:bg-brand-primary/[0.03] transition-colors" />
              <div className="flex items-start justify-between">
                {/* SVG automation asset */}
                <div className="w-16 h-16 rounded-xl bg-white/[0.01] border border-white/5 flex items-center justify-center group-hover:border-brand-primary/20 transition-colors">
                  <svg className="w-10 h-10 text-brand-primary" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="30" cy="30" r="8" stroke="currentColor" strokeWidth="2" />
                    <circle cx="70" cy="30" r="8" stroke="currentColor" strokeWidth="2" />
                    <circle cx="50" cy="70" r="8" stroke="currentColor" strokeWidth="2" />
                    <path d="M38 30 H62 M62 38 L54 62 M38 38 L46 62" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2" />
                    <path d="M50 70 L50 85" stroke="currentColor" strokeWidth="2" className="animate-pulse" />
                  </svg>
                </div>
                <span className="font-serif font-black italic text-5xl md:text-6xl text-zinc-800/40 group-hover:text-brand-primary/15 transition-colors">
                  02
                </span>
              </div>
              <div className="flex flex-col gap-3 mt-8 relative z-10">
                <span className="text-[9px] font-mono text-brand-primary tracking-widest uppercase">// JOB: ESCALA SEM AUMENTO DE CUSTO</span>
                <h3 className="font-serif font-black text-2xl text-gray-100 group-hover:text-brand-primary transition-colors duration-300">
                  Automações Livres de Falhas.
                </h3>
                <p className="font-sans text-xs text-gray-400 leading-relaxed">
                  Elimine tarefas manuais que drenam a produtividade. Conectamos ERPs, CRMs e APIs em fluxos de trabalho autônomos que operam 24/7 sem erros humanos.
                </p>
              </div>
            </div>

            {/* Bento Card 3: SaaS / Softwares */}
            <div className="backdrop-blur-md bg-zinc-900/10 border border-white/5 p-10 rounded-2xl flex flex-col justify-between hover:border-brand-primary/20 transition-all duration-300 relative group overflow-hidden min-h-[340px]">
              <div className="absolute top-0 right-0 w-40 h-40 bg-brand-primary/[0.01] rounded-full blur-3xl group-hover:bg-brand-primary/[0.03] transition-colors" />
              <div className="flex items-start justify-between">
                {/* SVG software asset */}
                <div className="w-16 h-16 rounded-xl bg-white/[0.01] border border-white/5 flex items-center justify-center group-hover:border-brand-green/20 transition-colors">
                  <svg className="w-10 h-10 text-brand-green" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 30 L50 15 L80 30 L50 45 Z" stroke="currentColor" strokeWidth="2" />
                    <path d="M20 50 L50 65 L80 50" stroke="currentColor" strokeWidth="2" />
                    <path d="M20 70 L50 85 L80 70" stroke="currentColor" strokeWidth="2" />
                    <line x1="50" y1="45" x2="50" y2="85" stroke="currentColor" strokeWidth="2" strokeDasharray="2 2" />
                  </svg>
                </div>
                <span className="font-serif font-black italic text-5xl md:text-6xl text-zinc-800/40 group-hover:text-brand-green/15 transition-colors">
                  03
                </span>
              </div>
              <div className="flex flex-col gap-3 mt-8 relative z-10">
                <span className="text-[9px] font-mono text-brand-green tracking-widest uppercase">// JOB: SISTEMA OPERACIONAL PROPRIETÁRIO</span>
                <h3 className="font-serif font-black text-2xl text-gray-100 group-hover:text-brand-green transition-colors duration-300">
                  Sistemas Ajustados à sua Operação.
                </h3>
                <p className="font-sans text-xs text-gray-400 leading-relaxed">
                  Softwares genéricos engessam seus processos. Desenvolvemos sistemas corporativos complexos, SaaS escaláveis e aplicativos mobile moldados sob medida.
                </p>
              </div>
            </div>

            {/* Bento Card 4: IA Privada */}
            <div className="backdrop-blur-md bg-zinc-900/10 border border-white/5 p-10 rounded-2xl flex flex-col justify-between hover:border-brand-primary/20 transition-all duration-300 relative group overflow-hidden min-h-[340px]">
              <div className="absolute top-0 right-0 w-40 h-40 bg-brand-primary/[0.01] rounded-full blur-3xl group-hover:bg-brand-primary/[0.03] transition-colors" />
              <div className="flex items-start justify-between">
                {/* SVG AI asset */}
                <div className="w-16 h-16 rounded-xl bg-white/[0.01] border border-white/5 flex items-center justify-center group-hover:border-brand-primary/20 transition-colors">
                  <svg className="w-10 h-10 text-brand-primary" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 5" className="animate-[spin_20s_linear_infinite]" />
                    <polygon points="50,25 70,35 70,65 50,75 30,65 30,35" stroke="currentColor" strokeWidth="2" />
                    <circle cx="50" cy="50" r="10" fill="currentColor" className="animate-pulse" />
                  </svg>
                </div>
                <span className="font-serif font-black italic text-5xl md:text-6xl text-zinc-800/40 group-hover:text-brand-primary/15 transition-colors">
                  04
                </span>
              </div>
              <div className="flex flex-col gap-3 mt-8 relative z-10">
                <span className="text-[9px] font-mono text-brand-primary tracking-widest uppercase">// JOB: INOVAÇÃO COM SEGURANÇA TOTAL</span>
                <h3 className="font-serif font-black text-2xl text-gray-100 group-hover:text-brand-primary transition-colors duration-300">
                  Inteligência Artificial Privada.
                </h3>
                <p className="font-sans text-xs text-gray-400 leading-relaxed">
                  Treine e hospede modelos de IA de forma segura na nuvem privada da própria empresa, assegurando sigilo total de dados e regras de negócio.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contato" className="relative py-32 border-t border-white/5 z-10">
        <div className="max-w-7xl mx-auto px-6 w-full">
          
          <div className="max-w-3xl mb-16 flex flex-col gap-4">
            <span className="text-xs font-mono tracking-widest text-brand-primary uppercase">
              [ 04 // CANAL DE PARCERIA ]
            </span>
            <h2 className="font-sans font-extrabold text-3xl sm:text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-400 leading-tight tracking-tighter">
              Inicie seu Website <br />
              ou Projeto Digital.
            </h2>
            <p className="font-sans text-sm text-gray-400">
              Descreva as necessidades da sua empresa (Website, Aplicativo, SaaS, Automação ou IA) para abrirmos um canal direto de desenvolvimento.
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
                  <label className="text-[10px] font-mono text-gray-400 uppercase">O que vamos desenvolver? (Website, App, SaaS, Automação, IA...)</label>
                  <textarea 
                    required
                    rows={4}
                    placeholder="EX: PRECISAMOS DE UM WEBSITE INSTITUCIONAL PREMIUM E DE UMA AUTOMAÇÃO QUE SINCRONIZE NOSSOS LEADS COM O CRM..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="bg-black/40 border border-white/5 focus:border-brand-primary/50 text-xs font-mono text-gray-100 p-4 outline-none rounded-md resize-none transition-colors"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 text-xs font-mono tracking-widest bg-white text-black py-4 rounded-md font-bold hover:bg-zinc-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all duration-300 cursor-pointer"
                >
                  {isSent ? 'TICKET RECEBIDO!' : 'ENVIAR TICKET DO PROJETO'}
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
              // WEBSITES, PLATAFORMAS & TECNOLOGIA DE ESCALA
            </span>
          </div>

        </div>
      </section>

    </div>
  );
}
