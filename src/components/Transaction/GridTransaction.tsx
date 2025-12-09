import { useState } from "react";
import ComponentCard from "../common/ComponentCard";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import SearchModal from "./SearchModal";
import TransactionTable from "./TransactionTable";
import { Product, TransactionItem } from "../../types/transaction";
import transactionService, { TransactionRequest } from "../../services/transactionService";
import Button from "../ui/button/Button";

export default function GridTransaction() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [transactionItems, setTransactionItems] = useState<TransactionItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Search products based on query
  const searchProducts = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Parse query to check if it's a number (ID search)
      const parsedId = parseInt(query.trim());

      if (!isNaN(parsedId)) {
        // If query is a number, search by ID
        const product = await transactionService.getProductById(parsedId);
        setSearchResults([product]);
      } else {
        // If query is text, search by name/code/barcode
        // Note: You might need to adjust this based on your actual API endpoint
        const products = await transactionService.searchProducts(query);
        setSearchResults(products);
      }

      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to search products. Please try again.");
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Enter key in search input
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      searchProducts(searchQuery);
    }
  };

  // Handle product selection from modal
  const handleProductSelect = (product: Product) => {
    // Check if product already exists in table
    const existingItemIndex = transactionItems.findIndex(item => item.id === product.id);

    if (existingItemIndex >= 0) {
      // Update quantity if product exists
      const updatedItems = [...transactionItems];
      updatedItems[existingItemIndex].quantity += 1;
      updatedItems[existingItemIndex].total =
        updatedItems[existingItemIndex].price * updatedItems[existingItemIndex].quantity;
      setTransactionItems(updatedItems);
    } else {
      // Add new item - sesuaikan dengan properti dari API
      const newItem: TransactionItem = {
        id: product.id,
        name: product.productName,  // Ubah product.name menjadi product.productName
        code: product.productCode,  // Ubah product.code menjadi product.productCode
        barcode: product.barcode,
        price: product.price,
        quantity: 1,
        total: product.price * 1,
        productId: product.id,
        stock: product.stock,  // Tambahkan stock jika diperlukan
      };
      setTransactionItems([...transactionItems, newItem]);
    }

    // Close modal and reset search
    setIsModalOpen(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  // Handle quantity change in table
  const handleQuantityChange = (id: number, quantity: number) => {
    const updatedItems = transactionItems.map(item => {
      if (item.id === id && quantity > 0) {
        return {
          ...item,
          quantity,
          total: item.price * quantity,
        };
      }
      return item;
    });
    setTransactionItems(updatedItems);
  };

  // Handle item removal from table
  const handleRemoveItem = (id: number) => {
    setTransactionItems(transactionItems.filter(item => item.id !== id));
  };

  // Handle transaction submission
  const handleSubmitTransaction = async () => {
    if (transactionItems.length === 0) {
      setError("Please add at least one product to the transaction.");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const transactionData: TransactionRequest = {
        transactionDetails: transactionItems.map(item => ({
          productId: item.productId,
          qtyTransaction: item.quantity,
        })),
      };

      const response = await transactionService.createTransaction(transactionData);

      if (!response.success) {
        throw new Error(response.message || "Transaction creation failed");
      }

      setSuccess("Transaction created successfully!");

      // Reset form after successful submission
      setTransactionItems([]);
      setSearchQuery("");

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess(null);
      }, 3000);

    } catch (error) {
      console.error("Error creating transaction:", error);
      setError("Failed to create transaction. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate grand total
  const calculateGrandTotal = () => {
    return transactionItems.reduce((sum, item) => sum + item.total, 0);
  };

  return (
    <ComponentCard title="Search for products to input transactions">
      <div className="space-y-6">
        {/* Success/Error Messages */}
        {success && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-700">{success}</p>
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Search Input */}
        <div>
          <Label htmlFor="productSearch">Product Search</Label>
          <Input
            type="text"
            id="productSearch"
            placeholder="Enter Product ID, Name, Code, or Barcode and press Enter"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
          <p className="text-sm text-gray-500 mt-1">
            Press Enter to search. You can search by ID, name, code, or barcode.
          </p>
        </div>

        {/* Transaction Table */}
        <TransactionTable
          items={transactionItems}
          onQuantityChange={handleQuantityChange}
          onRemoveItem={handleRemoveItem}
        />

        {/* Grand Total and Submit Button */}
        {transactionItems.length > 0 && (
          <div className="border-t pt-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Grand Total: {calculateGrandTotal()}
                </h3>
                <p className="text-sm text-gray-500">
                  {transactionItems.length} item(s) in transaction
                </p>
              </div>
              <Button
                onClick={handleSubmitTransaction}
                disabled={isSubmitting || transactionItems.length === 0}
                className="px-6 py-2"
              >
                {isSubmitting ? "Processing..." : "Submit Transaction"}
              </Button>
            </div>
          </div>
        )}

        {/* Search Modal */}
        <SearchModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSearchResults([]);
          }}
          products={searchResults}
          onSelectProduct={handleProductSelect}
          isLoading={isLoading}
        />
      </div>
    </ComponentCard>
  );
}