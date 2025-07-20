
"use client";
import { useConvertProspectMutation, useDeleteProspectMutation, useGetProspectsQuery } from "@/redux/api/prospact/prospact.Api";
import ErrorState from "@/redux/Shared/ErrorState";
import Loading from "@/redux/Shared/Loading";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function ProspectDetails() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const router = useRouter();
const [converProspect]=useConvertProspectMutation()
const [deleteProspect]=useDeleteProspectMutation()

  const prospects = [
    { _id:'1',client: "Dhaval", salesPerson: "Mujahid", followUp: "22-07-2025", frequency: "Weekly" },
    { _id:'2',client: "Dhaval", salesPerson: "Mujahid", followUp: "22-07-2025", frequency: "Weekly" },
    { _id:'3',client: "Dhaval", salesPerson: "Mujahid", followUp: "22-07-2025", frequency: "3day" },
    { _id:'4',client: "Dhaval", salesPerson: "Mujahid", followUp: "22-07-2025", frequency: "Weekly" },
    { _id:'5',client: "Dhaval", salesPerson: "Mujahid", followUp: "22-07-2025", frequency: "3day" },
    { _id:'6',client: "Amit", salesPerson: "Rahim", followUp: "23-07-2025", frequency: "Monthly" },
    { _id:'7',client: "Amit", salesPerson: "Rahim", followUp: "23-07-2025", frequency: "Monthly" },
    { _id:'8',client: "Amit", salesPerson: "Rahim", followUp: "23-07-2025", frequency: "Weekly" },
    { _id:'9',client: "Amit", salesPerson: "Rahim", followUp: "23-07-2025", frequency: "3day" },
    { _id:'10',client: "Amit", salesPerson: "Rahim", followUp: "23-07-2025", frequency: "Monthly" },
  ];


  // Filter prospects based on search term
  const filteredProspects = prospects.filter((prospect) =>
    prospect.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prospect.salesPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prospect.followUp.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredProspects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProspects = filteredProspects.slice(startIndex, endIndex);


  const deleteProspacts=async(id:string)=>{
    console.log(id)
 try {
      await deleteProspect(id).unwrap();
      toast.success("Prospact deleted successfully");
     
    } catch (err) {
      toast.error("Failed to delete prospact");
      console.error("Delete error:", err);
    }
  }
  const converProspacts=async(id:string)=>{
    console.log(id)
 try {
      await converProspect(id).unwrap();
      toast.success("Prospact Convert successfully");
     
    } catch (err) {
      toast.error("Failed to convert prospact");
      console.error("convert error:", err);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white p-4 sm:p-6 lg:p-8">
      <div className=" mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-0">Prospect Details</h2>
        <div>
          
          <div className="flex justify-between my-8 sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search prospect, salesperson"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              
            </div>
            <div>
                <button className="bg-yellow-500 text-white mr-4 px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-200">Filter</button>
            <button className="bg-red-600 text-white px-4 py-2 cursor-pointer rounded-lg hover:bg-red-700 transition duration-200"
            onClick={() => router.push("/dashboard/add-prospact")}>+ Add Prospect</button>
            </div>
          </div>
        </div>

        <div className="bg-white  overflow-hidden">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="border-b p-3 text-left font-semibold text-gray-700">Client</th>
                <th className="border-b p-3 text-left font-semibold text-gray-700">Sales Person</th>
                <th className="border-b p-3 text-left font-semibold text-gray-700">Next Follow-Up</th>
                <th className="border-b p-3 text-left font-semibold text-gray-700">Frequency</th>
                <th className="border-b p-3 text-left font-semibold text-gray-700">Quote Status</th>
                <th className="border-b p-3 text-left font-semibold text-gray-700">Competitor File</th>
                <th className="border-b p-3 text-left font-semibold text-gray-700">Notes</th>
                <th className="border-b p-3 text-left font-semibold text-gray-700">Convert Customer</th>
                <th className="border-b p-3 text-left font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProspects.map((prospect, index) => (
                <tr key={index} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="p-3 text-gray-800">{prospect.client}</td>
                  <td className="p-3 text-gray-800">{prospect.salesPerson}</td>
                  <td className="p-3 text-gray-800">{prospect.followUp}</td>
                  <td className="p-3 text-gray-800">{prospect.frequency}</td>
                  <td className="p-3 text-gray-800">Pending</td>
                  <td className="p-3 text-gray-800">N/A</td>
                  <td className="p-3 text-gray-800">No notes</td>
                  <td className="p-3">
                    <button onClick={()=>converProspacts(prospect._id)} className="bg-green-500 text-white px-2 py-1 rounded-lg hover:bg-green-600 transition duration-200">Convert</button>
                  </td>
                  <td className="p-3">
                    <button className="text-blue-500 mr-2 hover:text-blue-700">✎</button>
                    <button onClick={()=>deleteProspacts(prospect._id)} className="text-red-500 hover:text-red-700">🗑</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
          <span>Showing {startIndex + 1} to {Math.min(endIndex, filteredProspects.length)} of {filteredProspects.length}</span>
          <div className="flex items-center space-x-2 mt-4 sm:mt-0">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 transition duration-200"
            >
              &lt;&lt;
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded ${currentPage === page ? "bg-green-500 text-white" : "bg-gray-200 hover:bg-gray-300"} transition duration-200`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 transition duration-200"
            >
              &gt;&gt;
            </button>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setCurrentPage(1);
              }}
              className="p-1 border border-gray-300 rounded"
            >
              <option value={5}>5 ▼</option>
              <option value={10}>10 ▼</option>
              <option value={25}>25 ▼</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
