const express = require("express");
const router = express.Router();
const { adddriver, getAllDriver, update } = require("../controller/driverController"); 

router.post("/adddriver", adddriver); 
router.get("/getAllDriver", getAllDriver); 
router.put("update/:id" , update)

module.exports = router;
