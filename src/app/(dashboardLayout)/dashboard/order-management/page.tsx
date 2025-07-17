"use client";
import AddOrderPage from "@/components/AddOrderForm";
import { OrderFilterForm } from "@/components/OrderFilterForm";
import { ReusableModal } from "@/components/ReusableModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetOrdersQuery } from "@/redux/api/order/orderManagementApi";
import { FilterFormValues, Order } from "@/types";
import { useState } from "react";
import { ImFilePdf } from "react-icons/im";

export default function OrderManagement(): React.ReactElement {
  const {
    data: { data: orders = [] } = {},
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetOrdersQuery() as {
    data?: { data?: Order[] };
    isLoading: boolean;
    isFetching: boolean;
    isError: boolean;
    error: object;
  };

  const [addOrderOpen, setAddOrderOpen] = useState(false);

  // function handleAddOrderSubmit(values: AddOrderFormValues) {
  //   // Implement your add order logic here (API call, state update, etc.)
  //   console.log("Add Order:", values);
  //   setAddOrderOpen(false);
  // }

  // function handleAddOrderCancel() {
  //   setAddOrderOpen(false);
  // }

  const [filterOpen, setFilterOpen] = useState(false);

  // ...existing code for fetching orders...

  function handleFilterSubmit(values: FilterFormValues) {
    // Implement filter logic here (update query params, refetch, etc.)
    console.log(values);
    setFilterOpen(false);
  }

  function handleFilterClear() {
    // Implement clear logic here
  }

  const cardData = [
    {
      title: "Total Open Order Amount",
      value: 12025,
      currency: "USD",
      date: "21-07-2025",
      growth: 10.4,
      bg: "#114F5E",
    },
    {
      title: "Total Order Amount",
      value: 12025,
      currency: "USD",
      date: "21-07-2025",
      growth: 10.4,
      bg: "#219EBC",
    },
    {
      title: "Order",
      value: 25,
      date: "21-07-2025",
      growth: 5.4,
      bg: "#1F6F97",
    },
  ];

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  if (isError) {
    console.log(error);
    return <div>Error: </div>;
  }

  console.log(orders);

  return (
    <div>
      {/* Section 1: Orders Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {cardData.map((card, idx) => (
          <div
            style={{ backgroundColor: card.bg }}
            key={idx}
            className="text-white p-4 rounded-lg"
          >
            <h3 className="text-base md:text-lg">{card.title}</h3>
            <p className="text-3xl md:text-4xl font-bold my-2.5">
              {card.value}
            </p>
            <p className="text-sm flex items-center gap-2">
              till {card.date}{" "}
              <span className="text-green-400 flex items-center gap-2">
                <svg
                  width="19"
                  height="18"
                  viewBox="0 0 19 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.92334 0C2.47562 0 2.92334 0.447715 2.92334 1V16H17.9233C18.4756 16 18.9233 16.4477 18.9233 17C18.9233 17.5523 18.4756 18 17.9233 18H1.92334C1.37106 18 0.92334 17.5523 0.92334 17V1C0.92334 0.447715 1.37106 0 1.92334 0Z"
                    fill="#21C45D"
                  />
                  <path
                    d="M17.7554 5.55468C18.0617 5.09516 17.9376 4.47429 17.478 4.16793C17.0185 3.86158 16.3976 3.98576 16.0913 4.44528L12.6776 9.56573L9.52332 7.19998C9.06406 6.85553 8.40972 6.96762 8.09127 7.44528L4.09127 13.4453C3.78492 13.9048 3.9091 14.5257 4.36862 14.832C4.82815 15.1384 5.44902 15.0142 5.75537 14.5547L9.169 9.43424L12.3233 11.8C12.7826 12.1444 13.4369 12.0324 13.7554 11.5547L17.7554 5.55468Z"
                    fill="#21C45D"
                  />
                </svg>
                {card.growth}
              </span>
            </p>
          </div>
        ))}
      </div>

      {/* Section 2: Search & Filter option */}
      <div className="flex items-center justify-between space-x-4 mt-6 mb-10">
        <Input
          type="text"
          placeholder="Search product..."
          className="max-w-xs"
        />
        <div className="flex items-center space-x-2">
          <Button className="bg-[#21C45D]">Hide Boards</Button>
          <ReusableModal
            open={filterOpen}
            onOpenChange={setFilterOpen}
            trigger={<Button className="bg-[#FF9012]">Filter</Button>}
            title="Product Filters"
          >
            <OrderFilterForm
              onSubmit={handleFilterSubmit}
              onClear={handleFilterClear}
            />
          </ReusableModal>
          <ReusableModal
            open={addOrderOpen}
            onOpenChange={setAddOrderOpen}
            trigger={<Button className="bg-[#EF4343]">+ Add Order</Button>}
            title="Add New Order"
          >
            <AddOrderPage />
          </ReusableModal>
          <Button className="bg-[#D9D9D9]" size="icon">
            <ImFilePdf className="w-5 h-5 text-black" />
          </Button>
        </div>
      </div>

      {/* Section 3: Order Table */}
      <div className="border w-[85vw] border-gray-200 rounded-lg">
        <Table className="overflow-x-auto overflow-y-auto max-h-[500px] block">
          <TableHeader className="sticky top-0 bg-gray-50 z-10">
            <TableRow>
              <TableHead className="min-w-[120px]">Order Date</TableHead>
              <TableHead className="min-w-[140px]">Invoice No.</TableHead>
              <TableHead className="min-w-[120px]">PO No.</TableHead>
              <TableHead className="min-w-[150px]">Store Name</TableHead>
              <TableHead className="min-w-[120px]">Payment Due</TableHead>
              <TableHead className="min-w-[120px]">Order Amount</TableHead>
              <TableHead className="min-w-[120px]">Order Status</TableHead>
              <TableHead className="min-w-[140px]">Payment Receive</TableHead>
              <TableHead className="min-w-[100px]">Discount</TableHead>
              <TableHead className="min-w-[120px]">Open Balance</TableHead>
              <TableHead className="min-w-[100px]">Profit</TableHead>
              <TableHead className="min-w-[100px]">Profit %</TableHead>
              <TableHead className="min-w-[130px]">Payment Status</TableHead>
              <TableHead className="min-w-[140px]">Sales Person</TableHead>
              <TableHead className="min-w-[150px]">Store Phone</TableHead>
              <TableHead className="min-w-[200px]">Store Email</TableHead>
              <TableHead className="min-w-[150px]">Sales Tax ID</TableHead>
              <TableHead className="min-w-[200px]">Billing Address</TableHead>
              <TableHead className="min-w-[120px]">Billing City</TableHead>
              <TableHead className="min-w-[120px]">Billing State</TableHead>
              <TableHead className="min-w-[120px]">Billing Zip</TableHead>
              <TableHead className="min-w-[200px]">Shipping Address</TableHead>
              <TableHead className="min-w-[120px]">Shipping City</TableHead>
              <TableHead className="min-w-[120px]">Shipping State</TableHead>
              <TableHead className="min-w-[120px]">Shipping Zip</TableHead>
              <TableHead className="min-w-[200px]">Bank Account Info</TableHead>
              <TableHead className="min-w-[180px]">Delivery Days</TableHead>
              <TableHead className="min-w-[120px]">Created At</TableHead>
              <TableHead className="min-w-[120px]">Updated At</TableHead>
              <TableHead className="min-w-[150px]">Products Count</TableHead>
              <TableHead className="min-w-[150px] sticky right-0 bg-gray-50">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders?.map((order: Order, idx: number) => (
              <TableRow key={order._id || idx} className="hover:bg-gray-50">
                <TableCell className="text-sm">
                  {new Date(order.date).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell className="text-sm text-blue-600 font-medium">
                  {order.invoiceNumber}
                </TableCell>
                <TableCell className="text-sm">{order.PONumber}</TableCell>
                <TableCell className="text-sm font-medium">
                  {order.storeId?.storeName || "N/A"}
                </TableCell>
                <TableCell className="text-sm">
                  {order.paymentDueDate
                    ? new Date(order.paymentDueDate).toLocaleDateString(
                        "en-US",
                        {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        }
                      )
                    : "N/A"}
                </TableCell>
                <TableCell className="text-sm font-medium">
                  ${order.orderAmount.toFixed(2)}
                </TableCell>
                <TableCell className="text-sm">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs uppercase font-medium">
                    {order.orderStatus}
                  </span>
                </TableCell>
                <TableCell className="text-sm font-medium">
                  ${order.paymentAmountReceived.toFixed(2)}
                </TableCell>
                <TableCell className="text-sm">
                  ${order.discountGiven.toFixed(2)}
                </TableCell>
                <TableCell className="text-sm font-medium">
                  <span
                    className={
                      order.openBalance < 0 ? "text-red-600" : "text-green-600"
                    }
                  >
                    ${order.openBalance.toFixed(2)}
                  </span>
                </TableCell>
                <TableCell className="text-sm font-medium text-green-600">
                  ${order.profitAmount.toFixed(2)}
                </TableCell>
                <TableCell className="text-sm font-medium">
                  {order.profitPercentage}%
                </TableCell>
                <TableCell className="text-sm">
                  <span
                    className={`px-2 py-1 rounded-full text-xs capitalize font-medium ${
                      order.paymentStatus === "paid"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {order.paymentStatus}
                  </span>
                </TableCell>
                <TableCell className="text-sm">
                  {order?.storeId?.storePersonName || "N/A"}
                </TableCell>
                <TableCell className="text-sm">
                  {order.storeId?.storePhone || "N/A"}
                </TableCell>
                <TableCell className="text-sm">
                  {order.storeId?.storePersonEmail || "N/A"}
                </TableCell>
                <TableCell className="text-sm">
                  {order.storeId?.salesTaxId || "N/A"}
                </TableCell>
                <TableCell className="text-sm">
                  {order.storeId?.billingAddress || "N/A"}
                </TableCell>
                <TableCell className="text-sm">
                  {order.storeId?.billingCity || "N/A"}
                </TableCell>
                <TableCell className="text-sm">
                  {order.storeId?.billingState || "N/A"}
                </TableCell>
                <TableCell className="text-sm">
                  {order.storeId?.billingZipcode || "N/A"}
                </TableCell>
                <TableCell className="text-sm">
                  {order.storeId?.shippingAddress || "N/A"}
                </TableCell>
                <TableCell className="text-sm">
                  {order.storeId?.shippingCity || "N/A"}
                </TableCell>
                <TableCell className="text-sm">
                  {order.storeId?.shippingState || "N/A"}
                </TableCell>
                <TableCell className="text-sm">
                  {order.storeId?.shippingZipcode || "N/A"}
                </TableCell>
                <TableCell className="text-sm">
                  {order.storeId?.bankACHAccountInfo || "N/A"}
                </TableCell>
                <TableCell className="text-sm">
                  {order.storeId?.acceptedDeliveryDays?.join(", ") || "N/A"}
                </TableCell>
                <TableCell className="text-sm">
                  {new Date(order.createdAt).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell className="text-sm">
                  {new Date(order.updatedAt).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell className="text-sm">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                    {order.products?.length || 0} items
                  </span>
                </TableCell>
                <TableCell className="text-sm sticky right-0 bg-white">
                  <div className="flex items-center space-x-2">
                    <button className="cursor-pointer hover:bg-gray-100 p-2 rounded-full transition-colors">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 20 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M10.0002 4.66669C15.1085 4.66669 17.5258 8.09166 18.3768 9.69284C18.6477 10.2027 18.6477 10.7974 18.3768 11.3072C17.5258 12.9084 15.1085 16.3334 10.0002 16.3334C4.89188 16.3334 2.4746 12.9084 1.62363 11.3072C1.35267 10.7974 1.35267 10.2027 1.62363 9.69284C2.4746 8.09166 4.89188 4.66669 10.0002 4.66669Z"
                          fill="#667085"
                        />
                      </svg>
                    </button>
                    <button className="cursor-pointer hover:bg-gray-100 p-2 rounded-full transition-colors">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 20 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M17.3047 7.3201C18.281 6.34379 18.281 4.76087 17.3047 3.78456L16.7155 3.19531C15.7391 2.219 14.1562 2.219 13.1799 3.19531L3.69097 12.6843C3.34624 13.029 3.10982 13.467 3.01082 13.9444L2.34111 17.1737C2.21932 17.7609 2.73906 18.2807 3.32629 18.1589L6.55565 17.4892C7.03302 17.3902 7.47103 17.1538 7.81577 16.809L17.3047 7.3201Z"
                          fill="#667085"
                        />
                      </svg>
                    </button>
                    <button className="cursor-pointer hover:bg-gray-100 p-2 rounded-full transition-colors">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 16 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.33317 6.62502C6.79341 6.62502 7.1665 6.99812 7.1665 7.45835V12.4584C7.1665 12.9186 6.79341 13.2917 6.33317 13.2917C5.87293 13.2917 5.49984 12.9186 5.49984 12.4584V7.45835C5.49984 6.99812 5.87293 6.62502 6.33317 6.62502Z"
                          fill="#667085"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12.9998 3.50002V2.66669C12.9998 1.28598 11.8806 0.166687 10.4998 0.166687H5.49984C4.11913 0.166687 2.99984 1.28598 2.99984 2.66669V3.50002H1.74984C1.2896 3.50002 0.916504 3.87312 0.916504 4.33335C0.916504 4.79359 1.2896 5.16669 1.74984 5.16669H2.1665V14.3334C2.1665 15.7141 3.28579 16.8334 4.6665 16.8334H11.3332C12.7139 16.8334 13.8332 15.7141 13.8332 14.3334V5.16669H14.2498C14.7101 5.16669 15.0832 4.79359 15.0832 4.33335C15.0832 3.87312 14.7101 3.50002 14.2498 3.50002H12.9998Z"
                          fill="#667085"
                        />
                      </svg>
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination or Load More (Optional) */}
      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-500">
          Showing {orders?.length || 0} of {orders?.length || 0} orders
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <span className="text-sm">Page 1 of 1</span>
          <Button variant="outline" size="sm" disabled>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
