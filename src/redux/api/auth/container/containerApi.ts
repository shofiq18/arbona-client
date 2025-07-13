

import baseApi from "../../baseApi";

// Product inside a container
export interface ContainerProduct {
  _id: string;
  category: string;
  itemNumber: string;
  quantity: number;
  perCaseCost: number;
  purchasePrice: number;
  salesPrice: number;
}

// Full container object
export interface Container {
  _id: string;
  containerNumber: string;
  containerName: string;
  isDeleted: boolean;
  containerStatus: 'onTheWay' | 'delivered' | 'pending' | string;
  deliveryDate: string;
  shippingCost: number;
  containerProducts: ContainerProduct[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Wrapper around API response
export interface ContainerApiResponse {
  success: boolean;
  message: string;
  data: Container[];
}

// API integration
const containerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ GET all containers (returns object with "data")
    getContainers: builder.query<ContainerApiResponse, void>({
      query: () => "/container",
      providesTags: ["Containers"],
    }),

    // ✅ POST create container
    addContainer: builder.mutation<Container, Partial<Omit<Container, '_id' | 'createdAt' | 'updatedAt' | '__v'>>>({
      query: (container) => ({
        url: "/container",
        method: "POST",
        body: container,
      }),
      invalidatesTags: ["Containers"],
    }),

    // ✅ PUT update container
    updateContainer: builder.mutation<Container, { id: string; data: Partial<Container> }>({
      query: ({ id, data }) => ({
        url: `/container/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Containers"],
    }),

    // ✅ DELETE container
    deleteContainer: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/container/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Containers"],
    }),
  }),
});

export const {
  useGetContainersQuery,
  useAddContainerMutation,
  useUpdateContainerMutation,
  useDeleteContainerMutation,
} = containerApi;

export default containerApi;
