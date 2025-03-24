const mongoose = require("mongoose");

const warehouseSchema = new mongoose.Schema({
  warehouseName: {
    type: String,
    required: true,
    trim: true,
  },
  manager: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    enum: ["avilable", "full"],
    default: "avilable",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Warehouse", warehouseSchema);
