"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useInView } from "@/hooks/useInView";

const ParticleCanvas = dynamic(() => import("@/components/ParticleCanvas"), {
  ssr: false,
});

/* ── Module data ─────────────────────────────────── */
const modules = [
  {
    number: "01",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
      </svg>
    ),
    title: "Marketplace",
    description: "Publica, busca y conecta con propiedades en venta o alquiler. Filtros avanzados, mapas interactivos y contacto directo con propietarios y agentes.",
    tag: "Compra · Venta · Alquiler",
  },
  {
    number: "02",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15a2.25 2.25 0 0 1 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
      </svg>
    ),
    title: "Administración de Propiedades",
    description: "Gestiona contratos, cobros, mantenimiento e inquilinos desde un solo lugar. Reportes financieros, recordatorios automáticos y documentación centralizada.",
    tag: "Contratos · Cobros · Reportes",
  },
  {
    number: "03",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971Zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 0 1-2.031.352 5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971Z" />
      </svg>
    ),
    title: "Remates Judiciales",
    description: "Accede a oportunidades de inversión en remates judiciales. Información verificada, alertas personalizadas y seguimiento del proceso legal en tiempo real.",
    tag: "Inversión · Alertas · Legal",
  },
];

/* ── Stat data ───────────────────────────────────── */
const stats = [
  { value: "3", label: "Módulos integrados" },
  { value: "1", label: "Plataforma unificada" },
  { value: "∞", label: "Propiedades gestionadas" },
];

