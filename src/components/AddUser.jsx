// components/AddUserForm.js
import React from 'react';

const AddUserForm = ({ newUser, handleInputChange, handleSubmit, cancelAdd }) => {
  return (
    <div className="mb-8 p-4 border rounded shadow-sm bg-white">
      <h2 className="text-xl font-semibold mb-3">Add New User</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newUser.name}
          onChange={handleInputChange}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newUser.email}
          onChange={handleInputChange}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={newUser.password}
          onChange={handleInputChange}
          className="border p-2 rounded w-full"
          required
        />
        <div className="flex space-x-2">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Add User
          </button>
          <button
            type="button"
            onClick={cancelAdd}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUserForm;