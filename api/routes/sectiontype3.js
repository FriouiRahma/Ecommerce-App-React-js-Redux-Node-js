const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Sectiontype3 = require("../models/Sectiontype3");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const checkObjectId = require("../middleware/checkObjectId");
const mongoose = require("mongoose");
const Product = require("../models/Product");
const base64Img = require("base64-img");

router.post(
  "/addSection3",
  authAdmin,
  [
    [
      check("name", "Name is required").not().isEmpty(),
      check("titre", "Title is required").not().isEmpty(),
      check("productID", "productID is required").not().isEmpty(),
      check("video", "video is required").not().isEmpty(),
      check("publicite1", "publicite1 is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, titre, productID, video, liensite1, publicite1 } = req.body;
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
      const uploadFolder = "uploads/";
      const imageData1 = publicite1;
      const filename1 = "publicite1_" + req.user.id.toString() + "_" + Date.now().toString();
      base64Img.imgSync(imageData1, "", uploadFolder + filename1);

      /**** */
      const sectiontype3 = new Sectiontype3({
        name,
        titre,
        productID,
        video,
        liensite1,
        publicite1: filename1 + ".jpg",
      });
      sec = await sectiontype3.save();
      res.json(sec);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }

    //res.error({ msg: "ProductID not valid" });
  }
);

router.get("/getsectiontype3", async (req, res) => {
  try {
    const sections = await Sectiontype3.find().populate({
      path: "productID",
      populate: { path: "boutique" },
    });
    res.json(sections);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/**********************************************************************/
// @route     DELETE /api/sections/deletesectiontype3/:id
// @desc      DELETE Section
// @access   ADMIN
/***************************l*******************************************/

router.delete("/deletesectiontype3/:id", [authAdmin, checkObjectId("id")], async (req, res) => {
  try {
    const sectiontype3 = await Sectiontype3.findById(req.params.id);
    if (!sectiontype3) {
      return res.status(404).json({ msg: "section not found" });
    }
    await sectiontype3.remove();
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

  const { titre, name, productID, video, publicite1, liensite1 } = req.body;
  //console.log('ggggggggggg',req.body);
  productID.forEach(async (element) => {
    if (!mongoose.Types.ObjectId.isValid(element)) return res.status(400).json({ errors: [{ msg: "Invalid ID" }] });
    const produ = await Product.findById(element);
    if (!produ) {
      return res.status(404).json({ errors: [{ msg: "Product not found" }] });
    }
  });
  let SectionFields = {};
  if (publicite1) {
    const imageData1 = publicite1;
    const uploadFolder = "uploads/";
    const filename1 = "publicite1_" + req.user.id.toString() + "_" + Date.now().toString();
    base64Img.imgSync(imageData1, "", uploadFolder + filename1);
    SectionFields.publicite1 = filename1 + ".jpg";
  }

  if (titre) SectionFields.titre = titre;
  if (name) SectionFields.name = name;
  if (productID) SectionFields.productID = productID;
  if (video) SectionFields.video = video;
  if (liensite1) SectionFields.liensite1 = liensite1;
  try {
    const sectionupdated = await Sectiontype3.findByIdAndUpdate(id, { $set: SectionFields }, { new: true });
    res.json(sectionupdated);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