/* ── Card component ──────────────────────────────── */
function ModuleCard({ mod, delay }: { mod: typeof modules[0]; delay: string }) {
  const { ref, inView } = useInView(0.1);
  return (
    <div
      ref={ref}
      className={`reveal card-glow rounded-2xl overflow-hidden ${inView ? "visible" : ""}`}
      style={{ transitionDelay: delay }}
    >
      {/* Top accent bar */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="p-7 bg-surface-card border border-white/[0.06] rounded-2xl h-full flex flex-col gap-5">
        {/* Header row */}
        <div className="flex items-start justify-between">
          <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary-light">
            {mod.icon}
          </div>
          <span className="text-3xl font-bold text-white/5 select-none leading-none mt-1">
            {mod.number}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-2 leading-snug">
            {mod.title}
          </h3>
          <p className="text-sm text-muted leading-relaxed">
            {mod.description}
          </p>
        </div>

        {/* Tag */}
        <div className="pt-4 border-t border-white/5">
          <span className="text-xs font-medium text-primary/70 tracking-wide uppercase">
            {mod.tag}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── Main page ───────────────────────────────────── */
export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const heroRef = useInView(0.05);
  const statsRef = useInView(0.1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background particles */}
      <ParticleCanvas />

      {/* Background glow orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <div
          className="glow-orb w-[600px] h-[600px] bg-primary/10"
          style={{ top: "-15%", left: "-10%" }}
        />
        <div
          className="glow-orb w-[500px] h-[500px] bg-primary/8"
          style={{ bottom: "5%", right: "-8%", animationDelay: "3s" }}
        />
        <div
          className="glow-orb w-[300px] h-[300px] bg-primary-light/5"
          style={{ top: "40%", left: "50%", transform: "translateX(-50%)", animationDelay: "1.5s" }}
        />
      </div>

      {/* ── Header ─────────────────────────────────── */}
      <header
        className="relative w-full animate-fade-in"
        style={{ zIndex: 10 }}
      >
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Logo mark */}
            <div className="relative w-9 h-9">
              <div className="absolute inset-0 rounded-xl bg-primary/20 blur-md" />
              <div className="relative w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                <span className="text-white font-black text-base leading-none">P</span>
              </div>
            </div>
            <span className="text-xl font-black tracking-tight text-white">
              PREDDI
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-xs text-muted/50 font-mono">
              preddi.app
            </span>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-xs text-primary-light font-medium">Beta pronto</span>
            </div>
          </div>
        </div>
        {/* Header bottom line */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      </header>

      {/* ── Main ───────────────────────────────────── */}
      <main className="relative flex-1" style={{ zIndex: 5 }}>

        {/* ── Hero section ─────────────────────────── */}
        <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 md:pt-28 md:pb-20">
          <div
            ref={heroRef.ref}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Eyebrow badge */}
            <div className={`reveal ${heroRef.inView ? "visible" : ""} inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/25 bg-primary/5 backdrop-blur-sm mb-8`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5 text-primary">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
              </svg>
              <span className="text-sm text-primary-light font-medium tracking-wide">
                Próximamente — Únete a la lista de espera
              </span>
            </div>

            {/* Main headline */}
            <h1 className={`reveal delay-100 ${heroRef.inView ? "visible" : ""} text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.05] mb-6`}>
              <span className="text-white">Tu centro de</span>
              <br />
              <span className="text-shimmer">control inmobiliario</span>
            </h1>

            {/* Subtitle */}
            <p className={`reveal delay-200 ${heroRef.inView ? "visible" : ""} text-lg md:text-xl text-muted max-w-2xl mx-auto mb-12 leading-relaxed`}>
              Marketplace, administración de propiedades y remates judiciales
              en una sola plataforma. Todo lo que necesitas para gestionar
              tu portafolio inmobiliario.
            </p>

            {/* Waitlist form */}
            <div className={`reveal delay-300 ${heroRef.inView ? "visible" : ""} max-w-md mx-auto`}>
              {!submitted ? (
                <form onSubmit={handleSubmit} className="relative flex gap-2 sm:gap-3">
                  <div className="relative flex-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted/40 pointer-events-none">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu@email.com"
                      required
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-surface-light/80 backdrop-blur-sm border border-white/10 text-white placeholder:text-muted/40 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all text-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    className="relative px-5 sm:px-6 py-3.5 rounded-xl bg-primary text-white font-bold text-sm transition-all duration-200 cursor-pointer whitespace-nowrap overflow-hidden group hover:shadow-lg hover:shadow-primary/25 active:scale-95"
                  >
                    <span className="relative z-10">Unirme</span>
                    <div className="absolute inset-0 bg-primary-light opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </button>
                </form>
              ) : (
                <div className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-primary/10 border border-primary/20 backdrop-blur-sm animate-scale-in">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 text-primary">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="text-primary-light font-semibold text-sm">¡Estás en la lista!</p>
                    <p className="text-muted/60 text-xs">Te avisaremos cuando lancemos.</p>
                  </div>
                </div>
              )}
              <p className="text-xs text-muted/35 mt-3 text-center">
                Sin spam. Solo actualizaciones importantes.
              </p>
            </div>
          </div>
        </section>

        {/* ── Stats strip ──────────────────────────── */}
        <section className="max-w-6xl mx-auto px-6 pb-16">
          <div
            ref={statsRef.ref}
            className="grid grid-cols-3 gap-4 max-w-2xl mx-auto"
          >
            {stats.map((s, i) => (
              <div
                key={i}
                className={`reveal ${statsRef.inView ? "visible" : ""} text-center p-4 rounded-xl bg-surface/50 border border-white/5 backdrop-blur-sm`}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="text-2xl sm:text-3xl font-black text-primary mb-1">{s.value}</div>
                <div className="text-xs text-muted/60 leading-tight">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section heading ───────────────────────── */}
        <section className="max-w-6xl mx-auto px-6 pb-6">
          <div className="flex items-center gap-4 mb-2">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/8" />
            <span className="text-xs font-semibold text-muted/40 uppercase tracking-widest">
              Plataforma
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/8" />
          </div>
          <h2 className="text-center text-2xl sm:text-3xl font-bold text-white mb-1">
            Tres módulos. Una sola plataforma.
          </h2>
          <p className="text-center text-sm text-muted/60 mb-10">
            Diseñados para trabajar juntos y potenciar tu gestión inmobiliaria.
          </p>
        </section>

        {/* ── Module cards ─────────────────────────── */}
        <section className="max-w-6xl mx-auto px-6 pb-24 md:pb-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {modules.map((mod, i) => (
              <ModuleCard
                key={i}
                mod={mod}
                delay={`${i * 0.12}s`}
              />
            ))}
          </div>
        </section>

        {/* ── CTA bottom ───────────────────────────── */}
        <section className="max-w-6xl mx-auto px-6 pb-20">
          <div className="relative rounded-2xl overflow-hidden">
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent" />
            <div className="absolute inset-0 border border-primary/15 rounded-2xl" />
            {/* Content */}
            <div className="relative px-8 py-12 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                Sé el primero en acceder
              </h2>
              <p className="text-muted text-sm sm:text-base max-w-md mx-auto mb-8">
                Estamos construyendo el futuro de la gestión inmobiliaria.
                Regístrate ahora y obtén acceso anticipado.
              </p>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-primary hover:bg-primary-light text-white font-bold text-sm transition-all duration-200 hover:shadow-lg hover:shadow-primary/25 active:scale-95"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
                </svg>
                Unirme a la lista de espera
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ─────────────────────────────────── */}
      <footer className="relative w-full" style={{ zIndex: 5 }}>
        <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-primary/80 flex items-center justify-center">
              <span className="text-white font-black text-xs leading-none">P</span>
            </div>
            <p className="text-sm text-muted/60">
              Un proyecto de{" "}
              <a
                href="https://conceptobizarro.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary-light transition-colors font-semibold"
              >
                Concepto Bizarro
              </a>
            </p>
          </div>
          <p className="text-xs text-muted/30 font-mono">
            &copy; {new Date().getFullYear()} PREDDI
          </p>
        </div>
      </footer>
    </div>
  );
}
