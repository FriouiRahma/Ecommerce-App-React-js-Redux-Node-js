const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");
const checkObjectId = require("../middleware/checkObjectId");
const MessageCommande = require("../models/MessageCommande");

router.post(
  "/message",
  [
    auth,
    [
      check("contenu", "contenu is required").not().isEmpty(),
      check("source", "source is required").not().isEmpty(),
      check("id_commande", "commande is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { source, id_commande, contenu,idsource_user } = req.body;
    try {
      const message = new MessageCommande({
        source,
        id_commande,
        contenu,
        idsource_user
      });
      mess = await message.save();
      res.json(mess);
    } catch (e) {}
  }
);

// sort({ createdAt: -1 })
//** get messages commandes */
router.get("/getmesscomm", async (req, res) => {
  try {
    const messages = await MessageCommande.find().populate({
      path: "id_commande",
      populate: { path: "product" },
      populate: { path: "user" },
    }).populate("idsource_user");
    res.json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
//** get messages of one commandes */
router.get("/messcomm/:id", async (req, res) => {
  const { id } = req.params.id;
  try {
    const messages = await MessageCommande.find({ id_command: id });
    res.json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
