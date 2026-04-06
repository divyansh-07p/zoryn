import React, { useState, useEffect } from 'react';
import { useDashboard } from './context/DashboardContext';
import { EnhancedHeader } from './components/EnhancedHeader';
import { SideNavbar } from './components/SideNavbar';
import { AnimatedSummaryCard } from './components/AnimatedSummaryCard';
import { BalanceTrendChartV2 } from './components/BalanceTrendChartV2';
import { SpendingBreakdownChart } from './components/SpendingBreakdownChart';
import { EnhancedInsights } from './components/EnhancedInsights';
import { EnhancedTransactionsList } from './components/EnhancedTransactionsList';
import { AddTransactionModal } from './components/AddTransactionModal';
import { Footer } from './components/Footer';
import { TrendingUp, TrendingDown, PieChart, Sparkles, Wallet } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { data, role, darkMode } = useDashboard();
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeSection, setActiveSection] = useState('Dashboard');

  // Apply/remove light-mode class based on darkMode state
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.remove('light-mode');
    } else {
      document.documentElement.classList.add('light-mode');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-900 to-dark-800">
      <EnhancedHeader onAddTransaction={() => setShowAddModal(true)} />

      <div className="flex min-h-screen flex-col lg:flex-row">
        {/* Sidebar */}
        <SideNavbar activeSection={activeSection} onSectionChange={setActiveSection} />

        {/* Main Content */}
        <main className="flex-1 w-full lg:ml-0 px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-10 lg:py-12 lg:pt-20">
          <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="mb-8 sm:mb-10 md:mb-12 animate-fade-in">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={18} className="text-purple-400 sm:scale-110" />
            <span className="text-purple-400 font-semibold text-xs sm:text-sm">Welcome Back</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 line-clamp-2">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {activeSection}
            </span>
          </h1>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg">Manage and track your financial data</p>
        </div>

        {/* Dashboard Section */}
        {activeSection === 'Dashboard' && (
          <>
            {/* Summary Cards */}
            <div className="mb-6 sm:mb-8 md:mb-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                <AnimatedSummaryCard
                  title="Total Balance"
                  value={data.totalBalance}
                  prefix="₹"
                  icon={<Wallet size={24} className="text-white" />}
                  color="bg-blue-500/20"
                  delay={0}
                />
                <AnimatedSummaryCard
                  title="Total Income"
                  value={data.totalIncome}
                  prefix="₹"
                  icon={<TrendingUp size={24} className="text-white" />}
                  color="bg-green-500/20"
                  trend={12}
                  delay={100}
                />
                <AnimatedSummaryCard
                  title="Total Expenses"
                  value={data.totalExpenses}
                  prefix="₹"
                  icon={<TrendingDown size={24} className="text-white" />}
                  color="bg-red-500/20"
                  trend={-5}
                  delay={200}
                />
                <AnimatedSummaryCard
                  title="Available"
                  value={Math.max(0, data.totalBalance)}
                  prefix="₹"
                  icon={<Wallet size={24} className="text-white" />}
                  color="bg-purple-500/20"
                  delay={300}
                />
              </div>
            </div>

            {/* Insights Section */}
            <div className="mb-6 sm:mb-8 md:mb-10">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2">
                <span className="w-1 h-4 sm:h-5 md:h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
                Key Insights
              </h2>
              <EnhancedInsights
                transactions={data.transactions}
                totalIncome={data.totalIncome}
                totalExpenses={data.totalExpenses}
              />
            </div>


            {/* Role Info Card */}
            <div className={`glass-dark rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 hover-lift border border-blue-500/20 animate-fade-in`}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-3 h-3 rounded-full ${role === 'admin' ? 'bg-green-400 animate-pulse' : 'bg-blue-400'}`} />
                    <p className="text-gray-400 text-sm font-medium">Current Mode</p>
                  </div>
                  <p className="text-2xl sm:text-3xl font-bold text-white capitalize">
                    {role === 'admin' ? '⚙️ Administrator' : '👁️ Viewer'}
                  </p>
                </div>
                <div className={`${role === 'admin' ? 'bg-green-500/10 border-green-500/50' : 'bg-blue-500/10 border-blue-500/50'} border rounded-lg sm:rounded-xl p-3 sm:p-4 w-full sm:max-w-md`}>
                  {role === 'admin' ? (
                    <p className="text-green-300 text-xs sm:text-sm leading-relaxed">
                      <span className="font-semibold">✓ Full Access:</span> You have administrator privileges. Use the "Add Transaction" button to create new entries, or hover over transactions to delete them.
                    </p>
                  ) : (
                    <p className="text-blue-300 text-xs sm:text-sm leading-relaxed">
                      <span className="font-semibold">→ View Only:</span> You're in viewer mode. Browse all financial data freely. Switch to Admin role in the header to manage transactions.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Analytics Section */}
        {activeSection === 'Analytics' && (
          <div className="mb-6 sm:mb-8 md:mb-12">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2">
              <span className="w-1 h-4 sm:h-5 md:h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full" />
              Financial Analytics
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <BalanceTrendChartV2 transactions={data.transactions} />
              <SpendingBreakdownChart transactions={data.transactions} />
            </div>
          </div>
        )}

        {/* Transactions Section */}
        {activeSection === 'Transactions' && (
          <div className="mb-6 sm:mb-8 md:mb-12">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2">
              <span className="w-1 h-4 sm:h-5 md:h-6 bg-gradient-to-b from-cyan-500 to-blue-500 rounded-full" />
              All Transactions
            </h2>
            <EnhancedTransactionsList transactions={data.transactions} />
          </div>
        )}

        {/* Portfolio Section */}
        {activeSection === 'Portfolio' && (
          <div className="mb-6 sm:mb-8 md:mb-12">
            <div className="glass-dark rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 hover-lift border border-blue-500/20">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-4 sm:mb-6">Your Portfolio</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                <AnimatedSummaryCard
                  title="Total Balance"
                  value={data.totalBalance}
                  prefix="₹"
                  icon={<Wallet size={24} className="text-white" />}
                  color="bg-blue-500/20"
                  delay={0}
                />
                <AnimatedSummaryCard
                  title="Total Income"
                  value={data.totalIncome}
                  prefix="₹"
                  icon={<TrendingUp size={24} className="text-white" />}
                  color="bg-green-500/20"
                  trend={12}
                  delay={100}
                />
                <AnimatedSummaryCard
                  title="Total Expenses"
                  value={data.totalExpenses}
                  prefix="₹"
                  icon={<TrendingDown size={24} className="text-white" />}
                  color="bg-red-500/20"
                  trend={-5}
                  delay={200}
                />
              </div>
              <div className="mt-6 sm:mt-8">
                <SpendingBreakdownChart transactions={data.transactions} />
              </div>
            </div>
          </div>
        )}
          </div>
        </main>
      </div>

      <Footer />

      <AddTransactionModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} />
    </div>
  );
};

export default Dashboard;
