const mongoose = require("mongoose");

const Sectiontype2Schema = new mongoose.Schema(
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
    video:{
        type:String,
        required:true,
        //maxlength:32,
    },
    
  },

  { timestamps: true }
);

module.exports = Sectiontype2 = mongoose.model("sectiontype2", Sectiontype2Schema);
