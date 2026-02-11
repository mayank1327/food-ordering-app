const MenuItem = require('../models/MenuItem');
const Restaurant = require('../models/Restaurant');

/**
 * Get menu items by restaurant ID
 */
const getMenuItemsByRestaurant = async (restaurantId, countryFilter = {}) => {
  // Check if restaurant exists and user has access
  const restaurant = await Restaurant.findOne({ 
    _id: restaurantId, 
    isActive: true,
    ...countryFilter 
  });

  if (!restaurant) {
    throw new Error('Restaurant not found or access denied');
  }

  const menuItems = await MenuItem.find({ 
    restaurantId, 
    isAvailable: true 
  }).populate('restaurantId', 'name country');

  return menuItems;
};

/**
 * Get single menu item by ID
 */
const getMenuItemById = async (menuItemId) => {
  const menuItem = await MenuItem.findOne({ 
    _id: menuItemId, 
    isAvailable: true 
  }).populate('restaurantId', 'name country');

  if (!menuItem) {
    throw new Error('Menu item not found');
  }

  return menuItem;
};

/**
 * Create menu item (Admin only)
 */
const createMenuItem = async (menuItemData) => {
  // Verify restaurant exists
  const restaurant = await Restaurant.findById(menuItemData.restaurantId);
  if (!restaurant) {
    throw new Error('Restaurant not found');
  }

  const menuItem = await MenuItem.create(menuItemData);
  return menuItem;
};

/**
 * Update menu item (Admin only)
 */
const updateMenuItem = async (menuItemId, updateData) => {
  const menuItem = await MenuItem.findByIdAndUpdate(
    menuItemId,
    updateData,
    { new: true, runValidators: true }
  );

  if (!menuItem) {
    throw new Error('Menu item not found');
  }

  return menuItem;
};

/**
 * Delete menu item (Admin only - soft delete)
 */
const deleteMenuItem = async (menuItemId) => {
  const menuItem = await MenuItem.findByIdAndUpdate(
    menuItemId,
    { isAvailable: false },
    { new: true }
  );

  if (!menuItem) {
    throw new Error('Menu item not found');
  }

  return menuItem;
};

module.exports = {
  getMenuItemsByRestaurant,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem
};