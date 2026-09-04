import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skillCategories } from '@/data/portfolio';

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.skills-section-num', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        immediateRender: false,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      });

      gsap.from('.skills-category-item', {
        opacity: 0,
        x: -30,
        duration: 0.5,
        stagger: 0.08,
        immediateRender: false,
        scrollTrigger: { trigger: '.skills-categories', start: 'top 75%' },
      });

      gsap.from('.skills-panel', {
        opacity: 0,
        scale: 0.95,
        duration: 0.8,
        immediateRender: false,
        scrollTrigger: { trigger: '.skills-panel', start: 'top 80%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCategoryChange = (index: number) => {
    if (index === activeCategory) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveCategory(index);
      setIsTransitioning(false);
    }, 200);
  };

  const current = skillCategories[activeCategory];

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-[#050505] overflow-hidden py-24 md:py-32"
    >
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="relative z-10 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Section header */}
        <div className="skills-section-num flex items-center gap-4 mb-16 md:mb-24">
          <span className="font-mono text-[11px] tracking-widest text-accent/60">03 / SKILLS</span>
          <span className="h-px flex-1 max-w-[100px] bg-white/10" />
        </div>

        {/* Section title */}
        <h2 className="font-display font-light leading-tight tracking-tight text-[clamp(1.8rem,5vw,3.5rem)] mb-16 md:mb-20">
          TECHNICAL <span className="text-stroke">ARSENAL</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
          {/* Left: Category list */}
          <div className="skills-categories lg:col-span-5">
            <div className="font-mono text-[10px] tracking-widest text-white/30 mb-6">
              / SELECT_CATEGORY
            </div>
            <div className="space-y-1">
              {skillCategories.map((cat, idx) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(idx)}
                  data-cursor="hover"
                  className={`skills-category-item group flex items-center gap-4 w-full text-left py-4 border-b border-white/5 transition-all duration-300 ${
                    activeCategory === idx ? 'pl-4' : 'pl-0'
                  }`}
                >
                  <span
                    className={`font-mono text-[10px] transition-colors duration-300 ${
                      activeCategory === idx ? 'text-accent-bright' : 'text-white/30'
                    }`}
                  >
                    {cat.number}
                  </span>
                  <span
                    className={`font-display text-base md:text-lg font-light tracking-wide transition-colors duration-300 ${
                      activeCategory === idx
                        ? 'text-white'
                        : 'text-white/40 group-hover:text-white/70'
                    }`}
                  >
                    {cat.label}
                  </span>
                  {activeCategory === idx && (
                    <span className="ml-auto font-mono text-[10px] text-accent-bright">●</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Dynamic panel */}
          <div className="skills-panel lg:col-span-7">
            <div className="relative border border-white/8 bg-white/[0.01] p-8 md:p-12 min-h-[400px] overflow-hidden">
              {/* Decorative corner accents */}
              <span className="absolute top-0 left-0 w-4 h-4 border-t border-l border-accent/40" />
              <span className="absolute top-0 right-0 w-4 h-4 border-t border-r border-accent/40" />
              <span className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-accent/40" />
              <span className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-accent/40" />

              {/* Background grid */}
              <div className="absolute inset-0 grid-bg-fine opacity-20" />

              <div
                className={`relative z-10 transition-all duration-300 ${
                  isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                }`}
              >
                {/* Category label */}
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-[10px] text-accent/50">{current.number}</span>
                  <span className="font-mono text-[10px] tracking-widest text-white/30">
                    / {current.label}
                  </span>
                </div>

                {/* Skills display */}
                <div className="mt-8 space-y-6">
                  {current.skills.map((skill, i) => (
                    <div
                      key={skill}
                      className="group flex items-center gap-6"
                      style={{
                        animation: isTransitioning
                          ? 'none'
                          : `slideIn 0.5s ${i * 0.08}s both`,
                      }}
                    >
                      <span className="font-mono text-[10px] text-accent/40 w-8">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="font-display text-2xl md:text-3xl font-light text-white/80 group-hover:text-accent-bright transition-colors duration-300">
                        {skill}
                      </span>
                      <span className="h-px flex-1 bg-white/5 group-hover:bg-accent/20 transition-colors duration-300" />
                    </div>
                  ))}
                </div>

                {/* Bottom indicator */}
                <div className="mt-12 flex items-center justify-between font-mono text-[10px] text-white/20">
                  <span>SKILLS: {String(current.skills.length).padStart(2, '0')}</span>
                  <span>
                    {String(activeCategory + 1).padStart(2, '0')} /{' '}
                    {String(skillCategories.length).padStart(2, '0')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
}
