'use client';

import { Mail, MapPin, ArrowUpRight } from 'lucide-react';
import { Github } from '@/components/ui/Icons';
import { INFO, UI } from '@/lib/data';
import SectionTag from '../ui/SectionTag';
import RevealWrapper from '../ui/RevealWrapper';
import { useLanguage } from '@/context/LanguageContext';

export default function Contact() {
  const { lang } = useLanguage();
  const ui = UI[lang].contact;

  return (
    <section id="contact" className="bg-[var(--bg2)] border-t border-[var(--border2)]">
      <div className="max-w-[1100px] mx-auto px-6 md:px-12 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
          <RevealWrapper>
            <SectionTag number={ui.tag} label={ui.label} />
            <h2 
              className="font-display text-[clamp(2.2rem,4.5vw,3.5rem)] font-extrabold tracking-[-0.04em] text-[var(--white)] leading-none mb-6 uppercase"
              dangerouslySetInnerHTML={{ __html: ui.heading }}
            />
            <p className="text-[0.78rem] leading-[1.9] text-[var(--gray2)] mb-8 max-w-[360px]">
              {ui.sub}
            </p>
            
            <div className="flex flex-col gap-3">
              <a href={`mailto:${INFO.email}`} className="flex items-center gap-4 text-[0.75rem] text-[var(--gray2)] hover:text-[var(--white)] hover:border-[rgba(59,130,246,0.35)] transition-all bg-[var(--surface)] border border-[var(--border2)] p-[0.9rem_1rem] group cursor-none">
                <Mail size={16} className="text-[var(--blue)]" />
                <div className="flex flex-col">
                  <span className="text-[0.55rem] uppercase tracking-wider text-[var(--gray)]">{ui.email}</span>
                  <span>{INFO.email}</span>
                </div>
                <ArrowUpRight size={14} className="ml-auto text-[var(--gray)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a href={INFO.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-[0.75rem] text-[var(--gray2)] hover:text-[var(--white)] hover:border-[rgba(59,130,246,0.35)] transition-all bg-[var(--surface)] border border-[var(--border2)] p-[0.9rem_1rem] group cursor-none">
                <Github size={16} className="text-[var(--blue)]" />
                <div className="flex flex-col">
                  <span className="text-[0.55rem] uppercase tracking-wider text-[var(--gray)]">{ui.github}</span>
                  <span>github.com/AdnaneAD1</span>
                </div>
                <ArrowUpRight size={14} className="ml-auto text-[var(--gray)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <div className="flex items-center gap-4 text-[0.75rem] text-[var(--gray2)] bg-[var(--surface)] border border-[var(--border2)] p-[0.9rem_1rem]">
                <MapPin size={16} className="text-[var(--blue)]" />
                <div className="flex flex-col">
                  <span className="text-[0.55rem] uppercase tracking-wider text-[var(--gray)]">{ui.location}</span>
                  <span>{INFO.location}</span>
                </div>
              </div>
            </div>
          </RevealWrapper>

          <RevealWrapper delay={0.2}>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[0.56rem] tracking-[0.15em] uppercase text-[var(--gray)]">{lang === 'fr' ? 'Prénom' : 'First Name'}</label>
                  <input type="text" placeholder="Adnane" className="bg-[var(--surface)] border border-[var(--border2)] focus:border-[rgba(59,130,246,0.5)] text-[var(--white)] p-[0.85rem_1rem] font-mono text-[0.76rem] outline-none transition-colors" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[0.56rem] tracking-[0.15em] uppercase text-[var(--gray)]">{lang === 'fr' ? 'Nom' : 'Last Name'}</label>
                  <input type="text" placeholder="Sidi-Amadou" className="bg-[var(--surface)] border border-[var(--border2)] focus:border-[rgba(59,130,246,0.5)] text-[var(--white)] p-[0.85rem_1rem] font-mono text-[0.76rem] outline-none transition-colors" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[0.56rem] tracking-[0.15em] uppercase text-[var(--gray)]">Email</label>
                <input type="email" placeholder="contact@company.com" className="bg-[var(--surface)] border border-[var(--border2)] focus:border-[rgba(59,130,246,0.5)] text-[var(--white)] p-[0.85rem_1rem] font-mono text-[0.76rem] outline-none transition-colors" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[0.56rem] tracking-[0.15em] uppercase text-[var(--gray)]">Message</label>
                <textarea placeholder={lang === 'fr' ? 'Décrivez votre projet...' : 'Describe your project...'} className="bg-[var(--surface)] border border-[var(--border2)] focus:border-[rgba(59,130,246,0.5)] text-[var(--white)] p-[0.85rem_1rem] font-mono text-[0.76rem] outline-none h-[120px] resize-none transition-colors"></textarea>
              </div>
              <button type="submit" className="bg-[var(--blue)] hover:bg-[#2563EB] text-[var(--white)] text-[0.68rem] tracking-[0.1em] uppercase py-3.5 w-full transition-all cursor-none active:scale-[0.98]">
                {lang === 'fr' ? 'Envoyer' : 'Send'} <ArrowUpRight size={14} className="inline ml-1" />
              </button>
            </form>
          </RevealWrapper>
        </div>
      </div>
    </section>
  );
}
