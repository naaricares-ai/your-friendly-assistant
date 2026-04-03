import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface InteractiveCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export default function InteractiveCard({ 
  children, 
  className = '',
  glowColor = '#00D4FF'
}: InteractiveCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={`relative ${className}`}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(600px circle at ${mouseX.get() * 100 + 50}% ${mouseY.get() * 100 + 50}%, ${glowColor}15, transparent 40%)`,
        }}
        animate={{ opacity: isHovered ? 1 : 0 }}
      />
      
      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 rounded-[inherit] overflow-hidden pointer-events-none"
        style={{ transform: 'translateZ(1px)' }}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(105deg, transparent 40%, ${glowColor}10 45%, ${glowColor}20 50%, ${glowColor}10 55%, transparent 60%)`,
            transform: `translateX(${mouseX.get() * 100}%)`,
          }}
        />
      </motion.div>
      
      {/* Content */}
      <div style={{ transform: 'translateZ(20px)' }}>
        {children}
      </div>
    </motion.div>
  );
}
