const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Slider = require("../models/Slider");
const authAdmin = require("../middleware/authAdmin");
const checkObjectId = require("../middleware/checkObjectId");
const base64Img = require("base64-img");
//add
router.post(
  "/addSlider",
  authAdmin,
  [
    check("titre", "titre is required").not().isEmpty(),
    check("photo", "photo is required").not().isEmpty(),
    check("description", "description is required").not().isEmpty(),
    check("lien", "lien is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { titre, photo, description, lien } = req.body;
    try {
      const imageData = photo;
      const uploadFolder = "uploads/sliders";
      const filename = "slider_" + req.user.id.toString() + "_" + Date.now().toString();
      base64Img.imgSync(imageData, uploadFolder, filename);

      const slider = new Slider({
        titre,
        photo: filename + ".jpg",
        description,
        lien,
      });
      const slid = await slider.save();
      res.json(slid);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);
//get
router.get("/getsliders", async (req, res) => {
  try {
    const slides = await Slider.find();
    res.json(slides);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
//delete
router.delete("/deleteslider/:id", [authAdmin, checkObjectId("id")], async (req, res) => {
  try {
    const slider = await Slider.findById(req.params.id);
    if (!slider) {
      return res.status(404).json({ msg: "slider not found" });
    }
    await Slider.deleteOne();
    res.json({ msg: "Slider removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
//put
router.put("/:id", [authAdmin, checkObjectId("id")], async (req, res) => {
  const { id } = req.params;
  const { titre, photo, photoUpdated, description } = req.body;
  let SliderFields = {};
  if (photoUpdated) {
    const imageData = photoUpdated;
    const uploadFolder = "uploads/sliders";

    const filename = "slider_" + req.user.id.toString() + "_" + Date.now().toString();
    base64Img.imgSync(imageData, uploadFolder, filename);
    SliderFields.photo = filename + ".jpg";
  }

  if (titre) SliderFields.titre = titre;
  if (description) SliderFields.description = description;
  try {
    const sliderupdated = await Slider.findByIdAndUpdate(id, { $set: SliderFields }, { new: true });
    res.json(sliderupdated);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
