import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearError, setError } from "../../redux/slice/authSlice";
import { useLoginMutation } from "../../redux/api/authAPi";
import { toast } from "react-toastify";
import { setUser, setLoading } from "../../redux/slice/authSlice";
import { setCurrentDoctor } from "../../redux/slice/doctorSlice";
import { useGetDoctorByIdQuery } from "../../redux/api/doctorApi";

const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [login, { isLoading }] = useLoginMutation();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [role, setRole] = useState("doctor");

  const { data: doctorData, error: doctorError } = useGetDoctorByIdQuery(
    user?.doctorId,
    { skip: !user?.doctorId }
  );

  // console.log("DOctor profile:", doctorData);
  // Effect to update doctor profile in Redux
  useEffect(() => {
    if (doctorData) {
      dispatch(setCurrentDoctor(doctorData));
    }
    if (doctorError) {
      console.error("Failed to load doctor profile:", doctorError);
      dispatch(setError("Logged in, but failed to load doctor profile"));
    }
  }, [doctorData, doctorError, dispatch]);

  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else if (user.role === "doctor" && user.doctorId) {
        navigate(`/doctor/dashboard/${user.doctorId}`);
      } else {
        navigate("/");
      }
    }

    dispatch(clearError());
  }, [user, navigate, dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      dispatch(setError("All fields are required."));
      return;
    }

    try {
      dispatch(setLoading(true));
      dispatch(clearError());

      // Perform login API call
      const result = await login({ email, password }).unwrap();
      console.log("Login response:", result);

      if (!result?.user) {
        throw new Error("User data is missing in response.");
      }

      const updatedUser = {
        ...result.user,
        doctorId: result.user?.doctor?.id ?? null, // Extract from doctor object
        doctor: result.user?.doctor ?? null, // Store doctor object if available
      };

      console.log("Updated user before setting Redux:", updatedUser);

      // ✅ Fix: Remove unnecessary `{ user: updatedUser }` wrapper
      dispatch(setUser(updatedUser));

      // Save to localStorage
      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      // Redirect based on role
      navigate(getRedirectPath(result.user.role, updatedUser.doctorId), {
        replace: true,
      });

      toast.success("Logged in successfully!");
    } catch (error) {
      console.error("Login error:", error);
      dispatch(
        setError(error.data?.message || "Login failed. Please try again.")
      );
      toast.error(error.data?.message || "Login failed. Please try again.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const getRedirectPath = (role, doctorId) => {
    switch (role) {
      case "admin":
        return "/admin/dashboard";
      case "doctor":
        return doctorId
          ? `/doctor/dashboard/${doctorId}`
          : "/doctor/profile/update";
      default:
        return "/dashboard";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Sign in to MediConnect
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{" "}
          <Link
            to="/register"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* Role Toggle */}
          <div className="flex border border-gray-300 rounded-md mb-6 overflow-hidden">
            <button
              type="button"
              onClick={() => setRole("doctor")}
              className={`flex-1 py-3 px-4 font-medium focus:outline-none transition-colors ${
                role === "doctor"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Log in as Doctor
            </button>
            <button
              type="button"
              onClick={() => setRole("admin")}
              className={`flex-1 py-3 px-4 font-medium focus:outline-none transition-colors ${
                role === "admin"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Log in as Admin
            </button>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400"
              >
                {isLoading ? "Signing in..." : `Sign in as ${role}`}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
