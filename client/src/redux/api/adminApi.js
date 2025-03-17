import { admin_url } from "../constants";
import { apiSlice } from "./apiSlice";

// Configure RTK Query for the admin API

export const adminApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => `${admin_url}/users`,
    }),
    getAllAppointments: builder.query({
      query: () => `${admin_url}/get-all-appointments`,
    }),
    updateUser: builder.mutation({
      query: ({ userId, updates }) => ({
        url: `${admin_url}/users/${userId}`,
        method: "PUt",
        body: updates,
      }),
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `${admin_url}/users/${userId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetAllAppointmentsQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = adminApi;
