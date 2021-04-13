const mongoose = require("mongoose");

const CommandeSchema = new mongoose.Schema(
  {
    boutique: { type: mongoose.Schema.Types.ObjectId, ref: "boutique" },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    tracking: {type: String },
    privatenote: [{ id_user: { type: mongoose.Schema.Types.ObjectId, ref: "user" }, note: { type: String }, date: { type: Date, default: Date.now } }],
    nom: {
      type: String,
      required: true,
    },
    telephone: {
      type: String,
      required: true,
    },
    adresse: {
      type: String,
    },
    products: [
      {
        id_prod: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
        },
        prix_unitaire: {
          type: Number,
          trim: true,
        },
        quantite: {
          type: Number,
          trim: true,
        },
      },
    ],
    frais_livraison: {
      type: Number,
    },
    total: {
      type: Number,
    },
    status: {
      // 0 En Attente // 1 livré
      type: String,
      default: 0,
      //required: true,
    },
    netapayer: {
      type: Number,
    },
    idCommande: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = Commande = mongoose.model("commande", CommandeSchema);
