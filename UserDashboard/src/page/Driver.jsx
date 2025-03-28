import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDriver } from "../Redux/Feature/driverSlice";
import DriverUpdateModal from "../page/driverUpdateModel"; 

function Driver() {
  const dispatch = useDispatch();
  const { drivers, loading, error } = useSelector((state) => state.driver);
  const [isUpdate, setUpdate] = useState(false);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getAllDriver());
  }, [dispatch]);

  // Ensure drivers array exists before filtering
  const filteredDrivers = drivers
    ? drivers.filter((driver) =>
        ["name", "phone", "license"].some(
          (key) => driver[key]?.toLowerCase().includes(search.toLowerCase())
        )
      )
    : [];

  const handleUpdate = (driver) => {
    setUpdate(true);
    setSelected(driver);
  };

  return (
    <div className="mt-15 min-h-screen bg-blue-300 py-12 px-4 sm:px-6 lg:px-8 xl:ml-72">
      <h1 className="text-2xl font-bold mb-6">Driver List</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by name, phone, or license..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-400 rounded-lg"
      />

      {/* Show Loading or Error */}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Display Drivers */}
      {filteredDrivers.length > 0 ? (
        <div className="space-y-4">
          {filteredDrivers.map((driver) => (
            <div key={driver._id} className="flex items-center p-4 bg-white shadow-lg rounded-lg border-l-4 
            ${driver.status === 'available' ? 'border-green-500' : driver.status === 'on_trip' ? 'border-yellow-500' : 'border-red-500'}">
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-800">{driver.name}</h2>
                <p className="text-gray-600">📞 {driver.phone}</p>
                <p className="text-gray-600">🚗 License: {driver.license}</p>
              </div>
              <p className={`font-semibold mx-4 
                ${driver.status === "available" ? "text-green-600" : 
                driver.status === "on_trip" ? "text-yellow-600" : "text-red-600"}`}>
                {driver.status}
              </p>
              {/* Edit Button */}
              <button
                onClick={() => handleUpdate(driver)}
                className="px-4 py-1 border bg-gray-200 hover:bg-gray-300 rounded"
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-700 text-center mt-4">No matching drivers found.</p>
      )}

      {/* Driver Update Modal */}
      {isUpdate && selected && (
        <DriverUpdateModal driver={selected} onClose={() => setUpdate(false)} />
      )}
    </div>
  );
}

export default Driver;
