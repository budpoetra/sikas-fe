import { useAuth } from "../../context/AuthContext";
import ComponentCard from "../common/ComponentCard";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import { fetchProductByCode } from "../../services/productService";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Product } from "../../services/productService";
import { LockIcon } from "../../icons";
import useAlert from "../../hooks/useAlert";

interface EntryInputProps {
    setProduct: (product: Product) => void;
}

export default function EntryInput({
    setProduct,
}: EntryInputProps) {

    const [productCode, setProductCode] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);
    const [error, setError] = useState(false);

    const { token } = useAuth();
    const navigate = useNavigate();
    const alert = useAlert();

    async function fetchProduct() {
        if (!token) {
            console.error("No token found");
            navigate({
                pathname: "/signin",
            });
            return;
        }

        try {
            const result = await fetchProductByCode(token, productCode);

            if (result.status === 404) {
                alert.error("Product not found");
                setError(true);
                return;
            }

            if (result.status !== 200) {
                alert.error("Failed to fetch product");
                return;
            }

            setProduct(result.data);
            setIsDisabled(true);
        } catch (error) {
            setError(true);
            console.error("Failed to fetch product:", error);
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        fetchProduct();
    };

    const handleProductCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProductCode(e.target.value);
    };

    return (
        <ComponentCard title="Entry Input">
            <div className="space-y-5 sm:space-y-6">
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row sm:items-end sm:space-x-4">
                    <div className="w-full md:w-4/5">
                        <Label>Product Code</Label>

                        <Input
                            type="text"
                            value={productCode}
                            onChange={handleProductCodeChange}
                            placeholder="Enter product code"
                            className="w-full"
                            disabled={isDisabled}
                            required={true}
                            error={error}
                        />
                    </div>

                    <div className="w-full md:w-1/5">
                        <Button
                            className="w-full sm:w-auto mt-6"
                            disabled={isDisabled}
                        >
                            {isDisabled ? <LockIcon /> : "Fetch"}
                        </Button>
                    </div>
                </form>
            </div>
        </ComponentCard>
    );
}
