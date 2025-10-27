const Product = require('../models/productModel');

// Create new product
const createProduct = async (productData) => {
  try {
    const product = new Product(productData);
    return await product.save();
  } catch (error) {
    throw error;
  }
};

// Get all products with populated category
const getAllProducts = async () => {
  try {
    return await Product.find().populate('categoria', 'nombre descripcion');
  } catch (error) {
    throw error;
  }
};

// Get product by ID with populated category
const getProductById = async (id) => {
  try {
    const product = await Product.findById(id).populate('categoria', 'nombre descripcion');
    
    if (!product) {
      const error = new Error('Producto no encontrado');
      error.statusCode = 404;
      throw error;
    }
    
    return product;
  } catch (error) {
    throw error;
  }
};

// Update product
const updateProduct = async (id, productData) => {
  try {
    const product = await Product.findByIdAndUpdate(
      id,
      productData,
      { new: true, runValidators: true }
    ).populate('categoria', 'nombre descripcion');
    
    if (!product) {
      const error = new Error('Producto no encontrado');
      error.statusCode = 404;
      throw error;
    }
    
    return product;
  } catch (error) {
    throw error;
  }
};

// Delete product
const deleteProduct = async (id) => {
  try {
    const product = await Product.findByIdAndDelete(id);
    
    if (!product) {
      const error = new Error('Producto no encontrado');
      error.statusCode = 404;
      throw error;
    }
    
    return product;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
};

