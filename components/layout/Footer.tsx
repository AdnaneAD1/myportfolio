import { INFO } from '@/lib/data';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border2)] px-6 md:px-12 py-6 flex flex-row items-end justify-between bg-[var(--bg)] gap-4">
      <div className="text-[0.6rem] text-[var(--gray)] tracking-[0.08em] uppercase md:max-w-none">
        © {currentYear} <span className="text-[var(--gray2)]">{INFO.name}</span>
      </div>
      <div className="flex gap-4 md:gap-8">
        <a 
          href={INFO.github} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-[0.6rem] tracking-[0.12em] uppercase text-[var(--gray)] hover:text-[var(--cyan)] transition-colors"
        >
          GitHub
        </a>
        <a 
          href={`mailto:${INFO.email}`} 
          className="text-[0.6rem] tracking-[0.12em] uppercase text-[var(--gray)] hover:text-[var(--cyan)] transition-colors cursor-none"
        >
          Email
        </a>
      </div>
    </footer>
  );
}
