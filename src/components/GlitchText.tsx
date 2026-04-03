import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface GlitchTextProps {
  text: string;
  className?: string;
  glitchOnHover?: boolean;
}

export default function GlitchText({ 
  text, 
  className = '',
  glitchOnHover = true 
}: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false);
  const [displayText, setDisplayText] = useState(text);

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';

  useEffect(() => {
    if (!isGlitching) {
      setDisplayText(text);
      return;
    }

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      if (iteration >= text.length) {
        clearInterval(interval);
        setIsGlitching(false);
      }

      iteration += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, [isGlitching, text]);

  return (
    <motion.span
      className={`inline-block ${className}`}
      onMouseEnter={() => glitchOnHover && setIsGlitching(true)}
      style={{ fontFamily: 'inherit' }}
    >
      {displayText}
    </motion.span>
  );
}
