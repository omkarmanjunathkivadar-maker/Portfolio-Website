import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { languages, hobbies } from '@/data/portfolio';

gsap.registerPlugin(ScrollTrigger);

export default function LanguagesHobbies() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.lh-section-num', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        immediateRender: false,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      });

      gsap.from('.lang-item', {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.1,
        immediateRender: false,
        scrollTrigger: { trigger: '.lang-list', start: 'top 80%' },
      });

      gsap.from('.hobby-item', {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.1,
        immediateRender: false,
        scrollTrigger: { trigger: '.hobby-list', start: 'top 80%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#050505] overflow-hidden py-24 md:py-32"
    >
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="relative z-10 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Section header */}
        <div className="lh-section-num flex items-center gap-4 mb-16 md:mb-20">
          <span className="font-mono text-[11px] tracking-widest text-accent/60">
            07 / PROFILE
          </span>
          <span className="h-px flex-1 max-w-[100px] bg-white/10" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {/* Languages */}
          <div>
            <div className="font-mono text-[10px] tracking-widest text-white/30 mb-8">
              / LANGUAGES
            </div>
            <div className="lang-list space-y-5">
              {languages.map((lang, i) => (
                <div key={lang} className="lang-item group flex items-center gap-6">
                  <span className="font-mono text-[10px] text-accent/40 w-8">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-display text-xl md:text-2xl font-light text-white/60 group-hover:text-white transition-colors duration-300">
                    {lang}
                  </span>
                  <span className="h-px flex-1 bg-white/5 group-hover:bg-accent/20 transition-colors duration-300" />
                </div>
              ))}
            </div>
          </div>

          {/* Hobbies */}
          <div>
            <div className="font-mono text-[10px] tracking-widest text-white/30 mb-8">
              / HOBBIES
            </div>
            <div className="hobby-list space-y-5">
              {hobbies.map((hobby, i) => (
                <div key={hobby} className="hobby-item group flex items-center gap-6">
                  <span className="font-mono text-[10px] text-accent/40 w-8">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-display text-xl md:text-2xl font-light text-white/60 group-hover:text-white transition-colors duration-300">
                    {hobby}
                  </span>
                  <span className="h-px flex-1 bg-white/5 group-hover:bg-accent/20 transition-colors duration-300" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
