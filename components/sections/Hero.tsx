'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Github } from '@/components/ui/Icons';
import { INFO, STATS, UI } from '@/lib/data';
import { useLanguage } from '@/context/LanguageContext';

export default function Hero() {
  const { lang } = useLanguage();
  const info = INFO[lang];
  const stats = STATS[lang];
  const ui = UI[lang];

  const scrollToProjects = () => {
    const target = document.getElementById('projects');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  const nameParts = INFO.name.split(' ');
  const firstName = nameParts[0];
  const lastNameFirstPart = nameParts[1].split('-')[0] + '-';
  const lastNameSecondPart = nameParts[1].split('-')[1];

  const fadeUp = {
    initial: { opacity: 0, y: 22 },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.15 + i * 0.15, duration: 0.7, ease: "easeOut" as any }
    })
  };

  return (
    <section id="hero" className="min-h-screen grid grid-cols-1 md:grid-cols-[1fr_360px] px-6 md:px-12 items-center relative overflow-hidden">
      <div className="absolute top-[20%] left-[25%] w-[500px] h-[500px] bg-[radial-gradient(ellipse,rgba(59,130,246,0.07)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-[15%] right-[15%] w-[350px] h-[350px] bg-[radial-gradient(ellipse,rgba(6,182,212,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="py-24 md:py-16">
        <motion.div 
          custom={0} variants={fadeUp} initial="initial" animate="animate"
          className="flex items-center gap-3 mb-7 text-[0.6rem] tracking-[0.2em] uppercase text-[var(--cyan)]"
        >
          <div className="w-7 h-[1px] bg-[var(--cyan)] opacity-60" />
          {info.title}
        </motion.div>

        <motion.h1 
          custom={1} variants={fadeUp} initial="initial" animate="animate"
          className="font-display text-[clamp(3.2rem,6.5vw,6rem)] font-extrabold leading-[0.92] tracking-[-0.04em] text-[var(--white)] mb-6 uppercase"
        >
          {firstName}<br />
          <span className="text-stroke text-transparent">{lastNameFirstPart}</span>{lastNameSecondPart}
        </motion.h1>

        <motion.p 
          custom={2} variants={fadeUp} initial="initial" animate="animate"
          className="text-[0.82rem] leading-[1.85] text-[var(--gray2)] max-width-[460px] mb-11 border-l-2 border-[rgba(59,130,246,0.25)] pl-5"
        >
          {info.subtitle}<br />
          <strong className="text-[var(--white)] font-normal">{info.stack}</strong>
        </motion.p>

        <motion.div custom={3} variants={fadeUp} initial="initial" animate="animate" className="flex flex-wrap gap-3">
          <button 
            onClick={scrollToProjects}
            className="inline-flex items-center gap-2 bg-[var(--blue)] hover:bg-[#2563EB] text-[var(--white)] text-[0.68rem] tracking-[0.1em] uppercase px-7 py-3 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-none"
          >
            {ui.nav.work} <ArrowUpRight size={14} />
          </button>
          <a 
            href={INFO.github} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-transparent border border-[var(--border2)] hover:border-[rgba(255,255,255,0.2)] text-[var(--gray2)] hover:text-[var(--white)] text-[0.68rem] tracking-[0.1em] uppercase px-6 py-3 transition-all cursor-none"
          >
            GitHub <Github size={14} />
          </a>
        </motion.div>
      </div>

      <div className="hidden md:flex flex-col self-stretch border-l border-[var(--border2)] pt-24 pb-16 pl-10">
        {stats.map((stat, i) => (
          <motion.div 
            key={stat.label}
            custom={i + 1}
            variants={fadeUp}
            initial="initial"
            animate="animate"
            className="group py-6 border-bottom border-[var(--border2)] relative transition-all duration-300 hover:pl-2"
          >
            <div className="absolute left-[-1px] top-0 bottom-0 w-[2px] bg-[var(--cyan)] scale-y-0 origin-top transition-transform duration-300 group-hover:scale-y-100" />
            <div className="font-display text-[2.6rem] font-extrabold tracking-[-0.04em] text-[var(--white)] leading-none">
              {stat.num.includes('+') ? (
                <>
                  {stat.num.replace('+', '')}<sup className="text-[1.1rem] text-[var(--blue)] align-super">+</sup>
                </>
              ) : stat.num}
            </div>
            <div className="text-[0.58rem] tracking-[0.12em] uppercase text-[var(--gray)] mt-1">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[0.55rem] tracking-[0.2em] uppercase text-[var(--gray)]">
        <span>Scroll</span>
        <div className="w-[1px] h-11 bg-gradient-to-b from-[var(--blue)] to-transparent relative overflow-hidden">
          <motion.div
            animate={{ y: [0, 44, 44] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" as any }}
            className="absolute top-0 left-0 w-full h-1/2 bg-[var(--white)]"
          />
        </div>
      </div>
    </section>
  );
}
