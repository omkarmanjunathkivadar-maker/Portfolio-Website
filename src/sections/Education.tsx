import { education } from '@/data/portfolio';

export default function EducationSection() {

  return (
    <section
      id="education"
      className="relative w-full bg-[#050505] overflow-hidden py-24 md:py-32"
    >
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="relative z-10 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Section header */}
        <div className="edu-section-num flex items-center gap-4 mb-16 md:mb-20">
          <span className="font-mono text-[11px] tracking-widest text-accent/60">
            05 / EDUCATION
          </span>
          <span className="h-px flex-1 max-w-[100px] bg-white/10" />
        </div>

        {/* Title */}
        <h2 className="edu-title font-display font-light leading-tight tracking-tight text-[clamp(1.8rem,5vw,3.5rem)] mb-16 md:mb-20">
          ACADEMIC <span className="text-stroke">FOUNDATION</span>
        </h2>

        {/* Cards */}
        <div className="edu-grid space-y-6 md:space-y-8">
          {education.map((item, i) => (
            <div
              key={item.id}
              className="edu-card group relative border border-white/5 bg-white/[0.01] p-6 md:p-8 hover:border-accent/20 transition-all duration-500"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                {/* Left */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-mono text-[10px] text-accent/50">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="h-px w-8 bg-accent/30" />
                  </div>
                  <h3 className="font-display text-lg md:text-xl font-light text-white/90 mb-2 leading-snug">
                    {item.degree}
                  </h3>
                  <p className="text-sm text-white/40 font-light">{item.institution}</p>
                </div>

                {/* Right */}
                <div className="md:text-right">
                  <div className="font-mono text-[11px] text-white/30 mb-1">{item.period}</div>
                  <div className="font-mono text-sm text-accent-bright">{item.result}</div>
                </div>
              </div>

              {/* Hover indicator */}
              <span className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-accent/0 via-accent/20 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
