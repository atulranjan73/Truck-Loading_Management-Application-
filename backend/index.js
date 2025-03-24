const express = require("express");
require("dotenv").config();
const cors = require("cors"); 
const ConnectionDB = require("./config/db");
const userRoutes = require("./router/userRoutes");
const driverRoutes = require("./router/driverRouter");
const warehouseRoute = require("./router/warehouseRouter");

const app = express();

// Middleware
app.use(cors()); 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Server Port
const port = process.env.PORT || 5000;

// Connect to DB and Start Server
ConnectionDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`🚀 Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("❌ MongoDB connection failed:", error);
  });



// Routes
app.use("/api/users", userRoutes); 
app.use("/api/driver", driverRoutes); 
app.use("/api/warehouse", warehouseRoute); 

