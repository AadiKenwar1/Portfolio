"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, Github, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { Project } from "@/lib/data";
import { previewIsImageUrl } from "@/lib/preview";

interface Props {
  project: Project | null;
  onClose: () => void;
}

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];
const PLACEHOLDER_COUNT = 3;

/** Matches native screenshots (1284×2778). Frame uses this ratio so images fill with no letterboxing. */
const MOBILE_SCREENSHOT_AR = "1284 / 2778";

/** The image/gradient content shared by both layouts */
function SlideContent({
  project,
  slide,
  nudgeUp = false,
}: {
  project: Project;
  slide: number;
  /** Slight upward shift for mobile modal framing */
  nudgeUp?: boolean;
}) {
  // "contain" ensures screenshots always fit the frame (no cropping).
  const imgFit = "h-full w-full object-contain object-center";

  return (
    <AnimatePresence mode="wait">
      {project.images.length > 0 ? (
        <motion.img
          key={`img-${slide}`}
          src={project.images[slide]}
          alt={`${project.title} screenshot ${slide + 1}`}
          className={`${imgFit}${nudgeUp ? " -translate-y-2" : ""}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
        />
      ) : previewIsImageUrl(project.preview) ? (
        <motion.img
          key="preview-fallback"
          src={project.preview}
          alt={`${project.title} preview`}
          className={`${imgFit}${nudgeUp ? " -translate-y-2" : ""}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
        />
      ) : (
        <motion.div
          key={`placeholder-${slide}`}
          className={`relative flex h-full w-full items-center justify-center bg-gradient-to-br ${project.preview}${nudgeUp ? " -translate-y-2" : ""}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 28px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 28px)",
            }}
            aria-hidden
          />
          <span className="px-3 text-center text-xs text-white/30">
            Screen {slide + 1}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Tags + links row — shared between layouts */
function ProjectInfo({ project }: { project: Project }) {
  return (
    <>
      <div className="mt-5 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded bg-blue-500/10 px-2.5 py-1 text-xs font-medium text-blue-300 ring-1 ring-blue-500/20"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-slate-200 transition hover:border-white/30 hover:text-white"
        >
          <Github className="h-4 w-4" />
          GitHub
        </a>
        {project.showDemo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            <ExternalLink className="h-4 w-4" />
            Live Demo
          </a>
        )}
      </div>
    </>
  );
}

export default function ProjectModal({ project, onClose }: Props) {
  const [slide, setSlide] = useState(0);

  useEffect(() => { setSlide(0); }, [project?.title]);

  useEffect(() => {
    document.body.style.overflow = project ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [project]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const slideCount = project
    ? project.images.length > 0
      ? project.images.length
      : previewIsImageUrl(project.preview)
        ? 1
        : PLACEHOLDER_COUNT
    : 0;

  const prevSlide = () => setSlide((s) => (s - 1 + slideCount) % slideCount);
  const nextSlide = () => setSlide((s) => (s + 1) % slideCount);

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden
          />

          {/* Modal */}
          <motion.div
            role="dialog"
            aria-modal
            aria-label={project.title}
            className="relative z-10 w-full overflow-hidden rounded-2xl border border-white/[0.1] bg-[#0f0f1a] shadow-2xl"
            style={{
              maxWidth: project.mobile ? "820px" : "768px",
              maxHeight: "88vh",
            }}
            initial={{ scale: 0.9, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 8 }}
            transition={{ duration: 0.28, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white/70 transition hover:bg-black/70 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>

            {project.mobile ? (
              /* ── Mobile project layout: full-bleed images left · content right ── */
              <div
                className="flex h-full min-h-0 flex-col sm:flex-row sm:items-stretch"
                style={{ maxHeight: "88vh" }}
              >
                {/* Image column — width fixed; height from 1284×2778 aspect so screenshots fill flush */}
                <div
                  className="relative mx-auto w-full max-w-[min(100%,280px)] shrink-0 overflow-hidden sm:mx-0 sm:w-[260px] sm:max-w-none md:w-[272px]"
                  style={{ aspectRatio: MOBILE_SCREENSHOT_AR }}
                >
                  <div className="absolute inset-0">
                    <SlideContent project={project} slide={slide} nudgeUp />
                  </div>

                  {slideCount > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={prevSlide}
                        aria-label="Previous screenshot"
                        className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white transition hover:bg-black/65"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        onClick={nextSlide}
                        aria-label="Next screenshot"
                        className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white transition hover:bg-black/65"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </>
                  )}

                  {slideCount > 1 && (
                    <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
                      {Array.from({ length: slideCount }).map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setSlide(i)}
                          aria-label={`Screenshot ${i + 1}`}
                          aria-current={i === slide}
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            i === slide
                              ? "w-5 bg-white"
                              : "w-1.5 bg-white/40 hover:bg-white/65"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Content column */}
                <div className="min-h-0 flex-1 overflow-y-auto p-6 sm:p-8">
                  <h2 className="text-2xl font-bold text-white sm:text-3xl">
                    {project.title}
                  </h2>
                  <p className="mt-3 leading-relaxed text-slate-300">
                    {project.description}
                  </p>
                  <ProjectInfo project={project} />
                </div>
              </div>
            ) : (
              /* ── Web project layout: image top · content below ── */
              <div className="flex flex-col" style={{ maxHeight: "88vh" }}>
                {/* Wide image strip */}
                <div className="relative h-56 shrink-0 overflow-hidden bg-black/20 sm:h-72">
                  <SlideContent project={project} slide={slide} />

                  {slideCount > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={prevSlide}
                        aria-label="Previous screenshot"
                        className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white transition hover:bg-black/60"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        onClick={nextSlide}
                        aria-label="Next screenshot"
                        className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white transition hover:bg-black/60"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </>
                  )}

                  {slideCount > 1 && (
                    <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                      {Array.from({ length: slideCount }).map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setSlide(i)}
                          aria-label={`Screenshot ${i + 1}`}
                          aria-current={i === slide}
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            i === slide
                              ? "w-5 bg-white"
                              : "w-1.5 bg-white/40 hover:bg-white/60"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="overflow-y-auto p-6 sm:p-8">
                  <h2 className="text-2xl font-bold text-white sm:text-3xl">
                    {project.title}
                  </h2>
                  <p className="mt-3 leading-relaxed text-slate-300">
                    {project.description}
                  </p>
                  <ProjectInfo project={project} />
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
