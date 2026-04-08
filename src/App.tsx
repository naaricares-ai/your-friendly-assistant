import { useEffect, useState, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LoadingScreen from './components/LoadingScreen';
import SmoothScroll from './components/SmoothScroll';
import ScrollIndicator from './components/ScrollIndicator';
import BackToTop from './components/BackToTop';

const About = lazy(() => import('./components/About'));
const Solutions = lazy(() => import('./components/Solutions'));
const Showcase = lazy(() => import('./components/Showcase'));
const WhyUs = lazy(() => import('./components/WhyUs'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));
const Admin = lazy(() => import('./pages/Admin'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const Cookies = lazy(() => import('./pages/Cookies'));
const CustomCursor = lazy(() => import('./components/CustomCursor'));

function MainSite() {
  const [isLoading, setIsLoading] = useState(true);
  const [isTouchDevice] = useState(() => 
    typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)
  );

  // Handle hash-based scroll (including from legal page navigation)
  useEffect(() => {
    if (!isLoading && window.location.hash) {
      const id = window.location.hash.slice(1);
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 800);
    }
  }, [isLoading]);

  return (
    <>
      <LoadingScreen onComplete={() => setIsLoading(false)} />
      
      {/* Custom Cursor - desktop only */}
      {!isTouchDevice && (
        <Suspense fallback={null}>
          <CustomCursor />
        </Suspense>
      )}
      
      {!isLoading && (
        <SmoothScroll>
          <div className="min-h-screen bg-deep-space text-chrome-silver overflow-x-hidden">
            <Navbar />
            <main>
              <Hero />
              <Suspense fallback={<div className="min-h-screen" />}>
                <About />
                <Solutions />
                <Showcase />
                <WhyUs />
                <Testimonials />
                <Contact />
              </Suspense>
            </main>
            <Suspense fallback={null}>
              <Footer />
            </Suspense>
            <ScrollIndicator />
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
        <Route path="/admin" element={<Suspense fallback={null}><Admin /></Suspense>} />
        <Route path="/privacy" element={<Suspense fallback={null}><Privacy /></Suspense>} />
        <Route path="/terms" element={<Suspense fallback={null}><Terms /></Suspense>} />
        <Route path="/cookies" element={<Suspense fallback={null}><Cookies /></Suspense>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
