import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Solutions from './components/Solutions';
import Showcase from './components/Showcase';
import WhyUs from './components/WhyUs';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Admin from './pages/Admin';
import CustomCursor from './components/CustomCursor';
import LoadingScreen from './components/LoadingScreen';
import SmoothScroll from './components/SmoothScroll';
import ScrollIndicator from './components/ScrollIndicator';
import BackToTop from './components/BackToTop';

function MainSite() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Smooth scroll behavior for anchor links
    const handleClick = (e: Event) => {
      const target = e.currentTarget as HTMLAnchorElement;
      const href = target.getAttribute('href');
      if (href?.startsWith('#')) {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({
          behavior: 'smooth'
        });
      }
    };

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', handleClick);
    });

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', handleClick);
      });
    };
  }, []);

  return (
    <>
      {/* Loading Screen */}
      <LoadingScreen onComplete={() => setIsLoading(false)} />
      
      {/* Custom Cursor */}
      <CustomCursor />
      
      {!isLoading && (
        <SmoothScroll>
          <div className="min-h-screen bg-deep-space text-chrome-silver overflow-x-hidden">
            {/* Noise overlay for cinematic texture */}
            <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.012]" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }} />
            
            <Navbar />
            <main>
              <Hero />
              <About />
              <Solutions />
              <Showcase />
              <WhyUs />
              <Testimonials />
              <Contact />
            </main>
            <Footer />
            
            {/* Scroll Indicator */}
            <ScrollIndicator />
            
            {/* Back to Top */}
            <BackToTop />
          </div>
        </SmoothScroll>
      )}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainSite />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
