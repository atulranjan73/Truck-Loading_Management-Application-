const Driver = require("../models/driver.model"); 
// const mongoose = require("mongoose");


 exports.adddriver = async (req, res) => {
  try {
    const { name, phone, license } = req.body;

    // Check if the driver already exists
    const existingDriver = await Driver.findOne({  license });
    if (existingDriver) {
      return res.status(400).json({
        message: "Driver already registered",
      });
    }

    // Create new driver
    const newDriver = new Driver({
      name,
  
      phone,
      license
    });

    await newDriver.save();

    return res.status(201).json({
      message: "Driver added successfully!",
      driver: newDriver,
    });

  } catch (error) {
    console.error("❌ Error adding driver:", error); 
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

exports.getAllDriver = async(req , res)=>{
 try {
  const drivers =  await Driver.find();
  return res.status(201).json({
    message :"Driver fetch successfully...",
    drivers, 
  })
 } catch (error) {    
  console.log("Error fetching Drivers " , error)
  res.status(500).json({
    message:"Internal server Error ",
    error:error.message
  })
 }
}

exports.update = async (req, res )=>{
const id = req.params ;
console.log(req.body)
const updatedata = req.body;

try {
  const isdriver = await Driver.findById(id)
  if(!isdriver){
    return res.status(404).json({
      success :true ,
      message:"Driver is not found "

    })
  }

  const updateDriver = await Driver.findByIdAndUpdate(id ,updatedata,{
    new :true
  } );
  return res.status(200).json({
    success:true,
    message:"update Successfully...",
    data: updateDriver
  })
} catch (error) {
  return res.status(500).json({
    success:true,
    message:"failed update Driver data ",
    error:error.message 
  })
}
}


