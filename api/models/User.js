const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
    },
    status: {
      // 0 Inactive - 1 Active
      type: String,
      required: true,
    },
    role: {
      // 0:User - 1:Admin
      type: String,
      default: 0,
    },
    resetid: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = User = mongoose.model("user", UserSchema);
