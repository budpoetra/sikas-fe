import axios from "axios";

// ===================== TYPES =====================
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

type ApiResponse<T> = {
  success: boolean;
  message: string;
  status: number;
  data: T;
  timestamp: string;
};

export const fetchProductByCode = async (
  token: string,
  productCode: string
): Promise<ApiResponse<Product>> => {
  try {
    const response = await axios.get(`/product/code-or-barcode`, {
      params: { value: productCode },
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.response?.status === 404) {
      return err.response.data;
    }
    throw err;
  }
};

export const updateStock = async (
  token: string,
  stock: number,
  productId: number | null
) => {
  try {
    const response = await axios.post(
      `/product-entries`,
      { qty: stock, productId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      throw new Error(err.response?.data?.message || "Failed to update stock");
    }
    throw err;
  }
};

export const getProducts = async (page = 0, size = 1000): Promise<Product[]> => {
  try {
    const response = await api.get(`/api/v1/product/list`, { params: { page, size } });

    // Cek berbagai struktur response
    let productsData = response.data?.data?.content
      || (Array.isArray(response.data?.data) ? response.data.data : undefined)
      || (Array.isArray(response.data) ? response.data : []);

    if (!Array.isArray(productsData)) productsData = [];
    return productsData;
  } catch (err: any) {
    if (err.response) {
      console.error('Error fetching products:', err.response.status, err.response.data);
    }
    throw err;
  }
};

export const createProduct = async (
  data: Omit<Product, 'id' | 'createdDate' | 'updatedDate' | 'createdBy' | 'updatedBy'>
): Promise<Product> => {
  try {
    const response = await api.post('/api/v1/product', data);
    return response.data.data || response.data;
  } catch (err: any) {
    if (err.response) {
      console.error('Error creating product:', err.response.status, err.response.data);
    }
    throw err;
  }
};

export const updateProduct = async (
  id: number,
  data: Omit<Product, 'id' | 'createdDate' | 'updatedDate' | 'createdBy' | 'updatedBy'>
): Promise<Product> => {
  try {
    const response = await api.patch(`/api/v1/product/${id}`, data);
    return response.data.data || response.data;
  } catch (err: any) {
    if (err.response) {
      console.error('Error updating product:', err.response.status, err.response.data);
    }
    throw err;
  }
};

export const deleteProduct = async (id: number): Promise<void> => {
  try {
    await api.delete(`/api/v1/product/${id}`);
  } catch (err: any) {
    if (err.response) {
      console.error('Error deleting product:', err.response.status, err.response.data);
    }
    throw err;
  }
};
