import { useEffect, useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import CategoryTable from "../../components/ReportPage/CategoryTable";
import ProductTable from "../../components/ReportPage/ProductTable";
import { fetchReportData, Category, Product, fetchTransactionData, Transaction, Summary } from "../../services/reportService";
import TransactionDataTable from "../../components/ReportPage/TransactionDataTable";
import SummaryTable from "../../components/ReportPage/SummaryTable";
import { useCallback } from "react";

export default function TransactionPage() {
    const [categoriesData, setCategoriesData] = useState<Category[]>([]);
    const [productsData, setProductsData] = useState<Product[]>([]);
    const [summary, setSummary] = useState<Summary | null>(null);
    const [transactionsData, setTransactionsData] = useState<Transaction[]>([]);
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

            const response = await fetchReportData(token, startDateTime, endDateTime);

            if (response.success && response.data) {
                setCategoriesData(response.data.topCategories);
                setProductsData(response.data.topProducts);
                setSummary(response.data.summary);

                console.log("Fetched categories:", response.data.topCategories);
                console.log("Fetched products:", response.data.topProducts);
            } else {
                console.error("Failed to fetch categories:", response.message);
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    }

    const fetchTransactions = useCallback(async () => {
        if (!token) return;

        try {
            const response = await fetchTransactionData(token);
            if (response.success && response.data) {
                setTransactionsData(response.data);
            }
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    }, [token]);

    useEffect(() => {
        fetchReport();
        fetchTransactions();
    }, [fetchTransactions]);

    return (
        <>
            <PageMeta
                title="Transaction Report | SIKAS"
                description="This is the transaction report page for SIKAS Application."
            />
            <PageBreadcrumb pageTitle="Transaction Report" />
            <div className="space-y-6">
                <ComponentCard title="Summary Transaction Data">
                    <SummaryTable
                        summary={summary}
                        setStartDate={setStartDate}
                        setEndDate={setEndDate}
                        onSearch={fetchReport}
                    />
                </ComponentCard>

                <div className="flex flex-col lg:flex-row lg:space-x-4 w-full">
                    <div className="flex-1 mb-4 lg:mb-0">
                        <ComponentCard title="Top 5 Categories">
                            <CategoryTable categories={categoriesData} />
                        </ComponentCard>
                    </div>
                    <div className="flex-1 mb-4 lg:mb-0">
                        <ComponentCard title="Top 5 Products">
                            <ProductTable products={productsData} />
                        </ComponentCard>
                    </div>
                </div>

                <ComponentCard title="Transaction Data Table">
                    <div className="flex flex-col lg:flex-row lg:space-x-4 w-full">
                        <div className="flex-1 mb-4 lg:mb-0">
                            <TransactionDataTable transactions={transactionsData} />
                        </div>
                    </div>
                </ComponentCard>
            </div>
        </>
    );
}
