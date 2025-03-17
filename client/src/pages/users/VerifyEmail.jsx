import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const EmailVerification = () => {
  const { token } = useParams();
  const [verificationStatus, setVerificationStatus] = useState("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        setVerificationStatus("loading");
        setMessage("Verifying your email address...");

        const response = await axios.get(`/api/auth/verify-email/${token}`);

        setVerificationStatus("success");
        setMessage(response.data.message || "Email verified successfully!");
      } catch (error) {
        setVerificationStatus("error");

        if (error.response) {
          // Server responded with error
          const statusCode = error.response.status;

          if (statusCode === 404) {
            setMessage(
              "Invalid verification link. Please request a new verification email."
            );
          } else if (statusCode === 410) {
            setMessage(
              "This verification link has expired. Please request a new verification email."
            );
          } else {
            setMessage(
              error.response.data.message ||
                "Verification failed. Please try again."
            );
          }
        } else {
          // Network error or other issue
          setMessage(
            "Unable to connect to the server. Please check your internet connection and try again."
          );
        }
      }
    };

    if (token) {
      verifyEmail();
    } else {
      setVerificationStatus("error");
      setMessage("Invalid verification link. No token provided.");
    }
  }, [token]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4 py-12">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Email Verification
        </h2>

        {verificationStatus === "loading" && (
          <div className="flex flex-col items-center my-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-gray-600 text-center">{message}</p>
          </div>
        )}

        {verificationStatus === "success" && (
          <div className="flex flex-col items-center my-8">
            <div className="bg-green-500 text-white rounded-full p-3 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <p className="text-gray-700 text-center mb-6">{message}</p>
            <div className="mt-4">
              <Link
                to="/login"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
              >
                Log In
              </Link>
            </div>
          </div>
        )}

        {verificationStatus === "error" && (
          <div className="flex flex-col items-center my-8">
            <div className="bg-red-500 text-white rounded-full p-3 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
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
            </div>
            <p className="text-gray-700 text-center mb-6">{message}</p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 mt-4">
              <Link
                to="/resend-verification"
                className="inline-flex items-center justify-center px-4 py-2 bg-yellow-600 text-white font-medium rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition duration-150 ease-in-out"
              >
                Resend Verification
              </Link>
              <Link
                to="/support"
                className="inline-flex items-center justify-center px-4 py-2 bg-gray-600 text-white font-medium rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150 ease-in-out"
              >
                Contact Support
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailVerification;
