"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

/** Scroll-triggered fade-up wrapper. Respects prefers-reduced-motion. */
export default function Reveal({ children, delay = 0, className }: RevealProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay, duration: 0.55, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
