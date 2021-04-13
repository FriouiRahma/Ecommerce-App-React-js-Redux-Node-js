const mongoose = require("mongoose");

const Sectiontype6Schema = new mongoose.Schema(
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
    name1: { type: String },
    paragraphe1: { type: String },
    image1: { type: String },
    name2: { type: String },
    paragraphe2: { type: String },
    image2: { type: String },
  },

  { timestamps: true }
);

module.exports = Sectiontype6 = mongoose.model("Sectiontype6", Sectiontype6Schema);
