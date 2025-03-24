import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addwarehouse } from "../Redux/Feature/warehouseSlice";
import { addDriver } from "../Redux/Feature/driverSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Ensure toast styles are applied

function AddUser() {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(null);

  const [driverData, setDriverData] = useState({
    name: "",
    license: "",
    phone: "",
  });

  const [warehouseData, setWarehouseData] = useState({
    warehouseName: "",
    location: "",
    manager: "",
    phone: "",
  });

  const handleDriverChange = (e) => {
    setDriverData({ ...driverData, [e.target.name]: e.target.value });
  };

  const handleWarehouseChange = (e) => {
    setWarehouseData({ ...warehouseData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e, type) => {
    e.preventDefault();
    if (type === "driver") {
      dispatch(addDriver(driverData));
      toast.success("Driver added successfully!"); // Show toast before clearing state
      setDriverData({ name: "", license: "", phone: "" });
    } else if (type === "warehouse") {
      dispatch(addwarehouse(warehouseData));
      toast.success("Warehouse added successfully!");
      setWarehouseData({ warehouseName: "", location: "", manager: "", phone: "" });
    }
    setShowForm(null);
  };

  return (
    <div className="mt-15 min-h-screen bg-blue-300 py-12 px-4 sm:px-6 lg:px-8 xl:ml-72">
      <h1 className="text-xl font-bold mb-4">Add User Dashboard</h1>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Buttons to Toggle Forms */}
      <div className="flex gap-4 mb-6">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={() => setShowForm("driver")}
        >
          Add Driver
        </button>
        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          onClick={() => setShowForm("warehouse")}
        >
          Add Warehouse
        </button>
      </div>

      {/* Driver Form */}
      {showForm === "driver" && (
        <form onSubmit={(e) => handleSubmit(e, "driver")} className="bg-white p-4 rounded shadow-md w-96">
          <h2 className="text-lg font-semibold mb-3">Add Driver</h2>
          <input
            type="text"
            name="name"
            placeholder="Driver Name"
            className="w-full p-2 border rounded mb-2"
            value={driverData.name}
            onChange={handleDriverChange}
            required
          />
          <input
            type="text"
            name="license"
            placeholder="License Number"
            className="w-full p-2 border rounded mb-2"
            value={driverData.license}
            onChange={handleDriverChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            className="w-full p-2 border rounded mb-2"
            value={driverData.phone}
            onChange={handleDriverChange}
            required
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Submit
          </button>
        </form>
      )}

      {/* Warehouse Form */}
      {showForm === "warehouse" && (
        <form onSubmit={(e) => handleSubmit(e, "warehouse")} className="bg-white p-4 rounded shadow-md w-96">
          <h2 className="text-lg font-semibold mb-3">Add Warehouse</h2>
          <input
            type="text"
            name="warehouseName"
            placeholder="Warehouse Name"
            className="w-full p-2 border rounded mb-2"
            value={warehouseData.warehouseName}
            onChange={handleWarehouseChange}
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            className="w-full p-2 border rounded mb-2"
            value={warehouseData.location}
            onChange={handleWarehouseChange}
            required
          />
          <input
            type="text"
            name="manager"
            placeholder="Manager Name"
            className="w-full p-2 border rounded mb-2"
            value={warehouseData.manager}
            onChange={handleWarehouseChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Manager Phone No"
            className="w-full p-2 border rounded mb-2"
            value={warehouseData.phone}
            onChange={handleWarehouseChange}
            required
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

export default AddUser;
