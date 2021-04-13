const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Like = require("../models/Like");
const User = require("../models/User");
const checkObjectId = require("../middleware/checkObjectId");

/******************FR/22/07/2020****************************************************/
// @route   Add api/boutiques/updateC
// @desc    Add likes to product
// @access  Private user
/***************************l*******************************************/

router.post("/addlike", auth, async (req, res) => {
  const { productt } = req.body;
  try {
    // test if product already liked by user or not
    const userlike = await Like.findOne({ productt: productt });
    //console.log("product liked", userlike);
    if (!userlike) {
      const like = new Like({
        productt,
        user: req.user.id,
      });
      const lik = await like.save();
      res.json(lik);
    } else {
      userlike.user.toString() !== req.user.id;
      const like = new Like({
        productt,
        user: req.user.id,
      });

      const lik = await like.save();
      res.json(lik);
    }
    //await Like.deleteOne({ productt: productt });

    //remove user from likes
    //console.log("product already liked");
    // res.json({ msg: " product already liked by you" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});
// delete likes **29/07/2020**private route
router.delete("/deletelike/:id", [auth, checkObjectId("id")], async (req, res) => {
  try {
    const deletlike = await Like.findOne({ productt: req.params.id, user: req.user.id });
    if (!deletlike) {
      return res.status(400).json({ msg: "like not found" });
    }
    await deletlike.remove();
    res.json({ msg: "like removed" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

/******************FR/22/07/2020****************************************************/
// @route   Get /api/likes/likesusers
// @desc    Get likes of the user
// @access  Private user
/***************************l*******************************************/
router.get("/likesusers", auth, async (req, res) => {
  try {
    const likeuser = await Like.find({ user: req.user.id }).populate("productt");
    if (!likeuser) {
      res.status(400).json({ msg: "you have not likes" });
    }
    // return likes of user
    res.json(likeuser);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/alllikes", async (req, res) => {
  try {
    const alllikes = await Like.find();
    if (!alllikes) {
      res.status(400).json({ msg: "you have not likes" });
    }
    // return all likes
    res.json(alllikes);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
