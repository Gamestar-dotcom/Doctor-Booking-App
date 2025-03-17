import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetDoctorByIdQuery } from "../../redux/api/doctorApi";
import { setCurrentDoctor } from "../../redux/slice/doctorSlice";

const DoctorDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const { data: currentDoctor, isLoading, error } = useGetDoctorByIdQuery(id);

  // Update Redux state when doctor data is loaded
  useEffect(() => {
    if (currentDoctor) {
      dispatch(setCurrentDoctor(currentDoctor));
    }
  }, [currentDoctor, dispatch]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="animate-pulse text-blue-600 text-xl font-semibold">
          Loading doctor details...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto my-8 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow">
        <p className="font-medium">Error</p>
        <p>Failed to load doctor details. Please try again later.</p>
      </div>
    );
  }

  if (!currentDoctor) {
    return (
      <div className="max-w-2xl mx-auto my-8 bg-yellow-50 border border-yellow-200 rounded-lg p-8 text-center">
        <p className="text-lg text-yellow-700 font-medium">Doctor not found</p>
        <p className="mt-2 text-yellow-600">
          The requested doctor profile could not be found.
        </p>
        <Link
          to="/doctors"
          className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
        >
          View All Doctors
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto my-8 px-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-100">
        <div className="bg-blue-600 text-white p-6">
          <h2 className="text-2xl font-bold">{currentDoctor.name}</h2>
          <p className="text-blue-100 mt-1">{currentDoctor.speciality}</p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Contact Information
              </h3>
              <p className="flex items-center text-gray-700 mb-2">
                <span className="font-medium w-24">Email:</span>
                <span>{currentDoctor.email}</span>
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Professional Details
              </h3>
              <p className="flex items-center text-gray-700 mb-2">
                <span className="font-medium w-24">Experience:</span>
                <span>{currentDoctor.experience} years</span>
              </p>
              <p className="flex items-center text-gray-700 mb-2">
                <span className="font-medium w-24">Fee:</span>
                <span className="text-green-600 font-bold">
                  ${currentDoctor.fee}
                </span>
              </p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6 mt-6">
            <div className="flex flex-wrap gap-3 items-center">
              {isAuthenticated && user?.role === "patient" ? (
                <Link
                  to={`/book/${currentDoctor.id}`}
                  className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors duration-300 font-medium flex-shrink-0"
                >
                  Book Appointment
                </Link>
              ) : !isAuthenticated ? (
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <div className="bg-red-50 border-l-4 border-red-400 p-3 text-red-700 mb-3 sm:mb-0 flex-grow">
                    <p>Please login as a patient to book an appointment</p>
                  </div>
                  <Link
                    to="/login"
                    className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors duration-300 font-medium flex-shrink-0 text-center"
                  >
                    Login
                  </Link>
                </div>
              ) : null}

              <Link
                to="/doctors"
                className="border border-blue-600 text-blue-600 px-6 py-3 rounded-md hover:bg-blue-50 transition-colors duration-300 font-medium flex-shrink-0"
              >
                Back to Doctors
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;
