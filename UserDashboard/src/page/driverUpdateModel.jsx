import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateDriver, getAllDriver } from "../Redux/Feature/driverSlice";

function DriverUpdateModal({ driver, onClose }) {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    license: "",
    status: "available",
  });

  // ✅ Automatically update form when `driver` changes
  useEffect(() => {
    if (driver) {
      setFormData({
        name: driver.name || "",
        phone: driver.phone || "",
        license: driver.license || "",
        status: driver.status || "available",
      });
    }
  }, [driver]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await dispatch(updateDriver({ id: driver._id, ...formData }));
      await dispatch(getAllDriver());
      onClose(); // Close modal after success
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        {/* ✅ Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Update Driver</h2>
          <button onClick={onClose} className="text-red-800 hover:text-red-500">
            ✖
          </button>
        </div>

        {/* ✅ Form Section */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Driver Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">License</label>
            <input
              type="text"
              name="license"
              value={formData.license}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            >
              <option value="available">Available</option>
              <option value="on_trip">On Trip</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* ✅ Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded flex items-center justify-center"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default DriverUpdateModal;