import { useState } from 'react';
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import GridUsers from "../../components/users/GridUsers";
import Button from "../../components/ui/button/Button";
import { BoxIcon } from "../../icons";
import UserFormModal from "../../components/users/UserFormModal";


export default function UsersPage() {

    console.log("UsersPage is rendering"); 

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    console.log("Modal state:", isAddModalOpen);

    const handleOpenAddModal = () => {
        console.log("Button clicked - opening modal");
        setIsAddModalOpen(true);
    };

    const handleCloseAddModal = () => {
        console.log("Closing modal");
        setIsAddModalOpen(false);
    };

    const handleUserCreated = () => {
        // Trigger refresh of user list
        setRefreshTrigger(prev => prev + 1);
    };

    return (
        <>
        <PageMeta
            title="SIKAS - User Management"
            description="SIKAS - User Management Page"
        />
        <PageBreadcrumb pageTitle="Users" />
        {/* Add User Modal */}
        <UserFormModal
            isOpen={isAddModalOpen}
            onClose={handleCloseAddModal}
            onSuccess={handleUserCreated}
            mode="add"
        />
        <div className="space-y-6">
            <ComponentCard title="Data User">
                <div className="mb-4">
                    <Button
                        size="sm"
                        variant="primary"
                        startIcon={<BoxIcon className="size-5" />}
                        onClick={handleOpenAddModal}
                        {...({} as any)}
                        >
                        Add New User
                    </Button>
                </div>
            <GridUsers key={refreshTrigger} />
            </ComponentCard>
        </div>
        </>
    );
}
