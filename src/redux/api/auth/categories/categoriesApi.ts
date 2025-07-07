// import baseApi from "../../baseApi";


// interface Category {
//      _id: string;
//      name: string;
//      description: string;
//      createdAt?: string;
//      updatedAt?: string;
//      __v?: number;
//    }

// const categoriesApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     getCategories: builder.query<Category[], void>({
//       query: () => "/category",
//       providesTags: ["Categories"],
//     }),
//     addCategory: builder.mutation<Category, Partial<Category>>({
//       query: (category) => ({
//         url: "/category",
//         method: "POST",
//         body: category,
//       }),
//       invalidatesTags: ["Categories"],
//     }),
//     updateCategory: builder.mutation<Category, Partial<Category> & { id: number }>({
//       query: ({ id, ...patch }) => ({
//         url: `/category/${id}`,
//         method: "PUT",
//         body: patch,
//       }),
//       invalidatesTags: ["Categories"],
//     }),
//     deleteCategory: builder.mutation<{ success: boolean }, number>({
//       query: (id) => ({
//         url: `/category/${id}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: ["Categories"],
//     }),
//   }),
// });

// export const { useGetCategoriesQuery, useAddCategoryMutation, useUpdateCategoryMutation, useDeleteCategoryMutation } = categoriesApi;
// export default categoriesApi;

import baseApi from "../../baseApi";

interface Category {
  _id: string;
  name: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

const categoriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => "/category",
      providesTags: ["Categories"],
    }),
    addCategory: builder.mutation<Category, Partial<Category>>({
      query: (category) => ({
        url: "/category",
        method: "POST",
        body: category,
      }),
      invalidatesTags: ["Categories"],
    }),
    updateCategory: builder.mutation<Category, Partial<Category> & { _id: string }>({
      query: ({ _id, ...patch }) => ({
        url: `/category/${_id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: ["Categories"],
    }),
    deleteCategory: builder.mutation<{ success: boolean }, string>({
      query: (_id) => ({
        url: `/category/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Categories"],
    }),
  }),
});

export const { useGetCategoriesQuery, useAddCategoryMutation, useUpdateCategoryMutation, useDeleteCategoryMutation } = categoriesApi;
export default categoriesApi;