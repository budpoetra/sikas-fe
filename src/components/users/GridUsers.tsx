import { User } from '../../services/userService';
import { useUsers } from '../../hooks/useUsers';
import { useState, useCallback } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table/index";
import Badge from "../ui/badge/Badge";
import LoadingSpinner from '../../pages/UiElements/LoadingSpinner';
import ErrorMessage from '../../pages/UiElements/ErrorMessage';
import Pagination from '../../pages/UiElements/Pagination'; // Buat komponen pagination
import UserFormModal from "../users/UserFormModal";
import Button from '../ui/button/Button';
import { PencilIcon } from '../../icons';


export default function GridUsers() {

  const [currentPage, setCurrentPage] = useState(0);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { users, loading, error, pagination, refetch } = useUsers({
    page: currentPage,
    size: 10
  });


  // Gunakan useCallback untuk mencegah re-render berlebihan
  const handlePageChange = useCallback((page: number) => {
    // Pagination.tsx mengembalikan one-based index, konversi ke zero-based
    const zeroBasedPage = page - 1;
    setCurrentPage(zeroBasedPage);
    refetch({ page: zeroBasedPage, size: 10 });
  }, [refetch]);

  // Function untuk mapping typeName ke role yang lebih user-friendly
  const mapTypeNameToRole = (typeName: string): string => {
    const roleMap: Record<string, string> = {
      'admin': 'Administrator',
      'cashier': 'Cashier',
      'owner': 'Owner',
    };
    return roleMap[typeName.toLowerCase()] || typeName;
  };

  // Handle edit button click
  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  // Handle close edit modal
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedUser(null);
  };

  // Handle success after user update
  const handleUserUpdated = () => {
    refetch({ page: currentPage, size: 10 });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorMessage
        message={error}
        onRetry={() => refetch({ page: currentPage, size: 10 })}
      />
    );
  }

  if (users.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500 dark:text-gray-400">No users found</p>
        <button
          onClick={() => refetch()}
          className="mt-2 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          Refresh
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
          <div className="max-w-full overflow-x-auto">
            <Table>
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Name
                  </TableCell>
                  <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Username
                  </TableCell>
                  <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Email
                  </TableCell>
                  <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Phone
                  </TableCell>
                  <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Role
                  </TableCell>
                  <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHeader>

              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {users.map((user: User) => ( // TAMBAHKAN TYPE ANNOTATION
                  <TableRow key={user.id}>
                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                      <div className="flex items-center gap-3">
                        <div>
                          <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                            {user.fullName}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-800 text-start text-theme-sm dark:text-white/90">
                      {user.username}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {user.email}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {user.phone}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-start">
                      <Badge
                        size="sm"
                        color={
                          user.typeName === 'admin'
                            ? 'success'
                            : user.typeName === 'cashier'
                              ? 'info'
                              : 'primary'
                        }
                      >
                        {mapTypeNameToRole(user.typeName)}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-start">
                      <Button
                        size="sm"
                        variant="outline"
                        startIcon={<PencilIcon className="size-4" />}
                        onClick={() => handleEditClick(user)}
                        className="hover:bg-blue-50 hover:text-blue-600"
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex justify-center">
            <Pagination
              currentPage={currentPage} // Kirim zero-based index
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange} // Pagination akan mengembalikan one-based
              totalItems={pagination.totalItems}
              itemsPerPage={pagination.size}
            />
          </div>
        )}
      </div>

      {/* Edit User Modal */}
      <UserFormModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        onSuccess={handleUserUpdated}
        mode="edit"
        userData={selectedUser}
      />
    </>
  );

}