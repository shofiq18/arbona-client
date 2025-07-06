import baseApi from "../../baseApi";


interface Container {
  id: number;
  name: string;
  capacity: number;
}

const containerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getContainers: builder.query<Container[], void>({
      query: () => "/containers",
      providesTags: ["Containers"],
    }),
    addContainer: builder.mutation<Container, Partial<Container>>({
      query: (container) => ({
        url: "/containers",
        method: "POST",
        body: container,
      }),
      invalidatesTags: ["Containers"],
    }),
    updateContainer: builder.mutation<Container, Partial<Container> & { id: number }>({
      query: ({ id, ...patch }) => ({
        url: `/containers/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: ["Containers"],
    }),
    deleteContainer: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({
        url: `/containers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Containers"],
    }),
  }),
});

export const { useGetContainersQuery, useAddContainerMutation, useUpdateContainerMutation, useDeleteContainerMutation } = containerApi;
export default containerApi;