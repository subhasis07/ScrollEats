import React from "react";
import { NavLink } from "react-router-dom";

const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t shadow-md z-50">
      <div className="flex justify-around items-center h-14">
        {/* Home */}
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `flex flex-col items-center justify-center text-sm transition-colors ${
              isActive ? "text-blue-600" : "text-gray-500 hover:text-blue-600"
            }`
          }
        >
          <span className="h-6 w-6 mb-1" aria-hidden="true">
            {/* Home icon */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M3 10.5 12 3l9 7.5" />
              <path d="M5 10v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V10" />
            </svg>
          </span>
          <span className="text-xs">Home</span>
        </NavLink>

        {/* Saved */}
        <NavLink
          to="/saved"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center text-sm transition-colors ${
              isActive ? "text-blue-600" : "text-gray-500 hover:text-blue-600"
            }`
          }
        >
          <span className="h-6 w-6 mb-1" aria-hidden="true">
            {/* Bookmark icon */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" />
            </svg>
          </span>
          <span className="text-xs">Saved</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default BottomNav;
