import axios from "axios";

type ApiResponse<T> = {
    success: boolean;
    message: string;
    status: number;
    data: T;
    timestamp: string;
};

export interface Product {
    id: number;
    productName: string;
    productCode: string;
    categoryId: number;
    price: number;
    barcode: string;
    stock: number;
    status: number;
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
        if (axios.isAxiosError(err)) {
            if (err.response && err.response.status === 404) {
                return err.response.data;
            }
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
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;
    } catch (err: unknown) {
        console.error("Error updating stock:", err);

        if (axios.isAxiosError(err)) {
            throw new Error(err.response?.data?.message || "Failed to update stock");
        }

        throw err;
    }
};