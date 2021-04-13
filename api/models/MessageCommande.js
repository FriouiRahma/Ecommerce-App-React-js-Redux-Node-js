const mongoose = require("mongoose");
const MessageCommandeSchema = new mongoose.Schema(
  {
    source: {
      type: String,
      required: true,
    },
    id_commande: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "commande",
    },
    idsource_user:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    contenu: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = MessageCommande = mongoose.model("messagecommande", MessageCommandeSchema);
