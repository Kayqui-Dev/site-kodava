'use client';

import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
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
      className="fixed top-0 left-0 w-full z-50 glass-effect border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-3 group">
          <motion.div 
            whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
            className="w-10 h-10 flex items-center justify-center relative"
          >
            {/* Custom Crystalline Fluid Logo K */}
            <svg className="w-[38px] h-[38px] drop-shadow-[0_0_8px_rgba(0,132,255,0.35)]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="k-logo-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#00e5ff" />
                  <stop offset="50%" stopColor="#0084ff" />
                  <stop offset="100%" stopColor="#032e6a" />
                </linearGradient>
              </defs>
              {/* Crystalline Liquid Path shapes matching K logo */}
              <path 
                d="M24 15 C 24 15, 34 22, 34 50 C 34 78, 24 85, 24 85 L 34 85 C 34 85, 44 78, 44 50 C 44 22, 34 15, 34 15 Z" 
                fill="url(#k-logo-grad)" 
              />
              <path 
                d="M42 50 L 76 15 L 86 15 L 53 50 L 86 85 L 76 85 Z" 
                fill="url(#k-logo-grad)" 
                opacity="0.9" 
              />
              {/* Droplets flying off */}
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

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs font-mono tracking-widest text-gray-400 hover:text-brand-primary hover:text-glow-blue transition-all duration-300 uppercase"
            >
              [ {link.label} ]
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <a
            href="#contato"
            className="text-[11px] font-mono tracking-widest text-brand-primary border border-brand-primary/30 px-5 py-2.5 rounded-md hover:bg-brand-primary hover:text-black hover:shadow-[0_0_20px_rgba(0,132,255,0.45)] transition-all duration-300"
          >
            FALAR COM ESPECIALISTA
          </a>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-400 hover:text-brand-primary transition-colors duration-300"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden glass-effect border-b border-white/5 px-6 py-6 flex flex-col gap-6"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-xs font-mono tracking-widest text-gray-400 hover:text-brand-primary transition-colors duration-300 uppercase"
            >
              [ {link.label} ]
            </a>
          ))}
          <a
            href="#contato"
            onClick={() => setIsOpen(false)}
            className="text-center text-xs font-mono tracking-widest text-brand-primary border border-brand-primary/30 py-3 rounded-md hover:bg-brand-primary hover:text-black transition-all duration-300"
          >
            FALAR COM ESPECIALISTA
          </a>
        </motion.div>
      )}
    </motion.header>
  );
}
