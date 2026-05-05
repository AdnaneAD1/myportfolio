interface SectionTagProps {
  number: string;
  label: string;
}

export default function SectionTag({ number, label }: SectionTagProps) {
  return (
    <div className="flex items-center gap-2 mb-4 text-[0.58rem] tracking-[0.2em] uppercase text-[var(--cyan)]">
      <span className="text-[var(--gray)]">{number} —</span>
      {label}
    </div>
  );
}
