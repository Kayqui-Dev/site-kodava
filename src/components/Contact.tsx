'use client';

import { useState } from 'react';
import { Send, Phone, Mail, MapPin } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate sending
    console.log('Sending message:', formData);
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  const handleWhatsAppRedirect = () => {
    const phoneNumber = '5511999999999'; // Replace with real company number
    const message = encodeURIComponent(
      'Olá! Vim através do site da Kodava Solutions e gostaria de falar com um especialista em IA.'
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <section id="contato" className="relative py-24 bg-black border-t border-white/5">
      
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-brand-blue/[0.01] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 flex flex-col gap-4 relative">
          <div className="absolute -inset-x-20 -inset-y-20 bg-[radial-gradient(circle_at_center,rgba(0,168,255,0.03),transparent_60%)] pointer-events-none z-0" />
          <span className="text-xs font-mono tracking-widest text-brand-blue uppercase relative z-10">
            [ 05 // CONECTAR INFRAESTRUTURA ]
          </span>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-400 leading-tight tracking-tighter relative z-10">
            Inicie Seu Projeto <br />
            de Inteligência Artificial.
          </h2>
          <p className="font-sans text-sm text-gray-400 leading-relaxed max-w-xl relative z-10">
            Preencha os parâmetros abaixo para abrir um canal direto com nossa equipe de engenharia.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Info Side */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="bg-white/[0.01] border border-white/5 p-8 rounded-lg flex flex-col gap-6">
              <span className="text-[10px] font-mono text-brand-blue tracking-widest font-bold uppercase">
                // COMPILANDO INFORMAÇÕES
              </span>
              
              <div className="flex items-start gap-4">
                <Mail className="w-5 h-5 text-brand-blue mt-0.5" />
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-mono text-gray-500 uppercase">EMAIL:</span>
                  <span className="text-xs font-mono text-gray-200 uppercase">CONTATO@KODAVASOLUTIONS.COM</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-brand-blue mt-0.5" />
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-mono text-gray-500 uppercase">LOCALIZAÇÃO:</span>
                  <span className="text-xs font-mono text-gray-200 uppercase">SÃO PAULO // BRASIL</span>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Callout */}
            <div className="p-8 rounded-lg border border-brand-green/20 bg-brand-green/[0.01] flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-brand-green" />
                <span className="text-[10px] font-mono text-brand-green tracking-widest font-bold uppercase">CANAL CORPORATIVO RÁPIDO</span>
              </div>
              <p className="font-sans text-xs text-gray-400 leading-relaxed">
                Prefere atendimento imediato pelo celular para alinhar o escopo? Acesse o canal via WhatsApp.
              </p>
              <button 
                onClick={handleWhatsAppRedirect}
                className="w-full text-center text-xs font-mono tracking-widest text-brand-green border border-brand-green/35 py-3.5 rounded-md hover:bg-brand-green hover:text-bg hover:shadow-[0_0_20px_rgba(0,255,204,0.45)] transition-all duration-300 font-bold cursor-pointer"
              >
                [ CONECTAR WHATSAPP ]
              </button>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="bg-white/[0.01] border border-white/5 p-8 rounded-lg flex flex-col gap-6">
              <span className="text-[10px] font-mono text-gray-500 uppercase">// NOVO TICKET DE PROJETO</span>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-mono text-gray-400 uppercase">Seu Nome</label>
                <input 
                  type="text" 
                  required
                  placeholder="EX: MATEUS SILVA"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-black/40 border border-white/5 focus:border-brand-blue/50 text-xs font-mono text-gray-100 p-4 outline-none rounded-md transition-colors"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-mono text-gray-400 uppercase">Seu E-mail Corporativo</label>
                <input 
                  type="email" 
                  required
                  placeholder="EX: MATEUS@SUAEMPRESA.COM"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-black/40 border border-white/5 focus:border-brand-blue/50 text-xs font-mono text-gray-100 p-4 outline-none rounded-md transition-colors"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-mono text-gray-400 uppercase">Escopo / Desafio de IA</label>
                <textarea 
                  required
                  rows={4}
                  placeholder="EX: PRECISO DE UM SISTEMA ESPECIALISTA PARA ANALISAR CONTRATOS..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-black/40 border border-white/5 focus:border-brand-blue/50 text-xs font-mono text-gray-100 p-4 outline-none rounded-md resize-none transition-colors"
                />
              </div>

              <button 
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 text-xs font-mono tracking-widest bg-white text-black py-4 rounded-md font-bold hover:bg-zinc-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-300 cursor-pointer"
              >
                {isSent ? 'TICKET TRANSMITIDO!' : 'TRANSMITIR PARÂMETROS'}
              </button>

              {isSent && (
                <span className="text-center text-[10px] font-mono text-brand-green uppercase animate-pulse">
                  // MENSAGEM RECEBIDA. NOSSA ENGENHARIA RETORNARÁ EM ATÉ 24 HORAS.
                </span>
              )}
            </form>
          </div>

        </div>

        {/* Footer info */}
        <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-[10px] font-mono text-gray-500 uppercase">
            © 2026 KODAVA SOLUTIONS. TODOS OS DIREITOS RESERVADOS.
          </span>
          <span className="text-[10px] font-mono text-gray-500 uppercase">
            // SEGURANÇA, INTELIGÊNCIA & ESCALABILIDADE
          </span>
        </div>

      </div>
    </section>
  );
}
