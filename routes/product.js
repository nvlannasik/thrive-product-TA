const router = require("express").Router();
const Product = require("../models/Product");
const logger = require("../utils/logger");

//POST NEW PRODUCT

router.post("/", async (req, res) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    category: req.body.category,
    image: req.body.image,
    quantity: req.body.quantity,
  });

  try {
    const savedProduct = await product.save();
    logger.info("Product created");
    res.status(201).send({
      status: "success",
      message: "Product created successfully",
      data: savedProduct,
    });
  } catch (err) {
    logger.error("WOW ADA ERROR", err);
    res.status(400).send(err);
  }
});

//GET ALL PRODUCTS

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    logger.info("Get all products");
    res.status(200).send({
      status: "success",
      message: "Products retrieved successfully",
      data: products,
    });
  } catch (err) {
    logger.error("WOW ADA ERROR", err);
    res.status(400).send(err);
  }
});

//GET PRODUCT BY ID

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById({ _id: req.params.id });
    logger.info("Get product by id");
    res.status(200).send({
      status: "success",
      message: "Product retrieved successfully",
      data: product,
    });
  } catch (err) {
    logger.error("WOW ADA ERROR", err);
    res.status(400).send(err);
  }
});

module.exports = router;
