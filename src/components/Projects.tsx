"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Expand, ExternalLink, Github } from "lucide-react";
import { useState } from "react";
import { PROJECTS, DEFAULT_PREVIEW_BACKGROUND, DEFAULT_PREVIEW_SCALE } from "@/lib/data";
import type { Project } from "@/lib/data";
import { previewIsImageUrl } from "@/lib/preview";
import Reveal from "@/components/Reveal";
import ProjectModal from "@/components/ProjectModal";

export default function Projects() {
  const reduce = useReducedMotion();
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects" className="px-6 py-24 sm:px-12 lg:px-20">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-blue-400">
            a few things i&apos;ve been building
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Projects
          </h2>
          <p className="mt-3 max-w-xl text-slate-400">
            Click any card to explore.
          </p>
        </Reveal>

        {/* Project grid — 2 columns on sm+, 3 on lg */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, i) => (
            <Reveal key={project.title} delay={i * 0.07}>
              <motion.div
                className={`group flex h-full w-full flex-col overflow-hidden rounded-2xl bg-white/[0.03] text-left transition hover:bg-white/[0.06] ${
                  project.highlight
                    ? "border border-amber-200/35 hover:border-amber-100/50"
                    : "border border-white/[0.08] hover:border-white/[0.16]"
                }`}
                whileHover={reduce ? undefined : { y: -4 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <button
                  type="button"
                  onClick={() => setSelected(project)}
                  className="flex min-h-0 w-full flex-1 cursor-pointer flex-col text-left"
                >
                {/* Preview: image URL from /public, or Tailwind gradient */}
                <div
                  className={`relative h-40 w-full shrink-0 overflow-hidden ${
                    previewIsImageUrl(project.preview)
                      ? project.previewBackground ?? DEFAULT_PREVIEW_BACKGROUND
                      : ""
                  }`}
                >
                  {previewIsImageUrl(project.preview) ? (
                    <Image
                      src={project.preview}
                      alt={`${project.title} preview`}
                      fill
                      className="object-contain object-center"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      style={
                        (project.previewScale ?? DEFAULT_PREVIEW_SCALE) !== 1
                          ? {
                              transform: `scale(${project.previewScale ?? DEFAULT_PREVIEW_SCALE})`,
                              transformOrigin: "center center",
                            }
                          : undefined
                      }
                    />
                  ) : (
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${project.preview}`}
                    />
                  )}
                  {/* Grid overlay — only on gradient placeholders */}
                  {!previewIsImageUrl(project.preview) && (
                    <div
                      className="pointer-events-none absolute inset-0 opacity-[0.07]"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 24px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 24px)",
                      }}
                      aria-hidden
                    />
                  )}
                  {project.highlight && (
                    <span className="absolute left-3 top-3 z-[2] rounded-full bg-gradient-to-r from-amber-400/95 via-amber-300/90 to-yellow-200/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-900 ring-1 ring-amber-200/60">
                      Highlighted
                    </span>
                  )}
                  <span className="absolute bottom-4 left-4 z-[1] rounded bg-black/30 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-white/60">
                    Preview
                  </span>
                  <span className="absolute right-3 top-3 z-[1] flex h-7 w-7 items-center justify-center rounded-full bg-black/30 text-white/50 opacity-0 transition group-hover:opacity-100">
                    <Expand className="h-3.5 w-3.5" />
                  </span>
                </div>

                {/* Card body */}
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-bold text-white">{project.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded bg-blue-500/10 px-2 py-0.5 text-[11px] font-medium text-blue-300 ring-1 ring-blue-500/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                </button>

                <div className="flex flex-wrap gap-2 border-t border-white/[0.06] px-5 pb-4 pt-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-white/15 px-3 py-2 text-xs font-medium text-slate-200 transition hover:border-white/30 hover:text-white sm:flex-none sm:justify-start sm:px-4 sm:text-sm"
                  >
                    <Github className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
                    GitHub
                  </a>
                  {project.showDemo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-blue-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-blue-500 sm:flex-none sm:justify-start sm:px-4 sm:text-sm"
                    >
                      <ExternalLink className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
                      Live Demo
                    </a>
                  )}
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
