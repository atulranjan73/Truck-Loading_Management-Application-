import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrucks, addTruck, deleteTruck, updateTruck } from "../Redux/Feature/TruckSlice";
import { getAllDriver } from "../Redux/Feature/driverSlice";

const Truck = () => {
  const dispatch = useDispatch();
  const { trucks, loading, error } = useSelector((state) => state.truck) || { trucks: [], loading: false, error: null };
  const { drivers } = useSelector((state) => state.driver) || { drivers: [] };

  const [formData, setFormData] = useState({
    truckNumber: "",
    capacity: "",
    assignedDriver: "",
    status: "Available",
  });

  const [editingTruck, setEditingTruck] = useState(null);

  useEffect(() => {
    dispatch(fetchTrucks());
    dispatch(getAllDriver());
  }, [dispatch]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = (e) => {
  e.preventDefault();
  console.log("Submitting:", { ...formData, _id: editingTruck?._id });
  if (editingTruck) {
    dispatch(updateTruck({ ...formData, _id: editingTruck._id }));
  } else {
    dispatch(addTruck(formData));
  }
  setFormData({ truckNumber: "", capacity: "", assignedDriver: "", status: "Available" });
  setEditingTruck(null);
};

  const  handleAssignDriver = (truck) => {
    setEditingTruck(truck);
    setFormData({
      truckNumber: truck.truckNumber,
      capacity: truck.capacity,
      assignedDriver: truck.assignedDriver || "",
      status: truck.status || "Available",
    });
  };

  const handleDelete = (id) => {
    dispatch(deleteTruck(id));
  };

  const getDriverName = (driverId) => {
    const driver = drivers.find((d) => d._id === driverId);
    return driver ? driver.name : "Not Assigned";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 py-12 px-4 sm:px-6 lg:px-12 flex justify-center">
      <div className="w-full max-w-4xl">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Manage Trucks</h2>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-lg flex flex-col gap-4 w-full max-w-lg mx-auto transform transition-all hover:shadow-xl"
        >
          <input
            type="text"
            name="truckNumber"
            value={formData.truckNumber}
            onChange={handleInputChange}
            placeholder="Truck Number"
            required
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          <input
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={handleInputChange}
            placeholder="Capacity (kg)"
            required
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          <select
            name="assignedDriver"
            value={formData.assignedDriver}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          >
            <option value="">Assign Driver</option>
            {drivers?.length > 0 &&
              drivers.map((driver) => (
                <option key={driver._id} value={driver._id}>
                  {driver.name}
                </option>
              ))}
          </select>
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          >
            <option value="Available">Available</option>
            <option value="On Trip">On Trip</option>
            <option value="In Maintenance">In Maintenance</option>
          </select>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
          >
            {editingTruck ? "Update Truck" : "Add Truck"}
          </button>
        </form>

        {/* Truck List */}
        {loading ? (
          <p className="text-center mt-8 text-gray-600">Loading...</p>
        ) : error ? (
          <p className="text-center mt-8 text-red-500 font-medium">Error: {error}</p>
        ) : (
          <ul className="mt-8 space-y-4">
            {trucks?.length > 0 &&
              trucks.map((truck) => (
                <li
                  key={truck._id}
                  className="bg-white p-4 rounded-xl shadow-md flex justify-between items-center hover:shadow-lg transition-all duration-200"
                >
                  <span className="text-gray-700">
                    <strong className="text-lg">{truck.truckNumber}</strong> - {truck.capacity}kg - Driver:{" "}
                    {getDriverName(truck.assignedDriver)} -{" "}
                    <span
                      className={`ml-2 px-2 py-1 rounded text-sm font-medium ${
                        truck.status === "Available"
                          ? "bg-green-100 text-green-700"
                          : truck.status === "On Trip"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {truck.status}
                    </span>
                  </span>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleAssignDriver(truck)}
                      className="bg-yellow-500 text-white px-4 py-1 rounded-lg hover:bg-yellow-600 transition-all duration-200"
                    >
                      Assign Driver
                    </button>
                    <button
                      onClick={() => handleDelete(truck._id)}
                      className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition-all duration-200"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Truck;