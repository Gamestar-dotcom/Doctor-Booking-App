// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import {
//   Elements,
//   CardElement,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import { toast } from "react-toastify";
// import { useCreatePaymentIntentMutation } from "../../redux/api/paymentAPi";
// import dotenv from "dotenv";

// dotenv.config();

// const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

// const PaymentForm = ({ appointment }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [isProcessing, setIsProcessing] = useState(false);

//   // Handle payment submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!stripe || !elements) {
//       return;
//     }

//     setIsProcessing(true);

//     try {
//       // Confirm the payment with Stripe
//       const { error, paymentIntent } = await stripe.confirmCardPayment(
//         appointment.clientSecret,
//         {
//           payment_method: {
//             card: elements.getElement(CardElement),
//           },
//         }
//       );

//       if (error) {
//         toast.error(`Payment failed: ${error.message}`);
//         setIsProcessing(false);
//       } else if (paymentIntent.status === "succeeded") {
//         toast.success("Payment successful!");
//         // Redirect or update the UI as needed
//       }
//     } catch (err) {
//       console.error("Error processing payment:", err);
//       toast.error("Failed to process payment. Please try again.");
//       setIsProcessing(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div>
//         <label className="block text-gray-700 font-bold mb-2">
//           Card Details
//         </label>
//         <CardElement className="border border-gray-300 p-2 rounded-md" />
//       </div>

//       <button
//         type="submit"
//         className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none"
//         disabled={isProcessing}
//       >
//         {isProcessing ? "Processing..." : "Pay Now"}
//       </button>
//     </form>
//   );
// };

// const PaymentComponent = () => {
//   const { id: appointmentId } = useParams(); // Extract the appointment ID from the URL
//   const [createPaymentIntent, { data, isLoading, error }] =
//     useCreatePaymentIntentMutation();
//   const [clientSecret, setClientSecret] = useState(null);

//   // Fetch the payment intent when the component mounts
//   useEffect(() => {
//     const fetchPaymentIntent = async () => {
//       try {
//         const response = await createPaymentIntent(appointmentId).unwrap();
//         setClientSecret(response.clientSecret);
//       } catch (err) {
//         console.error("Error creating payment intent:", err);
//         toast.error("Failed to initialize payment. Please try again.");
//       }
//     };

//     fetchPaymentIntent();
//   }, [appointmentId, createPaymentIntent]);

//   if (isLoading) {
//     return <div className="text-center py-6">Loading payment details...</div>;
//   }

//   if (error) {
//     return (
//       <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded my-4">
//         Failed to load payment details. Please try again later.
//       </div>
//     );
//   }

//   if (!clientSecret) {
//     return <div className="text-center py-6">Payment details not found.</div>;
//   }

//   return (
//     <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-md shadow-md">
//       <h2 className="text-2xl font-semibold mb-6 text-center">
//         Payment for Appointment
//       </h2>

//       <div className="mb-4">
//         <p className="font-semibold">Doctor:</p>
//         <p>{appointment.doctorName}</p>
//       </div>

//       <div className="mb-4">
//         <p className="font-semibold">Fee:</p>
//         <p>${appointment.fee}</p>
//       </div>

//       <Elements stripe={stripePromise} options={{ clientSecret }}>
//         <PaymentForm appointment={{ clientSecret }} />
//       </Elements>
//     </div>
//   );
// };

// export default PaymentComponent;
