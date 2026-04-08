import { motion, useScroll, useTransform } from 'framer-motion';

export default function ScrollIndicator() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  return (
    <motion.div
      style={{ opacity }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex-col items-center gap-4 hidden md:flex"
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-titanium/50">
        Scroll to explore
      </span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="relative"
      >
        <div className="w-6 h-10 rounded-full border border-white/20 flex justify-center pt-2">
          <motion.div
            className="w-1 h-2 rounded-full bg-gradient-to-b from-electric-blue to-neon-purple"
            animate={{ opacity: [1, 0.3, 1], y: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
