const Truck = require("../models/TruckModel");

// Add Truck
exports.AddTruck = async (req, res) => {
  const { truckNumber, capacity, assignedDriver } = req.body;

  try {
    // Check if the truck already exists
    const existingTruck = await Truck.findOne({ truckNumber });

    if (existingTruck) {
      return res.status(400).json({ message: "Truck Already Added..." });
    }

    // Create a new truck
    const newTruck = new Truck({
      truckNumber,
      capacity,
      assignedDriver: assignedDriver ? assignedDriver : null, // Ensure assignedDriver is an ObjectId
    });

    await newTruck.save();

    return res.status(201).json({
      message: "Truck Added Successfully",
      truck: newTruck,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get All Trucks
exports.GetAllTrucks = async (req, res) => {
  try {
    const trucks = await Truck.find().populate("assignedDriver"); // Populate driver details
    return res.status(200).json(trucks);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get Single Truck by ID
exports.GetTruckById = async (req, res) => {
  try {
    const truck = await Truck.findById(req.params.id).populate("assignedDriver");

    if (!truck) {
      return res.status(404).json({ message: "Truck not found" });
    }

    return res.status(200).json(truck);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Update Truck
exports.UpdateTruck = async (req, res) => {
  const { truckNumber, capacity, status, assignedDriver } = req.body;

  try {
    const truck = await Truck.findById(req.params.id);

    if (!truck) {
      return res.status(404).json({ message: "Truck not found" });
    }

    truck.truckNumber = truckNumber || truck.truckNumber;
    truck.capacity = capacity || truck.capacity;
    truck.status = status || truck.status;
    truck.assignedDriver = assignedDriver ? assignedDriver : truck.assignedDriver;

    const updatedTruck = await truck.save();

    return res.status(200).json({
      message: "Truck Updated Successfully",
      truck: updatedTruck,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Delete Truck
exports.DeleteTruck = async (req, res) => {
  try {
    const truck = await Truck.findById(req.params.id);

    if (!truck) {
      return res.status(404).json({ message: "Truck not found" });
    }

    await Truck.findByIdAndDelete(req.params.id);

    return res.status(200).json({ message: "Truck Deleted Successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
