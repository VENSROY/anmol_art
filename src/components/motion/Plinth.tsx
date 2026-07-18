import { useRef } from "react";
import { motion, useSpring, useTransform, useReducedMotion } from "framer-motion";
import type { ReactNode, PointerEvent } from "react";

interface PlinthProps {
  children: ReactNode;
  className?: string;
  /** Degrees of tilt at the extremes. Kept small — this is furniture, not a toy. */
  maxTilt?: number;
}

/**
 * A museum plinth: the object sits in real space above a contact shadow that
 * responds to the same pointer movement as the tilt, so the piece reads as
 * lifted rather than merely skewed.
 *
 * Replaces the previous rounded card + static drop shadow. Disabled entirely on
 * coarse pointers and under prefers-reduced-motion, where it renders a plain
 * container with no listeners attached.
 */
export default function Plinth({ children, className = "", maxTilt = 6 }: PlinthProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const enabled =
    !reduceMotion &&
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  const spring = { stiffness: 160, damping: 20, mass: 0.6 };
  const rotateX = useSpring(0, spring);
  const rotateY = useSpring(0, spring);
  const lift    = useSpring(0, spring);

  // The shadow tracks the lift: higher object, softer and larger shadow.
  // All hooks are declared before any early return so the hook order is stable.
  const shadowOpacity = useTransform(lift, [0, 1], [0.28, 0.5]);
  const shadowBlur    = useTransform(lift, [0, 1], [26, 46]);
  const shadowBlurCss = useTransform(shadowBlur, (b) => `blur(${b}px)`);
  const shadowScale   = useTransform(lift, [0, 1], [0.86, 0.7]);
  const objectY       = useTransform(lift, [0, 1], [0, -10]);

  if (!enabled) {
    return <div className={className}>{children}</div>;
  }

  const handleMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    rotateY.set(px * maxTilt * 2);
    rotateX.set(py * -maxTilt * 2);
  };

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
    lift.set(0);
  };

  return (
    <div className={`relative ${className}`} style={{ perspective: 1400 }}>
      {/* Contact shadow — a separate element so it can blur and spread
          independently of the object above it. */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-8 rounded-[50%] bg-ink"
        style={{
          opacity: shadowOpacity,
          filter: shadowBlurCss,
          scaleX: shadowScale,
          transformOrigin: "center bottom",
        }}
      />
      <motion.div
        ref={ref}
        onPointerMove={handleMove}
        onPointerEnter={() => lift.set(1)}
        onPointerLeave={reset}
        style={{ rotateX, rotateY, y: objectY, transformStyle: "preserve-3d" }}
        className="relative"
      >
        {children}
      </motion.div>
    </div>
  );
}
