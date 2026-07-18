import Jali from "./Jali";

interface SectionDividerProps {
  className?: string;
  /** Narrow rule for use under a heading, or a wide architectural band. */
  variant?: "rule" | "band";
}

/**
 * Section separator built from the jali lattice rather than a generic ornament.
 * The "rule" form is a short lattice strip that fades at both ends, reading as
 * light falling through a carved screen.
 */
export default function SectionDivider({ className = "", variant = "rule" }: SectionDividerProps) {
  if (variant === "band") {
    return (
      <div className={`relative w-full h-20 overflow-hidden text-brass ${className}`} aria-hidden="true">
        <Jali scale={64} opacity={0.18} />
        <div className="absolute inset-0 bg-gradient-to-r from-sandstone via-transparent to-sandstone" />
      </div>
    );
  }

  return (
    <div className={`relative mx-auto w-56 h-10 overflow-hidden text-brass ${className}`} aria-hidden="true">
      <Jali scale={40} opacity={0.4} />
      {/* Feather the ends so the strip reads as a fragment of a larger screen */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(var(--sandstone))_0%,transparent_28%,transparent_72%,rgb(var(--sandstone))_100%)]" />
    </div>
  );
}
