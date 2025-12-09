import { useState } from "react";

import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import EntryInput from "../../components/ProductEntry/EntryInput";
import StockInput from "../../components/ProductEntry/StockInput";
import { Product } from "../../services/productService";

export default function ProductEntry() {
    const [product, setProduct] = useState<Product | null>(null);

    return (
        console.log("Product in ProductEntry page:", product),

        <div>
            <PageMeta
                title="Product Entry | SIKAS"
                description="This is the Product Entry page for SIKAS application"
            />

            <PageBreadcrumb pageTitle="Product Entry" />

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                <div className="space-y-6">
                    <EntryInput
                        setProduct={setProduct}
                    />
                </div>

                <div className="space-y-6">
                    <div className="space-y-6">
                        <StockInput
                            product={product}
                        />
                    </div>
                </div>
            </div>
        </div >
    );
}
