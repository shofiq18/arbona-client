import baseApi from "../../baseApi";


interface Inventory {
  id: number;
  productId: number;
  stock: number;
}

const inventoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getInventory: builder.query<Inventory[], void>({
      query: () => "/inventory",
      providesTags: ["Inventory"],
    }),
    addInventory: builder.mutation<Inventory, Partial<Inventory>>({
      query: (inventory) => ({
        url: "/inventory",
        method: "POST",
        body: inventory,
      }),
      invalidatesTags: ["Inventory"],
    }),
    updateInventory: builder.mutation<Inventory, Partial<Inventory> & { id: number }>({
      query: ({ id, ...patch }) => ({
        url: `/inventory/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: ["Inventory"],
    }),
    deleteInventory: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({
        url: `/inventory/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Inventory"],
    }),
  }),
});

export const { useGetInventoryQuery, useAddInventoryMutation, useUpdateInventoryMutation, useDeleteInventoryMutation } = inventoryApi;
export default inventoryApi;