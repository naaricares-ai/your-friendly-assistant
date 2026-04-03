import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface HeroData {
  eyebrow: string;
  title1: string;
  title2: string;
  title3: string;
  title4: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  stats: { value: string; label: string }[];
}

export interface AboutData {
  eyebrow: string;
  title1: string;
  title2: string;
  description1: string;
  description2: string;
  values: { number: string; title: string; description: string }[];
  stats: { number: string; label: string }[];
}

export interface Solution {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  image: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  school: string;
}

export interface ContactData {
  eyebrow: string;
  title1: string;
  title2: string;
  subtitle: string;
  location: string;
  email: string;
  phone: string;
}

export interface CompanyData {
  name: string;
  tagline: string;
  copyright: string;
}

export interface SiteData {
  company: CompanyData;
  hero: HeroData;
  about: AboutData;
  solutions: Solution[];
  testimonials: Testimonial[];
  contact: ContactData;
  partnerSchools: string[];
}

const defaultData: SiteData = {
  company: {
    name: 'ORYZE',
    tagline: 'Empowering schools with intelligent technology.',
    copyright: '© 2025 ORYZE Technologies. All rights reserved.',
  },
  hero: {
    eyebrow: 'The Future of Education',
    title1: 'Empowering',
    title2: 'Schools with',
    title3: 'Intelligent',
    title4: 'Technology',
    subtitle: 'Seamlessly integrate AI, automation, and robotics into your curriculum. Prepare students for tomorrow\'s world, today.',
    ctaPrimary: 'Explore Solutions',
    ctaSecondary: 'Watch Demo',
    stats: [
      { value: '500+', label: 'Schools' },
      { value: '50K+', label: 'Students' },
      { value: '99%', label: 'Satisfaction' },
    ],
  },
  about: {
    eyebrow: 'About ORYZE',
    title1: 'Transforming',
    title2: 'Education',
    description1: 'At ORYZE, we believe that the future of education lies at the intersection of human creativity and artificial intelligence.',
    description2: 'We\'re building the bridge between traditional learning and the technological frontier, empowering schools with tools that prepare students for careers that don\'t yet exist.',
    values: [
      { number: '01', title: 'Vision', description: 'A future where every student has access to intelligent learning tools that adapt to their unique potential.' },
      { number: '02', title: 'Innovation', description: 'Pushing boundaries with proprietary AI systems and robotic platforms designed for education.' },
      { number: '03', title: 'Partnership', description: 'Working hand-in-hand with educators to create solutions that truly make a difference.' },
    ],
    stats: [
      { number: '10+', label: 'Years of Innovation' },
      { number: '25+', label: 'Countries' },
      { number: '1M+', label: 'Students Impacted' },
      { number: '500+', label: 'Partner Schools' },
    ],
  },
  solutions: [
    {
      id: '1',
      icon: 'Brain',
      title: 'AI Labs',
      subtitle: 'for Schools',
      description: 'State-of-the-art AI laboratories with machine learning workstations, neural network visualization, and hands-on development environments.',
      features: ['Machine Learning', 'Data Science', 'Computer Vision', 'NLP Training'],
      image: '/images/ai-network.jpg',
    },
    {
      id: '2',
      icon: 'Bot',
      title: 'Robotics',
      subtitle: 'Programs',
      description: 'Comprehensive robotics curriculum with programmable robots, sensor kits, and competition-ready platforms for all ages.',
      features: ['Educational Robots', 'Programming Kits', 'Competition Prep', 'STEM Integration'],
      image: '/images/robot-arm.jpg',
    },
    {
      id: '3',
      icon: 'Cog',
      title: 'Automation',
      subtitle: 'Systems',
      description: 'Smart school infrastructure with automated attendance, climate control, security systems, and AI-powered resource management.',
      features: ['Smart Attendance', 'Climate Control', 'Security AI', 'Resource Management'],
      image: '/images/lab.jpg',
    },
    {
      id: '4',
      icon: 'Monitor',
      title: 'Smart Class',
      subtitle: 'Integration',
      description: 'Transform classrooms into interactive learning spaces with AI-powered displays, adaptive software, and real-time analytics.',
      features: ['Interactive Displays', 'Adaptive Learning', 'Analytics Dashboard', 'Virtual Labs'],
      image: '/images/students-tech.jpg',
    },
  ],
  testimonials: [
    {
      id: '1',
      quote: 'ORYZE transformed our STEM program completely. Students are now excited about robotics and AI, and we\'ve seen a 45% increase in science fair participation.',
      author: 'Dr. Sarah Chen',
      role: 'Principal',
      school: 'Westfield Academy',
    },
    {
      id: '2',
      quote: 'The AI Labs have given our students real-world experience with machine learning. Several graduates have gone on to top tech universities.',
      author: 'Michael Rodriguez',
      role: 'STEM Director',
      school: 'Innovation High School',
    },
    {
      id: '3',
      quote: 'Implementation was seamless, and the support team is incredible. Our teachers received comprehensive training and feel confident using the technology.',
      author: 'Emily Thompson',
      role: 'Technology Coordinator',
      school: 'Riverside School District',
    },
  ],
  contact: {
    eyebrow: 'Get In Touch',
    title1: 'Ready to',
    title2: 'Transform?',
    subtitle: 'Let\'s discuss how ORYZE can bring cutting-edge technology to your institution.',
    location: '123 Innovation Drive\nSilicon Valley, CA',
    email: 'hello@oryze.edu',
    phone: '+1 (800) ORYZE-AI',
  },
  partnerSchools: ['MIT Academy', 'Stanford Prep', 'Berkeley STEM', 'Caltech Institute', 'Harvard Prep'],
};

