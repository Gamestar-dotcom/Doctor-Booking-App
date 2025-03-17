import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useGetDoctorsQuery } from "../../redux/api/doctorApi";

const DoctorsList = () => {
  const dispatch = useDispatch();
  const { data: doctors, isLoading, error } = useGetDoctorsQuery();

  useEffect(() => {}, [dispatch]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="animate-pulse text-blue-600 text-xl font-semibold">
          Loading doctors...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto my-8 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow">
        <p className="font-medium">Error</p>
        <p>
          {error.message || "Failed to load doctors. Please try again later."}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Available Doctors</h2>
        <div className="text-gray-600">
          {doctors?.length || 0} doctors found
        </div>
      </div>

      {!doctors || doctors.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <p className="text-lg text-gray-600">
            No doctors available at the moment.
          </p>
          <p className="mt-2 text-gray-500">
            Please check back later or contact support.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            >
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {doctor.name}
                </h3>
                <div className="flex flex-col gap-2 mb-4">
                  <div className="flex items-center text-gray-700">
                    <span className="font-semibold mr-2">Specialty:</span>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                      {doctor.speciality}
                    </span>
                  </div>

                  <div className="flex items-center text-gray-700">
                    <span className="font-semibold mr-2">Experience:</span>
                    <span>{doctor.experience} years</span>
                  </div>

                  <div className="flex items-center text-gray-700">
                    <span className="font-semibold mr-2">Fee:</span>
                    <span className="text-green-600 font-bold">
                      ${doctor.fee}
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <Link
                    to={`/doctors/${doctor.id}`}
                    className="w-full block text-center bg-blue-600 text-white px-4 py-3 rounded-md hover:bg-blue-700 transition-colors duration-300 font-medium"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorsList;
