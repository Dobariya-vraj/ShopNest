const express = require("express");
const {protect} = require("../middleware/authMiddleware");
const {admin} = require("../middleware/adminMiddleware");
const {getProducts, getProductById, createProduct, updateProduct, deleteProduct} = require("../controller/productController");
const maulter = require("multer");
const upload = maulter({dest: "uploads/"});

const router = express.Router();

// all product routes
router.route("/").get(getProducts).post(protect, admin, upload.single("image"), createProduct);
// selected product routes
router.route("/:id").get(getProductById).put(protect, admin, upload.single("image"),    updateProduct).delete(protect, admin, deleteProduct);


module.exports = router;