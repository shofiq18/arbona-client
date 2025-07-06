import baseApi from "../baseApi";


interface DashboardData {
  totalOrders: number;
  totalCustomers: number;
  totalRevenue: number;
}

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardData: builder.query<DashboardData, void>({
      query: () => "/dashboard",
      providesTags: ["Dashboard"],
    }),
  }),
});

export const { useGetDashboardDataQuery } = dashboardApi;
export default dashboardApi