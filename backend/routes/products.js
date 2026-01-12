const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
} = require("../controllers/productController");

// GET /api/products/categories - Must be before /:id route
router.get("/categories", getCategories);

// GET /api/products - Get all products (with filters)
router.get("/", getAllProducts);

// GET /api/products/:id - Get single product
router.get("/:id", getProductById);

// POST /api/products - Create new product
router.post("/", createProduct);

// PUT /api/products/:id - Update product
router.put("/:id", updateProduct);

// DELETE /api/products/:id - Delete product
router.delete("/:id", deleteProduct);

module.exports = router;
