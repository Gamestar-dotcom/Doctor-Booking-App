import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useUpdateDoctorProfileMutation } from "../../redux/api/doctorApi";
import { useNavigate } from "react-router-dom";

const UpdateDoctorProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isEditable, setIsEditable] = useState(false);
  const [formData, setFormData] = useState({
    speciality: "",
    experience: "",
    fee: "",
  });

  const user = useSelector((state) => state.auth.user);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  // console.log("User object:", user);
  useEffect(() => {
    if (!user) return; // Wait until user is fetched

    if (user.role !== "doctor") {
      navigate("/login");
    } else if (!user.doctor) {
      navigate("/doctor/profile/update");
    } else {
      setFormData({
        speciality: user?.doctor?.speciality || "",
        experience: user?.doctor?.experience || "",
        fee: user?.doctor?.fee || "",
      });
      setIsLoadingUser(false);
    }
  }, [user, navigate]);

  const [updateProfile, { isLoading }] = useUpdateDoctorProfileMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateProfile(formData).unwrap();
      setIsEditable(false);
      toast.success("Profile updated successfully!");
      navigate(`/doctor/dashboard/${user.doctorId}`);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  const toggleEditMode = () => {
    setIsEditable(!isEditable);
  };

  const handleCancel = () => {
    if (user.doctor) {
      setFormData({
        speciality: user.doctor.speciality || "",
        experience: user.doctor.experience || "",
        fee: user.doctor.fee || "",
      });
    }
    setIsEditable(false);
  };

  if (isLoadingUser) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="rounded-full bg-blue-200 h-16 w-16 mb-4"></div>
          <div className="h-4 bg-blue-200 rounded w-24 mb-6"></div>
          <div className="text-blue-500 font-semibold">
            Loading profile data...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-12 bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold">Doctor Profile</h2>
          {!isEditable ? (
            <button
              type="button"
              onClick={toggleEditMode}
              className="bg-white text-blue-600 font-bold py-2 px-4 rounded-full hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-all duration-300 shadow-md"
            >
              Edit Profile
            </button>
          ) : null}
        </div>
        <p className="text-blue-100 mt-1">Dr. {user?.name || "Doctor"}</p>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2">
            Speciality
          </label>
          {isEditable ? (
            <input
              type="text"
              name="speciality"
              value={formData.speciality}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              placeholder="e.g. Cardiology, Neurology"
            />
          ) : (
            <div className="w-full border border-gray-200 bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <span className="text-blue-600 font-bold">S</span>
                </div>
                <span className="text-gray-700 font-medium">
                  {formData.speciality || "Not specified"}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2">
            Experience (years)
          </label>
          {isEditable ? (
            <input
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              placeholder="Years of professional experience"
            />
          ) : (
            <div className="w-full border border-gray-200 bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <span className="text-green-600 font-bold">E</span>
                </div>
                <span className="text-gray-700 font-medium">
                  {formData.experience
                    ? `${formData.experience} years`
                    : "Not specified"}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2">
            Consultation Fee
          </label>
          {isEditable ? (
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-500">$</span>
              <input
                type="number"
                name="fee"
                value={formData.fee}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 pl-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                placeholder="Your consultation fee"
              />
            </div>
          ) : (
            <div className="w-full border border-gray-200 bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
                  <span className="text-yellow-600 font-bold">$</span>
                </div>
                <span className="text-gray-700 font-medium">
                  {formData.fee ? `$${formData.fee}` : "Not specified"}
                </span>
              </div>
            </div>
          )}
        </div>

        {isEditable && (
          <div className="flex gap-4 mt-8">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none shadow-lg transform transition-all duration-300 hover:-translate-y-1"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Saving...
                </span>
              ) : (
                "Save Changes"
              )}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-lg hover:bg-gray-300 focus:outline-none shadow transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default UpdateDoctorProfile;
