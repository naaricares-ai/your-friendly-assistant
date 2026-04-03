import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'revealing' | 'complete'>('loading');

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setPhase('revealing');
          setTimeout(() => {
            setPhase('complete');
            onComplete();
          }, 600);
          return 100;
        }
        return prev + Math.random() * 25;
      });
    }, 80);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'complete' && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="fixed inset-0 z-[9999] bg-deep-space flex items-center justify-center"
        >
          {/* Background effects */}
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-electric-blue/10 via-transparent to-transparent blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-neon-purple/10 via-transparent to-transparent blur-3xl" />
          </div>
          
          {/* Content */}
          <div className="relative text-center">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              className="mb-12"
            >
              <h1 className="text-hero-alt text-6xl md:text-8xl">
                <motion.span
                  className="inline-block text-white"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  ORY
                </motion.span>
                <motion.span
                  className="inline-block gradient-text-premium"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  ZE
                </motion.span>
              </h1>
            </motion.div>
            
            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 300 }}
              transition={{ delay: 0.6 }}
              className="relative mx-auto"
            >
              <div className="h-[2px] bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-electric-blue via-neon-purple to-magenta-glow"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ ease: 'easeOut' }}
                />
              </div>
              
              {/* Progress text */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-6 flex justify-between items-center"
              >
                <span className="text-label text-titanium/50">
                  Initializing
                </span>
                <span className="text-number text-sm text-electric-blue">
                  {Math.min(Math.round(progress), 100)}%
                </span>
              </motion.div>
            </motion.div>
            
            {/* Decorative elements */}
            <motion.div
              className="absolute -top-20 -left-20 w-40 h-40"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <div className="w-full h-full border border-electric-blue/10 rounded-full" />
            </motion.div>
            <motion.div
              className="absolute -bottom-20 -right-20 w-32 h-32"
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            >
              <div className="w-full h-full border border-neon-purple/10 rounded-full" />
            </motion.div>
          </div>
          
          {/* Reveal overlay */}
          {phase === 'revealing' && (
            <motion.div
              initial={{ scaleY: 1 }}
              animate={{ scaleY: 0 }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              style={{ originY: 0 }}
              className="absolute inset-0 bg-deep-space"
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
