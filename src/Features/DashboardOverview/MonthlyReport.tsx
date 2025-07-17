"use client";

import React, { useState, useMemo } from "react";
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
import { useGetOrderCustomerChartQuery } from "@/redux/api/dashboard/dashboardApi";
import Loading from "@/redux/Shared/Loading";


ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend, Filler);

const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const MonthlyReport: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"Order" | "Customer">("Order");
  const { data, isLoading, isError } = useGetOrderCustomerChartQuery();

  const formatChartData = useMemo(() => {
    if (!data?.data) return [];

    const rawData = activeTab === "Order" ? data.data.orders : data.data.customers;

    // Sort by year/month and get last 6 months
    const sorted = [...rawData].sort((a, b) => {
      const dateA = new Date(a.year, a.month - 1);
      const dateB = new Date(b.year, b.month - 1);
      return dateA.getTime() - dateB.getTime();
    });

    const last6 = sorted.slice(-6);

    return last6.map((item) => ({
      label: monthLabels[item.month - 1],
      count: item.count,
    }));
  }, [data, activeTab]);

  const chartData: ChartData<"line"> = {
    labels: formatChartData.map((item) => item.label),
    datasets: [
      {
        label: activeTab,
        data: formatChartData.map((item) => item.count),
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
            return `${context.dataset.label}: ${context.parsed.y}`;
          },
        },
      },
    },
    scales: {
      x: { title: { display: false } },
      y: {
        beginAtZero: true,
        title: { display: false },
        ticks: {
          callback: function (value: string | number) {
            return `${value}`;
          },
        },
      },
    },
  };

  if (isLoading) return <Loading />;
  if (isError) return <div className="text-red-500">Failed to load chart data</div>;

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg mb-2 font-semibold">Monthly Report (Last 6 Months)</h2>
        <div className="flex p-1 bg-[#EAF8E7] rounded-2xl space-x-2">
          <button
            onClick={() => setActiveTab("Order")}
            className={`px-4 py-2 text-sm font-bold rounded-lg ${
              activeTab === "Order" ? "bg-gray-50 text-green-700" : "text-gray-600"
            }`}
          >
            Order
          </button>
          <button
            onClick={() => setActiveTab("Customer")}
            className={`px-4  text-sm font-bold rounded-lg ${
              activeTab === "Customer" ? "bg-gray-50 text-green-700" : "text-gray-600"
            }`}
          >
            Customer
          </button>
        </div>
      </div>

      <div className="col-span-3 h-40 xl:h-44 2xl:h-52">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default MonthlyReport;
