const mongoose = require("mongoose");

const BoutiqueSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    editors: [{ editor: { type: mongoose.Schema.Types.ObjectId, ref: "user" } }],
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
    },
    website: {
      type: String,
    },
    telephone: {
      type: String,
    },
    address: {
      line: {
        type: String,
      },
      region: {
        type: String,
      },
      city: {
        type: String,
      },
      zipcode: {
        type: String,
      },
    },
    photo: {
      type: String,
    },
    photocouverture: {
      type: String,
    },
    status: {
      // 0 Inactive - 1 Active
      type: String,
      default: 0,
    },
    nature: {
      /** 0:free,1:pro */
      type: String,
      default: 0,
    },
    type: {
      /** 0: Detail, 1:gros */
      type: String,
      default: 0,
    },
    fraislivraison: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = Boutique = mongoose.model("boutique", BoutiqueSchema);
