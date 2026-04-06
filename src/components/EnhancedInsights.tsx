import React from 'react';
import { Transaction } from '../types';
import { Target, TrendingUp, Zap, AlertCircle, ArrowRight } from 'lucide-react';

interface EnhancedInsightsProps {
  transactions: Transaction[];
  totalIncome: number;
  totalExpenses: number;
}

export const EnhancedInsights: React.FC<EnhancedInsightsProps> = ({
  transactions,
  totalIncome,
  totalExpenses,
}) => {
  // Find highest spending category
  const categorySpending = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

  const highestCategory = Object.entries(categorySpending).sort(([, a], [, b]) => b - a)[0];
  const savingsRate = totalIncome > 0 ? parseFloat(((totalIncome - totalExpenses) / totalIncome * 100).toFixed(1)) : 0;

  const avgTransaction = transactions.length > 0
    ? parseFloat((totalExpenses / transactions.filter(t => t.type === 'expense').length).toFixed(2))
    : 0;

  const today = new Date();
  const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
  const currentMonthExpenses = transactions
    .filter(t => t.type === 'expense' && new Date(t.date) > thirtyDaysAgo)
    .reduce((sum, t) => sum + t.amount, 0);

  const insights = [
    {
      icon: Target,
      title: 'Savings Rate',
      value: `${savingsRate}%`,
      subtitle: 'Of income saved',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      icon: TrendingUp,
      title: 'Top Category',
      value: highestCategory ? highestCategory[0] : 'N/A',
      subtitle: highestCategory ? `₹${highestCategory[1].toFixed(2)}` : 'No data',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/10',
    },
    {
      icon: Zap,
      title: 'Avg. Expense',
      value: `₹${avgTransaction.toFixed(2)}`,
      subtitle: 'Per transaction',
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-500/10',
    },
    {
      icon: AlertCircle,
      title: 'This Month',
      value: `₹${currentMonthExpenses.toFixed(2)}`,
      subtitle: 'Total spent (30d)',
      color: 'from-red-500 to-pink-500',
      bgColor: 'bg-red-500/10',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {insights.map((insight, index) => {
        const Icon = insight.icon;
        return (
          <div
            key={index}
            className={`glass-dark rounded-2xl p-6 hover-lift group overflow-hidden animate-fade-in`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Background Gradient */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${insight.bgColor}`} />

            <div className="relative z-10">
              {/* Icon */}
              <div className={`w-12 h-12 mb-4 rounded-xl bg-gradient-to-br ${insight.color} p-2.5 flex items-center justify-center text-white shadow-glow group-hover:shadow-hover transition-all duration-300`}>
                <Icon size={24} />
              </div>

              {/* Title */}
              <p className="text-gray-400 text-sm font-medium mb-2">{insight.title}</p>

              {/* Value */}
              <p className={`text-3xl font-bold bg-gradient-to-r ${insight.color} bg-clip-text text-transparent mb-2`}>
                {insight.value}
              </p>

              {/* Subtitle */}
              <p className="text-gray-500 text-xs mb-4">{insight.subtitle}</p>

              {/* Divider Line */}
              <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent opacity-50 mb-3" />

              {/* Action Text */}
              <div className="flex items-center text-xs text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span>View Details</span>
                <ArrowRight size={12} className="ml-1" />
              </div>
            </div>

            {/* Border Animation */}
            <div className="absolute inset-0 rounded-2xl pointer-events-none">
              <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-blue-500/30 transition-colors duration-300" />
            </div>
          </div>
        );
      })}
    </div>
  );
};
