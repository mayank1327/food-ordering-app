const orderService = require('../services/orderService');

/**
 * @desc    Get all orders
 * @route   GET /api/orders
 * @access  Private
 */
const getAllOrders = async (req, res, next) => {
  try {
    const orders = await orderService.getAllOrders(
      req.user._id,
      req.user.role,
      req.countryFilter || {}
    );

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single order
 * @route   GET /api/orders/:id
 * @access  Private
 */
const getOrderById = async (req, res, next) => {
  try {
    const order = await orderService.getOrderById(
      req.params.id,
      req.user._id,
      req.user.role,
      req.countryFilter || {}
    );

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create order
 * @route   POST /api/orders
 * @access  Private
 */
const createOrder = async (req, res, next) => {
  try {
    const order = await orderService.createOrder(req.body, req.user);

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: order
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Place order (checkout & pay)
 * @route   POST /api/orders/:id/place
 * @access  Private (Admin & Manager only)
 */
const placeOrder = async (req, res, next) => {
  try {
    const { paymentMethodId } = req.body;

    if (!paymentMethodId) {
      return res.status(400).json({
        success: false,
        error: 'Payment method is required'
      });
    }

    const order = await orderService.placeOrder(
      req.params.id,
      paymentMethodId,
      req.user._id,
      req.user.role,
      req.countryFilter || {}
    );

    res.status(200).json({
      success: true,
      message: 'Order placed successfully',
      data: order
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Cancel order
 * @route   POST /api/orders/:id/cancel
 * @access  Private (Admin & Manager only)
 */
const cancelOrder = async (req, res, next) => {
  try {
    const order = await orderService.cancelOrder(
      req.params.id,
      req.user._id,
      req.user.role,
      req.countryFilter || {}
    );

    res.status(200).json({
      success: true,
      message: 'Order cancelled successfully',
      data: order
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  placeOrder,
  cancelOrder
};