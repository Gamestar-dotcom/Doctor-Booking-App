import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  useGetDoctorAppointmentsQuery,
  useGetDoctorByIdQuery,
} from "../../redux/api/doctorApi";
import { useUpdateAppointmentStatusMutation } from "../../redux/api/appointmentApi";
import { toast } from "react-toastify";

const DoctorDashboard = () => {
  const { id } = useParams(); // Extract doctor ID from URL
  const [activeTab, setActiveTab] = useState("upcoming");

  // Fetch doctor details
  const {
    data: doctor,
    isLoading: isDoctorLoading,
    error: doctorError,
    refetch,
  } = useGetDoctorByIdQuery(id);

  // Fetch doctor appointments
  const {
    data: appointments,
    isLoading: isAppointmentsLoading,
    error: appointmentsError,
    refetch: refetchAppointments,
  } = useGetDoctorAppointmentsQuery(id);

  // Mutation to update appointment status
  const [updateAppointmentStatus, { isLoading: isUpdating }] =
    useUpdateAppointmentStatusMutation();

  // Function to handle status updates
  const handleUpdateStatus = async (appointmentId, status) => {
    try {
      await updateAppointmentStatus({ appointmentId, status }).unwrap();
      toast.success(`Appointment ${status} successfully`);
      refetchAppointments(); // Refresh the appointments list
    } catch (error) {
      console.error("Error updating appointment status:", error);
      toast.error("Failed to update appointment status");
    }
  };
  // implement refetch
  useEffect(() => {
    refetch();
  }, [doctor, refetch]);

  // Filter appointments based on active tab
  const filterAppointments = () => {
    if (!appointments) return [];

    switch (activeTab) {
      case "upcoming":
        return appointments.filter(
          (app) =>
            app.status === "pending" ||
            (app.status === "confirmed" &&
              new Date(app.appointment_date) >= new Date())
        );
      case "confirmed":
        return appointments.filter((app) => app.status === "confirmed");
      case "cancelled":
        return appointments.filter((app) => app.status === "cancelled");
      case "completed":
        return appointments.filter((app) => app.status === "completed");
      default:
        return appointments;
    }
  };

  if (isDoctorLoading || isAppointmentsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-10 w-40 bg-gray-200 rounded mb-4"></div>
          <div className="h-32 w-full max-w-lg bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (doctorError || appointmentsError) {
    return (
      <div className="bg-red-50 text-red-800 p-6 rounded-lg mx-auto max-w-xl mt-10 text-center border border-red-200">
        <h3 className="text-xl font-bold mb-2">Error Loading Data</h3>
        <p>
          We couldn't load your dashboard information. Please try again later.
        </p>
        <button
          onClick={refetchAppointments}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Try Again
        </button>
      </div>
    );
  }

  const filteredAppointments = filterAppointments();

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-8 px-6 shadow-md">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold">Welcome, Dr. {doctor?.name}</h2>
          <p className="text-blue-100 mt-2">
            Manage your appointments and patient schedule
          </p>
        </div>
      </div>
      {/* div to check if speciality is empty add a green text at the top tellin them to update their profile  */}
      <div className="flex flex-col justify-center items-center mb-6">
        {!doctor?.speciality && (
          <>
            <p className="text-green-600 font-semibold mb-4">
              Please finish updating you profile in the profile section
            </p>
            <Link
              to="/doctor/profile/update"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Finish Profile
            </Link>
          </>
        )}
      </div>
      <div>
        {appointments.status === "pending" && (
          <div className="flex flex-col justify-center items-center mb-6">
            <p className="text-green-600 font-semibold mb-4">
              Always come back within an hour to confirm whether the patient has
              completed their payment, the appointment will be cancelled if not
              and should be in the confirmed tab if payment has been made
            </p>
          </div>
        )}
      </div>
      <div className="max-w-6xl mx-auto mt-8 px-4">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Doctor Profile Card */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-gray-100">
                <h3 className="text-xl font-semibold text-gray-800">
                  Doctor Profile
                </h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-center mb-6">
                  <div className="h-24 w-24 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 text-3xl font-semibold">
                      {doctor?.name?.charAt(0)}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center border-b border-gray-100 pb-3">
                    <span className="font-medium text-gray-600 w-28">
                      Speciality:
                    </span>
                    <span className="text-gray-800">{doctor?.speciality}</span>
                  </div>
                  <div className="flex items-center border-b border-gray-100 pb-3">
                    <span className="font-medium text-gray-600 w-28">
                      Experience:
                    </span>
                    <span className="text-gray-800">
                      {doctor?.experience} years
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium text-gray-600 w-28">
                      Consultation:
                    </span>
                    <span className="text-gray-800">${doctor?.fee}</span>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-100">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="block text-sm text-gray-500">
                        Total Appointments
                      </span>
                      <span className="text-2xl font-bold text-gray-800">
                        {appointments?.length || 0}
                      </span>
                    </div>
                    <div>
                      <span className="block text-sm text-gray-500">
                        Pending
                      </span>
                      <span className="text-2xl font-bold text-amber-600">
                        {appointments?.filter((a) => a.status === "pending")
                          .length || 0}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Appointments Section */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-gray-100">
                <h3 className="text-xl font-semibold text-gray-800">
                  Appointments
                </h3>
              </div>

              {/* Tab Navigation */}
              <div className="flex border-b border-gray-200">
                {["upcoming", "confirmed", "cancelled", "completed"].map(
                  (tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-4 px-6 font-medium text-sm focus:outline-none ${
                        activeTab === tab
                          ? "border-b-2 border-blue-600 text-blue-600"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  )
                )}
              </div>

              {/* Appointments List */}
              <div className="p-6">
                {filteredAppointments.length > 0 ? (
                  <div className="space-y-4">
                    {filteredAppointments.map((appointment) => {
                      const appointmentDate = new Date(
                        appointment.appointment_date
                      );
                      // const isUpcoming = appointmentDate >= new Date();

                      return (
                        <div
                          key={appointment.appointment_id}
                          className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                        >
                          <div className="flex justify-between flex-wrap gap-4">
                            <div>
                              <h4 className="font-medium text-gray-800">
                                {appointment.patient_name}
                              </h4>
                              <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                                <span>
                                  {appointmentDate.toLocaleDateString("en-US", {
                                    weekday: "short",
                                    month: "short",
                                    day: "numeric",
                                  })}
                                </span>
                                <span>•</span>
                                <span>
                                  {appointmentDate.toLocaleTimeString("en-US", {
                                    hour: "numeric",
                                    minute: "2-digit",
                                  })}
                                </span>
                              </div>
                              <p className="text-sm mt-1">
                                {appointment.patient_email}
                              </p>
                            </div>

                            <div className="flex items-center gap-2">
                              {appointment.status === "pending" && (
                                <>
                                  <button
                                    onClick={() =>
                                      handleUpdateStatus(
                                        appointment.appointment_id,
                                        "confirmed"
                                      )
                                    }
                                    disabled={isUpdating}
                                    className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition text-sm"
                                  >
                                    Confirm
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleUpdateStatus(
                                        appointment.appointment_id,
                                        "cancelled"
                                      )
                                    }
                                    disabled={isUpdating}
                                    className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm"
                                  >
                                    Cancel
                                  </button>
                                </>
                              )}

                              {/* {appointment.status === "confirmed" &&
                                isUpcoming && (
                                  <>
                                    <button
                                      onClick={() =>
                                        handleUpdateStatus(
                                          appointment.appointment_id,
                                          "completed"
                                        )
                                      }
                                      disabled={isUpdating}
                                      className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm"
                                    >
                                      Complete
                                    </button>
                                    <button
                                      onClick={() =>
                                        handleUpdateStatus(
                                          appointment.appointment_id,
                                          "cancelled"
                                        )
                                      }
                                      disabled={isUpdating}
                                      className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm"
                                    >
                                      Cancel
                                    </button>
                                  </>
                                )} */}

                              <span
                                className={`px-3 py-1 rounded-full text-xs font-medium ${
                                  appointment.status === "confirmed"
                                    ? "bg-green-100 text-green-800"
                                    : appointment.status === "cancelled"
                                    ? "bg-red-100 text-red-800"
                                    : appointment.status === "completed"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {appointment.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12 border border-dashed border-gray-200 rounded-lg">
                    <p className="text-gray-500">
                      No {activeTab} appointments found.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
