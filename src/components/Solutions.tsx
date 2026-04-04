import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Brain, Bot, Cog, Monitor, ArrowUpRight } from 'lucide-react';
import { useStore } from '../lib/store';
import type { LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = { Brain, Bot, Cog, Monitor };

export default function Solutions() {
  const { data } = useStore();
  const { solutions } = data;
  
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  

  return (
    <section id="solutions" className="relative py-20 md:py-40 overflow-hidden">
      <div className="absolute inset-0 bg-void" />
      <div className="absolute inset-0 luxury-grid opacity-20" />
      <div className="absolute top-1/4 left-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-gradient-radial from-electric-blue/5 via-transparent to-transparent blur-3xl" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-12 md:mb-24"
        >
          <span className="text-label text-neon-purple mb-4 md:mb-6 block">Our Solutions</span>
          <h2 className="text-section text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-6 md:mb-8">
            <span className="text-white block">Cutting-Edge</span>
            <span className="text-headline text-2xl sm:text-3xl md:text-4xl lg:text-5xl gradient-text-clean block mt-2">Technology</span>
          </h2>
          <p className="font-body text-base md:text-xl text-titanium max-w-2xl mx-auto">
            Comprehensive AI-powered solutions designed to transform how students learn.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
          {solutions.map((solution, index) => {
            const IconComponent = iconMap[solution.icon] || Brain;
            return (
              <motion.div
                key={solution.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                className="group relative"
              >
                <div className="holographic-card glass-card-premium rounded-2xl md:rounded-3xl overflow-hidden h-full">
                  <div className="absolute inset-0">
                    <img 
                      src={solution.image} 
                      alt={solution.title}
                      loading="lazy"
                      className="w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-space via-deep-space/80 to-transparent" />
                  </div>
                  
                  <div className="relative p-6 md:p-10">
                    <div className="flex items-start justify-between mb-6 md:mb-8">
                      <div>
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gradient-to-br from-electric-blue/20 to-neon-purple/20 flex items-center justify-center mb-4 md:mb-6 border border-white/10">
                          <IconComponent className="w-6 h-6 md:w-7 md:h-7 text-electric-blue" />
                        </div>
                        <h3 className="text-section text-xl md:text-3xl text-white">
                          {solution.title}
                          <span className="text-accent text-sm md:text-xl text-titanium block mt-1">{solution.subtitle}</span>
                        </h3>
                      </div>
                      <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 text-electric-blue opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    
                    <p className="font-body text-sm md:text-base text-titanium/90 leading-relaxed mb-6 md:mb-8">
                      {solution.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {solution.features.map((feature, i) => (
                        <span 
                          key={i}
                          className="px-3 md:px-4 py-1.5 md:py-2 rounded-full text-label text-[10px] md:text-xs bg-white/5 text-titanium/80 border border-white/5"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-12 md:mt-20"
        >
          <a
            href="#contact"
            className="btn-premium inline-flex items-center gap-3 px-8 md:px-10 py-4 md:py-5 rounded-full text-white"
          >
            <span className="relative z-10 font-body font-medium text-sm md:text-base">Request Full Demo</span>
            <ArrowUpRight className="w-5 h-5 relative z-10" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
