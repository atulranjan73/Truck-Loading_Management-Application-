import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { assignTrip, getAllTrips } from "../Redux/Feature/TripSlice";
import {getAllDriver} from "../Redux/Feature/driverSlice";
import { fetchTrucks } from "../Redux/Feature/TruckSlice";

function AssignTripModal({ driver, onClose }) {
  const dispatch = useDispatch();

  // Fetch trips, drivers, and trucks
  const { trips, loading } = useSelector((state) => state.trip);
  const { drivers } = useSelector((state) => state.driver);
  const { trucks } = useSelector((state) => state.truck);

  const [selectedTrip, setSelectedTrip] = useState("");
  const [selectedTruck, setSelectedTruck] = useState("");
  const [selectedDriver, setSelectedDriver] = useState(driver?._id || "");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [goodsType, setGoodsType] = useState("");
  const [weight, setWeight] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    dispatch(getAllTrips());
    dispatch(getAllDrivers());
    dispatch(fetchTrucks());
  }, [dispatch]);

  const handleAssign = async () => {
    if (!selectedTrip || !selectedTruck || !selectedDriver || !origin || !destination || !goodsType || !weight) {
      alert("Please fill all required fields.");
      return;
    }

    const tripData = {
      tripId: selectedTrip,
      driverId: selectedDriver,
      truckId: selectedTruck,
      origin,
      destination,
      goodsType,
      weight,
      startDate,
      endDate,
    };

    await dispatch(assignTrip(tripData));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Assign Trip</h2>

        {/* Select Driver */}
        <label className="block text-gray-700">Select Driver</label>
        <select
          className="w-full p-2 border rounded-lg mb-3"
          value={selectedDriver}
          onChange={(e) => setSelectedDriver(e.target.value)}
        >
          <option value="">Select a Driver</option>
          {drivers.map((d) => (
            <option key={d._id} value={d._id}>
              {d.name} (License: {d.license})
            </option>
          ))}
        </select>

        {/* Select Truck */}
        <label className="block text-gray-700">Select Truck</label>
        <select
          className="w-full p-2 border rounded-lg mb-3"
          value={selectedTruck}
          onChange={(e) => setSelectedTruck(e.target.value)}
        >
          <option value="">Select a Truck</option>
          {trucks.map((t) => (
            <option key={t._id} value={t._id}>
              {t.numberPlate} ({t.model})
            </option>
          ))}
        </select>

        {/* Select Trip */}
        <label className="block text-gray-700">Select a Trip</label>
        {loading ? (
          <p>Loading trips...</p>
        ) : (
          <select
            className="w-full p-2 border rounded-lg mb-3"
            value={selectedTrip}
            onChange={(e) => setSelectedTrip(e.target.value)}
          >
            <option value="">Select a Trip</option>
            {trips
              .filter((trip) => trip.status === "pending")
              .map((trip) => (
                <option key={trip._id} value={trip._id}>
                  {trip.origin} ➝ {trip.destination} ({trip.goodsType})
                </option>
              ))}
          </select>
        )}

        {/* Origin */}
        <label className="block text-gray-700">Origin</label>
        <input
          type="text"
          className="w-full p-2 border rounded-lg mb-3"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
        />

        {/* Destination */}
        <label className="block text-gray-700">Destination</label>
        <input
          type="text"
          className="w-full p-2 border rounded-lg mb-3"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />

        {/* Goods Type */}
        <label className="block text-gray-700">Goods Type</label>
        <input
          type="text"
          className="w-full p-2 border rounded-lg mb-3"
          value={goodsType}
          onChange={(e) => setGoodsType(e.target.value)}
        />

        {/* Weight */}
        <label className="block text-gray-700">Weight (kg)</label>
        <input
          type="number"
          className="w-full p-2 border rounded-lg mb-3"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />

        {/* Start Date */}
        <label className="block text-gray-700">Start Date</label>
        <input
          type="date"
          className="w-full p-2 border rounded-lg mb-3"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        {/* End Date */}
        <label className="block text-gray-700">End Date</label>
        <input
          type="date"
          className="w-full p-2 border rounded-lg mb-3"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

        <div className="flex justify-between mt-4">
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleAssign}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Assign Trip
          </button>
        </div>
      </div>
    </div>
  );
}

export default AssignTripModal;
