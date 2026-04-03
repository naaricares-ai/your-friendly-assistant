import { motion } from 'framer-motion';

interface GlowingOrbProps {
  color?: string;
  size?: number;
  className?: string;
  animate?: boolean;
}

export default function GlowingOrb({ 
  color = '#00D4FF', 
  size = 400,
  className = '',
  animate = true 
}: GlowingOrbProps) {
  return (
    <motion.div
      className={`absolute rounded-full pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color}20 0%, transparent 70%)`,
        filter: 'blur(60px)',
      }}
      animate={animate ? {
        scale: [1, 1.2, 1],
        opacity: [0.5, 0.8, 0.5],
      } : undefined}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}
