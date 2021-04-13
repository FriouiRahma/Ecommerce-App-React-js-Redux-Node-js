const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Sectiontype4=require("../models/Sectiontype4")
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const checkObjectId = require("../middleware/checkObjectId");
const base64Img = require("base64-img");


router.post(
  "/addSection4",
  authAdmin,
  [
    [ 
      check("name", "name is required").not().isEmpty(),
      check("titre", "titre is required").not().isEmpty(),
      check("image", "image is required").not().isEmpty(),
      
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {name, titre,liensite ,image } = req.body;
    try {
      
      const uploadFolder = "uploads/";
      const imageData = image; 
      const filename = "image_" + req.user.id.toString() + "_" + Date.now().toString();
      base64Img.imgSync(imageData, "", uploadFolder + filename);
     
      const sectiontype4 = new Sectiontype4({
        name,
        titre,
        liensite,
        image:filename+".jpg",

      });
      sec = await sectiontype4.save();
      res.json(sec);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }

    //res.error({ msg: "ProductID not valid" });
  }
);

router.get("/getsectiontype4", async (req, res) => {
  try {
    const sections = await Sectiontype4.find();
    res.json(sections);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


/**********************************************************************/
// @route     DELETE /api/sections/deletesectiontype4/:id
// @desc      DELETE Section
// @access   ADMIN
/***************************l*******************************************/

router.delete("/deletesectiontype4/:id", [authAdmin, checkObjectId("id")], async (req, res) => {
  try {
    const sectiontype4 = await Sectiontype4.findById(req.params.id);
    if (!sectiontype4) {
      return res.status(404).json({ msg: "section not found" });
    }
    await sectiontype4.remove();
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

  const { titre,name, image } = req.body;
 
  let SectionFields = {};
 
  if (image) {
    const imageData = image;
    const uploadFolder = "uploads/";
    const filename = "publicite1_" + req.user.id.toString() + "_" + Date.now().toString();
    base64Img.imgSync(imageData, "", uploadFolder + filename);
    SectionFields.image = filename + ".jpg";
  }
  if (titre) SectionFields.titre = titre;
  if (name)   SectionFields.name=name;
  try {
    const sectionupdated = await Sectiontype4.findByIdAndUpdate(
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
