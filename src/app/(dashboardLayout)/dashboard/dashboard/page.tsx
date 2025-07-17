import BestSellingProducts from "@/Features/DashboardOverview/BestSellingProducts";
import ProductSegmentation from "@/Features/DashboardOverview/ProductSegmentation";
import SalesOverview from "@/Features/DashboardOverview/SalesOverview";
import WeeklyReport from "@/Features/DashboardOverview/MonthlyReport";
import MonthlyReport from "@/Features/DashboardOverview/MonthlyReport";




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

            {/* Section 2: Best Selling Products & Weekly Report */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <BestSellingProducts />
                </div>
                <div>
                    <MonthlyReport/>
                </div>
            </div>

            

            <ProductSegmentation/>
        </div>

    );
}