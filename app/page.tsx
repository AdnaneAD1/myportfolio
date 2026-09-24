'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useBookStore } from '@/lib/store';
import SimpleReadMode from '@/components/ui/SimpleReadMode';

const InteractiveBook = dynamic(() => import('@/components/book/InteractiveBook'), {
  ssr: false,
  loading: () => (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-[#0D121D] text-[#F5EFE0] gap-4 select-none">
      <div className="w-12 h-12 rounded-full border-2 border-[var(--gold)] border-t-transparent animate-spin" />
      <p className="font-editorial text-sm tracking-wider text-[var(--gold-light)]">
        Reliure de l&apos;ouvrage en cours...
      </p>
    </div>
  ),
});

export default function Home() {
  const { isSimpleMode, setSimpleMode } = useBookStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setSimpleMode(true);
    }
  }, [setSimpleMode]);

  if (!mounted) return null;

  if (isSimpleMode) {
    return <SimpleReadMode />;
  }

  return <InteractiveBook />;
}
