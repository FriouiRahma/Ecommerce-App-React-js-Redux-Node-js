const mongoose = require("mongoose");
const StatusSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    couleur: { type: String, required: true, unique: true },
    id_boutique: { type: String, required: true },
    next_status:[{type:String}]
  },
  { timestamps: true }
);

module.exports = Status = mongoose.model("status", StatusSchema);
