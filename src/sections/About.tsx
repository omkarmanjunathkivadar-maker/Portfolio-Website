import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { aboutStatement, aboutText, aboutHighlights } from '@/data/portfolio';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section number
      gsap.from('.about-section-num', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        immediateRender: false,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      });

      // Statement - word by word reveal
      const words = aboutStatement.split(' ');
      gsap.from('.about-statement-word', {
        opacity: 0,
        yPercent: 100,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power4.out',
        immediateRender: false,
        scrollTrigger: { trigger: '.about-statement', start: 'top 75%' },
      });

      // Profile text
      gsap.from('.about-profile', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        immediateRender: false,
        scrollTrigger: { trigger: '.about-profile', start: 'top 80%' },
      });

      // Highlights
      gsap.from('.about-highlight', {
        opacity: 0,
        x: -20,
        duration: 0.5,
        stagger: 0.1,
        immediateRender: false,
        scrollTrigger: { trigger: '.about-highlights', start: 'top 80%' },
      });

      // Decorative line
      gsap.from('.about-line-grow', {
        scaleX: 0,
        transformOrigin: 'left',
        duration: 1.2,
        ease: 'power2.out',
        immediateRender: false,
        scrollTrigger: { trigger: '.about-line-grow', start: 'top 85%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const words = aboutStatement.split(' ');

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-[#08080a] overflow-hidden py-24 md:py-32"
    >
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg-fine opacity-30" />

      <div className="relative z-10 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Section header */}
        <div className="about-section-num flex items-center gap-4 mb-16 md:mb-24">
          <span className="font-mono text-[11px] tracking-widest text-accent/60">02 / ABOUT</span>
          <span className="h-px flex-1 max-w-[100px] bg-white/10" />
        </div>

        {/* Large statement */}
        <div className="about-statement mb-16 md:mb-24">
          <h2 className="font-display font-light leading-[0.95] tracking-tight text-[clamp(2rem,8vw,6rem)]">
            {words.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
                <span className="about-statement-word inline-block">
                  {word}
                </span>
              </span>
            ))}
          </h2>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16">
          {/* Left: Profile text */}
          <div className="lg:col-span-7">
            <p className="about-profile text-lg md:text-xl text-white/60 leading-relaxed font-light max-w-2xl">
              {aboutText}
            </p>

            <div className="about-line-grow h-px w-full bg-gradient-to-r from-accent/40 to-transparent my-12 max-w-md" />

            <div className="about-highlights space-y-4">
              {aboutHighlights.map((item, i) => (
                <div key={i} className="about-highlight flex items-start gap-4">
                  <span className="font-mono text-[10px] text-accent/50 mt-1.5">
                    0{i + 1}
                  </span>
                  <span className="text-sm text-white/50 font-light">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Metadata panel */}
          <div className="lg:col-span-5 lg:pl-8">
            <div className="border border-white/5 bg-white/[0.01] p-6 md:p-8 backdrop-blur-sm">
              <div className="font-mono text-[10px] tracking-widest text-white/30 mb-6">
                / PROFILE_DATA
              </div>
              <div className="space-y-5">
                <div>
                  <div className="font-mono text-[10px] text-white/30 mb-1">DISCIPLINE</div>
                  <div className="text-sm text-white/70">Electrical & Electronics Engineering</div>
                </div>
                <div>
                  <div className="font-mono text-[10px] text-white/30 mb-1">FOCUS</div>
                  <div className="text-sm text-white/70">Software Development / Embedded Systems</div>
                </div>
                <div>
                  <div className="font-mono text-[10px] text-white/30 mb-1">CORE STACK</div>
                  <div className="text-sm text-white/70">C++ / Python / DSA / OOP</div>
                </div>
                <div>
                  <div className="font-mono text-[10px] text-white/30 mb-1">LOCATION</div>
                  <div className="text-sm text-white/70">Hubballi, Karnataka, India</div>
                </div>
                <div>
                  <div className="font-mono text-[10px] text-white/30 mb-1">STATUS</div>
                  <div className="text-sm text-accent-bright">Open to opportunities</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
