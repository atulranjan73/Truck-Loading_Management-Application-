const mongoose = require("mongoose");

const truckSchema = new mongoose.Schema(
  {
    truckNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    capacity: {
    
        type: Number, // In kilograms or tons
        required: true,
    },
    status: {
      type: String,
      enum: ["Available", "On Trip", "In Maintenance"],
      default: "Available",
    },
    assignedDriver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver", // Reference to the Driver model
      default: null,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Truck", truckSchema);
