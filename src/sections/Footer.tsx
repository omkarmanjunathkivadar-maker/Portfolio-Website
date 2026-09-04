import { personalInfo } from '@/data/portfolio';
import { Linkedin, Github, Instagram, Mail } from 'lucide-react';

export default function Footer() {
  const socialLinks = [
    { icon: Mail, href: `mailto:${personalInfo.email}`, label: 'Email' },
    { icon: Linkedin, href: personalInfo.linkedin, label: 'LinkedIn' },
    { icon: Github, href: personalInfo.github, label: 'GitHub' },
    { icon: Instagram, href: personalInfo.instagram, label: 'Instagram' },
  ];

  return (
    <footer className="relative w-full bg-[#050505] border-t border-white/5 py-12 md:py-16 overflow-hidden">
      <div className="absolute inset-0 grid-bg-fine opacity-10" />

      <div className="relative z-10 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          {/* Left: Name and role */}
          <div>
            <div className="font-mono text-[10px] tracking-widest text-white/30 mb-2">
              / END_OF_TRANSMISSION
            </div>
            <h3 className="font-display text-xl md:text-2xl font-light tracking-tight text-white/80 mb-1">
              {personalInfo.name}
            </h3>
            <p className="font-mono text-[11px] tracking-widest text-accent/50">
              {personalInfo.role}
            </p>
          </div>

          {/* Right: Social links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  data-cursor="hover"
                  aria-label={link.label}
                  className="group flex h-10 w-10 items-center justify-center border border-white/10 text-white/40 hover:text-accent-bright hover:border-accent/30 transition-all duration-300"
                >
                  <Icon size={16} />
                </a>
              );
            })}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[10px] tracking-widest text-white/20">
            © 2026 OMKAR KIVADAR. ALL RIGHTS RESERVED.
          </p>
          <p className="font-mono text-[10px] tracking-widest text-white/20">
            BUILT WITH REACT / GSAP / THREE.JS
          </p>
        </div>
      </div>
    </footer>
  );
}
