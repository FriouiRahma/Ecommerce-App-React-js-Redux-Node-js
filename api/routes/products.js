const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const authAdmin = require("../middleware/authAdmin");
const Boutique = require("../models/Boutique");
const User = require("../models/User");
const auth = require("../middleware/auth");
const mongoose = require("mongoose");
const Product = require("../models/Product");
const base64Img = require("base64-img");
const checkObjectId = require("../middleware/checkObjectId");
const fs = require("fs");
const imageToBase64 = require("image-to-base64");
/**********************************************************************/
// @route   GET api/products
// @desc    Get all products
// @access  Public
/**********************************************************************/

router.get("/", async (req, res) => {
  try {
    const products = await Product.find().populate("categories").populate("boutique");

    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/**********************************************************************/
// @route   POST api/products/add
// @desc    Add new products
// @access  Private Admin
/***************************l*******************************************/

router.post(
  "/add",
  //authAdmin,
  [
    [
      check("boutique", "Boutique is required").not().isEmpty(),
      check("name", "Boutique name is required").not().isEmpty(),
      check("description", "Boutique description is required").not().isEmpty(),
      check("price", "Boutique price is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { boutique, name, description, price, photo } = req.body;

    try {
      const dateNow = Date.now().toString();
      res.send(dateNow);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);
/**********************************************************************/
// @route   POST api/products/addProduit
// @desc    Add new products
// @access  Private User
/***************************l*******************************************/

router.post(
  "/addProduit",
  auth,
  [
    [
      check("boutique", "Boutique is required").not().isEmpty(),
      check("categories", "categories are required").not().isEmpty(),
      check("name", "Boutique name is required").not().isEmpty(),
      check("description", "Boutique description is required").not().isEmpty(),
      check("price", "Boutique price is required").not().isEmpty(),
      check("codeabarre", "code à barre is required").not().isEmpty(),
      check("quantitestock", " quantité en stock is  required").not().isEmpty(),
      check("photo", "photo is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    let picturelist = [];
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      boutique,
      name,
      description,
      price,
      tarifpromo,
      codeabarre,
      quantitestock,
      categories,
      caracteristique,
      photo,
    } = req.body;
    try {
      // const imageData = imageproduit;
      // const uploadFolder = "uploads/";
      // const filename1 = "product_" + boutique.toString() + "_" + Date.now().toString();
      // base64Img.imgSync(imageData, "", uploadFolder + filename1);
      photo.forEach(async (element, index) => {
        let i=index+1
        const imageData = element;
        const uploadFolder = "uploads/";
        const filename = "product_" + boutique.toString() + "_" + Date.now().toString();
        picturelist = [...picturelist, filename];
        base64Img.imgSync(imageData, "", uploadFolder + filename);
      });

      const produit = new Product({
        boutique,
        name,
        description,
        price,
        tarifpromo,
        codeabarre,
        quantitestock,
        categories,
        caracteristique: caracteristique.map((cl) => {
          return { ...cl, value: cl.value.filter((el) => el !== "") };
        }),
        // imageproduit: filename1 + ".jpg",
        photo: picturelist.map((element, index) => {
          return element + ".jpg";

          //return filename + ".jpg",
        }),
      });

      prod = await produit.save();
      res.json(prod);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

/**********************FR/15/07/2020************************************************/
// @route     GET /api/products/prodbout/:id
// @desc      GET A SPESEFIC PRODUCT OF BOUTQUE
// @access    PRVATE ROUTE  PRODUCT
/***************************l*******************************************/
router.get("/prodbout/:id", checkObjectId("id"), async (req, res) => {
  try {
    const prodbout = await Product.find({ boutique: req.params.id });
    if (!prodbout) {
      res.status(404).json({ msg: "Produit not found" });
    }
    res.json(prodbout);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

/**********************FR/15/07/2020************************************************/
// @route     DELETE /api/products/deleteprod/:id
// @desc      DELETE A SPESEFIC PRODUCT OF BOUTQUE
// @access    PRVATE ROUTE  PRODUCT
/***************************l*******************************************/

router.delete("/deleteprod/:id", [auth, checkObjectId("id")], async (req, res) => {
  const DIR = "uploads";
  try {
    const prod = await Product.findById(req.params.id);
    if (!prod) {
      return res.status(404).json({ msg: "Product not found" });
    }
    await prod.remove();
    //https://www.restapiexample.com/build-rest-api/nodejs-rest-api-to-delete-uploaded-image/
    //remove picture from folder
    prod.photo.map((el) => fs.unlinkSync(`uploads/${el}`));

    console.log("successfully deleted", DIR + prod.photo);
    res.json({ msg: "Product removed" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

/**********************FR/21/07/2020************************************************/
// @route     POST /api/products/productdetail/:id
// @desc      GET ONE PRODUCT OF BOUTQUE BY ID
// @access    PUBLIC ROUTE  PRODUCT
/***************************l*******************************************/
router.get("/productdetail/:id", checkObjectId("id"), async (req, res) => {
  try {
    const produ = await Product.findById(req.params.id);
    if (!produ) {
      return res.status(404).json({ msg: "Product not found" });
    }
    res.json(produ);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});
/******************FR/21/07/2020****************************************************/
// @route   Update api/boutiques/updateP
// @desc    Update existing Product
// @access  Private client
/***************************l*******************************************/
router.put("/updateP/:id", auth, async (req, res) => {
  const { id } = req.params;

  const dir = "uploads/";
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).send("Error Porduct ID");
  }
  ProdId = id;
  const { name,categories, caracteristique, description, price, photo, imageBase64, photoUpdated } = req.body;
  const uploadFolder = "uploads/";
  let ProductFields = {};
  let picturelist = [];
  if (imageBase64) {
    imageBase64.forEach((element) => {
      const imageData = element;

      const filename = "product_" + req.user.id.toString() + "_" + Date.now().toString();
      base64Img.imgSync(imageData, uploadFolder, filename);
      picturelist = [...picturelist, filename];
      //ProductFields.photo = filename + ".jpg";
    });

    ProductFields.photo = picturelist.map((element, index) => {
      return element + ".jpg";

      //return filename + ".jpg",
    });
    // const imageData = photoUpdated;
    // const uploadFolder = "uploads/";
    // const filename = "product_" + req.user.id.toString() + "_" + Date.now().toString();
    // base64Img.imgSync(imageData, uploadFolder, filename);
    // ProductFields.photo = filename + ".jpg";
  }
  if(categories)ProductFields.categories=categories
  if (caracteristique) ProductFields.caracteristique = caracteristique;
  if (name) ProductFields.name = name;
  if (description) ProductFields.description = description;
  if (price) ProductFields.price = price;

  //test if produit exist
  try {
    const prodd = await Product.findById(ProdId);
    if (!prodd) {
      res.json({ msg: " Product of Boutique not found" });
    }

    // if (boutt.user.toString() !== req.user.id) {
    //   res.json({ msg: "not authorized" });
    // }
    if (imageBase64) {
      prodd.photo.map((el) => fs.unlinkSync(`uploads/${el}`));
    }
    const produpdated = await Product.findByIdAndUpdate(
      ProdId,
      { $set: ProductFields },
      { new: true }
    );
    res.json(produpdated);

    //remove picture from folder after updating
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
