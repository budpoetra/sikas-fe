// services/transactionService.ts
import axios, { AxiosInstance } from 'axios';
import { env } from '@/config/env';

export interface TransactionDetail {
  productId: number;
  qtyTransaction: number;
}

export interface TransactionRequest {
  transactionDetails: TransactionDetail[];
}

export interface TransactionResponse {
  id: number;
  transactionDate: string;
  totalAmount: number;
  transactionDetails: {
    id: number;
    productId: number;
    productName: string;
    qtyTransaction: number;
    price: number;
    subtotal: number;
  }[];
}

class TransactionService {
  private api: AxiosInstance;

  constructor() {
    const baseURL = env.VITE_API_URL;

    this.api = axios.create({
      baseURL,
      withCredentials: false,
    });

    // Interceptor untuk menambahkan token ke header
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  // Get product by ID
  async getProductById(id: number) {
    try {
      const response = await this.api.get(`/product/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  }

  // Search products by query (name, code, or barcode)
  async searchProducts(query: string) {
    try {
      const response = await this.api.get(`/products/search`, {
        params: { q: query }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  }

  // Create new transaction
  async createTransaction(transactionData: TransactionRequest) {
    try {
      const response = await this.api.post('/transactions', transactionData);
      return response.data;
    } catch (error) {
      console.error('Error creating transaction:', error);
      throw error;
    }
  }

  // Get all transactions (optional)
  async getTransactions() {
    try {
      const response = await this.api.get('/transactions');
      return response.data;
    } catch (error) {
      console.error('Error fetching transactions:', error);
      throw error;
    }
  }

  // Get transaction by ID (optional)
  async getTransactionById(id: number) {
    try {
      const response = await this.api.get(`/transactions/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching transaction:', error);
      throw error;
    }
  }

  // Get product by code or barcode (optional)
  async getProductByCodeOrBarcode(codebarcode: string) {
    try {
      const response = await this.api.get(`/product/code-or-barcode`, {
        params: { value: codebarcode }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching transaction:', error);
      throw error;
    }
  }
}

export default new TransactionService();