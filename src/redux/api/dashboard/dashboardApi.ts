import baseApi from "../baseApi";

interface DashboardData {
  totalOrders: number;
  totalCustomers: number;
  totalRevenue: number;
}

interface ProductData {
  _id: string;
  totalQuantity: number;
  numberOfOrders: number;
  orderScore: number;
  revenuePercentage: number;
  name: string;
  itemNumber: string | null;
}

interface ProductResponse {
  success: boolean;
  message: string;
  data: ProductData[];
}

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardData: builder.query<DashboardData, void>({
      query: () => "/dashboard",
      providesTags: ["Dashboard"],
    }),
    getBestSellingProducts: builder.query<ProductResponse, void>({
      query: () => "/order/best-selling",
      providesTags: ["Products"],
    }),
    getWorstSellingProducts: builder.query<ProductResponse, void>({
      query: () => "/order/worst-selling",
      providesTags: ["Products"],
    }),
  }),
});

export const { useGetDashboardDataQuery, useGetBestSellingProductsQuery, useGetWorstSellingProductsQuery } = dashboardApi;
export default dashboardApi;