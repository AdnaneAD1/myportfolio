'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { BOOK_DATA, ProjectItem, ExperienceItem } from '@/lib/data';
import { CHAPTERS, useBookStore } from '@/lib/store';
import {
  ChevronLeft,
  ChevronRight,
  Bookmark,
  Volume2,
  VolumeX,
  BookOpen,
  ArrowUpRight,
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  Sparkles,
  RotateCcw
} from 'lucide-react';
import { Github } from '@/components/ui/Icons';

// Synthétiseur audio Web Audio API pour bruissement de page réaliste et feutré
function playPaperFlipSound() {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    const bufferSize = ctx.sampleRate * 0.24;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(750, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.22);
    filter.Q.setValueAtTime(1.5, ctx.currentTime);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.07, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.23);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start();
  } catch {
    // Silencieux si non supporté
  }
}

// Composant de feuille volante 3D continue haute performance (120 FPS)
// Feuille unifiée pleine page strictement scellée à la reliure centrale (X=0)
// L'axe de rotation est fixe sur le pli central pour un maintien parfait sans aucun décollement
interface TurningSheet3DProps {
  direction: 'forward' | 'backward';
  frontPageNum: number;
  backPageNum: number;
  renderPage: (num: number) => React.ReactNode;
  isMobile: boolean;
  progress: number | null; // 0.0 -> 1.0 si suivi direct du doigt ou snap animé
}

