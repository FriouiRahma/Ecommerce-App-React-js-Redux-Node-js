const mongoose = require("mongoose");

const Sectiontype4Schema = new mongoose.Schema(
  {
    titre: {
      type: String,
      required: true,
      maxlength: 32,
    },
    name:{
      type:String,
      required:true,
      maxlength:32,
    }
    ,
    image: { type: String },
    liensite:{type:String}
    
  },

  { timestamps: true }
);

module.exports = Sectiontype4 = mongoose.model("sectiontype4", Sectiontype4Schema);
