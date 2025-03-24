const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  phone: {
    type: String,
    required: true,
    unique: true,
  },
  license: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    enum: ["available", "on_trip", "inactive"],
    default: "available",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Driver = mongoose.model("Driver", driverSchema);

module.exports = Driver;
