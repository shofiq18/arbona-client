import baseApi from "../baseApi";

interface Order {
  id: number;
  productId: number;
  quantity: number;
  status: string;
}

const orderManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<Order[], void>({
      query: () => "/order",
      providesTags: ["Orders"],
    }),
    addOrder: builder.mutation<Order, Partial<Order>>({
      query: (order) => ({
        url: "/order",
        method: "POST",
        body: order,
      }),
      invalidatesTags: ["Orders"],
    }),
    updateOrder: builder.mutation<Order, Partial<Order> & { id: number }>({
      query: ({ id, ...patch }) => ({
        url: `/orders/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: ["Orders"],
    }),
    deleteOrder: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useAddOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} = orderManagementApi;
export default orderManagementApi;
