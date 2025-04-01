const Trip = require("../models/trip.model");
const Driver = require("../models/driver.model");
const Truck = require("../models/TruckModel"); 

// Add a new trip
exports.addTrip = async (req, res) => {                                                                                                                                                                                                                                                                      
  try {
    const { driver, truck, origin, destination, goodsType, weight, startDate, endDate } = req.body;

    const trip = new Trip({
      driver,
      truck,
      origin,
      destination,
      goodsType,
      weight,
      startDate,
      endDate,
    });

    await trip.save();
    res.status(201).json({ message: "Trip added successfully", trip });
  } catch (error) {
    res.status(500).json({ message: "Error adding trip", error });
  }
};

// Get all trips with driver and truck details
exports.getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.find().populate("driver truck");
    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({ message: "Error fetching trips", error });
  }
};

// Assign a trip to a driver
exports.assignTrip = async (req, res) => {
  try {
    const { tripId, driverId } = req.body;

    const driver = await Driver.findById(driverId);
    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    const trip = await Trip.findByIdAndUpdate(
      tripId,
      { driver: driverId, status: "in_progress" },
      { new: true }
    ).populate("driver truck");

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    res.status(200).json({ message: "Trip assigned successfully", trip });
  } catch (error) {
    res.status(500).json({ message: "Error assigning trip", error });
  }
};
