import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { useRef, lazy, Suspense } from 'react';
import { useStore } from '../lib/store';
import MagneticButton from './MagneticButton';
import Marquee from './Marquee';
import { useIsMobile } from '../hooks/useIsMobile';
import Canvas3DErrorBoundary from './Canvas3DErrorBoundary';

const ParticleField = lazy(() => import('./ParticleField'));
const AIBrain = lazy(() => import('./AIBrain'));
const VideoBackground = lazy(() => import('./VideoBackground'));
const FloatingElements = lazy(() => import('./FloatingElements'));
const GlowingOrb = lazy(() => import('./GlowingOrb'));

export default function Hero() {
  const { data } = useStore();
  const { hero } = data;
  const isMobile = useIsMobile();
  
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  // Letter animation variants
  const letterVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -45 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        delay: i * 0.02,
        duration: 0.6,
        ease: [0.23, 1, 0.32, 1] as [number, number, number, number]
      }
    })
  };

  const AnimatedText = ({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) => (
    <span className={`inline-block overflow-hidden ${className}`}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          custom={i + delay * 10}
          variants={letterVariants}
          initial="hidden"
          animate="visible"
          className="inline-block"
          style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );

  return (
    <section 
      id="home" 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {!isMobile && (
        <Suspense fallback={null}>
          <VideoBackground 
            src="/videos/hero-bg.mp4" 
            fallbackImage="/images/luxury-bg.jpg"
          />
        </Suspense>
      )}
      
      {/* Deep Background */}
      <div className="absolute inset-0 bg-deep-space/40" />
      
      <Suspense fallback={null}>
        {isMobile ? (
          <GlowingOrb color="#00D4FF" size={300} className="top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        ) : (
          <>
            <GlowingOrb color="#00D4FF" size={600} className="top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2" />
            <GlowingOrb color="#7B61FF" size={500} className="bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2" animate />
          </>
        )}
      </Suspense>
      
      {/* Luxury Grid */}
      <div className="absolute inset-0 luxury-grid opacity-20" />
      
      <Suspense fallback={null}>
        {!isMobile && <FloatingElements count={15} />}
        {!isMobile && (
          <div className="absolute inset-0 opacity-30">
            <Canvas3DErrorBoundary>
              <ParticleField />
            </Canvas3DErrorBoundary>
          </div>
        )}
      </Suspense>
      
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(5,5,7,0.8)_100%)]" />
      
      {/* Content */}
      <motion.div 
        style={isMobile ? {} : { y, opacity, scale }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-24 md:py-32 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
      >
        {/* Left - Text Content */}
        <div className="text-center lg:text-left">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-3 mb-6 md:mb-8"
          >
            <motion.span 
              className="h-px w-12 bg-gradient-to-r from-electric-blue to-transparent"
              initial={{ width: 0 }}
              animate={{ width: 48 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
            <span className="text-label text-electric-blue">
              {hero.eyebrow}
            </span>
          </motion.div>
          
          {/* Main Heading */}
          <h1 className="mb-6 md:mb-8 perspective-1000">
            <div className="text-hero text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white overflow-visible">
              <AnimatedText text={hero.title1} delay={0} />
            </div>
            <div className="text-hero text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white overflow-visible">
              <AnimatedText text={hero.title2} delay={0.3} />
            </div>
            <div className="text-hero-alt text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl gradient-text-premium overflow-visible mt-1 md:mt-2 whitespace-nowrap">
              <AnimatedText text={hero.title3} delay={0.6} />
            </div>
            <div className="text-elegant text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-electric-blue overflow-visible mt-1">
              <AnimatedText text={hero.title4} delay={0.9} />
            </div>
          </h1>
          
          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="font-body text-base md:text-lg lg:text-xl text-titanium leading-relaxed mb-8 md:mb-10 max-w-xl mx-auto lg:mx-0"
          >
            {hero.subtitle}
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
          >
            <MagneticButton
              href="#solutions"
              className="btn-premium px-6 sm:px-8 py-3 sm:py-4 rounded-full text-white flex items-center justify-center gap-3 group"
            >
              <span className="relative z-10 font-body font-medium text-sm sm:text-base">{hero.ctaPrimary}</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            </MagneticButton>
            <MagneticButton
              href="#showcase"
              className="btn-ghost px-6 sm:px-8 py-3 sm:py-4 rounded-full text-white flex items-center justify-center gap-3"
            >
              <Play className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-body font-medium text-sm sm:text-base">{hero.ctaSecondary}</span>
            </MagneticButton>
          </motion.div>
          
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.6 }}
            className="grid grid-cols-3 gap-2 sm:gap-8 mt-10 md:mt-16 pt-8 md:pt-10 border-t border-white/5 overflow-hidden"
          >
            {hero.stats.map((stat, index) => (
              <div key={index} className="text-center lg:text-left min-w-0">
                <div className="text-number text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1 truncate">
                  {stat.value}
                </div>
                <div className="text-label text-[8px] sm:text-xs text-titanium/80 truncate">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
        
        {/* Right - 3D AI Brain */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className={`relative ${isMobile ? 'h-[280px] mt-4' : 'h-[500px] lg:h-[700px] hidden lg:block'}`}
          data-cursor="drag"
        >
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${isMobile ? 'w-[200px] h-[200px]' : 'w-[400px] h-[400px]'} bg-electric-blue/20 rounded-full blur-[100px]`} />
          {!isMobile && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-neon-purple/20 rounded-full blur-[80px]" />}
          
          <Canvas3DErrorBoundary>
            <Suspense fallback={null}><AIBrain /></Suspense>
          </Canvas3DErrorBoundary>
          
          {/* Floating UI Cards - desktop only */}
          {!isMobile && (
            <>
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-16 right-8 glass-card-premium p-4 rounded-2xl backdrop-blur-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-electric-blue/30 to-neon-purple/30 flex items-center justify-center">
                    <span className="text-lg">🤖</span>
                  </div>
                  <div>
                    <div className="font-body text-sm font-medium text-white">AI Systems</div>
                    <div className="text-label text-[10px] text-electric-blue">Online</div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute bottom-32 left-4 glass-card-premium p-4 rounded-2xl backdrop-blur-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-aurora-green/30 to-electric-blue/30 flex items-center justify-center">
                    <span className="text-lg">⚡</span>
                  </div>
                  <div>
                    <div className="font-body text-sm font-medium text-white">Processing</div>
                    <div className="text-label text-[10px] text-aurora-green">98.7% Efficiency</div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </motion.div>
      </motion.div>
      
      {/* Bottom Marquee */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden py-4 md:py-8 border-t border-white/5">
        <Marquee 
          items={['ARTIFICIAL INTELLIGENCE', 'ROBOTICS', 'AUTOMATION', 'SMART LEARNING', 'FUTURE READY']} 
          speed={40}
        />
      </div>
    </section>
  );
}
