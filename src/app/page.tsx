import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

function Divider() {
  return (
    <div className="mx-auto max-w-5xl px-6 sm:px-12 lg:px-20">
      <div className="h-px bg-white/[0.07]" />
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0c0c14] text-slate-100">
      {/* Subtle top glow */}
      <div
        className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(ellipse_80%_50%_at_50%_-5%,rgba(37,99,235,0.20),transparent)]"
        aria-hidden
      />

      <Hero />
      <Divider />
      <Projects />
      <Divider />
      <Contact />
      <Divider />
      
      <footer className="px-6 py-10 sm:px-12 lg:px-20">
        <div className="mx-auto flex max-w-5xl items-center justify-between text-sm text-slate-600">
          <p>© {new Date().getFullYear()} Aadi Kenwar</p>
          <a href="#top" className="transition-colors hover:text-slate-400">
            Back to top ↑
          </a>
        </div>
      </footer>
    </div>
  );
}
