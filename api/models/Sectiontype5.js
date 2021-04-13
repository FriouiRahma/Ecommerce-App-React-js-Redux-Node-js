const mongoose = require("mongoose");

const Sectiontype5Schema = new mongoose.Schema(
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
    liensite1:{type:String},
    publicite1: { type: String },
    liensite2:{type:String},
    publicite2: { type: String },
    liensite3:{type:String},
    publicite3: { type: String }
    ,
    
  },

  { timestamps: true }
);

module.exports = Sectiontype5 = mongoose.model("Sectiontype5", Sectiontype5Schema);
