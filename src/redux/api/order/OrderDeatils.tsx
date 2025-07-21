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
<<<<<<< HEAD
=======

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
>>>>>>> 7c48c3d5dd1a01755aae309c24355a0513855f4f
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
<<<<<<< HEAD
} from "lucide-react";

import { useGiteSingleOrderQuery } from "./orderManagementApi";
=======
  DollarSign,
} from "lucide-react";

import { useGiteSingleOrderQuery } from "./orderManagementApi";
import { ImFilePdf } from "react-icons/im";
>>>>>>> 7c48c3d5dd1a01755aae309c24355a0513855f4f

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
<<<<<<< HEAD
=======
  const handleDownloadInvice = async (id: string) => {
    try {
      // Fetch the PDF as a binary response (arrayBuffer)
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/order/orderInvoice/${id}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch PDF");
      }

      // Read the binary data as an ArrayBuffer
      const data = await response.arrayBuffer();

      // Create a Blob from the ArrayBuffer (this represents a PDF)
      const blob = new Blob([data], { type: "application/pdf" });

      // Create a temporary link to trigger the download
      const fileURL = URL.createObjectURL(blob);

  
    window.open(fileURL, "_blank");
      // Create a temporary link to trigger the download
      // const link = document.createElement("a");
      // link.href = URL.createObjectURL(blob);
      // link.download = "order_delivery-slip"; 

      // Clean up the URL object
      // URL.revokeObjectURL(link.href);
       setTimeout(() => {
      URL.revokeObjectURL(fileURL);
    }, 10);
    } catch (err) {
      console.log(err);
    }
  };
  const handleDownloadDilverySlip = async (id: string) => {
    try {
      // Fetch the PDF as a binary response (arrayBuffer)
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/order/deliverySheet/${id}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch PDF");
      }

      // Read the binary data as an ArrayBuffer
      const data = await response.arrayBuffer();

      // Create a Blob from the ArrayBuffer (this represents a PDF)
      const blob = new Blob([data], { type: "application/pdf" });
 const fileURL = URL.createObjectURL(blob);

  
    window.open(fileURL, "_blank");
      // Create a temporary link to trigger the download
      // const link = document.createElement("a");
      // link.href = URL.createObjectURL(blob);
      // link.download = "order_delivery-slip"; 

      // Clean up the URL object
      // URL.revokeObjectURL(link.href);
       setTimeout(() => {
      URL.revokeObjectURL(fileURL);
    }, 10);
    } catch (err) {
      console.log(err);
    }
  };
  
const handleDownloadExcel = async () => {
  try {
   
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/order/bulk-order-excel-empty?download=true` 
    );

    if (!response.ok) {
      throw new Error("Failed to fetch Excel file");
    }

 
    const data = await response.arrayBuffer();

   
    const blob = new Blob([data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }); 

    
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    
    
    link.download = `order_repo.xl`; 
  
   
    document.body.appendChild(link);
    
   
    link.click(); 
    
   
    document.body.removeChild(link); 

    
    URL.revokeObjectURL(link.href);
  } catch (err) {
    console.error("Error downloading Excel file:", err);
   
  }
};

>>>>>>> 7c48c3d5dd1a01755aae309c24355a0513855f4f
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
<<<<<<< HEAD
                <Search className="h-4 w-4" />
=======
                <DollarSign className="h-4 w-4" />
>>>>>>> 7c48c3d5dd1a01755aae309c24355a0513855f4f
              </Button>
              <Button size="sm" variant="destructive">
                <FileText className="h-4 w-4" />
              </Button>
<<<<<<< HEAD
              <Button size="sm" variant="outline">
                <Download className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
=======
           
              <DropdownMenu>
                <DropdownMenuTrigger> <ImFilePdf className="w-5 h-5 text-black" /></DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => handleDownloadInvice(data.data._id)}
                  >
                    Invoice
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleDownloadDilverySlip(data.data._id)}
                  >
                    delivery slip
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleDownloadExcel}
                  >
                    Pro
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
>>>>>>> 7c48c3d5dd1a01755aae309c24355a0513855f4f
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
<<<<<<< HEAD
                  <TableCell className="text-blue-600">
=======
                  <TableCell   className="text-blue-600 cursor-pointer">
>>>>>>> 7c48c3d5dd1a01755aae309c24355a0513855f4f
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
