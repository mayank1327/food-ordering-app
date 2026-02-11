const menuItemService = require('../services/menuItemService');

/**
 * @desc    Get menu items by restaurant
 * @route   GET /api/menu-items/restaurant/:restaurantId
 * @access  Private
 */
const getMenuItemsByRestaurant = async (req, res, next) => {
  try {
    const menuItems = await menuItemService.getMenuItemsByRestaurant(
      req.params.restaurantId,
      req.countryFilter || {}
    );

    res.status(200).json({
      success: true,
      count: menuItems.length,
      data: menuItems
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single menu item
 * @route   GET /api/menu-items/:id
 * @access  Private
 */
const getMenuItemById = async (req, res, next) => {
  try {
    const menuItem = await menuItemService.getMenuItemById(req.params.id);

    res.status(200).json({
      success: true,
      data: menuItem
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create menu item
 * @route   POST /api/menu-items
 * @access  Private (Admin only)
 */
const createMenuItem = async (req, res, next) => {
  try {
    const menuItem = await menuItemService.createMenuItem(req.body);

    res.status(201).json({
      success: true,
      message: 'Menu item created successfully',
      data: menuItem
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update menu item
 * @route   PUT /api/menu-items/:id
 * @access  Private (Admin only)
 */
const updateMenuItem = async (req, res, next) => {
  try {
    const menuItem = await menuItemService.updateMenuItem(req.params.id, req.body);

    res.status(200).json({
      success: true,
      message: 'Menu item updated successfully',
      data: menuItem
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete menu item
 * @route   DELETE /api/menu-items/:id
 * @access  Private (Admin only)
 */
const deleteMenuItem = async (req, res, next) => {
  try {
    await menuItemService.deleteMenuItem(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Menu item deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMenuItemsByRestaurant,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem
};