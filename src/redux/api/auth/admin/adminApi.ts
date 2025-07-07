import baseApi from "../../baseApi";

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponseData {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
  };
}

interface AdminProfile {
  id: number;
  email: string;
  role: string;
}

const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponseData, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      // Remove jwtDecode from onQueryStarted to avoid the error
      // Role check will be handled in the component
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
export default adminApi;