interface StoreState {
  data: SiteData;
  isAuthenticated: boolean;
  updateData: (newData: Partial<SiteData>) => void;
  updateHero: (hero: Partial<HeroData>) => void;
  updateAbout: (about: Partial<AboutData>) => void;
  updateSolution: (id: string, solution: Partial<Solution>) => void;
  addSolution: (solution: Solution) => void;
  deleteSolution: (id: string) => void;
  updateTestimonial: (id: string, testimonial: Partial<Testimonial>) => void;
  addTestimonial: (testimonial: Testimonial) => void;
  deleteTestimonial: (id: string) => void;
  updateContact: (contact: Partial<ContactData>) => void;
  updateCompany: (company: Partial<CompanyData>) => void;
  updatePartnerSchools: (schools: string[]) => void;
  login: (password: string) => boolean;
  logout: () => void;
  resetToDefault: () => void;
}

const ADMIN_PASSWORD = 'oryze2025';

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      data: defaultData,
      isAuthenticated: false,
      
      updateData: (newData) => set((state) => ({ 
        data: { ...state.data, ...newData } 
      })),
      
      updateHero: (hero) => set((state) => ({ 
        data: { ...state.data, hero: { ...state.data.hero, ...hero } } 
      })),
      
      updateAbout: (about) => set((state) => ({ 
        data: { ...state.data, about: { ...state.data.about, ...about } } 
      })),
      
      updateSolution: (id, solution) => set((state) => ({
        data: {
          ...state.data,
          solutions: state.data.solutions.map((s) =>
            s.id === id ? { ...s, ...solution } : s
          ),
        },
      })),
      
      addSolution: (solution) => set((state) => ({
        data: {
          ...state.data,
          solutions: [...state.data.solutions, solution],
        },
      })),
      
      deleteSolution: (id) => set((state) => ({
        data: {
          ...state.data,
          solutions: state.data.solutions.filter((s) => s.id !== id),
        },
      })),
      
      updateTestimonial: (id, testimonial) => set((state) => ({
        data: {
          ...state.data,
          testimonials: state.data.testimonials.map((t) =>
            t.id === id ? { ...t, ...testimonial } : t
          ),
        },
      })),
      
      addTestimonial: (testimonial) => set((state) => ({
        data: {
          ...state.data,
          testimonials: [...state.data.testimonials, testimonial],
        },
      })),
      
      deleteTestimonial: (id) => set((state) => ({
        data: {
          ...state.data,
          testimonials: state.data.testimonials.filter((t) => t.id !== id),
        },
      })),
      
      updateContact: (contact) => set((state) => ({ 
        data: { ...state.data, contact: { ...state.data.contact, ...contact } } 
      })),
      
      updateCompany: (company) => set((state) => ({ 
        data: { ...state.data, company: { ...state.data.company, ...company } } 
      })),
      
      updatePartnerSchools: (schools) => set((state) => ({ 
        data: { ...state.data, partnerSchools: schools } 
      })),
      
      login: (password) => {
        if (password === ADMIN_PASSWORD) {
          set({ isAuthenticated: true });
          return true;
        }
        return false;
      },
      
      logout: () => set({ isAuthenticated: false }),
      
      resetToDefault: () => set({ data: defaultData }),
    }),
    {
      name: 'oryze-site-data',
      partialize: (state) => ({ data: state.data }),
    }
  )
);
