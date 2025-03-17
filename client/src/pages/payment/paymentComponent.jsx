// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import { useCreatePaymentIntentMutation } from "../../redux/api/paymentAPi";
// import {
//   clearPaymentState,
//   setPaymentSuccess,
// } from "../../redux/slice/paymentSlice";

// const stripePromise = loadStripe(
//   "pk_test_51QtgbLRwFmvo8uEeL4uRd9rHj1tExuJwx0A6VO6bI075tMxtQroC7nVYUPSsOrhQNGwunrQbYrf5wX1sXJfaeO2f00CNHiAfQr"
// );

// const PaymentForm = ({ amount }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [isProcessing, setIsProcessing] = useState(false);
//   const dispatch = useDispatch();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!stripe || !elements) {
//       return;
//     }

//     setIsProcessing(true);

//     try {
//       const { error, paymentIntent } = await stripe.confirmCardPayment(
//         amount.clientSecret,
//         {
//           payment_method: {
//             card: elements.getElement(CardElement),
//           },
//         }
//       );

//       if (error) {
//         toast.error(`Payment failed: ${error.message}`);
//       } else if (paymentIntent.status === "succeeded") {
//         toast.success("Payment successful!");
//         dispatch(setPaymentSuccess());
//       }
//     } catch (err) {
//       console.error("Error processing payment:", err);
//       toast.error("Failed to process payment. Please try again.");
//     } finally {
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
//   const { id: appointmentId } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [createPaymentIntent, { isLoading, error }] =
//     useCreatePaymentIntentMutation();
//   const { clientSecret, success } = useSelector((state) => state.payments);

//   useEffect(() => {
//     const fetchPaymentIntent = async () => {
//       try {
//         const response = await createPaymentIntent(appointmentId).unwrap();
//         dispatch({
//           type: "payments/setClientSecretAndAmount",
//           payload: {
//             clientSecret: response.clientSecret,
//             amount: response.amount,
//           },
//         });
//       } catch (err) {
//         console.error("Error creating payment intent:", err);
//         toast.error("Failed to initialize payment. Please try again.");
//       }
//     };

//     fetchPaymentIntent();
//   }, [appointmentId, createPaymentIntent, dispatch]);

//   useEffect(() => {
//     return () => {
//       dispatch(clearPaymentState());
//     };
//   }, [dispatch]);

//   useEffect(() => {
//     if (success) {
//       navigate("/appointments");
//     }
//   }, [success, navigate]);

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
//         <p className="font-semibold">Fee:</p>
//         <p>${amount}</p>
//       </div>

//       <Elements stripe={stripePromise} options={{ clientSecret }}>
//         <PaymentForm amount={{ clientSecret }} />
//       </Elements>
//     </div>
//   );
// };

// export default PaymentComponent;
