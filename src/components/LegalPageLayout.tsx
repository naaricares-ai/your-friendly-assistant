import { type ReactNode, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from './Navbar';
import FloatingElements from './FloatingElements';

const Footer = lazy(() => import('./Footer'));

interface LegalPageLayoutProps {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}

export default function LegalPageLayout({ title, lastUpdated, children }: LegalPageLayoutProps) {
  return (
    <div className="min-h-screen bg-deep-space text-chrome-silver relative overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-electric-blue/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-neon-purple/5 rounded-full blur-[100px]" />
        <FloatingElements count={12} />
      </div>

      <Navbar />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 md:pt-32 md:pb-24">
        <Link to="/" className="inline-flex items-center gap-2 text-electric-blue hover:text-cyan-glow transition-colors mb-8 font-body text-sm">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-hero text-3xl md:text-5xl text-white mb-4">{title}</h1>
          <p className="text-label text-titanium/60 mb-12">{lastUpdated}</p>

          <div className="space-y-10 font-body text-base md:text-lg text-titanium/80 leading-relaxed glass-card-premium p-6 md:p-10 rounded-2xl">
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
