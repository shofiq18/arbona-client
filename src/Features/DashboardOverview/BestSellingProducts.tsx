"use client";

import Image from 'next/image';
import React, { useState } from 'react';

interface Product {
    id: number;
    name: string;
    image: string;
    totalOrders: number;
    status: 'Stock' | 'Stock Out';
    price: string;
}

const BestSellingProducts: React.FC = () => {
    const [products] = useState<Product[]>([
        { id: 1, name: 'Besan Fine', image: 'https://via.placeholder.com/50', totalOrders: 56, status: 'Stock Out', price: '$46.48' },
        { id: 2, name: 'Bhakri Flour', image: 'https://via.placeholder.com/50', totalOrders: 266, status: 'Stock', price: '$25.62' },
        { id: 3, name: 'Bajri Flour', image: 'https://via.placeholder.com/50', totalOrders: 266, status: 'Stock Out', price: '$34.88' },
        { id: 4, name: 'Handvo Flour', image: 'https://via.placeholder.com/50', totalOrders: 56, status: 'Stock', price: '$49.04' },
        { id: 5, name: 'Ragri Flour', image: 'https://via.placeholder.com/50', totalOrders: 66, status: 'Stock', price: '$25.79' },
        { id: 6, name: 'Ragri Flour', image: 'https://via.placeholder.com/50', totalOrders: 266, status: 'Stock Out', price: '$25.79' },
        { id: 7, name: 'Ragri Flour', image: 'https://via.placeholder.com/50', totalOrders: 266, status: 'Stock', price: '$25.79' },
        { id: 8, name: 'Ragri Flour', image: 'https://via.placeholder.com/50', totalOrders: 56, status: 'Stock', price: '$25.79' },
    ]);

    const handlePostData = () => {
        console.log('Posting data:', products);
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Best selling product <span className="text-gray-400">▼</span></h2>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse ">
                    <thead>
                        <tr className="bg-[#EAF8E7]  text-[#6A717F]">
                            <th className="p-2">PRODUCT</th>
                            <th className="p-2">TOTAL ORDER</th>
                            <th className="p-2">STATUS</th>
                            <th className="p-2">PRICE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id} className="border-t">
                                <td className=" flex items-center">
                                    <Image
                                        width={50}
                                        height={50}
                                        src={product.image}
                                        alt={product.name}
                                        className="w-10 h-10 rounded-full mr-2"
                                    />
                                    {product.name}
                                </td>
                                <td className="p-2">{product.totalOrders}</td>
                                <td className="p-2">
                                    <span className={`flex items-center gap-1`}>
                                        <span className={`w-2 h-2 rounded-full ${product.status === 'Stock' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                        <span className={product.status === 'Stock' ? 'text-green-500' : 'text-red-500'}>
                                            {product.status}
                                        </span>
                                    </span>
                                </td>
                                <td className="p-2">{product.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-end">
                <button
                onClick={handlePostData}
                className=" sm:mr-8  px-5 py-0.5 text-[#6467F2] border border-[#6467F2]  rounded-full "
            >
                More
            </button>
            </div>
        </div>
    );
};

export default BestSellingProducts;