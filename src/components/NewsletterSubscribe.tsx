import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function NewsletterSubscribe() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();

    if (!trimmed || !emailRegex.test(trimmed)) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    try {
      const { error } = await supabase
        .from('newsletter_subscribers' as any)
        .insert({ email: trimmed } as any);

      if (error) {
        if (error.code === '23505') {
          setStatus('error');
          setMessage('This email is already subscribed!');
        } else {
          throw error;
        }
        return;
      }

      setStatus('success');
      setMessage('Subscribed successfully!');
      setEmail('');
      setTimeout(() => { setStatus('idle'); setMessage(''); }, 4000);
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="glass-card-premium rounded-xl md:rounded-2xl p-5 md:p-8 mb-12 md:mb-20">
      <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
        <div>
          <h3 className="text-section text-lg md:text-xl text-white mb-1 md:mb-2">Stay Updated</h3>
          <p className="font-body text-sm md:text-base text-titanium/60">Get the latest on educational technology and AI.</p>
        </div>
        <div>
          <form onSubmit={handleSubmit} className="flex gap-3 md:gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); if (status === 'error') { setStatus('idle'); setMessage(''); } }}
              placeholder="Enter your email"
              disabled={status === 'loading'}
              className="flex-1 input-premium rounded-lg md:rounded-xl px-4 md:px-5 py-2.5 md:py-3 text-sm md:text-base text-white placeholder-titanium/30 min-w-0 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className="btn-premium px-5 md:px-8 py-2.5 md:py-3 rounded-lg md:rounded-xl text-white shrink-0 disabled:opacity-50 transition-opacity"
            >
              <span className="relative z-10 font-body font-medium text-sm md:text-base flex items-center gap-2">
                {status === 'loading' && <Loader2 className="w-4 h-4 animate-spin" />}
                {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
              </span>
            </button>
          </form>
          <AnimatePresence>
            {message && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className={`flex items-center gap-2 mt-3 text-sm font-body ${
                  status === 'success' ? 'text-aurora-green' : 'text-red-400'
                }`}
              >
                {status === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                {message}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
