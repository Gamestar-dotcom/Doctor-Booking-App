import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useGetAppointmentsQuery,
  useCancelAppointmentMutation,
} from "../../redux/api/appointmentApi";

const MyAppointments = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState("upcoming");

  // Fetch the user's appointments and get the refetch function
  const {
    data: appointments,
    isLoading,
    error,
    refetch,
  } = useGetAppointmentsQuery();

  useEffect(() => {
    refetch();
  }, [appointments, refetch]);
  // Mutation to delete (cancel) an appointment
  const [cancelAppointment, { isLoading: isCancelling }] =
    useCancelAppointmentMutation();

  // Handle canceling an appointment
  const handleCancel = async (appointmentId) => {
    const parsedId = Number(appointmentId);

    if (isNaN(parsedId)) {
      console.error("Invalid appointment ID:", appointmentId);
      toast.error("Failed to cancel appointment. Invalid ID.");
      return;
    }

    try {
      await cancelAppointment(parsedId).unwrap();
      toast.success("Appointment cancelled successfully!");
    } catch (err) {
      console.error("Error cancelling appointment:", err);
      toast.error("Failed to cancel appointment. Please try again.");
    }
  };

  if (!isAuthenticated || user?.role !== "patient") {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-lg shadow-sm">
        <p className="text-lg text-gray-700 mb-4">
          You must be logged in as a patient to view your appointments.
        </p>
        <Link
          to="/login"
          className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Login
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse flex space-x-2">
          <div className="h-3 w-3 bg-blue-600 rounded-full"></div>
          <div className="h-3 w-3 bg-blue-600 rounded-full"></div>
          <div className="h-3 w-3 bg-blue-600 rounded-full"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4 rounded shadow-sm">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-red-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">
              Failed to load your appointments. Please try again later.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const filterAppointments = () => {
    if (!appointments || appointments.length === 0) return [];

    const now = new Date();

    return appointments.filter((appointment) => {
      const appointmentDate = new Date(appointment.appointment_date);

      if (activeTab === "upcoming") {
        return appointmentDate >= now && appointment.status !== "cancelled";
      } else if (activeTab === "past") {
        return appointmentDate < now || appointment.status === "completed";
      } else if (activeTab === "cancelled") {
        return appointment.status === "cancelled";
      }
      return true;
    });
  };

  const filteredAppointments = filterAppointments();

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className="max-w-4xl mx-auto mt-6 px-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">My Appointments</h2>
        <Link
          to="/doctors"
          className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
        >
          Book New Appointment
        </Link>
      </div>
      {appointments.some((app) => app.status === "pending") < 0 && (
        <div className="mb-4 text-gray-600  ">
          Hey <span className="font-semibold text-black">{user.name}</span>,
          always come back to check the status of your appointments is complete
          after a successful payment.
        </div>
      )}

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="flex space-x-8">
          <button
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "upcoming"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
            onClick={() => setActiveTab("upcoming")}
          >
            Upcoming
          </button>
          <button
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "past"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
            onClick={() => setActiveTab("past")}
          >
            Past
          </button>
          <button
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "cancelled"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
            onClick={() => setActiveTab("cancelled")}
          >
            Cancelled
          </button>
        </nav>
      </div>

      {filteredAppointments.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No appointments
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {activeTab === "upcoming"
              ? "You don't have any upcoming appointments. Check your status for recent bookings in the Past tab"
              : activeTab === "past"
              ? "You don't have any past appointments."
              : "You don't have any cancelled appointments."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAppointments.map((appointment) => (
            <div
              key={appointment.appointment_id}
              className="bg-white shadow-sm border border-gray-200 rounded-lg p-5 transition-all hover:shadow-md"
            >
              <div className="flex flex-col md:flex-row justify-between">
                <div className="md:w-2/3">
                  <div className="flex items-center mb-2">
                    <svg
                      className="h-5 w-5 text-blue-500 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Dr. {appointment.doctor_name}
                    </h3>
                  </div>

                  <div className="flex items-center mb-2 text-gray-600">
                    <svg
                      className="h-5 w-5 text-gray-400 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span>{formatDate(appointment.appointment_date)}</span>
                  </div>

                  {appointment.reason && (
                    <p className="text-gray-500 mb-3">
                      <span className="font-medium">Reason:</span>{" "}
                      {appointment.reason}
                    </p>
                  )}

                  <div className="mb-3 md:mb-0">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusBadgeClass(
                        appointment.status
                      )}`}
                    >
                      {appointment.status}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col space-y-2 md:items-end mt-4 md:mt-0">
                  <Link
                    to={`/appointments/${appointment.appointment_id}`}
                    className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 w-full md:w-auto text-center"
                  >
                    View Details
                  </Link>

                  {appointment.status === "pending" && (
                    <button
                      onClick={() => handleCancel(appointment.appointment_id)}
                      className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isCancelling}
                    >
                      {isCancelling ? "Cancelling..." : "Cancel"}
                    </button>
                  )}

                  {appointment.status === "confirmed" && (
                    <Link
                      to={`/payments/${appointment.appointment_id}`}
                      className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 w-full md:w-auto text-center"
                    >
                      Pay Now
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAppointments;
