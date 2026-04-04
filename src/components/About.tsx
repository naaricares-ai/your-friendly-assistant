import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useStore } from '../lib/store';
import { useIsMobile } from '../hooks/useIsMobile';

export default function About() {
  const { data } = useStore();
  const { about } = data;
  const isMobile = useIsMobile();
  
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="about" ref={containerRef} className="relative py-20 md:py-40 overflow-hidden">
      <div className="absolute inset-0 bg-deep-space" />
      
      {!isMobile && (
        <motion.div 
          style={{ y }}
          className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-radial from-neon-purple/8 via-transparent to-transparent blur-3xl"
        />
      )}
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-start mb-16 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
          >
            <span className="text-label text-electric-blue mb-4 md:mb-6 block">
              {about.eyebrow}
            </span>
            <h2 className="text-section text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
              <span className="text-white block">{about.title1}</span>
              <span className="text-accent text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl gradient-text-clean block mt-2">
                {about.title2}
              </span>
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:pt-20"
          >
            <p className="font-body text-base md:text-xl text-titanium leading-relaxed mb-6 md:mb-8">
              {about.description1}
            </p>
            <p className="font-body text-sm md:text-lg text-titanium/80 leading-relaxed">
              {about.description2}
            </p>
          </motion.div>
        </div>

        {/* Values */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          {about.values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 + index * 0.15 }}
              className="group"
            >
              <div className="holographic-card glass-card-premium p-6 md:p-10 rounded-2xl md:rounded-3xl h-full relative">
                <span className="text-number text-6xl md:text-8xl font-bold text-white/5 absolute top-4 md:top-6 right-4 md:right-6">
                  {value.number}
                </span>
                <div className="relative">
                  <h3 className="text-section text-lg md:text-2xl text-white mb-3 md:mb-4 group-hover:text-electric-blue transition-colors duration-500">
                    {value.title}
                  </h3>
                  <p className="font-body text-sm md:text-base text-titanium/90 leading-relaxed">
                    {value.description}
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric-blue/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Banner */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 md:mt-32"
        >
          <div className="glass-card-premium rounded-2xl md:rounded-3xl p-6 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-electric-blue/50 to-transparent" />
            
            <div className="relative grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 text-center">
              {about.stats.map((stat, index) => (
                <div key={index}>
                  <div className="text-number text-3xl sm:text-4xl md:text-5xl lg:text-6xl gradient-text-clean mb-2">
                    {stat.number}
                  </div>
                  <div className="text-label text-[10px] sm:text-xs text-titanium/70">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
