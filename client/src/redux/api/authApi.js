import { apiSlice } from "./apiSlice";
import { users_url } from "../constants";

// Configure RTK Query for the auth API

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userData) => ({
        url: `${users_url}/register`,
        method: "POST",
        body: userData,
      }),
    }),
    login: builder.mutation({
      query: (userData) => ({
        url: `${users_url}/login`,
        method: "POST",
        body: userData,
      }),
    }),
    // getUser By id
    getUser: builder.query({
      query: () => "/",
    }),
    // logout
    logout: builder.mutation({
      query: () => ({
        url: `${users_url}/logout`,
        method: "POST",
      }),
    }),
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: `${users_url}/forgot-password`,
        method: "POST",
        body: { email },
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ token, password }) => ({
        url: `${users_url}/reset-password/${token}`,
        method: "POST",
        body: { token, password },
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetUserQuery,
  useLogoutMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
export default authApi;
