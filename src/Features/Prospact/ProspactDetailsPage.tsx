


"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { useGetProspectsQuery, useUpdateProspectMutation, useDeleteProspectMutation } from "@/redux/api/auth/prospact/prospactApi";
import { useGetSalesUsersQuery } from "@/redux/api/auth/admin/adminApi"; // Assuming this exists
import { Prospect } from "@/types";
import Loading from "@/redux/Shared/Loading";
import toast from "react-hot-toast";

// Function to extract token from cookies (optional backup)
const getTokenFromCookie = () => {
  const cookies = document.cookie.split('; ');
  const tokenCookie = cookies.find(cookie => cookie.startsWith('token='));
  const token = tokenCookie ? tokenCookie.split('=')[1] : '';
  if (!token) alert("No token found in cookies. Please log in.");
  return token;
};

export default function ProspectDetails() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedProspect, setSelectedProspect] = useState<Prospect | null>(null);
  const [modalContent, setModalContent] = useState<{ title: string; data: string } | null>(null);
  const [newSalespersonId, setNewSalespersonId] = useState("");
  const itemsPerPage = 10;
  const router = useRouter();

  // Fetch prospects from API with refetch capability
  const { data: prospectsResponse, error, isLoading, refetch } = useGetProspectsQuery(undefined);

  // Fetch all salespeople
  const { data: salesUsersResponse, isLoading: isSalesUsersLoading, error: salesUsersError } =
    useGetSalesUsersQuery(undefined);

  // Update and delete prospect mutations
  const [updateProspect] = useUpdateProspectMutation();
  const [deleteProspect] = useDeleteProspectMutation();

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

  const openUpdateModal = (prospect: Prospect) => {
    setSelectedProspect(prospect);
    setNewSalespersonId(prospect.assignedSalesPerson._id); // Default to current salesperson ID
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedProspect(null);
    setNewSalespersonId("");
  };

  const handleUpdateProspect = async () => {
    if (!selectedProspect || !selectedProspect._id || !newSalespersonId) {
      alert("Invalid prospect or salesperson ID.");
      return;
    }

    console.log("Attempting update for prospect ID:", selectedProspect._id);
    console.log("New Salesperson ID:", newSalespersonId);
    const payload = {
      _id: selectedProspect._id,
      assignedSalesPerson: newSalespersonId,
    };
    console.log("Full request payload:", payload);
    console.log("Constructed URL:", `https://dhaval722-server.vercel.app/api/v1/prospect/${selectedProspect._id}`);

    try {
      const response = await updateProspect(payload).unwrap();
      console.log("Update response:", response);
      refetch();
      closeUpdateModal();
      toast.success("Prospect Salesperson updated successfully!");
    } catch (err) {
      console.error("Failed to update prospect:", err);
      const errorMessage = err || "Unknown error";
      const errorDetails = err|| "No additional details";
      alert(`Error updating prospect: ${errorMessage} (Details: ${errorDetails}). Check console for details.`);
    }
  };

  const handleDeleteProspect = async (prospectId: string) => {
    if (!window.confirm(`Are you sure you want to delete prospect with ID: ${prospectId}?`)) {
      return;
    }

    console.log("Attempting to delete prospect ID:", prospectId);
    try {
      await deleteProspect(prospectId).unwrap();
      console.log("Delete response:", { success: true });
      refetch();
      toast.success("Prospect deleted successfully!");
    } catch (err) {
      console.error("Failed to delete prospect:", err);
      const errorMessage = err || "Unknown error";
      alert(`Error deleting prospect: ${errorMessage}. Check console for details.`);
    }
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
                <th className="border-b p-3 text-left font-semibold text-gray-700">Competitor Statement</th>
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
                    <button className="bg-green-500 text-white px-2 py-1 rounded-lg hover:bg-green-600 transition duration-200">
                      Convert
                    </button>
                  </td>
                  <td className=" p-3 flex space-x-6 item-centen">
                    <button
                      className="bg-blue-500 text-white px-2 py-1 ml-1 rounded-lg hover:bg-blue-600 transition duration-200"
                      onClick={() => openUpdateModal(prospect)}
                    >
                      Assign Salesperson
                    </button>
                    <button
                      className=" text-white rounded-lg  transition duration-200"
                      onClick={() => handleDeleteProspect(prospect._id)}
                    >
                      🗑️ 
                    </button>
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

        {/* Existing Modal */}
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

        {/* Update Modal */}
        {isUpdateModalOpen && selectedProspect && (
          <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
              <h3 className="text-xl font-bold mb-4">Update Salesperson</h3>
              <div className="space-y-4">
                <p>Current Salesperson ID: {selectedProspect.assignedSalesPerson._id}</p>
                <div className="flex space-x-4">
                  <label className="block text-sm font-medium text-gray-700">New Salesperson:</label>
                  <select
                    value={newSalespersonId}
                    onChange={(e) => setNewSalespersonId(e.target.value)}
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={isSalesUsersLoading}
                  >
                    {salesUsersError ? (
                      <option disabled>Error loading salespeople</option>
                    ) : isSalesUsersLoading ? (
                      <option disabled>Loading...</option>
                    ) : (
                      salesUsersResponse?.data
                        ?.filter((user) => user.role === "salesUser")
                        .map((user) => (
                          <option key={user._id} value={user._id}>
                            {user.email} ({user._id})
                          </option>
                        ))
                    )}
                  </select>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200"
                  onClick={closeUpdateModal}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                  onClick={handleUpdateProspect}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
