import React, { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface AnimatedSummaryCardProps {
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
  icon: React.ReactNode;
  color: string;
  trend?: number;
  delay?: number;
}

export const AnimatedSummaryCard: React.FC<AnimatedSummaryCardProps> = ({
  title,
  value,
  prefix = '',
  suffix = '',
  icon,
  color,
  trend,
  delay = 0,
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const stepValue = value / steps;
    let current = 0;
    let step = 0;

    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        step++;
        current += stepValue;
        if (step >= steps) {
          setDisplayValue(value);
          clearInterval(interval);
        } else {
          setDisplayValue(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  const formatValue = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toFixed(2);
  };

  const isTrendPositive = trend !== undefined && trend >= 0;

  return (
    <div
      className={`glass-dark rounded-2xl p-6 hover-lift group overflow-hidden animate-fade-in`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Gradient Background */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${color === 'bg-blue-500/20' ? 'bg-blue-500' : color === 'bg-green-500/20' ? 'bg-green-500' : color === 'bg-red-500/20' ? 'bg-red-500' : 'bg-purple-500'}`} />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className={`${color} p-3 rounded-xl backdrop-blur-sm`}>
            {icon}
          </div>
          {trend !== undefined && (
            <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-sm font-semibold ${
              isTrendPositive
                ? 'bg-green-500/20 text-green-300'
                : 'bg-red-500/20 text-red-300'
            }`}>
              {isTrendPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              {Math.abs(trend)}%
            </div>
          )}
        </div>

        {/* Title */}
        <p className="text-gray-400 text-sm font-medium mb-2">{title}</p>

        {/* Value */}
        <div className="flex items-baseline gap-1">
          <p className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            {prefix}{formatValue(displayValue)}{suffix}
          </p>
        </div>

        {/* Bottom Text */}
        <p className="text-gray-500 text-xs mt-3">Updated just now</p>
      </div>

      {/* Animated Border */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none">
        <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-blue-500/30 transition-colors duration-300" />
      </div>
    </div>
  );
};
