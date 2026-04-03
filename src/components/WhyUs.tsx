import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Sparkles, Shield, Zap, GraduationCap, HeartHandshake, TrendingUp } from 'lucide-react';

const reasons = [
  {
    icon: Sparkles,
    title: 'Innovation First',
    description: 'Pioneering solutions at the forefront of educational technology.',
    stat: '50+',
    statLabel: 'Patents',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-grade encryption with full COPPA/FERPA compliance.',
    stat: '100%',
    statLabel: 'Compliant',
  },
  {
    icon: Zap,
    title: 'Rapid Deployment',
    description: 'Get operational in weeks with our plug-and-play solutions.',
    stat: '2-4',
    statLabel: 'Weeks',
  },
  {
    icon: GraduationCap,
    title: 'Future-Ready',
    description: 'Prepare students for careers in AI, robotics, and beyond.',
    stat: '85%',
    statLabel: 'Career Ready',
  },
  {
    icon: HeartHandshake,
    title: 'Dedicated Support',
    description: '24/7 technical support with dedicated success managers.',
    stat: '24/7',
    statLabel: 'Support',
  },
  {
    icon: TrendingUp,
    title: 'Proven Results',
    description: 'Significant improvements in STEM engagement and scores.',
    stat: '40%',
    statLabel: 'Improvement',
  },
];

export default function WhyUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });
  
  const x = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section id="why-us" className="relative py-40 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-void" />
      
      {/* Horizontal light beam */}
      <motion.div 
        style={{ x }}
        className="absolute top-1/2 -translate-y-1/2 left-0 w-[200%] h-px bg-gradient-to-r from-transparent via-electric-blue/30 to-transparent"
      />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-24"
        >
          <span className="text-label text-cyan-glow mb-6 block">
            Why Choose Us
          </span>
          <h2 className="text-section text-5xl md:text-6xl lg:text-7xl mb-8">
            <span className="text-white block">The ORYZE</span>
            <span className="text-headline text-4xl md:text-5xl gradient-text-clean block mt-2">Advantage</span>
          </h2>
          <p className="font-body text-xl text-titanium max-w-2xl mx-auto">
            We don't just provide technology—we partner with schools to create transformative experiences.
          </p>
        </motion.div>

        {/* Reasons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 + index * 0.1 }}
              className="group"
            >
              <div className="holographic-card glass-card-premium rounded-2xl p-8 h-full relative overflow-hidden">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-electric-blue/10 to-neon-purple/10 flex items-center justify-center border border-white/5">
                    <reason.icon className="w-6 h-6 text-electric-blue" />
                  </div>
                  <div className="text-right">
                    <div className="text-number text-3xl gradient-text-clean">
                      {reason.stat}
                    </div>
                    <div className="text-label text-[10px] text-titanium/50">
                      {reason.statLabel}
                    </div>
                  </div>
                </div>
                
                <h3 className="text-section text-xl text-white mb-3 group-hover:text-electric-blue transition-colors duration-500">
                  {reason.title}
                </h3>
                <p className="font-body text-sm text-titanium leading-relaxed">
                  {reason.description}
                </p>
                
                {/* Hover line */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric-blue/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
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
            className="btn-premium inline-flex items-center gap-3 px-12 py-5 rounded-full text-white"
          >
            <span className="relative z-10 font-body font-medium">Partner With Us</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
