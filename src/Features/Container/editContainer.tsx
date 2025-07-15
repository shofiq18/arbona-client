

"use client";
import React, { useState, useEffect } from 'react';
import { Container, ContainerProduct } from '@/types';
import { useUpdateContainerMutation, useGetContainerQuery } from '@/redux/api/auth/container/containerApi';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Loading from '@/redux/Shared/Loading';

const EditContainerPage = () => {
  const { id } = useParams();
  const router = useRouter();
  console.log('Param ID:', id); // Debug: Check the ID from URL
  const { data: containerData, isLoading, error, isSuccess } = useGetContainerQuery(id as string, { skip: !id });
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
  const [updateContainer, { isLoading: isUpdating }] = useUpdateContainerMutation();

  useEffect(() => {
    console.log('Container Data:', containerData); // Debug: Log the full response
    if (containerData?.data) {
      console.log('Fetched Container Data:', containerData.data); // Debug: Log the data
      setContainer(containerData.data); // Set the single Container object
    } else if (isSuccess && !containerData) {
      console.log('No data returned for ID:', id); // Debug: No data case
    }
  }, [containerData, id, isSuccess]);

  if (isLoading) return(
    <Loading title='Loading Container Edit data ........'/>
  );
  if (error) {
    const errorMessage = error && 'data' in error && typeof error.data === 'object' && error.data !== null
      ? (error.data as { message?: string }).message || 'Unknown error'
      : 'Failed to load container data';
    return <div className="p-6 text-red-500">Error loading container data: {errorMessage}</div>;
  }
  if (!containerData?.data) return <div className="p-6 text-yellow-500">No container data found for ID: {id || 'undefined'}</div>;

  const handleContainerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setContainer((prev) => ({ ...prev, [name]: value }));
  };

  const handleProductChange = (id: string, field: string, value: string | number) => {
    setContainer((prev) => ({
      ...prev,
      containerProducts: prev.containerProducts.map((prod) =>
        prod._id === id ? { ...prod, [field]: value } : prod
      ),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!container.containerNumber || !container.containerName || !container.deliveryDate || !container.shippingCost || container.containerProducts.length === 0) {
      alert('Please fill all container details and ensure products are valid.');
      return;
    }
    const deliveryDate = new Date(container.deliveryDate);
    if (isNaN(deliveryDate.getTime()) || deliveryDate < new Date()) {
      alert('Please select a valid future delivery date.');
      return;
    }
    try {
      await updateContainer({ id: container._id, data: {
        containerNumber: container.containerNumber,
        containerName: container.containerName,
        containerStatus: container.containerStatus,
        deliveryDate: container.deliveryDate,
        shippingCost: Number(container.shippingCost),
        containerProducts: container.containerProducts,
      } }).unwrap();
      toast.success('Container updated successfully');
      router.push('/dashboard/container');
    } catch (error) {
      console.error('API Error:', error);
      toast.error('Failed to update container');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Container</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Container Number</label>
            <input
              type="text"
              name="containerNumber"
              value={container.containerNumber || ''}
              onChange={handleContainerChange}
              className="border p-2 w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Container Name</label>
            <input
              type="text"
              name="containerName"
              value={container.containerName || ''}
              onChange={handleContainerChange}
              className="border p-2 w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Delivery Date</label>
            <input
              type="date"
              name="deliveryDate"
              value={container.deliveryDate || ''}
              onChange={handleContainerChange}
              className="border p-2 w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Container Status</label>
            <select
              name="containerStatus"
              value={container.containerStatus || 'onTheWay'}
              onChange={handleContainerChange}
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
              value={container.shippingCost || 0}
              onChange={handleContainerChange}
              className="border p-2 w-full"
              required
            />
          </div>
        </div>

        {container.containerProducts.length > 0 && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">Container Products</h2>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">Category</th>
                  <th className="border p-2">Item Number</th>
                  <th className="border p-2">Quantity</th>
                  <th className="border p-2">Per Case Cost</th>
                  <th className="border p-2">Sales Price</th>
                  <th className="border p-2">Purchase Price</th>
                </tr>
              </thead>
              <tbody>
                {container.containerProducts.map((prod) => (
                  <tr key={prod._id} className="border-t">
                    <td className="border p-2">
                      <input
                        type="text"
                        value={prod.category || ''}
                        onChange={(e) => handleProductChange(prod._id, 'category', e.target.value)}
                        className="border p-1 w-full"
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        type="text"
                        value={prod.itemNumber || ''}
                        onChange={(e) => handleProductChange(prod._id, 'itemNumber', e.target.value)}
                        className="border p-1 w-full"
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        type="number"
                        value={prod.quantity || 0}
                        onChange={(e) => handleProductChange(prod._id, 'quantity', Number(e.target.value))}
                        className="border p-1 w-full"
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        type="number"
                        value={prod.perCaseCost || ''}
                        onChange={(e) => handleProductChange(prod._id, 'perCaseCost', e.target.value ? Number(e.target.value) : 0)}
                        className="border p-1 w-full"
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        type="number"
                        value={prod.salesPrice || 0}
                        onChange={(e) => handleProductChange(prod._id, 'salesPrice', Number(e.target.value))}
                        className="border p-1 w-full"
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        type="number"
                        value={prod.purchasePrice || 0}
                        onChange={(e) => handleProductChange(prod._id, 'purchasePrice', Number(e.target.value))}
                        className="border p-1 w-full"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              type="submit"
              className="mt-4 bg-red-500 text-white p-2 py-1 px-4 rounded"
              disabled={isUpdating}
            >
              Update
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default EditContainerPage;