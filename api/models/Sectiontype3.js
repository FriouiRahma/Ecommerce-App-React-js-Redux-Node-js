const mongoose = require("mongoose");

const Sectiontype3Schema = new mongoose.Schema(
  {
    titre: {
      type: String,
      required: true,
      maxlength: 32,
    },
    name: {
      type: String,
      required: true,
      maxlength: 32,
    },
    productID: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],
    video: {
      type: String,
      required: true,
    },
    liensite1: { type: String },
    publicite1: { type: String, required: true },
  },

  { timestamps: true }
);

module.exports = Sectiontype3 = mongoose.model("sectiontype3", Sectiontype3Schema);
