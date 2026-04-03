import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../lib/store';
import type { Solution, Testimonial } from '../lib/store';
import { 
  Lock, LogOut, Home, FileText, Briefcase, MessageSquare, 
  Phone, Building, ChevronRight, Plus, Trash2,
  Eye, RotateCcw, Check
} from 'lucide-react';

type Tab = 'hero' | 'about' | 'solutions' | 'testimonials' | 'contact' | 'company';

export default function Admin() {
  const { isAuthenticated, login, logout, resetToDefault } = useStore();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<Tab>('hero');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      setError('');
    } else {
      setError('Invalid password');
    }
  };

  const showSaveStatus = () => {
    setSaveStatus('saving');
    setTimeout(() => setSaveStatus('saved'), 500);
    setTimeout(() => setSaveStatus('idle'), 2000);
  };

  if (!isAuthenticated) {
    return <LoginScreen password={password} setPassword={setPassword} error={error} onSubmit={handleLogin} />;
  }

  const tabs: { id: Tab; label: string; icon: typeof Home }[] = [
    { id: 'hero', label: 'Hero Section', icon: Home },
    { id: 'about', label: 'About', icon: FileText },
    { id: 'solutions', label: 'Solutions', icon: Briefcase },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
    { id: 'contact', label: 'Contact', icon: Phone },
    { id: 'company', label: 'Company', icon: Building },
  ];

  return (
    <div className="min-h-screen bg-deep-space">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-ultra border-b border-white/5">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <a href="/" className="font-display text-xl font-bold">
              <span className="text-white">ORY</span>
              <span className="gradient-text-clean">ZE</span>
            </a>
            <span className="text-titanium/50">/</span>
            <span className="text-titanium">Admin Panel</span>
          </div>
          <div className="flex items-center gap-4">
            <AnimatePresence>
              {saveStatus !== 'idle' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-center gap-2 text-sm"
                >
                  {saveStatus === 'saving' ? (
                    <span className="text-electric-blue">Saving...</span>
                  ) : (
                    <span className="text-aurora-green flex items-center gap-1">
                      <Check className="w-4 h-4" /> Saved
                    </span>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
            <a
              href="/"
              target="_blank"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-titanium hover:text-white hover:bg-white/10 transition-all"
            >
              <Eye className="w-4 h-4" />
              Preview Site
            </a>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside className="fixed left-0 top-16 bottom-0 w-64 border-r border-white/5 bg-obsidian/50 p-4">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                  activeTab === tab.id
                    ? 'bg-electric-blue/10 text-electric-blue'
                    : 'text-titanium hover:text-white hover:bg-white/5'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
                {activeTab === tab.id && <ChevronRight className="w-4 h-4 ml-auto" />}
              </button>
            ))}
          </nav>
          
          <div className="absolute bottom-4 left-4 right-4 space-y-2">
            <button
              onClick={() => {
                if (confirm('Reset all data to default? This cannot be undone.')) {
                  resetToDefault();
                  showSaveStatus();
                }
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 text-titanium hover:text-white hover:bg-white/10 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              Reset to Default
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-64 p-8">
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === 'hero' && <HeroEditor onSave={showSaveStatus} />}
                {activeTab === 'about' && <AboutEditor onSave={showSaveStatus} />}
                {activeTab === 'solutions' && <SolutionsEditor onSave={showSaveStatus} />}
                {activeTab === 'testimonials' && <TestimonialsEditor onSave={showSaveStatus} />}
                {activeTab === 'contact' && <ContactEditor onSave={showSaveStatus} />}
                {activeTab === 'company' && <CompanyEditor onSave={showSaveStatus} />}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}

// Login Screen Component
function LoginScreen({ password, setPassword, error, onSubmit }: {
  password: string;
  setPassword: (p: string) => void;
  error: string;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <div className="min-h-screen bg-deep-space flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <div className="glass-card-premium rounded-3xl p-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-electric-blue/20 to-neon-purple/20 flex items-center justify-center mx-auto mb-6 border border-white/10">
              <Lock className="w-8 h-8 text-electric-blue" />
            </div>
            <h1 className="font-display text-2xl font-bold text-white mb-2">Admin Access</h1>
            <p className="text-titanium">Enter password to continue</p>
          </div>
          
          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full input-premium rounded-xl px-5 py-4 text-white placeholder-titanium/30"
                autoFocus
              />
              {error && (
                <p className="text-red-400 text-sm mt-2">{error}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full btn-premium py-4 rounded-xl font-medium text-white"
            >
              <span className="relative z-10">Login</span>
            </button>
          </form>
          
          <p className="text-center text-titanium/50 text-sm mt-6">
            Default password: oryze2025
          </p>
        </div>
      </motion.div>
    </div>
  );
}

// Input Component
function Input({ label, value, onChange, multiline = false, placeholder = '' }: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="font-mono text-xs uppercase tracking-wider text-titanium/70 mb-2 block">
        {label}
      </label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={4}
          className="w-full input-premium rounded-xl px-4 py-3 text-white placeholder-titanium/30 resize-none"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full input-premium rounded-xl px-4 py-3 text-white placeholder-titanium/30"
        />
      )}
    </div>
  );
}

