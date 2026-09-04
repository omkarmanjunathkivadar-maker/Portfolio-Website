import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { certifications } from '@/data/portfolio';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.exp-section-num', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        immediateRender: false,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      });

      gsap.from('.exp-title', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        immediateRender: false,
        scrollTrigger: { trigger: '.exp-title', start: 'top 75%' },
      });

      gsap.from('.exp-item', {
        opacity: 0,
        x: -30,
        duration: 0.6,
        stagger: 0.15,
        immediateRender: false,
        scrollTrigger: { trigger: '.exp-list', start: 'top 75%' },
      });

      gsap.from('.exp-line-grow', {
        scaleY: 0,
        transformOrigin: 'top',
        duration: 1.2,
        ease: 'power2.out',
        immediateRender: false,
        scrollTrigger: { trigger: '.exp-list', start: 'top 70%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative w-full bg-[#08080a] overflow-hidden py-24 md:py-32"
    >
      <div className="absolute inset-0 grid-bg-fine opacity-20" />

      <div className="relative z-10 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Section header */}
        <div className="exp-section-num flex items-center gap-4 mb-16 md:mb-24">
          <span className="font-mono text-[11px] tracking-widest text-accent/60">
            04 / EXPERIENCE
          </span>
          <span className="h-px flex-1 max-w-[100px] bg-white/10" />
        </div>

        {/* Title */}
        <h2 className="exp-title font-display font-light leading-tight tracking-tight text-[clamp(1.8rem,5vw,3.5rem)] mb-4">
          CERTIFICATIONS &<br />
          <span className="text-stroke">VIRTUAL EXPERIENCE</span>
        </h2>

        <p className="font-mono text-[11px] tracking-widest text-white/30 mb-16 md:mb-20">
          / VIRTUAL_EXPERIENCE_PROGRAMS — NOT EMPLOYMENT
        </p>

        {/* Timeline */}
        <div className="exp-list relative">
          {/* Vertical line */}
          <div className="exp-line-grow absolute left-0 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-accent/40 via-white/10 to-transparent" />

          <div className="space-y-12 md:space-y-16">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="exp-item relative pl-8 md:pl-20"
              >
                {/* Dot */}
                <span className="absolute left-0 md:left-8 top-2 -translate-x-1/2 flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-accent/30 animate-ping" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-accent" />
                </span>

                <div className="flex flex-col md:flex-row md:items-start md:gap-12">
                  {/* Number */}
                  <div className="font-mono text-[10px] tracking-widest text-accent/50 mb-2 md:mb-0 md:w-16">
                    {cert.number}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="font-display text-lg md:text-xl font-light text-white/90 mb-2 leading-snug">
                      {cert.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="font-mono text-xs text-accent-bright">{cert.organization}</span>
                      <span className="text-white/20">—</span>
                      <span className="font-mono text-xs text-white/40">{cert.platform}</span>
                    </div>
                    <div className="h-px w-16 bg-accent/30" />
                  </div>

                  {/* Tag */}
                  <div className="mt-4 md:mt-0">
                    <span className="inline-block border border-white/10 px-3 py-1 font-mono text-[10px] tracking-widest text-white/40">
                      CERTIFIED
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
