const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      unique: true,
    },
    company: {
      type: String,
    },
    website: {
      type: String,
    },
    gender: {
      type: String,
    },
    birth: {
      type: Date,
    },
    telephone: {
      type: String,
    },
    address: {
      line: {
        type: String,
      },
      region: {
        type: String,
      },
      city: {
        type: String,
      },
      zipcode: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

module.exports = Profile = mongoose.model("profile", ProfileSchema);
