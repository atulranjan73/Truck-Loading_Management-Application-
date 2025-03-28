const express = require("express");
const { AddTruck, GetAllTrucks, GetTruckById, UpdateTruck, DeleteTruck } = require("../controller/TruckController");

const router = express.Router();

// Truck Routes
router.post("/add", AddTruck); // Add Truck
router.get("/", GetAllTrucks); // Get All Trucks
router.get("/:id", GetTruckById); // Get Truck by ID
router.put("/update/:id", UpdateTruck); // Update Truck
router.delete("/delete/:id", DeleteTruck); // Delete Truck

module.exports = router;
