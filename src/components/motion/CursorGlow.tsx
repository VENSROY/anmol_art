import { useEffect, useRef } from "react";
import { motion, useMotionValue, useMotionTemplate, useSpring, useReducedMotion } from "framer-motion";

interface CursorGlowProps {
  className?: string;
  size?: number;
  color?: string;
}

/**
 * Soft radial highlight that follows the pointer within its parent section.
 * Attaches the listener to the parent element directly so it works as a drop-in
 * first child of any `relative` positioned section, without blocking clicks.
 */
export default function CursorGlow({ className = "", size = 480, color = "rgba(199,166,114,0.12)" }: CursorGlowProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 100, damping: 22 });
  const y = useSpring(rawY, { stiffness: 100, damping: 22 });
  const background = useMotionTemplate`radial-gradient(${size}px circle at ${x}px ${y}px, ${color}, transparent 70%)`;

  const enabled =
    !reduceMotion &&
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  useEffect(() => {
    if (!enabled) return;
    const parent = ref.current?.parentElement;
    if (!parent) return;
    const handleMove = (e: globalThis.PointerEvent) => {
      const rect = parent.getBoundingClientRect();
      rawX.set(e.clientX - rect.left);
      rawY.set(e.clientY - rect.top);
    };
    parent.addEventListener("pointermove", handleMove);
    return () => parent.removeEventListener("pointermove", handleMove);
  }, [enabled, rawX, rawY]);

  if (!enabled) return null;

  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ background }}
    />
  );
}
