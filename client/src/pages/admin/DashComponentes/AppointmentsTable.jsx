import React from "react";
import StatusBadge from "./StatusBadge"; // Assume this is a separate component

const AppointmentsTable = ({
  appointments,
  handleUpdateAppointmentStatus,
  isLoading,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Patient
            </th>
            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Doctor
            </th>
            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date & Time
            </th>
            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {appointments.map((appointment) => (
            <tr key={appointment.appointment_id} className="hover:bg-gray-50">
              <td className="py-4 px-6 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {appointment.patient_name}
                </div>
              </td>
              <td className="py-4 px-6 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {appointment.doctor_name}
                </div>
              </td>
              <td className="py-4 px-6 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {new Date(appointment.appointment_date).toLocaleDateString()}
                </div>
                <div className="text-xs text-gray-500">
                  {new Date(appointment.appointment_date).toLocaleTimeString(
                    [],
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
                </div>
              </td>
              <td className="py-4 px-6 whitespace-nowrap">
                <StatusBadge status={appointment.status} />
              </td>
              <td className="py-4 px-6 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  {appointment.status === "pending" && (
                    <>
                      <button
                        onClick={() =>
                          handleUpdateAppointmentStatus(
                            appointment.appointment_id,
                            "confirmed"
                          )
                        }
                        className="px-2 py-1 bg-green-50 text-green-600 rounded hover:bg-green-100 transition text-sm flex items-center"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <span className="w-3 h-3 border-2 border-green-600 border-t-transparent rounded-full animate-spin mr-1"></span>
                        ) : (
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                        Confirm
                      </button>
                      <button
                        onClick={() =>
                          handleUpdateAppointmentStatus(
                            appointment.appointment_id,
                            "cancelled"
                          )
                        }
                        className="px-2 py-1 bg-red-50 text-red-600 rounded hover:bg-red-100 transition text-sm flex items-center"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <span className="w-3 h-3 border-2 border-red-600 border-t-transparent rounded-full animate-spin mr-1"></span>
                        ) : (
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                        Cancel
                      </button>
                    </>
                  )}
                  {appointment.status === "confirmed" && (
                    <>
                      <button
                        onClick={() =>
                          handleUpdateAppointmentStatus(
                            appointment.appointment_id,
                            "completed"
                          )
                        }
                        className="px-2 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition text-sm flex items-center"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <span className="w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-1"></span>
                        ) : (
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                        Complete
                      </button>
                      <button
                        onClick={() =>
                          handleUpdateAppointmentStatus(
                            appointment.appointment_id,
                            "cancelled"
                          )
                        }
                        className="px-2 py-1 bg-red-50 text-red-600 rounded hover:bg-red-100 transition text-sm flex items-center"
                        disabled={isLoading}
                      >
                        Cancel
                      </button>
                    </>
                  )}
                  {(appointment.status === "completed" ||
                    appointment.status === "cancelled") && (
                    <span className="text-xs text-gray-500">
                      No actions available
                    </span>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentsTable;
