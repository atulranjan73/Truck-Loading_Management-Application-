import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Sidebar({ unreadCount = 2 }) {
  const navigate = useNavigate();

  // Extract user role from localStorage
  const user = localStorage.getItem("user");
  console.log(user)

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user"); // Remove user data
    navigate("/login");
  };

  return (
    <aside className="mt-20 bg-blue-300 fixed inset-0 z-50 h-[calc(100vh-32px)] w-72 transition-transform duration-300 -translate-x-80 xl:translate-x-0 shadow-lg">
      <div className="m-4">
        <ul className="mb-4 flex flex-col gap-1">
          {/* Home - Visible to all */}
          <li>
            <Link to="/">
              <button className="flex items-center gap-3 w-full px-4 py-3 text-black bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-95">
                <p className="text-base font-medium capitalize">Home</p>
              </button>
            </Link>
          </li>

          {/* Warehouse User - Show all menu items */}
          {user === "warehouse" && (
            <>
              <li>
                <Link to="/adduser">
                  <button className="w-full flex items-center gap-4 px-4 py-3 text-black bg-gray-200 rounded-lg hover:bg-gray-300 transition-all">
                    <p className="text-base font-medium capitalize">Add Users</p>
                  </button>
                </Link>
              </li>

              <li>
                <Link to="/driver">
                  <button className="w-full flex items-center gap-4 px-4 py-3 text-black bg-gray-200 rounded-lg hover:bg-gray-300 transition-all">
                    <p className="text-base font-medium capitalize">All Driver List</p>
                  </button>
                </Link>
              </li>

              <li>
                <Link to="/warehouse">
                  <button className="w-full flex items-center gap-4 px-4 py-3 text-black bg-gray-200 rounded-lg hover:bg-gray-300 transition-all">
                    <p className="text-base font-medium capitalize">Warehouse List</p>
                  </button>
                </Link>
              </li>

              <li>
                <Link to="/notification">
                  <button className="w-full flex items-center justify-between px-4 py-3 text-black bg-gray-200 rounded-lg hover:bg-gray-300 transition-all">
                    <p className="text-base font-medium capitalize">Notifications</p>
                    {unreadCount > 0 && (
                      <span className="inline-flex items-center justify-center w-6 h-6 text-xs font-semibold text-white bg-red-500 rounded-full animate-bounce">
                        {unreadCount}
                      </span>
                    )}
                  </button>
                </Link>
              </li>
            </>
          )}

          {user === "driver" && (
            <>
              <li>
                <Link to="/consignment">
                  <button className="w-full flex items-center gap-4 px-4 py-3 text-black bg-gray-200 rounded-lg hover:bg-gray-300 transition-all">
                    <p className="text-base font-medium capitalize">Consignment</p>
                  </button>
                </Link>
              </li>

              <li>
                <Link to="/notification">
                  <button className="w-full flex items-center justify-between px-4 py-3 text-black bg-gray-200 rounded-lg hover:bg-gray-300 transition-all">
                    <p className="text-base font-medium capitalize">Notifications</p>
                    {unreadCount > 0 && (
                      <span className="inline-flex items-center justify-center w-6 h-6 text-xs font-semibold text-white bg-red-500 rounded-full animate-bounce">
                        {unreadCount}
                      </span>
                    )}
                  </button>
                </Link>
              </li>

              <li>
                <Link to="/profile">
                  <button className="w-full flex items-center gap-4 px-4 py-3 text-black bg-gray-200 rounded-lg hover:bg-gray-300 transition-all">
                    <p className="text-base font-medium capitalize">Profile</p>
                  </button>
                </Link>
              </li>
            </>
          )}

          
          <li>
            <button
              className="w-full flex items-center gap-4 px-4 py-3 text-black bg-gray-200 rounded-lg hover:bg-gray-300 transition-all"
              type="button"
              onClick={handleLogout}
            >
              <p className="text-base font-medium capitalize">Logout</p>
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
