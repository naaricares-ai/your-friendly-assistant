import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export default function Timeline({ items, className = '' }: TimelineProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Center line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-electric-blue/30 to-transparent" />

      {items.map((item, index) => (
        <TimelineEntry key={index} item={item} index={index} isLeft={index % 2 === 0} />
      ))}
    </div>
  );
}

function TimelineEntry({ item, index, isLeft }: { item: TimelineItem; index: number; isLeft: boolean }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className={`relative flex items-center mb-16 ${
        isLeft ? 'flex-row' : 'flex-row-reverse'
      }`}
    >
      {/* Content */}
      <div className={`w-1/2 ${isLeft ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
        <span className="text-number text-2xl gradient-text-clean">{item.year}</span>
        <h3 className="text-section text-xl text-white mt-2 mb-2">{item.title}</h3>
        <p className="font-body text-sm text-titanium">{item.description}</p>
      </div>

      {/* Center dot */}
      <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-deep-space border-2 border-electric-blue">
        <motion.div
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 rounded-full bg-electric-blue/30"
        />
      </div>

      {/* Empty space for other side */}
      <div className="w-1/2" />
    </motion.div>
  );
}
