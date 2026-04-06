export type UserRole = 'viewer' | 'admin';

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
  description: string;
}

export interface DashboardData {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
  transactions: Transaction[];
}

export interface Insight {
  title: string;
  value: string;
  icon: string;
  color: string;
}
