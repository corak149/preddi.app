"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useInView } from "@/hooks/useInView";

const ParticleCanvas = dynamic(() => import("@/components/ParticleCanvas"), {
  ssr: false,
});

/* ─────────────────────────────────────────────────────
   Data
───────────────────────────────────────────────────── */
const modules = [
  {
    number: "01",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
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
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
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
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971Zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 0 1-2.031.352 5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971Z" />
      </svg>
    ),
    title: "Remates Judiciales",
    description: "Accede a oportunidades de inversión en remates judiciales. Información verificada, alertas personalizadas y seguimiento del proceso legal en tiempo real.",
    tag: "Inversión · Alertas · Legal",
  },
];

const stats = [
  { value: "3",  label: "Módulos integrados" },
  { value: "1",  label: "Plataforma unificada" },
  { value: "∞",  label: "Propiedades gestionadas" },
];

/* ─────────────────────────────────────────────────────
   ModuleCard
───────────────────────────────────────────────────── */
function ModuleCard({
  mod,
  delayClass,
}: {
  mod: (typeof modules)[0];
  delayClass: string;
}) {
  const { ref, inView } = useInView(0.1);

  return (
    <div
      ref={ref}
      className={`reveal ${delayClass} ${inView ? "visible" : ""} card-glow flex flex-col rounded-2xl bg-surface-card border border-white/[0.07] overflow-hidden`}
    >
      {/* Teal top accent */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent flex-shrink-0" />

      <div className="flex flex-col gap-5 p-7 flex-1">
        {/* Icon + number */}
        <div className="flex items-start justify-between">
          <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary-light flex-shrink-0">
            {mod.icon}
          </div>
          <span className="text-4xl font-black text-white/[0.04] select-none leading-none">
            {mod.number}
          </span>
        </div>

        {/* Text */}
        <div className="flex-1 flex flex-col gap-2">
          <h3 className="text-base font-semibold text-white leading-snug">
            {mod.title}
          </h3>
          <p className="text-sm text-muted leading-relaxed">
            {mod.description}
          </p>
        </div>

        {/* Tag */}
        <div className="pt-4 border-t border-white/[0.06]">
          <span className="text-xs font-semibold text-primary/60 tracking-widest uppercase">
            {mod.tag}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   Page
───────────────────────────────────────────────────── */
export default function Home() {
  const [email, setEmail]       = useState("");
  const [submitted, setSubmitted] = useState(false);

  const heroRef  = useInView(0.05);
  const statsRef = useInView(0.1);
  const cardsRef = useInView(0.05);
  const ctaRef   = useInView(0.1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) { setSubmitted(true); setEmail(""); }
  };

  return (
    <div className="relative min-h-screen flex flex-col">

      {/* ── Particles ──────────────────────────────── */}
      <ParticleCanvas />

      {/* ── Glow orbs ──────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <div className="glow-orb w-[700px] h-[700px] bg-primary/[0.08]"
             style={{ top: "-20%", left: "-15%" }} />
        <div className="glow-orb w-[500px] h-[500px] bg-primary/[0.06]"
             style={{ bottom: "0%", right: "-12%", animationDelay: "3.5s" }} />
        <div className="glow-orb w-[350px] h-[350px] bg-primary-light/[0.04]"
             style={{ top: "38%", left: "50%", transform: "translateX(-50%)", animationDelay: "1.8s" }} />
      </div>

      {/* ══════════════════════════════════════════════
          HEADER
      ══════════════════════════════════════════════ */}
      <header className="relative w-full" style={{ zIndex: 10 }}>
        <div className="max-w-5xl mx-auto w-full px-6 py-5 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="relative w-8 h-8 flex-shrink-0">
              <div className="absolute inset-0 rounded-lg bg-primary/25 blur-sm" />
              <div className="relative w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-white font-black text-sm leading-none">P</span>
              </div>
            </div>
            <span className="text-lg font-black tracking-tight text-white">PREDDI</span>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <span className="hidden sm:block text-xs text-muted/40 font-mono">preddi.app</span>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse flex-shrink-0" />
              <span className="text-xs text-primary-light font-semibold whitespace-nowrap">Beta pronto</span>
            </div>
          </div>
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
      </header>

      {/* ══════════════════════════════════════════════
          MAIN
      ══════════════════════════════════════════════ */}
      <main className="relative flex-1 w-full" style={{ zIndex: 5 }}>

        {/* ── HERO ─────────────────────────────────── */}
        <section className="w-full">
          <div className="max-w-5xl mx-auto w-full px-6 pt-24 pb-20 md:pt-32 md:pb-24">

            {/* Hero inner — strictly centered */}
            <div ref={heroRef.ref} className="flex flex-col items-center text-center gap-8">

              {/* Badge */}
              <div className={`reveal ${heroRef.inView ? "visible" : ""}`}>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/25 bg-primary/[0.06] backdrop-blur-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5 text-primary flex-shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
                  </svg>
                  <span className="text-sm text-primary-light font-semibold">
                    Próximamente — Únete a la lista de espera
                  </span>
                </div>
              </div>

              {/* Headline */}
              <div className={`reveal reveal-delay-1 ${heroRef.inView ? "visible" : ""} w-full`}>
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.05] text-center">
                  <span className="text-white block">Tu centro de</span>
                  <span className="text-shimmer">control inmobiliario</span>
                </h1>
              </div>

              {/* Subtitle */}
              <div className={`reveal reveal-delay-2 ${heroRef.inView ? "visible" : ""} max-w-xl w-full`}>
                <p className="text-lg md:text-xl text-muted leading-relaxed text-center">
                  Marketplace, administración de propiedades y remates judiciales
                  en una sola plataforma. Todo lo que necesitas para gestionar
                  tu portafolio inmobiliario.
                </p>
              </div>

              {/* Waitlist form */}
              <div className={`reveal reveal-delay-3 ${heroRef.inView ? "visible" : ""} w-full max-w-md`}>
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="flex gap-2 sm:gap-3 w-full">
                    <div className="relative flex-1 min-w-0">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted/40 pointer-events-none flex-shrink-0">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                      </svg>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="tu@email.com"
                        required
                        className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-surface-light border border-white/10 text-white placeholder:text-muted/40 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all text-sm"
                      />
                    </div>
                    <button
                      type="submit"
                      className="flex-shrink-0 px-5 sm:px-6 py-3.5 rounded-xl bg-primary hover:bg-primary-light text-white font-bold text-sm transition-all duration-200 cursor-pointer whitespace-nowrap hover:shadow-lg hover:shadow-primary/20 active:scale-95"
                    >
                      Unirme
                    </button>
                  </form>
                ) : (
                  <div className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-primary/10 border border-primary/20 animate-scale-in">
                    <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5 text-primary">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-primary-light font-semibold text-sm">¡Estás en la lista!</p>
                      <p className="text-muted/60 text-xs">Te avisaremos cuando lancemos.</p>
                    </div>
                  </div>
                )}
                <p className="text-xs text-muted/30 mt-3 text-center">
                  Sin spam. Solo actualizaciones importantes.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* ── STATS ────────────────────────────────── */}
        <section className="w-full">
          <div className="max-w-5xl mx-auto w-full px-6 pb-20">
            <div ref={statsRef.ref} className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
              {stats.map((s, i) => (
                <div
                  key={i}
                  className={`reveal ${["", "reveal-delay-1", "reveal-delay-2"][i]} ${statsRef.inView ? "visible" : ""} flex flex-col items-center justify-center gap-1 p-5 rounded-2xl bg-surface border border-white/[0.06] text-center`}
                >
                  <span className="text-3xl font-black text-primary leading-none">{s.value}</span>
                  <span className="text-xs text-muted/60 leading-tight">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION LABEL ────────────────────────── */}
        <section className="w-full">
          <div className="max-w-5xl mx-auto w-full px-6 pb-10">
            <div className="flex items-center gap-4 mb-5">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/[0.07]" />
              <span className="text-[11px] font-bold text-muted/35 uppercase tracking-[0.2em] whitespace-nowrap">
                Plataforma
              </span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/[0.07]" />
            </div>
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                Tres módulos. Una sola plataforma.
              </h2>
              <p className="text-sm text-muted/60 max-w-md mx-auto">
                Diseñados para trabajar juntos y potenciar tu gestión inmobiliaria.
              </p>
            </div>
          </div>
        </section>

        {/* ── CARDS ────────────────────────────────── */}
        <section className="w-full">
          <div ref={cardsRef.ref} className="max-w-5xl mx-auto w-full px-6 pb-20 md:pb-28">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {modules.map((mod, i) => (
                <ModuleCard
                  key={i}
                  mod={mod}
                  delayClass={["", "reveal-delay-2", "reveal-delay-4"][i]}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────── */}
        <section className="w-full">
          <div ref={ctaRef.ref} className="max-w-5xl mx-auto w-full px-6 pb-24">
            <div className={`reveal ${ctaRef.inView ? "visible" : ""} relative rounded-2xl overflow-hidden`}>
              {/* Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.12] via-primary/[0.05] to-transparent pointer-events-none" />
              <div className="absolute inset-0 border border-primary/[0.15] rounded-2xl pointer-events-none" />

              {/* Content */}
              <div className="relative flex flex-col items-center text-center gap-6 px-8 py-14 sm:py-16">
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  Sé el primero en acceder
                </h2>
                <p className="text-muted text-sm sm:text-base max-w-sm leading-relaxed">
                  Estamos construyendo el futuro de la gestión inmobiliaria.
                  Regístrate ahora y obtén acceso anticipado.
                </p>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-primary hover:bg-primary-light text-white font-bold text-sm transition-all duration-200 hover:shadow-lg hover:shadow-primary/20 active:scale-95 cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 flex-shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
                  </svg>
                  Unirme a la lista de espera
                </button>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* ══════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════ */}
      <footer className="relative w-full" style={{ zIndex: 5 }}>
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
        <div className="max-w-5xl mx-auto w-full px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-primary flex items-center justify-center flex-shrink-0">
              <span className="text-white font-black text-[10px] leading-none">P</span>
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
          <p className="text-xs text-muted/25 font-mono">
            &copy; {new Date().getFullYear()} PREDDI
          </p>
        </div>
      </footer>

    </div>
  );
}