// Section Header
function SectionHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="mb-8">
      <h2 className="font-display text-2xl font-bold text-white mb-2">{title}</h2>
      <p className="text-titanium">{description}</p>
    </div>
  );
}

// Card Component
function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`glass-card-premium rounded-2xl p-6 ${className}`}>
      {children}
    </div>
  );
}

// Hero Editor
function HeroEditor({ onSave }: { onSave: () => void }) {
  const { data, updateHero } = useStore();
  const { hero } = data;

  const handleChange = (key: string, value: string) => {
    updateHero({ [key]: value });
    onSave();
  };

  const handleStatChange = (index: number, field: 'value' | 'label', value: string) => {
    const newStats = [...hero.stats];
    newStats[index] = { ...newStats[index], [field]: value };
    updateHero({ stats: newStats });
    onSave();
  };

  return (
    <div className="space-y-8">
      <SectionHeader 
        title="Hero Section" 
        description="Edit the main hero section that visitors see first." 
      />
      
      <Card>
        <h3 className="font-display text-lg font-semibold text-white mb-6">Headlines</h3>
        <div className="space-y-4">
          <Input label="Eyebrow Text" value={hero.eyebrow} onChange={(v) => handleChange('eyebrow', v)} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Title Line 1" value={hero.title1} onChange={(v) => handleChange('title1', v)} />
            <Input label="Title Line 2" value={hero.title2} onChange={(v) => handleChange('title2', v)} />
            <Input label="Title Line 3" value={hero.title3} onChange={(v) => handleChange('title3', v)} />
            <Input label="Title Line 4" value={hero.title4} onChange={(v) => handleChange('title4', v)} />
          </div>
          <Input label="Subtitle" value={hero.subtitle} onChange={(v) => handleChange('subtitle', v)} multiline />
        </div>
      </Card>
      
      <Card>
        <h3 className="font-display text-lg font-semibold text-white mb-6">Call to Action</h3>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Primary Button" value={hero.ctaPrimary} onChange={(v) => handleChange('ctaPrimary', v)} />
          <Input label="Secondary Button" value={hero.ctaSecondary} onChange={(v) => handleChange('ctaSecondary', v)} />
        </div>
      </Card>
      
      <Card>
        <h3 className="font-display text-lg font-semibold text-white mb-6">Statistics</h3>
        <div className="space-y-4">
          {hero.stats.map((stat, index) => (
            <div key={index} className="grid grid-cols-2 gap-4">
              <Input 
                label={`Stat ${index + 1} Value`} 
                value={stat.value} 
                onChange={(v) => handleStatChange(index, 'value', v)} 
              />
              <Input 
                label={`Stat ${index + 1} Label`} 
                value={stat.label} 
                onChange={(v) => handleStatChange(index, 'label', v)} 
              />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// About Editor
function AboutEditor({ onSave }: { onSave: () => void }) {
  const { data, updateAbout } = useStore();
  const { about } = data;

  const handleChange = (key: string, value: string) => {
    updateAbout({ [key]: value });
    onSave();
  };

  const handleValueChange = (index: number, field: 'title' | 'description', value: string) => {
    const newValues = [...about.values];
    newValues[index] = { ...newValues[index], [field]: value };
    updateAbout({ values: newValues });
    onSave();
  };

  const handleStatChange = (index: number, field: 'number' | 'label', value: string) => {
    const newStats = [...about.stats];
    newStats[index] = { ...newStats[index], [field]: value };
    updateAbout({ stats: newStats });
    onSave();
  };

  return (
    <div className="space-y-8">
      <SectionHeader 
        title="About Section" 
        description="Edit the about section content and values." 
      />
      
      <Card>
        <h3 className="font-display text-lg font-semibold text-white mb-6">Header</h3>
        <div className="space-y-4">
          <Input label="Eyebrow" value={about.eyebrow} onChange={(v) => handleChange('eyebrow', v)} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Title Line 1" value={about.title1} onChange={(v) => handleChange('title1', v)} />
            <Input label="Title Line 2" value={about.title2} onChange={(v) => handleChange('title2', v)} />
          </div>
          <Input label="Description 1" value={about.description1} onChange={(v) => handleChange('description1', v)} multiline />
          <Input label="Description 2" value={about.description2} onChange={(v) => handleChange('description2', v)} multiline />
        </div>
      </Card>
      
      <Card>
        <h3 className="font-display text-lg font-semibold text-white mb-6">Values</h3>
        <div className="space-y-6">
          {about.values.map((value, index) => (
            <div key={index} className="p-4 bg-white/5 rounded-xl space-y-4">
              <div className="flex items-center gap-2 text-titanium/50 font-mono text-xs">
                {value.number}
              </div>
              <Input 
                label="Title" 
                value={value.title} 
                onChange={(v) => handleValueChange(index, 'title', v)} 
              />
              <Input 
                label="Description" 
                value={value.description} 
                onChange={(v) => handleValueChange(index, 'description', v)} 
                multiline
              />
            </div>
          ))}
        </div>
      </Card>
      
      <Card>
        <h3 className="font-display text-lg font-semibold text-white mb-6">Statistics</h3>
        <div className="grid grid-cols-2 gap-4">
          {about.stats.map((stat, index) => (
            <div key={index} className="space-y-2">
              <Input 
                label={`Stat ${index + 1} Number`} 
                value={stat.number} 
                onChange={(v) => handleStatChange(index, 'number', v)} 
              />
              <Input 
                label={`Stat ${index + 1} Label`} 
                value={stat.label} 
                onChange={(v) => handleStatChange(index, 'label', v)} 
              />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// Solutions Editor
function SolutionsEditor({ onSave }: { onSave: () => void }) {
  const { data, updateSolution, addSolution, deleteSolution } = useStore();
  const { solutions } = data;

  const handleChange = (id: string, field: keyof Solution, value: string | string[]) => {
    updateSolution(id, { [field]: value } as Partial<Solution>);
    onSave();
  };

  const handleAddSolution = () => {
    const newSolution = {
      id: Date.now().toString(),
      icon: 'Brain',
      title: 'New Solution',
      subtitle: 'Subtitle',
      description: 'Description of the new solution.',
      features: ['Feature 1', 'Feature 2'],
      image: '/images/ai-network.jpg',
    };
    addSolution(newSolution);
    onSave();
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this solution?')) {
      deleteSolution(id);
      onSave();
    }
  };

  return (
    <div className="space-y-8">
      <SectionHeader 
        title="Solutions" 
        description="Manage your product and service offerings." 
      />
      
      {solutions.map((solution, index) => (
        <Card key={solution.id}>
          <div className="flex items-start justify-between mb-6">
            <h3 className="font-display text-lg font-semibold text-white">
              Solution {index + 1}
            </h3>
            <button
              onClick={() => handleDelete(solution.id)}
              className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input 
                label="Title" 
                value={solution.title} 
                onChange={(v) => handleChange(solution.id, 'title', v)} 
              />
              <Input 
                label="Subtitle" 
                value={solution.subtitle} 
                onChange={(v) => handleChange(solution.id, 'subtitle', v)} 
              />
            </div>
            <Input 
              label="Description" 
              value={solution.description} 
              onChange={(v) => handleChange(solution.id, 'description', v)} 
              multiline
            />
            <Input 
              label="Features (comma separated)" 
              value={solution.features.join(', ')} 
              onChange={(v) => handleChange(solution.id, 'features', v.split(', '))} 
            />
            <Input 
              label="Icon (Brain, Bot, Cog, Monitor)" 
              value={solution.icon} 
              onChange={(v) => handleChange(solution.id, 'icon', v)} 
            />
          </div>
        </Card>
      ))}
      
      <button
        onClick={handleAddSolution}
        className="w-full flex items-center justify-center gap-2 py-4 rounded-xl border-2 border-dashed border-white/10 text-titanium hover:text-white hover:border-electric-blue/50 transition-all"
      >
        <Plus className="w-5 h-5" />
        Add Solution
      </button>
    </div>
  );
}

// Testimonials Editor
function TestimonialsEditor({ onSave }: { onSave: () => void }) {
  const { data, updateTestimonial, addTestimonial, deleteTestimonial, updatePartnerSchools } = useStore();
  const { testimonials, partnerSchools } = data;

  const handleChange = (id: string, field: keyof Testimonial, value: string) => {
    updateTestimonial(id, { [field]: value } as Partial<Testimonial>);
    onSave();
  };

  const handleAddTestimonial = () => {
    const newTestimonial = {
      id: Date.now().toString(),
      quote: 'New testimonial quote.',
      author: 'Author Name',
      role: 'Role',
      school: 'School Name',
    };
    addTestimonial(newTestimonial);
    onSave();
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this testimonial?')) {
      deleteTestimonial(id);
      onSave();
    }
  };

  return (
    <div className="space-y-8">
      <SectionHeader 
        title="Testimonials" 
        description="Manage customer testimonials and partner schools." 
      />
      
      {testimonials.map((testimonial, index) => (
        <Card key={testimonial.id}>
          <div className="flex items-start justify-between mb-6">
            <h3 className="font-display text-lg font-semibold text-white">
              Testimonial {index + 1}
            </h3>
            <button
              onClick={() => handleDelete(testimonial.id)}
              className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-4">
            <Input 
              label="Quote" 
              value={testimonial.quote} 
              onChange={(v) => handleChange(testimonial.id, 'quote', v)} 
              multiline
            />
            <div className="grid grid-cols-3 gap-4">
              <Input 
                label="Author" 
                value={testimonial.author} 
                onChange={(v) => handleChange(testimonial.id, 'author', v)} 
              />
              <Input 
                label="Role" 
                value={testimonial.role} 
                onChange={(v) => handleChange(testimonial.id, 'role', v)} 
              />
              <Input 
                label="School" 
                value={testimonial.school} 
                onChange={(v) => handleChange(testimonial.id, 'school', v)} 
              />
            </div>
          </div>
        </Card>
      ))}
      
      <button
        onClick={handleAddTestimonial}
        className="w-full flex items-center justify-center gap-2 py-4 rounded-xl border-2 border-dashed border-white/10 text-titanium hover:text-white hover:border-electric-blue/50 transition-all"
      >
        <Plus className="w-5 h-5" />
        Add Testimonial
      </button>
      
      <Card>
        <h3 className="font-display text-lg font-semibold text-white mb-6">Partner Schools</h3>
        <Input 
          label="Schools (comma separated)" 
          value={partnerSchools.join(', ')} 
          onChange={(v) => {
            updatePartnerSchools(v.split(', ').filter(s => s.trim()));
            onSave();
          }} 
        />
      </Card>
    </div>
  );
}

// Contact Editor
function ContactEditor({ onSave }: { onSave: () => void }) {
  const { data, updateContact } = useStore();
  const { contact } = data;

  const handleChange = (key: string, value: string) => {
    updateContact({ [key]: value });
    onSave();
  };

  return (
    <div className="space-y-8">
      <SectionHeader 
        title="Contact Section" 
        description="Edit contact information and form settings." 
      />
      
      <Card>
        <h3 className="font-display text-lg font-semibold text-white mb-6">Header</h3>
        <div className="space-y-4">
          <Input label="Eyebrow" value={contact.eyebrow} onChange={(v) => handleChange('eyebrow', v)} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Title Line 1" value={contact.title1} onChange={(v) => handleChange('title1', v)} />
            <Input label="Title Line 2" value={contact.title2} onChange={(v) => handleChange('title2', v)} />
          </div>
          <Input label="Subtitle" value={contact.subtitle} onChange={(v) => handleChange('subtitle', v)} multiline />
        </div>
      </Card>
      
      <Card>
        <h3 className="font-display text-lg font-semibold text-white mb-6">Contact Details</h3>
        <div className="space-y-4">
          <Input label="Location" value={contact.location} onChange={(v) => handleChange('location', v)} multiline />
          <Input label="Email" value={contact.email} onChange={(v) => handleChange('email', v)} />
          <Input label="Phone" value={contact.phone} onChange={(v) => handleChange('phone', v)} />
        </div>
      </Card>
    </div>
  );
}

// Company Editor
function CompanyEditor({ onSave }: { onSave: () => void }) {
  const { data, updateCompany } = useStore();
  const { company } = data;

  const handleChange = (key: string, value: string) => {
    updateCompany({ [key]: value });
    onSave();
  };

  return (
    <div className="space-y-8">
      <SectionHeader 
        title="Company Info" 
        description="Edit general company information." 
      />
      
      <Card>
        <h3 className="font-display text-lg font-semibold text-white mb-6">Branding</h3>
        <div className="space-y-4">
          <Input label="Company Name" value={company.name} onChange={(v) => handleChange('name', v)} />
          <Input label="Tagline" value={company.tagline} onChange={(v) => handleChange('tagline', v)} multiline />
          <Input label="Copyright Text" value={company.copyright} onChange={(v) => handleChange('copyright', v)} />
        </div>
      </Card>
    </div>
  );
}
