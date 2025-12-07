import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Label from '../form/Label';
import Input from '../form/input/InputField';
import Button from '../ui/button/Button';
import { createCategory, updateCategory, getCategories } from '../../services/categoryService';
import { Category } from '../../services/categoryService';

interface CategoryFormData {
  category: string;
}

export default function CategoryForm() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState<CategoryFormData>({
    category: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isEdit && id) {
      fetchCategory(parseInt(id));
    }
  }, [id, isEdit]);

  const fetchCategory = async (categoryId: number) => {
    try {
      setLoading(true);
      const categories = await getCategories();
      const category = categories.find(cat => cat.id === categoryId);
      if (category) {
        setFormData({ category: category.category });
      } else {
        setError('Category not found');
      }
    } catch (err) {
      setError('Failed to fetch category');
      console.error('Error fetching category:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.category.trim()) {
      setError('Category name is required');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      if (isEdit && id) {
        await updateCategory(parseInt(id), formData);
      } else {
        await createCategory(formData);
      }

      navigate('/category');
    } catch (err) {
      console.error('Error saving category:', err);
      setError(`Failed to ${isEdit ? 'update' : 'create'} category`);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEdit) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading category...</div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="rounded-sm border border-gray-200 bg-white px-5 pb-6 pt-4 shadow-sm dark:border-strokedark dark:bg-boxdark">
        <h3 className="mb-4 text-xl font-medium text-gray-800 dark:text-white">
          {isEdit ? 'Edit Category' : 'Create New Category'}
        </h3>

        {error && (
          <div className="mb-4 rounded-md bg-red-50 p-4 dark:bg-red-900/20">
            <div className="text-sm text-red-800 dark:text-red-200">{error}</div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4.5">
            <Label htmlFor="category">Category Name</Label>
            <Input
              type="text"
              id="category"
              name="category"
              placeholder="Enter category name"
              value={formData.category}
              onChange={handleInputChange}
              disabled={loading}
            />
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3.5 text-sm bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300 transition"
              onClick={() => navigate('/category')}
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
