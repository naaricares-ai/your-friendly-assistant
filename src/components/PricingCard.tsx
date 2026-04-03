import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';

interface PricingCardProps {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  ctaText?: string;
}

export default function PricingCard({
  name,
  price,
  period,
  description,
  features,
  isPopular = false,
  ctaText = 'Get Started'
}: PricingCardProps) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className={`relative glass-card-premium rounded-3xl p-8 ${
        isPopular ? 'border-electric-blue/50' : ''
      }`}
    >
      {/* Popular badge */}
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-1 px-4 py-1.5 rounded-full bg-gradient-to-r from-electric-blue to-neon-purple text-white text-xs font-medium">
            <Sparkles className="w-3 h-3" />
            Most Popular
          </div>
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-8">
        <h3 className="text-section text-xl text-white mb-2">{name}</h3>
        <p className="font-body text-sm text-titanium mb-4">{description}</p>
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-number text-5xl gradient-text-clean">{price}</span>
          <span className="font-body text-titanium">/{period}</span>
        </div>
      </div>

      {/* Features */}
      <ul className="space-y-4 mb-8">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full bg-electric-blue/20 flex items-center justify-center">
              <Check className="w-3 h-3 text-electric-blue" />
            </div>
            <span className="font-body text-sm text-titanium">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        className={`w-full py-4 rounded-xl font-body font-medium transition-all ${
          isPopular
            ? 'btn-premium text-white'
            : 'border border-white/10 text-white hover:border-electric-blue/50 hover:bg-electric-blue/5'
        }`}
      >
        <span className="relative z-10">{ctaText}</span>
      </button>
    </motion.div>
  );
}
