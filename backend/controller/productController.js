const Product = require("../model/Product");
const cloudinary = require("../config/cloudinary");

// Get all products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();

        res.status(200).json(products);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};


// Get product by ID
const getProductById = async (req, res) => {
    try {
        const productId = req.params.id;

        const productItem = await Product.findById(productId);

        if (!productItem) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        res.status(200).json(productItem);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};


// Create product
const createProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            category,
            stock,
        } = req.body;

        let imageUrl = "";

        if (req.file) {
            const result = await cloudinary.uploader.upload(
                req.file.path
            );

            imageUrl = result.secure_url;
        }

        const productItem = new Product({
            name,
            description,
            price,
            category,
            stock,
            imageUrl,
        });

        const savedProduct = await productItem.save();

        res.status(201).json(savedProduct);

    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};


// Update product
const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;

        const {
            name,
            description,
            price,
            category,
            stock,
        } = req.body;

        const productItem = await Product.findById(productId);

        if (!productItem) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        productItem.name = name || productItem.name;
        productItem.description =
            description || productItem.description;
        productItem.price = price || productItem.price;
        productItem.category =
            category || productItem.category;

        if (stock !== undefined) {
            productItem.stock = stock;
        }

        if (req.file) {
            const result = await cloudinary.uploader.upload(
                req.file.path
            );

            productItem.imageUrl = result.secure_url;
        }

        const updatedProduct = await productItem.save();

        res.status(200).json(updatedProduct);

    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};


// Delete product
const deleteProduct = async (req, res) => {
    try {
        const productItem = await Product.findById(
            req.params.id
        );

        if (!productItem) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        await Product.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Product removed",
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};


module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};