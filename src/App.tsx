import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import CustomCursor from '@/components/CustomCursor';
import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Skills from '@/sections/Skills';
import Experience from '@/sections/Experience';
import EducationSection from '@/sections/Education';
import Projects from '@/sections/Projects';
import LanguagesHobbies from '@/sections/LanguagesHobbies';
import Contact from '@/sections/Contact';
import Footer from '@/sections/Footer';

function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 300);
          return 100;
        }
        return p + 2;
      });
    }, 20);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-[#050505] flex items-center justify-center">
      <div className="text-center">
        <div className="font-mono text-[10px] tracking-widest text-white/30 mb-4">
          INITIALIZING SYSTEM
        </div>
        <div className="font-display text-3xl md:text-5xl font-light tracking-tight text-white/80 mb-8">
          OMKAR KIVADAR
        </div>
        <div className="w-64 h-px bg-white/10 mx-auto overflow-hidden">
          <div
            className="h-full bg-accent transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="font-mono text-[10px] text-accent/50 mt-3">
          {String(progress).padStart(3, '0')}%
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loading) {
      window.scrollTo(0, 0);
    }
  }, [loading]);

  return (
    <>
      <CustomCursor />
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <Navigation />
      <main className="relative w-full">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <EducationSection />
        <Projects />
        <LanguagesHobbies />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
