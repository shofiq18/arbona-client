import BestSellingProducts from "@/Features/DashboardOverview/BestSellingProducts";
import ProductSegmentation from "@/Features/DashboardOverview/ProductSegmentation";
import SalesOverview from "@/Features/DashboardOverview/SalesOverview";
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
        

        <div className="p-4 md:p-2 space-y-6">


            {/* Section 1: Sales Overview */}

            <SalesOverview/>
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
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
                    <h3 className="text-base md:text-lg mb-2">Number of  Order</h3>
                    <p className="text-3xl md:text-4xl font-bold mb-2">${salesData.newOrder}</p>
                    <p className="text-sm">Previous 7 days <span className="text-green-400">↑ {salesData.trends.newOrder}%</span></p>
                </div>
                

                
            </div> */}

            

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
            {/* <div className="bg-white p-4 rounded-lg shadow overflow-x-auto">
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
            </div> */}

            <ProductSegmentation/>
        </div>

    );
}