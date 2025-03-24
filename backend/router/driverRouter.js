const express = require("express");
const router = express.Router();
const { adddriver, getAllDriver } = require("../controller/driverController"); 

router.post("/adddriver", adddriver); 
router.get("/getAllDriver", getAllDriver); 

module.exports = router;
