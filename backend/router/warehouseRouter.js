const express = require("express");
const warehouse = require("../controller/warehousecontroller") 

const Router = express.Router();

Router.post("/addwarehouse" ,warehouse.addwarehouse )
Router.get("/getAllWarehouse" ,warehouse.getAllWarehouse)
Router.put("/update/:id" ,warehouse.update)

module.exports = Router ;