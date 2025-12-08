import React from 'react';
import { LowStockItem } from '../../services/dashboardService';

interface LowStockTableProps {
  items: LowStockItem[];
}

const LowStockTable: React.FC<LowStockTableProps> = ({ items }) => {
  const getStatusColor = (stock: number) => {
    if (stock <= 5) {
      return 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400';
    } else if (stock <= 10) {
      return 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400';
    }
    return 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400';
  };

  const getStatusText = (stock: number) => {
    if (stock <= 5) return 'Critical';
    if (stock <= 10) return 'Low';
    return 'Normal';
  };

  return (
    <div className="rounded-xl bg-white dark:bg-gray-800 shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          Low Stock Items
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Products that need restocking
        </p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Product Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {items.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                  No low stock items
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr
                  key={item.id}
                  className={`hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                    item.stock <= 5 ? 'bg-red-50/30 dark:bg-red-900/10' : ''
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {item.productName}
                    </div>
                    {item.category && (
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {item.category}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white font-semibold">
                      {item.stock}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        item.stock
                      )}`}
                    >
                      {getStatusText(item.stock)}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LowStockTable;
