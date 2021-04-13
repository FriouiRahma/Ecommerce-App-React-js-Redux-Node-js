const mongoose = require("mongoose");
const LikeSchema = new mongoose.Schema(
  {
    productt: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  },
  { timestamps: true }
);

LikeSchema.index(
  {
    productt: 1,
    user: 1,
  },
  {
    unique: true,
  }
);

module.exports = Like = mongoose.model("like", LikeSchema);
