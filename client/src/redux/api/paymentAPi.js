// import { apiSlice } from "./apiSlice";
// import { payments_url } from "../constants";

// // Configure RTK Query

// export const paymentApi = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     createPaymentIntent: builder.mutation({
//       query: (appointmentId) => ({
//         url: `${payments_url}/create-payment-intent`,
//         method: "POST",
//         body: { appointmentId },
//       }),
//     }),
//   }),
// });

// export const { useCreatePaymentIntentMutation } = paymentApi;
