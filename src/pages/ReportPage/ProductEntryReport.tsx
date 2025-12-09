import { useEffect, useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import { fetchProductEntryData, ProductEntry } from "../../services/reportService";
import ProductEntryTable from "../../components/ReportPage/ProductEntryTable";

export default function ProductEntryReport() {
    const [transactionsData, setTransactionsData] = useState<ProductEntry[]>([]);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const token = localStorage.getItem("token");

    function toLocalDateTimeString(date: Date | null | undefined): string | null {
        if (!date) return null;

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    async function fetchReport() {
        if (!token) {
            console.error("No token found");
            return;
        }

        try {
            const startDateTime: string | null = toLocalDateTimeString(startDate);
            const endDateTime: string | null = toLocalDateTimeString(endDate);

            const response = await fetchProductEntryData(token, startDateTime, endDateTime);

            if (response.success && response.data) {
                setTransactionsData(response.data);

                console.log("Fetched product entries:", response.data);
            } else {
                console.error("Failed to fetch product entries:", response.message);
            }
        } catch (error) {
            console.error("Error fetching product entries:", error);
        }
    }

    useEffect(() => {
        fetchReport();
    }, []);

    return (
        <>
            <PageMeta
                title="Transaction Report | SIKAS"
                description="This is the transaction report page for SIKAS Application."
            />
            <PageBreadcrumb pageTitle="Transaction Report" />
            <div className="space-y-6">
                <ComponentCard title="Summary Transaction Data">
                    <ProductEntryTable
                        productEntries={transactionsData}
                        setStartDate={setStartDate}
                        setEndDate={setEndDate}
                        onSearch={fetchReport}
                    />
                </ComponentCard>

            </div>
        </>
    );
}
