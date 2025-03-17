import { apiSlice } from "./apiSlice";
import { appointment_url } from "../constants";

const appointmentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAppointments: builder.query({
      query: () => `${appointment_url}`,
    }),
    createAppointment: builder.mutation({
      query: (appointmentData) => ({
        url: `${appointment_url}`,
        method: "POST",
        body: appointmentData,
      }),
    }),
    updateAppointmentStatus: builder.mutation({
      query: ({ appointmentId, status }) => ({
        url: `${appointment_url}/${appointmentId}`,
        method: "PATCH",
        body: { status },
      }),
    }),
    deleteAppointment: builder.mutation({
      query: (id) => ({
        url: `${appointment_url}/${id}`,
        method: "DELETE",
      }),
    }),
    cancelAppointment: builder.mutation({
      query: (id) => ({
        url: `${appointment_url}/${id}`,
        method: "PUT",
        body: { status: "canceled" },
      }),
    }),
  }),
});

export const {
  useGetAppointmentsQuery,
  useCancelAppointmentMutation,
  useDeleteAppointmentMutation,
  useUpdateAppointmentStatusMutation,
  useCreateAppointmentMutation,
} = appointmentApi;
