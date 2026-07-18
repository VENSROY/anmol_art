interface SectionDividerProps {
  className?: string;
}

/** Ornamental gold-diamond divider used consistently between sections. */
export default function SectionDivider({ className = "" }: SectionDividerProps) {
  return (
    <div className={`flex items-center justify-center ${className}`} aria-hidden="true">
      <span className="h-px w-20 bg-royal-gold/30" />
      <div className="mx-4 w-12 h-12 flex items-center justify-center border border-royal-gold/50 rotate-45">
        <div className="w-6 h-6 bg-royal-gold shadow-[0_0_15px_rgba(212,175,55,0.5)]" />
      </div>
      <span className="h-px w-20 bg-royal-gold/30" />
    </div>
  );
}
