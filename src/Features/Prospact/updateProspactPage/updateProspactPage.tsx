

"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useGetProspectByIdQuery, useUpdateProspectMutation } from "@/redux/api/auth/prospact/prospactApi";
import { QuotedListItem } from "@/types";
import { useGetSalesUsersQuery } from "@/redux/api/auth/admin/adminApi";
import { useGetInventoryQuery } from "@/redux/api/auth/inventory/inventoryApi";
import Cookies from "js-cookie";

const STATUS_OPTIONS = ["new", "contacted", "qualified", "rejected", "converted"] as const;
type Status = typeof STATUS_OPTIONS[number];

const ACTIVITY_MEDIUM_OPTIONS = ["call", "email", "meeting", "whatsapp"] as const;
type ActivityMedium = typeof ACTIVITY_MEDIUM_OPTIONS[number];

interface Product {
  _id?: string;
  itemNumber: string;
  name: string;
  packetSize: string;
  salesPrice: number;
}
interface AssignedSalesPerson {
  _id: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  password?: string; // Optional, as it might not always be returned
}
export interface FollowUpActivity {
  activity: string;
  activityDate: string; // ISO date string (e.g., "2025-07-10")
  activityMedium:string // Updated to include "call"
  // Optional, 24-char ObjectId if required by API
}

interface FormData {
  _id?: string;
  storeName: string;
  storePhone: string;
  storePersonEmail: string;
  storePersonName: string;
  storePersonPhone: string;
  salesTaxId: string;
  shippingAddress: string;
  shippingState: string;
  shippingZipcode: string;
  shippingCity: string;
  miscellaneousDocImage: string;
  leadSource: string;
  note: string;
  status: string;
  assignedSalesPerson: AssignedSalesPerson|null
  followUpActivities: FollowUpActivity[];
  quotedList: QuotedListItem[];
  competitorStatement: string;
}

