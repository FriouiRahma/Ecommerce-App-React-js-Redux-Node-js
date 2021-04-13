const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const authAdmin = require("../middleware/authAdmin");
const auth = require("../middleware/auth");
const Boutique = require("../models/Boutique");
const User = require("../models/User");
const mongoose = require("mongoose");

const checkObjectId = require("../middleware/checkObjectId");
const base64Img = require("base64-img");

/**********************************************************************/
// @route   GET api/boutiques
// @desc    Get all boutiques
// @access  Public
/**********************************************************************/

router.get("/", async (req, res) => {
  try {
    const boutiques = await Boutique.find();

    res.json(boutiques);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//get boutiques by admin with users

router.get("/boutuser", authAdmin, async (req, res) => {
  try {
    const boutiques = await Boutique.find().populate("user");

    res.json(boutiques);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/**********************************************************************/
// @route   POST api/boutiques/add
// @desc    Add new boutique
// @access  Private Admin
/***************************l*******************************************/

router.post(
  "/add",
  authAdmin,
  [
    [
      check("user", "User is required").not().isEmpty(),
      check("name", "Boutique name is required").not().isEmpty(),
      check("telephone", "Telephone is required").not().isEmpty(),

      check("line", "Address line is required").not().isEmpty(),
      check("region", "Region is required").not().isEmpty(),
      check("city", "City is required").not().isEmpty(),
      check("zipcode", "Zipcode is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { user, name, website, telephone, line, region, city, zipcode, photo } = req.body;

    if (mongoose.Types.ObjectId.isValid(user)) {
      await User.findById(user, function (err, existingUser) {
        if (!err && existingUser) {
          newUser = user;
        } else {
          newUser = "0";
        }
      });
    } else {
      newUser = "0";
    }

    if (newUser === 0) {
      return res.status(400).json({ errors: [{ msg: "Invalid User" }] });
    }

    const addresses = { line, region, city, zipcode };

    const boutiqueFields = {};

    if (telephone) boutiqueFields.telephone = telephone;
    if (website) boutiqueFields.website = website === "" ? "" : normalize(website, { forceHttps: false });

    boutiqueFields.address = addresses;
    boutiqueFields.user = newUser;
    boutiqueFields.name = name;
    try {
      let boutiqueName = await Boutique.findOne({ name });
      if (boutiqueName) {
        return res.status(400).json({ errors: [{ msg: "Boutique name already exists" }] });
      }

      boutique = new Boutique(boutiqueFields);
      await boutique.save();
      res.send(boutique);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

/**********************************************************************/
// @route   POST api/boutiques/activate-boutique
// @desc    Activate boutique
// @access  Private Admin
/**********************************************************************/

router.put("/activate-boutique/:id", [authAdmin, checkObjectId("id")], async (req, res) => {
  const { id } = req.params;
  try {
    let boutique = await Boutique.findById(id);
    if (boutique) {
      //Update
      boutique1 = await Boutique.findByIdAndUpdate(id, { $set: { status: 1 } }, { new: true });
      res.json(boutique1);
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

/**********************************************************************/
// @route   POST api/boutiques/desactivate-boutique
// @desc    Desactivate boutique
// @access  Private Admin
/**********************************************************************/

router.put("/desactivate-boutique/:id", [authAdmin, checkObjectId("id")], async (req, res) => {
  const { id } = req.params;
  try {
    let boutique = await Boutique.findById(id);
    if (boutique) {
      //Update
      boutique1 = await Boutique.findByIdAndUpdate(id, { $set: { status: 0 } }, { new: true });
      res.json(boutique1);
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

/**************** boutique's user can remove Editor  */

router.put("/deletecommercial/:id", [auth, checkObjectId("id")], async (req, res) => {
  const { id } = req.params;
  const { idediteur } = req.body;
  //console.log("id editors", idediteur);
  //console.log("req.body", req.body);

  try {
    let boutique = await Boutique.findById(id);
    const editors = boutique.editors;
    editors.map((el) => console.log(el.editor));
    //console.log("ancientEditors", editors);
    const newEditors = editors.filter((el) => el.editor != idediteur);
    //console.log("newEditors", newEditors);
    if (boutique) {
      //Updadte with adding commercial
      boutique1 = await Boutique.findByIdAndUpdate(id, { $set: { editors: newEditors } }, { new: true });
      res.json(boutique1);
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

/***************************************************** */

/********** boutique's user can add Editor */
router.put("/addcommercial/:id", [auth, checkObjectId("id")], async (req, res) => {
  const { id } = req.params;
  const { editors } = req.body;
  const array = editors.map((el) => {
    return { editor: el };
  });
  console.log(array);

  array.forEach(async (element) => {
    if (!mongoose.Types.ObjectId.isValid(element.editor)) return res.status(400).json({ errors: [{ msg: "Invalid ID" }] });
    const user = await User.findById(element.editor);
    if (!user) {
      return res.status(404).json({ errors: [{ msg: "Not a user" }] });
    }

    let finalEditor = [];
    let edit = false;
    try {
      let boutique = await Boutique.findById(id);
      const editors = boutique.editors;
      array.forEach((element) => {
        editors.length !== 0 &&
          editors.forEach((el, index) => {
            if (el.editor == element.editor) {
              edit = true;
              return res.status(404).json({ errors: [{ msg: "Editor exists" }] });
            }
          });
        if (edit === false) {
          editors.push(element);
        }
      });
      console.log("finalEditor", finalEditor);
      console.log("boutique", editors);
      //Updadte with adding commercial
      boutique1 = await Boutique.findByIdAndUpdate(id, { $set: { editors } }, { new: true });
      res.json(boutique1);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  });
});
/***************************************** */
router.get("/test", async (req, res) => {
  const imageData = "";
  const uploadFolder = "uploads/";
  const filename = "boutique_" + Date.now().toString();

  base64Img.img(imageData, "", uploadFolder + filename, function (err, filepath) {
    if (err) {
      console.log(err);
    }
    res.send(filepath);
  });
});

/**********************FR/08/07/2020************************************************/
// @route   POST api/boutiques/addboutique
// @desc    Add new boutique
// @access  Private client
/***************************l*******************************************/
router.post(
  "/addboutique",
  auth,
  [
    [
      check("name", "name is required").not().isEmpty(),
      check("description", "description is required").not().isEmpty(),
      check("telephone", "telephone is required").not().isEmpty(),
      check("address", "address is required").not().isEmpty(),
      check("region", "region is required").not().isEmpty(),
      check("city", "city is required").not().isEmpty(),
      check("fraislivraison", "fraislivraison is required").not().isEmpty(),
      check("photo", "photo is required").not().isEmpty(),
      check("photocouverture", "photocouverture is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, description, website, telephone, address, region, city, photo, photocouverture, type, fraislivraison } = req.body;
    try {
      const boutiqueName = await Boutique.findOne({ name });
      if (boutiqueName) {
        return res.status(400).json({ errors: [{ msg: "Boutique name already exists" }] });
      }
      const uploadFolder = "uploads/";
      const imageData = photo;

      const filename = "boutique_" + req.user.id.toString() + "_" + Date.now().toString();
      base64Img.imgSync(imageData, "", uploadFolder + filename);

      const imageData1 = photocouverture;

      const filename1 = "boutique_" + req.user.id.toString() + "_" + Date.now().toString();

      base64Img.imgSync(imageData1, "", uploadFolder + filename1);

      const boutique = new Boutique({
        name,
        description,
        website,
        telephone,
        address,
        region,
        city,
        photo: filename + ".jpg",
        photocouverture: filename1 + ".jpg",
        type,
        fraislivraison,
        user: req.user.id,
      });
      bout = await boutique.save();
      res.json(bout);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);

/**********************FR/26/08/2020************************************************/
// @route   POST api/boutiques/addboutadmin
// @desc    Add new boutique
// @access  ADMIN
/***************************l*******************************************/
router.post(
  "/addboutadmin",
  authAdmin,
  [
    [
      check("user", "user is required").not().isEmpty(),
      check("name", "name is required").not().isEmpty(),
      check("website", "website is required").not().isEmpty(),
      check("telephone", "telephone is required").not().isEmpty(),
      check("address", "address is required").not().isEmpty(),
      check("region", "region is required").not().isEmpty(),
      check("city", "city is required").not().isEmpty(),
      check("photo", "photo is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { user, name, website, telephone, address, region, city, photo } = req.body;
    try {
      const boutiqueName = await Boutique.findOne({ name });
      if (boutiqueName) {
        return res.status(400).json({ errors: [{ msg: "Boutique name already exists" }] });
      }

      const imageData = photo;
      const uploadFolder = "uploads/";
      const filename = "boutique_" + req.user.id.toString() + "_" + Date.now().toString();

      base64Img.imgSync(imageData, "", uploadFolder + filename);

      const boutique = new Boutique({
        user,
        name,
        website,
        telephone,
        address,
        region,
        city,
        photo: filename + ".jpg",
      });
      bout = await boutique.save();
      res.json(bout);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);

/******************FR/08/07/2020****************************************************/
// @route   Update api/boutiques/updateC
// @desc    Update existed boutique
// @access  Private client
/***************************l*******************************************/
router.put("/:id", auth, async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).send("Error Boutique ID");
  }
  BoutiqueId = id;

  const { name, editors, description, website, telephone, fraislivraison, type, photo, photoUpdated, photoUpdatedcouverture } = req.body;
  let BoutiqueFields = {};
  if (photoUpdated) {
    const imageData = photoUpdated;
    const uploadFolder = "uploads/";
    const filename = "boutique_" + req.user.id.toString() + "_" + Date.now().toString();
    base64Img.imgSync(imageData, "", uploadFolder + filename);
    BoutiqueFields.photo = filename + ".jpg";
  }
  if (photoUpdatedcouverture) {
    const imageData1 = photoUpdatedcouverture;
    const uploadFolder = "uploads/";
    const filename1 = "boutique_" + req.user.id.toString() + "_" + Date.now().toString();
    base64Img.imgSync(imageData1, "", uploadFolder + filename1);
    BoutiqueFields.photocouverture = filename1 + ".jpg";
  }

  // if (name) BoutiqueFields.name = name;
  if (website) BoutiqueFields.website = website;
  if (description) BoutiqueFields.description = description;
  if (telephone) BoutiqueFields.telephone = telephone;
  if (fraislivraison) BoutiqueFields.fraislivraison = fraislivraison;
  if (type) BoutiqueFields.type = type;
  if (editors) BoutiqueFields.editors = editors;

  //test if boutique exist
  try {
    const boutt = await Boutique.findById(BoutiqueId);
    if (!boutt) {
      res.json({ msg: "Boutique not found" });
    }

    if (boutt.user.toString() !== req.user.id) {
      res.json({ msg: "not authorized" });
    }

    const boutupdated = await Boutique.findByIdAndUpdate(BoutiqueId, { $set: BoutiqueFields }, { new: true });
    res.json(boutupdated);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

/**********************FR/10/07/2020************************************************/
// @route     GET api/boutiques/boutique/:id
// @desc      GET A SPESEFIC BOUTQUE
// @access    PUBLIC ROUTE  BOUTIQUE
/***************************l*******************************************/
router.get("/boutique/:id", checkObjectId("id"), async (req, res) => {
  try {
    const boutique = await Boutique.findById(req.params.id);
    if (!boutique) {
      res.status(404).json({ msg: "Boutique not found" });
    }
    res.json(boutique);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});
/**********************FR/13/07/2020************************************************/
// @route     GET api/boutiques/boutique_user
// @desc      GET A SPESEFIC BOUTQUE
// @access    PRIVATE ROUTE  BOUTIQUE
/***************************l*******************************************/
router.get("/boutique_user", auth, async (req, res) => {
  try {
    // tableau of objects "editors.editor"
    const bouti = await Boutique.find({ user: req.user.id }).populate("editors.editor");

    // bout renvoie un tableau
    if (!bouti) {
      res.status(404).json({ msg: "have not any boutique" });
    }
    res.json(bouti);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});
// delete boutique by admin
router.delete("/deletebout/:id", [authAdmin, checkObjectId("id")], async (req, res) => {
  try {
    const bout = await Boutique.findById(req.params.id);
    if (!bout) {
      return res.status(404).json({ msg: "Boutique not found" });
    }
    await bout.deleteOne();
    res.json({ msg: "Boutique removed" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

//update boutique by admin
router.put("/updateboutadmin/:id", authAdmin, async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).send("Error Boutique ID");
  }
  BoutiqueId = id;

  const { name, website, telephone, photo, photoUpdated } = req.body;
  let BoutiqueFields = {};
  if (photoUpdated) {
    const imageData = photoUpdated;
    const uploadFolder = "uploads/";
    const filename = "boutique_" + req.user.id.toString() + "_" + Date.now().toString();
    base64Img.imgSync(imageData, "", uploadFolder + filename);
    BoutiqueFields.photo = filename + ".jpg";
  }

  if (name) BoutiqueFields.name = name;
  if (website) BoutiqueFields.website = website;
  if (telephone) BoutiqueFields.telephone = telephone;

  //test if boutique exist
  try {
    const boutt = await Boutique.findById(BoutiqueId);
    if (!boutt) {
      res.json({ msg: "Boutique not found" });
    }

    const boutupdated = await Boutique.findByIdAndUpdate(BoutiqueId, { $set: BoutiqueFields }, { new: true });
    res.json(boutupdated);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
