"use client";

import BestSellingProducts from "@/Features/DashboardOverview/BestSellingProducts";
import ProductSegmentation from "@/Features/DashboardOverview/ProductSegmentation";
import SalesOverview from "@/Features/DashboardOverview/SalesOverview";
import MonthlyReport from "@/Features/DashboardOverview/MonthlyReport";
import { useGetInventoryQuery } from "@/redux/api/auth/inventory/inventoryApi";

export default function Dashboard(): React.ReactElement {
  const salesData = {
    totalSales: 12025,
    dueAmount: 12025,
    newOrder: 12025,
    soldStock: 2025,
    lowStock: 2025,
    trends: { totalSales: 10.4, dueAmount: -10.4, newOrder: 10.4 },
  };

  const customerData = [
    { customer: "Imtiaz, Mahadi, Shaikat", frequency: [20, 30, 56], qty: ["100gm", "250gm", "1kg"], products: ["Handvo Flour", "Ragi Flour", "Besan Fine"] },
    { customer: "Imtiaz, Mahadi, Shaikat", frequency: [20, 30, 56], qty: ["100gm", "250gm", "1kg"], products: ["Handvo Flour", "Ragi Flour", "Besan Fine"] },
    { customer: "Imtiaz, Mahadi, Shaikat", frequency: [20, 30, 56], qty: ["100gm", "250gm", "1kg"], products: ["Handvo Flour", "Ragi Flour", "Besan Fine"] },
    { customer: "Imtiaz, Mahadi, Shaikat", frequency: [20, 30, 56], qty: ["100gm", "250gm", "1kg"], products: ["Handvo Flour", "Ragi Flour", "Besan Fine"] },
    { customer: "Imtiaz, Mahadi, Shaikat", frequency: [20, 30, 56], qty: ["100gm", "250gm", "1kg"], products: ["Handvo Flour", "Ragi Flour", "Besan Fine"] },
  ];

  const { data, isLoading, isError } = useGetInventoryQuery();

  const allProducts = data?.data;
  const lowStockProducts = allProducts?.filter(
    (product) => product.quantity < product.reorderPointOfQuantity
  );

  return (
    <div className="p-4 md:p-2 space-y-6">
      {/* Section 1: Sales Overview */}
      <SalesOverview />

      {/* Section 2: Best Selling Products & Weekly Report */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <BestSellingProducts />
        </div>
        <div>
          <MonthlyReport />
          <div className="w-full h-56 bg-white shadow-md rounded-2xl mt-2 p-5 overflow-auto" suppressHydrationWarning>
            <p className="text-lg font-semibold mb-3 text-red-700">
              ⚠️ {isLoading ? "Loading..." : lowStockProducts?.length || 0} low stock products
            </p>
            <table className="min-w-full text-left">
              <thead className="border-b">
                <tr>
                  <th className="py-2 px-3">Category</th>
                  <th className="py-2 px-3">Product Name</th>
                  <th className="py-2 px-3">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={3} className="py-2 px-3 text-center">
                      Loading...
                    </td>
                  </tr>
                ) : lowStockProducts?.length ? (
                  lowStockProducts.map((product) => (
                    <tr key={product._id} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-3">{(product.categoryId as { name: string } | undefined)?.name || "N/A"}</td>
                      <td className="py-2 px-3 text-red-700">{product.name}</td>
                      <td className="py-2 px-3">{product.quantity}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="py-2 px-3 text-center">
                      No low stock products
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ProductSegmentation />
    </div>
  );
}