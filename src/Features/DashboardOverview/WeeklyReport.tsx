// "use client";

// import React, { useState } from 'react';
// import { Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   LineElement,
//   PointElement,
//   LinearScale,
//   CategoryScale,
//   Tooltip,
//   Legend,
//   Filler,
// } from 'chart.js';

// ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend, Filler);

// const WeeklyReport: React.FC = () => {
//   const [activeTab, setActiveTab] = useState<'thisWeek' | 'lastWeek'>('thisWeek');

//   const data = {
//     thisWeek: {
//       stats: { Customers: 52, TotalProducts: 3.5, StockProducts: 2.5, OutOfStock: 0.5 },
//       chartData: [10, 20, 15, 12, 14, 8, 5],
//     },
//     lastWeek: {
//       stats: { Customers: 48, TotalProducts: 3.2, StockProducts: 2.3, OutOfStock: 0.9 },
//       chartData: [8, 15, 12, 10, 13, 7, 4],
//     },
//   };

//   const chartData = {
//     labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
//     datasets: [
//       {
//         label: "Customers",
//         data: activeTab === 'thisWeek' ? data.thisWeek.chartData : data.lastWeek.chartData,
//         borderColor: "#34D399",
//         backgroundColor: "rgba(167, 243, 208, 0.5)",
//         borderWidth: 2,
//         fill: true,
//         tension: 0.4,
//         pointRadius: 2,
//         pointHoverRadius: 5,
//       },
//     ],
//   };

//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: { display: false },
//       tooltip: {
//         enabled: true,
//         callbacks: {
//           label: function (context: any) {
//             return `${context.dataset.label}: ${context.parsed.y}k`;
//           },
//         },
//       },
//     },
//     scales: {
//       x: { title: { display: false } },
//       y: {
//         beginAtZero: true,
//         max: 20,
//         title: { display: false },
//         ticks: { callback: function (value: any) { return `${value}k`; } },
//       },
//     },
//   };

//   return (
//     <div className="p-4 bg-white rounded-lg shadow-md">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-lg mb-4  font-semibold">Report for this week</h2>
//         <div className="flex p-1 bg-[#EAF8E7] rounded-2xl space-x-2">
//           <button
//             onClick={() => setActiveTab('thisWeek')}
//             className={`px-4 py-2 text-sm font-bold rounded-lg ${activeTab === 'thisWeek' ? 'bg-gray-50 text-green-700' : 'text-gray-600'}`}
//           >
//             This week
//           </button>
//           <button
//             onClick={() => setActiveTab('lastWeek')}
//             className={`px-4 py-2 text-sm font-bold rounded-lg ${activeTab === 'lastWeek' ? 'bg-gray-50 text-green-700' : 'text-gray-600'}`}
//           >
//             Last week
//           </button>
          
//         </div>
//       </div>
//       <div className="grid grid-cols-4 gap-4 mb-8">
//         <div>
//           <p className="text-2xl font-bold">{data[activeTab].stats.Customers}k</p>
//           <p className="text-gray-600">Customers</p>
//         </div>
//         <div>
//           <p className="text-2xl font-bold">{data[activeTab].stats.TotalProducts}k</p>
//           <p className="text-gray-600">Total Products</p>
//         </div>
//         <div>
//           <p className="text-2xl font-bold">{data[activeTab].stats.StockProducts}k</p>
//           <p className="text-gray-600">Stock Products</p>
//         </div>
//         <div>
//           <p className="text-2xl font-bold">{data[activeTab].stats.OutOfStock}k</p>
//           <p className="text-gray-600">Out of Stock</p>
//         </div>
//       </div>
//       <div className="col-span-3 h-40 xl:h-68 2xl:h-73">
//         <Line data={chartData} options={chartOptions} />
//       </div>
      
//     </div>
//   );
// };

// export default WeeklyReport;

"use client";

import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
  ChartData,
  
  TooltipItem,
} from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend, Filler);

const WeeklyReport: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"thisWeek" | "lastWeek">("thisWeek");

  const data = {
    thisWeek: {
      stats: { Customers: 52, TotalProducts: 3.5, StockProducts: 2.5, OutOfStock: 0.5 },
      chartData: [10, 20, 15, 12, 14, 8, 5],
    },
    lastWeek: {
      stats: { Customers: 48, TotalProducts: 3.2, StockProducts: 2.3, OutOfStock: 0.9 },
      chartData: [8, 15, 12, 10, 13, 7, 4],
    },
  };

  const chartData: ChartData<"line"> = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        label: "Customers",
        data: activeTab === "thisWeek" ? data.thisWeek.chartData : data.lastWeek.chartData,
        borderColor: "#34D399",
        backgroundColor: "rgba(167, 243, 208, 0.5)",
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 2,
        pointHoverRadius: 5,
      },
    ],
  };

  const chartOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (context: TooltipItem<"line">) {
            return `${context.dataset.label}: ${context.parsed.y}k`;
          },
        },
      },
    },
    scales: {
      x: { title: { display: false } },
      y: {
        beginAtZero: true,
        max: 20,
        title: { display: false },
        ticks: {
          callback: function (value: string | number) {
            return `${value}k`;
          },
        },
      },
    },
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg mb-4 font-semibold">Report for this week</h2>
        <div className="flex p-1 bg-[#EAF8E7] rounded-2xl space-x-2">
          <button
            onClick={() => setActiveTab("thisWeek")}
            className={`px-4 py-2 text-sm font-bold rounded-lg ${
              activeTab === "thisWeek" ? "bg-gray-50 text-green-700" : "text-gray-600"
            }`}
          >
            This week
          </button>
          <button
            onClick={() => setActiveTab("lastWeek")}
            className={`px-4 py-2 text-sm font-bold rounded-lg ${
              activeTab === "lastWeek" ? "bg-gray-50 text-green-700" : "text-gray-600"
            }`}
          >
            Last week
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        <div>
          <p className="text-2xl font-bold">{data[activeTab].stats.Customers}k</p>
          <p className="text-gray-600">Customers</p>
        </div>
        <div>
          <p className="text-2xl font-bold">{data[activeTab].stats.TotalProducts}k</p>
          <p className="text-gray-600">Total Products</p>
        </div>
        <div>
          <p className="text-2xl font-bold">{data[activeTab].stats.StockProducts}k</p>
          <p className="text-gray-600">Stock Products</p>
        </div>
        <div>
          <p className="text-2xl font-bold">{data[activeTab].stats.OutOfStock}k</p>
          <p className="text-gray-600">Out of Stock</p>
        </div>
      </div>

      <div className="col-span-3 h-40 xl:h-68 2xl:h-73">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default WeeklyReport;
