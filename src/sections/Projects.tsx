import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects, type Project } from '@/data/portfolio';

gsap.registerPlugin(ScrollTrigger);

function ProjectVisual({ theme }: { theme: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      t += 0.01;

      if (theme === 'search') {
        // Shopkart: animated search nodes
        const nodes = 12;
        for (let i = 0; i < nodes; i++) {
          const angle = (i / nodes) * Math.PI * 2 + t * 0.3;
          const x = w / 2 + Math.cos(angle) * (60 + Math.sin(t + i) * 20);
          const y = h / 2 + Math.sin(angle) * (60 + Math.cos(t + i) * 20);
          ctx.beginPath();
          ctx.arc(x, y, 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(139, 92, 246, ${0.3 + Math.sin(t + i) * 0.2})`;
          ctx.fill();
          // Lines to center
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(w / 2, h / 2);
          ctx.strokeStyle = 'rgba(139, 92, 246, 0.08)';
          ctx.stroke();
        }
        // Center node
        ctx.beginPath();
        ctx.arc(w / 2, h / 2, 6, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(167, 139, 250, 0.6)';
        ctx.fill();
        // Search bar mock
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.strokeRect(20, h - 40, w - 40, 24);
        ctx.fillStyle = 'rgba(139, 92, 246, 0.3)';
        ctx.fillRect(20, h - 40, (w - 40) * (0.3 + Math.sin(t) * 0.2), 24);
      } else if (theme === 'embedded') {
        // RTOS: sensor waveform + grid
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        for (let x = 0; x < w; x += 20) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, h);
          ctx.stroke();
        }
        for (let y = 0; y < h; y += 20) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(w, y);
          ctx.stroke();
        }
        // Waveform
        ctx.strokeStyle = 'rgba(139, 92, 246, 0.5)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        for (let x = 0; x < w; x++) {
          const y =
            h / 2 +
            Math.sin(x * 0.02 + t * 2) * 30 +
            Math.sin(x * 0.05 + t) * 15;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.lineWidth = 1;
        // Second waveform
        ctx.strokeStyle = 'rgba(59, 130, 246, 0.3)';
        ctx.beginPath();
        for (let x = 0; x < w; x++) {
          const y = h / 2 + Math.sin(x * 0.03 + t * 1.5) * 20;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        // Status indicators
        ctx.fillStyle = 'rgba(139, 92, 246, 0.6)';
        ctx.font = '8px monospace';
        ctx.fillText('TEMP: ' + (35 + Math.sin(t) * 5).toFixed(1) + '°C', 10, 15);
        ctx.fillText('FAN: ON', 10, 28);
        ctx.fillText('MOTOR: AUTO', 10, 41);
      } else if (theme === 'signal') {
        // Heart rate: ECG-style signal
        ctx.strokeStyle = 'rgba(139, 92, 246, 0.08)';
        ctx.beginPath();
        ctx.moveTo(0, h / 2);
        ctx.lineTo(w, h / 2);
        ctx.stroke();

        // ECG line
        ctx.strokeStyle = 'rgba(167, 139, 250, 0.6)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        const beat = 60;
        for (let x = 0; x < w; x++) {
          const phase = (x + t * 100) % beat;
          let y = h / 2;
          if (phase > 25 && phase < 30) y -= (phase - 25) * 8;
          else if (phase >= 30 && phase < 35) y += (35 - phase) * 8 - 40;
          else if (phase >= 35 && phase < 40) y -= (phase - 35) * 4;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.lineWidth = 1;

        // BPM
        ctx.fillStyle = 'rgba(139, 92, 246, 0.6)';
        ctx.font = '20px monospace';
        ctx.fillText((72 + Math.sin(t * 2) * 3).toFixed(0), w - 50, h - 15);
        ctx.font = '8px monospace';
        ctx.fillText('BPM', w - 50, h - 5);

        // Face detection box
        ctx.strokeStyle = 'rgba(59, 130, 246, 0.3)';
        ctx.strokeRect(w / 2 - 30, h / 2 - 35, 60, 70);
        ctx.fillStyle = 'rgba(59, 130, 246, 0.15)';
        ctx.fillRect(w / 2 - 30, h / 2 - 35, 60, 70);
        ctx.fillStyle = 'rgba(59, 130, 246, 0.5)';
        ctx.font = '7px monospace';
        ctx.fillText('ROI', w / 2 - 8, h / 2 + 40);
      } else if (theme === 'diff') {
        // File diff: code comparison
        const lineHeight = 14;
        const lines = [
          { text: 'function compare(a, b) {', type: 'normal' },
          { text: '  if (a.length > b.length)', type: 'removed' },
          { text: '  const diff = lcs(a, b);', type: 'added' },
          { text: '  return diff;', type: 'normal' },
          { text: '}', type: 'normal' },
        ];
        ctx.font = '9px monospace';
        lines.forEach((line, i) => {
          const y = 20 + i * lineHeight;
          if (line.type === 'added') {
            ctx.fillStyle = 'rgba(139, 92, 246, 0.1)';
            ctx.fillRect(0, y - 10, w, lineHeight);
            ctx.fillStyle = 'rgba(167, 139, 250, 0.7)';
            ctx.fillText('+ ' + line.text, 10, y);
          } else if (line.type === 'removed') {
            ctx.fillStyle = 'rgba(239, 68, 68, 0.08)';
            ctx.fillRect(0, y - 10, w, lineHeight);
            ctx.fillStyle = 'rgba(239, 68, 68, 0.5)';
            ctx.fillText('- ' + line.text, 10, y);
          } else {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.fillText('  ' + line.text, 10, y);
          }
        });
        // Animated cursor
        const cursorY = 20 + (Math.floor(t * 2) % lines.length) * lineHeight;
        ctx.strokeStyle = 'rgba(139, 92, 246, 0.6)';
        ctx.beginPath();
        ctx.moveTo(10 + 100 * (0.5 + Math.sin(t * 3) * 0.5), cursorY - 8);
        ctx.lineTo(10 + 100 * (0.5 + Math.sin(t * 3) * 0.5), cursorY + 2);
        ctx.stroke();
        // File labels
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.font = '7px monospace';
        ctx.fillText('v1.txt → v2.txt', w - 70, 12);
      }

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: 'block' }}
    />
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeProject, setActiveProject] = useState(0);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.proj-section-num', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        immediateRender: false,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      });

      gsap.from('.proj-title', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        immediateRender: false,
        scrollTrigger: { trigger: '.proj-title', start: 'top 75%' },
      });

      // Pin the projects section
      const triggers: ScrollTrigger[] = [];

      projectRefs.current.forEach((ref, idx) => {
        if (!ref) return;
        const st = ScrollTrigger.create({
          trigger: ref,
          start: 'top 60%',
          end: 'bottom 40%',
          onEnter: () => setActiveProject(idx),
          onEnterBack: () => setActiveProject(idx),
        });
        triggers.push(st);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative w-full bg-[#08080a] overflow-hidden py-24 md:py-32"
    >
      <div className="absolute inset-0 grid-bg-fine opacity-20" />

      <div className="relative z-10 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Section header */}
        <div className="proj-section-num flex items-center gap-4 mb-16 md:mb-24">
          <span className="font-mono text-[11px] tracking-widest text-accent/60">
            06 / PROJECTS
          </span>
          <span className="h-px flex-1 max-w-[100px] bg-white/10" />
        </div>

        {/* Title */}
        <h2 className="proj-title font-display font-light leading-tight tracking-tight text-[clamp(1.8rem,5vw,3.5rem)] mb-16 md:mb-24">
          SELECTED <span className="text-stroke">WORK</span>
        </h2>

        {/* Projects */}
        <div className="space-y-24 md:space-y-32">
          {projects.map((project: Project, idx) => (
            <div
              key={project.id}
              ref={(el) => {
                projectRefs.current[idx] = el;
              }}
              className={`proj-item transition-all duration-700 ${
                activeProject === idx ? 'opacity-100' : 'opacity-50'
              }`}
            >
              {/* Project number */}
              <div className="flex items-center gap-4 mb-6">
                <span className="font-mono text-[10px] tracking-widest text-accent/50">
                  PROJECT {project.number}
                </span>
                <span className="h-px flex-1 max-w-[60px] bg-white/10" />
                <span className="font-mono text-[10px] text-white/30">{project.date}</span>
              </div>

              {/* Content grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
                {/* Left: Text content */}
                <div className="lg:col-span-6 order-2 lg:order-1">
                  <h3 className="font-display text-2xl md:text-4xl font-light leading-tight tracking-tight mb-4">
                    {project.title}
                  </h3>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="border border-white/10 px-3 py-1 font-mono text-[10px] tracking-wider text-white/50"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Description */}
                  <p className="text-sm md:text-base text-white/50 leading-relaxed font-light max-w-lg mb-6">
                    {project.description}
                  </p>

                  {/* Achievement */}
                  {project.achievement && (
                    <div className="border-l-2 border-accent pl-4 py-2 mb-6">
                      <div className="font-mono text-[10px] tracking-widest text-accent/60 mb-1">
                        / ACHIEVEMENT
                      </div>
                      <p className="text-sm text-accent-bright font-light">{project.achievement}</p>
                    </div>
                  )}
                </div>

                {/* Right: Visual */}
                <div className="lg:col-span-6 order-1 lg:order-2">
                  <div className="relative border border-white/8 bg-[#0c0c0f] aspect-[4/3] overflow-hidden">
                    {/* Corner accents */}
                    <span className="absolute top-0 left-0 w-4 h-4 border-t border-l border-accent/40 z-10" />
                    <span className="absolute top-0 right-0 w-4 h-4 border-t border-r border-accent/40 z-10" />
                    <span className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-accent/40 z-10" />
                    <span className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-accent/40 z-10" />

                    {/* Visual canvas */}
                    <ProjectVisual theme={project.theme} />

                    {/* Overlay label */}
                    <div className="absolute top-3 left-6 font-mono text-[9px] tracking-widest text-white/30 z-10">
                      / VISUAL_{project.theme.toUpperCase()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
