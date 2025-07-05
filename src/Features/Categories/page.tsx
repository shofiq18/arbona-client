"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';

interface Category {
  id: number;
  name: string;
  description: string;
}

const Categories: React.FC = () => {
  const [categories] = useState<Category[]>([
    { id: 1, name: 'Maida All Purpose Flour', description: 'High-quality flour' },
    { id: 2, name: 'Morayo Powder', description: 'Spicy seasoning' },
    { id: 3, name: 'Maida All Purpose Flour', description: 'Fine flour' },
    { id: 4, name: 'Morayo Powder', description: 'Traditional powder' },
    { id: 5, name: 'Maida All Purpose Flour', description: 'Premium flour' },
    { id: 6, name: 'Morayo Powder', description: 'Flavor enhancer' },
    { id: 7, name: 'Maida All Purpose Flour', description: 'Organic flour' },
    { id: 8, name: 'Morayo Powder', description: 'Spice mix' },
    { id: 9, name: 'Maida All Purpose Flour', description: 'Gluten-free' },
    { id: 10, name: 'Morayo Powder', description: 'Herbal powder' },
    { id: 11, name: 'Maida All Purpose Flour', description: 'Baking flour' },
    { id: 12, name: 'Morayo Powder', description: 'Aromatic spice' },
    { id: 13, name: 'Maida All Purpose Flour', description: 'White flour' },
    { id: 14, name: 'Morayo Powder', description: 'Seasoning powder' },
    { id: 15, name: 'Maida All Purpose Flour', description: 'Soft flour' },
    { id: 16, name: 'Morayo Powder', description: 'Spiced blend' },
    { id: 17, name: 'Maida All Purpose Flour', description: 'Whole grain' },
    { id: 18, name: 'Morayo Powder', description: 'Exotic spice' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCategories = filteredCategories.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

  const handleAddCategory = () => {
    setIsAddModalOpen(true);
  };

  const handleSave = () => {
    if (newCategory.name && newCategory.description) {
      console.log('New category added/updated:', newCategory);
      setNewCategory({ name: '', description: '' });
      setIsAddModalOpen(false);
      setIsUpdateModalOpen(false);
    }
  };

  const handleCancel = () => {
    setNewCategory({ name: '', description: '' });
    setIsAddModalOpen(false);
    setIsUpdateModalOpen(false);
    setIsViewModalOpen(false);
    setIsDeleteConfirmOpen(false);
    setSelectedCategory(null);
  };

  const handleView = (category: Category) => {
    setSelectedCategory(category);
    setIsViewModalOpen(true);
  };

  const handleUpdate = (category: Category) => {
    setSelectedCategory(category);
    setNewCategory({ name: category.name, description: category.description });
    setIsUpdateModalOpen(true);
  };

  const handleDelete = (category: Category) => {
    setSelectedCategory(category);
    setIsDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (selectedCategory) {
      toast.success(`Deleted ${selectedCategory.name} successfully!`);
      setIsDeleteConfirmOpen(false);
      setSelectedCategory(null);
    }
  };

  const cancelDelete = () => {
    setIsDeleteConfirmOpen(false);
    setSelectedCategory(null);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search product..."
          className="p-2 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={handleAddCategory}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              + Add Category
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Category</DialogTitle>
              <DialogDescription>
                Add a new category here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="name-1">Name</Label>
                <Input
                  id="name-1"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="description-1">Description</Label>
                <Input
                  id="description-1"
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" onClick={handleCancel}>Cancel</Button>
              </DialogClose>
              <Button onClick={handleSave}>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-100 text-gray-600">
            <th className="p-2">Name</th>
            <th className="p-2">Description</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentCategories.map((category) => (
            <tr key={category.id} className="border-t">
              <td className="p-2">{category.name}</td>
              <td className="p-2">{category.description}</td>
              <td className="p-2 flex space-x-2">
                <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
                  <DialogTrigger asChild>
                    <button onClick={() => handleView(category)} className="text-gray-600 hover:text-gray-800">
                      <Image
                        src="/dashboardIcons/eye.png"
                        width={20}
                        height={20}
                        alt="Profile"
                        className="rounded-full"
                      />
                      
                                            
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>View Details</DialogTitle>
                      <DialogDescription>
                        Details for {selectedCategory?.name}.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                      <div className="grid gap-3">
                        <Label htmlFor="view-name">Name</Label>
                        <Input id="view-name" value={selectedCategory?.name || ''} readOnly />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="view-description">Description</Label>
                        <Input id="view-description" value={selectedCategory?.description || ''} readOnly />
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline" onClick={handleCancel}>Close</Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Dialog open={isUpdateModalOpen} onOpenChange={setIsUpdateModalOpen}>
                  <DialogTrigger asChild>
                    <button onClick={() => handleUpdate(category)} className="text-gray-600 hover:text-gray-800">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Update Category</DialogTitle>
                      <DialogDescription>
                        Update the category details here. Click save when you're done.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                      <div className="grid gap-3">
                        <Label htmlFor="name-2">Name</Label>
                        <Input
                          id="name-2"
                          value={newCategory.name}
                          onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="description-2">Description</Label>
                        <Input
                          id="description-2"
                          value={newCategory.description}
                          onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline" onClick={handleCancel}>Cancel</Button>
                      </DialogClose>
                      <Button onClick={handleSave}>Save changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Dialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
                  <DialogTrigger asChild>
                    <button onClick={() => handleDelete(category)} className="text-gray-600 hover:text-gray-800">
                      <Image
                        src="/dashboardIcons/delete.png"
                        width={20}
                        height={20}
                        alt="Delete"
                        className="rounded-full"
                      />
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Confirm Delete</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to delete {selectedCategory?.name}? This action cannot be undone.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline" onClick={cancelDelete}>Cancel</Button>
                      </DialogClose>
                      <Button onClick={confirmDelete} variant="destructive">Delete</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-between items-center">
        <p className="text-gray-600">Showing {indexOfFirstItem + 1} to {indexOfLastItem} of {filteredCategories.length} categories</p>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-2 py-1 border rounded disabled:opacity-50"
          >
            &lt;
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 border rounded ${currentPage === page ? 'bg-gray-200' : ''}`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-2 py-1 border rounded disabled:opacity-50"
          >
            &gt;
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Categories;