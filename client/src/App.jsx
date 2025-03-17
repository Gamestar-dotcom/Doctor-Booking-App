import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Auth Components
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Home from "./components/auth/Home";

// Doctor Components
import DoctorsList from "./pages/doctors/doctorsList";
import DoctorDetails from "./pages/doctors/doctorDetails";
import UpdateDoctorProfile from "./pages/doctors/UpdateDoctorProfile";
import DoctorDashboard from "./pages/doctors/doctorDashBoard"; // Doctor dashboard

// Admin Components
import AdminDashboard from "./pages/admin/AdminDashboard"; // Admin dashboard

// Appointment Components
import BookingAppointment from "./pages/appointments/BookAppointment";
import MyAppointments from "./pages/appointments/MyAppointments";

// Payment Components
// import PaymentComponent from "./pages/payment/paymentComponent";

// Header and footer
import Header from "./components/HeaderFooter/Header";
import Footer from "./components/HeaderFooter/Footer";
import AdminLogin from "./pages/admin/AdminLogin";
import Profile from "./pages/users/Profile";
import ForgotPassword from "./pages/users/forgotPassword";
import ResetPassword from "./pages/users/ResetPassword";
import VerificationPending from "./components/auth/VerificationLanding";
import EmailVerification from "./pages/users/VerifyEmail";

// Route protection components
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

// Doctor-only route
const DoctorRoute = ({ children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated || user?.role !== "doctor") {
    return <Navigate to="/" />;
  }

  return children;
};

// Patient-only route
const PatientRoute = ({ children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated || user?.role !== "patient") {
    return <Navigate to="/" />;
  }

  return children;
};

// Admin-only route
const AdminRoute = ({ children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // if (!isAuthenticated || user?.role !== "admin") {
  //   return <Navigate to="/" />;
  // }

  return children;
};

function App() {
  return (
    <Router>
      <div className="App">
        {/* Toast notifications */}
        <ToastContainer />

        {/* Main content */}
        <main className="container mx-auto py-4 px-4">
          <Header />
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
            <Route path="/doctors" element={<DoctorsList />} />
            <Route path="/doctors/:id" element={<DoctorDetails />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route
              path="/verify-email/:token"
              element={<EmailVerification />}
            />
            <Route
              path="/verification-pending"
              element={<VerificationPending />}
            />

            {/* Protected Routes */}
            <Route
              path="/book/:doctorId"
              element={
                <PatientRoute>
                  <BookingAppointment />
                </PatientRoute>
              }
            />
            <Route path="/profile" element={<UpdateDoctorProfile />} />

            <Route
              path="/appointments"
              element={
                <PrivateRoute>
                  <MyAppointments />
                </PrivateRoute>
              }
            />

            {/* <Route
              path="/payment/:appointmentId"
              element={
                <PatientRoute>
                  <PaymentComponent />
                </PatientRoute>
              }
            /> */}

            {/* Doctor-Specific Routes */}
            <Route
              path="/doctor/profile/update"
              element={
                <DoctorRoute>
                  <UpdateDoctorProfile />
                </DoctorRoute>
              }
            />

            <Route
              path="/doctor/dashboard/:id"
              element={
                <DoctorRoute>
                  <DoctorDashboard />
                </DoctorRoute>
              }
            />

            {/* Admin-Specific Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
            <Route path="/admin/login" element={<AdminLogin />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
