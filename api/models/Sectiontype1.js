const mongoose = require("mongoose");

const SectionSchema = new mongoose.Schema(
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
    productID: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],
    
  },

  { timestamps: true }
);

module.exports = Sectiontype1 = mongoose.model("sectiontype1", SectionSchema);
