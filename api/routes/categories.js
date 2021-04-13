const express = require("express");
const router = express.Router();
const authAdmin = require("../middleware/authAdmin");
const Category = require("../models/Category");
const mongoose = require("mongoose");
const { check, validationResult } = require("express-validator");
const checkObjectId = require("../middleware/checkObjectId");

/**********************************************************************/
// @route   GET api/categories/
// @desc    Get all categories
// @access  Public
/**********************************************************************/

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find().sort({ order: 1 });

    res.json(categories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post(
  "/addcategory",

  [
    authAdmin,
    [
      check("parent", "parent is required").not().isEmpty(),
      check("name", "Name is required").not().isEmpty(),
      // check("slug", "slug is required").not().isEmpty(),
      // check("order", "order is required").not().isEmpty(),
    ],
  ],

  async (req, res) => {
    // Validate result
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { parent, name, slug } = req.body;

    const order = req.body.order ? req.body.order : "0";
    if (mongoose.Types.ObjectId.isValid(parent)) {
      await Category.findById(parent, function (err, existingCateg) {
        if (!err && existingCateg) {
          newParent = parent;
        } else {
          newParent = "0";
        }
      });
    } else {
      newParent = "0";
    }

    try {
      let categoryName = await Category.findOne({ name });
      if (categoryName) {
        return res.status(400).json({ errors: [{ msg: "Category name already exists" }] });
      }

      category = new Category({
        parent,
        name,
        slug,
        parent: newParent,
        order,
      });
      await category.save();
      res.send(category);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

/******************FR/08/07/2020****************************************************/
// @route   Update api/categories
// @desc    Update existed category
// @access  Admin
/***************************l*******************************************/
router.put("/:id", authAdmin, async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).send("Error Boutique ID");
  }
  CategoryId = id;

  const { parent, name, slug, order } = req.body;
  let CategoryFields = {};
  if (parent) CategoryFields.parent = parent;
  if (name) CategoryFields.name = name;
  if (slug) CategoryFields.slug = slug;
  if (order) CategoryFields.order = order;

  //test if category exist
  try {
    const catt = await Category.findById(CategoryId);
    if (!catt) {
      res.json({ msg: "Category not found" });
    }
    const catupdated = await Category.findByIdAndUpdate(
      CategoryId,
      { $set: CategoryFields },
      { new: true }
    );
    res.json(catupdated);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

router.delete("/deletecategorie/:id", [authAdmin, checkObjectId("id")], async (req, res) => {
  try {
    const categorie = await Category.findById(req.params.id);
    if (!categorie) {
      return res.status(404).json({ msg: "section not found" });
    }
    await categorie.remove();
    res.json({ msg: "Section removed" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
}
 
)


module.exports = router;
