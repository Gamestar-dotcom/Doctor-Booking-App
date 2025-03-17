import React from "react";

const RoleBadge = ({ role }) => {
  const badgeClasses = {
    admin: "bg-purple-100 text-purple-800",
    user: "bg-blue-100 text-blue-800",
    doctor: "bg-green-100 text-green-800",
    patient: "bg-yellow-100 text-yellow-800",
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${
        badgeClasses[role] || "bg-gray-100 text-gray-800"
      }`}
    >
      {role}
    </span>
  );
};

export default RoleBadge;
