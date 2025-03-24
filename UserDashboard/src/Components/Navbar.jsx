import React, { useState, useEffect } from "react";

function Navbar() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("user");
    if (storedName) {
      setUsername(storedName);
    }
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-blue-300 shadow-lg px-4 py-3 xl:pl-80">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 max-w-7xl mx-auto">
        {/* Breadcrumb and Title */}
        <div className="flex flex-col gap-2">
          <nav aria-label="breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-gray-700">
              <li className="flex items-center">
                <a href="#" className="hover:text-indigo-600 transition-colors duration-200">
                  Dashboard
                </a>
                <span className="mx-2 text-gray-500">/</span>
              </li>
              <li className="text-indigo-600 font-semibold">Home</li>
            </ol>
          </nav>
          <h6 className="text-lg font-semibold text-gray-900 tracking-wide">
            Home
          </h6>
        </div>

        {/* Right Section: Search, User, and Icons */}
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search..."
              className="w-full py-2 px-4 bg-white text-gray-900 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 placeholder-gray-600"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* User Profile */}
          <div className="hidden md:flex items-center gap-2">
            <button
              className="flex items-center gap-2 px-4 py-2 text-gray-900 hover:bg-gray-200 rounded-lg transition-colors duration-200"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5 text-indigo-600"
              >
                <path
                  fillRule="evenodd"
                  d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-gray-800 font-medium">{username || "Guest"}</span>
            </button>
          </div>

          {/* Icons */}
          <button className="p-2 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors duration-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <button className="p-2 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors duration-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
