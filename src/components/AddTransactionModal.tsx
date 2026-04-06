import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { Transaction } from '../types';
import { useDashboard } from '../context/DashboardContext';

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const categories = [
  'Salary',
  'Freelance',
  'Bonus',
  'Groceries',
  'Utilities',
  'Entertainment',
  'Healthcare',
  'Rent',
  'Dining',
  'Insurance',
  'Shopping',
  'Transport',
];

export const AddTransactionModal: React.FC<AddTransactionModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { addTransaction } = useDashboard();
  const [formData, setFormData] = useState({
    type: 'expense' as 'income' | 'expense',
    amount: '',
    category: categories[0],
    description: '',
    date: new Date().toISOString().split('T')[0],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.amount || !formData.description) {
      alert('Please fill all fields');
      return;
    }

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type: formData.type,
      amount: parseFloat(formData.amount),
      category: formData.category,
      description: formData.description,
      date: formData.date,
    };

    addTransaction(newTransaction);
    
    setFormData({
      type: 'expense',
      amount: '',
      category: categories[0],
      description: '',
      date: new Date().toISOString().split('T')[0],
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="glass-dark rounded-2xl p-8 w-full max-w-md border border-blue-500/20 animate-bounce-in shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Plus size={24} className="text-blue-400" />
              Add Transaction
            </h2>
            <p className="text-gray-400 text-sm mt-1">Track a new income or expense</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-dark-700/50 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">Transaction Type</label>
            <div className="flex gap-4">
              {(['income', 'expense'] as const).map((t) => (
                <label key={t} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="type"
                    value={t}
                    checked={formData.type === t}
                    onChange={handleChange}
                    className="w-4 h-4 cursor-pointer"
                  />
                  <span className={`font-medium transition-colors ${
                    formData.type === t
                      ? t === 'income' ? 'text-green-400' : 'text-red-400'
                      : 'text-gray-400 group-hover:text-gray-300'
                  }`}>
                    {t === 'income' ? '📈 Income' : '📉 Expense'}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Amount (₹)</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
              min="0"
              className="w-full px-4 py-3 bg-dark-700/50 border border-dark-600/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:shadow-glow transition-all"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-dark-700/50 border border-dark-600/50 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-all"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-dark-700/50 border border-dark-600/50 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-all"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="What was this transaction for?"
              rows={3}
              className="w-full px-4 py-3 bg-dark-700/50 border border-dark-600/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-dark-700/50 text-gray-300 rounded-xl hover:bg-dark-700 transition-all font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover-lift btn-glow font-medium flex items-center justify-center gap-2"
            >
              <Plus size={18} />
              Add Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
