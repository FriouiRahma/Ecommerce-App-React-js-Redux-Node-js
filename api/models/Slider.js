const mongoose = require("mongoose");
const SliderSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  photo: { type: String, required: true },
  description: { type: String, required: true, maxlength: 32 },
  lien: { type: String, required: true, maxlength: 32 },
});

module.exports = Slider = mongoose.model("slider", SliderSchema);
