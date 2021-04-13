const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    boutique: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "boutique",
    },
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 200,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
      maxlength: 32,
    },
    tarifpromo: {
      type: Number,
      maxlength: 32,
    },
    codeabarre: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    quantitestock: {
      type: Number,
      required: true,
      maxlength: 32,
    },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "category" }],
    caracteristique: [{ libelle: { type: String }, value: [{ type: String }] }],
    // imageproduit: { type: String },
    photo: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = Product = mongoose.model("product", ProductSchema);
