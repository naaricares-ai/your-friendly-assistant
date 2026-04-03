import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Feature {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface FeatureShowcaseProps {
  features: Feature[];
  className?: string;
}

export default function FeatureShowcase({ features, className = '' }: FeatureShowcaseProps) {
  const [activeFeature, setActiveFeature] = useState(features[0]);

  return (
    <div className={`grid lg:grid-cols-2 gap-12 ${className}`}>
      {/* Feature list */}
      <div className="space-y-4">
        {features.map((feature) => (
          <motion.button
            key={feature.id}
            onClick={() => setActiveFeature(feature)}
            className={`w-full text-left p-6 rounded-2xl transition-all ${
              activeFeature.id === feature.id
                ? 'glass-card-premium'
                : 'hover:bg-white/5'
            }`}
            whileHover={{ x: activeFeature.id === feature.id ? 0 : 10 }}
          >
            <div className="flex items-center gap-4">
              <div className={`w-2 h-2 rounded-full transition-colors ${
                activeFeature.id === feature.id ? 'bg-electric-blue' : 'bg-titanium/30'
              }`} />
              <div>
                <h3 className={`text-section text-lg transition-colors ${
                  activeFeature.id === feature.id ? 'text-white' : 'text-titanium'
                }`}>
                  {feature.title}
                </h3>
                <AnimatePresence>
                  {activeFeature.id === feature.id && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="font-body text-sm text-titanium/70 mt-2"
                    >
                      {feature.description}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Feature image */}
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFeature.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="glass-card-premium rounded-3xl overflow-hidden aspect-video"
          >
            <img
              src={activeFeature.image}
              alt={activeFeature.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-deep-space/80 to-transparent" />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
