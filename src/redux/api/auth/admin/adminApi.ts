import baseApi from "../../baseApi";


interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  role: string;
}

interface AdminProfile {
  id: number;
  email: string;
  role: string;
}

const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        const { data } = await queryFulfilled;
        if (data.role !== "admin") {
          throw new Error("Unauthorized: Admin role required");
        }
      },
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Admin"],
    }),
    getAdminProfile: builder.query<AdminProfile, void>({
      query: () => "/admin/profile",
      providesTags: ["Admin"],
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useGetAdminProfileQuery } = adminApi;
export default adminApi; // Add this line to export adminApi