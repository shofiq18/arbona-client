"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUpDown, PlusCircle,  Eye, Edit, Trash2 } from "lucide-react";
import { FaFilePdf } from "react-icons/fa6";
import { useRouter } from "next/navigation";


const fakeData = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  storeName: i % 2 === 0 ? "Mina Bazar" : "Shopno",
  customerName: i % 2 === 0 ? "Bharat Grocers LLC" : "Mahadi Grocers LLC",
  storePhone: "(817)303-5300",
  cellPhone: "(817)303-5300",
  email: "Dhaval@gmail.com",
  openBalance: "$17.78",
  numOfOrders: i + 1,
  orderAmount: i % 2 === 0 ? "$200" : "$300",
  liftgate: i % 3 === 0 ? "Yes" : "No",
}));

export default function CustomerTable() {
  const [search, setSearch] = useState("");
  const filteredData = fakeData.filter((row) =>
    row.customerName.toLowerCase().includes(search.toLowerCase())
  );

    const router = useRouter();

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <Input
          placeholder="Search product. . ."
          className="max-w-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex gap-2">
          <Button variant="outline" className="bg-orange-500 cursor-pointer text-white hover:bg-orange-600">
            Filter
          </Button>
          <Button
            className="bg-red-600 cursor-pointer hover:bg-red-700 text-white gap-2"
            onClick={() => router.push("/dashboard/add-customer")}
          >
            <PlusCircle className="h-4 w-4" /> Add Customer
          </Button>
          <Button variant="outline" className=" text-gray-500 cursor-pointer border border-gray-300 hover:bg-gray-500">
            <FaFilePdf className="h-2 w-2" />
          </Button>
        </div>
      </div>

      <div className="overflow-auto rounded border">
        <table className="w-full text-left border-collapse text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              {["Store Name", "Customer Name", "Store Phone Number", "Cell Phone Number", "Email", "Open Balance", "No of Order", "Order Amount", "Liftgate", "Action"].map((heading, i) => (
                <th key={i} className="p-2 whitespace-nowrap font-medium">
                  <div className="flex items-center gap-1">
                    {heading}
                    {heading !== "Action" && <ArrowUpDown className="w-3 h-3" />}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row) => (
              <tr key={row.id} className="border-t hover:bg-gray-50">
                <td className="p-2 whitespace-nowrap">{row.storeName}</td>
                <td className="p-2 whitespace-nowrap">{row.customerName}</td>
                <td className="p-2 whitespace-nowrap">{row.storePhone}</td>
                <td className="p-2 whitespace-nowrap">{row.cellPhone}</td>
                <td className="p-2 whitespace-nowrap">{row.email}</td>
                <td className="p-2 whitespace-nowrap">{row.openBalance}</td>
                <td className="p-2 whitespace-nowrap">{row.numOfOrders}</td>
                <td className="p-2 whitespace-nowrap">{row.orderAmount}</td>
                <td className="p-2 whitespace-nowrap">
                  <span
                    className={`text-white px-2 py-0.5 rounded text-xs ${
                      row.liftgate === "Yes" ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {row.liftgate}
                  </span>
                </td>
                <td className="p-2 whitespace-nowrap flex gap-2">
                  <Eye className="w-4 h-4 text-gray-500 cursor-pointer hover:text-blue-700" />
                  <Edit className="w-4 h-4 text-gray-500 cursor-pointer hover:text-yellow-700" />
                  <Trash2 className="w-4 h-4 text-gray-500 cursor-pointer hover:text-red-700" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center text-sm text-gray-600 mt-4">
        <p>Showing 1 to 20 of 200</p>
        <div className="flex items-center gap-1">
          <button className="px-2 py-1 border rounded">&laquo;</button>
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              className={`px-2 py-1 border rounded ${page === 1 ? "bg-gray-200" : ""}`}
            >
              {page}
            </button>
          ))}
          <button className="px-2 py-1 border rounded">&raquo;</button>
          <select className="ml-2 border px-2 py-1 rounded">
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
      </div>
    </div>
  );
}
