import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Label from '../form/Label';
import Input from '../form/input/InputField';
import { createProduct, updateProduct, getProducts } from '../../services/productService';
import { getCategories } from '../../services/categoryService';
import { Category } from '../../services/categoryService';

interface ProductFormData {
  productName: string;
  categoryId: number;
  price: number;
  stock: number;
  barcode: string;
  productCode: string;
}

export default function ProductForm() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState<ProductFormData>({
    productName: '',
    categoryId: 0,
    price: 0,
    stock: 0,
    barcode: '',
    productCode: ''
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
    if (isEdit && id) {
      fetchProduct(parseInt(id));
    }
  }, [id, isEdit]);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      const sortedCategories = [...data].sort((a, b) => (a.id ?? 0) - (b.id ?? 0));
      setCategories(sortedCategories);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };


  const fetchProduct = async (productId: number) => {
    try {
      setLoading(true);
      const products = await getProducts();
      const product = products.find(p => p.id === productId);
      if (product) {
        setFormData({
          productName: product.productName || '',
          categoryId: product.categoryId || 0,
          price: product.price || 0,
          stock: product.stock || 0,
          barcode: product.barcode || '',
          productCode: product.productCode || ''
        });
      } else {
        setError('Product not found');
      }
    } catch (err) {
      setError('Failed to fetch product');
      console.error('Error fetching product:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: ['price', 'stock', 'categoryId'].includes(name)
        ? (value === '' ? 0 : parseInt(value)) // gunakan parseInt agar integer
        : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.productName.trim()) {
      setError('Product name is required');
      return;
    }

    if (formData.categoryId === 0) {
      setError('Category is required');
      return;
    }

    if (formData.price <= 0) {
      setError('Price must be greater than 0');
      return;
    }

    if (formData.stock < 0) {
      setError('Stock cannot be negative');
      return;
    }

    if (!formData.barcode.trim()) {
      setError('Barcode is required');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      if (isEdit && id) {
        await updateProduct(parseInt(id), formData);
      } else {
        await createProduct(formData);
      }

      navigate('/product');
    } catch (err) {
      console.error('Error saving product:', err);
      setError(`Failed to ${isEdit ? 'update' : 'create'} product`);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEdit) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading product...</div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="rounded-sm border border-gray-200 bg-white px-5 pb-6 pt-4 shadow-sm dark:border-strokedark dark:bg-boxdark">
        <h3 className="mb-4 text-xl font-medium text-gray-800 dark:text-white">
          {isEdit ? 'Edit Product' : 'Create New Product'}
        </h3>

        {error && (
          <div className="mb-4 rounded-md bg-red-50 p-4 dark:bg-red-900/20">
            <div className="text-sm text-red-800 dark:text-red-200">{error}</div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4.5">
            <Label htmlFor="productName">Product Name</Label>
            <Input
              type="text"
              id="productName"
              name="productName"
              placeholder="Enter product name"
              value={formData.productName}
              onChange={handleTextChange}
              disabled={loading}
            />
          </div>

          <div className="mb-4.5">
            <Label htmlFor="categoryId">Category</Label>
            <select
              id="categoryId"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleNumberChange}
              disabled={loading}
              className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-3 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800 dark:placeholder:text-white/30"
            >
              <option value={0}>Select Category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.category}</option>
              ))}
            </select>
          </div>
          <div className="mb-4.5">
            <Label htmlFor="productCode">Product Code</Label>
            <Input
              type="text"
              id="productCode"
              name="productCode"
              placeholder="Enter product code"
              value={formData.productCode}
              onChange={handleTextChange}
              disabled={loading}
            />
          </div>

          <div className="mb-4.5">
            <Label htmlFor="price">Price</Label>
            <Input
              type="number"
              id="price"
              name="price"
              placeholder="Enter price"
              value={formData.price.toString()}
              onChange={handleNumberChange}
              disabled={loading}
              min={"0"}
              step={1} // integer only
            />
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3.5 text-sm bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300 transition"
              onClick={() => navigate('/product')}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3.5 text-sm bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300 disabled:opacity-50 transition"
              disabled={loading}
            >
              {loading ? 'Saving...' : (isEdit ? 'Update' : 'Create')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
