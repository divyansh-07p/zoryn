import React from 'react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import { Transaction } from '../types';

interface BalanceTrendChartProps {
  transactions: Transaction[];
}

export const BalanceTrendChartV2: React.FC<BalanceTrendChartProps> = ({ transactions }) => {
  let balance = 0;
  const chartData = transactions
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(-12)
    .map(t => {
      balance += t.type === 'income' ? t.amount : -t.amount;
      return {
        date: new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        balance: Math.max(0, balance),
        fullDate: t.date,
      };
    });

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload[0]) {
      return (
        <div className="glass rounded-lg p-3 shadow-lg">
          <p className="text-blue-400 font-semibold">₹{payload[0].value.toFixed(2)}</p>
          <p className="text-gray-400 text-xs">{payload[0].payload.date}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-dark rounded-2xl p-6 hover-lift flex flex-col">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse-glow" />
        Balance Trend (Last 12 Transactions)
      </h3>
      
      <div className="w-full">
        <ResponsiveContainer width="100%" height={550}>
          <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(203, 213, 225, 0.1)" />
            <XAxis
              dataKey="date"
              stroke="#94a3b8"
              style={{ fontSize: '12px' }}
            />
            <YAxis
              stroke="#94a3b8"
              style={{ fontSize: '12px' }}
              tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="balance"
              stroke="#3b82f6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorBalance)"
              isAnimationActive={true}
              animationDuration={1000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
