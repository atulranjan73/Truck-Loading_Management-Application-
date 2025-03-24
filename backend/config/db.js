const mongoose = require("mongoose")

const ConnectionDB = async()=>{
    try {
     await mongoose.connect(process.env.MONGO_URI);
     console.log("MongoDb is connected")
    } catch (error) {
        console.log("Mongodb connection failed..." ,error)
    }
}

module.exports = ConnectionDB