// src/services/userService.ts
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { env } from '@/config/env';

// Interface sesuai response API
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  status: number;
  data: T;
  timestamp: string;
}

export interface User {
  id: number;
  fullName: string;
  username: string;
  email: string;
  phone: string;
  typeName: string;
  typeId?: number;
}

export interface PaginatedUsers {
  content: User[];
  meta: {
    page: number;
    size: number;
    totalItems: number;
    totalPages: number;
  };
  links: {
    self: string;
    next: string | null;
    prev: string | null;
  };
}

// Type untuk params
export interface FetchUsersParams {
  page?: number;
  size?: number;
  search?: string;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
}

// Buat instance axios dengan konfigurasi default
const createAxiosInstance = (): AxiosInstance => {
  // Validasi environment variable
  const baseURL = env.VITE_API_URL;

  if (!baseURL) {
    console.error('VITE_API_URL is not defined in environment variables');
  }

  const instance = axios.create({
    baseURL,
    timeout: 10000, // 10 seconds timeout untuk development
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    withCredentials: false,
  });


  // Interceptor untuk request
  instance.interceptors.request.use(
    (config) => {
      // Ambil token dari localStorage
      const token = localStorage.getItem('token');

      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      // Tambahkan logging untuk development
      if (import.meta.env.VITE_ENV === 'development') {
        console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`, {
          params: config.params,
          headers: config.headers
        });
      }

      return config;
    },
    (error) => {
      console.error('Request interceptor error:', error);
      return Promise.reject(error);
    }
  );

  // Interceptor untuk response
  instance.interceptors.response.use(
    (response) => {
      // Logging untuk development
      if (import.meta.env.DEV) {
        console.log(`API Response: ${response.status} ${response.config.url}`, {
          data: response.data,
          headers: response.headers
        });
      }
      return response;
    },
    (error) => {
      // Handle error globally
      if (error.response) {
        const { status, data, config } = error.response;

        console.error('API Error Response:', {
          status,
          data,
          url: config?.url,
          method: config?.method,
        });

        // Handle specific status codes
        if (status === 401) {
          // Unauthorized - clear token dan redirect
          localStorage.removeItem('token');
          // Gunakan window.location untuk full page reload atau routing library Anda
          if (window.location.pathname !== '/signin') {
            window.location.href = '/signin';
          }
        }

        if (status === 403) {
          console.warn('Access forbidden - insufficient permissions');
          // Bisa ditambahkan notifikasi UI di sini
        }

        if (status === 404) {
          console.warn('Resource not found');
        }

        if (status >= 500) {
          console.error('Server error occurred');
        }

        // Return error dengan pesan dari server jika ada
        return Promise.reject({
          message: data?.message || `HTTP Error ${status}`,
          status,
          data
        });
      } else if (error.request) {
        // Request dibuat tapi tidak ada response (network error)
        console.error('No response received (Network Error):', error.request);
        return Promise.reject({
          message: 'Network error - please check your connection',
          isNetworkError: true
        });
      } else {
        // Error saat setup request
        console.error('Request setup error:', error.message);
        return Promise.reject(error);
      }
    }
  );

  return instance;
};

const api = createAxiosInstance();

// Fungsi utama untuk fetch users dengan pagination
export const fetchUsers = async (params?: FetchUsersParams): Promise<PaginatedUsers> => {
  try {
    // Default parameters
    const defaultParams: FetchUsersParams = {
      page: 0,
      size: 10,
      ...params
    };

    console.log('Fetching users with params:', defaultParams);

    const response: AxiosResponse<ApiResponse<PaginatedUsers>> = await api.get('/user/list', {
      params: defaultParams
    });

    console.log('API Response:', response.data);

    // Validasi struktur response
    if (!response.data.success) {
      console.error('API Error:', response.data.message);
      throw new Error(response.data.message || 'API request was not successful');
    }

    // Pastikan data ada dan dalam format yang diharapkan
    if (!response.data.data) {
      console.error('No data in response');
      throw new Error('No data received from API');
    }

    // Debug struktur data
    console.log('Response data structure:', {
      content: response.data.data.content,
      meta: response.data.data.meta,
      hasContent: Array.isArray(response.data.data.content),
      contentLength: response.data.data.content?.length
    });

    return response.data.data;
  } catch (error) {
    console.error('Error in fetchUsers:', error);
    throw error;
  }
};

// Helper function untuk transform API User ke UI User (jika diperlukan)
// export const transformApiUserToUiUser = (apiUser: User): User => {
//   return {
//     ...apiUser,
//     // Mapping tambahan untuk UI lama jika diperlukan
//     user: {
//       // image: apiUser.image || '/images/default-avatar.png',
//       name: apiUser.fullName,
//       role: apiUser.typeName
//     },
//     projectName: 'Project Placeholder', // Atau ambil dari data lain
//     team: {
//       images: [] // Atau tambahkan jika ada data
//     },
//     status: 'Active', // Atau berdasarkan status di API
//     budget: '0' // Atau tambahkan jika ada data
//   };
// };

// Fungsi untuk mendapatkan single user
export const fetchUserById = async (id: number): Promise<User> => {
  try {
    const response: AxiosResponse<ApiResponse<User>> = await api.get(`/user/${id}`);

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to fetch user');
    }

    return response.data.data;
  } catch (error) {
    console.error(`Error fetching user with id ${id}:`, error);
    throw error;
  }
};

// Fungsi untuk create user
export const createUser = async (userData: Partial<User>): Promise<User> => {
  try {
    const response: AxiosResponse<ApiResponse<User>> = await api.post('/user', userData);

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to create user');
    }

    return response.data.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Fungsi untuk update user
export const updateUser = async (id: number, userData: Partial<User>): Promise<User> => {
  try {
    const response: AxiosResponse<ApiResponse<User>> = await api.patch(`/user/${id}`, userData);

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to update user');
    }

    return response.data.data;
  } catch (error) {
    console.error(`Error updating user with id ${id}:`, error);
    throw error;
  }
};

// Fungsi untuk delete user
export const deleteUser = async (id: number): Promise<void> => {
  try {
    const response: AxiosResponse<ApiResponse<void>> = await api.delete(`/user/${id}`);

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to delete user');
    }
  } catch (error) {
    console.error(`Error deleting user with id ${id}:`, error);
    throw error;
  }
};

// Utility function untuk mendapatkan API base URL
export const getApiBaseUrl = (): string => {
  return import.meta.env.VITE_API_URL || '';
};

// Utility function untuk mendapatkan environment
export const getCurrentEnv = (): string => {
  return import.meta.env.VITE_ENV || 'development';
};

// Export instance jika diperlukan di tempat lain
export { api };