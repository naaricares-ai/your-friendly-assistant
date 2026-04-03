import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
}

export default function ScrollReveal({ 
  children, 
  className = '',
  direction = 'up',
  delay = 0,
  duration = 0.8
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const directions = {
    up: { y: 60, x: 0 },
    down: { y: -60, x: 0 },
    left: { y: 0, x: 60 },
    right: { y: 0, x: -60 },
  };

  return (
    <motion.div
      ref={ref}
      initial={{ 
        opacity: 0, 
        ...directions[direction],
        filter: 'blur(10px)'
      }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0, 
        x: 0,
        filter: 'blur(0px)'
      } : {}}
      transition={{ 
        duration,
        delay,
        ease: [0.23, 1, 0.32, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
