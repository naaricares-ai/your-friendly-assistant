import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState('');
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      if (target.closest('a, button, [data-cursor="pointer"]')) {
        setIsHovering(true);
        const text = target.closest('[data-cursor-text]')?.getAttribute('data-cursor-text');
        if (text) setCursorText(text);
      }
      
      if (target.closest('[data-cursor="view"]')) {
        setIsHovering(true);
        setCursorText('View');
      }
      
      if (target.closest('[data-cursor="drag"]')) {
        setIsHovering(true);
        setCursorText('Drag');
      }
    };

    const handleMouseOut = () => {
      setIsHovering(false);
      setCursorText('');
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [cursorX, cursorY]);

  // Hide on mobile/touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null;
  }

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          className="relative -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: isClicking ? 0.8 : isHovering ? 2.5 : 1,
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 400 }}
        >
          <div className={`w-5 h-5 rounded-full bg-electric-blue transition-all duration-300 shadow-[0_0_12px_rgba(0,212,255,0.6)] ${
            isHovering ? 'opacity-100 shadow-[0_0_20px_rgba(0,212,255,0.8)]' : 'opacity-90'
          }`} />
          
          {/* Cursor text */}
          {cursorText && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] font-mono uppercase tracking-wider text-black whitespace-nowrap"
            >
              {cursorText}
            </motion.span>
          )}
        </motion.div>
      </motion.div>
      
      {/* Cursor ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      >
        <motion.div
          className="relative -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: isHovering ? 1.5 : 1,
            opacity: isHovering ? 0 : 0.5,
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        >
          <div className="w-10 h-10 rounded-full border-2 border-electric-blue/60 shadow-[0_0_8px_rgba(0,212,255,0.3)]" />
        </motion.div>
      </motion.div>
    </>
  );
}
