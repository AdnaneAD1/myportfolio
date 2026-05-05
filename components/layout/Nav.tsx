'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Circle, FileDown, Globe } from 'lucide-react';
import { INFO, UI } from '@/lib/data';
import { useLanguage } from '@/context/LanguageContext';

export default function Nav() {
  const { lang, toggleLanguage } = useLanguage();
  const ui = UI[lang];
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { name: ui.nav.home, href: '#hero' },
    { name: ui.nav.about, href: '#about' },
    { name: ui.nav.skills, href: '#skills' },
    { name: ui.nav.work, href: '#projects' },
    { name: ui.nav.xp, href: '#experience' },
    { name: ui.nav.contact, href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = document.querySelectorAll('section[id]');
      let current = 'hero';
      
      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        if (window.scrollY >= sectionTop - 200) {
          current = section.getAttribute('id') || 'hero';
        }
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 md:px-12 py-5 transition-all duration-300 ${scrolled ? 'bg-[var(--bg)]/80 backdrop-blur-xl border-b border-[var(--border2)]' : 'bg-transparent'}`}>
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
          <li key={link.href}>
            <a
              href={link.href}
              onClick={(e) => scrollTo(e, link.href)}
              className={`text-[0.62rem] tracking-[0.15em] uppercase transition-colors duration-200 ${activeSection === link.href.substring(1) ? 'text-[var(--cyan)]' : 'text-[var(--gray2)] hover:text-[var(--cyan)]'}`}
            >
              {link.name}
            </a>
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

        {/* 
        <a 
          href="/cv.pdf" 
          download 
          className="hidden lg:flex items-center gap-2 text-[0.6rem] tracking-[0.12em] uppercase text-[var(--gray2)] hover:text-[var(--white)] transition-colors group"
        >
          <FileDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
          {ui.nav.cv}
        </a>
        */}
        
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
