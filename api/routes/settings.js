const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Settings = require("../models/Settings");
const authAdmin = require("../middleware/authAdmin");
const base64Img = require("base64-img");
const checkObjectId = require("../middleware/checkObjectId");
const { readSync, read, ReadDirOptions } = require("readdir");
router.post("/addsettings", [authAdmin, [check("name", "name is required").not().isEmpty(), check("value", "value is required").not().isEmpty()]], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, value } = req.body;
  try {
    const settting = new Settings({
      name,
      value,
    });
    settin = await settting.save();
    res.json(settin);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/**********************************************************************/
// @route     DELETE /api/Setting/deletesetting/:id
// @desc      DELETE Section
// @access   ADMIN
/***************************l*******************************************/

router.delete("/deletesetting/:id", [authAdmin, checkObjectId("id")], async (req, res) => {
  try {
    const secttting = await Settings.findById(req.params.id);
    if (!secttting) {
      return res.status(404).json({ msg: "Setting not found" });
    }
    await secttting.deleteOne();
    res.json({ msg: "Setting removed" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

/******get all settings */
router.get("/getallsettings", async (req, res) => {
  try {
    const settings = await Settings.find();
    res.json(settings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/************* Update settings *******/
router.put("/:id", authAdmin, async (req, res) => {
  const { id } = req.params;

  const { name, value } = req.body;

  let SettingFields = {};

  if (name) {
    SettingFields.name = name;
  }
  if (value) {
    SettingFields.value = value;
  }

  try {
    const settingupdated = await Settings.findByIdAndUpdate(id, { $set: SettingFields }, { new: true });
    res.json(settingupdated);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

/******get files in folder settings */

router.get("/getfilessettings", async (req, res) => {
  try {
    const allTextFilesFilter = ["*.*"];
    // const options = [ReadDirOptions.ABSOLUTE_PATHS, ReadDirOptions.CASELESS_SORT];
    const contents =await readSync("uploads/settings", allTextFilesFilter,null);
   // console.log("contents", contents);
    res.json(contents);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
