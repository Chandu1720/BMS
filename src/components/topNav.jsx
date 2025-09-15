import React from "react";
import { Search, Bell } from "lucide-react";

export default function TopNav({ user = "Admin", email = "admin@example.com" }) {
  return (
    <div className="flex justify-between items-center bg-white px-6 py-4 shadow">
      <div className="relative w-1/3">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
          <Search size={16} />
        </span>
        <input
          type="search"
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex items-center gap-6">
        <Bell className="text-gray-600 hover:text-black cursor-pointer" />
        
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
            {user?.[0]?.toUpperCase() || 'U'}
          </div>
          <div className="text-sm leading-tight">
            <div className="font-semibold">{user}</div>
            <div className="text-gray-600">{email}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
