import { useEffect, useRef, Suspense, lazy } from 'react';
import gsap from 'gsap';
import { personalInfo } from '@/data/portfolio';
import ErrorBoundary from '@/components/ErrorBoundary';

const HeroScene = lazy(() => import('@/three/HeroScene'));

function HeroFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative">
        <div className="w-48 h-48 md:w-64 md:h-64 border border-accent/20 rounded-full animate-spin" style={{ animationDuration: '20s' }} />
        <div className="absolute inset-4 border border-accent/10 rounded-full animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
        <div className="absolute inset-8 border border-accent/5 rounded-full animate-spin" style={{ animationDuration: '10s' }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 bg-accent/40 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.hero-line-top', { y: -30, opacity: 0, duration: 0.6 })
        .from('.hero-nav-meta', { opacity: 0, duration: 0.4 }, '-=0.3')
        .from(
          '.hero-name-char',
          {
            yPercent: 120,
            opacity: 0,
            duration: 0.8,
            stagger: 0.04,
            ease: 'power4.out',
          },
          '-=0.2'
        )
        .from('.hero-role', { opacity: 0, y: 20, duration: 0.6 }, '-=0.3')
        .from('.hero-intro', { opacity: 0, y: 20, duration: 0.5 }, '-=0.3')
        .from('.hero-cta', { opacity: 0, y: 20, duration: 0.5 }, '-=0.2')
        .from('.hero-bottom-meta', { opacity: 0, duration: 0.5 }, '-=0.2')
        .from('.hero-scene', { opacity: 0, duration: 1.2 }, 0.3);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  const nameChars = personalInfo.name.split('');

  const scrollToNext = () => {
    const el = document.getElementById('about');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-[#050505] noise"
    >
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* 3D Scene with error boundary and CSS fallback */}
      <div className="hero-scene absolute inset-0 z-10">
        <ErrorBoundary fallback={<HeroFallback />}>
          <Suspense fallback={<HeroFallback />}>
            <HeroScene mouseRef={mouseRef} />
          </Suspense>
        </ErrorBoundary>
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-b from-[#050505]/60 via-transparent to-[#050505]" />
      <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-r from-[#050505]/40 via-transparent to-[#050505]/40" />

      {/* Content */}
      <div className="relative z-30 flex min-h-screen flex-col justify-between px-6 md:px-12 pt-24 pb-8">
        {/* Top meta line */}
        <div className="hero-line-top flex items-center justify-between font-mono text-[10px] tracking-widest text-white/30">
          <span>PORTFOLIO / 2026</span>
          <span className="hidden sm:block">LAT 15.3647° N / LON 75.1000° E</span>
          <span>HUBBALLI, IN</span>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col justify-center max-w-6xl">
          {/* Section number */}
          <div className="hero-nav-meta font-mono text-[11px] tracking-widest text-accent/60 mb-6">
            01 / HOME
          </div>

          {/* Name */}
          <h1 className="font-display font-light leading-[0.9] tracking-tight overflow-hidden">
            <span className="block text-[clamp(2.5rem,10vw,8rem)]">
              {nameChars.map((char, i) => (
                <span
                  key={i}
                  className="hero-name-char inline-block"
                  style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
                >
                  {char}
                </span>
              ))}
            </span>
          </h1>

          {/* Role */}
          <div className="hero-role mt-6 flex items-center gap-4">
            <span className="h-px w-12 bg-accent/50" />
            <span className="font-mono text-xs md:text-sm tracking-[0.3em] text-accent-bright">
              {personalInfo.role}
            </span>
          </div>

          {/* Intro */}
          <p className="hero-intro mt-8 max-w-md text-sm md:text-base text-white/50 leading-relaxed font-light">
            Electrical engineering student turned software developer. Building systems that
            bridge hardware and code — from embedded RTOS to computer vision and full-stack tools.
          </p>

          {/* CTA */}
          <div className="hero-cta mt-10 flex items-center gap-6">
            <button
              onClick={scrollToNext}
              data-cursor="hover"
              className="magnetic group relative overflow-hidden border border-white/15 px-8 py-3 font-mono text-[11px] tracking-widest text-white/80 transition-colors hover:border-accent/50 hover:text-white"
            >
              <span className="relative z-10">VIEW WORK</span>
              <span className="absolute inset-0 bg-accent/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="font-mono text-[11px] tracking-widest text-white/40 hover:text-accent-bright transition-colors link-underline"
            >
              GITHUB ↗
            </a>
          </div>
        </div>

        {/* Bottom meta */}
        <div className="hero-bottom-meta flex items-end justify-between font-mono text-[10px] tracking-widest text-white/30">
          <div className="flex flex-col gap-1">
            <span className="text-white/20">SCROLL TO EXPLORE</span>
            <span className="text-accent/40 animate-pulse">↓</span>
          </div>
          <div className="hidden sm:flex flex-col items-end gap-1">
            <span className="text-white/20">STATUS</span>
            <span className="text-accent-bright/60">● AVAILABLE</span>
          </div>
        </div>
      </div>
    </section>
  );
}
