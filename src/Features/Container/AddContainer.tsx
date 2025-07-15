

"use client";
import React, { useState, useEffect } from 'react';
import { Container, ContainerProduct, InventoryApiResponse, CategoryApiResponse } from '@/types';
import { useAddContainerMutation } from '@/redux/api/auth/container/containerApi';
import { useGetInventoryQuery } from '@/redux/api/auth/inventory/inventoryApi';
import { useGetCategoriesQuery } from '@/redux/api/auth/categories/categoriesApi';
import toast from 'react-hot-toast';


const AddContainerPage = () => {
  const [container, setContainer] = useState<Container>({
    _id: '',
    containerNumber: '',
    containerName: '',
    isDeleted: false,
    containerStatus: 'onTheWay',
    deliveryDate: '',
    shippingCost: 0,
    containerProducts: [],
    createdAt: '',
    updatedAt: '',
    __v: 0,
  });
  const [newProduct, setNewProduct] = useState<ContainerProduct>({
    _id: '',
    category: '',
    itemNumber: '',
    quantity: 0,
    perCaseCost: 0,
    purchasePrice: 0,
    salesPrice: 0,
  });
  const [addContainer, { isLoading }] = useAddContainerMutation();
  const { data: inventoryResponse } = useGetInventoryQuery();
  const { data: categoriesResponse } = useGetCategoriesQuery();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name in newProduct) {
      setNewProduct((prev) => ({ ...prev, [name]: value }));
    } else {
      setContainer((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddProduct = () => {
    if (newProduct.category && newProduct.itemNumber && newProduct.quantity && newProduct.purchasePrice && newProduct.salesPrice) {
      setContainer((prev) => ({
        ...prev,
        containerProducts: [
          ...prev.containerProducts,
          {
            ...newProduct,
            quantity: Number(newProduct.quantity),
            perCaseCost: newProduct.perCaseCost ? Number(newProduct.perCaseCost) : 0,
            purchasePrice: Number(newProduct.purchasePrice),
            salesPrice: Number(newProduct.salesPrice),
            _id: Date.now().toString(),
          },
        ],
      }));
      setNewProduct({
        _id: '',
        category: '',
        itemNumber: '',
        quantity: 0,
        perCaseCost: 0,
        purchasePrice: 0,
        salesPrice: 0,
      });
    }
  };

  const handleEditProduct = (id: string, updatedProduct: ContainerProduct) => {
    setContainer((prev) => ({
      ...prev,
      containerProducts: prev.containerProducts.map((prod) =>
        prod._id === id ? { ...updatedProduct, quantity: Number(updatedProduct.quantity), perCaseCost: updatedProduct.perCaseCost ? Number(updatedProduct.perCaseCost) : 0, purchasePrice: Number(updatedProduct.purchasePrice), salesPrice: Number(updatedProduct.salesPrice) } : prod
      ),
    }));
  };

  const handleDeleteProduct = (id: string) => {
    setContainer((prev) => ({
      ...prev,
      containerProducts: prev.containerProducts.filter((prod) => prod._id !== id),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!container.containerNumber || !container.containerName || !container.deliveryDate || !container.shippingCost || container.containerProducts.length === 0) {
      toast.success('Please fill all container details and add at least one product.');
      return;
    }
    const deliveryDate = new Date(container.deliveryDate);
    if (isNaN(deliveryDate.getTime()) || deliveryDate < new Date()) {
      toast.error('Please select a valid future delivery date.');
      return;
    }
    console.log('Submitting container data:', {
      containerNumber: container.containerNumber,
      containerName: container.containerName,
      containerStatus: container.containerStatus,
      deliveryDate: container.deliveryDate,
      shippingCost: Number(container.shippingCost),
      containerProducts: container.containerProducts,
    });
    try {
      const response = await addContainer({
        containerNumber: container.containerNumber,
        containerName: container.containerName,
        containerStatus: container.containerStatus,
        deliveryDate: container.deliveryDate,
        shippingCost: Number(container.shippingCost),
        containerProducts: container.containerProducts,
      }).unwrap();
      console.log('API Response:', response);
      toast.success('Container created successfully');
      setContainer({
        _id: '',
        containerNumber: '',
        containerName: '',
        isDeleted: false,
        containerStatus: 'onTheWay',
        deliveryDate: '',
        shippingCost: 0,
        containerProducts: [],
        createdAt: '',
        updatedAt: '',
        __v: 0,
      });
    } catch (error) {
      console.error('API Error:', error);
      toast.error('Failed to create container');
    }
  };

  const inventoryData = inventoryResponse?.data || [];
  const categoriesData = categoriesResponse?.data || [];

  return (
    <div className="p-6">
      <div className="">
        <h1 className="text-2xl font-bold mb-12">Add Container</h1>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Container Number</label>
              <input
                type="text"
                name="containerNumber"
                value={container.containerNumber}
                onChange={handleInputChange}
                placeholder="Container Number *"
                className="border p-2 w-full"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Container Name</label>
              <input
                type="text"
                name="containerName"
                value={container.containerName}
                onChange={handleInputChange}
                placeholder="Container Name *"
                className="border p-2 w-full"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Delivery Date</label>
              <input
                type="date"
                name="deliveryDate"
                value={container.deliveryDate}
                onChange={handleInputChange}
                placeholder="Arrival Date *"
                className="border p-2 w-full "
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Container Status</label>
              <select
                name="containerStatus"
                value={container.containerStatus}
                onChange={handleInputChange}
                className="border p-2 w-full"
                required
              >
                <option value="onTheWay">On the Way</option>
                <option value="arrived">Arrived</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Shipping Cost</label>
              <input
                type="number"
                name="shippingCost"
                value={container.shippingCost}
                onChange={handleInputChange}
                placeholder="Total Shipping Cost *"
                className="border p-2 w-full"
                required
              />
            </div>
            <div className="mt-6">
              <button type="submit" className="bg-red-500 text-white p-2 py-2 px-6 rounded" disabled={isLoading}>
                Submit
              </button>
            </div>
          </div>
        

        {/* Added container section */}
        <div className="space-y-6 mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                name="category"
                value={newProduct.category}
                onChange={handleInputChange}
                className="border p-2 w-full "
                style={{ maxHeight: "200px", overflowY: "auto" }}
              >
                <option value="">Select Category</option>
                {categoriesData.map((cat) => (
                  <option key={cat._id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Item Number</label>
              <select
                name="itemNumber"
                value={newProduct.itemNumber}
                onChange={handleInputChange}
                className="border p-2 w-full "
                style={{ maxHeight: "200px", overflowY: "auto" }}
              >
                <option value="">Select Product</option>
                {inventoryData.map((prod) => (
                  <option key={prod._id} value={prod.itemNumber}>
                    {prod.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={newProduct.quantity}
                onChange={handleInputChange}
                placeholder="Quantity (Add QTY in cases) *"
                className="border p-2 w-full "
                required
              />
            </div>
          </div>
          {/* 2nd line */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <label className="block text-sm font-medium mb-1">Sales Price</label>
              <input
                type="number"
                name="salesPrice"
                value={newProduct.salesPrice}
                onChange={handleInputChange}
                placeholder="Sales Price *"
                className="border p-2 w-full "
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Purchase Price</label>
              <input
                type="number"
                name="purchasePrice"
                value={newProduct.purchasePrice}
                onChange={handleInputChange}
                placeholder="Purchase Price *"
                className="border p-2 w-full"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Per Case Cost</label>
              <input
                type="number"
                name="perCaseCost"
                value={newProduct.perCaseCost}
                onChange={handleInputChange}
                placeholder="Per case cost (optional)"
                className="border p-2 w-full"
              />
            </div>
          </div>
        </div>
        {/* Button add and cancel */}
        <div className="space-x-8 my-8">
          <button
            type="button"
            onClick={handleAddProduct}
            className="bg-red-500 text-white p-2 px-8 rounded"
          >
            Add
          </button>
          <button type="button" className="bg-gray-500 text-white p-2 px-8 rounded">
            Cancel
          </button>
        </div>

        {container.containerProducts.length > 0 && (
          <table className="w-full mt-4 border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Category</th>
                <th className="border p-2">Item Number</th>
                <th className="border p-2">Quantity</th>
                <th className="border p-2">Per Case Cost</th>
                <th className="border p-2">Sales Price</th>
                <th className="border p-2">Purchase Price</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {container.containerProducts.map((prod) => (
                <tr key={prod._id}>
                  <td className="border p-2">{prod.category}</td>
                  <td className="border p-2">{prod.itemNumber}</td>
                  <td className="border p-2">{prod.quantity}</td>
                  <td className="border p-2">{prod.perCaseCost || "-"}</td>
                  <td className="border p-2">${prod.salesPrice}</td>
                  <td className="border p-2">${prod.purchasePrice}</td>
                  <td className="border p-2">
                    <button onClick={() => handleDeleteProduct(prod._id)} className="text-red-500">
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </form>
    </div>
  );
};

export default AddContainerPage;