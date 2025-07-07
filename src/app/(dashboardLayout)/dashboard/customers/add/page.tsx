"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

export default function AddCustomer(): React.ReactElement {
  const [formData, setFormData] = useState({
    storeName: '',
    customerFullName: '',
    storePhoneNumber: '',
    cellPhoneNumber: '',
    storeAuthorizedPersonName: '',
    storeAuthorizedPersonNumber: '',
    emailAddress: '',
    billingAddress: '',
    billingCity: '',
    billingState: '',
    billingZipcode: '',
    shippingAddress: '',
    shippingCity: '',
    shippingState: '',
    shippingZipcode: '',
    salesTaxId: '',
    termDays: '30',
    acceptDeliveryDays: '',
    shippingStatus: 'SILVER',
    note: '',
    sameAsBillingAddress: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSameAsBillingAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setFormData(prev => ({
      ...prev,
      sameAsBillingAddress: isChecked,
      ...(isChecked && {
        shippingAddress: prev.billingAddress,
        shippingCity: prev.billingCity,
        shippingState: prev.billingState,
        shippingZipcode: prev.billingZipcode
      })
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  const handleCancel = () => {
    // Handle cancel logic here
    console.log('Form cancelled');
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
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
            <Label htmlFor="customerFullName">Customer Full Name *</Label>
            <Input
              id="customerFullName"
              name="customerFullName"
              value={formData.customerFullName}
              onChange={handleInputChange}
              required
              className="w-full"
            />
          </div>
        </div>

        {/* Phone Numbers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="storePhoneNumber">Store Phone Number *</Label>
            <Input
              id="storePhoneNumber"
              name="storePhoneNumber"
              type="tel"
              value={formData.storePhoneNumber}
              onChange={handleInputChange}
              required
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="cellPhoneNumber">Cell Phone Number *</Label>
            <Input
              id="cellPhoneNumber"
              name="cellPhoneNumber"
              type="tel"
              value={formData.cellPhoneNumber}
              onChange={handleInputChange}
              required
              className="w-full"
            />
          </div>
        </div>

        {/* Authorized Person */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="storeAuthorizedPersonName">Store Authorized Person Name ( For Order ) *</Label>
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
            <Label htmlFor="storeAuthorizedPersonNumber">Store Authorized person Number ( For Order ) *</Label>
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
          <Label htmlFor="emailAddress">Email Address *</Label>
          <Input
            id="emailAddress"
            name="emailAddress"
            type="email"
            value={formData.emailAddress}
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
          <Label htmlFor="sameAsBillingAddress" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
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
            <Input
              id="acceptDeliveryDays"
              name="acceptDeliveryDays"
              value={formData.acceptDeliveryDays}
              onChange={handleInputChange}
              required
              className="w-full"
              placeholder="e.g., Monday, Wednesday, Friday"
            />
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
            rows={4}
            className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        <Separator />

        {/* Bank ACH Account Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Bank ACH Account Information *</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="space-y-2">
              <Label htmlFor="creditApplication">Credit Application</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <input
                    type="file"
                    id="creditApplication"
                    name="creditApplication"
                    accept="image/*,.pdf"
                    className="hidden"
                  />
                  <label htmlFor="creditApplication" className="text-sm text-gray-500 cursor-pointer hover:text-gray-700">
                    Click to upload
                  </label>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="ownerLegalIdFront">Owner Legal ID (Front)</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <input
                    type="file"
                    id="ownerLegalIdFront"
                    name="ownerLegalIdFront"
                    accept="image/*,.pdf"
                    className="hidden"
                  />
                  <label htmlFor="ownerLegalIdFront" className="text-sm text-gray-500 cursor-pointer hover:text-gray-700">
                    Click to upload
                  </label>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="ownerLegalIdBack">Owner Legal ID (Back)</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <input
                    type="file"
                    id="ownerLegalIdBack"
                    name="ownerLegalIdBack"
                    accept="image/*,.pdf"
                    className="hidden"
                  />
                  <label htmlFor="ownerLegalIdBack" className="text-sm text-gray-500 cursor-pointer hover:text-gray-700">
                    Click to upload
                  </label>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="voidedCheck">Voided Check</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <input
                    type="file"
                    id="voidedCheck"
                    name="voidedCheck"
                    accept="image/*,.pdf"
                    className="hidden"
                  />
                  <label htmlFor="voidedCheck" className="text-sm text-gray-500 cursor-pointer hover:text-gray-700">
                    Click to upload
                  </label>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="miscellaneous">Miscellaneous</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <input
                    type="file"
                    id="miscellaneous"
                    name="miscellaneous"
                    accept="image/*,.pdf"
                    className="hidden"
                  />
                  <label htmlFor="miscellaneous" className="text-sm text-gray-500 cursor-pointer hover:text-gray-700">
                    Click to upload
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            className="px-6 py-2"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white"
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}