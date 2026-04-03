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

  const nextTestimonial = () => setActiveIndex((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  if (testimonials.length === 0) return null;

  return (
    <section className="relative py-40 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-deep-space" />
      
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-neon-purple/10 via-transparent to-transparent blur-3xl" />
      
      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <span className="text-label text-electric-blue mb-6 block">
            Testimonials
          </span>
          <h2 className="text-section text-5xl md:text-6xl">
            <span className="text-white block">Trusted by</span>
            <span className="text-accent text-4xl md:text-5xl gradient-text-clean block mt-2">Leaders</span>
          </h2>
        </motion.div>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 1 }}
          className="relative"
        >
          <div className="glass-card-premium rounded-[2rem] p-12 md:p-16 text-center relative overflow-hidden">
            {/* Quote icon */}
            <Quote className="w-16 h-16 text-electric-blue/10 mx-auto mb-8" />
            
            {/* Quote text */}
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-section text-2xl md:text-3xl text-white leading-relaxed mb-10">
                "{testimonials[activeIndex]?.quote}"
              </p>
              
              <div className="mb-8">
                <div className="font-body text-lg font-semibold text-white">
                  {testimonials[activeIndex]?.author}
                </div>
                <div className="font-body text-titanium">
                  {testimonials[activeIndex]?.role}, <span className="text-accent">{testimonials[activeIndex]?.school}</span>
                </div>
              </div>
            </motion.div>
            
            {/* Navigation */}
            <div className="flex items-center justify-center gap-6">
              <button
                onClick={prevTestimonial}
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-titanium hover:text-white hover:border-electric-blue/50 transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`h-1 rounded-full transition-all duration-500 ${
                      i === activeIndex 
                        ? 'w-8 bg-gradient-to-r from-electric-blue to-neon-purple' 
                        : 'w-4 bg-white/10 hover:bg-white/20'
                    }`}
                  />
                ))}
              </div>
              
              <button
                onClick={nextTestimonial}
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-titanium hover:text-white hover:border-electric-blue/50 transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Partner logos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-20 text-center"
        >
          <p className="text-label text-titanium/50 mb-8">
            Trusted by 500+ Schools Worldwide
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            {partnerSchools.map((school, i) => (
              <span 
                key={i}
                className="text-section text-lg text-titanium/30 hover:text-titanium/60 transition-colors cursor-default"
              >
                {school}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
