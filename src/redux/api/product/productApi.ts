import { Product } from "@/types";
import baseApi from "../baseApi";

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProductsByCategory: builder.query<Product[], string>({
      query: (categoryId) => `/product/by-category/${categoryId}`,
      providesTags: (result, error, categoryId) => [
        { type: "Products", id: categoryId },
      ],
    }),
  }),
});

export const { useGetProductsByCategoryQuery } = productsApi;
