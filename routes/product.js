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
    res.status(201).send({
      status: "success",
      message: "Product created successfully",
      data: savedProduct,
    });
    logger.info(
      `[${req.method}] - 201 - ${res.statusMessage} - ${req.originalUrl} - ${req.ip}`
    );
  } catch (err) {
    res.status(400).send(err);
    logger.error(
      `[${req.method}] - 400 - ${res.statusMessage} - ${req.originalUrl} - ${req.ip}`
    );
  }
});

//GET ALL PRODUCTS

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).send({
      status: "success",
      message: "Products retrieved successfully",
      data: products,
    });
    logger.info(
      `[${req.method}] - 200 - ${res.statusMessage} - ${req.originalUrl} - ${req.ip}`
    );
  } catch (err) {
    res.status(400).send(err);
    logger.error(
      `[${req.method}] - 400 - ${res.statusMessage} - ${req.originalUrl} - ${req.ip}`
    );
  }
});

//GET PRODUCT BY ID

router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404).send({
      status: "error",
      message: "Product not found",
    });
    logger.error(
      `[${req.method}] - 404 - ${res.statusMessage} - ${req.originalUrl} - ${req.ip}`
    );
  }
  try {
    res.status(200).send({
      status: "success",
      message: "Product retrieved successfully",
      data: product,
    });
    logger.info(
      `[${req.method}] - 200 - ${res.statusMessage} - ${req.originalUrl} - ${req.ip}`
    );
  } catch (err) {
    res.status(400).send(err);
    logger.error(
      `[${req.method}] - 400 - ${res.statusMessage} - ${req.originalUrl} - ${req.ip}`
    );
  }
});

//UPDATE STOCK PRODUCT

router.patch("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404).send({
      status: "error",
      message: "Product not found",
    });
    logger.error(
      `[${req.method}] - 404 - ${res.statusMessage} - ${req.originalUrl} - ${req.ip}`
    );
  }
  try {
    const updatedProduct = await Product.updateOne(
      { _id: req.params.id },
      {
        $set: {
          quantity: req.body.quantity,
        },
      }
    );
    res.status(200).send({
      status: "success",
      message: "Product updated successfully",
      data: updatedProduct,
    });
    logger.info(
      `[${req.method}] - 200 - ${res.statusMessage} - ${req.originalUrl} - ${req.ip}`
    );
  } catch (err) {
    res.status(400).send(err);
    logger.error(
      `[${req.method}] - 400 - ${res.statusMessage} - ${req.originalUrl} - ${req.ip}`
    );
  }
});

module.exports = router;
