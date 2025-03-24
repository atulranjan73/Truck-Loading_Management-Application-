const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  vehicleNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  capacity: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["available", "on_trip", "maintenance"], // Fixed spelling
    default: "available",
  },
});

module.exports = mongoose.model("Vehicle", vehicleSchema);
