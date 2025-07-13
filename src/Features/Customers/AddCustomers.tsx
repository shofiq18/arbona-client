
"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import { useRouter } from "next/navigation";
import { useAddCustomerMutation } from "@/redux/api/customers/customersApi";
import toast from "react-hot-toast";

export default function AddCustomer(): React.ReactElement {
  const [formData, setFormData] = useState({
    storeName: "",
    storePersonName: "",
    storePhone: "",
    storePersonPhone: "",
    storeAuthorizedPersonName: "",
    storeAuthorizedPersonNumber: "",
    storePersonEmail: "",
    billingAddress: "",
    billingCity: "",
    billingState: "",
    billingZipcode: "",
    shippingAddress: "",
    shippingCity: "",
    shippingState: "",
    shippingZipcode: "",
    salesTaxId: "",
    termDays: "30",
    acceptDeliveryDays: [] as string[],
    shippingStatus: "SILVER",
    note: "",
    sameAsBillingAddress: false,
    bankAchInfo: "",
    creditApplication: "",
    ownerLegalFrontImage: "",
    ownerLegalBackImage: "",
    voidedCheckImage: "",
    miscellaneous: "",
  });
  const [filePreviews, setFilePreviews] = useState({
    creditApplication: "",
    ownerLegalFrontImage: "",
    ownerLegalBackImage: "",
    voidedCheckImage: "",
    miscellaneous: "",
  });
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [addCustomer, { isLoading, error }] = useAddCustomerMutation();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  // Handle same as billing address checkbox
  const handleSameAsBillingAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setFormData((prev) => ({
      ...prev,
      sameAsBillingAddress: isChecked,
      ...(isChecked && {
        shippingAddress: prev.billingAddress,
        shippingCity: prev.billingCity,
        shippingState: prev.billingState,
        shippingZipcode: prev.billingZipcode,
      }),
    }));
  };

  // Handle acceptDeliveryDays checkbox changes
  const handleDeliveryDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const day = e.target.value.toLowerCase();
    const isChecked = e.target.checked;
    setFormData((prev) => ({
      ...prev,
      acceptDeliveryDays: isChecked
        ? [...prev.acceptDeliveryDays, day]
        : prev.acceptDeliveryDays.filter((d) => d !== day),
    }));
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle file uploads to ImgBB
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formDataUpload = new FormData();
    formDataUpload.append("image", file);
    formDataUpload.append("key", process.env.NEXT_PUBLIC_IMGBB_API_KEY || "YOUR_IMGBB_API_KEY");

    try {
      const response = await fetch("https://api.imgbb.com/1/upload", {
        method: "POST",
        body: formDataUpload,
      });
      const result = await response.json();
      if (result.success) {
        setFormData((prev) => ({
          ...prev,
          [field]: result.data.url,
        }));
        setFilePreviews((prev) => ({
          ...prev,
          [field]: file.type.startsWith("image/") ? result.data.url : file.name,
        }));
      } else {
        setUploadError(result.error?.message || "Failed to upload image");
      }
    } catch (err) {
      setUploadError("Error uploading to ImgBB");
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        storeName: formData.storeName,
        storePhone: formData.storePhone,
        storePersonEmail: formData.storePersonEmail,
        storePersonName: formData.storePersonName,
        storePersonPhone: formData.storePersonPhone,
        storeAuthorizedPersonName: formData.storeAuthorizedPersonName,
        storeAuthorizedPersonNumber: formData.storeAuthorizedPersonNumber,
        billingAddress: formData.billingAddress,
        billingCity: formData.billingCity,
        billingState: formData.billingState,
        billingZipcode: formData.billingZipcode,
        shippingAddress: formData.shippingAddress,
        shippingCity: formData.shippingCity,
        shippingState: formData.shippingState,
        shippingZipcode: formData.shippingZipcode,
        salesTaxId: formData.salesTaxId,
        acceptedDeliveryDays: formData.acceptDeliveryDays,
        bankACHAccountInfo: formData.bankAchInfo,
        creditApplication: formData.creditApplication || undefined,
        ownerLegalFrontImage: formData.ownerLegalFrontImage || undefined,
        ownerLegalBackImage: formData.ownerLegalBackImage || undefined,
        voidedCheckImage: formData.voidedCheckImage || undefined,
        termDays: formData.termDays ? parseInt(formData.termDays) : undefined,
        shippingStatus: formData.shippingStatus || undefined,
        note: formData.note || undefined,
        miscellaneous: formData.miscellaneous || undefined,
      };

      await addCustomer(payload).unwrap();
      toast.success("Customer Added successfully")
      router.push("/dashboard/customers");
    } catch (err) {
      console.error("Failed to add customer:", err);
    }
  };

  const handleCancel = () => {
    router.push("/dashboard");
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Add Customer</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="storeName">Store Name *</Label>
            <Input
              id="storeName"
              name="storeName"
              value={formData.storeName}
              onChange={handleInputChange}
              required
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="storePersonName">Customer Full Name *</Label>
            <Input
              id="storePersonName"
              name="storePersonName"
              value={formData.storePersonName}
              onChange={handleInputChange}
              required
              className="w-full"
            />
          </div>
        </div>

        {/* Phone Numbers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="storePhone">Store Phone Number *</Label>
            <Input
              id="storePhone"
              name="storePhone"
              type="tel"
              value={formData.storePhone}
              onChange={handleInputChange}
              required
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="storePersonPhone">Cell Phone Number *</Label>
            <Input
              id="storePersonPhone"
              name="storePersonPhone"
              type="tel"
              value={formData.storePersonPhone}
              onChange={handleInputChange}
              required
              className="w-full"
            />
          </div>
        </div>

        {/* Authorized Person */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="storeAuthorizedPersonName">
              Store Authorized Person Name (For Order) *
            </Label>
            <Input
              id="storeAuthorizedPersonName"
              name="storeAuthorizedPersonName"
              value={formData.storeAuthorizedPersonName}
              onChange={handleInputChange}
              required
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="storeAuthorizedPersonNumber">
              Store Authorized Person Number (For Order) *
            </Label>
            <Input
              id="storeAuthorizedPersonNumber"
              name="storeAuthorizedPersonNumber"
              type="tel"
              value={formData.storeAuthorizedPersonNumber}
              onChange={handleInputChange}
              required
              className="w-full"
            />
          </div>
        </div>

        {/* Email Address */}
        <div className="space-y-2">
          <Label htmlFor="storePersonEmail">Email Address *</Label>
          <Input
            id="storePersonEmail"
            name="storePersonEmail"
            type="email"
            value={formData.storePersonEmail}
            onChange={handleInputChange}
            required
            className="w-full"
          />
        </div>

        {/* Billing Address */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="billingAddress">Billing Address *</Label>
            <textarea
              id="billingAddress"
              name="billingAddress"
              value={formData.billingAddress}
              onChange={handleInputChange}
              required
              rows={3}
              className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="billingCity">Billing City *</Label>
              <Input
                id="billingCity"
                name="billingCity"
                value={formData.billingCity}
                onChange={handleInputChange}
                required
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="billingState">Billing State *</Label>
              <select
                id="billingState"
                name="billingState"
                value={formData.billingState}
                onChange={handleInputChange}
                required
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Select State</option>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                {/* Add more states as needed */}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="billingZipcode">Billing Zipcode *</Label>
              <Input
                id="billingZipcode"
                name="billingZipcode"
                value={formData.billingZipcode}
                onChange={handleInputChange}
                required
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Same as Billing Address Checkbox */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="sameAsBillingAddress"
            name="sameAsBillingAddress"
            checked={formData.sameAsBillingAddress}
            onChange={handleSameAsBillingAddress}
            className="h-4 w-4 rounded border-gray-300"
          />
          <Label
            htmlFor="sameAsBillingAddress"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Same as Billing Address
          </Label>
        </div>

        {/* Shipping Address */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="shippingAddress">Shipping Address *</Label>
            <textarea
              id="shippingAddress"
              name="shippingAddress"
              value={formData.shippingAddress}
              onChange={handleInputChange}
              required
              rows={3}
              disabled={formData.sameAsBillingAddress}
              className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="shippingCity">Shipping City *</Label>
              <Input
                id="shippingCity"
                name="shippingCity"
                value={formData.shippingCity}
                onChange={handleInputChange}
                required
                disabled={formData.sameAsBillingAddress}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="shippingState">Shipping State *</Label>
              <select
                id="shippingState"
                name="shippingState"
                value={formData.shippingState}
                onChange={handleInputChange}
                required
                disabled={formData.sameAsBillingAddress}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Select State</option>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                {/* Add more states as needed */}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="shippingZipcode">Shipping Zipcode *</Label>
              <Input
                id="shippingZipcode"
                name="shippingZipcode"
                value={formData.shippingZipcode}
                onChange={handleInputChange}
                required
                disabled={formData.sameAsBillingAddress}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Additional Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="salesTaxId">Sales Tax ID</Label>
            <Input
              id="salesTaxId"
              name="salesTaxId"
              value={formData.salesTaxId}
              onChange={handleInputChange}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="termDays">Term Days *</Label>
            <Input
              id="termDays"
              name="termDays"
              type="number"
              value={formData.termDays}
              onChange={handleInputChange}
              required
              className="w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="acceptDeliveryDays">Accept Delivery Days *</Label>
            <div className="relative" ref={dropdownRef}>
              <div
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors cursor-pointer hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                onClick={toggleDropdown}
              >
                {formData.acceptDeliveryDays.length > 0
                  ? formData.acceptDeliveryDays
                      .map((day) => day.charAt(0).toUpperCase() + day.slice(1))
                      .join(", ")
                  : "Select days"}
              </div>
              {isDropdownOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-md p-2">
                  {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(
                    (day) => (
                      <div key={day} className="flex items-center space-x-2 py-1">
                        <input
                          type="checkbox"
                          id={`acceptDeliveryDays-${day}`}
                          name="acceptDeliveryDays"
                          value={day}
                          checked={formData.acceptDeliveryDays.includes(day.toLowerCase())}
                          onChange={handleDeliveryDaysChange}
                          className="h-4 w-4 rounded border-gray-300"
                        />
                        <Label
                          htmlFor={`acceptDeliveryDays-${day}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {day}
                        </Label>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="shippingStatus">Shipping Status *</Label>
            <select
              id="shippingStatus"
              name="shippingStatus"
              value={formData.shippingStatus}
              onChange={handleInputChange}
              required
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="SILVER">SILVER</option>
              <option value="GOLD">GOLD</option>
              <option value="PLATINUM">PLATINUM</option>
            </select>
          </div>
        </div>

        {/* Note */}
        <div className="space-y-2">
          <Label htmlFor="note">Note</Label>
          <textarea
            id="note"
            name="note"
            value={formData.note}
            onChange={handleInputChange}
            rows={3}
            className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        <Separator />

        {/* Bank ACH Account Information */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Bank ACH Account Information *</h3>
          <textarea
            id="bankAchInfo"
            name="bankAchInfo"
            value={formData.bankAchInfo}
            onChange={handleInputChange}
            rows={5}
            required
            className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        {/* File Uploads */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="space-y-2">
              <Label htmlFor="creditApplication">Credit Application</Label>
              <label
                htmlFor="creditApplication"
                className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors cursor-pointer flex flex-col items-center justify-center space-y-2"
              >
                {filePreviews.creditApplication ? (
                  filePreviews.creditApplication.startsWith("http") ? (
                    <img
                      src={filePreviews.creditApplication}
                      alt="Credit Application Preview"
                      className="w-16 h-16 object-cover"
                    />
                  ) : (
                    <span className="text-sm text-gray-500 truncate max-w-full">
                      {filePreviews.creditApplication}
                    </span>
                  )
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
                  id="creditApplication"
                  name="creditApplication"
                  accept="image/*,.pdf"
                  onChange={(e) => handleFileUpload(e, "creditApplication")}
                  className="hidden"
                />
              </label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="ownerLegalIdFront">Owner Legal ID (Front)</Label>
              <label
                htmlFor="ownerLegalIdFront"
                className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors cursor-pointer flex flex-col items-center justify-center space-y-2"
              >
                {filePreviews.ownerLegalFrontImage ? (
                  filePreviews.ownerLegalFrontImage.startsWith("http") ? (
                    <img
                      src={filePreviews.ownerLegalFrontImage}
                      alt="Owner Legal ID Front Preview"
                      className="w-16 h-16 object-cover"
                    />
                  ) : (
                    <span className="text-sm text-gray-500 truncate max-w-full">
                      {filePreviews.ownerLegalFrontImage}
                    </span>
                  )
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
                  id="ownerLegalIdFront"
                  name="ownerLegalIdFront"
                  accept="image/*,.pdf"
                  onChange={(e) => handleFileUpload(e, "ownerLegalFrontImage")}
                  className="hidden"
                />
              </label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="ownerLegalIdBack">Owner Legal ID (Back)</Label>
              <label
                htmlFor="ownerLegalIdBack"
                className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors cursor-pointer flex flex-col items-center justify-center space-y-2"
              >
                {filePreviews.ownerLegalBackImage ? (
                  filePreviews.ownerLegalBackImage.startsWith("http") ? (
                    <img
                      src={filePreviews.ownerLegalBackImage}
                      alt="Owner Legal ID Back Preview"
                      className="w-16 h-16 object-cover"
                    />
                  ) : (
                    <span className="text-sm text-gray-500 truncate max-w-full">
                      {filePreviews.ownerLegalBackImage}
                    </span>
                  )
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
                  id="ownerLegalIdBack"
                  name="ownerLegalIdBack"
                  accept="image/*,.pdf"
                  onChange={(e) => handleFileUpload(e, "ownerLegalBackImage")}
                  className="hidden"
                />
              </label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="voidedCheck">Voided Check</Label>
              <label
                htmlFor="voidedCheck"
                className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors cursor-pointer flex flex-col items-center justify-center space-y-2"
              >
                {filePreviews.voidedCheckImage ? (
                  filePreviews.voidedCheckImage.startsWith("http") ? (
                    <img
                      src={filePreviews.voidedCheckImage}
                      alt="Voided Check Preview"
                      className="w-16 h-16 object-cover"
                    />
                  ) : (
                    <span className="text-sm text-gray-500 truncate max-w-full">
                      {filePreviews.voidedCheckImage}
                    </span>
                  )
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
                  id="voidedCheck"
                  name="voidedCheck"
                  accept="image/*,.pdf"
                  onChange={(e) => handleFileUpload(e, "voidedCheckImage")}
                  className="hidden"
                />
              </label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="miscellaneous">Miscellaneous</Label>
              <label
                htmlFor="miscellaneous"
                className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors cursor-pointer flex flex-col items-center justify-center space-y-2"
              >
                {filePreviews.miscellaneous ? (
                  filePreviews.miscellaneous.startsWith("http") ? (
                    <img
                      src={filePreviews.miscellaneous}
                      alt="Miscellaneous Preview"
                      className="w-16 h-16 object-cover"
                    />
                  ) : (
                    <span className="text-sm text-gray-500 truncate max-w-full">
                      {filePreviews.miscellaneous}
                    </span>
                  )
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
                  id="miscellaneous"
                  name="miscellaneous"
                  accept="image/*,.pdf"
                  onChange={(e) => handleFileUpload(e, "miscellaneous")}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {uploadError && <p className="text-red-500 text-sm">{uploadError}</p>}
        {error && <p className="text-red-500 text-sm">Error: {JSON.stringify(error)}</p>}

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            className="px-6 py-2"
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white"
            disabled={isLoading || formData.acceptDeliveryDays.length === 0}
          >
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
}