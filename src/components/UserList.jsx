// components/UserList.js
import React from 'react';

const UserList = ({
  users,
  editingUser,
  editFormData,
  handleEditFormChange,
  handleUpdateUser,
  cancelEditing,
  startEditing,
  handleDeleteUser,
}) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Existing Users</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul className="space-y-4">
          {users.map((user) => (
            <li key={user._id} className="p-4 border rounded shadow-sm flex justify-between items-center">
              {editingUser === user._id ? (
                <form onSubmit={handleUpdateUser} className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
                  <input
                    type="text"
                    name="name"
                    value={editFormData.name}
                    onChange={handleEditFormChange}
                    className="border p-2 rounded w-full"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    value={editFormData.email}
                    onChange={handleEditFormChange}
                    className="border p-2 rounded w-full"
                    required
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="New Password (optional)"
                    value={editFormData.password}
                    onChange={handleEditFormChange}
                    className="border p-2 rounded w-full"
                  />
                  <div className="md:col-span-3 flex space-x-2 mt-2 md:mt-0">
                    <button type="submit" className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={cancelEditing}
                      className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="flex-grow">
                  <p className="font-medium">{user.name} ({user.email})</p>
                  <p className="text-sm text-gray-500">ID: {user._id}</p>
                </div>
              )}
              <div className="flex space-x-2 ml-4">
                {editingUser !== user._id && (
                  <button
                    onClick={() => startEditing(user)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => handleDeleteUser(user._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;