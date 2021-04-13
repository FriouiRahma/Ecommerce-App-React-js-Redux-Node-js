const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Section = require("../models/Sectiontype1");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const checkObjectId = require("../middleware/checkObjectId");
const mongoose = require("mongoose");
const Product = require("../models/Product");
const base64Img = require("base64-img");

router.post(
  "/addSection",
  authAdmin,
  [
    [ 
      check("name", "Name is required").not().isEmpty(),
      check("titre", "Title is required").not().isEmpty(),
      check("productID", "productID is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {name, titre, productID } = req.body;
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
      const section = new Section({
        name,
        titre,
        productID,
      });
      sec = await section.save();
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

router.get("/getsections", async (req, res) => {
  try {
    // const sections = await Section.find().populate("productID");
    const sections = await Section.find().populate({
      path: "productID",
      populate: { path: "boutique" },
     
    }).populate("idsource_user");
    res.json(sections);
  } catch (err) {
    console.error(err.message);
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

  const { titre, productID } = req.body;
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
  if (productID) SectionFields.productID = productID;
  try {
    const sectionupdated = await Section.findByIdAndUpdate(
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
/**********************************************************************/
// @route     DELETE /api/sections/deletesection/:id
// @desc      DELETE Section
// @access   ADMIN
/***************************l*******************************************/

router.delete("/deletesection/:id", [authAdmin, checkObjectId("id")], async (req, res) => {
  try {
    const section = await Section.findById(req.params.id);
    if (!section) {
      return res.status(404).json({ msg: "section not found" });
    }
    await section.remove();
    res.json({ msg: "Section removed" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
