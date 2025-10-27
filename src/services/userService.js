const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Create new user
const createUser = async (userData) => {
  try {
    const existingUser = await User.findOne({ email: userData.email });
    
    if (existingUser) {
      const error = new Error('El email ya esta registrado');
      error.statusCode = 400;
      throw error;
    }
    
    const user = new User(userData);
    return await user.save();
  } catch (error) {
    throw error;
  }
};

// Get all users
const getAllUsers = async () => {
  try {
    return await User.find().select('-password');
  } catch (error) {
    throw error;
  }
};

// Get user by ID
const getUserById = async (id) => {
  try {
    const user = await User.findById(id).select('-password');
    
    if (!user) {
      const error = new Error('Usuario no encontrado');
      error.statusCode = 404;
      throw error;
    }
    
    return user;
  } catch (error) {
    throw error;
  }
};

// Update user
const updateUser = async (id, userData) => {
  try {
    const user = await User.findByIdAndUpdate(
      id,
      userData,
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!user) {
      const error = new Error('Usuario no encontrado');
      error.statusCode = 404;
      throw error;
    }
    
    return user;
  } catch (error) {
    throw error;
  }
};

// Delete user
const deleteUser = async (id) => {
  try {
    const user = await User.findByIdAndDelete(id);
    
    if (!user) {
      const error = new Error('Usuario no encontrado');
      error.statusCode = 404;
      throw error;
    }
    
    return user;
  } catch (error) {
    throw error;
  }
};

// Login user and generate JWT
const loginUser = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    
    if (!user) {
      const error = new Error('Credenciales invalidas');
      error.statusCode = 401;
      throw error;
    }
    
    const isMatch = await user.comparePassword(password);
    
    if (!isMatch) {
      const error = new Error('Credenciales invalidas');
      error.statusCode = 401;
      throw error;
    }
    
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    return {
      token,
      user: {
        id: user._id,
        nombre: user.nombre,
        email: user.email
      }
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  loginUser
};