export default function UpdateProspectPage({ prospectId }: { prospectId: string }): React.ReactElement {
  // --- ALL HOOKS MUST BE CALLED HERE, UNCONDITIONALLY AND AT THE TOP LEVEL ---

  // RTK Query Hooks
  const { data: prospectResponse, isLoading, error } = useGetProspectByIdQuery(prospectId);
  console.log("ddddddddddddd", prospectResponse)
  const { data: inventoryData, isLoading: isInventoryLoading, isError: isInventoryError } = useGetInventoryQuery();
  const { data: salesUsersResponse, error: salesError, isLoading: isUsersLoading } = useGetSalesUsersQuery();
  const [updateProspect, { isLoading: isSaving }] = useUpdateProspectMutation();

  // React Router Hook
  const router = useRouter();

  // React State Hooks
  const [formData, setFormData] = useState<FormData | null>(null); // Initialize with null
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isFollowUpModalOpen, setIsFollowUpModalOpen] = useState(false);
  const [newQuote, setNewQuote] = useState<QuotedListItem>({
    productObjId: "",
    itemNumber: "",
    itemName: "",
    price: 0,
    packetSize: "",
  });
  const [newFollowUp, setNewFollowUp] = useState<FollowUpActivity>({
    activity: "",
    activityDate: "",
    activityMedium: "call",
  });

  // --- useEffects to handle data loading and initialization ---
  useEffect(() => {
    if (prospectResponse?.data && !formData) {
      // Ensure productObjId is a string when initializing from fetched data
      const processedQuotedList = prospectResponse.data.quotedList.map(item => ({
        ...item,
        productObjId: typeof item.productObjId === 'object' && item.productObjId !== null
          ? (item.productObjId as any)._id // Cast to any to access _id if it's an object
          : item.productObjId, // Otherwise, use it as is (should be string)
      }));

      setFormData({
        ...prospectResponse.data,
        quotedList: processedQuotedList,
      });
      console.log("Initial formData set:", { ...prospectResponse.data, quotedList: processedQuotedList }); // Debug log
    }
  }, [prospectResponse, formData]); // Add formData to dependencies to prevent re-initialization

  useEffect(() => {
    if (isInventoryError) {
      console.error("Error fetching inventory:", isInventoryError);
      toast.error("Failed to load inventory.");
    }
  }, [isInventoryError]);

  useEffect(() => {
    if (salesError) {
      console.error("Error fetching sales users:", salesError);
      toast.error("Failed to load sales users.");
    }
  }, [salesError]);

  // --- Conditional Rendering for Loading/Error States ---
  if (isLoading || !formData) { // Check formData as well, as it's initialized async
    return <div className="min-h-screen p-4 text-center">Loading...</div>;
  }
  if (error || !prospectResponse?.data) {
    console.error("Error loading prospect:", error); // Log the actual error for debugging
    return <div className="min-h-screen p-4 text-center">Error loading prospect: {error ? (error as any).message : "Unknown error"}</div>;
  }

  // At this point, formData is guaranteed to be available and initialized
  // We can use `formData` directly in the JSX and handlers

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev!, [name]: value })); // Using non-null assertion as formData is guaranteed
    setValidationErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formDataUpload = new FormData();
    formDataUpload.append("image", file);
    formDataUpload.append("key", process.env.NEXT_PUBLIC_IMGBB_API_KEY || "YOUR_IMGBB_API_KEY");

    fetch("https://api.imgbb.com/1/upload", {
      method: "POST",
      body: formDataUpload,
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          setFormData((prev) => ({ ...prev!, miscellaneousDocImage: result.data.url }));
          setValidationErrors((prev) => ({ ...prev, miscellaneousDocImage: "" }));
        }
      })
      .catch((uploadError) => {
        console.error("Image upload failed:", uploadError);
        toast.error("Image upload failed.");
      });
  };

  const handleQuoteInputChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    // Only update if the selected input is 'productObjId' and inventory data exists
    if (name === "productObjId" && inventoryData?.data) {
      const selectedProduct = inventoryData.data.find((p: Product) => p._id === value);
      if (selectedProduct) {
        setNewQuote({
          productObjId: selectedProduct._id, // Ensure this is the ID string
          itemNumber: selectedProduct.itemNumber,
          itemName: selectedProduct.name,
          price: selectedProduct.salesPrice,
          packetSize: selectedProduct.packetSize || "", // Duplicating for robustness or if `packSize` refers to something else
        });
      } else {
        // Clear newQuote fields if no product is selected (e.g., "Select Product" is chosen)
        setNewQuote({ productObjId: "", itemNumber: "", itemName: "",  price: 0, packetSize: "" });
      }
    } else {
        // For other inputs within the quote modal (like price if it were editable)
        setNewQuote((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFollowUpInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewFollowUp((prev) => ({ ...prev, [name]: value }));
  };

  const addQuote = () => {
    if (!newQuote.productObjId || !newQuote.itemNumber || !newQuote.itemName ||  newQuote.price === 0) {
      toast.error("All required quote fields must be filled.");
      return;
    }
    setFormData((prev) => ({
      ...prev!,
      quotedList: [...prev!.quotedList, { ...newQuote, packetSize: newQuote.packetSize || "" }],
    }));
    setNewQuote({ productObjId: "", itemNumber: "", itemName: "",  price: 0, packetSize: "" });
    setIsQuoteModalOpen(false);
  };

  const addFollowUp = () => {
    if (!newFollowUp.activity || !newFollowUp.activityDate || !newFollowUp.activityMedium) {
      toast.error("All required follow-up fields must be filled.");
      return;
    }
    setFormData((prev) => ({
      ...prev!,
      followUpActivities: [...prev!.followUpActivities, { ...newFollowUp }],
    }));
    setNewFollowUp({ activity: "", activityDate: "", activityMedium: "call" });
    setIsFollowUpModalOpen(false);
  };

  const handleDeleteQuote = (index: number) => {
    setFormData((prev) => ({
      ...prev!,
      quotedList: prev!.quotedList.filter((_, i) => i !== index),
    }));
  };

  const handleDeleteFollowUp = (index: number) => {
    setFormData((prev) => ({
      ...prev!,
      followUpActivities: prev!.followUpActivities.filter((_, i) => i !== index),
    }));
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    if (!formData) { // Defensive check, though should be covered by initial renders
        errors.general = "Form data not loaded.";
        setValidationErrors(errors);
        return false;
    }

    if (!formData.storeName.trim()) errors.storeName = "Store name is required.";
    // Regex for phone numbers: Allows 3 digits - 4 digits (e.g., 555-0198)
    if (!formData.storePhone.match(/^\d{3}-\d{4}$/))
    // Regex for email
    if (!formData.storePersonEmail.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) errors.storePersonEmail = "Invalid email format.";
    if (!formData.storePersonName.trim()) errors.storePersonName = "Customer name is required.";
    // Regex for cell phone numbers: Allows 3 digits - 4 digits (e.g., 555-0234)
    if (!formData.storePersonPhone.match(/^\d{3}-\d{4}$/)) 
    if (!formData.shippingAddress.trim()) errors.shippingAddress = "Shipping address is required.";
    if (!formData.shippingCity.trim()) errors.shippingCity = "Shipping city is required.";
    if (!formData.shippingState.trim()) errors.shippingState = "Shipping state is required.";
    // Regex for 5-digit zipcode
    if (!formData.shippingZipcode.match(/^\d{5}$/)) errors.shippingZipcode = "Zipcode must be 5 digits.";
    if (!formData.leadSource.trim()) errors.leadSource = "Lead source is required.";
    if (!formData.competitorStatement.trim()) errors.competitorStatement = "Competitor statement is required.";
    if (!formData.assignedSalesPerson) errors.assignedSalesPerson = "Salesperson is required.";

    // Validate quotedList - ensure all required fields are present if list is not empty
    if (formData.quotedList.length === 0) {
      // Consider if an empty quotedList is valid or required
      // errors.quotedList = "At least one quoted item is required.";
    } else {
      formData.quotedList.forEach((item, index) => {
        if (!item.productObjId || !item.itemNumber || !item.itemName ||  item.price === 0) {
          errors[`quotedList[${index}]`] = `Quoted item ${index + 1} has missing required fields.`;
        }
      });
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData) {
        toast.error("Form data is not loaded. Please try again.");
        return;
    }

    if (!validateForm()) {
      toast.error("Please fix the validation errors.");
      return;
    }

    const token = Cookies.get("token");
    if (!token) {
      toast.error("Authentication token missing. Please log in.");
      router.push("/login"); // Redirect to login
      return;
    }

    // Filter out items without a productObjId for submission
    // This is a safety measure if some items somehow got added without a productObjId
    const validQuotedList = formData.quotedList.filter(item => item.productObjId);

    const payload: Partial<FormData> = {
      _id: formData._id,
      storeName: formData.storeName,
      storePhone: formData.storePhone,
      storePersonEmail: formData.storePersonEmail,
      storePersonName: formData.storePersonName,
      storePersonPhone: formData.storePersonPhone,
      salesTaxId: formData.salesTaxId || undefined, // Allow optional
      shippingAddress: formData.shippingAddress,
      shippingState: formData.shippingState,
      shippingZipcode: formData.shippingZipcode,
      shippingCity: formData.shippingCity,
      miscellaneousDocImage: formData.miscellaneousDocImage || undefined, // Allow optional
      leadSource: formData.leadSource,
      note: formData.note || undefined, // Allow optional
      status: formData.status,
      assignedSalesPerson: formData.assignedSalesPerson || undefined, // Allow optional, though required in validation
      followUpActivities: formData.followUpActivities,
      quotedList: validQuotedList, // Use filtered list
      competitorStatement: formData.competitorStatement,
    };

    try {
      await updateProspect(payload as any).unwrap(); // Cast to any if type mismatch persists, though ideally fix types
      toast.success("Prospect updated successfully");
      router.push("/dashboard/prospact");
    } catch (err: any) {
      console.error("Failed to update prospect:", err);
      const errorMessage = err?.data?.message || err?.message || "Unknown error";
      toast.error(`Update failed: ${errorMessage}`);
    }
  };

  const handleCancel = () => {
    router.push("/dashboard/prospact");
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Update Prospect Details</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          >
            {STATUS_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {validationErrors.status && <span className="text-red-500 text-sm">{validationErrors.status}</span>}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="storeName">Store Name</Label>
            <Input
              id="storeName"
              name="storeName"
              value={formData.storeName}
              onChange={handleInputChange}
              placeholder="Enter store name"
              className="w-full"
              required
            />
            {validationErrors.storeName && <span className="text-red-500 text-sm">{validationErrors.storeName}</span>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="storePhone">Store Phone Number</Label>
            <Input
              id="storePhone"
              name="storePhone"
              type="tel"
              value={formData.storePhone}
              onChange={handleInputChange}
              placeholder="Enter store phone number (e.g., 555-0198)"
              className="w-full"
            />
            {validationErrors.storePhone && <span className="text-red-500 text-sm">{validationErrors.storePhone}</span>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="storePersonName">Customer Full Name</Label>
            <Input
              id="storePersonName"
              name="storePersonName"
              value={formData.storePersonName}
              onChange={handleInputChange}
              placeholder="Enter customer full name"
              className="w-full"
            />
            {validationErrors.storePersonName && <span className="text-red-500 text-sm">{validationErrors.storePersonName}</span>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="storePersonPhone">Cell Phone Number</Label>
            <Input
              id="storePersonPhone"
              name="storePersonPhone"
              type="tel"
              value={formData.storePersonPhone}
              onChange={handleInputChange}
              placeholder="Enter cell phone number (e.g., 555-0234)"
              className="w-full"
            />
            {validationErrors.storePersonPhone && <span className="text-red-500 text-sm">{validationErrors.storePersonPhone}</span>}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="storePersonEmail">Email Address</Label>
          <Input
            id="storePersonEmail"
            name="storePersonEmail"
            type="email"
            value={formData.storePersonEmail}
            onChange={handleInputChange}
            placeholder="Enter email address"
            className="w-full"
          />
          {validationErrors.storePersonEmail && <span className="text-red-500 text-sm">{validationErrors.storePersonEmail}</span>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="salesTaxId">Sales Tax ID</Label>
          <Input
            id="salesTaxId"
            name="salesTaxId"
            value={formData.salesTaxId}
            onChange={handleInputChange}
            placeholder="Enter sales tax ID"
            className="w-full"
          />
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="shippingAddress">Shipping Address</Label>
            <textarea
              id="shippingAddress"
              name="shippingAddress"
              value={formData.shippingAddress}
              onChange={handleInputChange}
              placeholder="Enter shipping address"
              rows={3}
              className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
            {validationErrors.shippingAddress && <span className="text-red-500 text-sm">{validationErrors.shippingAddress}</span>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="shippingCity">Shipping City</Label>
              <Input
                id="shippingCity"
                name="shippingCity"
                value={formData.shippingCity}
                onChange={handleInputChange}
                placeholder="Enter shipping city"
                className="w-full"
              />
              {validationErrors.shippingCity && <span className="text-red-500 text-sm">{validationErrors.shippingCity}</span>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="shippingState">Shipping State</Label>
              <Input
                id="shippingState"
                name="shippingState"
                value={formData.shippingState}
                onChange={handleInputChange}
                placeholder="Enter shipping state"
                className="w-full"
              />
              {validationErrors.shippingState && <span className="text-red-500 text-sm">{validationErrors.shippingState}</span>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="shippingZipcode">Shipping Zipcode</Label>
              <Input
                id="shippingZipcode"
                name="shippingZipcode"
                value={formData.shippingZipcode}
                onChange={handleInputChange}
                placeholder="Enter shipping zipcode"
                className="w-full"
              />
              {validationErrors.shippingZipcode && <span className="text-red-500 text-sm">{validationErrors.shippingZipcode}</span>}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="miscellaneousDocImage">Miscellaneous Doc Image</Label>
            <label
              htmlFor="miscellaneousDocImage"
              className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors cursor-pointer flex flex-col items-center justify-center space-y-2 w-full"
            >
              {formData.miscellaneousDocImage ? (
                <img
                  src={formData.miscellaneousDocImage}
                  alt="Doc Preview"
                  className="w-32 h-32 object-cover rounded"
                />
              ) : (
                <>
                  <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-500">Click to upload</span>
                </>
              )}
              <input
                type="file"
                id="miscellaneousDocImage"
                name="miscellaneousDocImage"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
            {validationErrors.miscellaneousDocImage && <span className="text-red-500 text-sm">{validationErrors.miscellaneousDocImage}</span>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="leadSource">Lead Source</Label>
            <Input
              id="leadSource"
              name="leadSource"
              value={formData.leadSource}
              onChange={handleInputChange}
              placeholder="Enter lead source"
              className="w-full"
            />
            {validationErrors.leadSource && <span className="text-red-500 text-sm">{validationErrors.leadSource}</span>}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="note">Note</Label>
          <textarea
            id="note"
            name="note"
            value={formData.note}
            onChange={handleInputChange}
            placeholder="Enter note"
            rows={3}
            className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="competitorStatement">Competitor Statement</Label>
          <textarea
            id="competitorStatement"
            name="competitorStatement"
            value={formData.competitorStatement}
            onChange={handleInputChange}
            placeholder="Enter competitor statement"
            rows={3}
            className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            required
          />
          {validationErrors.competitorStatement && <span className="text-red-500 text-sm">{validationErrors.competitorStatement}</span>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="assignedSalesPerson">Assigned Sales Person ID</Label>
          <select
            id="assignedSalesPerson"
            name="assignedSalesPerson"
            value={formData.assignedSalesPerson?._id} //fix the error 
            onChange={handleInputChange}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isUsersLoading}
          >
            <option value="">Select Sales Person</option>
            {salesUsersResponse?.data?.filter((user) => user.role === "salesUser").map((user) => (
              <option key={user._id} value={user._id}>
                {user.email} ({user._id})
              </option>
            )) || <option disabled>No sales users available</option>}
          </select>
          {validationErrors.assignedSalesPerson && <span className="text-red-500 text-sm">{validationErrors.assignedSalesPerson}</span>}
        </div>


        <div className="my-10 p-10 border rounded-2xl border-green-600 border-2">
          
                {formData.quotedList.length > 0 && (
                  <div className="overflow-x-auto">
                    <Label className="block my-2">Quoted Items</Label>
                    <table className="w-full text-sm text-left text-gray-500 mt-2">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                          <th className="px-4 py-2">Product ID</th>
                          <th className="px-4 py-2">Item #</th>
                          <th className="px-4 py-2">Item Name</th>
                          <th className="px-4 py-2">Price ($)</th>
                          <th className="px-4 py-2">Packet Size</th>
                          <th className="px-4 py-2">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {formData.quotedList.map((item, index) => (
                          <tr key={index} className="bg-white border-b">
                            <td className="px-4 py-2">{item.productObjId || "N/A"}</td>
                            <td className="px-4 py-2">{item.itemNumber}</td>
                            <td className="px-4 py-2">{item.itemName}</td>
                            <td className="px-4 py-2">${item.price}</td>
                            <td className="px-4 py-2">{item.packetSize || "N/A"}</td>
                            <td className="px-4 py-2">
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDeleteQuote(index)}
                                className="text-white"
                              >
                                Delete
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {/* Display specific quoted list errors if any */}
                    {Object.keys(validationErrors).filter(key => key.startsWith('quotedList[')).map((key) => (
                      <span key={key} className="text-red-500 text-sm block mt-1">{validationErrors[key]}</span>
                    ))}
                  </div>
                )}

                <div className="flex space-x-4 mt-5 justify-end">
                  <Button type="button" onClick={() => setIsQuoteModalOpen(true)} className="bg-blue-600 text-white">
                  Add product to quote
                  </Button>
                </div>

        </div>
        {formData.followUpActivities.length > 0 && (
          <div className="overflow-x-auto">
            <Label className="block my-2">Follow Up Activities</Label>
            <table className="w-full text-sm text-left text-gray-500 mt-2">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-4 py-2">Activity</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Medium</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {formData.followUpActivities.map((activity, index) => (
                  <tr key={index} className="bg-white border-b">
                    <td className="px-4 py-2">{activity.activity}</td>
                    <td className="px-4 py-2">{activity.activityDate}</td>
                    <td className="px-4 py-2">{activity.activityMedium}</td>
                    <td className="px-4 py-2">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteFollowUp(index)}
                        className="text-white"
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
                  <Button type="button" onClick={() => setIsFollowUpModalOpen(true)} className="bg-green-600 text-white">
                    Follow Up
                  </Button>

        <div className="flex justify-end space-x-4 pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            className="px-6 py-2 cursor-pointer text-white hover:text-white bg-gray-500 hover:bg-gray-600"
            disabled={isSaving}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="px-6 py-2 bg-red-600 hover:bg-red-700 cursor-pointer text-white"
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Update"}
          </Button>
        </div>
      </form>

     
      {isQuoteModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-xl font-bold mb-4">Add Quote Info</h2>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="productObjId">Product ID</Label>
          <select
            id="productObjId"
            name="productObjId"
            value={newQuote.productObjId}
            onChange={handleQuoteInputChange}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isInventoryLoading}
          >
            <option value="">Select Product</option>
            {inventoryData?.data?.map((product: Product) => (
              <option key={product._id} value={product._id}>
                {product.name} (Item #: {product.itemNumber})
              </option>
            )) || <option disabled>No products available</option>}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="itemNumber">Item Number</Label>
          <Input
            id="itemNumber"
            name="itemNumber"
            value={newQuote.itemNumber}
            placeholder="Item Number"
            className="w-full"
            disabled // This field is auto-filled
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="itemName">Item Name</Label>
          <Input
            id="itemName"
            name="itemName"
            value={newQuote.itemName}
            placeholder="Item Name"
            className="w-full"
            disabled // This field is auto-filled
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="price">Price ($)</Label>
          <Input
            id="price"
            name="price"
            type="number"
            value={newQuote.price}
            onChange={handleQuoteInputChange} // Ensure price changes are handled
            placeholder="Enter price"
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="packetSize">Packet Size (from Product)</Label>
          <Input
            id="packetSize"
            name="packetSize"
            value={newQuote.packetSize}
            placeholder="Packet Size"
            className="w-full"
            disabled // This field is auto-filled
          />
        </div>
      </div>
      <div className="flex justify-end space-x-4 mt-4">
        <Button type="button" onClick={() => setIsQuoteModalOpen(false)} variant="outline">
          Cancel
        </Button>
        <Button type="button" onClick={addQuote} className="bg-blue-600 text-white">
          Add Quote
        </Button>
      </div>
    </div>
  </div>
)}

      {isFollowUpModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add Follow Up</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="activity">Activity</Label>
                <Input
                  id="activity"
                  name="activity"
                  value={newFollowUp.activity}
                  onChange={handleFollowUpInputChange}
                  placeholder="Enter activity"
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="activityDate">Date</Label>
                <Input
                  id="activityDate"
                  name="activityDate"
                  type="date"
                  value={newFollowUp.activityDate}
                  onChange={handleFollowUpInputChange}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="activityMedium">Medium</Label>
                <select
                  id="activityMedium"
                  name="activityMedium"
                  value={newFollowUp.activityMedium}
                  onChange={handleFollowUpInputChange}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {ACTIVITY_MEDIUM_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-4">
              <Button type="button" onClick={() => setIsFollowUpModalOpen(false)} variant="outline">
                Cancel
              </Button>
              <Button type="button" onClick={addFollowUp} className="bg-green-600 text-white">
                Add Follow Up
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}