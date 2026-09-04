import { useState, useEffect } from 'react';
import { navItems } from '@/data/portfolio';
import { useActiveSection } from '@/hooks/useActiveSection';
import { Menu, X } from 'lucide-react';

const sectionIds = navItems.map((n) => n.id);

export default function Navigation() {
  const activeSection = useActiveSection(sectionIds);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-[#050505]/80 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-6 md:px-12 py-5">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="font-mono text-xs tracking-widest text-white/90 hover:text-accent-bright transition-colors"
          >
            <span className="text-accent">/</span> OK
          </button>

          {/* Desktop nav items */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="group relative px-4 py-2 font-mono text-[11px] tracking-widest transition-all duration-300"
              >
                <span
                  className={`transition-colors duration-300 ${
                    activeSection === item.id
                      ? 'text-accent-bright'
                      : 'text-white/40 group-hover:text-white/80'
                  }`}
                >
                  <span className="text-accent/50 mr-1.5">{item.number}</span>
                  {item.label}
                </span>
                {activeSection === item.id && (
                  <span className="absolute -bottom-px left-4 right-4 h-px bg-accent" />
                )}
              </button>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white/80 z-50"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-[#050505] flex flex-col justify-center px-8">
          <div className="space-y-2">
            {navItems.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="block w-full text-left transition-all duration-500"
                style={{
                  transform: mobileOpen ? 'translateY(0)' : 'translateY(20px)',
                  opacity: mobileOpen ? 1 : 0,
                  transitionDelay: `${idx * 60}ms`,
                }}
              >
                <div className="flex items-baseline gap-4 py-3 border-b border-white/5">
                  <span className="font-mono text-xs text-accent/50">{item.number}</span>
                  <span
                    className={`font-display text-2xl font-light tracking-wide transition-colors ${
                      activeSection === item.id ? 'text-accent-bright' : 'text-white/70'
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
