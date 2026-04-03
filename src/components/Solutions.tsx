import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Brain, Bot, Cog, Monitor, ArrowUpRight } from 'lucide-react';
import { useStore } from '../lib/store';
import type { LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Brain,
  Bot,
  Cog,
  Monitor,
};

export default function Solutions() {
  const { data } = useStore();
  const { solutions } = data;
  
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="solutions" className="relative py-40 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-void" />
      <div className="absolute inset-0 luxury-grid opacity-20" />
      
      {/* Ambient lights */}
      <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-gradient-radial from-electric-blue/5 via-transparent to-transparent blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-gradient-radial from-neon-purple/5 via-transparent to-transparent blur-3xl" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-24"
        >
          <span className="text-label text-neon-purple mb-6 block">
            Our Solutions
          </span>
          <h2 className="text-section text-5xl md:text-6xl lg:text-7xl mb-8">
            <span className="text-white block">Cutting-Edge</span>
            <span className="text-headline text-4xl md:text-5xl gradient-text-clean block mt-2">Technology</span>
          </h2>
          <p className="font-body text-xl text-titanium max-w-2xl mx-auto">
            Comprehensive AI-powered solutions designed to transform how students learn.
          </p>
        </motion.div>

        {/* Solutions Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {solutions.map((solution, index) => {
            const IconComponent = iconMap[solution.icon] || Brain;
            
            return (
              <motion.div
                key={solution.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative"
              >
                <div className="holographic-card glass-card-premium rounded-3xl overflow-hidden h-full">
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <img 
                      src={solution.image} 
                      alt={solution.title}
                      className="w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-space via-deep-space/80 to-transparent" />
                  </div>
                  
                  <div className="relative p-10">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-8">
                      <div>
                        <motion.div 
                          className="w-14 h-14 rounded-2xl bg-gradient-to-br from-electric-blue/20 to-neon-purple/20 flex items-center justify-center mb-6 border border-white/10"
                          animate={hoveredIndex === index ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
                          transition={{ type: 'spring' as const, stiffness: 400 }}
                        >
                          <IconComponent className="w-7 h-7 text-electric-blue" />
                        </motion.div>
                        <h3 className="text-section text-3xl text-white">
                          {solution.title}
                          <span className="text-accent text-xl text-titanium block mt-1">{solution.subtitle}</span>
                        </h3>
                      </div>
                      <motion.div
                        animate={hoveredIndex === index ? { x: 0, opacity: 1 } : { x: -10, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ArrowUpRight className="w-6 h-6 text-electric-blue" />
                      </motion.div>
                    </div>
                    
                    {/* Description */}
                    <p className="font-body text-titanium leading-relaxed mb-8">
                      {solution.description}
                    </p>
                    
                    {/* Features */}
                    <div className="flex flex-wrap gap-2">
                      {solution.features.map((feature, i) => (
                        <span 
                          key={i}
                          className="px-4 py-2 rounded-full text-label bg-white/5 text-titanium border border-white/5"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Hover border effect */}
                  <motion.div 
                    className="absolute inset-0 rounded-3xl pointer-events-none"
                    animate={hoveredIndex === index ? {
                      boxShadow: '0 0 60px rgba(0, 212, 255, 0.15), inset 0 0 60px rgba(0, 212, 255, 0.05)'
                    } : {
                      boxShadow: '0 0 0px rgba(0, 212, 255, 0), inset 0 0 0px rgba(0, 212, 255, 0)'
                    }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-20"
        >
          <a
            href="#contact"
            className="btn-premium inline-flex items-center gap-3 px-10 py-5 rounded-full text-white"
          >
            <span className="relative z-10 font-body font-medium">Request Full Demo</span>
            <ArrowUpRight className="w-5 h-5 relative z-10" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
