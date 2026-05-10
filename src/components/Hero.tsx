"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { HERO } from "@/lib/data";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="flex min-h-screen flex-col justify-center px-6 pb-16 pt-16 sm:px-12 lg:px-20"
    >
      <div className="mx-auto w-full max-w-4xl">
        {/* Eyebrow */}
        <motion.p
          className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-400"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {HERO.eyebrow}
        </motion.p>

        {/* Name */}
        <motion.h1
          className="mt-4 text-6xl font-extrabold leading-none tracking-tight text-white sm:text-7xl md:text-8xl"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.65, ease: EASE }}
        >
          {HERO.name}
        </motion.h1>

        {/* School */}
        <motion.p
          className="mt-5 text-lg font-semibold tracking-wide text-blue-300 sm:text-xl"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.55, ease: EASE }}
        >
          {HERO.school}
        </motion.p>

        {/* Bio */}
        <motion.p
          className="mt-3 max-w-lg text-base leading-relaxed text-slate-400"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.34, duration: 0.55, ease: EASE }}
        >
          {HERO.bio}
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="mt-9 flex flex-wrap gap-3"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.44, duration: 0.5 }}
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            View Projects
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-white/30 hover:text-white"
          >
            Contact Me
          </a>
        </motion.div>
      </div>
    </section>
  );
}
