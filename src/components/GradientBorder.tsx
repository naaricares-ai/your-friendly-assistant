import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface GradientBorderProps {
  children: ReactNode;
  className?: string;
  borderWidth?: number;
  animate?: boolean;
}

export default function GradientBorder({ 
  children, 
  className = '',
  borderWidth = 1,
  animate = true 
}: GradientBorderProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Animated gradient border */}
      <motion.div
        className="absolute inset-0 rounded-[inherit]"
        style={{
          padding: borderWidth,
          background: 'linear-gradient(135deg, #00D4FF, #7B61FF, #FF00FF, #00D4FF)',
          backgroundSize: '300% 300%',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
        animate={animate ? {
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        } : undefined}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      
      {/* Content */}
      <div className="relative">
        {children}
      </div>
    </div>
  );
}
