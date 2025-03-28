const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    role: {
      type: String,
      enum: ["driver", "warehouse" ,"admin"],
      default: "driver"
    },
    password: {
      type: String,
      required: true
    }
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

const User = mongoose.model("users", UserSchema);

module.exports = User;
