import React, { useState, useEffect } from "react";
import {
  useInitiatePaymentMutation,
  useGetPaymentStatusQuery,
} from "../../redux/api/paymentApi";
import { toast } from "react-toastify";

const MpesaPaymentModal = ({
  isOpen,
  onClose,
  appointmentDetails,
  onSubmit,
}) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState(appointmentDetails?.fee || "");
  const [error, setError] = useState("");
  const [checkoutRequestId, setCheckoutRequestId] = useState(null);
  const [paymentStep, setPaymentStep] = useState("initiate"); // initiate, pending, completed, failed

  const [initiatePayment, { isLoading: isPaymentLoading }] =
    useInitiatePaymentMutation();

  // ✅ Fetch payment status only when checkoutRequestId is available
  const { data: paymentStatus } = useGetPaymentStatusQuery(checkoutRequestId, {
    skip: !checkoutRequestId,
    pollingInterval: 5000, // Check every 5 seconds
  });

  // ✅ Watch for payment status updates
  useEffect(() => {
    if (paymentStatus) {
      if (paymentStatus.status === "Completed") {
        setPaymentStep("completed");
        toast.success("Payment completed successfully!");
        setTimeout(() => {
          onSubmit();
          onClose();
        }, 2000);
      } else if (paymentStatus.status === "Failed") {
        setPaymentStep("failed");
        setError(
          paymentStatus.paymentRequest?.failure_reason ||
            "Payment failed. Please try again."
        );
      }
    }
  }, [paymentStatus, onSubmit, onClose]);

  // ✅ Handle Payment Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // ✅ Validate phone number
    if (!phoneNumber || phoneNumber.length < 10) {
      setError("Please enter a valid phone number");
      return;
    }

    // ✅ Format phone number correctly
    let formattedPhone = phoneNumber;
    if (!phoneNumber.startsWith("254") && phoneNumber.startsWith("0")) {
      formattedPhone = "254" + phoneNumber.substring(1);
    } else if (!phoneNumber.startsWith("254")) {
      formattedPhone = "254" + phoneNumber;
    }

    try {
      // ✅ Initiate payment with M-Pesa
      const result = await initiatePayment({
        phoneNumber: formattedPhone,
        amount,
      }).unwrap();

      // ✅ Store CheckoutRequestID
      if (result.CheckoutRequestID) {
        setCheckoutRequestId(result.CheckoutRequestID);
        setPaymentStep("pending");
        toast.info("Payment initiated. Please check your phone.");
      } else {
        throw new Error("Invalid response from server.");
      }
    } catch (err) {
      setError(
        err.data?.message || "Payment initiation failed. Please try again."
      );
      toast.error(error || "Payment initiation failed");
    }
  };

  // ✅ Handle Payment Retry
  const handleTryAgain = () => {
    setPaymentStep("initiate");
    setCheckoutRequestId(null);
    setError("");
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            M-Pesa Payment
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* M-Pesa Logo and Instructions */}
        <div className="mb-6 text-center">
          <div className="flex justify-center mb-4">
            <svg
              className="h-12 w-auto text-green-600"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7v-2z" />
            </svg>
          </div>

          {paymentStep === "initiate" && (
            <>
              <p className="text-sm text-gray-600 mb-2">
                You will receive an M-Pesa STK push notification on your phone.
              </p>
              <p className="text-sm text-gray-600">
                Please enter your PIN when prompted to complete the payment.
              </p>
            </>
          )}

          {paymentStep === "pending" && (
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <svg
                  className="animate-spin h-10 w-10 text-green-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
              <p className="font-medium text-gray-800 mb-2">
                Waiting for payment confirmation
              </p>
              <p className="text-sm text-gray-600">
                Please check your phone and enter your M-Pesa PIN to complete
                the payment
              </p>
            </div>
          )}

          {paymentStep === "completed" && (
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <svg
                  className="h-12 w-12 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <p className="font-medium text-green-600 mb-2">
                Payment Successful!
              </p>
              <p className="text-sm text-gray-600">
                Your payment has been processed successfully.
              </p>
            </div>
          )}

          {paymentStep === "failed" && (
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <svg
                  className="h-12 w-12 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </div>
              <p className="font-medium text-red-600 mb-2">Payment Failed</p>
              <p className="text-sm text-gray-600">
                We couldn't process your payment. Please try again.
              </p>
            </div>
          )}
        </div>

        {error && (
          <div className="mb-4 p-2 bg-red-50 border border-red-100 text-red-700 text-sm rounded">
            {error}
          </div>
        )}

        {paymentStep === "initiate" && (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="e.g. 0712345678"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
              <p className="mt-1 text-xs text-gray-500">
                Enter the phone number registered with M-Pesa
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amount (KES)
              </label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                value={amount}
                readOnly
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
                disabled={isPaymentLoading}
              >
                {isPaymentLoading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Pay Now"
                )}
              </button>
            </div>
          </form>
        )}

        {paymentStep === "pending" && (
          <div className="flex justify-center mt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Check Later
            </button>
          </div>
        )}

        {paymentStep === "failed" && (
          <div className="flex justify-center space-x-3 mt-4">
            <button
              onClick={handleTryAgain}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Try Again
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MpesaPaymentModal;
