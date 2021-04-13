const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      required: true,
      maxlength: 32,
    },
    order: {
      type: Number,
      default: 0,
    },
    slug: {
      type: String,
    },
    parent: {
      type: String,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = Category = mongoose.model("category", CategorySchema);
