"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Edit,
  Eye,
  FileText,
  Download,
  MoreHorizontal,
} from "lucide-react";

import { useGiteSingleOrderQuery } from "./orderManagementApi";

const OrderDeatils = ({ id }: { id: string }) => {
  const { data, isError, isLoading } = useGiteSingleOrderQuery(id);
  console.log(data);
  const [searchQuery, setSearchQuery] = useState("");

  const orderData = [
    {
      productName: "Tea Masala",
      itemNumber: "#322552",
      batchNumber: "-",
      categoryName: "Tea Masala",
      quantity: 20,
      price: 5.3,
      discount: 5.0,
      netPrice: 5.3,
      profit: "5.2.3",
      scanStatus: "Scanned",
    },
    {
      productName: "Tea Masala",
      itemNumber: "#322552",
      batchNumber: "-",
      categoryName: "Tea Masala",
      quantity: 20,
      price: 5.3,
      discount: 5.0,
      netPrice: 5.3,
      profit: "5.2.3",
      scanStatus: "Scanned",
    },
    {
      productName: "Tea Masala",
      itemNumber: "#322552",
      batchNumber: "-",
      categoryName: "Tea Masala",
      quantity: 20,
      price: 5.3,
      discount: 5.0,
      netPrice: 5.3,
      profit: "5.2.3",
      scanStatus: "Scanned",
    },
  ];
  return (
    <div>
      {" "}
      <div className="p-6 bg-white">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-gray-900 mb-4">
            View Order
          </h1>

          {/* Filter Section */}

          <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
            <h2 className="font-medium">{data?.data?.PONumber} </h2>
            <div className="flex items-center gap-2 ml-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search product..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                <Search className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="destructive">
                <FileText className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline">
                <Download className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold">Product Name</TableHead>
                <TableHead className="font-semibold">Item Number</TableHead>
                <TableHead className="font-semibold">Batch Number</TableHead>
                <TableHead className="font-semibold">Category Name</TableHead>
                <TableHead className="font-semibold">Quantity</TableHead>
                <TableHead className="font-semibold">Price</TableHead>
                <TableHead className="font-semibold">Discount</TableHead>
                <TableHead className="font-semibold">Net Price</TableHead>
                <TableHead className="font-semibold">Profit</TableHead>
                <TableHead className="font-semibold">Scan Status</TableHead>
                <TableHead className="font-semibold">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data?.products?.map((item: any, index: number) => (
                <TableRow key={index} className="hover:bg-gray-50">
                  <TableCell className="font-medium">
                    {item?.productId.name}
                  </TableCell>
                  <TableCell className="text-blue-600">
                    {item?.productId.itemNumber}
                  </TableCell>
                  <TableCell>{item.productId.barcodeString}</TableCell>
                  <TableCell>{item.productId.categoryId.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>
                    {item.productId.purchasePrice.toFixed(2)}
                  </TableCell>
                  <TableCell>{item.discount.toFixed(2)}</TableCell>
                  <TableCell>{item.productId.salesPrice.toFixed(2)}</TableCell>
                  <TableCell>{item.productId.competitorPrice}</TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-800"
                    >
                      panding
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Edit className="h-4 w-4 text-gray-600" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Eye className="h-4 w-4 text-gray-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>{" "}
    </div>
  );
};

export default OrderDeatils;
