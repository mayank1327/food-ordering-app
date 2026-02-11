const User = require('../models/User');
const { generateToken } = require('../utils/jwtHelper');

/**
 * Register new user
 */
const register = async (userData) => {
  const { name, email, password, role, country } = userData;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists with this email');
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
    role,
    country
  });

  // Generate token
  const token = generateToken({
    userId: user._id,
    role: user.role,
    country: user.country
  });

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      country: user.country
    },
    token
  };
};

/**
 * Login user
 */
const login = async (email, password) => {
  // Find user with password field
  const user = await User.findOne({ email }).select('+password');
  
  if (!user) {
    throw new Error('Invalid credentials');
  }

  // Check if user is active
  if (!user.isActive) {
    throw new Error('User account is deactivated');
  }

  // Compare password
  const isMatch = await user.comparePassword(password);
  console.log(isMatch);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  // Generate token
  const token = generateToken({
    userId: user._id,
    role: user.role,
    country: user.country
  });

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      country: user.country
    },
    token
  };
};

/**
 * Get user profile
 */
const getProfile = async (userId) => {
  const user = await User.findById(userId);
  
  if (!user) {
    throw new Error('User not found');
  }

  return user;
};

module.exports = {
  register,
  login,
  getProfile
};