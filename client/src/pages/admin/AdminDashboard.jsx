import React, { useState } from "react";
import {
  useGetAllUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "../../redux/api/adminApi";
import {
  useGetAppointmentsQuery,
  useUpdateAppointmentStatusMutation,
} from "../../redux/api/appointmentApi";
import { toast } from "react-toastify";
import StatsSection from "./DashComponentes/StatsSection";
import TabNavigation from "./DashComponentes/TabNavigation";
import UsersTable from "./DashComponentes/UsersTable";
import AppointmentsTable from "./DashComponentes/AppointmentsTable";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch all users
  const {
    data: users = [],
    isLoading: isUsersLoading,
    error: usersError,
    refetch: refetchUsers,
  } = useGetAllUsersQuery();

  // Fetch all appointments
  const {
    data: appointments = [],
    isLoading: isAppointmentsLoading,
    error: appointmentsError,
    refetch: refetchAppointments,
  } = useGetAppointmentsQuery();

  // Mutations
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [updateAppointmentStatus] = useUpdateAppointmentStatusMutation();

  // Handle user updates
  const handleUpdateUser = async (userId, updates) => {
    setIsLoading(true);
    try {
      await updateUser({ userId, updates }).unwrap();
      toast.success("User updated successfully");
      refetchUsers();
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error(error.data?.message || "Failed to update user");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle user deletion
  const handleDeleteUser = async (userId) => {
    setIsLoading(true);
    try {
      await deleteUser(userId).unwrap();
      toast.success("User deleted successfully");
      refetchUsers();
      setConfirmDelete(null);
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error(error.data?.message || "Failed to delete user");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle appointment status updates
  const handleUpdateAppointmentStatus = async (appointmentId, status) => {
    setIsLoading(true);
    try {
      await updateAppointmentStatus({ appointmentId, status }).unwrap();
      toast.success(`Appointment ${status} successfully`);
      refetchAppointments();
    } catch (error) {
      console.error("Error updating appointment status:", error);
      toast.error(error.data?.message || "Failed to update appointment status");
    } finally {
      setIsLoading(false);
    }
  };

  // Stats for dashboard
  const stats = [
    {
      title: "Total Users",
      value: users.length,
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM13 14a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      color: "bg-blue-500",
    },
    {
      title: "Total Appointments",
      value: appointments.length,
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
            clipRule="evenodd"
          />
        </svg>
      ),
      color: "bg-green-500",
    },
    {
      title: "Pending Appointments",
      value: appointments.filter((app) => app.status === "pending").length,
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
            clipRule="evenodd"
          />
        </svg>
      ),
      color: "bg-yellow-500",
    },
    {
      title: "Admin Users",
      value: users.filter((user) => user.role === "admin").length,
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
            clipRule="evenodd"
          />
        </svg>
      ),
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Delete confirmation modal */}
      {confirmDelete && (
        <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-lg font-medium mb-3">Confirm Deletion</h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to delete the user "{confirmDelete.name}"?
              This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteUser(confirmDelete.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition flex items-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                    Processing...
                  </>
                ) : (
                  "Delete User"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage users and appointments</p>
        </div>

        {/* Stats Section */}
        <StatsSection stats={stats} />

        {/* Tab Navigation */}
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Content */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {activeTab === "users" ? (
            <div>
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">
                  Users Management
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Manage user accounts and permissions
                </p>
              </div>

              {users.length === 0 ? (
                <div className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                    <svg
                      className="w-6 h-6 text-gray-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-700">
                    No Users Found
                  </h3>
                  <p className="text-gray-500 mt-1">
                    There are no users registered in the system.
                  </p>
                </div>
              ) : (
                <UsersTable
                  users={users}
                  handleUpdateUser={handleUpdateUser}
                  setConfirmDelete={setConfirmDelete}
                  isLoading={isLoading}
                />
              )}
            </div>
          ) : (
            <div>
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">
                  Appointments Management
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Manage and track appointments
                </p>
              </div>

              {appointments.length === 0 ? (
                <div className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                    <svg
                      className="w-6 h-6 text-gray-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-700">
                    No Appointments Found
                  </h3>
                  <p className="text-gray-500 mt-1">
                    There are no appointments scheduled in the system.
                  </p>
                </div>
              ) : (
                <AppointmentsTable
                  appointments={appointments}
                  handleUpdateAppointmentStatus={handleUpdateAppointmentStatus}
                  isLoading={isLoading}
                />
              )}
            </div>
          )}
          z
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
