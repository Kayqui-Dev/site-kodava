'use client';

import { motion } from 'framer-motion';
import { Menu, X, Cpu } from 'lucide-react';
import { useState } from 'react';

const navLinks = [
  { href: '#hero', label: 'Home' },
  { href: '#diferenciais', label: 'Diferenciais' },
  { href: '#servicos', label: 'Serviços' },
  { href: '#portfolio', label: 'Portfólio' },
  { href: '#sobre', label: 'Sobre Nós' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 w-full z-50 glass-effect border-b border-border-accent/30"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-lg bg-brand-blue/10 border border-brand-blue/30 flex items-center justify-center group-hover:border-brand-cyan/50 transition-all duration-300 shadow-lg shadow-brand-blue/5">
            <Cpu className="w-5 h-5 text-brand-blue group-hover:text-brand-cyan transition-colors duration-300" />
          </div>
          <span className="font-serif font-black text-xl tracking-wide bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent group-hover:from-white group-hover:to-brand-blue transition-all duration-300">
            KODAVA
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs font-mono tracking-widest text-gray-400 hover:text-brand-blue hover:text-glow-blue transition-all duration-300 uppercase"
            >
              [ {link.label} ]
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <a
            href="#contato"
            className="text-xs font-mono tracking-widest text-brand-blue border border-brand-blue/35 px-5 py-2.5 rounded hover:bg-brand-blue hover:text-bg hover:shadow-[0_0_20px_rgba(0,168,255,0.45)] transition-all duration-300"
          >
            FALAR COM ESPECIALISTA
          </a>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-400 hover:text-brand-blue transition-colors duration-300"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden glass-effect border-b border-border-accent/30 px-6 py-6 flex flex-col gap-6"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-xs font-mono tracking-widest text-gray-400 hover:text-brand-blue transition-colors duration-300 uppercase"
            >
              [ {link.label} ]
            </a>
          ))}
          <a
            href="#contato"
            onClick={() => setIsOpen(false)}
            className="text-center text-xs font-mono tracking-widest text-brand-blue border border-brand-blue/35 py-3 rounded hover:bg-brand-blue hover:text-bg transition-all duration-300"
          >
            FALAR COM ESPECIALISTA
          </a>
        </motion.div>
      )}
    </motion.header>
  );
}
