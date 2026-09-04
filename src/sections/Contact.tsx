import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { personalInfo } from '@/data/portfolio';
import { Mail, Phone, Linkedin, Github, Instagram, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-section-num', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        immediateRender: false,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      });

      gsap.from('.contact-name-char', {
        yPercent: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.03,
        ease: 'power4.out',
        immediateRender: false,
        scrollTrigger: { trigger: '.contact-name', start: 'top 75%' },
      });

      gsap.from('.contact-cta', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        immediateRender: false,
        scrollTrigger: { trigger: '.contact-cta', start: 'top 80%' },
      });

      gsap.from('.contact-link', {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.08,
        immediateRender: false,
        scrollTrigger: { trigger: '.contact-links', start: 'top 80%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const nameChars = personalInfo.name.split('');
  const ctaChars = "LET'S BUILD SOMETHING.".split('');

  const links = [
    {
      label: 'EMAIL',
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      icon: Mail,
      external: false,
    },
    {
      label: 'PHONE',
      value: personalInfo.phone,
      href: `tel:${personalInfo.phone.replace(/\s/g, '')}`,
      icon: Phone,
      external: false,
    },
    {
      label: 'LINKEDIN',
      value: 'omkar-kivadar',
      href: personalInfo.linkedin,
      icon: Linkedin,
      external: true,
    },
    {
      label: 'GITHUB',
      value: 'omkarkivadar-maker',
      href: personalInfo.github,
      icon: Github,
      external: true,
    },
    {
      label: 'INSTAGRAM',
      value: 'omkar.kivadar',
      href: personalInfo.instagram,
      icon: Instagram,
      external: true,
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-[#08080a] overflow-hidden flex flex-col justify-center py-24 md:py-32"
    >
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 px-6 md:px-12 max-w-7xl mx-auto w-full">
        {/* Section header */}
        <div className="contact-section-num flex items-center gap-4 mb-16 md:mb-24">
          <span className="font-mono text-[11px] tracking-widest text-accent/60">
            08 / CONTACT
          </span>
          <span className="h-px flex-1 max-w-[100px] bg-white/10" />
        </div>

        {/* Name */}
        <h2 className="contact-name font-display font-light leading-[0.9] tracking-tight overflow-hidden mb-8">
          <span className="block text-[clamp(2rem,8vw,6rem)]">
            {nameChars.map((char, i) => (
              <span
                key={i}
                className="contact-name-char inline-block"
                style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
              >
                {char}
              </span>
            ))}
          </span>
        </h2>

        {/* CTA */}
        <div className="contact-cta mb-16 md:mb-20">
          <h3 className="font-display font-light leading-tight tracking-tight text-[clamp(1.5rem,5vw,3.5rem)]">
            {ctaChars.map((char, i) => (
              <span
                key={i}
                className="inline-block text-stroke"
                style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
              >
                {char}
              </span>
            ))}
          </h3>
        </div>

        {/* Links */}
        <div className="contact-links grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-4xl">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                data-cursor="hover"
                className="contact-link group flex items-center gap-4 border border-white/5 bg-white/[0.01] p-5 md:p-6 hover:border-accent/20 hover:bg-accent/5 transition-all duration-300"
              >
                <Icon size={18} className="text-white/40 group-hover:text-accent-bright transition-colors duration-300" />
                <div className="flex-1">
                  <div className="font-mono text-[10px] tracking-widest text-white/30 mb-1">
                    {link.label}
                  </div>
                  <div className="text-sm text-white/70 group-hover:text-white transition-colors duration-300">
                    {link.value}
                  </div>
                </div>
                <ArrowUpRight
                  size={16}
                  className="text-white/20 group-hover:text-accent-bright group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
