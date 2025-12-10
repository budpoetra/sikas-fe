import axios from 'axios';
import { env } from '@/config/env';

export interface LowStockItem {
  id: number;
  productName: string;
  stock: number;
  category?: string;
}

export interface DashboardSummary {
  totalProducts: number;
  totalStock: number;
  todayTransactions: number;
  lowStockItems: LowStockItem[];
}

const API_BASE_URL = env.VITE_API_URL;

// axios instance with token
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Insert token from localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

/**
 * Get dashboard summary data
 * GET /dashboard/summary
 */
export const getDashboardSummary = async (): Promise<DashboardSummary> => {
  try {
    console.log('Fetching dashboard summary from:', '/dashboard/summary');

    const response = await api.get('/dashboard/summary');

    console.log('Dashboard response:', response.data);

    // Return data based on ResponseFactory format
    return response.data?.data || response.data;

  } catch (error: any) {
    console.error('Error fetching dashboard summary:', error);

    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }

    throw error;
  }
};
