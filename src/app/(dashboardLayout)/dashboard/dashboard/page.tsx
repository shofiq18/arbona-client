import BestSellingProducts from "@/Features/DashboardOverview/BestSellingProducts";
import WeeklyReport from "@/Features/DashboardOverview/WeeklyReport";




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
        { customer: 'Imtiaz, Mahadi, Shaikat', frequency: [20, 30, 56], qty: ['100gm', '250gm', '1kg'], products: ['Handvo Flour', 'Ragi Flour', 'Besan Fine'] },
        { customer: 'Imtiaz, Mahadi, Shaikat', frequency: [20, 30, 56], qty: ['100gm', '250gm', '1kg'], products: ['Handvo Flour', 'Ragi Flour', 'Besan Fine'] },
        { customer: 'Imtiaz, Mahadi, Shaikat', frequency: [20, 30, 56], qty: ['100gm', '250gm', '1kg'], products: ['Handvo Flour', 'Ragi Flour', 'Besan Fine'] },
        { customer: 'Imtiaz, Mahadi, Shaikat', frequency: [20, 30, 56], qty: ['100gm', '250gm', '1kg'], products: ['Handvo Flour', 'Ragi Flour', 'Besan Fine'] },
        { customer: 'Imtiaz, Mahadi, Shaikat', frequency: [20, 30, 56], qty: ['100gm', '250gm', '1kg'], products: ['Handvo Flour', 'Ragi Flour', 'Besan Fine'] },
    ];

    return (
        // <div className="p-6">
        //     {/* Section 1: Sales Overview */}
        //     <div className="grid md:grid-cols-4 gap-4 mb-6">
        //         <div className="bg-[#114F5E] text-white p-8   rounded-lg">
        //             <h3 className="text-lg">Total Sales</h3>
        //             <p className="text-4xl font-bold">${salesData.totalSales}</p>
        //             <p className="text-sm">Previous 7 days <span className="text-green-400">↑ {salesData.trends.totalSales}%</span></p>
        //         </div>
        //         <div className="bg-[#219EBC] text-white p-8 rounded-lg">
        //             <h3 className="text-lg">Due Amount</h3>
        //             <p className="text-4xl font-bold">${salesData.dueAmount}</p>
        //             <p className="text-sm">Previous 7 days <span className="text-red-700">↓ {Math.abs(salesData.trends.dueAmount)}%</span></p>
        //         </div>
        //         <div className="bg-[#1F6F97] text-white p-8 rounded-lg">
        //             <h3 className="text-lg">New Order</h3>
        //             <p className="text-4xl font-bold">${salesData.newOrder}</p>
        //             <p className="text-sm">Previous 7 days <span className="text-green-400">↑ {salesData.trends.newOrder}%</span></p>
        //         </div>
        //         <div className="flex gap-4 bg-[#023047] text-white p-8 rounded-lg items-center justify-between">
        //             <div className="text-white border-r-2 border-gray-400 pr-8 md:pr-18">
        //                 <h3 className="text-lg">Sold Stock</h3>
        //                 <p className="text-4xl font-bold">{salesData.soldStock}</p>
        //                 <p className="text-sm">Previous 7 days</p>
        //             </div>
        //             <div className="text-white pl-4">
        //                 <h3 className="text-lg">Low Stock</h3>
        //                 <p className="text-4xl font-bold">{salesData.lowStock}</p>
        //                 <p className="text-sm">Previous 7 days</p>
        //             </div>
        //         </div>

        //     </div>

        //     {/* Section 2: Best Selling Products & Weekly Report */}
        //     <div className="grid md:grid-cols-2 gap-6 mb-6">
        //         <div className="bg-white p-4 rounded-lg shadow">
        //             <h3 className="text-sm text-gray-500 mb-2">Best selling product</h3>
        //             <div className="space-y-2">
        //                 {productsData.map((product, index) => (
        //                     <div key={index} className="flex items-center justify-between">
        //                         <div className="flex items-center">
        //                             <div className="w-10 h-10 bg-gray-200 rounded-full mr-2"></div>
        //                             <span>{product.name}</span>
        //                         </div>
        //                         <span>{product.totalOrders}</span>
        //                         <span className={product.status === 'Stock' ? 'text-green-500' : 'text-red-500'}>{product.status}</span>
        //                         <span>${product.price}</span>
        //                     </div>
        //                 ))}
        //                 <button className="text-purple-500 mt-2">More</button>
        //             </div>
        //         </div>

        //         <div className="bg-white p-4 rounded-lg shadow">
        //             <h3 className="text-sm text-gray-500 mb-2">Report for this week</h3>
        //             <div className="flex justify-between mb-2">
        //                 <span>{reportData.customers}</span>
        //                 <span className="text-green-500">Customers</span>
        //                 <span>{reportData.totalProducts}</span>
        //                 <span>Total Products</span>
        //                 <span>{reportData.stockProducts}</span>
        //                 <span>Stock Products</span>
        //                 <span>{reportData.outOfStock}</span>
        //                 <span>Out of Stock</span>
        //             </div>
        //             <div className="relative">
        //                 <div className="w-full h-40 bg-gray-100 rounded-lg">
        //                     <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-gray-400">Chart Placeholder</div>
        //                 </div>
        //                 <div className="absolute top-2 right-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Thursday<br />14k</div>
        //             </div>
        //             <div className="flex justify-end mt-2">
        //                 <button className="text-green-500 mr-2">This week</button>
        //                 <button className="text-gray-400">Last week</button>
        //             </div>
        //         </div>
        //     </div>

        //     {/* Section 3: Customer Segmentation */}
        //     <div className="bg-white p-4 rounded-lg shadow">
        //         <h3 className="text-sm text-gray-500 mb-2">Customer Segmentation</h3>
        //         <p className="text-xs text-gray-500 mb-2">Frequently bought products stock, group with customer stock QTY size</p>
        //         <table className="w-full text-sm">
        //             <thead>
        //                 <tr className="bg-gray-100">
        //                     <th className="p-2 text-left">Customer Name</th>
        //                     <th className="p-2 text-left">Purchase Frequency</th>
        //                     <th className="p-2 text-left">Qty Size</th>
        //                     <th className="p-2 text-left">Product Name</th>
        //                 </tr>
        //             </thead>
        //             <tbody>
        //                 {customerData.map((customer, index) => (
        //                     <tr key={index}>
        //                         <td className="p-2">{customer.customer}</td>
        //                         <td className="p-2">{customer.frequency.join(', ')}</td>
        //                         <td className="p-2">{customer.qty.join(', ')}</td>
        //                         <td className="p-2">{customer.products.join(', ')}</td>
        //                     </tr>
        //                 ))}
        //             </tbody>
        //         </table>
        //     </div>
        // </div>

        <div className="p-4 md:p-2 space-y-6">
            {/* Section 1: Sales Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                <div className="bg-[#114F5E] text-white p-4 rounded-lg">
                    <h3 className="text-base md:text-lg mb-2">Total Sales</h3>
                    <p className="text-3xl md:text-4xl font-bold mb-2">${salesData.totalSales}</p>
                    <p className="text-sm">Previous 7 days <span className="text-green-400">↑ {salesData.trends.totalSales}%</span></p>
                </div>
                <div className="bg-[#219EBC] text-white p-4 rounded-lg">
                    <h3 className="text-base md:text-lg mb-2">Due Amount</h3>
                    <p className="text-3xl md:text-4xl font-bold mb-2">${salesData.dueAmount}</p>
                    <p className="text-sm">Previous 7 days <span className="text-red-700">↓ {Math.abs(salesData.trends.dueAmount)}%</span></p>
                </div>
                <div className="bg-[#1F6F97] text-white p-4 rounded-lg">
                    <h3 className="text-base md:text-lg mb-2">New Order</h3>
                    <p className="text-3xl md:text-4xl font-bold mb-2">${salesData.newOrder}</p>
                    <p className="text-sm">Previous 7 days <span className="text-green-400">↑ {salesData.trends.newOrder}%</span></p>
                </div>
                

                <div className="flex gap-4 bg-[#023047] text-white p-8 md:p-4 rounded-lg items-center justify-between">
                    <div className="text-white border-r-2 border-gray-400 pr-8 xl:pr-10 2xl:pr-18">
                        <h3 className="text-lg">Sold Stock</h3>
                        <p className="text-4xl font-bold">{salesData.soldStock}</p>
                        <p className="text-sm">Previous 7 days</p>
                    </div>
                    <div className="text-white pl-4">
                        <h3 className="text-lg">Low Stock</h3>
                        <p className="text-4xl font-bold">{salesData.lowStock}</p>
                        <p className="text-sm">Previous 7 days</p>
                    </div>
                </div>
            </div>

            {/* Section 2: Best Selling Products & Weekly Report */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <BestSellingProducts />
                </div>
                <div>
                    <WeeklyReport />
                </div>
            </div>

            {/* Section 3: Customer Segmentation */}
            <div className="bg-white p-4 rounded-lg shadow overflow-x-auto">
                <h3 className="text-lg font-bold text-gray-800 mb-2">Customer Segmentation</h3>
                <p className="text-xs font-bold text-gray-700 mb-2">Frequently bought products stock, group with customer stock QTY size</p>
                <table className="min-w-[600px] w-full text-xs sm:text-sm">
                    <thead >
                        <tr className="bg-[#EAF8E7] text-[15px] text-[#6A717F]  text-left">
                            <th className="p-2 ">Customer Name</th>
                            <th className="p-2">Purchase Frequency</th>
                            <th className="p-2">Qty Size</th>
                            <th className="p-2">Product Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customerData.map((customer, index) => (
                            <tr key={index}>
                                <td className="p-2">{customer.customer}</td>
                                <td className="p-2">{customer.frequency.join(', ')}</td>
                                <td className="p-2">{customer.qty.join(', ')}</td>
                                <td className="p-2">{customer.products.join(', ')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-end">
                <button
                
                className=" sm:mr-8  px-5 py-0.5 text-[#6467F2] border border-[#6467F2]  rounded-full "
            >
                More
            </button>
            </div>
            </div>
        </div>

    );
}