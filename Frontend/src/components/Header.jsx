import React from "react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow flex justify-between items-center px-6 py-3 z-50">
      {/* Left side: Logo + name */}
      <div className="flex items-center space-x-2">
        <span className="text-2xl">🍴</span>
        <h1 className="text-xl font-bold text-gray-800">ScrollEats</h1>
      </div>

      {/* Right side: Login & Register */}
      <div className="flex space-x-4">
        <button
          onClick={() =>
            (window.location.href =
              "https://scroll-eats-fe.onrender.com/user/login")
          }
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
        >
          Login
        </button>
        <button
          onClick={() =>
            (window.location.href =
              "https://scroll-eats-fe.onrender.com/register")
          }
          className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition"
        >
          Register
        </button>
      </div>
    </header>
  );
};

export default Header;
