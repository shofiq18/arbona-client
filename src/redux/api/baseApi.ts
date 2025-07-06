// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import Cookies from "js-cookie";

// export const baseApi = createApi({
//   baseQuery: fetchBaseQuery({
//     baseUrl: `${process.env.NEXT_PUBLIC_URL}`,
//     credentials: "include",
//     prepareHeaders: (headers) => {
//       const token = Cookies?.get("token");
//       if (token) {
//         headers.set("Authorization", `${token}`);
//       }
//       return headers;
//     },
//   }),
//   endpoints: () => ({}),
//   tagTypes: [
//     "Admin",
//     "Dashboard",
//     "Orders",
//     "Customers",
//     "Categories",
//     "Inventory",
//     "Containers",
//   ],
// });

// // Export hooks for usage in functional components
// export default baseApi;


import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const baseApi = createApi({
  reducerPath: "baseApi", // Define a base reducerPath
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_URL}`,
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = Cookies?.get("token");
      if (token) {
        headers.set("Authorization", `${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: [
    "Dashboard",
    "Orders",
    "Customers",
    "Categories",
    "Inventory",
    "Containers",
  ],
});

// Export hooks for usage in functional components
export default baseApi;