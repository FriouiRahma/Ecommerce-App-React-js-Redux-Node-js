const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Status = require("../models/Status");
const checkObjectId = require("../middleware/checkObjectId");
/********Ajout des status */
router.post("/addStatus", [check("name", "name is required").not().isEmpty()], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name } = req.body;
  try {
    const statu = new Status({
      name,
    });
    const stats = await statu.save();
    res.json(stats);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/*** recupération des status  */
router.get("/getstatus", async (req, res) => {
  try {
    const status = await Status.find();
    res.json(status);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
/** recupération des status de l'admin  */
router.get("/getstatusadmin", async (req, res) => {
  try {
    const status = await Status.find({ id_boutique: 0 });
    res.json(status);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/********add status by admin */
router.post("/addstatusadmin", [check("name", "name is required").not().isEmpty(), check("couleur", "couleur is required").not().isEmpty()], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, couleur } = req.body;
  try {
    const stausColor = await Status.findOne({ couleur });
    if (stausColor) {
      return res.status(400).json({ errors: [{ msg: "Status color already exists" }] });
    }
    const status = new Status({
      name,
      couleur,
      id_boutique: 0,
    });
    const statuss = await status.save();
    res.json(statuss);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
/**add status by boutique */

router.post("/addstatusboutique", [check("name", "name is required").not().isEmpty(), check("couleur", "couleur is required").not().isEmpty()], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, couleur, id_boutique } = req.body;
  try {
    const stausColor = await Status.findOne({ couleur });
    if (stausColor) {
      return res.status(400).json({ errors: [{ msg: "Status color already exists" }] });
    }
    const status = new Status({
      name,
      couleur,
      id_boutique,
    });
    const statuss = await status.save();
    res.json(statuss);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/*******update status by admin */
router.put("/updatestatus/:id", async (req, res) => {
  const { id } = req.params;
  const { name, couleur, next_status } = req.body;

  let StatusFields = {};
  if (name) StatusFields.name = name;
  if (couleur) StatusFields.couleur = couleur;
  if (next_status) StatusFields.next_status = next_status;

  try {
    const status = await Status.findById(id);
    if (!status) {
      res.json({ msg: "status not found" });
    }
    const statusupdated = await Status.findByIdAndUpdate(id, { $set: StatusFields }, { new: true });
    res.json(statusupdated);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

/***delete status by admin*/
router.delete("/deletestatus/:id", checkObjectId("id"), async (req, res) => {
  try {
    const status = await Status.findById(req.params.id);
    if (!status) {
      return res.status(404).json({ msg: "Status not found" });
    }
    await status.deleteOne();
    res.json({ msg: "Status removed" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

/********** user can add New Note */
router.put("/addnext/:id", [checkObjectId("id")], async (req, res) => {
  const { id } = req.params;
  const { nextstatus } = req.body;
  try {
    newstatus = await Status.findByIdAndUpdate(id, { $push: { next_status: nextstatus } }, { new: true });
    res.json(newstatus);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});
/**************** boutique's user can remove Editor  */

router.put("/deletestatus/:id", [checkObjectId("id")], async (req, res) => {
  const { id } = req.params;
  const { idnextstatus } = req.body;

  try {
    let statuss = await Status.findById(id);
    const nextstatus = statuss.next_status;

    const nextNextstatus = nextstatus.filter((el) => el != idnextstatus);

    if (statuss) {
      const nextstatusnew = await Status.findByIdAndUpdate(id, { $set: { next_status: nextNextstatus } }, { new: true });
      res.json(nextstatusnew);
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
