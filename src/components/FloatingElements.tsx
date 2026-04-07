import { motion } from 'framer-motion';
import { useEffect, useState, memo } from 'react';
import { useIsMobile } from '../hooks/useIsMobile';

interface FloatingElement {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  type: 'circle' | 'ring' | 'dot';
}

export default memo(function FloatingElements({ count = 20 }: { count?: number }) {
  const [elements, setElements] = useState<FloatingElement[]>([]);
  const isMobile = useIsMobile();
  
  // Reduce count on mobile for performance
  const actualCount = isMobile ? Math.min(count, 6) : count;

  useEffect(() => {
    const newElements: FloatingElement[] = Array.from({ length: actualCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 5,
      type: ['circle', 'ring', 'dot'][Math.floor(Math.random() * 3)] as 'circle' | 'ring' | 'dot',
    }));
    setElements(newElements);
  }, [actualCount]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {elements.map((el) => (
        <motion.div
          key={el.id}
          className="absolute will-change-transform"
          style={{
            left: `${el.x}%`,
            top: `${el.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: el.duration,
            repeat: Infinity,
            delay: el.delay,
            ease: 'easeInOut',
          }}
        >
          {el.type === 'circle' && (
            <div
              className="rounded-full bg-electric-blue/30"
              style={{ width: el.size, height: el.size }}
            />
          )}
          {el.type === 'ring' && (
            <div
              className="rounded-full border border-neon-purple/20"
              style={{ width: el.size * 2, height: el.size * 2 }}
            />
          )}
          {el.type === 'dot' && (
            <div
              className="rounded-full bg-magenta-glow/40"
              style={{ width: el.size / 2, height: el.size / 2 }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
});
