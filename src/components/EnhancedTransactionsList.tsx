import React, { useState, useMemo } from 'react';
import { Transaction } from '../types';
import { ArrowUpRight, ArrowDownLeft, Trash2, Search, Filter } from 'lucide-react';
import { getCategoryColor } from '../data/mockData';
import { useDashboard } from '../context/DashboardContext';

interface EnhancedTransactionsListProps {
  transactions: Transaction[];
}

export const EnhancedTransactionsList: React.FC<EnhancedTransactionsListProps> = ({
  transactions,
}) => {
  const { role, deleteTransaction } = useDashboard();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let result = transactions.filter(t => {
      const matchesSearch =
        t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || t.type === filterType;
      return matchesSearch && matchesType;
    });

    result = result.sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else {
        return b.amount - a.amount;
      }
    });

    return result;
  }, [transactions, searchTerm, filterType, sortBy]);

  return (
    <div className="glass-dark rounded-2xl p-6 hover-lift animate-fade-in">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full animate-pulse-glow" />
        Recent Transactions
      </h3>

      {/* Enhanced Search Bar */}
      <div className="mb-4 relative group">
        <Search size={18} className="absolute left-3 top-3 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
        <input
          type="text"
          placeholder="Search transactions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-dark-700/50 border border-dark-600/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:shadow-glow transition-all duration-300"
        />
      </div>

      {/* Filters and Sort */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="flex gap-2">
          {(['all', 'income', 'expense'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover-scale ${
                filterType === type
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-glow'
                  : 'bg-dark-700/50 text-gray-400 hover:bg-dark-700'
              }`}
            >
              {type === 'all' ? 'All' : type === 'income' ? 'Income' : 'Expenses'}
            </button>
          ))}
        </div>

        <div className="sm:ml-auto">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'date' | 'amount')}
            className="px-4 py-2 bg-dark-700/50 border border-dark-600/50 rounded-lg text-sm text-gray-300 focus:outline-none focus:border-blue-500 transition-all"
          >
            <option value="date">Sort by Date</option>
            <option value="amount">Sort by Amount</option>
          </select>
        </div>
      </div>

      {/* Transactions List */}
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {filtered.length > 0 ? (
          filtered.map((transaction, index) => (
            <div
              key={transaction.id}
              className="group relative animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
              onMouseEnter={() => setHoveredId(transaction.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="flex items-center justify-between p-4 bg-dark-700/40 backdrop-blur-sm rounded-xl hover:bg-dark-700/60 transition-all duration-300 border border-dark-600/30 group-hover:border-blue-500/50">
                {/* Left Section */}
                <div className="flex items-center gap-4 flex-1">
                  <div
                    className={`p-3 rounded-xl transition-all duration-300 group-hover:scale-110`}
                    style={{ backgroundColor: getCategoryColor(transaction.category) + '20' }}
                  >
                    {transaction.type === 'income' ? (
                      <ArrowUpRight size={18} style={{ color: getCategoryColor(transaction.category) }} />
                    ) : (
                      <ArrowDownLeft size={18} style={{ color: getCategoryColor(transaction.category) }} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate">{transaction.category}</p>
                    <p className="text-gray-400 text-sm truncate">{transaction.description}</p>
                  </div>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p
                      className={`font-semibold text-sm ${
                        transaction.type === 'income' ? 'text-green-400' : 'text-red-400'
                      }`}
                    >
                      {transaction.type === 'income' ? '+' : '-'}₹{transaction.amount.toFixed(2)}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {new Date(transaction.date).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Delete Button */}
                  {role === 'admin' && hoveredId === transaction.id && (
                    <button
                      onClick={() => deleteTransaction(transaction.id)}
                      className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-all duration-300 animate-scale-in hover-scale"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <Filter size={32} className="mx-auto mb-3 text-gray-500 opacity-50" />
            <p className="text-gray-400">No transactions found</p>
          </div>
        )}
      </div>
    </div>
  );
};
