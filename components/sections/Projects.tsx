'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Bot, Zap, Home, ShoppingBag, FileText, LucideIcon } from 'lucide-react';
import { Github } from '@/components/ui/Icons';
import { PROJECTS, UI } from '@/lib/data';
import SectionTag from '../ui/SectionTag';
import RevealWrapper from '../ui/RevealWrapper';
import SectionWrapper from './SectionWrapper';
import { useLanguage } from '@/context/LanguageContext';

const iconMap: Record<string, LucideIcon> = {
  Bot,
  Zap,
  Home,
  ShoppingBag,
  FileText
};

interface Project {
  num: string;
  icon: string;
  year: string;
  stack: string[];
  featured?: boolean;
  github?: string;
  fr: {
    badge: string;
    title: string;
    subtitle: string;
    description: string;
    highlight?: string;
  };
  en: {
    badge: string;
    title: string;
    subtitle: string;
    description: string;
    highlight?: string;
  };
}

function ProjectCard({ project, isLarge = false, lang, viewLabel }: { project: Project, isLarge?: boolean, lang: 'fr' | 'en', viewLabel: string }) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const content = project[lang];
  const Icon = iconMap[project.icon] || FileText;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -5;
    const rotY = ((x - cx) / cx) * 5;
    cardRef.current.style.transform =
      `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(30px) scale(1.02)`;
    cardRef.current.style.boxShadow =
      '0 28px 60px rgba(59,130,246,0.15), 0 0 0 1px rgba(59,130,246,0.18)';
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    setHovered(false);
    cardRef.current.style.transform =
      'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)';
    cardRef.current.style.boxShadow = 'none';
  };

  return (
    <div
      ref={cardRef}
      className={`bg-[var(--bg2)] p-9 relative overflow-hidden transition-all duration-350 ease-[cubic-bezier(0.23,1,0.32,1)] group cursor-none h-full ${isLarge ? "md:col-span-2" : ""}`}
      style={{
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Top line glow on hover */}
      <motion.div
        animate={{ scaleX: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
        style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
          background: 'linear-gradient(90deg, transparent, var(--blue), var(--cyan), transparent)',
          transformOrigin: 'left',
        }}
        transition={{ duration: 0.4 }}
      />

      <div className="flex justify-between items-center mb-5">
        <div className="w-8 h-8 flex items-center justify-center border border-[var(--border)] text-[var(--blue)]">
          <Icon size={16} />
        </div>
        <span className="text-[0.58rem] tracking-[0.12em] text-[var(--cyan)]">{project.year}</span>
      </div>

      <span className="inline-block text-[0.56rem] tracking-[0.1em] uppercase text-[var(--amber)] bg-[rgba(245,158,11,0.07)] border border-[rgba(245,158,11,0.2)] px-2 py-1 mb-4">
        {content.badge}
      </span>

      <h3 className="font-display text-[1.45rem] font-extrabold tracking-[-0.03em] text-[var(--white)] mb-1 leading-tight uppercase">
        {content.title}
      </h3>

      <p className="text-[0.7rem] text-[var(--gray2)] mb-4">{content.subtitle}</p>

      <motion.p 
        className="text-[0.76rem] line-height-[1.8] text-[var(--gray2)] mb-5"
        animate={{ opacity: hovered ? 1 : 0.7 }}
      >
        {content.description}
        {content.highlight && <strong className="text-[var(--amber)] font-normal ml-1">{content.highlight}</strong>}
      </motion.p>

      <div className="flex flex-wrap gap-2 mb-6">
        {project.stack.map((tag: string) => (
          <span key={tag} className="text-[0.6rem] tracking-[0.06em] text-[var(--blue)] bg-[rgba(59,130,246,0.06)] border border-[rgba(59,130,246,0.2)] px-2.5 py-1">
            {tag}
          </span>
        ))}
      </div>

      {/* EXTRA - revealed on hover */}
      <AnimatePresence>
        {hovered && project.github && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: '1rem' }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden border-t border-[var(--border2)] pt-4 flex gap-4 items-center"
          >
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[0.62rem] tracking-[0.1em] uppercase text-[var(--cyan)] border border-[var(--cyan)]/30 px-3 py-1.5 hover:bg-[var(--cyan)]/5 transition-colors"
            >
              <Github size={11} /> {viewLabel}
            </a>
            <span className="text-[0.62rem] text-[var(--gray)] flex items-center gap-1.5">
              <ArrowUpRight size={11} /> {project.year}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Projects() {
  const { lang } = useLanguage();
  const ui = UI[lang].projects;

  return (
    <SectionWrapper index={3}>
      <section id="projects" className="h-screen overflow-y-auto custom-scrollbar">
        <div className="min-h-full flex items-center py-24">
          <div className="max-w-[1100px] mx-auto px-6 md:px-12 w-full">
          <RevealWrapper>
            <SectionTag number={ui.tag} label={ui.label} />
            <h2 
              className="font-display text-[clamp(1.8rem,3.5vw,2.8rem)] font-extrabold tracking-[-0.03em] text-[var(--white)] leading-[1.05] mb-12"
              dangerouslySetInnerHTML={{ __html: ui.heading }}
            />
          </RevealWrapper>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-[var(--border2)]">
            {PROJECTS.map((project) => (
              <ProjectCard 
                key={project.num} 
                project={project as unknown as Project} 
                isLarge={project.featured} 
                lang={lang}
                viewLabel={ui.viewOnGithub}
              />
            ))}
          </div>
        </div>
      </div>
      </section>
    </SectionWrapper>
  );
}
