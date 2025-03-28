const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  phone: { type: String, required: true, unique: true },
  license: { type: String, required: true, unique: true },
  status: { type: String, enum: ["available", "on_trip", "inactive"], default: "available" },
  profileImage: { type: String, default: "default.jpg" },
  assignedTruck: { type: mongoose.Schema.Types.ObjectId, ref: "Truck" },
  assignedTrips: [{ type: mongoose.Schema.Types.ObjectId, ref: "Trip" }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Driver", driverSchema);
