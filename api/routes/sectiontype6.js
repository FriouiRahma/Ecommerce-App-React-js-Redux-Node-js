const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Sectiontype6=require("../models/Sectiontype6");
const authAdmin = require("../middleware/authAdmin");
const checkObjectId = require("../middleware/checkObjectId");
const base64Img = require("base64-img");


router.post(
  "/addSection6",
  authAdmin,
  [
    [ 
      check("name", "name is required").not().isEmpty(),
      check("titre", "titre is required").not().isEmpty(),
      check("name1", "name1 is required").not().isEmpty(),
      check("paragraphe1", "paragraphe1 is required").not().isEmpty(),
      check("image1", "image1 is required").not().isEmpty(),
      check("name2", "name2 is required").not().isEmpty(),
      check("paragraphe2", "paragraphe2 is required").not().isEmpty(),
      check("image2", "image2 is required").not().isEmpty(),
      
      
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {name, titre, name1,paragraphe1,image1,name2,paragraphe2,image2 } = req.body;
    try {
      
      const uploadFolder = "uploads/";
      const imageData1 = image1; 
      const imageData2 = image2; 
     
      const filename1 = "image1_" + req.user.id.toString() + "_" + Date.now().toString();
      const filename2 = "image2_" + req.user.id.toString() + "_" + Date.now().toString();
      
      base64Img.imgSync(imageData1, "", uploadFolder + filename1);
      base64Img.imgSync(imageData2, "", uploadFolder + filename2);
     
      const sectiontype6 = new Sectiontype6({
        name,
        titre,
        name1,
        paragraphe1,
        image1:filename1+".jpg",
        name2,
        paragraphe2,
        image2:filename2+".jpg",
       
      });
      sec = await sectiontype6.save();
      res.json(sec);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  
  }
);

/**********************************************************************/
// @route     DELETE /api/sections/deletesectiontype6/:id
// @desc      DELETE Section
// @access   ADMIN
/***************************l*******************************************/

router.delete("/deletesectiontype6/:id", [authAdmin, checkObjectId("id")], async (req, res) => {
  try {
    const sectiontype6 = await Sectiontype6.findById(req.params.id);
    if (!sectiontype6) {
      return res.status(404).json({ msg: "section not found" });
    }
    await sectiontype6.remove();
    res.json({ msg: "Section removed" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});


router.get("/getsectiontype6", async (req, res) => {
  try {
    const sections = await Sectiontype6.find();
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

  const { titre,name,name1,paragraphe1,image1,name2,paragraphe2,image2 } = req.body;
 
  let SectionFields = {};
 
  if (image1) {
    const imageData1 = image1;
    const uploadFolder = "uploads/";
    const filename1 = "image1_" + req.user.id.toString() + "_" + Date.now().toString();
    base64Img.imgSync(imageData1, "", uploadFolder + filename1);
    SectionFields.image1 = filename1 + ".jpg";
  }
  if (image2) {
    const imageData2 = image2;
    const uploadFolder = "uploads/";
    const filename2 = "image2_" + req.user.id.toString() + "_" + Date.now().toString();
    base64Img.imgSync(imageData2, "", uploadFolder + filename2);
    SectionFields.image2 = filename2 + ".jpg";
  }
 

  if (titre) SectionFields.titre = titre;
  if (name)   SectionFields.name=name;
  if (name1)   SectionFields.name1=name1;
  if (paragraphe1)   SectionFields.paragraphe1=paragraphe1;
  if (name2)   SectionFields.name2=name2;
  if (paragraphe2)   SectionFields.paragraphe2=paragraphe2;


  try {
    const sectionupdated = await Sectiontype6.findByIdAndUpdate(
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
