// import baseApi from "../baseApi";

// interface DashboardData {
//   totalOrders: number;
//   totalCustomers: number;
//   totalRevenue: number;
// }

// interface ProductData {
//   _id: string;
//   totalQuantity: number;
//   numberOfOrders: number;
//   orderScore: number;
//   revenuePercentage: number;
//   name: string;
//   itemNumber: string | null;
// }

// interface ProductResponse {
//   success: boolean;
//   message: string;
//   data: ProductData[];
// }

// const dashboardApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     getDashboardData: builder.query<DashboardData, void>({
//       query: () => "/dashboard",
//       providesTags: ["Dashboard"],
//     }),
//     getBestSellingProducts: builder.query<ProductResponse, void>({
//       query: () => "/order/best-selling",
//       providesTags: ["Products"],
//     }),
//     getWorstSellingProducts: builder.query<ProductResponse, void>({
//       query: () => "/order/worst-selling",
//       providesTags: ["Products"],
//     }),
//   }),
// });

// export const { useGetDashboardDataQuery, useGetBestSellingProductsQuery, useGetWorstSellingProductsQuery } = dashboardApi;
// export default dashboardApi;



import baseApi from "../baseApi";

interface DashboardData {
  totalOrders: number;
  totalCustomers: number;
  totalRevenue: number;
}

interface OrderData {
  _id: string;
  date: string;
  invoiceNumber: string;
  PONumber: string;
  storeId: string;
  paymentDueDate: string;
  orderAmount: number;
  orderStatus: string;
  isDeleted: boolean;
  paymentAmountReceived: number;
  discountGiven: number;
  openBalance: number;
  profitAmount: number;
  profitPercentage: number;
  paymentStatus: string;
  products: {
    productId: any;
    quantity: number;
    discount: number;
    _id: string;
  }[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface SalesOverviewResponse {
  success: boolean;
  message: string;
  data: OrderData[];
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
    getSalesOverviewData: builder.query<SalesOverviewResponse, void>({
      query: () => "/order",
      providesTags: ["SalesOverview"],
    }),
  }),
});

export const {
  useGetDashboardDataQuery,
  useGetBestSellingProductsQuery,
  useGetWorstSellingProductsQuery,
  useGetSalesOverviewDataQuery,
} = dashboardApi;
export default dashboardApi;
