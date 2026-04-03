import { motion } from 'framer-motion';

interface MorphingShapeProps {
  className?: string;
  color1?: string;
  color2?: string;
  size?: number;
}

export default function MorphingShape({ 
  className = '',
  color1 = '#00D4FF',
  color2 = '#7B61FF',
  size = 400
}: MorphingShapeProps) {
  const paths = [
    'M50,0 C77.6,0 100,22.4 100,50 C100,77.6 77.6,100 50,100 C22.4,100 0,77.6 0,50 C0,22.4 22.4,0 50,0',
    'M50,10 C80,10 90,30 90,50 C90,80 70,90 50,90 C20,90 10,70 10,50 C10,20 30,10 50,10',
    'M50,5 C75,5 95,25 95,50 C95,75 75,95 50,95 C25,95 5,75 5,50 C5,25 25,5 50,5',
    'M50,15 C70,5 95,30 85,50 C95,70 70,95 50,85 C30,95 5,70 15,50 C5,30 30,5 50,15',
  ];

  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <linearGradient id="morphGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color1} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color2} stopOpacity="0.3" />
          </linearGradient>
          <filter id="morphBlur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
          </filter>
        </defs>
        <motion.path
          fill="url(#morphGradient)"
          filter="url(#morphBlur)"
          animate={{
            d: paths,
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />
      </svg>
    </motion.div>
  );
}
