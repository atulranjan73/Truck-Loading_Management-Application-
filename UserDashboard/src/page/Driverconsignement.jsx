import React, { useState } from "react";

const DriverConsignment = () => {
  // Sample Consignments Data
  const [consignments, setConsignments] = useState([
    { id: 1, pickup: "New York", drop: "Los Angeles", time: "10:00 AM", goods: "Electronics", status: "In Transit" },
    { id: 2, pickup: "Chicago", drop: "Houston", time: "2:30 PM", goods: "Furniture", status: "Delivered" },
    { id: 3, pickup: "San Francisco", drop: "Seattle", time: "4:00 PM", goods: "Groceries", status: "Pending" },
  ]);

  // Function to Update Status
  const updateStatus = (id, newStatus) => {
    setConsignments((prev) =>
      prev.map((consignment) =>
        consignment.id === id ? { ...consignment, status: newStatus } : consignment
      )
    );
  };

  return (
    <div className="mt-40 ml-120  bg-gray-100 rounded-lg shadow-md w-full max-w-4xl border">
      <h2 className="text-xl font-semibold mb-4">🚚 Driver Consignments</h2>
      
      {/* Table */}
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Pickup</th>
            <th className="border px-4 py-2">Drop</th>
            <th className="border px-4 py-2">Time</th>
            <th className="border px-4 py-2">Goods</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {consignments.map((consignment) => (
            <tr key={consignment.id} className="text-center">
              <td className="border px-4 py-2">{consignment.id}</td>
              <td className="border px-4 py-2">{consignment.pickup}</td>
              <td className="border px-4 py-2">{consignment.drop}</td>
              <td className="border px-4 py-2">{consignment.time}</td>
              <td className="border px-4 py-2">{consignment.goods}</td>
              <td
                className={`border px-4 py-2 font-bold ${
                  consignment.status === "Delivered"
                    ? "text-green-600"
                    : consignment.status === "In Transit"
                    ? "text-blue-600"
                    : "text-orange-600"
                }`}
              >
                {consignment.status}
              </td>
              <td className="border px-4 py-2">
                {consignment.status !== "Delivered" && (
                  <select
                    className="border p-1 rounded"
                    value={consignment.status}
                    onChange={(e) => updateStatus(consignment.id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Transit">In Transit</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DriverConsignment;
