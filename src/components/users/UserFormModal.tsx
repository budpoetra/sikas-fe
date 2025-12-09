import { useState, useEffect, FormEvent } from 'react';
import { User, createUser, updateUser } from '../../services/userService';
import Button from '../ui/button/Button';
import Input from '../form/input/InputField';
import Select from '../form/Select';

interface UserFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  mode: 'add' | 'edit';
  userData?: User | null;
}

// Interface untuk form data
interface UserFormData {
  fullName: string;
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  phone: string;
  typeId: number;
}

// Options untuk dropdown role (typeId)
const ROLE_OPTIONS = [
  { value: '3', label: 'Admin' },
  { value: '4', label: 'Cashier' },
];

export default function UserFormModal({ 
  isOpen, 
  onClose, 
  onSuccess, 
  mode,
  userData 
}: UserFormModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  // State untuk form data
  const [formData, setFormData] = useState<UserFormData>({
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    phone: '',
    typeId: 3,
  });

  // State untuk validasi
  const [errors, setErrors] = useState<Partial<Record<keyof UserFormData, string>>>({});

  // Initialize form dengan user data jika mode edit
  useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' && userData) {
        // Prefill form dengan data user yang akan diupdate
        setFormData({
          fullName: userData.fullName || '',
          username: userData.username || '',
          password: '', // Password tidak diisi untuk edit
          confirmPassword: '', // Confirm password tidak diisi untuk edit
          email: userData.email || '',
          phone: userData.phone || '',
          typeId: userData.typeId || 3,
        });
      } else {
        // Reset form untuk add mode
        resetForm();
      }
    }
  }, [isOpen, mode, userData]);

  const resetForm = () => {
    setFormData({
      fullName: '',
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
      phone: '',
      typeId: 3,
    });
    setErrors({});
    setError('');
    setSuccessMessage('');
  };

  // Handle input change
  const handleInputChange = (field: keyof UserFormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  // Validasi form
  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof UserFormData, string>> = {};

    // Required fields validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    // Validasi khusus untuk add mode (password diperlukan)
    if (mode === 'add') {
      if (!formData.username.trim()) {
        newErrors.username = 'Username is required';
      }

      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      if (mode === 'add') {
        // Prepare data for API (excluding confirmPassword)
        // const { confirmPassword, ...apiData } = formData;
        
        // Call create API
        const newUser = await createUser(formData as Partial<User>);
        
        // Show success message
        setSuccessMessage(`User "${newUser.fullName}" has been created successfully!`);
      } else if (mode === 'edit' && userData) {
        // Untuk update, hanya kirim data yang bisa diupdate
        const updateData: Partial<User> = {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          // Jika typeId juga bisa diupdate, tambahkan di sini
          // typeId: formData.typeId,
        };
        
        // Call update API
        const updatedUser = await updateUser(userData.id, updateData);
        
        // Show success message
        setSuccessMessage(`User "${updatedUser.fullName}" has been updated successfully!`);
      }

      // Wait a moment to show success message, then close and refresh
      setTimeout(() => {
        onSuccess();
        onClose();
        resetForm();
      }, 1500);

    } catch (err: any) {
      console.error(`Error ${mode === 'add' ? 'creating' : 'updating'} user:`, err);
      setError(err.message || `Failed to ${mode === 'add' ? 'create' : 'update'} user. Please try again.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Jika modal tidak terbuka, return null
  if (!isOpen) return null;

  const title = mode === 'add' ? 'Add New User' : 'Edit User';
  const description = mode === 'add' 
    ? 'Fill in the form below to add a new user to the system' 
    : 'Update the user information below';

  return (
    <div className="fixed inset-0 z-[2147483647] overflow-y-auto">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-gray-900/70 dark:bg-gray-900/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-2xl transform rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-2xl transition-all">
          {/* Header */}
          <div className="mb-6">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {description}
            </p>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="mb-6 p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800 dark:text-green-200">
                    {successMessage}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                    {error}
                  </h3>
                </div>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  placeholder="Enter full name"
                  disabled={isSubmitting}
                  error={errors.fullName}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter email address"
                  disabled={isSubmitting}
                  error={errors.email}
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="Enter phone number"
                  disabled={isSubmitting}
                  error={errors.phone}
                />
              </div>

              {/* Fields hanya untuk Add mode */}
              {mode === 'add' && (
                <>
                  {/* Username */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Username <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      value={formData.username}
                      onChange={(e) => handleInputChange('username', e.target.value)}
                      placeholder="Enter username"
                      disabled={isSubmitting}
                      error={errors.username}
                    />
                  </div>

                  {/* Role */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-gray-300 mb-2">
                      Role <span className="text-red-500">*</span>
                    </label>
                    <Select
                      options={ROLE_OPTIONS}
                      value={formData.typeId.toString()}
                      onChange={(value) => handleInputChange('typeId', parseInt(value))}
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      placeholder="Enter password"
                      disabled={isSubmitting}
                      error={errors.password}
                    />
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Confirm Password <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      placeholder="Confirm password"
                      disabled={isSubmitting}
                      error={errors.confirmPassword}
                    />
                  </div>
                </>
              )}
            </div>

            {/* Form Actions */}
            <div className="mt-8 flex justify-end space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                loading={isSubmitting}
                disabled={isSubmitting || successMessage.length > 0}
              >
                {isSubmitting 
                  ? (mode === 'add' ? 'Creating...' : 'Updating...') 
                  : (mode === 'add' ? 'Create User' : 'Update User')}
              </Button>
            </div>
          </form>

          {/* Close Button */}
          <button
            type="button"
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 focus:outline-none"
            onClick={onClose}
            disabled={isSubmitting}
          >
            <span className="sr-only">Close</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}