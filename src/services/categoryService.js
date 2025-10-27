const Category = require('../models/categoryModel');

// Create new category
const createCategory = async (categoryData) => {
  try {
    const category = new Category(categoryData);
    return await category.save();
  } catch (error) {
    throw error;
  }
};

// Get all categories
const getAllCategories = async () => {
  try {
    return await Category.find();
  } catch (error) {
    throw error;
  }
};

// Get category by ID
const getCategoryById = async (id) => {
  try {
    const category = await Category.findById(id);
    if (!category) {
      const error = new Error('Categoria no encontrada');
      error.statusCode = 404;
      throw error;
    }
    return category;
  } catch (error) {
    throw error;
  }
};

// Update category
const updateCategory = async (id, categoryData) => {
  try {
    const category = await Category.findByIdAndUpdate(
      id,
      categoryData,
      { new: true, runValidators: true }
    );
    
    if (!category) {
      const error = new Error('Categoria no encontrada');
      error.statusCode = 404;
      throw error;
    }
    
    return category;
  } catch (error) {
    throw error;
  }
};

// Delete category
const deleteCategory = async (id) => {
  try {
    const category = await Category.findByIdAndDelete(id);
    
    if (!category) {
      const error = new Error('Categoria no encontrada');
      error.statusCode = 404;
      throw error;
    }
    
    return category;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
};

