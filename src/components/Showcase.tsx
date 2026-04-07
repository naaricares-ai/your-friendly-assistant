import { useRef, useState, useEffect, lazy, Suspense } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Canvas3DErrorBoundary from './Canvas3DErrorBoundary';

const ShowcaseCanvas = lazy(() => import('./ShowcaseCanvas'));

const showcaseItems = [
  {
    id: 1,
    title: 'Educational Robot',
    description: 'Our flagship AI-powered robot designed for K-12 education with adaptive learning capabilities.',
    emoji: '🤖',
  },
  {
    id: 2,
    title: 'Neural Processing',
    description: 'Advanced neural network visualization for understanding AI concepts in real-time.',
    emoji: '🧠',
  },
  {
    id: 3,
    title: 'Smart Circuit Lab',
    description: 'Interactive circuit board platform for electronics and engineering courses.',
    emoji: '⚡',
  },
];

export default function Showcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % showcaseItems.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="showcase" className="relative py-20 md:py-40 overflow-hidden">
      <div className="absolute inset-0 bg-deep-space" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-electric-blue/5 via-transparent to-transparent" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-12 md:mb-20"
        >
          <span className="text-label text-magenta-glow mb-4 md:mb-6 block">
            Interactive Experience
          </span>
          <h2 className="text-section text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-6 md:mb-8">
            <span className="text-white block">Experience</span>
            <span className="text-elegant text-2xl sm:text-3xl md:text-4xl lg:text-5xl gradient-text-premium block mt-2">Innovation</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 1 }}
        >
          <div className="glass-card-premium rounded-2xl md:rounded-[2rem] overflow-hidden">
            <div className="grid lg:grid-cols-5 min-h-[400px] md:min-h-[600px]">
              {/* 3D Canvas or fallback */}
              <div className="lg:col-span-3 relative bg-gradient-to-br from-deep-space to-obsidian min-h-[250px] md:min-h-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] md:w-[300px] h-[200px] md:h-[300px] bg-electric-blue/20 rounded-full blur-[80px] md:blur-[100px]" />
                
                <Canvas3DErrorBoundary>
                  <Suspense fallback={<div className="flex items-center justify-center h-full"><div className="w-16 h-16 rounded-full border-2 border-electric-blue/30 border-t-electric-blue animate-spin" /></div>}>
                    <ShowcaseCanvas activeIndex={activeIndex} />
                  </Suspense>
                </Canvas3DErrorBoundary>
              </div>
              
              {/* Info Panel */}
              <div className="lg:col-span-2 p-6 md:p-10 flex flex-col justify-center bg-gradient-to-br from-obsidian to-deep-space">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="text-label text-electric-blue mb-4 md:mb-6 block">
                      {String(activeIndex + 1).padStart(2, '0')} / {String(showcaseItems.length).padStart(2, '0')}
                    </span>
                    <h3 className="text-section text-2xl md:text-3xl lg:text-4xl text-white mb-4 md:mb-6">
                      {showcaseItems[activeIndex].title}
                    </h3>
                    <p className="font-body text-base md:text-lg text-titanium leading-relaxed mb-6 md:mb-10">
                      {showcaseItems[activeIndex].description}
                    </p>
                    
                    <div className="space-y-3 md:space-y-4 mb-6 md:mb-10">
                      {['Real-time Interaction', 'AI-Powered Learning', 'Adaptive Curriculum'].map((feature, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-electric-blue" />
                          <span className="font-body text-sm md:text-base text-titanium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
                
                <div className="flex items-center gap-4">
                  {showcaseItems.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIndex(i)}
                      className={`relative h-1 rounded-full transition-all duration-500 ${
                        i === activeIndex 
                          ? 'w-12 bg-gradient-to-r from-electric-blue to-neon-purple' 
                          : 'w-6 bg-white/10 hover:bg-white/20'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
