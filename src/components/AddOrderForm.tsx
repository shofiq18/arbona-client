"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Calculator,
  Calendar,
  MapPin,
  Minus,
  Package,
  Plus,
  Search,
  ShoppingCart,
  User,
} from "lucide-react";
import { useState } from "react";

interface Product {
  id: string;
  name: string;
  itemCode: string;
  category: string;
  price: number;
  availableQty: number;
  unit: string;
}

interface OrderItem {
  product: Product;
  quantity: number;
  bookedQty: number;
  discount: number;
  total: number;
}

interface Client {
  id: string;
  name: string;
  address: string;
  phone: string;
}

const AddOrderPage = () => {
  const [selectedClient, setSelectedClient] = useState<string>("");
  const [orderDate, setOrderDate] = useState<string>("2025-01-15");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<string>("Moraiyo Powder");
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  // Sample data
  const clients: Client[] = [
    {
      id: "1",
      name: "Bombay Bazaar",
      address: "Mumbai, Maharashtra",
      phone: "+91 98765 43210",
    },
    {
      id: "2",
      name: "Delhi Spice Market",
      address: "Delhi, India",
      phone: "+91 98765 43211",
    },
    {
      id: "3",
      name: "Chennai Traders",
      address: "Chennai, Tamil Nadu",
      phone: "+91 98765 43212",
    },
    {
      id: "4",
      name: "Kolkata Wholesale",
      address: "Kolkata, West Bengal",
      phone: "+91 98765 43213",
    },
  ];

  const categories = [
    "Moraiyo Powder",
    "Spices & Masala",
    "Rice & Grains",
    "Pulses & Lentils",
    "Oil & Ghee",
    "Dry Fruits",
    "Tea & Coffee",
    "Snacks & Namkeen",
  ];

  const products: Product[] = [
    {
      id: "P23462",
      name: "Moraiyo Powder Premium",
      itemCode: "P23462",
      category: "Moraiyo Powder",
      price: 310.3,
      availableQty: 15.0,
      unit: "kg",
    },
    {
      id: "P23463",
      name: "Moraiyo Powder Standard",
      itemCode: "P23463",
      category: "Moraiyo Powder",
      price: 285.5,
      availableQty: 12.5,
      unit: "kg",
    },
    {
      id: "P23464",
      name: "Moraiyo Powder Organic",
      itemCode: "P23464",
      category: "Moraiyo Powder",
      price: 425.75,
      availableQty: 8.0,
      unit: "kg",
    },
    {
      id: "S001",
      name: "Turmeric Powder",
      itemCode: "S001",
      category: "Spices & Masala",
      price: 180.0,
      availableQty: 25.0,
      unit: "kg",
    },
    {
      id: "S002",
      name: "Red Chili Powder",
      itemCode: "S002",
      category: "Spices & Masala",
      price: 220.0,
      availableQty: 18.5,
      unit: "kg",
    },
  ];

  const filteredProducts = products.filter(
    (product) =>
      product.category === selectedCategory &&
      (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.itemCode.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const addToOrder = (product: Product) => {
    const existingItem = orderItems.find(
      (item) => item.product.id === product.id
    );
    if (existingItem) {
      updateQuantity(product.id, existingItem.quantity + 1);
    } else {
      const newItem: OrderItem = {
        product,
        quantity: 1,
        bookedQty: 0,
        discount: 0,
        total: product.price,
      };
      setOrderItems([...orderItems, newItem]);
    }
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromOrder(productId);
      return;
    }

    setOrderItems(
      orderItems.map((item) => {
        if (item.product.id === productId) {
          const total = item.product.price * newQuantity - item.discount;
          return { ...item, quantity: newQuantity, total };
        }
        return item;
      })
    );
  };

  const updateDiscount = (productId: string, discount: number) => {
    setOrderItems(
      orderItems.map((item) => {
        if (item.product.id === productId) {
          const total = item.product.price * item.quantity - discount;
          return { ...item, discount, total: Math.max(0, total) };
        }
        return item;
      })
    );
  };

  const removeFromOrder = (productId: string) => {
    setOrderItems(orderItems.filter((item) => item.product.id !== productId));
  };

  const calculateTotals = () => {
    const totalAmount = orderItems.reduce((sum, item) => sum + item.total, 0);
    const totalQuantity = orderItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    const totalWeight = orderItems.reduce(
      (sum, item) => sum + item.quantity * 1,
      0
    ); // Assuming 1 unit = 1 kg
    return { totalAmount, totalQuantity, totalWeight };
  };

  const { totalAmount, totalQuantity, totalWeight } = calculateTotals();

  const handlePlaceOrder = () => {
    if (!selectedClient || orderItems.length === 0) {
      alert("Please select a client and add items to the order");
      return;
    }

    const orderData = {
      client: clients.find((c) => c.id === selectedClient),
      date: orderDate,
      items: orderItems,
      totals: { totalAmount, totalQuantity, totalWeight },
    };

    console.log("Order placed:", orderData);
    alert("Order placed successfully!");

    // Reset form
    setOrderItems([]);
    setSelectedClient("");
    setSearchTerm("");
  };

  return (
    <Card className="w-full flex flex-col">
      {/* <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b">
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          <ShoppingCart className="w-6 h-6" />
          Add Order
        </CardTitle>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <X className="w-4 h-4" />
          </Button>
      </CardHeader> */}

      <CardContent className="flex-1 flex flex-col overflow-hidden">
        {/* Top Section - Client, Date, Search */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="space-y-2">
            <Label htmlFor="client" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Select Client
            </Label>
            <Select value={selectedClient} onValueChange={setSelectedClient}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose client..." />
              </SelectTrigger>
              <SelectContent>
                {clients.map((client) => (
                  <SelectItem
                    className="w-full"
                    key={client.id}
                    value={client.id}
                  >
                    <div className="flex flex-col w-full">
                      <span className="font-medium">{client.name}</span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {client.address}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Order Date
            </Label>
            <Input
              id="date"
              type="date"
              value={orderDate}
              onChange={(e) => setOrderDate(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="search" className="flex items-center gap-2">
              <Search className="w-4 h-4" />
              Search Products
            </Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                id="search"
                placeholder="Search by name or code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 min-h-0">
          {/* Left Sidebar - Categories */}
          <div className="lg:col-span-1">
            <Card className="h-full flex flex-col">
              <CardHeader className="pb-3 flex-shrink-0">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Categories
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 flex-1 overflow-hidden">
                <ScrollArea className="h-full">
                  <div className="space-y-1 p-3">
                    {categories.map((category) => (
                      <Button
                        key={category}
                        variant={
                          selectedCategory === category ? "default" : "ghost"
                        }
                        className={`w-full justify-start text-left h-auto py-3 px-3 ${
                          selectedCategory === category
                            ? "bg-red-600 hover:bg-red-700 text-white"
                            : "hover:bg-muted"
                        }`}
                        onClick={() => setSelectedCategory(category)}
                      >
                        <div className="flex flex-col items-start w-full">
                          <span className="font-medium text-sm">
                            {category}
                          </span>
                          <span className="text-xs opacity-70">
                            {
                              products.filter((p) => p.category === category)
                                .length
                            }{" "}
                            items
                          </span>
                        </div>
                      </Button>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Center - Products */}
          <div className="lg:col-span-2">
            <Card className="h-full flex flex-col">
              <CardHeader className="pb-3 flex-shrink-0">
                <CardTitle className="text-lg">
                  {selectedCategory} ({filteredProducts.length} items)
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 flex-1 overflow-hidden">
                <ScrollArea className="h-full">
                  <div className="space-y-2 p-3">
                    {filteredProducts.map((product) => (
                      <div
                        key={product.id}
                        className="border rounded-lg p-3 hover:bg-muted/50 transition-colors"
                      >
                        <div className="grid grid-cols-12 gap-2 items-center text-sm">
                          <div className="col-span-4">
                            <div className="font-medium text-sm">
                              {product.name}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Item: {product.itemCode}
                            </div>
                          </div>
                          <div className="col-span-2 text-center">
                            <div className="text-xs text-muted-foreground">
                              Available
                            </div>
                            <div className="font-medium text-sm">
                              {product.availableQty.toFixed(2)}
                            </div>
                          </div>
                          <div className="col-span-2 text-center">
                            <div className="text-xs text-muted-foreground">
                              Price
                            </div>
                            <div className="font-medium text-sm">
                              ₹{product.price.toFixed(2)}
                            </div>
                          </div>
                          <div className="col-span-2 text-center">
                            <div className="text-xs text-muted-foreground">
                              Unit
                            </div>
                            <div className="font-medium text-sm">
                              {product.unit}
                            </div>
                          </div>
                          <div className="col-span-2 text-center">
                            <Button
                              size="sm"
                              onClick={() => addToOrder(product)}
                              className="bg-green-600 hover:bg-green-700 h-8 text-xs"
                            >
                              <Plus className="w-3 h-3 mr-1" />
                              Add
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Right - Order Summary */}
          <div className="lg:col-span-1">
            <Card className="h-full flex flex-col">
              <CardHeader className="pb-3 flex-shrink-0">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 flex-1 flex flex-col overflow-hidden">
                <ScrollArea className="flex-1">
                  <div className="space-y-3 p-3">
                    {orderItems.length === 0 ? (
                      <div className="text-center text-muted-foreground py-8">
                        <ShoppingCart className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">No items added</p>
                      </div>
                    ) : (
                      orderItems.map((item) => (
                        <div
                          key={item.product.id}
                          className="border rounded-lg p-2 space-y-2"
                        >
                          <div className="font-medium text-xs">
                            {item.product.name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {item.product.itemCode}
                          </div>

                          <div className="flex items-center gap-1 justify-center">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-6 w-6 p-0 bg-transparent"
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity - 1
                                )
                              }
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="text-xs font-medium w-8 text-center">
                              {item.quantity}
                            </span>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-6 w-6 p-0 bg-transparent"
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity + 1
                                )
                              }
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>

                          <div className="space-y-1 text-xs">
                            <div className="flex justify-between">
                              <span>Price:</span>
                              <span>₹{item.product.price.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span>Discount:</span>
                              <Input
                                type="number"
                                value={item.discount}
                                onChange={(e) =>
                                  updateDiscount(
                                    item.product.id,
                                    Number(e.target.value)
                                  )
                                }
                                className="h-5 w-12 text-xs p-1"
                                min="0"
                              />
                            </div>
                            <Separator />
                            <div className="flex justify-between font-medium">
                              <span>Total:</span>
                              <span>₹{item.total.toFixed(2)}</span>
                            </div>
                          </div>

                          <Button
                            size="sm"
                            variant="destructive"
                            className="w-full h-5 text-xs"
                            onClick={() => removeFromOrder(item.product.id)}
                          >
                            Remove
                          </Button>
                        </div>
                      ))
                    )}
                  </div>
                </ScrollArea>

                {/* Order Totals */}
                <div className="border-t p-3 space-y-2 flex-shrink-0">
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Total Qty:</span>
                      <span className="font-medium">{totalQuantity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Weight:</span>
                      <span className="font-medium">
                        {totalWeight.toFixed(2)} kg
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-base font-bold">
                      <span>Total:</span>
                      <span>₹{totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex justify-end gap-3 pt-4 flex-shrink-0">
          <Button variant="outline" className="px-8 bg-transparent">
            Cancel
          </Button>
          <Button
            onClick={handlePlaceOrder}
            className="px-8 bg-red-600 hover:bg-red-700"
            disabled={!selectedClient || orderItems.length === 0}
          >
            Place Order
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AddOrderPage;
