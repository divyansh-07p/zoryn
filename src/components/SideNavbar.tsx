import React, { useState } from 'react';
import { useDashboard } from '../context/DashboardContext';
import {
  Menu,
  X,
  Home,
  TrendingUp,
  Settings,
  HelpCircle,
  LogOut,
  BarChart3,
  CreditCard,
  PieChart,
  Clock
} from 'lucide-react';

interface SideNavbarProps {
  isOpen?: boolean;
  onClose?: () => void;
  activeSection?: string;
  onSectionChange?: (section: string) => void;
}

export const SideNavbar: React.FC<SideNavbarProps> = ({ 
  isOpen: initialOpen = true,
  activeSection: propActiveSection = 'Dashboard',
  onSectionChange
}) => {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [activeItem, setActiveItem] = useState(propActiveSection);
  const { role, setRole } = useDashboard();

  // Sync local state with prop
  React.useEffect(() => {
    setActiveItem(propActiveSection);
  }, [propActiveSection]);

  const menuItems = [
    { name: 'Dashboard', icon: Home, color: 'text-blue-400' },
    { name: 'Portfolio', icon: TrendingUp, color: 'text-purple-400' },
    { name: 'Transactions', icon: CreditCard, color: 'text-green-400' },
    { name: 'Analytics', icon: BarChart3, color: 'text-pink-400' },
  ];

  const secondaryItems = [
    { name: 'Spending Trends', icon: PieChart, color: 'text-cyan-400' },
    { name: 'History', icon: Clock, color: 'text-orange-400' },
  ];

  const bottomItems = [
    { name: 'Settings', icon: Settings, color: 'text-gray-400' },
    { name: 'Help & Support', icon: HelpCircle, color: 'text-gray-400' },
  ];

  const NavItem = ({ name, icon: Icon, color }: any) => (
    <button
      onClick={() => {
        setActiveItem(name);
        if (onSectionChange) {
          onSectionChange(name);
        }
        // Close sidebar on mobile after selecting a menu item
        if (window.innerWidth < 1024) {
          setIsOpen(false);
        }
      }}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
        (propActiveSection === name || activeItem === name)
          ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 shadow-lg shadow-blue-500/10'
          : 'hover:bg-white/5 text-gray-300'
      }`}
    >
      <Icon size={20} className={(propActiveSection === name || activeItem === name) ? color : 'text-gray-400'} />
      <span className={`text-sm font-medium ${(propActiveSection === name || activeItem === name) ? 'text-white' : ''}`}>
        {name}
      </span>
    </button>
  );

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-20 left-5 z-50 lg:hidden bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/40 p-2.5 rounded-lg hover:bg-blue-500/30 hover:border-blue-400/60 transition-all duration-300 shadow-lg hover:shadow-xl"
        title={isOpen ? 'Close sidebar' : 'Open sidebar'}
        aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={22} className="text-white" /> : <Menu size={22} className="text-white" />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
          role="presentation"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-16 glass-dark border-r border-blue-500/10 flex flex-col z-40 transition-all duration-300 ease-in-out ${
          isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        } lg:translate-x-0 lg:w-64 lg:sticky lg:top-16 overflow-hidden w-64`}
        style={{ height: 'calc(100vh - 64px)' }}
      >

        {/* Role Selector - Fixed */}
        <div className="px-4 py-4 mt-4 flex-shrink-0">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-2 mb-3">Role:</p>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as 'viewer' | 'admin')}
            className="w-full px-3 py-2.5 bg-dark-700/60 border border-blue-400/30 rounded-lg text-sm text-gray-300 focus:outline-none focus:border-blue-400/60 focus:bg-dark-700 focus:text-white transition-all hover:border-blue-400/50 hover:bg-dark-700/80 appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2394a3b8' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 8px center',
              backgroundAttachment: 'scroll',
              paddingRight: '32px'
            }}
          >
            <option value="viewer">👁️ Viewer</option>
            <option value="admin">⚙️ Admin</option>
          </select>
        </div>

        {/* Main Navigation - Scrollable */}
        <nav className="px-4 py-6 space-y-2 flex-1 overflow-y-auto">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-2 mb-4">
            Menu
          </p>
          {menuItems.map((item) => (
            <NavItem key={item.name} {...item} />
          ))}

          {/* Divider */}
          <div className="my-4 border-t border-blue-500/10" />

          {/* Secondary Items */}
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-2 mb-4">
            Tools
          </p>
          {secondaryItems.map((item) => (
            <NavItem key={item.name} {...item} />
          ))}
        </nav>

        {/* Bottom Section - Fixed */}
        <div className="px-4 py-3 border-t border-blue-500/10 space-y-2 flex-shrink-0">
          {bottomItems.map((item) => (
            <NavItem key={item.name} {...item} />
          ))}
          
          {/* Logout Button */}
          <button 
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-all duration-300 border border-transparent hover:border-red-400/30"
            onClick={() => {
              // Close sidebar on mobile after logout
              if (window.innerWidth < 1024) {
                setIsOpen(false);
              }
            }}
          >
            <LogOut size={20} />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};
