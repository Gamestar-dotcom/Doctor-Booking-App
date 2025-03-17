import React from "react";
import RoleBadge from "./RoleBadge"; // Assume this is a separate component

const UsersTable = ({
  users,
  handleUpdateUser,
  setConfirmDelete,
  isLoading,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Role
            </th>
            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="py-4 px-6 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 font-medium text-sm">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {user.name}
                    </div>
                    {user.created_at && (
                      <div className="text-xs text-gray-500">
                        Joined {new Date(user.created_at).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
              </td>
              <td className="py-4 px-6 whitespace-nowrap">
                <div className="text-sm text-gray-900">{user.email}</div>
              </td>
              <td className="py-4 px-6 whitespace-nowrap">
                <RoleBadge role={user.role} />
              </td>
              <td className="py-4 px-6 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <div className="relative group">
                    <button
                      className="px-2 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition text-sm"
                      onClick={() =>
                        handleUpdateUser(user.id, {
                          role: user.role === "admin" ? "user" : "admin",
                        })
                      }
                      disabled={isLoading}
                    >
                      {user.role === "admin" ? "Demote" : "Promote"}
                    </button>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-gray-800 text-white text-xs rounded py-1 px-2 hidden group-hover:block">
                      {user.role === "admin"
                        ? "Demote to regular user"
                        : "Promote to admin role"}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                    </div>
                  </div>
                  <button
                    className="px-2 py-1 bg-red-50 text-red-600 rounded hover:bg-red-100 transition text-sm"
                    onClick={() => setConfirmDelete(user)}
                    disabled={isLoading}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
