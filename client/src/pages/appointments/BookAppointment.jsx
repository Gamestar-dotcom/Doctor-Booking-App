import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useCreateAppointmentMutation } from "../../redux/api/appointmentApi";

const BookingAppointment = () => {
  //   const { id: bookingId } = useParams(); // Extract the booking ID from the URL
  const navigate = useNavigate();
  const [appointmentDate, setAppointmentDate] = useState("");
  const [createAppointment, { isLoading }] = useCreateAppointmentMutation();

  // Retrieve the current doctor from the Redux state
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { currentDoctor } = useSelector((state) => state.doctors);

  // Handle cases where currentDoctor is not set
  if (!currentDoctor) {
    return (
      <div className="text-center py-6">
        Doctor not found. Please go back and select a doctor.
      </div>
    );
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated || user?.role !== "patient") {
      toast.error("You must be logged in as a patient to book an appointment.");
      return;
    }

    if (!appointmentDate) {
      toast.error("Please select an appointment date.");
      return;
    }

    try {
      const appointmentData = {
        doctorId: currentDoctor.id, // Use the doctorId from the Redux state
        appointmentDate,
      };
      // console.log("appointmentData", appointmentData);
      await createAppointment(appointmentData).unwrap(); // Call the mutation
      toast.success("Appointment booked successfully!");
      navigate("/appointments"); // Redirect to the appointments page
    } catch (err) {
      console.error("Error booking appointment:", err);
      toast.error("Failed to book appointment. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Book Appointment with Dr. {currentDoctor.name}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="appointmentDate"
          >
            Appointment Date
          </label>
          <input
            type="datetime-local"
            id="appointmentDate"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          disabled={isLoading}
        >
          {isLoading ? "Booking..." : "Book Appointment"}
        </button>
      </form>
    </div>
  );
};

export default BookingAppointment;
