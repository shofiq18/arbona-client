// components/OrderFilterForm.tsx
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import React from "react";
import { FilterFormValues, OrderFilterFormProps } from "@/types";

export function OrderFilterForm({ onSubmit, onClear }: OrderFilterFormProps) {
  const [form, setForm] = React.useState<FilterFormValues>({
    fromDate: "",
    toDate: "",
    fromDueDate: "",
    toDueDate: "",
    storeName: "",
    productStatus: "all",
    orderStatus: "all",
    verificationStatus: "all",
  });
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSelect(name: string, value: string) {
    setForm({ ...form, [name]: value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(form);
  }

  function handleClear() {
    setForm({
      fromDate: "",
      toDate: "",
      fromDueDate: "",
      toDueDate: "",
      storeName: "",
      productStatus: "all",
      orderStatus: "all",
      verificationStatus: "all",
    });
    if (onClear) onClear();
  }

  return (
    <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm mb-1">From Date</label>
        <Input
          type="date"
          name="fromDate"
          value={form.fromDate}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className="block text-sm mb-1">To Date</label>
        <Input
          type="date"
          name="toDate"
          value={form.toDate}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className="block text-sm mb-1">From Due Date</label>
        <Input
          type="date"
          name="fromDueDate"
          value={form.fromDueDate}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className="block text-sm mb-1">To Due Date</label>
        <Input
          type="date"
          name="toDueDate"
          value={form.toDueDate}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className="block text-sm mb-1">Store Name</label>
        <Input
          type="text"
          name="storeName"
          placeholder="Store Name"
          value={form.storeName}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className="block text-sm mb-1">Product Status</label>
        <Select
          value={form.productStatus}
          onValueChange={(v) => handleSelect("productStatus", v)}
        >
          <SelectTrigger>
            <span>
              {form.productStatus.charAt(0).toUpperCase() +
                form.productStatus.slice(1)}
            </span>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
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
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="block text-sm mb-1">Verification Status</label>
        <Select
          value={form.verificationStatus}
          onValueChange={(v) => handleSelect("verificationStatus", v)}
        >
          <SelectTrigger>
            <span>
              {form.verificationStatus.charAt(0).toUpperCase() +
                form.verificationStatus.slice(1)}
            </span>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="verified">Verified</SelectItem>
            <SelectItem value="unverified">Unverified</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="col-span-2 flex justify-end gap-2 mt-4">
        <Button type="button" variant="outline" onClick={handleClear}>
          Clear
        </Button>
        <Button type="submit">Apply</Button>
      </div>
    </form>
  );
}
