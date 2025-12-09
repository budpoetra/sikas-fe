import React from "react";
import { TransactionItem } from "../../types/transaction";

interface TransactionTableProps {
  items: TransactionItem[];
  onQuantityChange: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
}

const TransactionTable: React.FC<TransactionTableProps> = ({
  items,
  onQuantityChange,
  onRemoveItem,
}) => {
  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + item.total, 0);
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-8 border border-gray-200 rounded-lg">
        <p className="text-gray-500">No products added yet. Search and select products to add them here.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden border border-gray-200 rounded-lg">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{item.name}</div>
                    <div className="text-sm text-gray-500">
                      Code: {item.code} | Barcode: {item.barcode}
                    </div>
                    {item.stock !== undefined && (
      <div className="text-xs text-gray-400 mt-1">
        Stock: {item.stock}
      </div>
    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{item.price}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <button
                      onClick={() => onQuantityChange(item.id, Math.max(1, item.quantity - 1))}
                      className="p-1 border border-gray-300 rounded-l-md hover:bg-gray-100"
                    >
                      <span className="w-6 h-6 flex items-center justify-center">-</span>
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => onQuantityChange(item.id, parseInt(e.target.value) || 1)}
                      className="w-16 text-center border-t border-b border-gray-300 py-1"
                    />
                    <button
                      onClick={() => onQuantityChange(item.id, item.quantity + 1)}
                      className="p-1 border border-gray-300 rounded-r-md hover:bg-gray-100"
                    >
                      <span className="w-6 h-6 flex items-center justify-center">+</span>
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-semibold text-gray-900">
                    {item.total}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-50">
            <tr>
              <td colSpan={3} className="px-6 py-4 text-right text-sm font-medium text-gray-900">
                Grand Total:
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-lg font-bold text-gray-900">
                  {calculateTotal()}
                </div>
              </td>
              <td className="px-6 py-4"></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;