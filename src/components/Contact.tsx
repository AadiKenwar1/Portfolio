"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import { CONTACT } from "@/lib/data";
import Reveal from "@/components/Reveal";

export default function Contact() {
  return (
    <section id="contact" className="px-6 py-24 sm:px-12 lg:px-20">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-blue-400">
            Get in touch
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Let&apos;s Connect
          </h2>
          <p className="mt-3 max-w-lg text-slate-400">
            Open to internships, side projects, and good conversations about
            software.
          </p>
        </Reveal>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
          <Reveal delay={0.05}>
            <a
              href={`mailto:${CONTACT.email}`}
              className="flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-6 py-4 transition hover:border-white/[0.15] hover:bg-white/[0.06]"
            >
              <Mail className="h-5 w-5 shrink-0 text-blue-400" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Email
                </p>
                <p className="mt-0.5 text-sm font-medium text-white">
                  {CONTACT.email}
                </p>
              </div>
            </a>
          </Reveal>

          <Reveal delay={0.1}>
            <a
              href={CONTACT.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-6 py-4 transition hover:border-white/[0.15] hover:bg-white/[0.06]"
            >
              <Github className="h-5 w-5 shrink-0 text-slate-300" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  GitHub
                </p>
                <p className="mt-0.5 text-sm font-medium text-white">
                  github.com/aadikenwar1
                </p>
              </div>
            </a>
          </Reveal>

          <Reveal delay={0.15}>
            <a
              href={CONTACT.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-6 py-4 transition hover:border-white/[0.15] hover:bg-white/[0.06]"
            >
              <Linkedin className="h-5 w-5 shrink-0 text-blue-400" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  LinkedIn
                </p>
                <p className="mt-0.5 text-sm font-medium text-white">
                  linkedin.com/in/aadikenwar
                </p>
              </div>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
