
"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUpDown, PlusCircle, Eye, Edit, Trash2 } from "lucide-react";
import { FaFilePdf } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useGetContainersQuery } from "@/redux/api/auth/container/containerApi";
import { Container } from "@/redux/api/auth/container/containerApi"; // Assuming Container is exported from there

export default function ContainerTable() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const router = useRouter();

  const {
    data: response,
    isLoading,
    error,
  } = useGetContainersQuery();

  // ✅ Properly extract containers array from API response
  const containers: Container[] = response?.data || [];

  // ✅ Filter by containerName or containerNumber
  const filteredData: Container[] = useMemo(() => {
    return containers.filter((c) =>
      `${c.containerName} ${c.containerNumber}`.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, containers]);

  // ✅ Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData: Container[] = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [currentPage, filteredData]);

  if (isLoading) return <div className="p-4">Loading containers...</div>;
  if (error) return <div className="p-4 text-red-500">Error loading data.</div>;

  return (
    <div className="p-4">
      {/* Top Bar: Search + Buttons */}
      <div className="flex justify-between items-center mb-4">
        <Input
          placeholder="Search by Container Name or Number..."
          className="max-w-sm"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
        <div className="flex gap-2">
          
          <Button
            className="bg-red-600 hover:bg-red-700 text-white gap-2"
            onClick={() => router.push("/dashboard/add-container")}
          >
            <PlusCircle className="h-4 w-4" /> Add Container
          </Button>
          <Button variant="outline" className="text-gray-500 border hover:bg-gray-500">
            <FaFilePdf className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-auto rounded border">
        <table className="w-full text-left border-collapse text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              {["Container No", "Container Name", "Status", "Per Case Cost", "Total Shipping Cost", "Action"].map(
                (heading, i) => (
                  <th key={i} className="p-2 whitespace-nowrap font-medium">
                    <div className="flex items-center gap-1">
                      {heading}
                      {heading !== "Action" && <ArrowUpDown className="w-3 h-3" />}
                    </div>
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row) => {
              const avgPerCaseCost =
                row.containerProducts.length > 0
                  ? (
                      row.containerProducts.reduce((sum, p) => sum + p.perCaseCost, 0) /
                      row.containerProducts.length
                    ).toFixed(2)
                  : "N/A";

              return (
                <tr key={row._id} className="border-t hover:bg-gray-50">
                  <td className="p-2 whitespace-nowrap">{row.containerNumber}</td>
                  <td className="p-2 whitespace-nowrap">{row.containerName}</td>
                  <td className="p-2 whitespace-nowrap">{row.containerStatus}</td>
                  <td className="p-2 whitespace-nowrap">${avgPerCaseCost}</td>
                  <td className="p-2 whitespace-nowrap">${row.shippingCost}</td>
                  <td className="p-2 whitespace-nowrap flex gap-2">
                    <Eye className="w-4 h-4 text-gray-500 cursor-pointer hover:text-blue-700" />
                    <Edit className="w-4 h-4 text-gray-500 cursor-pointer hover:text-yellow-700" />
                    <Trash2 className="w-4 h-4 text-gray-500 cursor-pointer hover:text-red-700" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center text-sm text-gray-600 mt-4">
        <p>
          Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length}
        </p>
        <div className="flex items-center gap-1">
          <button
            className="px-2 py-1 border rounded"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          >
            «
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-2 py-1 border rounded ${page === currentPage ? "bg-gray-200" : ""}`}
            >
              {page}
            </button>
          ))}
          <button
            className="px-2 py-1 border rounded"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          >
            »
          </button>
          <select className="ml-2 border px-2 py-1 rounded" disabled>
            <option value="20">20</option>
          </select>
        </div>
      </div>
    </div>
  );
}
