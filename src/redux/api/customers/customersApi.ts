import { Customer, GetCustomersResponse } from "@/types";
import baseApi from "../baseApi";




const customersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCustomers: builder.query<GetCustomersResponse, void>({
      query: () => "/customer",
      providesTags: ["Customers"],
    }),
    addCustomer: builder.mutation<Customer, Partial<Customer>>({
      query: (customer) => ({
        url: "/customer",
        method: "POST",
        body: customer,
      }),
      invalidatesTags: ["Customers"],
    }),
    updateCustomer: builder.mutation<Customer, Partial<Customer> & { id: number }>({
      query: ({ id, ...patch }) => ({
        url: `/customer/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["Customers"],
    }),
    deleteCustomer: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({
        url: `/customer/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Customers"],
    }),
  }),
});

export const { useGetCustomersQuery, useAddCustomerMutation, useUpdateCustomerMutation, useDeleteCustomerMutation } = customersApi;
export default customersApi;