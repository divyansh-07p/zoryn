import { Transaction, DashboardData } from '../types';

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: '2024-04-03',
    amount: 2500,
    category: 'Salary',
    type: 'income',
    description: 'Monthly salary'
  },
  {
    id: '2',
    date: '2024-04-02',
    amount: 450,
    category: 'Groceries',
    type: 'expense',
    description: 'Weekly groceries'
  },
  {
    id: '3',
    date: '2024-04-01',
    amount: 120,
    category: 'Utilities',
    type: 'expense',
    description: 'Electricity bill'
  },
  {
    id: '4',
    date: '2024-03-31',
    amount: 1000,
    category: 'Freelance',
    type: 'income',
    description: 'Project payment'
  },
  {
    id: '5',
    date: '2024-03-30',
    amount: 80,
    category: 'Entertainment',
    type: 'expense',
    description: 'Movie tickets'
  },
  {
    id: '6',
    date: '2024-03-29',
    amount: 200,
    category: 'Healthcare',
    type: 'expense',
    description: 'Pharmacy'
  },
  {
    id: '7',
    date: '2024-03-28',
    amount: 1200,
    category: 'Rent',
    type: 'expense',
    description: 'Monthly rent'
  },
  {
    id: '8',
    date: '2024-03-27',
    amount: 150,
    category: 'Dining',
    type: 'expense',
    description: 'Restaurant'
  },
  {
    id: '9',
    date: '2024-03-26',
    amount: 500,
    category: 'Insurance',
    type: 'expense',
    description: 'Health insurance'
  },
  {
    id: '10',
    date: '2024-03-25',
    amount: 3000,
    category: 'Bonus',
    type: 'income',
    description: 'Performance bonus'
  },
  {
    id: '11',
    date: '2024-03-24',
    amount: 250,
    category: 'Shopping',
    type: 'expense',
    description: 'Clothes'
  },
  {
    id: '12',
    date: '2024-03-23',
    amount: 75,
    category: 'Transport',
    type: 'expense',
    description: 'Taxi fare'
  },
];

export const mockDashboardData: DashboardData = {
  totalBalance: 7245,
  totalIncome: 7500,
  totalExpenses: 3755,
  transactions: mockTransactions,
};

export const categoryColors: Record<string, string> = {
  'Salary': '#3b82f6',
  'Freelance': '#06b6d4',
  'Bonus': '#10b981',
  'Groceries': '#f59e0b',
  'Utilities': '#ef4444',
  'Entertainment': '#8b5cf6',
  'Healthcare': '#ec4899',
  'Rent': '#6366f1',
  'Dining': '#f97316',
  'Insurance': '#14b8a6',
  'Shopping': '#d946ef',
  'Transport': '#64748b',
};

export const getCategoryColor = (category: string): string => {
  return categoryColors[category] || '#64748b';
};
