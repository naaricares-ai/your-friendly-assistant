import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HoverCardProps {
  children: React.ReactNode;
  hoverContent: React.ReactNode;
  className?: string;
}

export default function HoverCard({ children, hoverContent, className = '' }: HoverCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-4 z-50"
          >
            <div className="glass-card-premium rounded-xl p-4 min-w-[200px]">
              {/* Arrow */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 bg-obsidian border-l border-t border-white/10" />
              <div className="relative">
                {hoverContent}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
