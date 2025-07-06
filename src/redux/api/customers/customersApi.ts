import baseApi from "../baseApi";


interface Customer {
  id: number;
  name: string;
  email: string;
}

const customersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCustomers: builder.query<Customer[], void>({
      query: () => "/customers",
      providesTags: ["Customers"],
    }),
    addCustomer: builder.mutation<Customer, Partial<Customer>>({
      query: (customer) => ({
        url: "/customers",
        method: "POST",
        body: customer,
      }),
      invalidatesTags: ["Customers"],
    }),
    updateCustomer: builder.mutation<Customer, Partial<Customer> & { id: number }>({
      query: ({ id, ...patch }) => ({
        url: `/customers/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: ["Customers"],
    }),
    deleteCustomer: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({
        url: `/customers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Customers"],
    }),
  }),
});

export const { useGetCustomersQuery, useAddCustomerMutation, useUpdateCustomerMutation, useDeleteCustomerMutation } = customersApi;
export default customersApi;