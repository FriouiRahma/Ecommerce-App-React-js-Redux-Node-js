const mongoose = require("mongoose");
const SettingsSchema = new mongoose.Schema(
  {
    name: { type: String},
    value: { type: String },
  },
  { timestamps: true }
);

module.exports = Settings = mongoose.model("Settings", SettingsSchema);
