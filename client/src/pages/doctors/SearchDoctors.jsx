import React, { useState } from "react";
import { useSearchDoctorsBySpecialityQuery } from "../../redux/api/doctorApi";

const SearchDoctors = () => {
  const [speciality, setSpeciality] = useState("");

  const {
    data: doctors,
    isLoading,
    error,
  } = useSearchDoctorsBySpecialityQuery(speciality);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!speciality.trim()) {
      alert("Please enter a speciality to search.");
      return;
    }
  };

  return (
    <div className="max-w-md mx-auto mt-6">
      <h2 className="text-2xl font-semibold mb-6">Search Doctors</h2>

      <form onSubmit={handleSearch} className="mb-6">
        <input
          type="text"
          placeholder="Enter speciality..."
          value={speciality}
          onChange={(e) => setSpeciality(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded-md"
        />
      </form>

      {isLoading && <p>Loading...</p>}
      {error && (
        <p className="text-red-500">
          Failed to load doctors. Please try again.
        </p>
      )}
      {doctors && doctors.length > 0 ? (
        <ul className="space-y-2">
          {doctors.map((doctor) => (
            <li key={doctor.id} className="bg-white shadow-md rounded-lg p-4">
              <p>
                <strong>{doctor.name}</strong>
              </p>
              <p>{doctor.speciality}</p>
              <p>Experience: {doctor.experience} years</p>
              <p>Fee: ${doctor.fee}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No doctors found for this speciality.</p>
      )}
    </div>
  );
};

export default SearchDoctors;
