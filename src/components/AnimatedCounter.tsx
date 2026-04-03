import { useEffect, useRef, useState } from 'react';
import { useInView, motion } from 'framer-motion';

interface AnimatedCounterProps {
  value: string;
  className?: string;
}

export default function AnimatedCounter({ value, className = '' }: AnimatedCounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState('0');
  
  // Extract number and suffix
  const numericMatch = value.match(/([\d.]+)/);
  const numericValue = numericMatch ? parseFloat(numericMatch[1]) : 0;
  const prefix = value.match(/^([^\d]*)/)?.[1] || '';
  const suffix = value.match(/([^\d.]*)$/)?.[1] || '';

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = numericValue * easeOut;
      
      if (Number.isInteger(numericValue)) {
        setDisplayValue(Math.floor(currentValue).toString());
      } else {
        setDisplayValue(currentValue.toFixed(1));
      }

      if (currentStep >= steps) {
        clearInterval(interval);
        setDisplayValue(numericValue.toString());
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [isInView, numericValue]);

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      {prefix}{displayValue}{suffix}
    </motion.span>
  );
}
