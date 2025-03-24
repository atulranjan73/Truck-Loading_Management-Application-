import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDriver } from "../Redux/Feature/driverSlice";

function Driver() {
  const dispatch = useDispatch();
  const { drivers, loading, error } = useSelector((state) => state.driver);

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getAllDriver());
  }, [dispatch]);

  // Filter drivers based on search input
  const filteredDrivers = drivers.filter((driver) =>
    ["name", "phone", "license"].some((key) =>  
      driver[key].toLowerCase().includes(search.toLowerCase())
    )
  );

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDrivers.map((driver) => (
          <div key={driver._id} className="p-4 bg-white shadow-lg rounded-lg">
            <h2 className="text-lg font-semibold">{driver.name}</h2>
            <p className="text-gray-700">📞 {driver.phone}</p>
            <p className="text-gray-700">🚗 License: {driver.license}</p>
            <p className="text-green-600 font-semibold">{driver.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Driver;
