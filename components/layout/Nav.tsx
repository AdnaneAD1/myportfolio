'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Circle, FileDown, Globe } from 'lucide-react';
import { INFO, UI } from '@/lib/data';
import { useLanguage } from '@/context/LanguageContext';

import { useStore } from '@/lib/store';

export default function Nav() {
  const { lang, toggleLanguage } = useLanguage();
  const { currentIndex, goTo } = useStore();
  const ui = UI[lang];

  const navLinks = [
    { name: ui.nav.home, index: 0 },
    { name: ui.nav.about, index: 1 },
    { name: ui.nav.skills, index: 2 },
    { name: ui.nav.work, index: 3 },
    { name: ui.nav.xp, index: 4 },
    { name: ui.nav.contact, index: 5 },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 md:px-12 py-4 bg-[rgba(4,8,15,0.7)] backdrop-blur-md border-b border-[var(--border2)] md:bg-transparent md:backdrop-blur-none md:border-none">
      <div className="flex items-center gap-3 font-display font-extrabold text-sm tracking-tight text-[var(--white)]">
        <motion.div
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-[var(--cyan)]"
        >
          <Circle size={8} fill="currentColor" />
        </motion.div>
        {INFO.name.split(' ')[0][0]}.{INFO.name.split(' ')[1]}
      </div>

      <ul className="hidden md:flex items-center gap-8 list-none">
        {navLinks.map((link) => (
          <li key={link.index}>
            <button
              onClick={() => goTo(link.index)}
              className={`text-[0.62rem] tracking-[0.15em] uppercase transition-colors duration-200 cursor-none ${currentIndex === link.index ? 'text-[var(--cyan)]' : 'text-[var(--gray2)] hover:text-[var(--cyan)]'}`}
            >
              {link.name}
            </button>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-6">
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-2 text-[0.62rem] tracking-[0.12em] uppercase text-[var(--cyan)] hover:text-[var(--white)] transition-colors group cursor-none"
        >
          <Globe size={14} className="group-hover:rotate-12 transition-transform" />
          {lang === 'fr' ? 'EN' : 'FR'}
        </button>

        <div className="hidden sm:flex items-center gap-2 text-[0.6rem] tracking-[0.12em] uppercase text-[var(--gray2)]">
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-[#22C55E] rounded-full"
          />
          {ui.nav.status}
        </div>
      </div>
    </nav>
  );
}
