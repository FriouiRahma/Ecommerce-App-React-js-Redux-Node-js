const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Sectiontype5=require("../models/Sectiontype5");
const authAdmin = require("../middleware/authAdmin");
const checkObjectId = require("../middleware/checkObjectId");
const base64Img = require("base64-img");


router.post(
  "/addSection5",
  authAdmin,
  [
    [ 
      check("name", "name is required").not().isEmpty(),
      check("titre", "titre is required").not().isEmpty(),
      check("publicite1", "publicité1 is required").not().isEmpty(),
      check("publicite2", "publicité2 is required").not().isEmpty(),
      check("publicite3", "publicité3 is required").not().isEmpty(),
      
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {name, titre,liensite1 ,publicite1,liensite2,publicite2,liensite3,publicite3 } = req.body;
    try {
      
      const uploadFolder = "uploads/";
      const imageData1 = publicite1; 
      const imageData2 = publicite2; 
      const imageData3 = publicite3; 
      const filename1 = "publicité1_" + req.user.id.toString() + "_" + Date.now().toString();
      const filename2 = "publicité2_" + req.user.id.toString() + "_" + Date.now().toString();
      const filename3 = "publicité3_" + req.user.id.toString() + "_" + Date.now().toString();
      base64Img.imgSync(imageData1, "", uploadFolder + filename1);
      base64Img.imgSync(imageData2, "", uploadFolder + filename2);
      base64Img.imgSync(imageData3, "", uploadFolder + filename3);
     
      const sectiontype5 = new Sectiontype5({
        name,
        titre,
        liensite1,
        publicite1:filename1+".jpg",
        liensite2,
        publicite2:filename2+".jpg",
        liensite3,
        publicite3:filename3+".jpg",
      });
      sec = await sectiontype5.save();
      res.json(sec);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }

  
  }
);

/**********************************************************************/
// @route     DELETE /api/sections/deletesectiontype4/:id
// @desc      DELETE Section
// @access   ADMIN
/***************************l*******************************************/

router.delete("/deletesectiontype5/:id", [authAdmin, checkObjectId("id")], async (req, res) => {
  try {
    const sectiontype5 = await Sectiontype5.findById(req.params.id);
    if (!sectiontype5) {
      return res.status(404).json({ msg: "section not found" });
    }
    await sectiontype5.remove();
    res.json({ msg: "Section removed" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/getsectiontype5", async (req, res) => {
  try {
    const sections = await Sectiontype5.find();
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

  const { titre,name, liensite1,publicite1,liensite2,publicite2,liensite3,publicite3 } = req.body;
 
  let SectionFields = {};
 
  if (publicite1) {
    const imageData1 = publicite1;
    const uploadFolder = "uploads/";
    const filename1 = "publicite1_" + req.user.id.toString() + "_" + Date.now().toString();
    base64Img.imgSync(imageData1, "", uploadFolder + filename1);
    SectionFields.publicite1 = filename1 + ".jpg";
  }
  if (publicite2) {
    const imageData2 = publicite2;
    const uploadFolder = "uploads/";
    const filename2 = "publicite2_" + req.user.id.toString() + "_" + Date.now().toString();
    base64Img.imgSync(imageData2, "", uploadFolder + filename2);
    SectionFields.publicite2 = filename2 + ".jpg";
  }
  if (publicite3) {
    const imageData3 = publicite3;
    const uploadFolder = "uploads/";
    const filename3 = "publicite1_" + req.user.id.toString() + "_" + Date.now().toString();
    base64Img.imgSync(imageData3, "", uploadFolder + filename3);
    SectionFields.publicite3 = filename3 + ".jpg";
  }


  if (titre) SectionFields.titre = titre;
  if (name)   SectionFields.name=name;
  if(liensite1) SectionFields.liensite1=liensite1;
  if(liensite2) SectionFields.liensite2=liensite2;
  if(liensite3) SectionFields.liensite3=liensite3;

  try {
    const sectionupdated = await Sectiontype5.findByIdAndUpdate(
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
