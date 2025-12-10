import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../components/ui/table";
import Button from "../../components/ui/button/Button";
import { getProducts, deleteProduct, Product } from '../../services/productService';
import useAlert from '../../hooks/useAlert';

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const alert = useAlert();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();

      const sorted = [...data].sort((a, b) => (a.id ?? 0) - (b.id ?? 0));

      setProducts(sorted);
    } catch (err) {
      setError('Failed to fetch products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };


  const handleDelete = async (id: number) => {
    alert.confirm("Are you sure you want to delete this product?")
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            await deleteProduct(id);
            alert.success("Product deleted successfully");
            fetchProducts();
          } catch (err) {
            alert.error("Failed to delete product");
            console.error('Error deleting product:', err);
          }
        }
      });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <>
      <PageMeta
        title="Products | SIKAS"
        description="Manage your products in SIKAS application."
      />
      <PageBreadcrumb pageTitle="Products" />
      <div className="space-y-6">
        <ComponentCard title="Product Management">
          <div className="flex justify-end mb-4">
            <Link to="/product/create">
              <Button>Add Product</Button>
            </Link>
          </div>

          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="max-w-full overflow-x-auto">
              <Table>
                {/* Table Header */}
                <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                  <TableRow>
                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">#</TableCell>
                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Product Name</TableCell>
                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Product Code</TableCell> {/* <-- baru */}
                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Category</TableCell>
                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Price</TableCell>
                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Stock</TableCell>
                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Barcode</TableCell>
                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Actions</TableCell>
                  </TableRow>
                </TableHeader>


                {/* Table Body */}
                <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                  {products.length > 0 ? (
                    products.map((product, index) => (
                      <TableRow key={product.id}>
                        <TableCell className="px-4 py-3 text-theme-sm text-gray-800 dark:text-white/90">{index + 1}</TableCell>
                        <TableCell className="px-4 py-3 text-theme-sm text-gray-800 dark:text-white/90">{product.productName}</TableCell>
                        <TableCell className="px-4 py-3 text-theme-sm text-gray-800 dark:text-white/90">{product.productCode || 'N/A'}</TableCell> {/* <-- baru */}
                        <TableCell className="px-4 py-3 text-theme-sm text-gray-800 dark:text-white/90">{product.categoryName || 'N/A'}</TableCell>
                        <TableCell className="px-4 py-3 text-theme-sm text-gray-800 dark:text-white/90">{product.price !== undefined ? `Rp. ${product.price}` : 'N/A'}</TableCell>
                        <TableCell className="px-4 py-3 text-theme-sm text-gray-800 dark:text-white/90">{product.stock !== undefined ? product.stock : 'N/A'}</TableCell>
                        <TableCell className="px-4 py-3 text-theme-sm text-gray-800 dark:text-white/90">{product.barcode || 'N/A'}</TableCell>
                        <TableCell className="px-4 py-3 text-theme-sm text-gray-800 dark:text-white/90">
                          <div className="flex gap-2">
                            <Link to={`/product/edit/${product.id}`}>
                              <Button size="sm" variant="outline">Edit</Button>
                            </Link>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-600 hover:text-red-700"
                              onClick={() => handleDelete(product.id!)}
                            >
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <td colSpan={7} className="px-5 py-8 text-center text-gray-500">
                        No products found
                      </td>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </ComponentCard>
      </div>
    </>
  );
}
