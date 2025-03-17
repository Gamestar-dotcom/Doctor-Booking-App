import React from "react";
import { logout } from "../../redux/slice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      dispatch(logout());
      toast.success("Logged Out Successfully");
      navigate("/");
    } catch (error) {
      toast.error("Failed to Logout");
      console.error(error);
    }
  };

  return (
    <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">
        Medi<span className="text-blue-600">Connect</span>
      </Link>

      {isAuthenticated ? (
        <div className="flex items-center gap-6">
          <Link
            to="/doctors"
            className="text-gray-700 hover:text-blue-600 transition duration-300"
          >
            Book
          </Link>

          {/* Conditionally render profile link or user's name */}
          {user?.role === "doctor" ? (
            <Link
              to="/doctor/profile/update"
              className="text-gray-700 hover:text-blue-600 transition duration-300"
            >
              Profile
            </Link>
          ) : (
            <span className="text-gray-700">{user?.name}</span>
          )}

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition duration-300"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="text-gray-700 hover:text-blue-600 transition duration-300"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-300"
          >
            Signup
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
