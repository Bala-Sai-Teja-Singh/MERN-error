const express = require("express");
const router = express.Router();
const {
  getProducts,
  getSingleProduct,
} = require("../controllers/productController");

// Get route for all products
router.route("/products").get(getProducts);

// Get Route for Single Product
router.route("/products/:id").get(getSingleProduct);

module.exports = router;
