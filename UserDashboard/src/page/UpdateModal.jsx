import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  getAllWarehouse,
  updateWarehouse,
} from "../Redux/Feature/warehouseSlice"; 

const UpdateModal = ({ selected, onClose }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    warehouseName: selected?.warehouseName || "",
    location: selected?.location || "",
    manager: selected?.manager || "",
    status: selected?.status || "Active",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading
    try {
      await dispatch(
        updateWarehouse({ _id: selected._id, warehousedata: formData })
      );
      await dispatch(getAllWarehouse());
      onClose();
    } catch (error) {
      console.error("Error updating warehouse:", error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="fixed top-30 left-0 w-full h-screen  bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        {/* ✅ Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Update Warehouse</h2>
          <button onClick={onClose} className="text-red-800 hover:text-red-500">
            ✖
          </button>
        </div>

        {/* ✅ Form Section */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Warehouse Name</label>
            <input
              type="text"
              name="warehouseName"
              value={formData.warehouseName}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Manager</label>
            <input
              type="text"
              name="manager"
              value={formData.manager}
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
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* ✅ Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateModal;
