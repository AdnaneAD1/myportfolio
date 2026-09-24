'use client';

import React, { useState } from 'react';
import { BOOK_DATA } from '@/lib/data';
import { Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { Github } from '@/components/ui/Icons';

export default function ChapterContact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mailto fallback or submission trigger
    const subject = encodeURIComponent(`[Contact Book] Message de ${formData.name}`);
    const body = encodeURIComponent(`${formData.message}\n\nDe : ${formData.name} (${formData.email})`);
    window.location.href = `mailto:${BOOK_DATA.contact.coordinates.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 sm:p-9 text-[var(--ink)] overflow-y-auto">
      {/* En-tête */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-[10px] font-sans-ui text-[var(--gold)] uppercase tracking-widest font-semibold">
          <span>{BOOK_DATA.contact.chapterNumber}</span>
          <span className="w-4 h-[1px] bg-[var(--gold)]" />
          <span>Correspondance</span>
        </div>

        <h2 className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight text-[var(--ink)]">
          {BOOK_DATA.contact.title}
        </h2>
        <p className="font-editorial italic text-xs text-[var(--ink-soft)]">
          {BOOK_DATA.contact.subtitle}
        </p>
      </div>

      {/* Carte Postale / Format Lettre */}
      <div className="my-auto py-3">
        <div className="p-4 sm:p-5 rounded-lg border border-[var(--border-gold)] bg-[var(--paper-shade)]/50 shadow-xs relative">
          {/* Haut de la carte postale */}
          <div className="flex justify-between items-start border-b border-[var(--border)] pb-3 mb-3">
            <div>
              <span className="font-sans-ui text-[9px] font-bold text-[var(--gold)] tracking-widest uppercase block">
                {BOOK_DATA.contact.postcard.airmailText}
              </span>
              <p className="font-editorial font-bold text-sm text-[var(--ink)]">
                {BOOK_DATA.contact.coordinates.name}
              </p>
              <p className="font-sans-ui text-[10px] text-[var(--ink-soft)] flex items-center gap-1 mt-0.5">
                <MapPin size={10} /> {BOOK_DATA.contact.coordinates.location}
              </p>
            </div>

            <div className="border border-dashed border-[var(--gold)] px-2 py-1 text-center rounded">
              <span className="font-sans-ui text-[9px] font-bold text-[var(--gold)] block">
                {BOOK_DATA.contact.postcard.postmark}
              </span>
              <span className="font-sans-ui text-[8px] text-[var(--ink-soft)]">
                {BOOK_DATA.contact.postcard.stampText}
              </span>
            </div>
          </div>

          {/* Formulaire stylisé papier à lettre */}
          {submitted ? (
            <div className="py-6 text-center space-y-2">
              <CheckCircle2 size={32} className="mx-auto text-[var(--sage)]" />
              <p className="font-editorial font-bold text-base text-[var(--ink)]">
                Votre client de messagerie a été ouvert !
              </p>
              <p className="font-sans-ui text-xs text-[var(--ink-soft)]">
                Merci pour votre message. Je vous réponds sous 24 heures.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-2.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  required
                  placeholder="Votre nom ou société"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full text-xs font-sans-ui px-2.5 py-1.5 rounded bg-[var(--paper)] border border-[var(--border)] focus:border-[var(--gold)] outline-none"
                />
                <input
                  type="email"
                  required
                  placeholder="Votre adresse email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full text-xs font-sans-ui px-2.5 py-1.5 rounded bg-[var(--paper)] border border-[var(--border)] focus:border-[var(--gold)] outline-none"
                />
              </div>

              <textarea
                required
                rows={3}
                placeholder="Votre message, projet ou proposition..."
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                className="w-full text-xs font-sans-ui p-2.5 rounded bg-[var(--paper)] border border-[var(--border)] focus:border-[var(--gold)] outline-none resize-none"
              />

              <div className="flex items-center justify-between pt-1">
                <a
                  href={`mailto:${BOOK_DATA.contact.coordinates.email}`}
                  className="text-[11px] font-sans-ui text-[var(--gold)] hover:underline flex items-center gap-1"
                >
                  <Mail size={12} /> Ou écrivez directement
                </a>

                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[var(--gold)] hover:bg-[var(--gold-light)] text-[var(--paper)] font-sans-ui text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                >
                  <Send size={12} /> Envoyer la missive
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Bas de page */}
      <div className="pt-2 border-t border-[var(--border)] text-[10px] font-sans-ui text-[var(--ink-soft)] flex justify-between">
        <span>The Book of Adnane</span>
        <span>Page 17</span>
      </div>
    </div>
  );
}
