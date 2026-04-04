import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { useStore } from '../lib/store';

export default function Testimonials() {
  const { data } = useStore();
  const { testimonials, partnerSchools } = data;
  
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  if (testimonials.length === 0) return null;

  return (
    <section className="relative py-20 md:py-40 overflow-hidden">
      <div className="absolute inset-0 bg-deep-space" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-gradient-radial from-neon-purple/10 via-transparent to-transparent blur-3xl" />
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-12 md:mb-20"
        >
          <span className="text-label text-electric-blue mb-4 md:mb-6 block">Testimonials</span>
          <h2 className="text-section text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
            <span className="text-white block">Trusted by</span>
            <span className="text-accent text-2xl sm:text-3xl md:text-4xl lg:text-5xl gradient-text-clean block mt-2">Leaders</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 1 }}
        >
          <div className="glass-card-premium rounded-2xl md:rounded-[2rem] p-6 sm:p-10 md:p-16 text-center relative overflow-hidden">
            <Quote className="w-10 h-10 md:w-16 md:h-16 text-electric-blue/10 mx-auto mb-6 md:mb-8" />
            
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-section text-lg sm:text-xl md:text-2xl lg:text-3xl text-white leading-relaxed mb-6 md:mb-10">
                "{testimonials[activeIndex]?.quote}"
              </p>
              
              <div className="mb-6 md:mb-8">
                <div className="font-body text-base md:text-lg font-semibold text-white">
                  {testimonials[activeIndex]?.author}
                </div>
                <div className="font-body text-sm md:text-base text-titanium">
                  {testimonials[activeIndex]?.role}, <span className="text-accent">{testimonials[activeIndex]?.school}</span>
                </div>
              </div>
            </motion.div>
            
            <div className="flex items-center justify-center gap-4 md:gap-6">
              <button
                onClick={() => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 flex items-center justify-center text-titanium hover:text-white hover:border-electric-blue/50 transition-all"
              >
                <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
              </button>
              
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`h-1 rounded-full transition-all duration-500 ${
                      i === activeIndex ? 'w-8 bg-gradient-to-r from-electric-blue to-neon-purple' : 'w-4 bg-white/10'
                    }`}
                  />
                ))}
              </div>
              
              <button
                onClick={() => setActiveIndex((prev) => (prev + 1) % testimonials.length)}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 flex items-center justify-center text-titanium hover:text-white hover:border-electric-blue/50 transition-all"
              >
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-12 md:mt-20 text-center"
        >
          <p className="text-label text-titanium/60 mb-6 md:mb-8">Trusted by 500+ Schools Worldwide</p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {partnerSchools.map((school, i) => (
              <span key={i} className="text-section text-sm md:text-lg text-titanium/40">{school}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
