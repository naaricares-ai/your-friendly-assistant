import { motion } from 'framer-motion';

interface MarqueeProps {
  items: string[];
  speed?: number;
  className?: string;
  separator?: string;
}

export default function Marquee({ 
  items, 
  speed = 30,
  className = '',
  separator = '•'
}: MarqueeProps) {
  const duplicatedItems = [...items, ...items, ...items];

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ['0%', '-33.333%'] }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {duplicatedItems.map((item, index) => (
          <span
            key={index}
            className="flex items-center mx-8 text-impact text-4xl md:text-6xl lg:text-8xl text-white/5"
          >
            {item}
            <span className="mx-8 text-electric-blue/20">{separator}</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
