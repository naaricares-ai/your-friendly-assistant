import { type ReactNode, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import FloatingElements from './FloatingElements';

const Footer = lazy(() => import('./Footer'));
const CustomCursor = lazy(() => import('./CustomCursor'));

interface LegalPageLayoutProps {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}

export default function LegalPageLayout({ title, lastUpdated, children }: LegalPageLayoutProps) {
  const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  return (
    <div className="min-h-screen bg-deep-space text-chrome-silver relative overflow-hidden">
      {!isTouchDevice && (
        <Suspense fallback={null}>
          <CustomCursor />
        </Suspense>
      )}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-electric-blue/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-neon-purple/5 rounded-full blur-[100px]" />
        <FloatingElements count={12} />
      </div>

      <Navbar />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 sm:pt-28 sm:pb-16 md:pt-32 md:pb-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-hero text-2xl sm:text-3xl md:text-5xl text-white mb-3 sm:mb-4">{title}</h1>
          <p className="text-label text-titanium/60 mb-8 sm:mb-12 text-xs sm:text-sm">{lastUpdated}</p>

          <div className="space-y-8 sm:space-y-10 font-body text-sm sm:text-base md:text-lg text-titanium/80 leading-relaxed glass-card-premium p-4 sm:p-6 md:p-10 rounded-xl sm:rounded-2xl">
            {children}
          </div>
        </motion.div>
      </div>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}
