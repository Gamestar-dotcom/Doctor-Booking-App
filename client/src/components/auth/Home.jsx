import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetDoctorsQuery } from "../../redux/api/doctorApi";

const Home = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { data: doctors, isLoading, error } = useGetDoctorsQuery();

  // console.log(user);

  // Take only the first 4 doctors for featured section
  const featuredDoctors = doctors?.slice(0, 4);

  // Determine user role for dynamic content rendering
  const userRole = user?.role || "guest";

  // Role-specific welcome messages and CTAs
  const roleContent = {
    admin: {
      welcomeTitle: "Welcome, Administrator",
      welcomeMessage:
        "Manage your healthcare platform with ease. Access all system controls from your dashboard.",
      primaryCTA: {
        text: "Admin Dashboard",
        link: "/admin/dashboard",
      },
      secondaryCTA: {
        text: "View All Doctors",
        link: "/admin/doctors",
      },
    },
    doctor: {
      welcomeTitle: "Welcome, Doctor",
      welcomeMessage:
        "Your patients are waiting. Check your schedule and manage appointments with ease.",
      primaryCTA: {
        text: "Your Dashboard",
        link: `/doctor/dashboard/${user?.doctorId}`,
      },
      secondaryCTA: {
        text: "Check Appointments",
        link: "/appointments",
      },
    },
    patient: {
      welcomeTitle: "Your Health, Our Priority",
      welcomeMessage:
        "Connect with top specialists and take control of your health journey.",
      primaryCTA: {
        text: "Your Appointments",
        link: "/appointments",
      },
      secondaryCTA: {
        text: "Book Appointment",
        link: "/doctors",
      },
    },
    guest: {
      welcomeTitle: "Your Health, Our Priority",
      welcomeMessage:
        "MediConnect helps you access quality healthcare with a simple booking system that connects you with qualified doctors across specialties.",
      primaryCTA: {
        text: "Login",
        link: "/login",
      },
      secondaryCTA: {
        text: "Register Now",
        link: "/register",
      },
    },
  };

  // Get the appropriate content based on role
  const currentRoleContent =
    roleContent[userRole === "user" ? "patient" : userRole];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section with Background - Dynamically adjusts based on role */}
      <section
        className={`bg-gradient-to-r ${
          userRole === "admin"
            ? "from-indigo-600 to-purple-700"
            : userRole === "doctor"
            ? "from-green-600 to-blue-700"
            : "from-blue-600 to-indigo-700"
        } text-white`}
      >
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6">
            {currentRoleContent.welcomeTitle}
          </h1>
          <p className="text-xl md:text-2xl text-center max-w-3xl mb-8 text-blue-100">
            {currentRoleContent.welcomeMessage}
          </p>

          {/* Dynamic Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  className="bg-white text-blue-700 py-3 px-8 rounded-full hover:bg-blue-50 transition duration-300 font-semibold text-lg shadow-lg"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-900 text-white py-3 px-8 rounded-full hover:bg-blue-800 transition duration-300 font-semibold text-lg shadow-lg border border-blue-400"
                >
                  Register Now
                </Link>
              </>
            ) : (
              <>
                <Link
                  to={currentRoleContent.primaryCTA.link}
                  className="bg-white text-blue-700 py-3 px-8 rounded-full hover:bg-blue-50 transition duration-300 font-semibold text-lg shadow-lg"
                >
                  {currentRoleContent.primaryCTA.text}
                </Link>
                <Link
                  to={currentRoleContent.secondaryCTA.link}
                  className="bg-blue-900 text-white py-3 px-8 rounded-full hover:bg-blue-800 transition duration-300 font-semibold text-lg shadow-lg border border-blue-400"
                >
                  {currentRoleContent.secondaryCTA.text}
                </Link>
              </>
            )}
          </div>

          {/* Welcome message for authenticated users */}
          {isAuthenticated && user && (
            <div className="mt-8 bg-white bg-opacity-20 backdrop-blur-sm py-3 px-6 rounded-full">
              <p className="text-black font-medium">
                Welcome back, {user.name}!{" "}
                {userRole === "doctor"
                  ? "Your patients are waiting."
                  : userRole === "admin"
                  ? "Access your admin controls."
                  : "Your health journey continues here."}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* How It Works Section - Modified for different roles */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 text-gray-800">
            {userRole === "doctor"
              ? "How Your MediConnect Portal Works"
              : userRole === "admin"
              ? "How MediConnect Administration Works"
              : "How MediConnect Works"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {userRole === "doctor" ? (
              // Doctor specific steps
              <>
                <div className="flex flex-col items-center">
                  <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                    <span className="text-green-600 text-xl font-bold">1</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Update Your Profile
                  </h3>
                  <p className="text-gray-600 text-center">
                    Keep your information up to date so patients can find the
                    right care.
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                    <span className="text-green-600 text-xl font-bold">2</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Manage Appointments
                  </h3>
                  <p className="text-gray-600 text-center">
                    Easily view and manage your upcoming appointments with
                    patients.
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                    <span className="text-green-600 text-xl font-bold">3</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Provide Care
                  </h3>
                  <p className="text-gray-600 text-center">
                    Deliver quality healthcare to your patients and build your
                    practice.
                  </p>
                </div>
              </>
            ) : userRole === "admin" ? (
              // Admin specific steps
              <>
                <div className="flex flex-col items-center">
                  <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                    <span className="text-indigo-600 text-xl font-bold">1</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Manage Users
                  </h3>
                  <p className="text-gray-600 text-center">
                    Oversee patient and doctor accounts with advanced
                    administrative tools.
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                    <span className="text-indigo-600 text-xl font-bold">2</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Monitor System
                  </h3>
                  <p className="text-gray-600 text-center">
                    Keep track of appointments, user activity, and platform
                    performance.
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                    <span className="text-indigo-600 text-xl font-bold">3</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    System Management
                  </h3>
                  <p className="text-gray-600 text-center">
                    Configure platform settings and ensure smooth operations.
                  </p>
                </div>
              </>
            ) : (
              // Default patient/guest steps
              <>
                <div className="flex flex-col items-center">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                    <span className="text-blue-600 text-xl font-bold">1</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Find a Doctor
                  </h3>
                  <p className="text-gray-600 text-center">
                    Browse our network of certified specialists and choose the
                    one that meets your needs.
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                    <span className="text-blue-600 text-xl font-bold">2</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Book Appointment
                  </h3>
                  <p className="text-gray-600 text-center">
                    Select a convenient time slot and instantly book your
                    appointment online.
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                    <span className="text-blue-600 text-xl font-bold">3</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Get Care
                  </h3>
                  <p className="text-gray-600 text-center">
                    Visit your doctor at the scheduled time and receive quality
                    healthcare services.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 text-gray-800">
            {userRole === "doctor"
              ? "Why Doctors Choose MediConnect"
              : userRole === "admin"
              ? "MediConnect Admin Features"
              : "Why Choose MediConnect?"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {userRole === "doctor" ? (
              // Doctor specific features
              <>
                <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border-t-4 border-green-500">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Grow Your Practice
                  </h3>
                  <p className="text-gray-600">
                    Expand your patient base and increase visibility with our
                    platform's exposure to thousands of potential patients.
                  </p>
                </div>
                <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border-t-4 border-blue-500">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Streamlined Scheduling
                  </h3>
                  <p className="text-gray-600">
                    Reduce no-shows and manage your calendar efficiently with
                    our automated appointment system.
                  </p>
                </div>
                <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border-t-4 border-purple-500">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Professional Network
                  </h3>
                  <p className="text-gray-600">
                    Connect with other healthcare professionals and build your
                    reputation in our verified specialist community.
                  </p>
                </div>
              </>
            ) : userRole === "admin" ? (
              // Admin specific features
              <>
                <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border-t-4 border-indigo-500">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Comprehensive Dashboard
                  </h3>
                  <p className="text-gray-600">
                    Get real-time insights into platform metrics, user activity,
                    and system performance all in one place.
                  </p>
                </div>
                <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border-t-4 border-purple-500">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    User Management
                  </h3>
                  <p className="text-gray-600">
                    Easily manage doctor verifications, patient accounts, and
                    role permissions with advanced administrative tools.
                  </p>
                </div>
                <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border-t-4 border-blue-500">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    System Configuration
                  </h3>
                  <p className="text-gray-600">
                    Configure platform settings, manage integrations, and ensure
                    smooth operations with our comprehensive system tools.
                  </p>
                </div>
              </>
            ) : (
              // Default patient/guest features
              <>
                <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border-t-4 border-blue-500">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Easy Booking
                  </h3>
                  <p className="text-gray-600">
                    Book appointments with top doctors in just a few clicks. No
                    more waiting on hold or dealing with complicated scheduling
                    systems.
                  </p>
                </div>
                <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border-t-4 border-green-500">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Verified Doctors
                  </h3>
                  <p className="text-gray-600">
                    All doctors on our platform are thoroughly vetted and
                    verified to ensure you receive the highest quality care.
                  </p>
                </div>
                <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border-t-4 border-purple-500">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Secure & Private
                  </h3>
                  <p className="text-gray-600">
                    Your health information is safe with us. We use the latest
                    encryption technologies to protect your data.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Featured Doctors Section - Only for patients and guests */}
      {userRole === "patient" || userRole === "guest" ? (
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-16 text-gray-800">
              Meet Our Featured Doctors
            </h2>

            {isLoading ? (
              <div className="text-center">Loading doctors...</div>
            ) : error ? (
              <div className="text-center text-red-600">
                Error loading doctors: {error.message}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {featuredDoctors?.map((doctor) => (
                  <div
                    key={doctor.id}
                    className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    <img
                      src={doctor.image || "/default-doctor.jpg"}
                      alt={doctor.name}
                      className="w-full h-48 object-cover rounded-t-xl"
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {doctor.name}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {doctor.specialization}
                      </p>
                      <Link
                        to={`/doctors/${doctor.id}`}
                        className="text-blue-600 hover:text-blue-800 font-semibold"
                      >
                        View Profile →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      ) : null}

      {/* Call-to-Action Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            {userRole === "doctor"
              ? "Ready to Grow Your Practice?"
              : userRole === "admin"
              ? "Manage Your Platform with Ease"
              : "Start Your Health Journey Today"}
          </h2>
          <p className="text-xl mb-8">
            {userRole === "doctor"
              ? "Join thousands of doctors who trust MediConnect to manage their practice."
              : userRole === "admin"
              ? "Access powerful tools to manage your healthcare platform."
              : "Connect with top doctors and take control of your health."}
          </p>
          <Link
            to={currentRoleContent.primaryCTA.link}
            className="bg-white text-blue-700 py-3 px-8 rounded-full hover:bg-blue-50 transition duration-300 font-semibold text-lg shadow-lg"
          >
            {currentRoleContent.primaryCTA.text}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
