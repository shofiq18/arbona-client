


"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { useGetProspectsQuery } from "@/redux/api/auth/prospact/prospactApi";
import { Prospect } from "@/types";
import Loading from "@/redux/Shared/Loading";
import { toast } from "react-toastify";
import { useConvertProspectMutation, useDeleteProspectMutation } from "@/redux/api/prospact/prospact.Api";

export default function ProspectDetails() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProspect, setSelectedProspect] = useState<Prospect | null>(null);
  const [modalContent, setModalContent] = useState<{ title: string; data: string } | null>(null);
  const itemsPerPage = 10;
  const router = useRouter();
const [converProspect]=useConvertProspectMutation()
const [deleteProspect]=useDeleteProspectMutation()

  // Fetch prospects from API
  const { data: prospectsResponse, error, isLoading , refetch } = useGetProspectsQuery(undefined);

  // Handle loading and error states
  if (isLoading) return <div className="min-h-screen p-4 text-center"><Loading/></div>;
  if (error) return <div className="min-h-screen p-4 text-center">Error loading prospects</div>;

  const prospects = prospectsResponse?.data || [];

  console.log("qoateddata", prospects);


  // Filter prospects based on search term
  const filteredProspects = prospects.filter((prospect) =>
    prospect.storeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prospect.storePersonName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prospect.assignedSalesPerson.email.toLowerCase().includes(searchTerm.toLowerCase())
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
  const openModal = (prospect: Prospect, title: string, data: string) => {
    setSelectedProspect(prospect);
    setModalContent({ title, data });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProspect(null);
    setModalContent(null);
  };

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white p-4 sm:p-6 lg:p-8">
      <div className="mx-auto">
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
              <button className="bg-yellow-500 text-white mr-4 px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-200">
                Filter
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 cursor-pointer rounded-lg hover:bg-red-700 transition duration-200"
                onClick={() => router.push("/dashboard/add-prospact")}
              >
                + Add Prospect
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="border-b p-3 text-left font-semibold text-gray-700">Client</th>
                <th className="border-b p-3 text-left font-semibold text-gray-700">Sales Person</th>
                <th className="border-b p-3 text-left font-semibold text-gray-700">Next Follow-Up</th>
                <th className="border-b p-3 text-left font-semibold text-gray-700">Quote Status</th>
                <th className="border-b p-3 text-left font-semibold text-gray-700">Competitor File</th>
                <th className="border-b p-3 text-left font-semibold text-gray-700">Notes</th>
                <th className="border-b p-3 text-left font-semibold text-gray-700">Convert Customer</th>
                <th className="border-b p-3 text-left font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProspects.map((prospect) => (
                <tr key={prospect._id} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="p-3 text-gray-800">{prospect.storeName}</td>
                  <td className="p-3 text-gray-800">{prospect.assignedSalesPerson.email}</td>
                  <td className="p-3 text-gray-800">
                    {prospect.followUpActivities.length > 0
                      ? prospect.followUpActivities[0].activityDate
                      : "N/A"}
                  </td>
                  <td className="p-3 text-gray-800">
                    {prospect.quotedList.length > 0 ? (
                      <span
                        className="text-blue-500 cursor-pointer hover:underline"
                        onClick={() =>
                          openModal(
                            prospect,
                            "Quote Status",
                            prospect.quotedList
                              .map(
                                (item) =>
                                  `Product ID: ${item.productObjId?._id || "N/A"}, Item #: ${item.itemNumber}, Item Name: ${item.itemName}, Price: $${item.price}`
                              )
                              .join("\n")
                          )
                        }
                      >
                        📄
                      </span>
                    ) : (
                      "Pending"
                    )}
                  </td>
                  <td className="p-3 text-gray-800">
                    {prospect.competitorStatement ? (
                      <span
                        className="text-blue-500 cursor-pointer hover:underline"
                        onClick={() =>
                          openModal(prospect, "Competitor File", prospect.competitorStatement)
                        }
                      >
                        📄
                      </span>
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td className="p-3 text-gray-800">
                    {prospect.note ? (
                      <span
                        className="text-blue-500 cursor-pointer hover:underline"
                        onClick={() => openModal(prospect, "Notes", prospect.note)}
                      >
                        📄
                      </span>
                    ) : (
                      "No notes"
                    )}
                  </td>
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

        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-700">
          <span>
            Showing {startIndex + 1} to {Math.min(endIndex, filteredProspects.length)} of{" "}
            {filteredProspects.length}
          </span>
          <div className="flex items-center space-x-2 mt-4 sm:mt-0">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 transition duration-200"
            >
              ◄
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded ${
                  currentPage === page ? "bg-green-500 text-white" : "bg-gray-200 hover:bg-gray-300"
                } transition duration-200`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 transition duration-200"
            >
              ►
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

        {/* Modal */}
        {isModalOpen && modalContent && selectedProspect && (
          <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
              <h3 className="text-xl font-bold mb-4">{modalContent.title}</h3>
              <div className="space-y-4">
                <pre className="whitespace-pre-wrap">{modalContent.data}</pre>
              </div>
              <button
                className="mt-6 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
