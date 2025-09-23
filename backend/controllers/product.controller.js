import Product from '../models/product.model.js';
import mongoose from 'mongoose';

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.log("error fetching products:", error.message);
        res.status(500).json({ success: false, message: 'Error fetching products:' + error.message });
    }
};

export const createProduct = async (req, res) => {
    const product = req.body; //req.body is the body of the request, user will send the data in the body of the request
    console.log("product:", product);

    if(!product.name || !product.price || !product.description || !product.image) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
}

const newProduct = new Product(product);

try {
    await newProduct.save();
    res.status(201).json({ success: true, product: newProduct });
} catch (error) {
    console.log("error creating product:", error.message);
    res.status(500).json({ success: false, message: "Error creating product:" + error.message });
}
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const product = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: 'Invalid product ID' });
    }
    try {
       const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
        res.status(200).json({ success: true, data: updatedProduct, message: 'Product updated successfully' });
    } catch (error) {
        console.log("error updating product:", error.message);
        res.status(500).json({ success: false, message: 'Error updating product:' + error.message });
    }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: 'Invalid product ID' });
    }
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
        console.log("error deleting product:", error.message);
        res.status(500).json({ success: false, message: 'Error deleting product:' + error.message });
    }
};