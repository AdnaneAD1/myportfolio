'use client';

import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Github } from '@/components/ui/Icons';
import { Bot, Zap, Home, ShoppingBag, FileText, LucideIcon } from 'lucide-react';
import { PROJECTS, UI } from '@/lib/data';
import SectionTag from '../ui/SectionTag';
import RevealWrapper from '../ui/RevealWrapper';
import { useLanguage } from '@/context/LanguageContext';

const iconMap: Record<string, LucideIcon> = {
  Bot,
  Zap,
  Home,
  ShoppingBag,
  FileText
};

function ProjectCard({ project, isLarge = false, index, lang, viewLabel }: { project: any, isLarge?: boolean, index: number, lang: 'fr' | 'en', viewLabel: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const content = project[lang];
  const Icon = iconMap[project.icon] || FileText;
  
  // Alternate layout for the first two featured projects
  const isReversed = index === 1;

  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const ContentPart = (
    <div style={{ transform: "translateZ(30px)" }}>
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
      
      <p className="text-[0.76rem] line-height-[1.8] text-[var(--gray2)] mb-5">
        {content.description}
        {content.highlight && <strong className="text-[var(--amber)] font-normal ml-1">{content.highlight}</strong>}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {project.stack.map((tag: string) => (
          <span key={tag} className="text-[0.6rem] tracking-[0.06em] text-[var(--blue)] bg-[rgba(59,130,246,0.06)] border border-[rgba(59,130,246,0.2)] px-2.5 py-1">
            {tag}
          </span>
        ))}
      </div>

      {project.github && (
        <a 
          href={project.github} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[0.62rem] tracking-[0.1em] uppercase text-[var(--gray2)] hover:text-[var(--cyan)] transition-colors cursor-none"
        >
          <Github size={14} /> {viewLabel}
        </a>
      )}
    </div>
  );

  const VisualPart = isLarge && (
    <div className="proj-visual hidden md:flex aspect-[16/10] bg-[var(--surface)] border border-[var(--border2)] relative overflow-hidden items-center justify-center" style={{ transform: "translateZ(20px)" }}>
      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_29px,rgba(59,130,246,0.04)_30px),repeating-linear-gradient(90deg,transparent,transparent_29px,rgba(59,130,246,0.04)_30px)]" />
      <div className="font-display text-[12rem] font-extrabold text-[rgba(59,130,246,0.05)] tracking-[-0.06em] select-none">
        <Icon size={120} strokeWidth={1} />
      </div>
      <span className="absolute bottom-3 right-3 text-[0.55rem] tracking-[0.12em] uppercase text-[var(--gray)]">
        {content.title} · {project.year}
      </span>
    </div>
  );

  return (
    <RevealWrapper delay={0.1 * (index % 2)} className={isLarge ? "md:col-span-2" : ""}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className={`bg-[var(--bg2)] p-9 relative overflow-hidden transition-colors hover:bg-[var(--surface)] h-full group cursor-none ${isLarge ? "grid grid-cols-1 md:grid-cols-2 gap-12" : ""}`}
      >
        {/* Glow Effect */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--blue)] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        
        {isReversed ? (
          <>
            {VisualPart}
            {ContentPart}
          </>
        ) : (
          <>
            {ContentPart}
            {VisualPart}
          </>
        )}
      </motion.div>
    </RevealWrapper>
  );
}

export default function Projects() {
  const { lang } = useLanguage();
  const ui = UI[lang].projects;

  return (
    <section id="projects" className="bg-[var(--bg2)] border-t border-[var(--border2)]">
      <div className="max-w-[1100px] mx-auto px-6 md:px-12 py-24">
        <RevealWrapper>
          <SectionTag number={ui.tag} label={ui.label} />
          <h2 
            className="font-display text-[clamp(1.8rem,3.5vw,2.8rem)] font-extrabold tracking-[-0.03em] text-[var(--white)] leading-[1.05] mb-12"
            dangerouslySetInnerHTML={{ __html: ui.heading }}
          />
        </RevealWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-[var(--border2)]">
          {PROJECTS.map((project, i) => (
            <ProjectCard 
              key={project.num} 
              project={project} 
              isLarge={project.featured} 
              index={i}
              lang={lang}
              viewLabel={ui.viewOnGithub}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
