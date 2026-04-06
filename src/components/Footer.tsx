import React from 'react';
import { Mail, Linkedin, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = React.useState('');
  const [_subscribed, setSubscribed] = React.useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="glass-dark mt-20 relative overflow-hidden">
      {/* Cinematic Premium Background Typography */}
      <div className="absolute inset-0 w-full h-full flex items-start justify-center pointer-events-none overflow-hidden mt-2">
        <div
          style={{
            fontSize: 'clamp(2.5rem, 15vw, 25rem)',
            fontWeight: 900,
            letterSpacing: '0.12em',
            textAlign: 'center',
            lineHeight: 1,
            fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
            textTransform: 'uppercase',
            opacity: 0.08,
            background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 25%, #a855f7 50%, #3b82f6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 0 40px rgba(59, 130, 246, 0.3)) drop-shadow(0 0 80px rgba(168, 85, 247, 0.2))',
            mixBlendMode: 'screen',
            textDecoration: 'none',
            willChange: 'transform',
            margin: '0 auto',
            padding: '0',
            width: 'fit-content',
            maxWidth: '95vw',
            flex: '0 0 auto'
          }}
        >
          ZORVYN
        </div>

        {/* Gradient lighting overlay - Blue glow from left */}
        <div
          style={{
            position: 'absolute',
            top: '-50%',
            left: '-20%',
            width: '60%',
            height: '200%',
            background: 'radial-gradient(ellipse at center, rgba(59, 130, 246, 0.2) 0%, transparent 70%)',
            opacity: 0.6,
            filter: 'blur(80px)',
            pointerEvents: 'none',
            zIndex: -1
          }}
        ></div>

        {/* Purple glow from right */}
        <div
          style={{
            position: 'absolute',
            top: '-50%',
            right: '-20%',
            width: '60%',
            height: '200%',
            background: 'radial-gradient(ellipse at center, rgba(168, 85, 247, 0.15) 0%, transparent 70%)',
            opacity: 0.5,
            filter: 'blur(80px)',
            pointerEvents: 'none',
            zIndex: -1
          }}
        ></div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-24 pb-4 relative z-10">
        {/* Top Section - Logo, Description & Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-10 mb-10">
          {/* Branding Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img 
                src="/zorvyn-logo.png" 
                alt="Zorvyn" 
                className="h-8 w-auto"
              />
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Building secure, compliant, and intelligent financial systems that scale with you. Trusted by 600+ companies worldwide.
            </p>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-white font-semibold text-xs uppercase tracking-wider mb-4">Products</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">Zorvyn Ledger</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">Zorvyn Comply</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">Zorvyn Insight</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">Pricing</a></li>
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-white font-semibold text-xs uppercase tracking-wider mb-4">Solutions</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">For Startups</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">For SMEs</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">For Enterprises</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold text-xs uppercase tracking-wider mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">Features</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">Security</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">FAQ</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold text-xs uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">Careers</a></li>
            </ul>
          </div>
        </div>

        {/* Middle Section - Subscribe & Contact */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 py-6 border-t border-blue-500/10">
          {/* Newsletter */}
          <div className="flex items-center gap-4">
            <span className="text-gray-400 text-sm whitespace-nowrap font-medium">Subscribe to Updates</span>
            <form onSubmit={handleSubscribe} className="flex items-center gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your work email"
                className="px-4 py-2.5 bg-dark-700/50 border border-dark-600/30 rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all"
                required
              />
              <button
                type="submit"
                className="p-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-300"
                title="Subscribe"
              >
                <Mail size={18} />
              </button>
            </form>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-8">
            <a 
              href="mailto:contact@zorvyn.io" 
              className="text-gray-400 hover:text-blue-400 transition-colors text-sm flex items-center gap-2"
            >
              <Mail size={16} />
              contact@zorvyn.io
            </a>
            <a 
              href="https://linkedin.com/company/zorvyn" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors"
              title="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>

        {/* Bottom Section - Copyright & Links */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-blue-500/10">
          <p className="text-xs text-gray-500">
            © 2026 Zorvyn FinTech Pvt. Ltd. All rights reserved.
          </p>
          
          <div className="flex items-center gap-8">
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">Terms</a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">Privacy</a>
            <button 
              onClick={scrollToTop}
              className="text-gray-400 hover:text-blue-400 transition-colors p-1"
              title="Back to top"
            >
              <ArrowUp size={18} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
