export interface Product {
  id: number;
  productName: string;
  productCode: string;
  categoryId: number;
  price: number;
  barcode: string;
  stock: number;
  status: number;
  createdDate: string;
  updatedDate: string;
  createdBy: number;
  updatedBy: number;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  status: number;
  data: Product | Product[];
  timestamp: string;
}

export interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[] | null; // Ubah ini
  onSelectProduct: (product: Product) => void;
  isLoading: boolean;
}

export interface TransactionItem {
  id: number;
  name: string;
  code: string;
  barcode: string;
  price: number;
  quantity: number;
  total: number;
  productId: number;
  stock: number; // Tambahkan properti stock jika diperlukan
}