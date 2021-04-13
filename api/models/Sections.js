const mongoose = require("mongoose");

const SectionsSchema = new mongoose.Schema(
  {
    Type_section: {
      type: String,
    },
    id_sections_type:{
        type: String
    },
    ordere:{
      type:Number,
      unique: true,
    }
    
  },
  { timestamps: true }
);

module.exports = Sections = mongoose.model("globalsection", SectionsSchema);
