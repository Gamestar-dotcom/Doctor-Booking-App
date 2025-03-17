import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className=" border-t border-gray-200 py-8 w-full mt-auto">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col items-center">
          <div className="mb-4">
            <Link to="/" className="text-xl font-bold">
              Medi<span className="text-blue-600">Connect</span>
            </Link>
          </div>

          <div className="flex gap-6 mb-6">
            <Link
              to="/about"
              className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
            >
              Contact
            </Link>
            <Link
              to="/privacy"
              className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
            >
              Terms of Service
            </Link>
          </div>

          <div className="text-center">
            <p className="text-gray-600">
              &copy; 2023 MediConnect. All rights reserved.
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Providing quality healthcare solutions for a healthier tomorrow
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
