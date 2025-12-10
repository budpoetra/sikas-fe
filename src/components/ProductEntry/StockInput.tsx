import { useAuth } from "../../context/AuthContext";
import ComponentCard from "../common/ComponentCard";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import { useState } from "react";
import { Product, updateStock } from "../../services/productService";
import useAlert from "../../hooks/useAlert";
import { useNavigate } from "react-router-dom";

interface StockInputProps {
    product: (Product | null);
}

export default function StockInput({
    product,
}: StockInputProps) {

    const [stock, setStock] = useState(0);

    const navigate = useNavigate();
    const { token } = useAuth();
    const alert = useAlert();

    if (!product) return null;

    async function update() {
        if (!token) {
            console.error("No token found");
            navigate({
                pathname: "/signin",
            });
            return;
        }

        try {
            await updateStock(token, stock, product?.id || null);
            alert.success("Stock updated successfully").then(() => {
                window.location.reload();
            });
        } catch (error) {
            console.error("Failed to fetch product:", error);
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        update();
    };

    const handleStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStock(Number(e.target.value));
    };

    return (
        <ComponentCard title="Stock Input">
            <div className="space-y-5 sm:space-y-6">
                <form onSubmit={handleSubmit}>
                    <div className="w-full md:w-full mb-6">
                        <Label>Stock Entry</Label>

                        <Input
                            type="number"
                            value={stock}
                            onChange={handleStockChange}
                            placeholder="Enter stock amount"
                            className="w-full"
                            min="1"
                        />
                    </div>

                    <div className="w-full md:w-full mb-6">
                        <Input
                            type="hidden"
                            value={product ? product.id : ""}
                            placeholder="Enter product ID"
                            className="w-full"
                            disabled={true}
                        />
                    </div>

                    <div className="w-full md:w-full mb-6">
                        <Label>Product Name</Label>

                        <Input
                            type="text"
                            value={product ? product.productName : ""}
                            placeholder="Enter product name"
                            className="w-full"
                            disabled={true}
                        />
                    </div>

                    <div className="w-full md:w-full mb-6">
                        <Label>Product Price</Label>

                        <Input
                            type="text"
                            value={product ? product.price : ""}
                            placeholder="Enter product price"
                            className="w-full"
                            disabled={true}
                        />
                    </div>

                    <div className="w-full md:w-full mb-6">
                        <Label>Available Stock</Label>

                        <Input
                            type="text"
                            value={product ? product.stock : ""}
                            placeholder="Enter product stock"
                            className="w-full"
                            disabled={true}
                        />
                    </div>

                    <div className="flex justify-center">
                        <Button
                            className="w-full sm:w-auto mt-6"
                        >
                            Update Stock
                        </Button>
                    </div>
                </form>
            </div>
        </ComponentCard>
    );
}
