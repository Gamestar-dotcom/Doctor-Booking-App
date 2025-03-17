import { doctors_url } from "../constants";
import { apiSlice } from "./apiSlice";

// Configure RTK Query

export const doctorApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDoctors: builder.query({
      query: () => `${doctors_url}`,
    }),
    getDoctorById: builder.query({
      query: (id) => `${doctors_url}/${id}`,
    }),
    getDoctorAppointments: builder.query({
      query: (id) => `${doctors_url}/get-doctor-appointments/${id}`,
    }),
    // Create doctor profile
    createDoctorProfile: builder.mutation({
      query: (profileData) => ({
        url: `${doctors_url}`,
        method: "POST",
        body: profileData,
      }),
    }),
    updateDoctorProfile: builder.mutation({
      query: (doctorData) => ({
        url: `${doctors_url}`,
        method: "PUT",
        body: doctorData,
      }),
    }),
    deleteDoctor: builder.mutation({
      query: (id) => ({
        url: `${doctors_url}/${id}`,
        method: "DELETE",
      }),
    }),
    // Search doctors by specialty
    searchDoctorsBySpeciality: builder.query({
      query: (speciality) => `${doctors_url}/search?speciality=${speciality}`,
    }),
    // Update doctor availability
    updateDoctorAvailability: builder.mutation({
      query: (availabilityData) => ({
        url: `${doctors_url}/availability`,
        method: "PATCH",
        body: { availabilityData },
      }),
    }),
  }),
  invalidatesTags: ["Doctors"],
});

// Export the injected slice for use with Redux Toolkit:

export const {
  useGetDoctorsQuery,
  useGetDoctorByIdQuery,
  useGetDoctorAppointmentsQuery,
  useCreateDoctorProfileMutation,
  useUpdateDoctorProfileMutation,
  useDeleteDoctorMutation,
  useSearchDoctorsBySpecialityQuery,
  useUpdateDoctorAvailabilityMutation,
} = doctorApi;
