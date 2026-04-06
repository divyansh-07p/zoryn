import React, { createContext, useContext, useState } from 'react';
import { Transaction, UserRole, DashboardData } from '../types';
import { mockDashboardData } from '../data/mockData';

interface DashboardContextType {
  data: DashboardData;
  role: UserRole;
  setRole: (role: UserRole) => void;
  addTransaction: (transaction: Transaction) => void;
  deleteTransaction: (id: string) => void;
  editTransaction: (id: string, transaction: Transaction) => void;
  darkMode: boolean;
  setDarkMode: (mode: boolean) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<DashboardData>({
    ...mockDashboardData,
    transactions: JSON.parse(localStorage.getItem('transactions') || JSON.stringify(mockDashboardData.transactions)),
  });
  const [role, setRole] = useState<UserRole>('viewer');
  const [darkMode, setDarkModeState] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved !== null ? JSON.parse(saved) : true;
  });

  // Persist dark mode preference
  const setDarkMode = (mode: boolean) => {
    setDarkModeState(mode);
    localStorage.setItem('darkMode', JSON.stringify(mode));
  };

  const addTransaction = (transaction: Transaction) => {
    const newTransactions = [...data.transactions, transaction];
    const newData = {
      ...data,
      transactions: newTransactions,
      totalBalance: data.totalBalance + (transaction.type === 'income' ? transaction.amount : -transaction.amount),
      totalIncome: transaction.type === 'income' ? data.totalIncome + transaction.amount : data.totalIncome,
      totalExpenses: transaction.type === 'expense' ? data.totalExpenses + transaction.amount : data.totalExpenses,
    };
    setData(newData);
    localStorage.setItem('transactions', JSON.stringify(newTransactions));
  };

  const deleteTransaction = (id: string) => {
    const transaction = data.transactions.find(t => t.id === id);
    if (!transaction) return;

    const newTransactions = data.transactions.filter(t => t.id !== id);
    const newData = {
      ...data,
      transactions: newTransactions,
      totalBalance: data.totalBalance - (transaction.type === 'income' ? transaction.amount : -transaction.amount),
      totalIncome: transaction.type === 'income' ? data.totalIncome - transaction.amount : data.totalIncome,
      totalExpenses: transaction.type === 'expense' ? data.totalExpenses - transaction.amount : data.totalExpenses,
    };
    setData(newData);
    localStorage.setItem('transactions', JSON.stringify(newTransactions));
  };

  const editTransaction = (id: string, updatedTransaction: Transaction) => {
    const oldTransaction = data.transactions.find(t => t.id === id);
    if (!oldTransaction) return;

    const newTransactions = data.transactions.map(t => t.id === id ? updatedTransaction : t);
    
    // Recalculate totals
    const totalIncome = newTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = newTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const newData = {
      ...data,
      transactions: newTransactions,
      totalBalance: totalIncome - totalExpenses,
      totalIncome,
      totalExpenses,
    };
    setData(newData);
    localStorage.setItem('transactions', JSON.stringify(newTransactions));
  };

  return (
    <DashboardContext.Provider value={{
      data,
      role,
      setRole,
      addTransaction,
      deleteTransaction,
      editTransaction,
      darkMode,
      setDarkMode,
    }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within DashboardProvider');
  }
  return context;
};
