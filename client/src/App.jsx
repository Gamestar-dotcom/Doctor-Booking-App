import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "./components/common/Spinner"; // Import Spinner

// Lazy load components
const Login = lazy(() => import("./components/auth/Login"));
const Register = lazy(() => import("./components/auth/Register"));
const Home = lazy(() => import("./components/auth/Home"));
const DoctorsList = lazy(() => import("./pages/doctors/doctorsList"));
const DoctorDetails = lazy(() => import("./pages/doctors/doctorDetails"));
const UpdateDoctorProfile = lazy(() =>
  import("./pages/doctors/UpdateDoctorProfile")
);
const DoctorDashboard = lazy(() => import("./pages/doctors/doctorDashBoard"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const BookingAppointment = lazy(() =>
  import("./pages/appointments/BookAppointment")
);
const MyAppointments = lazy(() =>
  import("./pages/appointments/MyAppointments")
);
const ForgotPassword = lazy(() => import("./pages/users/forgotPassword"));
const ResetPassword = lazy(() => import("./pages/users/ResetPassword"));
const EmailVerification = lazy(() => import("./pages/users/VerifyEmail"));
const VerificationPending = lazy(() =>
  import("./components/auth/VerificationLanding")
);
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));

function App() {
  return (
    <Router>
      <div className="App">
        <ToastContainer />

        <main className="container mx-auto py-4 px-4">
          <Suspense fallback={<Spinner />}>
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

              {/* Doctor Routes */}
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

              {/* Admin Routes */}
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
          </Suspense>
        </main>
      </div>
    </Router>
  );
}

export default App;
