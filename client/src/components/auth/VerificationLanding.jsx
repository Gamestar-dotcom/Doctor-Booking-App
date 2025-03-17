import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const VerificationPending = () => {
  const [userEmail, setUserEmail] = useState("");
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    // Retrieve user from localStorage
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserEmail(parsedUser.email || "your email"); // Fallback if email is not available
    }
  }, []);

  const handleResendVerification = async () => {
    if (!userEmail) return;

    setIsResendDisabled(true);
    setCountdown(30); // Reset countdown timer

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/resend-verification",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: userEmail }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Verification email resent successfully!");
      } else {
        toast.error(data.message || "Failed to resend verification email.");
      }
    } catch (error) {
      console.error("Error resending verification email:", error);
      alert("An error occurred while resending the verification email.");
    }

    // Start countdown for button re-enable
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsResendDisabled(false);
          return 30;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4">Email Verification Required</h1>

        <div className="text-center mb-6">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
            <svg
              className="h-6 w-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              ></path>
            </svg>
          </div>
        </div>

        <p className="mb-4">
          We've sent a verification link to <strong>{userEmail}</strong>
        </p>
        <p className="mb-6 text-gray-600">
          Please check your inbox and click the verification link to complete
          your registration.
        </p>

        <div className="mb-4">
          <p className="text-sm text-gray-500">Didn't receive an email?</p>
          <button
            className="text-sm text-blue-600 hover:underline disabled:opacity-50"
            disabled={isResendDisabled}
            onClick={handleResendVerification}
          >
            {isResendDisabled
              ? `Resend in ${countdown}s`
              : "Resend Verification"}
          </button>
        </div>

        <Link
          to="/login"
          className="inline-block mt-4 text-gray-500 hover:text-gray-700"
        >
          Return to Login
        </Link>
      </div>
    </div>
  );
};

export default VerificationPending;
