// components/AddOrderForm.tsx
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { AddOrderFormProps, AddOrderFormValues } from "@/types";

export function AddOrderForm({ onSubmit, onCancel }: AddOrderFormProps) {
  const [form, setForm] = React.useState<AddOrderFormValues>({
    date: "",
    invoiceNumber: "",
    PONumber: "",
    storeName: "",
    paymentDueDate: "",
    orderAmount: "",
    orderStatus: "pending",
    paymentAmountReceived: "",
    discountGiven: "",
    openBalance: "",
    profitAmount: "",
    profitPercentage: "",
    paymentStatus: "notPaid",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSelect(name: keyof AddOrderFormValues, value: string) {
    setForm({ ...form, [name]: value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(form);
  }

  function handleCancel() {
    if (onCancel) onCancel();
  }

  return (
    <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm mb-1">Order Date</label>
        <Input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className="block text-sm mb-1">Invoice Number</label>
        <Input
          type="text"
          name="invoiceNumber"
          value={form.invoiceNumber}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className="block text-sm mb-1">PO Number</label>
        <Input
          type="text"
          name="PONumber"
          value={form.PONumber}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className="block text-sm mb-1">Store Name</label>
        <Input
          type="text"
          name="storeName"
          value={form.storeName}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className="block text-sm mb-1">Payment Due Date</label>
        <Input
          type="date"
          name="paymentDueDate"
          value={form.paymentDueDate}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className="block text-sm mb-1">Order Amount</label>
        <Input
          type="number"
          name="orderAmount"
          value={form.orderAmount}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className="block text-sm mb-1">Order Status</label>
        <Select
          value={form.orderStatus}
          onValueChange={(v) => handleSelect("orderStatus", v)}
        >
          <SelectTrigger>
            <span>
              {form.orderStatus.charAt(0).toUpperCase() +
                form.orderStatus.slice(1)}
            </span>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="verified">Verified</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="block text-sm mb-1">Payment Amount Received</label>
        <Input
          type="number"
          name="paymentAmountReceived"
          value={form.paymentAmountReceived}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className="block text-sm mb-1">Discount Given</label>
        <Input
          type="number"
          name="discountGiven"
          value={form.discountGiven}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className="block text-sm mb-1">Open Balance</label>
        <Input
          type="number"
          name="openBalance"
          value={form.openBalance}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className="block text-sm mb-1">Profit Amount</label>
        <Input
          type="number"
          name="profitAmount"
          value={form.profitAmount}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className="block text-sm mb-1">Profit Percentage</label>
        <Input
          type="number"
          name="profitPercentage"
          value={form.profitPercentage}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className="block text-sm mb-1">Payment Status</label>
        <Select
          value={form.paymentStatus}
          onValueChange={(v) => handleSelect("paymentStatus", v)}
        >
          <SelectTrigger>
            <span>
              {form.paymentStatus.charAt(0).toUpperCase() +
                form.paymentStatus.slice(1)}
            </span>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="notPaid">Not Paid</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="col-span-2 flex justify-end gap-2 mt-4">
        <Button type="button" variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
        <Button type="submit">Add Order</Button>
      </div>
    </form>
  );
}
