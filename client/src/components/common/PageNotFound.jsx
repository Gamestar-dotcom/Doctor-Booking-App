import React from "react";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-900 flex flex-col items-center justify-center text-white p-6">
      <div className="text-center">
        {/* 404 Text */}
        <h1 className="text-9xl font-bold text-white mb-4 animate-bounce">
          404
        </h1>
        {/* Page Not Found Message */}
        <h2 className="text-4xl font-semibold mb-4">Oops! Page Not Found</h2>
        <p className="text-lg mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        {/* Back to Home Button */}
        <button
          onClick={() => navigate("/")}
          className="bg-white text-purple-600 font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-purple-50 transition-all duration-300 transform hover:scale-105"
        >
          Go Back Home
        </button>
      </div>
      {/* Illustration */}
      <div className="mt-12">
        <svg
          className="w-64 h-64 text-white opacity-75"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default PageNotFound;
