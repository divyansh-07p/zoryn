import React from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';

interface EnhancedHeaderProps {
  onAddTransaction?: () => void;
}

export const EnhancedHeader: React.FC<EnhancedHeaderProps> = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [solutionsOpen, setSolutionsOpen] = React.useState(false);
  const [companyOpen, setCompanyOpen] = React.useState(false);

  return (
    <header className="glass-dark sticky top-0 z-50 backdrop-blur-xl border-b border-blue-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-4">
        <div className="flex items-center justify-between h-12">
          {/* Logo */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <img 
              src="/zorvyn-logo.png" 
              alt="Zorvyn Logo" 
              className="h-10 w-auto"
            />
          </div>

          {/* Desktop Menu - Centered */}
          <div className="hidden lg:flex items-center gap-8 flex-1 justify-center">
            <a href="#" className="text-white hover:text-blue-400 transition-colors text-sm font-medium">Home</a>
            
            {/* Solutions Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors text-sm font-medium">
                Solutions
                <ChevronDown size={16} className="group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-dark-700/95 border border-blue-500/20 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all p-2 space-y-2">
                <a href="#" className="block px-3 py-2 text-gray-300 hover:text-blue-400 hover:bg-blue-500/10 rounded transition-colors text-sm">For Startups</a>
                <a href="#" className="block px-3 py-2 text-gray-300 hover:text-blue-400 hover:bg-blue-500/10 rounded transition-colors text-sm">For SMEs</a>
                <a href="#" className="block px-3 py-2 text-gray-300 hover:text-blue-400 hover:bg-blue-500/10 rounded transition-colors text-sm">For Enterprises</a>
              </div>
            </div>

            <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Features</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Pricing</a>
            
            {/* Company Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors text-sm font-medium">
                Company
                <ChevronDown size={16} className="group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-dark-700/95 border border-blue-500/20 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all p-2 space-y-2">
                <a href="#" className="block px-3 py-2 text-gray-300 hover:text-blue-400 hover:bg-blue-500/10 rounded transition-colors text-sm">About Us</a>
                <a href="#" className="block px-3 py-2 text-gray-300 hover:text-blue-400 hover:bg-blue-500/10 rounded transition-colors text-sm">Contact Us</a>
                <a href="#" className="block px-3 py-2 text-gray-300 hover:text-blue-400 hover:bg-blue-500/10 rounded transition-colors text-sm">Careers</a>
              </div>
            </div>
          </div>

          {/* Contact Sales Button - Right aligned */}
          <div className="hidden lg:flex items-center flex-shrink-0">
            <button className="px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-all duration-300 flex items-center gap-2">
              Contact Sales
              <span>→</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 hover:bg-dark-700/50 rounded-lg transition-colors"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-dark-700 space-y-3 animate-slide-in-up pb-4">
            <a href="#" className="block px-3 py-2 text-gray-300 hover:text-white transition-colors text-sm">Home</a>
            
            {/* Mobile Solutions */}
            <div>
              <button 
                onClick={() => setSolutionsOpen(!solutionsOpen)}
                className="w-full flex items-center justify-between px-3 py-2 text-gray-300 hover:text-white transition-colors text-sm"
              >
                Solutions
                <ChevronDown size={16} className={`transition-transform ${solutionsOpen ? 'rotate-180' : ''}`} />
              </button>
              {solutionsOpen && (
                <div className="ml-4 space-y-2 mt-2">
                  <a href="#" className="block px-3 py-2 text-gray-400 hover:text-blue-400 text-sm">For Startups</a>
                  <a href="#" className="block px-3 py-2 text-gray-400 hover:text-blue-400 text-sm">For SMEs</a>
                  <a href="#" className="block px-3 py-2 text-gray-400 hover:text-blue-400 text-sm">For Enterprises</a>
                </div>
              )}
            </div>

            <a href="#" className="block px-3 py-2 text-gray-300 hover:text-white transition-colors text-sm">Features</a>
            <a href="#" className="block px-3 py-2 text-gray-300 hover:text-white transition-colors text-sm">Pricing</a>
            
            {/* Mobile Company */}
            <div>
              <button 
                onClick={() => setCompanyOpen(!companyOpen)}
                className="w-full flex items-center justify-between px-3 py-2 text-gray-300 hover:text-white transition-colors text-sm"
              >
                Company
                <ChevronDown size={16} className={`transition-transform ${companyOpen ? 'rotate-180' : ''}`} />
              </button>
              {companyOpen && (
                <div className="ml-4 space-y-2 mt-2">
                  <a href="#" className="block px-3 py-2 text-gray-400 hover:text-blue-400 text-sm">About Us</a>
                  <a href="#" className="block px-3 py-2 text-gray-400 hover:text-blue-400 text-sm">Contact Us</a>
                  <a href="#" className="block px-3 py-2 text-gray-400 hover:text-blue-400 text-sm">Careers</a>
                </div>
              )}
            </div>

            <button className="w-full px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 mt-4">
              Contact Sales
              <span>→</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
