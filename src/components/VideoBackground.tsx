import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface VideoBackgroundProps {
  src: string;
  fallbackImage?: string;
  overlay?: boolean;
  className?: string;
}

export default function VideoBackground({ 
  src, 
  fallbackImage,
  overlay = true,
  className = '' 
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75;
    }
  }, []);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Fallback image */}
      {fallbackImage && (
        <img
          src={fallbackImage}
          alt="Background"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            isLoaded && !hasError ? 'opacity-0' : 'opacity-100'
          }`}
        />
      )}
      
      {/* Video */}
      {!hasError && (
        <motion.video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={src} type="video/mp4" />
        </motion.video>
      )}
      
      {/* Overlay */}
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-b from-deep-space/80 via-deep-space/60 to-deep-space" />
      )}
    </div>
  );
}
