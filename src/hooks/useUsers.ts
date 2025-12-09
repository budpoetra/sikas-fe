// hooks/useUsers.ts
import { useState, useEffect, useCallback, useRef } from 'react';
import { User, FetchUsersParams, fetchUsers } from '../services/userService';

interface UseUsersResult {
  users: User[];
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    size: number;
    totalItems: number;
    totalPages: number;
  };
  refetch: (params?: FetchUsersParams) => Promise<void>;
}

export const useUsers = (initialParams?: FetchUsersParams): UseUsersResult => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 0,
    size: 10,
    totalItems: 0,
    totalPages: 0,
  });

  // Gunakan useRef untuk menyimpan params yang stabil
  const paramsRef = useRef(initialParams);

  useEffect(() => {
    paramsRef.current = initialParams;
  }, [initialParams]);

  const fetchData = useCallback(async (params?: FetchUsersParams) => {
    try {
      setLoading(true);
      setError(null);

      // Merge params: params baru -> initial params -> defaults
      const mergedParams = {
        page: 0,
        size: 10,
        ...paramsRef.current,
        ...params
      };

      const data = await fetchUsers(mergedParams);

      setUsers(data.content);
      setPagination({
        page: data.meta.page,
        size: data.meta.size,
        totalItems: data.meta.totalItems,
        totalPages: data.meta.totalPages,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      setUsers([]);
      setPagination({
        page: 0,
        size: 10,
        totalItems: 0,
        totalPages: 0,
      });
    } finally {
      setLoading(false);
    }
  }, []); // ← Kosongkan dependency array

  useEffect(() => {
    fetchData();
  }, []); // ← Hanya jalankan sekali saat mount

  return {
    users,
    loading,
    error,
    pagination,
    refetch: fetchData
  };
};