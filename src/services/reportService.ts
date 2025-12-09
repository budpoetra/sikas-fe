import axios from "axios";

interface ApiResponse<T> {
    success: boolean;
    message: string;
    status: number;
    data: T;
    timestamp: string;
}

interface ReportData {
    summary: Summary;
    topProducts: Product[];
    topCategories: Category[];
}

export interface Summary {
    date: string;
    total: number;
}

export interface Product {
    id: number;
    name: string;
    code: number;
    total: number;
    totalPrice: number;
}

export interface Category {
    id: number;
    name: string;
    total: number;
    totalPrice: number;
}

export interface Transaction {
    id: number;
    cashierName: string;
    transactionNumber: string;
    totalPriceTransaction: number;
    createdDate: string;
}

export interface ProductEntry {
    id: number;
    productName: string;
    createdName: string;
    qty: number;
    createdDate: string;
}

export const fetchReportData = async (
    token: string,
    startDate: string | null,
    endDate: string | null
): Promise<ApiResponse<ReportData>> => {
    try {
        const response = await axios.get(`/report`, {
            params: { startDate, endDate },
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data;
    } catch (err: unknown) {
        if (axios.isAxiosError(err) && err.response) {
            return err.response.data;
        }

        return {
            success: false,
            message: "An error occurred",
            status: 500,
            data: {
                summary: { date: "", total: 0 },
                topProducts: [],
                topCategories: [],
            },
            timestamp: new Date().toISOString(),
        };
    }
};

export const fetchTransactionData = async (
    token: string
): Promise<ApiResponse<Transaction[]>> => {
    try {
        const response = await axios.get(`/report/transaction-list`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (err: unknown) {
        if (axios.isAxiosError(err) && err.response) {
            return err.response.data;
        }
        return {
            success: false,
            message: "An error occurred",
            status: 500,
            data: [],
            timestamp: new Date().toISOString(),
        };
    }
};

export const fetchProductEntryData = async (
    token: string,
    startDate: string | null,
    endDate: string | null
): Promise<ApiResponse<ProductEntry[]>> => {
    try {
        const response = await axios.get(`/report/product-entry`, {
            params: { startDate, endDate },
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (err: unknown) {
        if (axios.isAxiosError(err) && err.response) {
            return err.response.data;
        }
        return {
            success: false,
            message: "An error occurred",
            status: 500,
            data: [],
            timestamp: new Date().toISOString(),
        };
    }
}