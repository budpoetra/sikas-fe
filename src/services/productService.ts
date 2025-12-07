import axios from 'axios';

export interface Product {
  id?: number;
  productName: string;
  productCode: string;
  categoryId?: number;
  categoryName?: string; 
  price?: number;
  stock?: number;
  barcode?: string;      
  status?: number;
  createdDate?: string;
  updatedDate?: string;
  createdBy?: number;
  updatedBy?: number;
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

export const getProducts = async (page = 0, size = 1000): Promise<Product[]> => {
  try {
    console.log('Fetching products from:', `/api/v1/product/list`);
    const response = await api.get(`/api/v1/product/list`, {
      params: { page, size },
    });

    console.log('Products response:', response.data);

    // Handle different API response structures:
    // 1. Paginated: { data: { content: [...], ... } }
    // 2. Direct: { data: [...] }
    // 3. Simple: [...]
    let productsData = response.data?.data?.content; // Try paginated first
    if (!productsData && response.data?.data && Array.isArray(response.data.data)) {
      productsData = response.data.data; // Try direct array in data
    }
    if (!productsData && Array.isArray(response.data)) {
      productsData = response.data; // Try direct array
    }

    if (Array.isArray(productsData)) {
      return productsData;
    } else {
      console.warn('Unexpected response structure:', response.data);
      return [];
    }
  } catch (error: any) {
    console.error('Error fetching products:', error);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
    throw error;
  }
};



export const createProduct = async (data: Omit<Product, 'id' | 'createdDate' | 'updatedDate' | 'createdBy' | 'updatedBy'>): Promise<Product> => {
  try {
    console.log('Creating product:', data);
    const response = await api.post('/api/v1/product', data);
    console.log('Product created:', response.data);
    return response.data.data || response.data;
  } catch (error: any) {
    console.error('Error creating product:', error);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
    throw error;
  }
};

export const updateProduct = async (id: number, data: Omit<Product, 'id' | 'createdDate' | 'updatedDate' | 'createdBy' | 'updatedBy'>): Promise<Product> => {
  try {
    console.log('Updating product:', id, data);
    const response = await api.patch(`/api/v1/product/${id}`, data);
    console.log('Product updated:', response.data);
    return response.data.data || response.data;
  } catch (error: any) {
    console.error('Error updating product:', error);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
    throw error;
  }
};

export const deleteProduct = async (id: number): Promise<void> => {
  try {
    console.log('Deleting product:', id);
    await api.delete(`/api/v1/product/${id}`);
    console.log('Product deleted successfully');
  } catch (error: any) {
    console.error('Error deleting product:', error);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
    throw error;
  }
};