function TurningSheet3D({
  direction,
  frontPageNum,
  backPageNum,
  renderPage,
  isMobile,
  progress,
}: TurningSheet3DProps) {
  const isFwd = direction === 'forward';
  const isDirect = progress !== null;
  const p = isDirect ? Math.max(0, Math.min(1, progress)) : 0;

  // Rotation 3D continue rigoureusement axée sur la pliure centrale (X=0)
  // Aucun décollement : la tranche interne de la feuille reste fixée à la reliure
  const rotY = isFwd ? -180 * p : -180 + 180 * p;
  const curvatureShadowOpacity = isDirect ? Math.sin(p * Math.PI) : 0.6;

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: isMobile ? '0%' : '50%',
        width: isMobile ? '100%' : '50%',
        height: '100%',
        transformOrigin: 'left center',
        transformStyle: 'preserve-3d',
        zIndex: 50,
        willChange: 'transform',
        ...(isDirect
          ? {
              transform: `rotateY(${rotY}deg)`,
              transition: 'none',
            }
          : {
              animation: isFwd
                ? 'pageTurnForward 0.62s cubic-bezier(0.2, 0, 0.2, 1) forwards'
                : 'pageTurnBackward 0.62s cubic-bezier(0.2, 0, 0.2, 1) forwards',
            }),
      }}
      className="pointer-events-none select-none"
    >
      {/* FACE RECTO (Visible de 0° à 90°) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backfaceVisibility: 'hidden',
          transform: 'translateZ(1px)',
          willChange: 'transform',
        }}
        className={`overflow-hidden bg-[#FAF5EA] select-none shadow-[0_20px_45px_rgba(30,42,56,0.18)] ${
          frontPageNum === 0
            ? 'rounded-r-lg border-y border-r border-[var(--border)]'
            : 'border-y border-r border-[var(--border)]'
        }`}
      >
        {renderPage(frontPageNum)}

        {/* Ombre de pliure dynamique qui traverse la feuille */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-75"
          style={{
            opacity: curvatureShadowOpacity,
            background:
              'linear-gradient(to right, rgba(30,42,56,0.18) 0%, rgba(30,42,56,0.04) 18%, transparent 45%, rgba(30,42,56,0.06) 75%, rgba(30,42,56,0.22) 100%)',
          }}
        />
        {/* Reflet lumineux soyeux sur la crête centrale */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-75"
          style={{
            opacity: curvatureShadowOpacity * 0.7,
            background:
              'linear-gradient(to right, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)',
          }}
        />
      </div>

      {/* FACE VERSO (Visible de 90° à 180°) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backfaceVisibility: 'hidden',
          transform: 'rotateY(180deg) translateZ(1px)',
          willChange: 'transform',
        }}
        className={`overflow-hidden bg-[#FAF5EA] select-none shadow-[0_20px_45px_rgba(30,42,56,0.18)] ${
          backPageNum === 1
            ? 'rounded-l-lg border-y border-l border-[var(--border)]'
            : 'border-y border-l border-[var(--border)]'
        }`}
      >
        {renderPage(backPageNum)}

        {/* Ombre de pliure face verso */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-75"
          style={{
            opacity: curvatureShadowOpacity,
            background:
              'linear-gradient(to left, rgba(30,42,56,0.18) 0%, rgba(30,42,56,0.04) 18%, transparent 45%, rgba(30,42,56,0.06) 75%, rgba(30,42,56,0.22) 100%)',
          }}
        />
        {/* Reflet lumineux face verso */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-75"
          style={{
            opacity: curvatureShadowOpacity * 0.7,
            background:
              'linear-gradient(to left, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)',
          }}
        />
      </div>
    </div>
  );
}

export default function InteractiveBook() {
  const { soundEnabled, toggleSound, setSimpleMode } = useBookStore();

  // Définition canonique des planches (Spreads) selon l'art de la reliure traditionnelle :
  // Spread 0 : Couverture fermée (Page 0)
  // Spread 1 : Pages de garde avant (101: Contreplat avant vierge / 102: Feuille de respect volante vierge)
  // Spread 2 : Pages liminaires (1: Frontispice / 2: Sommaire)
  // Spread 3 : Chapitre I — À propos (Pages 3 & 4)
  // Spread 4 : Chapitre II — Compétences (Pages 5 & 6)
  // Spread 5 : Chapitre III — Projets 1 & 2 (Pages 7 & 8)
  // Spread 6 : Chapitre III — Projets 3 & 4 (Pages 9 & 10)
  // Spread 7 : Chapitre III — Projets 5 & 6 (Pages 11 & 12)
  // Spread 8 : Chapitre IV — Expériences 1 & 2 (Pages 13 & 14)
  // Spread 9 : Chapitre IV — Expériences 3 & 4 (Pages 15 & 16)
  // Spread 10: Chapitre V — Contact & Épilogue (Pages 17 & 18)
  // Spread 11: Pages de garde arrière (103: Feuille de respect arrière vierge / 104: Contreplat arrière vierge)
  // Spread 12: Dos fermé du livre (20: 4e de couverture extérieure)
  const SPREADS: { left: number | null; right: number | null }[] = [
    { left: null, right: 0 },    // Spread 0 : Couverture avant fermée
    { left: 101,  right: 102 },  // Spread 1 : Pages de garde vierges (Contreplat & Respect)
    { left: 1,    right: 2 },    // Spread 2 : Frontispice & Sommaire
    { left: 3,    right: 4 },    // Spread 3 : Chapitre I (Pages 3 & 4)
    { left: 5,    right: 6 },    // Spread 4 : Chapitre II (Pages 5 & 6)
    { left: 7,    right: 8 },    // Spread 5 : Chapitre III (Pages 7 & 8)
    { left: 9,    right: 10 },   // Spread 6 : Chapitre III (Pages 9 & 10)
    { left: 11,   right: 12 },   // Spread 7 : Chapitre III (Pages 11 & 12)
    { left: 13,   right: 14 },   // Spread 8 : Chapitre IV (Pages 13 & 14)
    { left: 15,   right: 16 },   // Spread 9 : Chapitre IV (Pages 15 & 16)
    { left: 17,   right: 18 },   // Spread 10: Chapitre V (Pages 17 & 18)
    { left: 103,  right: 104 },  // Spread 11: Pages de garde arrière vierges
    { left: 20,   right: null }, // Spread 12: Dos fermé du livre
  ];

  const [currentSpread, setCurrentSpread] = useState(0);
  const [targetSpread, setTargetSpread] = useState<number | null>(null);
  const [flipDirection, setFlipDirection] = useState<'forward' | 'backward'>('forward');
  const [isFlipping, setIsFlipping] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Moteur physique tactile direct (Drag-to-Hold en temps réel)
  const [isDragging, setIsDragging] = useState(false);
  const [dragProgress, setDragProgress] = useState<number | null>(null);

  // Formulaire de contact
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactData, setContactData] = useState({ name: '', email: '', message: '' });

  const totalSpreads = SPREADS.length;
  const flipTimerRef = useRef<NodeJS.Timeout | null>(null);
  const bookContainerRef = useRef<HTMLDivElement | null>(null);

  // Références d'interaction physique
  const pointerStartX = useRef<number | null>(null);
  const pointerStartY = useRef<number | null>(null);
  const pointerStartTime = useRef<number>(0);
  const pointerIdRef = useRef<number | null>(null);
  const hasMovedRef = useRef<boolean>(false);
  const dragDirectionRef = useRef<'forward' | 'backward' | null>(null);
  const dragTargetSpreadRef = useRef<number | null>(null);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Déclencheur automatique de tournage (Boutons / Clavier - 620ms ultra-fluide)
  const turnToSpread = useCallback((newSpread: number) => {
    if (isFlipping || isDragging || newSpread === currentSpread) return;
    const bounded = Math.max(0, Math.min(totalSpreads - 1, newSpread));
    const direction = bounded > currentSpread ? 'forward' : 'backward';

    setIsFlipping(true);
    setFlipDirection(direction);
    setTargetSpread(bounded);
    setDragProgress(null);

    if (soundEnabled) {
      playPaperFlipSound();
    }

    if (flipTimerRef.current) clearTimeout(flipTimerRef.current);
    flipTimerRef.current = setTimeout(() => {
      setCurrentSpread(bounded);
      setTargetSpread(null);
      setIsFlipping(false);
    }, 620);
  }, [isFlipping, isDragging, currentSpread, soundEnabled, totalSpreads]);

  const next = useCallback(() => {
    turnToSpread(currentSpread + 1);
  }, [turnToSpread, currentSpread]);

  const prev = useCallback(() => {
    turnToSpread(currentSpread - 1);
  }, [turnToSpread, currentSpread]);

  // =========================================================================
  // MOTEUR PHYSIQUE POINTER DIRECT (Tactile au doigt & Souris en direct)
  // L'utilisateur peut pousser la feuille à 50% et la garder à mi-course !
  // =========================================================================

  const handlePointerDown = (e: React.PointerEvent) => {
    if (isFlipping || isDragging) return;
    const target = e.target as HTMLElement;
    // Ne pas intercepter les clics sur les contrôles interactifs
    if (target.closest('button') || target.closest('a') || target.closest('input') || target.closest('textarea')) {
      return;
    }

    const rect = bookContainerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const clientX = e.clientX;
    const relX = clientX - rect.left;
    const bookWidth = rect.width;
    const isRightHalf = isMobile ? true : relX > bookWidth / 2;

    // Déterminer la direction de glissement possible
    if (currentSpread === 0) {
      if (!isRightHalf) return; // Seule la couverture fermée (moitié droite du container) peut être saisie
      dragDirectionRef.current = 'forward';
      dragTargetSpreadRef.current = 1;
    } else if (currentSpread === totalSpreads - 1) {
      if (isRightHalf) return; // Seul le dos fermé (moitié gauche du container) peut être saisi
      dragDirectionRef.current = 'backward';
      dragTargetSpreadRef.current = currentSpread - 1;
    } else if (isRightHalf) {
      if (currentSpread >= totalSpreads - 1) return;
      dragDirectionRef.current = 'forward';
      dragTargetSpreadRef.current = currentSpread + 1;
    } else {
      if (currentSpread <= 0) return;
      dragDirectionRef.current = 'backward';
      dragTargetSpreadRef.current = currentSpread - 1;
    }

    pointerStartX.current = clientX;
    pointerStartY.current = e.clientY;
    pointerStartTime.current = Date.now();
    pointerIdRef.current = e.pointerId;
    hasMovedRef.current = false;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (pointerStartX.current === null || isFlipping) return;

    const deltaX = e.clientX - pointerStartX.current;
    const deltaY = e.clientY - (pointerStartY.current || e.clientY);

    // Détection initiale de l'intention de drag
    if (!hasMovedRef.current) {
      if (Math.hypot(deltaX, deltaY) > 6) {
        if (Math.abs(deltaX) > Math.abs(deltaY) * 0.75) {
          hasMovedRef.current = true;
          setIsDragging(true);
          setFlipDirection(dragDirectionRef.current || 'forward');
          setTargetSpread(dragTargetSpreadRef.current);

          if (pointerIdRef.current !== null && e.currentTarget.setPointerCapture) {
            try {
              e.currentTarget.setPointerCapture(pointerIdRef.current);
            } catch {
              // Silencieux
            }
          }

          if (soundEnabled) {
            playPaperFlipSound();
          }
        } else {
          return;
        }
      } else {
        return;
      }
    }

    // Calcul de la distance de tirage
    const rect = bookContainerRef.current?.getBoundingClientRect();
    const halfWidth = rect ? (isMobile ? rect.width : rect.width / 2) : window.innerWidth / 2;

    let pull = 0;
    if (dragDirectionRef.current === 'forward') {
      pull = -deltaX; // De droite à gauche
    } else {
      pull = deltaX;  // De gauche à droite
    }

    // Progression exacte au doigt (si l'utilisateur s'arrête à 50%, progress = 0.50)
    const rawProgress = pull / Math.max(100, halfWidth);
    const progress = Math.max(0, Math.min(1, rawProgress));

    setDragProgress(progress);
  };

  const handlePointerEnd = (e: React.PointerEvent) => {
    if (pointerIdRef.current !== null && e.currentTarget.releasePointerCapture) {
      try {
        e.currentTarget.releasePointerCapture(pointerIdRef.current);
      } catch {
        // Silencieux
      }
    }

    if (!hasMovedRef.current || pointerStartX.current === null) {
      pointerStartX.current = null;
      pointerStartY.current = null;
      pointerIdRef.current = null;
      hasMovedRef.current = false;
      return;
    }

    const currentP = dragProgress ?? 0;
    const elapsed = Math.max(1, Date.now() - pointerStartTime.current);
    const deltaX = e.clientX - pointerStartX.current;
    const velocity = Math.abs(deltaX) / elapsed; // px/ms

    // Décision physique :
    // Poussé à plus de la moitié (0.50) OU pichenette rapide vers l'avant (> 0.35 px/ms avec déplacement > 20px)
    const shouldFlip = currentP > 0.50 || (velocity > 0.35 && currentP > 0.15);

    const startVal = currentP;
    const targetVal = shouldFlip ? 1.0 : 0.0;
    const targetSpreadToCommit = dragTargetSpreadRef.current;

    // Animation fluide de finalisation ou de retour élastique (Spring / Release interpolate)
    const animStartTime = performance.now();
    const animDuration = Math.max(180, Math.min(360, Math.abs(targetVal - startVal) * 360));

    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

    const animateRelease = (now: number) => {
      const timeProgress = Math.min(1, (now - animStartTime) / animDuration);
      // Courbe ease-out quintique soyeuse avec stabilisation naturelle
      const ease = 1 - Math.pow(1 - timeProgress, 4);
      const interpolated = startVal + (targetVal - startVal) * ease;

      setDragProgress(interpolated);

      if (timeProgress < 1) {
        animFrameRef.current = requestAnimationFrame(animateRelease);
      } else {
        if (shouldFlip && targetSpreadToCommit !== null) {
          setCurrentSpread(targetSpreadToCommit);
        }
        setIsDragging(false);
        setDragProgress(null);
        setTargetSpread(null);
        dragDirectionRef.current = null;
        dragTargetSpreadRef.current = null;
        animFrameRef.current = null;
      }
    };

    animFrameRef.current = requestAnimationFrame(animateRelease);

    pointerStartX.current = null;
    pointerStartY.current = null;
    pointerIdRef.current = null;
    hasMovedRef.current = false;
  };

  // Nettoyage de l'animation lors du démontage
  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (flipTimerRef.current) clearTimeout(flipTimerRef.current);
    };
  }, []);

  // Raccourcis clavier
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        next();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        prev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [next, prev]);

  // Gestion formulaire contact
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`[The Book of Adnane] Contact de ${contactData.name}`);
    const body = encodeURIComponent(`${contactData.message}\n\nDe : ${contactData.name} (${contactData.email})`);
    window.location.href = `mailto:${BOOK_DATA.contact.coordinates.email}?subject=${subject}&body=${body}`;
    setContactSubmitted(true);
  };

  const chapterToSpread = (chapterId: string) => {
    switch (chapterId) {
      case 'cover': return 0;
      case 'endpapers': return 1;
      case 'title': return 2;
      case 'toc': return 2;
      case 'about': return 3;
      case 'skills': return 4;
      case 'projects': return 5;
      case 'experience': return 8;
      case 'contact': return 10;
      case 'back-cover': return 12;
      default: return 2;
    }
  };

  // Rendu de N'IMPORTE QUELLE PAGE individuelle (0 à 20 ou null si aucune page)
  const renderSinglePage = (pageNum: number | null) => {
    if (pageNum === null) {
      return null;
    }

    switch (pageNum) {
      case 0:
        // COUVERTURE AVANT
        return (
          <div className="w-full h-full p-8 sm:p-12 flex flex-col justify-between items-center text-center relative bg-gradient-to-br from-[#FBF6EC] via-[#F5EFE0] to-[#EBE2D0] select-none">
            {/* Liserés dorés et motifs */}
            <div className="absolute inset-3 border-2 border-[var(--gold)]/40 rounded-sm pointer-events-none" />
            <div className="absolute inset-4 border border-[var(--gold)]/20 rounded-sm pointer-events-none" />
            <div className="absolute top-5 left-5 text-[var(--gold)]/50 text-xs">❦</div>
            <div className="absolute top-5 right-5 text-[var(--gold)]/50 text-xs">❦</div>
            <div className="absolute bottom-5 left-5 text-[var(--gold)]/50 text-xs">❦</div>
            <div className="absolute bottom-5 right-5 text-[var(--gold)]/50 text-xs">❦</div>

            <div className="space-y-1.5 z-10 pt-2">
              <span className="inline-block px-3 py-1 rounded-full border border-[var(--border-gold)] bg-[var(--gold)]/10 text-[var(--gold)] font-sans-ui text-[10px] tracking-widest uppercase font-bold">
                {BOOK_DATA.cover.edition} · {BOOK_DATA.cover.year}
              </span>
              <p className="font-editorial text-xs tracking-widest uppercase text-[var(--ink-soft)] mt-1">
                {BOOK_DATA.cover.author}
              </p>
            </div>

            <div className="space-y-4 z-10 my-auto">
              <div className="w-16 h-16 mx-auto rounded-full border-2 border-[var(--gold)] bg-gradient-to-b from-[var(--gold)]/15 to-transparent flex items-center justify-center text-[var(--gold)] font-editorial text-3xl font-bold shadow-xs">
                A
              </div>
              <h2 className="font-editorial text-4xl sm:text-5xl font-black tracking-tight text-[var(--ink)] uppercase leading-[1.08]">
                THE BOOK OF<br />
                <span className="text-[var(--gold)]">ADNANE</span>
              </h2>
              <div className="w-24 h-[1.5px] bg-[var(--gold)] mx-auto opacity-70" />
              <p className="font-editorial italic text-sm sm:text-base text-[var(--ink-soft)] max-w-[320px] mx-auto leading-relaxed">
                {BOOK_DATA.cover.subtitle}
              </p>
            </div>

            <div className="w-full space-y-2 z-10 pb-2">
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="w-full max-w-[240px] mx-auto py-3.5 px-6 rounded bg-[var(--gold)] hover:bg-[var(--gold-light)] text-[var(--paper)] font-sans-ui text-xs font-bold tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer group"
              >
                <BookOpen size={16} className="transition-transform group-hover:scale-110" />
                <span>Ouvrir l&apos;ouvrage</span>
              </button>
              <p className="font-sans-ui text-[10px] text-[var(--ink-soft)]">
                Cliquez pour ouvrir le livre
              </p>
            </div>
          </div>
        );

      case 101:
        // CONTREPLAT AVANT (2e de couverture, intérieur cartonné avant)
        return (
          <div className="w-full h-full p-8 sm:p-12 flex flex-col justify-between items-center text-center relative bg-[#F9F4E8] select-none">
            <div className="absolute inset-4 border border-[var(--gold)]/20 rounded-sm pointer-events-none" />
            <div className="absolute top-6 left-6 text-[var(--gold)]/30 text-xs">❦</div>
            <div className="absolute top-6 right-6 text-[var(--gold)]/30 text-xs">❦</div>
            <div className="absolute bottom-6 left-6 text-[var(--gold)]/30 text-xs">❦</div>
            <div className="absolute bottom-6 right-6 text-[var(--gold)]/30 text-xs">❦</div>
            <div className="my-auto space-y-3 opacity-60">
              <div className="w-12 h-12 mx-auto rounded-full border border-[var(--gold)]/40 flex items-center justify-center text-[var(--gold)] font-editorial text-lg shadow-2xs">
                A
              </div>
              <p className="font-editorial text-[11px] tracking-widest uppercase text-[var(--ink-soft)]">
                Ex Libris · Adnane SIDI-AMADOU
              </p>
              <div className="w-10 h-[1px] bg-[var(--gold)]/40 mx-auto" />
            </div>
            <div className="text-[10px] font-sans-ui text-[var(--ink-soft)]/50 tracking-wider uppercase">
              Contreplat de garde
            </div>
          </div>
        );

      case 102:
        // FEUILLE DE RESPECT VOLANTE AVANT (1re page de garde libre, vierge)
        return (
          <div className="w-full h-full p-8 sm:p-12 flex flex-col justify-between items-end relative bg-[#FAF5EA] select-none">
            <div className="w-full text-right text-[10px] font-sans-ui text-[var(--ink-soft)]/40 uppercase tracking-widest">
              Feuille de respect
            </div>
            <div className="my-auto w-full text-center">
              <span className="text-[var(--gold)]/30 font-editorial text-xl">❦</span>
            </div>
            <div 
              onClick={next}
              className="inline-flex items-center gap-1.5 font-sans-ui text-xs font-medium text-[var(--gold)] hover:text-[var(--gold-light)] cursor-pointer group transition-colors"
            >
              <span>Tourner la page</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>
        );

      case 103:
        // FEUILLE DE RESPECT VOLANTE ARRIÈRE (Dernière page de garde libre, vierge)
        return (
          <div className="w-full h-full p-8 sm:p-12 flex flex-col justify-between items-start relative bg-[#FAF5EA] select-none">
            <div className="w-full text-left text-[10px] font-sans-ui text-[var(--ink-soft)]/40 uppercase tracking-widest">
              Feuille de respect
            </div>
            <div className="my-auto w-full text-center">
              <span className="text-[var(--gold)]/30 font-editorial text-xl">❦</span>
            </div>
            <div 
              onClick={prev}
              className="inline-flex items-center gap-1.5 font-sans-ui text-xs font-medium text-[var(--gold)] hover:text-[var(--gold-light)] cursor-pointer group transition-colors"
            >
              <span className="group-hover:-translate-x-1 transition-transform">←</span>
              <span>Page précédente</span>
            </div>
          </div>
        );

      case 104:
        // CONTREPLAT ARRIÈRE (3e de couverture, intérieur cartonné arrière)
        return (
          <div className="w-full h-full p-8 sm:p-12 flex flex-col justify-between items-center text-center relative bg-[#F9F4E8] select-none">
            <div className="absolute inset-4 border border-[var(--gold)]/20 rounded-sm pointer-events-none" />
            <div className="absolute top-6 left-6 text-[var(--gold)]/30 text-xs">❦</div>
            <div className="absolute top-6 right-6 text-[var(--gold)]/30 text-xs">❦</div>
            <div className="absolute bottom-6 left-6 text-[var(--gold)]/30 text-xs">❦</div>
            <div className="absolute bottom-6 right-6 text-[var(--gold)]/30 text-xs">❦</div>
            <div className="my-auto space-y-3 opacity-60">
              <div className="w-12 h-12 mx-auto rounded-full border border-[var(--gold)]/40 flex items-center justify-center text-[var(--gold)] font-editorial text-lg shadow-2xs">
                ❦
              </div>
              <p className="font-editorial text-[11px] tracking-widest uppercase text-[var(--ink-soft)]">
                Fin de la reliure
              </p>
              <div className="w-10 h-[1px] bg-[var(--gold)]/40 mx-auto" />
            </div>
            <div className="text-[10px] font-sans-ui text-[var(--ink-soft)]/50 tracking-wider uppercase">
              Contreplat final
            </div>
          </div>
        );

      case 1:
        // FRONTISPICE
        return (
          <div className="w-full h-full flex flex-col justify-between p-7 sm:p-11 text-[var(--ink)] bg-[#FAF5EA]">
            <div className="flex justify-between items-center text-[10px] font-sans-ui text-[var(--ink-soft)] uppercase tracking-widest border-b border-[var(--border)] pb-3">
              <span>The Book of Adnane</span>
              <span>Frontispice</span>
            </div>
            <div className="my-auto space-y-6 max-w-sm mx-auto text-center">
              <span className="text-[var(--gold)] font-editorial text-2xl">§</span>
              <blockquote className="font-editorial italic text-lg sm:text-2xl leading-relaxed text-[var(--ink)]">
                &ldquo;{BOOK_DATA.titlePage.quote}&rdquo;
              </blockquote>
              <div className="w-14 h-[1.5px] bg-[var(--gold)] mx-auto opacity-70" />
              <div className="space-y-1">
                <p className="font-editorial font-bold text-base text-[var(--ink)]">
                  {BOOK_DATA.titlePage.author}
                </p>
                <p className="font-sans-ui text-xs text-[var(--ink-soft)]">
                  {BOOK_DATA.titlePage.role}
                </p>
                <p className="font-sans-ui text-xs text-[var(--gold)] font-medium">
                  {BOOK_DATA.titlePage.location}
                </p>
              </div>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-[var(--border)] text-[11px] font-sans-ui text-[var(--ink-soft)]">
              <span>The Book of Adnane</span>
              <span>Frontispice</span>
            </div>
          </div>
        );

      case 2:
        // SOMMAIRE
        return (
          <div className="w-full h-full flex flex-col justify-between p-7 sm:p-11 text-[var(--ink)] bg-[#FAF5EA]">
            <div className="flex justify-between items-center text-[10px] font-sans-ui text-[var(--ink-soft)] uppercase tracking-widest border-b border-[var(--border)] pb-3">
              <span>Sommaire</span>
              <span>Table des Matières</span>
            </div>
            <div className="my-auto space-y-5 max-w-sm mx-auto w-full">
              <div className="text-center space-y-1 mb-4">
                <h3 className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight text-[var(--ink)]">
                  {BOOK_DATA.toc.title}
                </h3>
                <p className="font-editorial italic text-xs text-[var(--ink-soft)]">
                  {BOOK_DATA.toc.subtitle}
                </p>
              </div>
              <ul className="space-y-3 font-body">
                {BOOK_DATA.toc.chapters.map((chap) => (
                  <li key={chap.id}>
                    <button
                      onClick={(e) => { e.stopPropagation(); turnToSpread(chapterToSpread(chap.id)); }}
                      className="w-full flex items-baseline justify-between group text-left cursor-pointer hover:text-[var(--gold)] transition-colors py-0.5"
                    >
                      <div className="flex items-baseline gap-2">
                        <span className="font-editorial font-bold text-xs text-[var(--gold)] w-6">
                          {chap.num}.
                        </span>
                        <span className="font-editorial font-medium text-sm sm:text-base text-[var(--ink)] group-hover:text-[var(--gold)] transition-colors">
                          {chap.title}
                        </span>
                      </div>
                      <div className="flex-1 border-b border-dotted border-[var(--ink-soft)]/40 mx-2 mb-1 group-hover:border-[var(--gold)]" />
                      <span className="font-sans-ui text-xs font-bold text-[var(--ink-soft)] group-hover:text-[var(--gold)]">
                        {chap.page}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-[var(--border)] text-[11px] font-sans-ui text-[var(--ink-soft)]">
              <span>The Book of Adnane</span>
              <span className="text-[var(--gold)]">Sommaire</span>
            </div>
          </div>
        );

      case 3:
        // CHAPITRE I : D'OÙ JE VIENS
        return (
          <div className="w-full h-full flex flex-col justify-between p-7 sm:p-11 text-[var(--ink)] bg-[#FAF5EA]">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[10px] font-sans-ui text-[var(--gold)] uppercase tracking-widest font-bold">
                <span>{BOOK_DATA.about.chapterNumber}</span>
                <span className="w-5 h-[1px] bg-[var(--gold)]" />
                <span>Genèse</span>
              </div>
              <h3 className="font-editorial text-2xl sm:text-4xl font-bold tracking-tight text-[var(--ink)]">
                {BOOK_DATA.about.title}
              </h3>
              <p className="font-editorial italic text-xs sm:text-sm text-[var(--ink-soft)]">
                {BOOK_DATA.about.subtitle}
              </p>
              <div className="space-y-3.5 pt-2 text-xs sm:text-sm leading-relaxed text-[var(--ink)]/90 font-body">
                {BOOK_DATA.about.paragraphs.map((p, idx) => (
                  <p key={idx} className={idx === 0 ? "drop-cap" : ""}>
                    {p}
                  </p>
                ))}
              </div>
            </div>
            <div className="pt-3 border-t border-[var(--border)] text-[11px] font-sans-ui text-[var(--ink-soft)] flex justify-between">
              <span>The Book of Adnane</span>
              <span>Page 3</span>
            </div>
          </div>
        );

      case 4:
        // CHAPITRE I : PHILOSOPHIE & STATS
        return (
          <div className="w-full h-full flex flex-col justify-between p-7 sm:p-11 text-[var(--ink)] bg-[#FAF5EA]">
            <div className="space-y-4">
              <div className="text-[10px] font-sans-ui text-[var(--gold)] uppercase tracking-widest font-bold">
                Principes Directeurs
              </div>
              <div className="p-4 rounded border-l-3 border-[var(--gold)] bg-[var(--paper-shade)]/60 space-y-2">
                <span className="font-sans-ui text-[10px] text-[var(--gold)] uppercase font-bold tracking-wider block">
                  En marge
                </span>
                <blockquote className="font-editorial italic text-sm sm:text-base text-[var(--ink)] leading-snug">
                  &ldquo;{BOOK_DATA.about.marginalia.quote}&rdquo;
                </blockquote>
                <p className="font-sans-ui text-xs text-[var(--ink-soft)]">
                  {BOOK_DATA.about.marginalia.note}
                </p>
              </div>
              <div className="space-y-2 pt-2">
                <span className="font-sans-ui text-[10px] text-[var(--ink-soft)] uppercase tracking-wider block font-bold">
                  Repères Chiffrés
                </span>
                <div className="grid grid-cols-2 gap-3">
                  {BOOK_DATA.about.stats.map((stat, i) => (
                    <div key={i} className="p-3.5 border border-[var(--border)] rounded bg-[var(--paper)]">
                      <div className="font-editorial text-2xl font-bold text-[var(--gold)]">
                        {stat.value}
                      </div>
                      <div className="font-sans-ui text-[10px] text-[var(--ink-soft)] mt-0.5">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="pt-3 border-t border-[var(--border)] text-[11px] font-sans-ui text-[var(--ink-soft)] flex justify-between">
              <span>I — À propos</span>
              <span>Page 4</span>
            </div>
          </div>
        );

      case 5:
        // CHAPITRE II : MON ARSENAL (BACKEND)
        return (
          <div className="w-full h-full flex flex-col justify-between p-7 sm:p-11 text-[var(--ink)] bg-[#FAF5EA]">
            <div className="space-y-3.5">
              <div className="flex items-center gap-2 text-[10px] font-sans-ui text-[var(--gold)] uppercase tracking-widest font-bold">
                <span>{BOOK_DATA.skills.chapterNumber}</span>
                <span className="w-5 h-[1px] bg-[var(--gold)]" />
                <span>L&apos;Arsenal</span>
              </div>
              <h3 className="font-editorial text-2xl sm:text-4xl font-bold tracking-tight text-[var(--ink)]">
                {BOOK_DATA.skills.title}
              </h3>
              <p className="font-editorial italic text-xs text-[var(--ink-soft)]">
                {BOOK_DATA.skills.subtitle}
              </p>
              <div className="space-y-3 pt-1">
                {BOOK_DATA.skills.shelves.slice(0, 2).map((shelf, idx) => (
                  <div key={idx} className="p-3.5 border border-[var(--border)] rounded bg-[var(--paper-shade)]/50 space-y-2">
                    <h4 className="font-editorial text-sm sm:text-base font-bold text-[var(--ink)]">
                      {shelf.category}
                    </h4>
                    <p className="font-sans-ui text-[11px] text-[var(--ink-soft)]">
                      {shelf.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {shelf.tools.map((tool, tIdx) => (
                        <span
                          key={tIdx}
                          className={`font-sans-ui text-[11px] px-2 py-0.5 rounded border ${
                            tool.level === 'expert'
                              ? 'border-[var(--gold)] bg-[var(--gold)]/10 text-[var(--ink)] font-bold'
                              : 'border-[var(--border)] bg-[var(--paper)] text-[var(--ink-soft)]'
                          }`}
                        >
                          {tool.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-3 border-t border-[var(--border)] text-[11px] font-sans-ui text-[var(--ink-soft)] flex justify-between">
              <span>The Book of Adnane</span>
              <span>Page 5</span>
            </div>
          </div>
        );

      case 6:
        // CHAPITRE II : MON ARSENAL (FRONTEND, DB, IA)
        return (
          <div className="w-full h-full flex flex-col justify-between p-7 sm:p-11 text-[var(--ink)] bg-[#FAF5EA]">
            <div className="space-y-3.5">
              <div className="text-[10px] font-sans-ui text-[var(--gold)] uppercase tracking-widest font-bold">
                Persistance, Déploiement & IA
              </div>
              <div className="space-y-3">
                {BOOK_DATA.skills.shelves.slice(2).map((shelf, idx) => (
                  <div key={idx} className="p-3 border border-[var(--border)] rounded bg-[var(--paper-shade)]/50 space-y-1.5">
                    <h4 className="font-editorial text-xs sm:text-sm font-bold text-[var(--ink)]">
                      {shelf.category}
                    </h4>
                    <p className="font-sans-ui text-[10px] text-[var(--ink-soft)] leading-snug">
                      {shelf.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {shelf.tools.map((tool, tIdx) => (
                        <span
                          key={tIdx}
                          className={`font-sans-ui text-[10px] px-2 py-0.5 rounded border ${
                            tool.level === 'expert'
                              ? 'border-[var(--gold)] bg-[var(--gold)]/10 text-[var(--ink)] font-bold'
                              : 'border-[var(--border)] bg-[var(--paper)] text-[var(--ink-soft)]'
                          }`}
                        >
                          {tool.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-3 border-t border-[var(--border)] text-[11px] font-sans-ui text-[var(--ink-soft)] flex justify-between">
              <span>II — Compétences</span>
              <span>Page 6</span>
            </div>
          </div>
        );

      case 7:
        // PROJET 1 : SENTINEL-MACRO
        return renderProjectPage(BOOK_DATA.projects.items[0], 7);
      case 8:
        // PROJET 2 : MISHKI
        return renderProjectPage(BOOK_DATA.projects.items[1], 8);
      case 9:
        // PROJET 3 : CALIXT
        return renderProjectPage(BOOK_DATA.projects.items[2], 9);
      case 10:
        // PROJET 4 : SELEOGERAUBENIN
        return renderProjectPage(BOOK_DATA.projects.items[3], 10);
      case 11:
        // PROJET 5 : BUSINESSPLAN IA
        return renderProjectPage(BOOK_DATA.projects.items[4], 11);
      case 12:
        // PROJET 6 : CKDCARE
        return renderProjectPage(BOOK_DATA.projects.items[5], 12);

      case 13:
        // EXPÉRIENCE 1 : ZEROINVESTISSEMENT
        return renderExperiencePage(BOOK_DATA.experience.timeline[0], 13);
      case 14:
        // EXPÉRIENCE 2 : FREELANCE
        return renderExperiencePage(BOOK_DATA.experience.timeline[1], 14);
      case 15:
        // EXPÉRIENCE 3 : SELEOGERAUBENIN & DIHA'S
        return renderExperiencePage(BOOK_DATA.experience.timeline[2], 15);

      case 16:
        // FORMATION IFRI & POSTURE TECH LEAD
        return (
          <div className="w-full h-full flex flex-col justify-between p-7 sm:p-11 text-[var(--ink)] bg-[#FAF5EA]">
            <div className="space-y-4">
              <div className="text-[10px] font-sans-ui text-[var(--gold)] uppercase tracking-widest font-bold">
                Formation Académique & Méthodologie
              </div>
              <div className="p-4 border-l-3 border-[var(--gold)] bg-[var(--paper-shade)]/60 space-y-1.5">
                <h4 className="font-editorial text-base font-bold text-[var(--ink)]">
                  Diplôme en Génie Logiciel
                </h4>
                <p className="font-sans-ui text-xs text-[var(--gold)] font-medium">
                  IFRI · Université d&apos;Abomey-Calavi (Bénin)
                </p>
                <p className="text-xs text-[var(--ink)]/90 leading-relaxed pt-1">
                  Formation intensive en conception logicielle distribuée, sécurité applicative et modélisation de bases relationnelles à haute disponibilité.
                </p>
              </div>
              <div className="p-4 border border-[var(--border)] rounded bg-[var(--paper)] space-y-2 text-xs">
                <strong className="block font-sans-ui text-[10px] uppercase text-[var(--ink-soft)] tracking-wider">
                  Posture de Tech Lead :
                </strong>
                <ul className="space-y-1 font-sans-ui text-[11px] text-[var(--ink)] list-disc list-inside">
                  <li>Revues de code quotidiennes et structurantes</li>
                  <li>Architecture documentée et maintenable dès le jour 1</li>
                  <li>Communication claire avec les équipes et clients</li>
                </ul>
              </div>
            </div>
            <div className="pt-3 border-t border-[var(--border)] text-[11px] font-sans-ui text-[var(--ink-soft)] flex justify-between">
              <span>IV — Expérience</span>
              <span>Page 16</span>
            </div>
          </div>
        );

      case 17:
        // CHAPITRE V : CONTACT CORRESPONDANCE
        return (
          <div className="w-full h-full flex flex-col justify-between p-6 sm:p-10 text-[var(--ink)] bg-[#FAF5EA] overflow-y-auto">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[10px] font-sans-ui text-[var(--gold)] uppercase tracking-widest font-bold">
                <span>{BOOK_DATA.contact.chapterNumber}</span>
                <span className="w-4 h-[1px] bg-[var(--gold)]" />
                <span>Correspondance</span>
              </div>
              <h3 className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight text-[var(--ink)]">
                {BOOK_DATA.contact.title}
              </h3>
              <p className="font-editorial italic text-xs text-[var(--ink-soft)]">
                {BOOK_DATA.contact.subtitle}
              </p>
            </div>

            <div className="my-auto py-2">
              <div className="p-4 sm:p-5 rounded border border-[var(--border-gold)] bg-[var(--paper-shade)]/60 relative">
                <div className="flex justify-between items-start border-b border-[var(--border)] pb-2.5 mb-2.5">
                  <div>
                    <span className="font-sans-ui text-[8px] font-bold text-[var(--gold)] tracking-widest uppercase block">
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

                {contactSubmitted ? (
                  <div className="py-5 text-center space-y-2">
                    <CheckCircle2 size={28} className="mx-auto text-[var(--sage)]" />
                    <p className="font-editorial font-bold text-sm text-[var(--ink)]">
                      Votre missive a été préparée avec succès !
                    </p>
                    <p className="font-sans-ui text-xs text-[var(--ink-soft)]">
                      Votre messagerie par défaut va s&apos;ouvrir. Je vous réponds sous 24h.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-2.5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        required
                        placeholder="Votre nom ou société"
                        value={contactData.name}
                        onChange={e => setContactData({ ...contactData, name: e.target.value })}
                        className="w-full text-xs font-sans-ui px-2.5 py-1.5 rounded bg-[var(--paper)] border border-[var(--border)] focus:border-[var(--gold)] outline-none"
                      />
                      <input
                        type="email"
                        required
                        placeholder="Votre email"
                        value={contactData.email}
                        onChange={e => setContactData({ ...contactData, email: e.target.value })}
                        className="w-full text-xs font-sans-ui px-2.5 py-1.5 rounded bg-[var(--paper)] border border-[var(--border)] focus:border-[var(--gold)] outline-none"
                      />
                    </div>
                    <textarea
                      required
                      rows={3}
                      placeholder="Votre message, opportunité ou projet..."
                      value={contactData.message}
                      onChange={e => setContactData({ ...contactData, message: e.target.value })}
                      className="w-full text-xs font-sans-ui p-2.5 rounded bg-[var(--paper)] border border-[var(--border)] focus:border-[var(--gold)] outline-none resize-none"
                    />
                    <div className="flex items-center justify-between pt-1">
                      <a
                        href={`mailto:${BOOK_DATA.contact.coordinates.email}`}
                        className="text-[11px] font-sans-ui text-[var(--gold)] hover:underline flex items-center gap-1"
                      >
                        <Mail size={12} /> Ou par mail direct
                      </a>
                      <button
                        type="submit"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-[var(--gold)] hover:bg-[var(--gold-light)] text-[var(--paper)] font-sans-ui text-xs font-bold shadow-xs cursor-pointer transition-colors"
                      >
                        <Send size={12} /> Envoyer la missive
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-[var(--border)] text-[11px] font-sans-ui text-[var(--ink-soft)] flex justify-between">
              <span>The Book of Adnane</span>
              <span>Page 17</span>
            </div>
          </div>
        );

      case 18:
        // 4ÈME DE COUVERTURE (BACK COVER)
        return (
          <div className="w-full h-full p-7 sm:p-11 flex flex-col justify-between items-center text-center relative bg-gradient-to-br from-[#FAF5EA] via-[#F5EFE0] to-[#EBE2D0] select-none">
            <div className="absolute inset-3 border-2 border-[var(--gold)]/40 rounded-sm pointer-events-none" />
            <div className="absolute inset-4 border border-[var(--gold)]/20 rounded-sm pointer-events-none" />

            <div className="space-y-1 z-10 pt-2">
              <span className="font-sans-ui text-[10px] tracking-widest uppercase text-[var(--gold)] font-bold">
                Quatrième de Couverture
              </span>
              <h3 className="font-editorial text-xl font-bold text-[var(--ink)]">
                {BOOK_DATA.backCover.title}
              </h3>
            </div>

            <div className="my-auto space-y-5 max-w-sm mx-auto z-10">
              <div className="w-10 h-[1.5px] bg-[var(--gold)] mx-auto opacity-70" />
              <p className="font-editorial italic text-xs sm:text-sm text-[var(--ink)]/90 leading-relaxed">
                &ldquo;{BOOK_DATA.backCover.blurb}&rdquo;
              </p>
              <p className="font-editorial font-bold text-sm text-[var(--gold)]">
                {BOOK_DATA.backCover.closing}
              </p>
              <div className="flex justify-center gap-3 pt-2">
                <a
                  href={BOOK_DATA.contact.coordinates.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-[var(--border)] hover:border-[var(--gold)] font-sans-ui text-xs text-[var(--ink)] transition-colors"
                >
                  <Github size={13} /> GitHub
                </a>
                <a
                  href={`mailto:${BOOK_DATA.contact.coordinates.email}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-[var(--border)] hover:border-[var(--gold)] font-sans-ui text-xs text-[var(--ink)] transition-colors"
                >
                  <Mail size={13} /> Email
                </a>
              </div>
            </div>

            <div className="space-y-2 pt-3 border-t border-[var(--border)] text-[11px] font-sans-ui text-[var(--ink-soft)] z-10">
              <button
                onClick={(e) => { e.stopPropagation(); turnToSpread(0); }}
                className="inline-flex items-center gap-1 text-[11px] text-[var(--gold)] hover:underline cursor-pointer"
              >
                <RotateCcw size={12} /> Refermer le livre
              </button>
              <p className="text-[10px]">{BOOK_DATA.backCover.copyright}</p>
            </div>
          </div>
        );

      case 20:
        // DOS EXTÉRIEUR FERMÉ DU LIVRE (4e DE COUVERTURE EXTÉRIEURE)
        return (
          <div className="w-full h-full p-8 sm:p-12 flex flex-col justify-between items-center text-center relative bg-gradient-to-bl from-[#FBF6EC] via-[#F5EFE0] to-[#EBE2D0] select-none">
            {/* Liserés dorés et motifs */}
            <div className="absolute inset-3 border-2 border-[var(--gold)]/40 rounded-sm pointer-events-none" />
            <div className="absolute inset-4 border border-[var(--gold)]/20 rounded-sm pointer-events-none" />
            <div className="absolute top-5 left-5 text-[var(--gold)]/50 text-xs">❦</div>
            <div className="absolute top-5 right-5 text-[var(--gold)]/50 text-xs">❦</div>
            <div className="absolute bottom-5 left-5 text-[var(--gold)]/50 text-xs">❦</div>
            <div className="absolute bottom-5 right-5 text-[var(--gold)]/50 text-xs">❦</div>

            <div className="space-y-1.5 z-10 pt-2">
              <span className="inline-block px-3 py-1 rounded-full border border-[var(--border-gold)] bg-[var(--gold)]/10 text-[var(--gold)] font-sans-ui text-[10px] tracking-widest uppercase font-bold">
                Fin de l&apos;Ouvrage
              </span>
              <p className="font-editorial text-xs tracking-widest uppercase text-[var(--ink-soft)] mt-1">
                Adnane SIDI-AMADOU
              </p>
            </div>

            <div className="space-y-4 z-10 my-auto max-w-sm">
              <div className="w-16 h-16 mx-auto rounded-full border-2 border-[var(--gold)] bg-gradient-to-b from-[var(--gold)]/15 to-transparent flex items-center justify-center text-[var(--gold)] font-editorial text-3xl font-bold shadow-xs">
                A
              </div>
              <p className="font-editorial italic text-sm text-[var(--ink-soft)] leading-relaxed">
                &ldquo;Bâtir avec rigueur, concevoir avec passion et laisser une empreinte durable dans chaque ligne de code.&rdquo;
              </p>
              <div className="w-20 h-[1.5px] bg-[var(--gold)] mx-auto opacity-70" />
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-1">
                <button
                  onClick={(e) => { e.stopPropagation(); turnToSpread(1); }}
                  className="px-4 py-2 rounded bg-[var(--gold)] hover:bg-[var(--gold-light)] text-[var(--paper)] font-sans-ui text-xs font-bold tracking-wide uppercase transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <Bookmark size={13} /> Sommaire
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); turnToSpread(0); }}
                  className="px-4 py-2 rounded border border-[var(--border)] hover:border-[var(--gold)] bg-[var(--paper)] text-[var(--ink)] font-sans-ui text-xs font-semibold transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <RotateCcw size={13} /> Couverture
                </button>
              </div>
            </div>

            <div className="w-full space-y-1 z-10 pb-2 text-[10px] font-sans-ui text-[var(--ink-soft)]">
              <p>{BOOK_DATA.backCover.copyright}</p>
              <p className="text-[9px] text-[var(--gold)]">
                Fait avec passion · Tous droits réservés
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderProjectPage = (project: ProjectItem, pageNumber: number) => (
    <div className="w-full h-full flex flex-col justify-between p-6 sm:p-10 text-[var(--ink)] bg-[#FAF5EA]">
      <div className="space-y-3.5">
        <div className="flex items-center justify-between">
          <span className="font-editorial text-xs font-bold text-[var(--gold)]">
            Étude n°{project.num} · {project.year}
          </span>
          <span className="px-2 py-0.5 rounded bg-[var(--sage)]/15 text-[var(--sage)] font-sans-ui text-[10px] font-bold">
            {project.badge}
          </span>
        </div>
        <div>
          <h4 className="font-editorial text-xl sm:text-2xl font-bold text-[var(--ink)]">
            {project.title}
          </h4>
          <p className="font-sans-ui text-xs text-[var(--ink-soft)] mt-0.5">
            {project.subtitle}
          </p>
        </div>
        <div className="p-4 rounded border border-[var(--border)] bg-[var(--paper-shade)]/40 space-y-2.5 text-xs sm:text-[13px] leading-relaxed">
          <div>
            <strong className="font-sans-ui text-[10px] uppercase text-[var(--ink-soft)] block font-bold">
              Le Défi :
            </strong>
            <p>{project.problem}</p>
          </div>
          <div>
            <strong className="font-sans-ui text-[10px] uppercase text-[var(--ink-soft)] block font-bold">
              La Solution Bâtie :
            </strong>
            <p>{project.solution}</p>
          </div>
          {project.impact && (
            <div className="p-2 rounded bg-[var(--gold)]/10 border-l-2 border-[var(--gold)] font-sans-ui text-xs text-[var(--ink)] font-semibold">
              <strong>Impact :</strong> {project.impact}
            </div>
          )}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((t, idx) => (
              <span key={idx} className="font-sans-ui text-[10px] px-2 py-0.5 rounded bg-[var(--paper)] border border-[var(--border)] text-[var(--ink-soft)]">
                {t}
              </span>
            ))}
          </div>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-sans-ui text-xs font-bold text-[var(--gold)] hover:underline"
            >
              <Github size={12} /> Code <ArrowUpRight size={11} />
            </a>
          )}
        </div>
      </div>
      <div className="pt-3 border-t border-[var(--border)] text-[11px] font-sans-ui text-[var(--ink-soft)] flex justify-between">
        <span>III — Projets</span>
        <span>Page {pageNumber}</span>
      </div>
    </div>
  );

  const renderExperiencePage = (item: ExperienceItem, pageNumber: number) => (
    <div className="w-full h-full flex flex-col justify-between p-6 sm:p-10 text-[var(--ink)] bg-[#FAF5EA]">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="font-sans-ui text-[10px] font-bold text-[var(--gold)] uppercase tracking-wider">
            Chroniques de Parcours
          </span>
          <span className="font-sans-ui text-xs font-bold text-[var(--gold)]">
            {item.period}
          </span>
        </div>
        <div>
          <h4 className="font-editorial text-xl sm:text-2xl font-bold text-[var(--ink)]">
            {item.role}
          </h4>
          <p className="font-sans-ui text-xs text-[var(--ink-soft)] mt-0.5">
            chez {item.company} · {item.type}
          </p>
        </div>
        <div className="p-4 rounded border border-[var(--border)] bg-[var(--paper-shade)]/40 space-y-3">
          <p className="text-xs sm:text-[13px] leading-relaxed text-[var(--ink)]">
            {item.narrative}
          </p>
          <ul className="space-y-1.5 text-xs text-[var(--ink-soft)] font-sans-ui list-disc list-inside">
            {item.highlights.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="pt-3 border-t border-[var(--border)] text-[11px] font-sans-ui text-[var(--ink-soft)] flex justify-between">
        <span>IV — Expérience</span>
        <span>Page {pageNumber}</span>
      </div>
    </div>
  );

  // Pages en fonction du spread courant au repos
  const currentSpreadDef = SPREADS[currentSpread] || SPREADS[0];
  const leftPageNum: number | null = currentSpreadDef.left;
  const rightPageNum: number | null = currentSpreadDef.right;

  // Pages affichées lors d'un tournage (Flip automatique ou Drag tactile direct)
  const isPageTurning = isFlipping || isDragging || dragProgress !== null;
  const activeTargetSpread = targetSpread !== null ? targetSpread : currentSpread;
  const targetSpreadDef = SPREADS[activeTargetSpread] || currentSpreadDef;

  let staticLeftPageNum: number | null = leftPageNum;
  let staticRightPageNum: number | null = rightPageNum;
  let turningFrontPageNum: number = 0;
  let turningBackPageNum: number = 1;

  if (isPageTurning) {
    if (flipDirection === 'forward') {
      staticLeftPageNum = currentSpreadDef.left;
      staticRightPageNum = targetSpreadDef.right;
      turningFrontPageNum = currentSpreadDef.right ?? 0;
      turningBackPageNum = targetSpreadDef.left ?? 0;
    } else {
      staticLeftPageNum = targetSpreadDef.left;
      staticRightPageNum = currentSpreadDef.right;
      turningFrontPageNum = targetSpreadDef.right ?? 0;
      turningBackPageNum = currentSpreadDef.left ?? 0;
    }
  }

  // Calcul de l'ombre portée sous la page en cours de tournage
  const shadowOpacity = dragProgress !== null 
    ? Math.sin(dragProgress * Math.PI) * 0.25 
    : undefined;

  // Décalage cinématique continu pour centrer la couverture fermée (-25%) et le dos fermé (+25%)
  let bookShiftX = 0;
  if (!isMobile) {
    if (dragProgress !== null) {
      // Suivi tactile direct au doigt ou retour élastique en temps réel
      if (currentSpread === 0 && flipDirection === 'forward') {
        bookShiftX = -25 * (1 - dragProgress);
      } else if (currentSpread === 1 && flipDirection === 'backward' && activeTargetSpread === 0) {
        bookShiftX = -25 * dragProgress;
      } else if (currentSpread === totalSpreads - 1 && flipDirection === 'backward') {
        bookShiftX = 25 * (1 - dragProgress);
      } else if (currentSpread === totalSpreads - 2 && flipDirection === 'forward' && activeTargetSpread === totalSpreads - 1) {
        bookShiftX = 25 * dragProgress;
      }
    } else {
      // État de repos ou animation automatique déclenchée par bouton/clavier
      const effectiveSpread = isFlipping && targetSpread !== null ? targetSpread : currentSpread;
      if (effectiveSpread === 0) {
        bookShiftX = -25;
      } else if (effectiveSpread === totalSpreads - 1) {
        bookShiftX = 25;
      } else {
        bookShiftX = 0;
      }
    }
  }

  // Opacités des panneaux statiques :
  // Si un panneau n'a pas de page à afficher (staticLeftPageNum === null ou staticRightPageNum === null),
  // il reste strictement transparent pour ne jamais afficher de fond blanc ou de bordure parasite
  const leftPanelOpacity = staticLeftPageNum === null ? 0 : 1;
  const rightPanelOpacity = staticRightPageNum === null ? 0 : 1;

  // Calcul du spread actif pour l'indicateur de navigation
  const activeSpreadForIndicator = isPageTurning ? (targetSpread ?? currentSpread) : currentSpread;

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[var(--paper)] text-[var(--ink)] flex flex-col justify-between select-none">
      {/* Texture de papier noble et grain subtil */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035] bg-repeat bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />

      {/* 1. Barre supérieure noble & épurée */}
      <header className="relative z-30 w-full px-4 sm:px-8 py-3 flex items-center justify-between border-b border-[var(--border)] bg-[var(--paper)]/90 backdrop-blur-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-[var(--gold)] bg-[var(--paper-shade)] flex items-center justify-center text-[var(--gold)] font-editorial font-bold text-sm shadow-xs">
            A
          </div>
          <div>
            <h1 className="font-editorial text-sm sm:text-base font-bold text-[var(--ink)] tracking-wide leading-tight">
              The Book of Adnane
            </h1>
            <p className="font-sans-ui text-[10px] text-[var(--ink-soft)] tracking-wider uppercase">
              Adnane SIDI-AMADOU · Software Developer & Tech Lead
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Audio toggle */}
          <button
            onClick={toggleSound}
            aria-label={soundEnabled ? "Couper le bruitage" : "Activer le bruitage"}
            className="w-8 h-8 rounded-full border border-[var(--border)] bg-[var(--paper)] hover:border-[var(--gold)] text-[var(--ink-soft)] hover:text-[var(--gold)] flex items-center justify-center transition-all cursor-pointer shadow-xs"
            title={soundEnabled ? "Effet sonore de papier activé" : "Effet sonore désactivé"}
          >
            {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
          </button>

          {/* GitHub */}
          <a
            href="https://github.com/AdnaneAD1"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub d'Adnane"
            className="w-8 h-8 rounded-full border border-[var(--border)] bg-[var(--paper)] hover:border-[var(--gold)] text-[var(--ink-soft)] hover:text-[var(--gold)] flex items-center justify-center transition-all shadow-xs"
            title="Profil GitHub"
          >
            <Github size={15} />
          </a>

          {/* Mode lecture simple accessible */}
          <button
            onClick={() => setSimpleMode(true)}
            aria-label="Passer en mode lecture simple sans 3D"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--border-gold)] bg-[var(--paper-shade)] text-[var(--ink)] hover:border-[var(--gold)] hover:text-[var(--gold)] font-sans-ui text-xs font-semibold tracking-wide transition-all shadow-xs cursor-pointer"
          >
            <BookOpen size={13} />
            <span className="hidden sm:inline">Mode lecture simple</span>
          </button>
        </div>
      </header>

      {/* 2. Scène Centrale : LE GRAND LIVRE PLEIN ÉCRAN AVEC TRANSLATION FLUIDE ET CONTRÔLE TACTILE DIRECT */}
      <main
        className="relative flex-1 w-full flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden select-none"
        style={{ touchAction: 'none' }}
      >
        <div
          ref={bookContainerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerEnd}
          onPointerCancel={handlePointerEnd}
          className={`w-full max-w-[1380px] h-[86vh] max-h-[820px] relative flex select-none ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          style={{
            perspective: '2500px',
            transform: `translateX(${bookShiftX}%)`,
            transition: isDragging ? 'none' : 'transform 0.62s cubic-bezier(0.2, 0, 0.2, 1)',
          }}
        >
          {/* Tranches de pages empilées sur les bords latéraux (uniquement visibles si pages présentes) */}
          <div
            className="absolute left-0 top-0 bottom-0 w-2.5 bg-gradient-to-r from-[#DFD0B7] to-transparent z-20 pointer-events-none border-l-2 border-[#C7B59A] rounded-l-lg transition-opacity duration-300"
            style={{ opacity: currentSpread > 0 ? 1 : 0 }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-2.5 bg-gradient-to-l from-[#DFD0B7] to-transparent z-20 pointer-events-none border-r-2 border-[#C7B59A] rounded-r-lg transition-opacity duration-300"
            style={{ opacity: currentSpread < totalSpreads - 1 ? 1 : 0 }}
          />

          {/* Pliure centrale réaliste du livre (uniquement visible quand le livre est ouvert) */}
          <div
            className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-12 bg-gradient-to-r from-transparent via-[rgba(30,42,56,0.14)] to-transparent z-20 pointer-events-none transition-opacity duration-300"
            style={{ opacity: currentSpread > 0 && currentSpread < totalSpreads - 1 ? 1 : 0 }}
          />
          <div
            className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-[rgba(30,42,56,0.22)] z-20 pointer-events-none transition-opacity duration-300"
            style={{ opacity: currentSpread > 0 && currentSpread < totalSpreads - 1 ? 1 : 0 }}
          />

          {/* PAGE STATIQUE GAUCHE */}
          <div
            className={`w-full md:w-1/2 h-full relative overflow-hidden group/left ${
              staticLeftPageNum === 20
                ? 'rounded-lg border border-[var(--border)] shadow-[0_25px_65px_rgba(30,42,56,0.22),0_10px_25px_rgba(30,42,56,0.12)] bg-[#FAF5EA]'
                : 'rounded-l-lg border-y border-l border-[var(--border)] bg-[#FAF5EA] shadow-[0_20px_50px_rgba(30,42,56,0.14)]'
            }`}
            style={{
              opacity: leftPanelOpacity,
              pointerEvents: leftPanelOpacity === 0 ? 'none' : undefined,
              transition: isDragging ? 'none' : 'opacity 0.25s ease',
            }}
          >
            {renderSinglePage(staticLeftPageNum)}

            {/* Ombre portée dynamique lors du tournage */}
            {isPageTurning && (
              <div
                className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-[rgba(30,42,56,0.06)] to-[rgba(30,42,56,0.22)] z-30"
                style={{
                  transformOrigin: 'right center',
                  ...(dragProgress !== null
                    ? { opacity: shadowOpacity, transition: 'none' }
                    : { animation: 'underPageShadow 0.62s cubic-bezier(0.2, 0, 0.2, 1) forwards' }),
                }}
              />
            )}

            {/* Si dos fermé au repos (Page 20 à gauche centrée) */}
            {currentSpread === totalSpreads - 1 && !isPageTurning && (
              <>
                <div className="absolute left-0 top-0 bottom-0 w-3.5 bg-gradient-to-r from-[#C7B59A] via-[#E8DCB8] to-transparent z-20 border-l border-[#A8987E] pointer-events-none rounded-l-lg" />
                <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-[#2A231D] via-[#4A3B32] to-[#685346] z-20 border-l border-[#1E1712] pointer-events-none rounded-r-xs shadow-md" />
              </>
            )}

            {/* Coin inférieur gauche */}
            {currentSpread > 0 && !isPageTurning && (
              <div 
                onClick={prev}
                className="absolute bottom-0 left-0 w-24 h-16 flex items-end justify-start p-3 opacity-60 hover:opacity-100 transition-opacity cursor-pointer z-20"
              >
                <span className="font-sans-ui text-[10px] font-bold text-[var(--gold)] flex items-center gap-1 bg-[var(--paper-shade)] px-2.5 py-1 rounded shadow-xs">
                  ← Précédent
                </span>
              </div>
            )}
          </div>

          {/* PAGE STATIQUE DROITE */}
          <div
            className={`hidden md:block w-1/2 h-full relative overflow-hidden group/right ${
              currentSpread === 0
                ? 'rounded-lg border border-[var(--border)] shadow-[0_25px_65px_rgba(30,42,56,0.22),0_10px_25px_rgba(30,42,56,0.12)] bg-[#FAF5EA]'
                : 'rounded-r-lg border-y border-r border-[var(--border)] bg-[#FAF5EA] shadow-[0_20px_50px_rgba(30,42,56,0.14)]'
            }`}
            style={{
              opacity: rightPanelOpacity,
              pointerEvents: rightPanelOpacity === 0 ? 'none' : undefined,
              transition: isDragging ? 'none' : 'opacity 0.25s ease',
            }}
          >
            {renderSinglePage(staticRightPageNum)}

            {/* Si livre fermé au repos (Couverture à droite centrée), ajouter l'épaisseur 3D et la reliure */}
            {currentSpread === 0 && !isPageTurning && (
              <>
                <div className="absolute right-0 top-0 bottom-0 w-3.5 bg-gradient-to-l from-[#C7B59A] via-[#E8DCB8] to-transparent z-20 border-r border-[#A8987E] pointer-events-none rounded-r-lg" />
                <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-[#2A231D] via-[#4A3B32] to-[#685346] z-20 border-r border-[#1E1712] pointer-events-none rounded-l-xs shadow-md" />
              </>
            )}

            {/* Ombre portée dynamique lors du tournage */}
            {isPageTurning && (
              <div
                className="absolute inset-0 pointer-events-none bg-gradient-to-l from-transparent via-[rgba(30,42,56,0.06)] to-[rgba(30,42,56,0.22)] z-30"
                style={{
                  transformOrigin: 'left center',
                  ...(dragProgress !== null
                    ? { opacity: shadowOpacity, transition: 'none' }
                    : { animation: 'underPageShadow 0.62s cubic-bezier(0.2, 0, 0.2, 1) forwards' }),
                }}
              />
            )}

            {/* Coin inférieur droit */}
            {currentSpread < totalSpreads - 1 && !isPageTurning && (
              <div 
                onClick={next}
                className="absolute bottom-0 right-0 w-24 h-16 flex items-end justify-end p-3 opacity-60 hover:opacity-100 transition-opacity cursor-pointer z-20"
              >
                <span className="font-sans-ui text-[10px] font-bold text-[var(--gold)] flex items-center gap-1 bg-[var(--paper-shade)] px-2.5 py-1 rounded shadow-xs">
                  Suivant →
                </span>
              </div>
            )}
          </div>

          {/* FEUILLE VOLANTE 3D UNIFIÉE (PAGE ENTIÈRE SANS DÉCOUPAGE NI COUPURE DE TEXTE) */}
          {isPageTurning && (
            <TurningSheet3D
              direction={flipDirection}
              frontPageNum={turningFrontPageNum}
              backPageNum={turningBackPageNum}
              renderPage={renderSinglePage}
              isMobile={isMobile}
              progress={dragProgress}
            />
          )}
        </div>
      </main>

      {/* 3. Contrôles Inférieurs Flottants & Marque-pages */}
      <footer className="relative z-30 w-full px-4 sm:px-8 py-3 flex items-center justify-between border-t border-[var(--border)] bg-[var(--paper)]/90 backdrop-blur-xs">
        {/* Navigation Marque-Pages Rapides (Gauche) */}
        <div className="hidden sm:flex items-center gap-1.5">
          <span className="font-sans-ui text-[10px] text-[var(--ink-soft)] uppercase tracking-wider font-bold mr-1 flex items-center gap-1">
            <Bookmark size={11} /> Chapitres :
          </span>
          {CHAPTERS.filter(c => c.id !== 'cover' && c.id !== 'title' && c.id !== 'back-cover').map(c => {
            const target = chapterToSpread(c.id);
            const isActive = currentSpread === target;
            return (
              <button
                key={c.id}
                onClick={() => turnToSpread(target)}
                className={`px-2.5 py-1 rounded text-xs font-sans-ui font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[var(--gold)] text-[var(--paper)] font-bold shadow-xs'
                    : 'bg-[var(--paper-shade)] text-[var(--ink-soft)] hover:text-[var(--ink)] hover:bg-[var(--paper)] border border-[var(--border)]'
                }`}
              >
                {c.badge || c.title}
              </button>
            );
          })}
        </div>

        {/* Indicateur de page au centre synchronisé */}
        <div className="mx-auto sm:mx-0 font-sans-ui text-xs text-[var(--ink-soft)]">
          {activeSpreadForIndicator === 0 ? (
            <span className="font-semibold text-[var(--gold)]">Couverture fermée</span>
          ) : activeSpreadForIndicator === 1 ? (
            <span className="font-semibold text-[var(--gold)]">Pages de garde · Feuilles de respect</span>
          ) : activeSpreadForIndicator === 2 ? (
            <span className="font-semibold text-[var(--ink)]">Frontispice & Sommaire</span>
          ) : activeSpreadForIndicator >= 3 && activeSpreadForIndicator <= 10 ? (
            <span>
              <strong className="text-[var(--ink)]">
                Pages {activeSpreadForIndicator * 2 - 3} & {activeSpreadForIndicator * 2 - 2}
              </strong> sur 18
            </span>
          ) : activeSpreadForIndicator === 11 ? (
            <span className="font-semibold text-[var(--gold)]">Pages de garde finales</span>
          ) : (
            <span className="font-semibold text-[var(--gold)]">Dos fermé · Fin de l&apos;ouvrage</span>
          )}
        </div>

        {/* Flèches de navigation (Droite) */}
        <div className="flex items-center gap-2">
          <button
            onClick={prev}
            disabled={currentSpread === 0 || isPageTurning}
            aria-label="Page précédente"
            className="w-9 h-9 rounded-full border border-[var(--border)] bg-[var(--paper)] hover:border-[var(--gold)] text-[var(--ink)] disabled:opacity-20 disabled:pointer-events-none flex items-center justify-center transition-all cursor-pointer shadow-xs"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            disabled={currentSpread >= totalSpreads - 1 || isPageTurning}
            aria-label="Page suivante"
            className="w-9 h-9 rounded-full border border-[var(--border)] bg-[var(--paper)] hover:border-[var(--gold)] text-[var(--ink)] disabled:opacity-20 disabled:pointer-events-none flex items-center justify-center transition-all cursor-pointer shadow-xs"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </footer>
    </div>
  );
}
