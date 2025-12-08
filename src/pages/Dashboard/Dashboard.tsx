import React, { useEffect, useState } from 'react';
import PageMeta from '../../components/common/PageMeta';
import DashboardCard from '../../components/dashboard/DashboardCard';
import StockChart, { StockChartData } from '../../components/dashboard/StockChart';
import LowStockTable from '../../components/dashboard/LowStockTable';
import { getDashboardSummary, DashboardSummary } from '../../services/dashboardService';

// Icons (using simple SVG or emoji)
const ProductIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);

const StockIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const TransactionIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const Dashboard: React.FC = () => {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getDashboardSummary();
      setSummary(data);
    } catch (err: any) {
      console.error('Error loading dashboard:', err);
      setError(err.response?.data?.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  // Prepare chart data from low stock items
  const prepareChartData = (): StockChartData[] => {
    if (!summary?.lowStockItems) return [];
    
    // Take top 10 low stock items for chart
    return summary.lowStockItems.slice(0, 10).map(item => ({
      name: item.productName.length > 15 
        ? item.productName.substring(0, 15) + '...' 
        : item.productName,
      stock: item.stock,
    }));
  };

  if (loading) {
    return (
      <>
        <PageMeta
          title="Dashboard | SIKAS"
          description="Dashboard overview for SIKAS inventory management"
        />
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <PageMeta
          title="Dashboard | SIKAS"
          description="Dashboard overview for SIKAS inventory management"
        />
        <div className="rounded-xl bg-red-50 dark:bg-red-900/20 p-6 border border-red-200 dark:border-red-800">
          <h3 className="text-lg font-semibold text-red-800 dark:text-red-300 mb-2">
            Error Loading Dashboard
          </h3>
          <p className="text-red-600 dark:text-red-400">{error}</p>
          <button
            onClick={loadDashboardData}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <PageMeta
        title="Dashboard | SIKAS"
        description="Dashboard overview for SIKAS inventory management"
      />
      
      <div className="space-y-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Dashboard Overview
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome to SIKAS Inventory Management System
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DashboardCard
            title="Total Products"
            value={summary?.totalProducts || 0}
            icon={<ProductIcon />}
            bgColor="bg-gradient-to-r from-indigo-500 to-indigo-600"
          />
          <DashboardCard
            title="Total Stock"
            value={summary?.totalStock || 0}
            icon={<StockIcon />}
            bgColor="bg-gradient-to-r from-sky-500 to-sky-600"
          />
          <DashboardCard
            title="Today Transactions"
            value={summary?.todayTransactions || 0}
            icon={<TransactionIcon />}
            bgColor="bg-gradient-to-r from-cyan-500 to-cyan-600"
          />
        </div>

        {/* Stock Chart */}
        {summary && summary.lowStockItems.length > 0 && (
          <div className="mt-6">
            <StockChart data={prepareChartData()} />
          </div>
        )}

        {/* Low Stock Table */}
        <div className="mt-6">
          <LowStockTable items={summary?.lowStockItems || []} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
