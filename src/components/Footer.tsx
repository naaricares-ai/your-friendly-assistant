import { motion } from 'framer-motion';
import { Linkedin, Youtube, Github, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStore } from '../lib/store';
import NewsletterSubscribe from './NewsletterSubscribe';

const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className || "w-4 h-4 md:w-5 md:h-5"}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const sectionMap: Record<string, string> = {
  'AI Labs': '#solutions',
  'Robotics': '#solutions',
  'Automation': '#solutions',
  'Smart Classes': '#solutions',
  'About': '#about',
  'Careers': '#about',
  'Press': '#about',
  'Partners': '#about',
  'Documentation': '#showcase',
  'Case Studies': '#showcase',
  'Blog': '#showcase',
  'Webinars': '#showcase',
  'Help Center': '#contact',
  'Contact': '#contact',
  'Training': '#contact',
  'Community': '#contact',
};

const footerLinks = {
  Solutions: ['AI Labs', 'Robotics', 'Automation', 'Smart Classes'],
  Company: ['About', 'Careers', 'Press', 'Partners'],
  Resources: ['Documentation', 'Case Studies', 'Blog', 'Webinars'],
  Support: ['Help Center', 'Contact', 'Training', 'Community'],
};

const socialLinks = [
  { icon: XIcon, href: 'https://x.com/nprathamesh519', label: 'X / Twitter' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/prathamesh-nalawade-994740262', label: 'LinkedIn' },
  { icon: Youtube, href: 'https://youtube.com/@prathamesh150', label: 'YouTube' },
  { icon: Github, href: 'https://github.com/Prathameshn2003', label: 'GitHub' },
  { icon: Instagram, href: 'https://www.instagram.com/prathamesh_vloger1212', label: 'Instagram' },
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
                <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}
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
                    <a href={sectionMap[link] || '#'} className="font-body text-xs md:text-sm text-titanium/70 hover:text-white transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <NewsletterSubscribe />
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 md:pt-8 border-t border-white/5">
          <p className="font-body text-xs md:text-sm text-titanium/40">{company.copyright}</p>
          <div className="flex gap-6 md:gap-8">
            <Link to="/privacy" className="font-body text-xs md:text-sm text-titanium/40 hover:text-titanium transition-colors">Privacy</Link>
            <Link to="/terms" className="font-body text-xs md:text-sm text-titanium/40 hover:text-titanium transition-colors">Terms</Link>
            <Link to="/cookies" className="font-body text-xs md:text-sm text-titanium/40 hover:text-titanium transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
