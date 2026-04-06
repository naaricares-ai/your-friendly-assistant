import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { MapPin, Mail, Phone, CheckCircle, ArrowRight } from 'lucide-react';
import { useStore } from '../lib/store';
import { supabase } from '@/integrations/supabase/client';
import emailjs from '@emailjs/browser';

// ─── EmailJS config (loaded from environment variables) ──────────────────────
const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

// ─── WhatsApp number (with country code, no + or spaces) ─────────────────────
const ADMIN_WHATSAPP = '918446692426';

// ─── Email that receives submissions ─────────────────────────────────────────
const ADMIN_EMAIL = 'nprathamesh519@gmail.com';

export default function Contact() {
  const { data } = useStore();
  const { contact } = data;
  
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', school: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // 1️⃣  Save to Supabase
      await supabase.from('contact_submissions').insert({
        name: formData.name,
        email: formData.email,
        school: formData.school,
        message: formData.message,
      });

      // 2️⃣  Send email via EmailJS
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          to_email:      ADMIN_EMAIL,
          from_name:     formData.name,
          from_email:    formData.email,
          school:        formData.school,
          message:       formData.message,
          reply_to:      formData.email,
        },
        EMAILJS_PUBLIC_KEY
      );

      // 3️⃣  Open WhatsApp with pre-filled message
      const whatsappMsg = encodeURIComponent(
        `Hi, I'm ${formData.name} from ${formData.school}.\n\nEmail: ${formData.email}\n\nMessage: ${formData.message}`
      );
      window.open(`https://wa.me/${ADMIN_WHATSAPP}?text=${whatsappMsg}`, '_blank');

      // 4️⃣  Show success state
      setSubmitted(true);
      setFormData({ name: '', email: '', school: '', message: '' });
      setTimeout(() => setSubmitted(false), 4000);

    } catch (err) {
      console.error('Submission error:', err);
      setError('Something went wrong. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="relative py-20 md:py-40 overflow-hidden">
      <div className="absolute inset-0 bg-deep-space" />
      <div className="absolute inset-0 luxury-grid opacity-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] md:w-[800px] h-[200px] md:h-[400px] bg-gradient-radial from-electric-blue/10 via-transparent to-transparent blur-3xl" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-12 md:mb-20"
        >
          <span className="text-label text-neon-purple mb-4 md:mb-6 block">{contact.eyebrow}</span>
          <h2 className="text-section text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-6 md:mb-8">
            <span className="text-white block">{contact.title1}</span>
            <span className="text-headline text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl gradient-text-premium block mt-2">{contact.title2}</span>
          </h2>
          <p className="font-body text-base md:text-xl text-titanium max-w-2xl mx-auto">{contact.subtitle}</p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6 md:gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="lg:col-span-2 space-y-4 md:space-y-8"
          >
            <div className="glass-card-premium rounded-xl md:rounded-2xl p-5 md:p-8">
              <h3 className="text-section text-lg md:text-xl text-white mb-6 md:mb-8">Contact</h3>
              <div className="space-y-4 md:space-y-6">
                {[
                  { icon: MapPin, label: 'Location', value: contact.location },
                  { icon: Mail,   label: 'Email',    value: contact.email },
                  { icon: Phone,  label: 'Phone',    value: contact.phone },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 md:gap-4">
                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-gradient-to-br from-electric-blue/10 to-neon-purple/10 flex items-center justify-center border border-white/5 shrink-0">
                      <item.icon className="w-4 h-4 md:w-5 md:h-5 text-electric-blue" />
                    </div>
                    <div>
                      <div className="text-label text-titanium/60 mb-1">{item.label}</div>
                      <div className="font-body text-sm md:text-base text-chrome-silver whitespace-pre-line">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="glass-card-premium rounded-xl md:rounded-2xl p-5 md:p-8">
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                {[
                  { value: '<24h', label: 'Response' },
                  { value: '100%', label: 'Satisfaction' },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-number text-xl md:text-2xl gradient-text-clean">{stat.value}</div>
                    <div className="text-label text-[10px] md:text-xs text-titanium/60">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="lg:col-span-3"
          >
            <div className="glass-card-premium rounded-2xl md:rounded-3xl p-6 md:p-10 relative overflow-hidden">
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 bg-deep-space/98 flex flex-col items-center justify-center z-10 rounded-2xl md:rounded-3xl"
                >
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}>
                    <CheckCircle className="w-16 h-16 md:w-20 md:h-20 text-aurora-green mb-4 md:mb-6" />
                  </motion.div>
                  <h3 className="text-section text-xl md:text-2xl text-white mb-2">Message Sent!</h3>
                  <p className="font-body text-sm md:text-base text-titanium text-center px-4">
                    We've received your message via email & WhatsApp.<br />We'll be in touch within 24 hours.
                  </p>
                </motion.div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label className="text-label text-titanium/80 mb-2 md:mb-3 block">Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required
                      className="w-full input-premium rounded-lg md:rounded-xl px-4 md:px-5 py-3 md:py-4 text-sm md:text-base text-white placeholder-titanium/30"
                      placeholder="John Smith" />
                  </div>
                  <div>
                    <label className="text-label text-titanium/80 mb-2 md:mb-3 block">Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required
                      className="w-full input-premium rounded-lg md:rounded-xl px-4 md:px-5 py-3 md:py-4 text-sm md:text-base text-white placeholder-titanium/30"
                      placeholder="john@school.edu" />
                  </div>
                </div>
                
                <div>
                  <label className="text-label text-titanium/80 mb-2 md:mb-3 block">Institution</label>
                  <input type="text" name="school" value={formData.school} onChange={handleChange} required
                    className="w-full input-premium rounded-lg md:rounded-xl px-4 md:px-5 py-3 md:py-4 text-sm md:text-base text-white placeholder-titanium/30"
                    placeholder="Your school or organization" />
                </div>
                
                <div>
                  <label className="text-label text-titanium/80 mb-2 md:mb-3 block">Message</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} required rows={4}
                    className="w-full input-premium rounded-lg md:rounded-xl px-4 md:px-5 py-3 md:py-4 text-sm md:text-base text-white placeholder-titanium/30 resize-none"
                    placeholder="Tell us about your needs..." />
                </div>

                {/* Error message */}
                {error && (
                  <p className="text-red-400 text-sm font-body">{error}</p>
                )}
                
                <button type="submit" disabled={isSubmitting}
                  className="w-full btn-premium py-4 md:py-5 rounded-lg md:rounded-xl text-white flex items-center justify-center gap-3 group disabled:opacity-50">
                  <span className="relative z-10 font-body font-medium text-sm md:text-base">
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </span>
                  {!isSubmitting && <ArrowRight className="w-4 h-4 md:w-5 md:h-5 relative z-10 group-hover:translate-x-1 transition-transform" />}
                </button>

                <p className="text-center text-titanium/40 text-xs font-body">
                  Message sent via Email + WhatsApp
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
