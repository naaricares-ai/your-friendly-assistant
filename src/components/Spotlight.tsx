import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface SpotlightProps {
  children: React.ReactNode;
  className?: string;
}

export default function Spotlight({ children, className = '' }: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Spotlight effect */}
      <motion.div
        className="absolute pointer-events-none"
        animate={{
          x: position.x - 200,
          y: position.y - 200,
          opacity: isHovering ? 1 : 0,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 200 }}
        style={{
          width: 400,
          height: 400,
          background: 'radial-gradient(circle, rgba(0, 212, 255, 0.15) 0%, transparent 70%)',
        }}
      />
      
      {children}
    </div>
  );
}
