import React, { ReactNode } from 'react';

export interface DashboardCardProps {
  title: string;
  value: number | string;
  icon?: ReactNode;
  bgColor?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ 
  title, 
  value, 
  icon,
  bgColor = 'bg-gradient-to-r from-indigo-500 via-sky-500 to-cyan-400'
}) => {
  return (
    <div className="rounded-xl bg-white dark:bg-gray-800 shadow-lg p-6 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
          {title}
        </h3>
        {icon && (
          <div className={`p-3 rounded-lg ${bgColor}`}>
            <div className="text-white text-xl">
              {icon}
            </div>
          </div>
        )}
      </div>
      <div className="text-3xl font-bold text-gray-800 dark:text-white">
        {typeof value === 'number' ? value.toLocaleString() : value}
      </div>
    </div>
  );
};

export default DashboardCard;
