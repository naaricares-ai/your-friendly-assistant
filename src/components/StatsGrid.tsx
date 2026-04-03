import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import AnimatedCounter from './AnimatedCounter';

interface Stat {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface StatsGridProps {
  stats: Stat[];
  className?: string;
}

export default function StatsGrid({ stats, className = '' }: StatsGridProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div ref={ref} className={`grid grid-cols-2 md:grid-cols-4 gap-6 ${className}`}>
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          whileHover={{ y: -5 }}
          className="glass-card-premium rounded-2xl p-6 text-center"
        >
          {stat.icon && (
            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-electric-blue/20 to-neon-purple/20 flex items-center justify-center">
              {stat.icon}
            </div>
          )}
          <div className="text-number text-4xl gradient-text-clean mb-2">
            <AnimatedCounter value={stat.value} />
          </div>
          <div className="text-label text-titanium">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
}
