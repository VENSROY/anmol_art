import { useRef } from "react";
import { motion, useSpring, useReducedMotion } from "framer-motion";
import type { ReactNode, PointerEvent } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}

/** Subtle pointer-driven 3D tilt. No-ops on touch devices and reduced motion. */
export default function TiltCard({ children, className, maxTilt = 8 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const enabled =
    !reduceMotion &&
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  const rotateX = useSpring(0, { stiffness: 150, damping: 18 });
  const rotateY = useSpring(0, { stiffness: 150, damping: 18 });
  const scale = useSpring(1, { stiffness: 150, damping: 18 });

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * maxTilt * 2);
    rotateX.set(py * -maxTilt * 2);
  };

  const handlePointerLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
  };

  if (!enabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ rotateX, rotateY, scale, transformPerspective: 1200 }}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => scale.set(1.015)}
      onPointerLeave={handlePointerLeave}
    >
      {children}
    </motion.div>
  );
}
