import { useRef } from 'react';
import type { ReactNode } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 50,
    stiffness: 400,
  });

  return (
    <div ref={containerRef}>
      {children}
      
      {/* Progress indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-electric-blue via-neon-purple to-magenta-glow z-50 origin-left"
        style={{ scaleX: smoothProgress }}
      />
    </div>
  );
}
