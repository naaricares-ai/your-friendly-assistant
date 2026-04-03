import { motion } from 'framer-motion';
import { Twitter, Linkedin, Youtube, Github } from 'lucide-react';
import { useStore } from '../lib/store';

const footerLinks = {
  Solutions: ['AI Labs', 'Robotics', 'Automation', 'Smart Classes'],
  Company: ['About', 'Careers', 'Press', 'Partners'],
  Resources: ['Documentation', 'Case Studies', 'Blog', 'Webinars'],
  Support: ['Help Center', 'Contact', 'Training', 'Community'],
};

const socialLinks = [
  { icon: Twitter, href: '#' },
  { icon: Linkedin, href: '#' },
  { icon: Youtube, href: '#' },
  { icon: Github, href: '#' },
];

export default function Footer() {
  const { data } = useStore();
  const { company } = data;

  return (
    <footer className="relative pt-16 md:pt-32 pb-8 md:pb-12 overflow-hidden">
      <div className="absolute inset-0 bg-deep-space" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-12 mb-12 md:mb-20">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <motion.a href="#home" className="inline-block mb-4 md:mb-6" whileHover={{ scale: 1.02 }}>
              <span className="text-hero text-2xl md:text-3xl">
                <span className="text-white">{company.name.slice(0, 3)}</span>
                <span className="gradient-text-clean">{company.name.slice(3)}</span>
              </span>
            </motion.a>
            <p className="font-body text-sm md:text-base text-titanium/60 mb-6 md:mb-8 max-w-sm leading-relaxed">
              {company.tagline}
            </p>
            <div className="flex gap-3 md:gap-4">
              {socialLinks.map((social, i) => (
                <a key={i} href={social.href}
                  className="w-9 h-9 md:w-10 md:h-10 rounded-lg md:rounded-xl border border-white/5 flex items-center justify-center text-titanium/50 hover:text-electric-blue hover:border-electric-blue/30 transition-all">
                  <social.icon className="w-4 h-4 md:w-5 md:h-5" />
                </a>
              ))}
            </div>
          </div>
          
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-label text-titanium/50 mb-4 md:mb-6">{category}</h4>
              <ul className="space-y-2 md:space-y-4">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="font-body text-xs md:text-sm text-titanium/70 hover:text-white transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Newsletter */}
        <div className="glass-card-premium rounded-xl md:rounded-2xl p-5 md:p-8 mb-12 md:mb-20">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
            <div>
              <h3 className="text-section text-lg md:text-xl text-white mb-1 md:mb-2">Stay Updated</h3>
              <p className="font-body text-sm md:text-base text-titanium/60">Get the latest on educational technology and AI.</p>
            </div>
            <form className="flex gap-3 md:gap-4">
              <input type="email" placeholder="Enter your email"
                className="flex-1 input-premium rounded-lg md:rounded-xl px-4 md:px-5 py-2.5 md:py-3 text-sm md:text-base text-white placeholder-titanium/30 min-w-0" />
              <button type="submit" className="btn-premium px-5 md:px-8 py-2.5 md:py-3 rounded-lg md:rounded-xl text-white shrink-0">
                <span className="relative z-10 font-body font-medium text-sm md:text-base">Subscribe</span>
              </button>
            </form>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 md:pt-8 border-t border-white/5">
          <p className="font-body text-xs md:text-sm text-titanium/40">{company.copyright}</p>
          <div className="flex gap-6 md:gap-8">
            {['Privacy', 'Terms', 'Cookies'].map((link) => (
              <a key={link} href="#" className="font-body text-xs md:text-sm text-titanium/40 hover:text-titanium transition-colors">{link}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
