'use client';

import { useState } from 'react';
import { Mail, MapPin, ArrowUpRight, CheckCircle2, Loader2 } from 'lucide-react';
import { Github } from '@/components/ui/Icons';
import { INFO, UI } from '@/lib/data';
import SectionTag from '../ui/SectionTag';
import RevealWrapper from '../ui/RevealWrapper';
import { useLanguage } from '@/context/LanguageContext';

import SectionWrapper from './SectionWrapper';

export default function Contact() {
  const { lang } = useLanguage();
  const ui = UI[lang].contact;

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch(`https://formspree.io/f/mnjwvqpy`, {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <SectionWrapper index={5}>
      <section id="contact" className="min-h-screen overflow-y-auto custom-scrollbar">
        <div className="min-h-full flex items-center py-24 pb-48">
          <div className="max-w-[1100px] mx-auto px-6 md:px-12 w-full">
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
                {status === 'success' ? (
                  <div className="bg-[var(--surface)] border border-[var(--blue)]/30 p-12 flex flex-col items-center text-center gap-4 animate-in fade-in zoom-in duration-500">
                    <CheckCircle2 size={48} className="text-[var(--blue)]" />
                    <h3 className="font-display text-xl font-bold text-[var(--white)] uppercase tracking-tight">
                      {lang === 'fr' ? 'Message Envoyé !' : 'Message Sent!'}
                    </h3>
                    <p className="text-[0.76rem] text-[var(--gray2)] max-w-[280px]">
                      {lang === 'fr'
                        ? 'Merci de m\'avoir contacté. Je vous répondrai dans les plus brefs délais.'
                        : 'Thank you for reaching out. I will get back to you as soon as possible.'}
                    </p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="mt-4 text-[0.6rem] tracking-[0.15em] uppercase text-[var(--cyan)] hover:underline cursor-none"
                    >
                      {lang === 'fr' ? 'Envoyer un autre message' : 'Send another message'}
                    </button>
                  </div>
                ) : (
                  <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[0.56rem] tracking-[0.15em] uppercase text-[var(--gray)]">{lang === 'fr' ? 'Prénom' : 'First Name'}</label>
                        <input name="firstName" required type="text" placeholder="Adnane" className="bg-[var(--surface)] border border-[var(--border2)] focus:border-[rgba(59,130,246,0.5)] text-[var(--white)] p-[0.85rem_1rem] font-mono text-[0.76rem] outline-none transition-colors" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[0.56rem] tracking-[0.15em] uppercase text-[var(--gray)]">{lang === 'fr' ? 'Nom' : 'Last Name'}</label>
                        <input name="lastName" required type="text" placeholder="Sidi-Amadou" className="bg-[var(--surface)] border border-[var(--border2)] focus:border-[rgba(59,130,246,0.5)] text-[var(--white)] p-[0.85rem_1rem] font-mono text-[0.76rem] outline-none transition-colors" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[0.56rem] tracking-[0.15em] uppercase text-[var(--gray)]">Email</label>
                      <input name="email" required type="email" placeholder="contact@company.com" className="bg-[var(--surface)] border border-[var(--border2)] focus:border-[rgba(59,130,246,0.5)] text-[var(--white)] p-[0.85rem_1rem] font-mono text-[0.76rem] outline-none transition-colors" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[0.56rem] tracking-[0.15em] uppercase text-[var(--gray)]">Message</label>
                      <textarea name="message" required placeholder={lang === 'fr' ? 'Décrivez votre projet...' : 'Describe your project...'} className="bg-[var(--surface)] border border-[var(--border2)] focus:border-[rgba(59,130,246,0.5)] text-[var(--white)] p-[0.85rem_1rem] font-mono text-[0.76rem] outline-none h-[120px] resize-none transition-colors"></textarea>
                    </div>

                    {status === 'error' && (
                      <p className="text-[0.65rem] text-red-400">
                        {lang === 'fr' ? 'Une erreur est survenue. Veuillez réessayer.' : 'An error occurred. Please try again.'}
                      </p>
                    )}

                    <button
                      disabled={status === 'sending'}
                      type="submit"
                      className="bg-[var(--blue)] hover:bg-[#2563EB] disabled:opacity-50 disabled:cursor-not-allowed text-[var(--white)] text-[0.68rem] tracking-[0.1em] uppercase py-3.5 w-full transition-all cursor-none active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                      {status === 'sending' ? (
                        <>
                          <Loader2 size={14} className="animate-spin" />
                          {lang === 'fr' ? 'Envoi en cours...' : 'Sending...'}
                        </>
                      ) : (
                        <>
                          {lang === 'fr' ? 'Envoyer' : 'Send'} <ArrowUpRight size={14} />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </RevealWrapper>
            </div>
          </div>
        </div>
      </section>
    </SectionWrapper>
  );
}
