import { apiSlice } from "./apiSlice";
import { payments_url } from "../constants";

// Configure RTK Query
export const paymentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    initiatePayment: builder.mutation({
      query: (paymentData) => ({
        url: `${payments_url}/stkpush`,
        method: "POST",
        body: paymentData,
      }),
      invalidatesTags: ["Payments"],
    }),

    getPaymentStatus: builder.query({
      query: (checkoutRequestId) => {
        if (!checkoutRequestId) {
          return ""; // Prevents undefined errors
        }
        return `${payments_url}/payment-status/${checkoutRequestId}`;
      },
      providesTags: (result, error, checkoutRequestId) => [
        { type: "Payments", id: checkoutRequestId },
      ],
      pollingInterval: 5000, // ✅ Poll every 5 seconds
    }),

    getUserPayments: builder.query({
      query: () => `${payments_url}/payments`, // ✅ Uses authentication token
      providesTags: ["Payments"],
    }),
  }),
});

export const {
  useInitiatePaymentMutation,
  useGetPaymentStatusQuery,
  useGetUserPaymentsQuery,
} = paymentApi;
