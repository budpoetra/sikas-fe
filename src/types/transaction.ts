interface Product {
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

interface ApiResponse {
  success: boolean;
  message: string;
  status: number;
  data: Product | Product[];
  timestamp: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[] | null; // Ubah ini
  onSelectProduct: (product: Product) => void;
  isLoading: boolean;
}