const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  driver: { type: mongoose.Schema.Types.ObjectId, ref: "Driver" },
  truck: { type: mongoose.Schema.Types.ObjectId, ref: "Truck" },
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  goodsType: { type: String, required: true },
  weight: { type: Number, required: true },
  status: { type: String, enum: ["pending", "in_progress", "completed"], default: "pending" },
  startDate: { type: Date },
  endDate: { type: Date },
});

module.exports = mongoose.model("Trip", tripSchema);
