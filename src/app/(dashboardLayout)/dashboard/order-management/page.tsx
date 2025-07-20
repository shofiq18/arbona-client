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

  console.log("check", orders)
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
      <div className="flex items-center justify-between w-full space-x-4 mt-6 mb-10">
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
      <Table className="overflow-x-auto">
        <TableHeader>
          <TableRow>
            <TableHead>Order Date</TableHead>
            <TableHead>Order Amount</TableHead>
            <TableHead>Order Status</TableHead>
            <TableHead>Payment Receive</TableHead>
            <TableHead>Discount</TableHead>
            <TableHead>Open Balance</TableHead>
            <TableHead>Profit</TableHead>
            <TableHead>Profit %</TableHead>
            <TableHead>Payment Status</TableHead>
            {/* <TableHead>Seals Person</TableHead> */}
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders?.map((order: Order, idx: number) => (
            <TableRow key={idx} className="*:text-sm">
              <TableCell>{order.date}</TableCell>
              <TableCell>
                {order.orderAmount.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </TableCell>
              <TableCell className="uppercase">{order.orderStatus}</TableCell>
              <TableCell>
                {order.paymentAmountReceived.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </TableCell>
              <TableCell>
                {order.discountGiven.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </TableCell>
              <TableCell>
                {order.openBalance.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </TableCell>
              <TableCell>
                {order.profitAmount.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </TableCell>
              <TableCell>{order.profitPercentage}%</TableCell>
              <TableCell className="text-[#FF0505] capitalize">
                {order.paymentStatus}
              </TableCell>
              {/* <TableCell>{order.}</TableCell> */}
              <TableCell>
                {/* Replace these with actual icons/buttons as needed */}
                <span className="inline-flex space-x-2">
                  <button className="cursor-pointer">
                    <svg
                      width="20"
                      height="21"
                      viewBox="0 0 20 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M10.0002 4.66669C15.1085 4.66669 17.5258 8.09166 18.3768 9.69284C18.6477 10.2027 18.6477 10.7974 18.3768 11.3072C17.5258 12.9084 15.1085 16.3334 10.0002 16.3334C4.89188 16.3334 2.4746 12.9084 1.62363 11.3072C1.35267 10.7974 1.35267 10.2027 1.62363 9.69284C2.4746 8.09166 4.89188 4.66669 10.0002 4.66669ZM5.69716 7.56477C4.31361 8.48147 3.50572 9.70287 3.09536 10.475C3.09078 10.4836 3.08889 10.4896 3.08807 10.4929C3.08724 10.4962 3.08708 10.5 3.08708 10.5C3.08708 10.5 3.08724 10.5038 3.08807 10.5071C3.08889 10.5104 3.09078 10.5164 3.09536 10.525C3.50572 11.2972 4.31361 12.5186 5.69716 13.4353C5.12594 12.5995 4.79188 11.5888 4.79188 10.5C4.79188 9.41127 5.12594 8.40055 5.69716 7.56477ZM14.3033 13.4353C15.6868 12.5186 16.4947 11.2972 16.905 10.525C16.9096 10.5164 16.9115 10.5104 16.9123 10.5071C16.9129 10.505 16.9133 10.5019 16.9133 10.5019L16.9133 10.5L16.913 10.4964L16.9123 10.4929C16.9115 10.4896 16.9096 10.4836 16.905 10.475C16.4947 9.70288 15.6868 8.48148 14.3033 7.56478C14.8745 8.40056 15.2085 9.41128 15.2085 10.5C15.2085 11.5888 14.8745 12.5995 14.3033 13.4353ZM6.45854 10.5C6.45854 8.54401 8.0442 6.95835 10.0002 6.95835C11.9562 6.95835 13.5419 8.54401 13.5419 10.5C13.5419 12.456 11.9562 14.0417 10.0002 14.0417C8.0442 14.0417 6.45854 12.456 6.45854 10.5Z"
                        fill="#667085"
                      />
                    </svg>
                  </button>
                  <button className="cursor-pointer">
                    <svg
                      width="20"
                      height="21"
                      viewBox="0 0 20 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M17.3047 7.3201C18.281 6.34379 18.281 4.76087 17.3047 3.78456L16.7155 3.19531C15.7391 2.219 14.1562 2.219 13.1799 3.19531L3.69097 12.6843C3.34624 13.029 3.10982 13.467 3.01082 13.9444L2.34111 17.1737C2.21932 17.7609 2.73906 18.2807 3.32629 18.1589L6.55565 17.4892C7.03302 17.3902 7.47103 17.1538 7.81577 16.809L17.3047 7.3201ZM16.1262 4.96307L15.5369 4.37382C15.2115 4.04838 14.6839 4.04838 14.3584 4.37382L13.4745 5.25773L15.2423 7.0255L16.1262 6.14158C16.4516 5.81615 16.4516 5.28851 16.1262 4.96307ZM14.0638 8.20401L12.296 6.43624L4.86948 13.8628C4.75457 13.9777 4.67577 14.1237 4.64277 14.2828L4.23082 16.2692L6.21721 15.8572C6.37634 15.8242 6.52234 15.7454 6.63726 15.6305L14.0638 8.20401Z"
                        fill="#667085"
                      />
                    </svg>
                  </button>
                  <button className="cursor-pointer">
                    <svg
                      width="16"
                      height="17"
                      viewBox="0 0 16 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.33317 6.62502C6.79341 6.62502 7.1665 6.99812 7.1665 7.45835V12.4584C7.1665 12.9186 6.79341 13.2917 6.33317 13.2917C5.87293 13.2917 5.49984 12.9186 5.49984 12.4584V7.45835C5.49984 6.99812 5.87293 6.62502 6.33317 6.62502Z"
                        fill="#667085"
                      />
                      <path
                        d="M10.4998 7.45835C10.4998 6.99812 10.1267 6.62502 9.6665 6.62502C9.20627 6.62502 8.83317 6.99812 8.83317 7.45835V12.4584C8.83317 12.9186 9.20627 13.2917 9.6665 13.2917C10.1267 13.2917 10.4998 12.9186 10.4998 12.4584V7.45835Z"
                        fill="#667085"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M12.9998 3.50002V2.66669C12.9998 1.28598 11.8806 0.166687 10.4998 0.166687H5.49984C4.11913 0.166687 2.99984 1.28598 2.99984 2.66669V3.50002H1.74984C1.2896 3.50002 0.916504 3.87312 0.916504 4.33335C0.916504 4.79359 1.2896 5.16669 1.74984 5.16669H2.1665V14.3334C2.1665 15.7141 3.28579 16.8334 4.6665 16.8334H11.3332C12.7139 16.8334 13.8332 15.7141 13.8332 14.3334V5.16669H14.2498C14.7101 5.16669 15.0832 4.79359 15.0832 4.33335C15.0832 3.87312 14.7101 3.50002 14.2498 3.50002H12.9998ZM10.4998 1.83335H5.49984C5.0396 1.83335 4.6665 2.20645 4.6665 2.66669V3.50002H11.3332V2.66669C11.3332 2.20645 10.9601 1.83335 10.4998 1.83335ZM12.1665 5.16669H3.83317V14.3334C3.83317 14.7936 4.20627 15.1667 4.6665 15.1667H11.3332C11.7934 15.1667 12.1665 14.7936 12.1665 14.3334V5.16669Z"
                        fill="#667085"
                      />
                    </svg>
                  </button>
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
