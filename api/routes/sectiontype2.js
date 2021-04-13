const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const checkObjectId = require("../middleware/checkObjectId");
const Sectiontype2=require("../models/Sectiontype2")
const authAdmin = require("../middleware/authAdmin");
const mongoose = require("mongoose");
const Product = require("../models/Product");


router.post(
  "/addSection2",
  authAdmin,
  [
    [ 
      check("name", "Name is required").not().isEmpty(),
      check("titre", "Title is required").not().isEmpty(),
      check("productID", "productID is required").not().isEmpty(),
      check("video", "video is required").not().isEmpty(),
     
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {name, titre, productID,video } = req.body;
    try {
      productID.forEach(async (element) => {
        if (!mongoose.Types.ObjectId.isValid(element)) {
          return res.status(400).json({ errors: [{ msg: "Invalid ID" }] });
        }
        const produ = await Product.findById(element);
        if (!produ) {
          return res.status(404).json({ errors: [{ msg: "Product not found" }] });
        }
      });
     
      const sectiontype2 = new Sectiontype2({
        name,
        titre,
        productID,
        video,
        
      });
      sec = await sectiontype2.save();
      res.json(sec);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }

    res.error({ msg: "ProductID not valid" });
  }
);

/**********************************************************************/
// @route   GET api/sections/
// @desc    Get all sections
// @access  Public
/**********************************************************************/

router.get("/getsectiontype2", async (req, res) => {
  try {
    const sections = await Sectiontype2.find().populate({
      path: "productID",
      populate: { path: "boutique" }
    })
    res.json(sections);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/**********************************************************************/
// @route     DELETE /api/sections/deletesection/:id
// @desc      DELETE Section
// @access   ADMIN
/***************************l*******************************************/

router.delete("/deletesectiontype2/:id", [authAdmin, checkObjectId("id")], async (req, res) => {
  try {
    const sectiontype2 = await Sectiontype2.findById(req.params.id);
    if (!sectiontype2) {
      return res.status(404).json({ msg: "section not found" });
    }
    await sectiontype2.remove();
    res.json({ msg: "Section removed" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});


/******************FR/11/08/2020****************************************************/
// @route   Update /api/sections/updatesection
// @desc    Update existed sectionadmin
// @access  Admin
/***************************l*******************************************/
router.put("/:id", authAdmin, async (req, res) => {
  const { id } = req.params;

  const { titre,name, productID,video } = req.body;
  //console.log('ggggggggggg',req.body);
  productID.forEach(async (element) => {
    if (!mongoose.Types.ObjectId.isValid(element))
      return res.status(400).json({ errors: [{ msg: "Invalid ID" }] });
    const produ = await Product.findById(element);
    if (!produ) {
      return res.status(404).json({ errors: [{ msg: "Product not found" }] });
    }
  });

  let SectionFields = {};
  if (titre) SectionFields.titre = titre;
  if (name)   SectionFields.name=name;
  if (productID) SectionFields.productID = productID;
  if (video) SectionFields.video=video
  try {
    const sectionupdated = await Sectiontype2.findByIdAndUpdate(
      id,
      { $set: SectionFields },
      { new: true }
    );
    res.json(sectionupdated);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});














module.exports = router;
