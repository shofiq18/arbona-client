"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAddCustomerMutation } from "@/redux/api/customers/customersApi";


interface Customer {
  storeName: string;
  storePhone: string;
  storePersonEmail: string;
  salesTaxId: string;
  acceptedDeliveryDays: string[];
  bankACHAccountInfo: string;
  storePersonName: string;
  storePersonPhone: string;
  billingAddress: string;
  billingState: string;
  billingZipcode: string;
  billingCity: string;
  shippingAddress: string;
  shippingState: string;
  shippingZipcode: string;
  shippingCity: string;
  creditApplication: string;
  ownerLegalFrontImage: string;
  ownerLegalBackImage: string;
  voidedCheckImage: string;
}

const AddCustomers: React.FC = () => {
  const [newCustomer, setNewCustomer] = useState<Customer>({
    storeName: "",
    storePhone: "",
    storePersonEmail: "",
    salesTaxId: "",
    acceptedDeliveryDays: [],
    bankACHAccountInfo: "",
    storePersonName: "",
    storePersonPhone: "",
    billingAddress: "",
    billingState: "",
    billingZipcode: "",
    billingCity: "",
    shippingAddress: "",
    shippingState: "",
    shippingZipcode: "",
    shippingCity: "",
    creditApplication: "",
    ownerLegalFrontImage: "",
    ownerLegalBackImage: "",
    voidedCheckImage: "",
  });

  const [addCustomer, { isLoading: isCreating }] = useAddCustomerMutation();

  const handleFileUpload = async (file: File, field: keyof Customer) => {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("key", process.env.NEXT_PUBLIC_IMGBB_API_KEY || "");

    try {
      const response = await fetch("https://api.imgbb.com/1/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        setNewCustomer((prev) => ({ ...prev, [field]: data.data.url }));
        toast.success(`${field} uploaded successfully!`);
      } else {
        throw new Error(data.error.message || "Upload failed");
      }
    } catch (error) {
      toast.error(
        `Failed to upload ${field}: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      newCustomer.storeName &&
      newCustomer.storePhone &&
      newCustomer.storePersonEmail &&
      newCustomer.salesTaxId &&
      newCustomer.storePersonName &&
      newCustomer.storePersonPhone &&
      newCustomer.billingAddress &&
      newCustomer.billingState &&
      newCustomer.billingZipcode &&
      newCustomer.billingCity &&
      newCustomer.shippingAddress &&
      newCustomer.shippingState &&
      newCustomer.shippingZipcode &&
      newCustomer.shippingCity &&
      newCustomer.creditApplication &&
      newCustomer.ownerLegalFrontImage &&
      newCustomer.ownerLegalBackImage &&
      newCustomer.voidedCheckImage
    ) {
      try {
        await addCustomer(newCustomer).unwrap();
        toast.success("Customer added successfully!");
        setNewCustomer({
          storeName: "",
          storePhone: "",
          storePersonEmail: "",
          salesTaxId: "",
          acceptedDeliveryDays: [],
          bankACHAccountInfo: "",
          storePersonName: "",
          storePersonPhone: "",
          billingAddress: "",
          billingState: "",
          billingZipcode: "",
          billingCity: "",
          shippingAddress: "",
          shippingState: "",
          shippingZipcode: "",
          shippingCity: "",
          creditApplication: "",
          ownerLegalFrontImage: "",
          ownerLegalBackImage: "",
          voidedCheckImage: "",
        });
      } catch (error) {
        toast.error(
          "Failed to add customer: " + (error instanceof Error ? error.message : "Unknown error")
        );
      }
    }
  };

  const handleCancel = () => {
    setNewCustomer({
      storeName: "",
      storePhone: "",
      storePersonEmail: "",
      salesTaxId: "",
      acceptedDeliveryDays: [],
      bankACHAccountInfo: "",
      storePersonName: "",
      storePersonPhone: "",
      billingAddress: "",
      billingState: "",
      billingZipcode: "",
      billingCity: "",
      shippingAddress: "",
      shippingState: "",
      shippingZipcode: "",
      shippingCity: "",
      creditApplication: "",
      ownerLegalFrontImage: "",
      ownerLegalBackImage: "",
      voidedCheckImage: "",
    });
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Add Customer</h2>
      <form onSubmit={handleSave} className="grid gap-6">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="storeName">Store Name</Label>
            <Input
              id="storeName"
              value={newCustomer.storeName}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, storeName: e.target.value })
              }
              className="w-full"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="storePersonName">Customer Full Name</Label>
            <Input
              id="storePersonName"
              value={newCustomer.storePersonName}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, storePersonName: e.target.value })
              }
              className="w-full"
            />
          </div>
          <div className="grid gap-2 grid-cols-2 gap-x-4">
            <div>
              <Label htmlFor="storePhone">Store Phone Number</Label>
              <Input
                id="storePhone"
                value={newCustomer.storePhone}
                onChange={(e) =>
                  setNewCustomer({ ...newCustomer, storePhone: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="storePersonPhone">Cell Phone Number</Label>
              <Input
                id="storePersonPhone"
                value={newCustomer.storePersonPhone}
                onChange={(e) =>
                  setNewCustomer({ ...newCustomer, storePersonPhone: e.target.value })
                }
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="storePersonEmail">Store Person Email</Label>
            <Input
              id="storePersonEmail"
              type="email"
              value={newCustomer.storePersonEmail}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, storePersonEmail: e.target.value })
              }
              className="w-full"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="salesTaxId">Sales Tax ID</Label>
            <Input
              id="salesTaxId"
              value={newCustomer.salesTaxId}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, salesTaxId: e.target.value })
              }
              className="w-full"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="acceptedDeliveryDays">Accepted Delivery Days</Label>
            <Select
              value={newCustomer.acceptedDeliveryDays.join(",")}
              onValueChange={(value) =>
                setNewCustomer({
                  ...newCustomer,
                  acceptedDeliveryDays: value.split(",").map((day) => day.trim()),
                })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select days..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sunday">Sunday</SelectItem>
                <SelectItem value="monday">Monday</SelectItem>
                <SelectItem value="tuesday">Tuesday</SelectItem>
                <SelectItem value="wednesday">Wednesday</SelectItem>
                <SelectItem value="thursday">Thursday</SelectItem>
                <SelectItem value="friday">Friday</SelectItem>
                <SelectItem value="saturday">Saturday</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="bankACHAccountInfo">Bank ACH Account Info</Label>
            <Textarea
              id="bankACHAccountInfo"
              value={newCustomer.bankACHAccountInfo}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, bankACHAccountInfo: e.target.value })
              }
              className="w-full"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="billingAddress">Billing Address</Label>
            <Textarea
              id="billingAddress"
              value={newCustomer.billingAddress}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, billingAddress: e.target.value })
              }
              className="w-full"
            />
          </div>
          <div className="grid gap-2 grid-cols-3 gap-x-4">
            <div>
              <Label htmlFor="billingState">Billing State</Label>
              <Input
                id="billingState"
                value={newCustomer.billingState}
                onChange={(e) =>
                  setNewCustomer({ ...newCustomer, billingState: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="billingZipcode">Billing Zipcode</Label>
              <Input
                id="billingZipcode"
                value={newCustomer.billingZipcode}
                onChange={(e) =>
                  setNewCustomer({ ...newCustomer, billingZipcode: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="billingCity">Billing City</Label>
              <Input
                id="billingCity"
                value={newCustomer.billingCity}
                onChange={(e) =>
                  setNewCustomer({ ...newCustomer, billingCity: e.target.value })
                }
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="shippingAddress">Shipping Address</Label>
            <Textarea
              id="shippingAddress"
              value={newCustomer.shippingAddress}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, shippingAddress: e.target.value })
              }
              className="w-full"
            />
          </div>
          <div className="grid gap-2 grid-cols-3 gap-x-4">
            <div>
              <Label htmlFor="shippingState">Shipping State</Label>
              <Input
                id="shippingState"
                value={newCustomer.shippingState}
                onChange={(e) =>
                  setNewCustomer({ ...newCustomer, shippingState: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="shippingZipcode">Shipping Zipcode</Label>
              <Input
                id="shippingZipcode"
                value={newCustomer.shippingZipcode}
                onChange={(e) =>
                  setNewCustomer({ ...newCustomer, shippingZipcode: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="shippingCity">Shipping City</Label>
              <Input
                id="shippingCity"
                value={newCustomer.shippingCity}
                onChange={(e) =>
                  setNewCustomer({ ...newCustomer, shippingCity: e.target.value })
                }
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="creditApplication">Credit Application (PDF)</Label>
            <Input
              id="creditApplication"
              type="file"
              accept="application/pdf"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileUpload(file, "creditApplication");
              }}
            />
            {newCustomer.creditApplication && (
              <p className="text-sm text-gray-600">Uploaded: {newCustomer.creditApplication}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="ownerLegalFrontImage">Owner Legal Front Image</Label>
            <Input
              id="ownerLegalFrontImage"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileUpload(file, "ownerLegalFrontImage");
              }}
            />
            {newCustomer.ownerLegalFrontImage && (
              <p className="text-sm text-gray-600">Uploaded: {newCustomer.ownerLegalFrontImage}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="ownerLegalBackImage">Owner Legal Back Image</Label>
            <Input
              id="ownerLegalBackImage"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileUpload(file, "ownerLegalBackImage");
              }}
            />
            {newCustomer.ownerLegalBackImage && (
              <p className="text-sm text-gray-600">Uploaded: {newCustomer.ownerLegalBackImage}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="voidedCheckImage">Voided Check Image</Label>
            <Input
              id="voidedCheckImage"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileUpload(file, "voidedCheckImage");
              }}
            />
            {newCustomer.voidedCheckImage && (
              <p className="text-sm text-gray-600">Uploaded: {newCustomer.voidedCheckImage}</p>
            )}
          </div>
        </div>
        <div className="flex justify-end gap-4 mt-6">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isCreating}>
            {isCreating ? "Adding..." : "Add Customer"}
          </Button>
        </div>
      </form>

      <ToastContainer />
    </div>
  );
};

export default AddCustomers;