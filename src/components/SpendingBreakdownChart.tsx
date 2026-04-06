import React, { useState, useEffect } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Transaction } from '../types';
import { getCategoryColor } from '../data/mockData';

interface SpendingBreakdownChartProps {
  transactions: Transaction[];
}

export const SpendingBreakdownChart: React.FC<SpendingBreakdownChartProps> = ({
  transactions,
}) => {
  const [displayAmount, setDisplayAmount] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const categorySpending = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

  const chartData = Object.entries(categorySpending)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6)
    .map(([name, value]) => ({
      name,
      value: parseFloat(value.toFixed(2)),
      color: getCategoryColor(name),
    }));

  const totalSpending = chartData.reduce((sum, item) => sum + item.value, 0);

  // Animated number counter
  useEffect(() => {
    const duration = 1500;
    const start = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      setDisplayAmount(totalSpending * progress);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    animate();
  }, [totalSpending]);

  // Gradient colors for enhanced visual appeal
  const getGradientId = (index: number) => `gradient-${index}`;
  
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload[0]) {
      const percent = ((payload[0].value / totalSpending) * 100).toFixed(1);
      return (
        <div className="glass rounded-xl p-3 shadow-lg border border-blue-500/20 backdrop-blur-md">
          <p className="text-white font-semibold text-sm">{payload[0].name}</p>
          <p className="text-blue-300 font-bold">₹{payload[0].value.toFixed(0)}</p>
          <p className="text-gray-400 text-xs mt-1">{percent}% of total</p>
        </div>
      );
    }
    return null;
  };

  const CustomShape = (props: any) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, percent, index } = props;
    
    if (percent === 0) return null;

    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    const isHovered = hoveredIndex === index;

    return (
      <>
        {/* Label background for better contrast */}
        <circle
          cx={x}
          cy={y}
          r="16"
          fill="rgba(0, 0, 0, 0.5)"
          opacity={isHovered ? 0.8 : 0.4}
          style={{ transition: 'opacity 300ms ease-in-out' }}
        />
        {/* Percentage text */}
        <text
          x={x}
          y={y}
          fill="white"
          textAnchor="middle"
          dominantBaseline="central"
          fontSize="12"
          fontWeight="700"
          opacity={1}
          style={{
            filter: isHovered ? 'drop-shadow(0 0 6px rgba(59, 130, 246, 0.8))' : 'drop-shadow(0 0 3px rgba(0, 0, 0, 0.6))',
            transition: 'filter 300ms ease-in-out',
            pointerEvents: 'none'
          }}
        >
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      </>
    );
  };

  return (
    <div className="glass-dark rounded-2xl p-6 hover-lift relative overflow-hidden">
      {/* Premium background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none rounded-2xl" />
      
      <div className="relative z-10">
        <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse-glow" />
          Top Spending Categories
        </h3>

        {chartData.length > 0 ? (
          <div className="space-y-6">
            {/* Donut Chart */}
            <div className="relative h-96 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <defs>
                    {chartData.map((item, index) => (
                      <linearGradient
                        key={getGradientId(index)}
                        id={getGradientId(index)}
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor={item.color} stopOpacity={1} />
                        <stop offset="100%" stopColor={item.color} stopOpacity={0.7} />
                      </linearGradient>
                    ))}
                  </defs>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={<CustomShape />}
                    innerRadius={70}
                    outerRadius={130}
                    fill="#8884d8"
                    dataKey="value"
                    animationDuration={1000}
                    animationEasing="ease-out"
                    onMouseEnter={(_, index) => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    {chartData.map((_entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={`url(#${getGradientId(index)})`}
                        style={{
                          filter: hoveredIndex === index ? 'drop-shadow(0 0 15px rgba(59, 130, 246, 0.6))' : 'drop-shadow(0 0 5px rgba(0, 0, 0, 0.3))',
                          transition: 'filter 300ms ease-in-out'
                        }}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>

              {/* Center Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <div className="text-center">
                  <div className="text-3xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    ₹{Math.round(displayAmount).toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">Total Spent</div>
                </div>
              </div>
            </div>

            {/* Enhanced Legend */}
            <div className="grid grid-cols-2 gap-3">
              {chartData.map((item, index) => {
                const percentage = ((item.value / totalSpending) * 100).toFixed(1);
                return (
                  <div
                    key={index}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 cursor-pointer ${
                      hoveredIndex === index
                        ? 'bg-blue-500/15 border border-blue-400/30'
                        : 'bg-transparent border border-transparent'
                    }`}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0 shadow-lg"
                      style={{ backgroundColor: item.color }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-white truncate">{item.name}</p>
                      <p className="text-xs text-gray-400">
                        {percentage}% • ₹{item.value.toFixed(0)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="h-96 flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-400 text-sm">No expense data available</p>
              <p className="text-gray-500 text-xs mt-1">Add transactions to see spending breakdown</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
