const express = require("express");
const auth = require("../middleware/auth");
const Product = require("../models/Product");
const Commande = require("../models/Commande");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const mongoose = require("mongoose");
const checkObjectId = require("../middleware/checkObjectId");

/**********************************************************************/
// @route   POST api/commandes/
// @desc    Add commande
// @access  Private
/**********************************************************************/

router.post(
  "/commande",
  [
    auth,
    [
      check("boutique", "boutique is required").not().isEmpty(),
      check("user", "user is required").not().isEmpty(),
      check("nom", "nom is required").not().isEmpty(),
      check("telephone", "telephone is required").not().isEmpty(),
      check("adresse", "telephone is required").not().isEmpty(),
      check("products", "products is required").not().isEmpty(),
      // check("product", "product is  required  ").not().isEmpty(),
      // check("quantity", "quantity is required").not().isEmpty(),
      // check("price", "price is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const { user, nom, telephone, adresse, commandeGroupedByIDbout, frais_livraison, products } = req.body;
    console.log("commandeByboutique", commandeGroupedByIDbout);
    commandeGroupedByIDbout1 = commandeGroupedByIDbout;
    for (const property in commandeGroupedByIDbout1) {
      //console.log(`${property}: ${JSON.stringify(commandeGroupedByIDbout1[property])}`);
      let productss = JSON.stringify([commandeGroupedByIDbout1[property]]);
      //console.log("productss", productss);
      //console.log("JSON.parse(productss)", JSON.parse(productss));
      const prod = JSON.parse(productss);
      const sss = prod[0];
      let netapayer = 0;
      if (frais_livraison) {
        netapayer = frais_livraison;
      }
      sss.map((el) => (netapayer = netapayer + el.prix_unitaire * el.quantite));
      console.log("netapayer", netapayer);
      //console.log("sssssss", sss);

      try {
        let idComm = 1;
        const boutiqueee = await Commande.find({ boutique: property });
        //boutique retourne un tableau
        if (boutiqueee.length != 0) {
          const valeurs = boutiqueee.map((el) => el.idCommande);
          newid = Math.max(...valeurs) + 1;
          idComm = newid;
        }
        const commande = new Commande({
          boutique: property,
          user,
          nom,
          telephone,
          adresse,
          frais_livraison,
          products: sss,
          netapayer,
          idCommande: idComm,
        });
        commande1 = await commande.save();

        res.json(commande1);
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
      }
    }
  }
);
/**********************************************************************/
// @route   POST api/commandes/addcommandesection
// @desc    Add commande
// @access  Private
/**********************************************************************/

router.post(
  "/addcommandesection",
  [
    auth,
    [
      //check("boutique", "boutique is required").not().isEmpty(),
      check("user", "user is required").not().isEmpty(),
      check("nom", "nom is required").not().isEmpty(),
      check("telephone", "telephone is required").not().isEmpty(),
      check("adresse", "telephone is required").not().isEmpty(),
      check("products", "products is required").not().isEmpty(),
      // check("product", "product is  required  ").not().isEmpty(),
      // check("quantity", "quantity is required").not().isEmpty(),
      // check("price", "price is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const { userid, nom, telephone, adress, products, frais_livraison, boutique } = req.body;
    console.log("frais_livraison", frais_livraison);
    let netapayer = 0;
    let total = 0;
    if (frais_livraison) {
      netapayer = frais_livraison;
      total = frais_livraison;
    }
    products.map((el) => (netapayer = frais_livraison + el.prix_unitaire * el.quantite));
    products.map((el) => (total = frais_livraison + el.prix_unitaire * el.quantite));
    //console.log("netapayer", products);

    try {
      let idComm = 1;
      const boutiqueee = await Commande.find({ boutique });
      //boutique retourne un tableau
      if (boutiqueee.length != 0) {
        const valeurs = boutiqueee.map((el) => el.idCommande);
        newid = Math.max(...valeurs) + 1;
        idComm = newid;
      }
      const commande = new Commande({
        boutique,
        user: userid,
        nom,
        telephone,
        adresse: adress,
        frais_livraison,
        products,
        netapayer,
        total,
        idCommande: idComm,
      });
      commande1 = await commande.save();

      res.json(commande1);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

/**************************FR 16/09/2020********************************************/
// @route   Put api/commandes/
// @desc    Update status
// @access  Private
/**********************************************************************/

router.put("/status/:id", [auth, checkObjectId("id")], async (req, res) => {
  const { id } = req.params;

  //test if commande exist
  const { statuss } = req.body;
  try {
    const commande = await Commande.findById(id);
    if (!commande) {
      res.json({ msg: "Commande not found" });
    }
    const comupdated = await Commande.findByIdAndUpdate(id, { $set: { status: statuss } }, { new: true });
    res.json(comupdated);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

/**************************FR 16/09/2020********************************************/
// @route   Put api/commandes/
// @desc    Update status
// @access  Private
/**********************************************************************/

router.put("/prixfinal/:id", [auth, checkObjectId("id")], async (req, res) => {
  const { id } = req.params;

  //test if commande exist
  const { prixfinal } = req.body;
  try {
    const commande = await Commande.findById(id);
    if (!commande) {
      res.json({ msg: "Commande not found" });
    }
    const comupdated = await Commande.findByIdAndUpdate(id, { $set: { netapayer: prixfinal } }, { new: true });
    res.json(comupdated);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

/**************************FR 14/10/2020********************************************/
// @route   Put api/commandes/
// @desc    Update status
// @access  Private
/**********************************************************************/

router.put("/groupstatus", auth, async (req, res) => {
  const { idcommande, statuss } = req.body;
  console.log("req.params", req.body);
  //test if commande exist
  let comupdated = null;
  try {
    idcommande.forEach(async (element) => {
      const commande = await Commande.findById(element);
      if (!commande) {
        res.json({ msg: "Commande not found" });
      }
      comupdated = await Commande.findByIdAndUpdate(element, { $set: { status: statuss } }, { new: true });

      res.json(comupdated);
      //console.log("comupdated",comupdated)
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

/**********************************************************************/
// @route   GET api/commandes/
// @desc    Get all commandes
// @access  Private
/**********************************************************************/

router.get("/", auth, async (req, res) => {
  try {
    // const comman = await Commande.find({ user: req.user.id }).populate({
    //   path: "id_prod",
    //   populate: { path: "boutique" },
    // });
    const comman = await Commande.find({ user: req.user.id })
      .populate("boutique")
      .populate("privatenote.id_user")
      .populate("products.id_prod")
      .populate("user")
      .sort({ createdAt: -1 });

    if (!comman) {
      res.status(400).json({ msg: "you have not commande" });
    }
    res.json(comman);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
//get all commande
router.get("/get-commande", auth, async (req, res) => {
  try {
    // const comms = await Commande.find().populate({
    //   path: "id_prod",
    //   populate: { path: "boutique" },
    // });
    const comms = await Commande.find().populate("boutique").populate("privatenote.id_user").populate("products.id_prod").populate("user").sort({ createdAt: -1 });
    res.json(comms);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// delete commande by user
router.delete("/delcommande/:id", [auth, checkObjectId("id")], async (req, res) => {
  try {
    const commande = await Commande.findById(req.params.id);
    if (!commande) {
      return res.status(404).json({ msg: "Commande not found" });
    }
    await commande.deleteOne();
    res.json({ msg: "Commande removed" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});
//get commande of one boutique

/***********************get commande by status */
router.post("/commandestatus/:id", [auth, checkObjectId("id")], async (req, res) => {
  const { idboutique } = req.body;
  //console.log("idboutique",idboutique)
  try {
    const comstatus = await Commande.find({
      $and: [{ status: req.params.id }, { boutique: idboutique }],
    })
      .populate("boutique")
      .populate("products.id_prod")
      .populate("user");
    if (!comstatus) {
      res.status(404).json({ msg: "No commande founded with this status" });
    }
    res.json(comstatus);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

/********** user can add New Note */
router.put("/addNewNote/:id", [auth, checkObjectId("id")], async (req, res) => {
  const { id } = req.params;
  const { newnote, id_user } = req.body;
  try {
    newnotecom = await Commande.findByIdAndUpdate(id, { $push: { privatenote: { note: newnote, id_user: id_user } } }, { new: true });
    res.json(newnotecom);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});
/********** user can add New track */
router.put("/addNewtracking/:id", [auth, checkObjectId("id")], async (req, res) => {
  const { id } = req.params;
  const { newntacking } = req.body;
  try {
    newtracking = await Commande.findByIdAndUpdate(id, { tracking: newntacking }, { new: true });
    res.json(newtracking);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
