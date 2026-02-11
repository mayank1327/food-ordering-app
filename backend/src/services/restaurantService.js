const Restaurant = require('../models/Restaurant');

/**
 * Get all restaurants (with country filter for bonus)
 */
const getAllRestaurants = async (countryFilter = {}) => {
  const restaurants = await Restaurant.find({ 
    isActive: true,
    ...countryFilter 
  });
  
  return restaurants;
};

/**
 * Get single restaurant by ID
 */
const getRestaurantById = async (restaurantId, countryFilter = {}) => {
  const restaurant = await Restaurant.findOne({ 
    _id: restaurantId, 
    isActive: true,
    ...countryFilter 
  });

  if (!restaurant) {
    throw new Error('Restaurant not found');
  }

  return restaurant;
};

/**
 * Create new restaurant (Admin only)
 */
const createRestaurant = async (restaurantData) => {
  const restaurant = await Restaurant.create(restaurantData);
  return restaurant;
};

/**
 * Update restaurant (Admin only)
 */
const updateRestaurant = async (restaurantId, updateData) => {
  const restaurant = await Restaurant.findByIdAndUpdate(
    restaurantId,
    updateData,
    { new: true, runValidators: true }
  );

  if (!restaurant) {
    throw new Error('Restaurant not found');
  }

  return restaurant;
};

/**
 * Delete restaurant (Admin only - soft delete)
 */
const deleteRestaurant = async (restaurantId) => {
  const restaurant = await Restaurant.findByIdAndUpdate(
    restaurantId,
    { isActive: false },
    { new: true }
  );

  if (!restaurant) {
    throw new Error('Restaurant not found');
  }

  return restaurant;
};

module.exports = {
  getAllRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant
};