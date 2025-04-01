const { findByIdAndUpdate } = require("../models/driver.model");
const warehouse = require("../models/warehouse.model");

exports.addwarehouse = async (req, res) => {
  try {
    const { warehouseName, location, phone, manager } = req.body;

    const existingWareHouse = await warehouse.findOne({ location });

    if (existingWareHouse) {
      return res.status(400).json({
        message: "WareHouse is already addded",
      });
    }
    const newWareHouse = new warehouse({
      warehouseName,
      location,
      phone,
      manager,
    });
    newWareHouse.save();
    return res.status(201).json({
      message: "WareHouse register successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.getAllWarehouse = async (req, res) => {
  try {
    const warehouses = await warehouse.find();
    return res.status(200).json({
      message: "fetch warehouse successfully",
      warehouses,
    });
  } catch (error) {
    console.log("Internal server error", error);
    return res.status(500).json({
      message: "internal server eroor ",
      error: error.message,
    });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const updatedata = req.body;

  try {
    const iswarehouse = await warehouse.findById(id);
    if (!iswarehouse) {
      return res.status(404).json({
        message: "warehouse is not found",
      });
    }
    const updateWarehouse = await warehouse.findByIdAndUpdate(id, updatedata, {
      new: true,
    });
    return res.status(200).json({
      success: true,
      message: "update Successfully",
      data: updateWarehouse,
    });
  } catch (error) {
    return res.status(500).json({
      success: true,
      message: "failed updating Warehouse",
      error: error.message,
    });
  }
};
