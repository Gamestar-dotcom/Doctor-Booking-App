import React, { Suspense, lazy } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "./components/common/Spinner"; // Import Spinner
import Footer from "./components/HeaderFooter/Footer";
import Header from "./components/HeaderFooter/Header";
import PageNotFound from "./components/common/PageNotFound";
import PaymentHistoryPage from "./components/common/PaymentHistory";

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

        <main className="container mx-auto py-4 px-2">
          <Header />
          <Suspense fallback={<Spinner />}>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<Home />} />
              {/* page not found */}
              <Route path="*" element={<PageNotFound />} />

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
              <Route path="/book/:doctorId" element={<BookingAppointment />} />
              <Route path="/profile" element={<UpdateDoctorProfile />} />
              <Route path="/appointments" element={<MyAppointments />} />
              <Route path="/payments" element={<PaymentHistoryPage />} />

              {/* Doctor Routes */}
              <Route
                path="/doctor/profile/update"
                element={<UpdateDoctorProfile />}
              />
              <Route
                path="/doctor/dashboard/:id"
                element={<DoctorDashboard />}
              />

              {/* Admin Routes */}
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/login" element={<AdminLogin />} />
            </Routes>
          </Suspense>
          <Footer />
        </main>
      </div>
    </Router>
  );
}

export default App;
