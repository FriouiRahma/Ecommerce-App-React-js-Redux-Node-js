const express = require("express");
const router = express.Router();
const authAdmin = require("../middleware/authAdmin");
const checkObjectId = require("../middleware/checkObjectId");
const auth = require("../middleware/auth");
const Sections=require('../models/Sections')
const Sectiontype1 = require("../models/Sectiontype1");
const Sectiontype2=require("../models/Sectiontype2")
const Sectiontype3=require("../models/Sectiontype3")
const Sectiontype4=require("../models/Sectiontype4")
const Sectiontype6=require("../models/Sectiontype6")
const Sectiontype5=require("../models/Sectiontype5")



/**********************************************************************/
// @route   GET api/sections/
// @desc    Get all sections by Type
// @access  PRIVATE
/**********************************************************************/

router.post("/getglobalsection", authAdmin,async (req, res) => {
  const {type} =req.body
 
  try {

      if(type==1){
      const sections = await Sectiontype1.find().populate("productID");
      res.json(sections);
      }
      if(type==2){
        const sections = await Sectiontype2.find();
        res.json(sections);
        }
      if(type==3){
        const sections = await Sectiontype3.find();
        res.json(sections);
          }
       if(type==4){
        const sections = await Sectiontype4.find();
        res.json(sections);
            }
        if(type==5){
        const sections = await Sectiontype5.find();
        res.json(sections);
          }
        if(type==6){
        const sections = await Sectiontype6.find();
        res.json(sections);
          }
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
/**********************************************************************/
// @route   GET api/sections/
// @desc   ADD sections by Type at home
// @access  PRIVATE
/**********************************************************************/

router.post("/addsectionsbytype", authAdmin,async (req, res) => {
  const {typesection,idsectiontype} =req.body
  let uniqueordre=1
  let globsection= await Sections.find()
  if(globsection.length!==0){
    const valeurs=globsection.map(el=>el.ordere) 
    newid=Math.max(...valeurs)+1
    uniqueordre=newid  
  }

  try {
    const globsection = new Sections({
      Type_section: typesection,
      id_sections_type:idsectiontype,
      ordere:uniqueordre
      
    });

    globsectionsss = await globsection.save();
    res.json(globsectionsss);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
/**********************************************************************/
// @route   GET api/sections/
// @desc    DELETE sections by Type from home
// @access  PRIVATE
/**********************************************************************/

router.delete("/deletesectionsbytype/:id", authAdmin,async (req, res) => {
 
  try {
    const sectionbytype = await Sections.findOne({id_sections_type:req.params.id});
    if (!sectionbytype) {
      return res.status(404).json({ errors: [{ msg: "Section not found" }] });
    }
    await sectionbytype.deleteOne();
    res.json({ msg: "section-type removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
/*******Get all sectionsglobal */
router.get("/getsectionsglobal",async (req, res) => {

  try {
       const sections = await Sections.find().sort({ ordere:0});
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

router.delete("/deletesectionbytype2/:id", [authAdmin, checkObjectId("id")], async (req, res) => {
  try {
    const sections = await Sections.findOne({id_sections_type:req.params.id});
    if (sections) {
      await sections.remove();
     res.json({ msg: "Section removed global section " });
    }
    
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

router.put("/modiforder/:id", [auth,checkObjectId("id")], async (req, res) => {
  const { id } = req.params;

  //test if section exist
  const { neworder } = req.body;
  try {
    const section = await Sections.findById(id);
    if (!section) {
      res.json({ msg: "Commande not found" });
    }
    const sectionneworder = await Sections.findByIdAndUpdate(
      id,
      { $set: { ordere: neworder } },
      { new: true }
    );
    res.json(sectionneworder);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});


module.exports = router;
