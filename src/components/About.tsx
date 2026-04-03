import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useStore } from '../lib/store';

export default function About() {
  const { data } = useStore();
  const { about } = data;
  
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="about" ref={containerRef} className="relative py-40 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-deep-space" />
      
      {/* Ambient Light */}
      <motion.div 
        style={{ y }}
        className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-radial from-neon-purple/8 via-transparent to-transparent blur-3xl"
      />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-20 items-start mb-32">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
          >
            <span className="text-label text-electric-blue mb-6 block">
              {about.eyebrow}
            </span>
            <h2 className="text-section text-5xl md:text-6xl lg:text-7xl">
              <span className="text-white block">{about.title1}</span>
              <span className="text-accent text-4xl md:text-5xl lg:text-6xl gradient-text-clean block mt-2">
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
            <p className="font-body text-xl text-titanium leading-relaxed mb-8">
              {about.description1}
            </p>
            <p className="font-body text-lg text-titanium/70 leading-relaxed">
              {about.description2}
            </p>
          </motion.div>
        </div>

        {/* Values */}
        <div className="grid md:grid-cols-3 gap-8">
          {about.values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 + index * 0.15 }}
              className="group"
            >
              <div className="holographic-card glass-card-premium p-10 rounded-3xl h-full relative">
                <span className="text-number text-8xl font-bold text-white/5 absolute top-6 right-6">
                  {value.number}
                </span>
                <div className="relative">
                  <h3 className="text-section text-2xl text-white mb-4 group-hover:text-electric-blue transition-colors duration-500">
                    {value.title}
                  </h3>
                  <p className="font-body text-titanium leading-relaxed">
                    {value.description}
                  </p>
                </div>
                
                {/* Bottom accent line */}
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
          className="mt-32"
        >
          <div className="glass-card-premium rounded-3xl p-12 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-electric-blue/50 to-transparent" />
            
            <div className="relative grid md:grid-cols-4 gap-12 text-center">
              {about.stats.map((stat, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ y: -5 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <div className="text-number text-5xl md:text-6xl gradient-text-clean mb-2">
                    {stat.number}
                  </div>
                  <div className="text-label text-titanium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
