const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const imageToBase64 = require("image-to-base64");

router.post("/base64-encode", async (req, res) => {
  const { image } = req.body;
  // try {
  //   const output = await imageToBase64(image);
  //   res.send("data:image/jpeg;base64," + output);
  // } catch (err) {
  //   console.error(err.message);
  //   res.status(500).send("Server Error");
  // }

  imageToBase64(image) // Path to the image
    .then((response) => {
      res.send("data:image/jpeg;base64," + response);
    })
    .catch((error) => {
      console.error(error.message);
      res.status(500).send("Server Error");
    });
});

module.exports = router;
