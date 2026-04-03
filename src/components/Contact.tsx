import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { MapPin, Mail, Phone, CheckCircle, ArrowRight, Loader2 as _Loader2 } from 'lucide-react';
import { useStore } from '../lib/store';
import { supabase } from '@/integrations/supabase/client';

export default function Contact() {
  const { data } = useStore();
  const { contact } = data;
  
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    school: '',
    message: '',
  });

  const ADMIN_WHATSAPP = '918446692426';
  const _ADMIN_EMAIL = 'nprathamesh519@gmail.com';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Store in Supabase
      await supabase.from('contact_submissions').insert({
        name: formData.name,
        email: formData.email,
        school: formData.school,
        message: formData.message,
      });

      // Open WhatsApp with pre-filled message
      const whatsappMsg = encodeURIComponent(
        `Hi, I'm ${formData.name} from ${formData.school}.\n\nEmail: ${formData.email}\n\nMessage: ${formData.message}`
      );
      window.open(`https://wa.me/${ADMIN_WHATSAPP}?text=${whatsappMsg}`, '_blank');

      setSubmitted(true);
      setFormData({ name: '', email: '', school: '', message: '' });
      setTimeout(() => setSubmitted(false), 4000);
    } catch (err) {
      console.error('Submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="relative py-40 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-deep-space" />
      <div className="absolute inset-0 luxury-grid opacity-10" />
      
      {/* Spotlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-radial from-electric-blue/10 via-transparent to-transparent blur-3xl" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <span className="text-label text-neon-purple mb-6 block">
            {contact.eyebrow}
          </span>
          <h2 className="text-section text-5xl md:text-6xl lg:text-7xl mb-8">
            <span className="text-white block">{contact.title1}</span>
            <span className="text-headline text-4xl md:text-5xl lg:text-6xl gradient-text-premium block mt-2">{contact.title2}</span>
          </h2>
          <p className="font-body text-xl text-titanium max-w-2xl mx-auto">
            {contact.subtitle}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="glass-card-premium rounded-2xl p-8">
              <h3 className="text-section text-xl text-white mb-8">Contact</h3>
              
              <div className="space-y-6">
                {[
                  { icon: MapPin, label: 'Location', value: contact.location },
                  { icon: Mail, label: 'Email', value: contact.email },
                  { icon: Phone, label: 'Phone', value: contact.phone },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-electric-blue/10 to-neon-purple/10 flex items-center justify-center border border-white/5">
                      <item.icon className="w-5 h-5 text-electric-blue" />
                    </div>
                    <div>
                      <div className="text-label text-titanium/50 mb-1">{item.label}</div>
                      <div className="font-body text-white whitespace-pre-line">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="glass-card-premium rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { value: '<24h', label: 'Response' },
                  { value: '100%', label: 'Satisfaction' },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-number text-2xl gradient-text-clean">{stat.value}</div>
                    <div className="text-label text-titanium/50">{stat.label}</div>
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
            <div className="glass-card-premium rounded-3xl p-10 relative overflow-hidden">
              {/* Success Overlay */}
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 bg-deep-space/98 flex flex-col items-center justify-center z-10 rounded-3xl"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                  >
                    <CheckCircle className="w-20 h-20 text-aurora-green mb-6" />
                  </motion.div>
                  <h3 className="text-section text-2xl text-white mb-2">Message Sent</h3>
                  <p className="font-body text-titanium">We'll be in touch within 24 hours.</p>
                </motion.div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-label text-titanium/70 mb-3 block">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full input-premium rounded-xl px-5 py-4 text-white placeholder-titanium/30"
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <label className="text-label text-titanium/70 mb-3 block">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full input-premium rounded-xl px-5 py-4 text-white placeholder-titanium/30"
                      placeholder="john@school.edu"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="text-label text-titanium/70 mb-3 block">Institution</label>
                  <input
                    type="text"
                    name="school"
                    value={formData.school}
                    onChange={handleChange}
                    required
                    className="w-full input-premium rounded-xl px-5 py-4 text-white placeholder-titanium/30"
                    placeholder="Your school or organization"
                  />
                </div>
                
                <div>
                  <label className="text-label text-titanium/70 mb-3 block">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full input-premium rounded-xl px-5 py-4 text-white placeholder-titanium/30 resize-none"
                    placeholder="Tell us about your needs..."
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full btn-premium py-5 rounded-xl text-white flex items-center justify-center gap-3 group"
                >
                  <span className="relative z-10 font-body font-medium">Send Message</span>
                  <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
