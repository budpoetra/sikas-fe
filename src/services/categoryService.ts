import axios from 'axios';

export interface Category {
  id?: number;
  category: string;
  createdDate?: string;
  updatedDate?: string;
  createdBy?: number;
  updatedBy?: number;
  products?: any[]; // Reference to related products (not needed in frontend)
}

const API_BASE_URL = 'http://localhost:8080';

// axios instance agar token masuk otomatis
const api = axios.create({
  baseURL: API_BASE_URL,
});

// sisipkan token dari localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// =============================

export const getCategories = async (page = 0, size = 1000): Promise<Category[]> => {
  try {
    console.log("Fetching categories from:", `/api/v1/category/list`);

    const response = await api.get(`/api/v1/category/list`, {
      params: { page, size },
    });

    console.log('Categories response:', response.data);

    // Ambil array dari: data.content
    const content = response.data?.data?.content;

    if (Array.isArray(content)) {
      return content; // INI ARRAY YANG BENAR
    }

    console.warn("Unexpected API structure:", response.data);
    return [];

  } catch (error: any) {
    console.error("Error fetching categories:", error);

    if (error.response) {
      console.error("Response status:", error.response.status);
      console.error("Response data:", error.response.data);
    }

    throw error;
  }
};



export const createCategory = async (data: Omit<Category, 'id' | 'createdDate' | 'updatedDate' | 'createdBy' | 'updatedBy'>): Promise<Category> => {
  try {
    console.log('Creating category:', data);
    const response = await api.post('/api/v1/category', data);
    console.log('Category created:', response.data);
    return response.data.data || response.data;
  } catch (error: any) {
    console.error('Error creating category:', error);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
    throw error;
  }
};

export const updateCategory = async (id: number, data: Omit<Category, 'id' | 'createdDate' | 'updatedDate' | 'createdBy' | 'updatedBy'>): Promise<Category> => {
  try {
    console.log('Updating category:', id, data);
    const response = await api.put(`/api/v1/category/${id}`, data);
    console.log('Category updated:', response.data);
    return response.data.data || response.data;
  } catch (error: any) {
    console.error('Error updating category:', error);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
    throw error;
  }
};

export const deleteCategory = async (id: number): Promise<void> => {
  try {
    console.log('Deleting category:', id);
    await api.delete(`/api/v1/category/${id}`);
    console.log('Category deleted successfully');
  } catch (error: any) {
    console.error('Error deleting category:', error);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
    throw error;
  }
};
