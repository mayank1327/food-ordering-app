const Order = require('../models/Order');
const MenuItem = require('../models/MenuItem');
const Restaurant = require('../models/Restaurant');
const { ORDER_STATUS, PAYMENT_STATUS } = require('../utils/constants');

/**
 * Get all orders (with country filter for bonus)
 */
const getAllOrders = async (userId, userRole, countryFilter = {}) => {
  let query = {};

  // Members and Managers see only their own orders
  if (userRole !== 'ADMIN') {
    query.userId = userId;
  }

  // Apply country filter for bonus
  if (countryFilter.country) {
    query.userCountry = countryFilter.country;
  }

  const orders = await Order.find(query)
    .populate('userId', 'name email')
    .populate('restaurantId', 'name')
    .sort({ createdAt: -1 });

  return orders;
};

/**
 * Get single order by ID
 */
const getOrderById = async (orderId, userId, userRole, countryFilter = {}) => {
  let query = { _id: orderId };

  // Members and Managers can only see their own orders
  if (userRole !== 'ADMIN') {
    query.userId = userId;
  }

  // Apply country filter
  if (countryFilter.country) {
    query.userCountry = countryFilter.country;
  }

  const order = await Order.findOne(query)
    .populate('userId', 'name email')
    .populate('restaurantId', 'name')
    .populate('items.menuItemId', 'name');

  if (!order) {
    throw new Error('Order not found or access denied');
  }

  return order;
};

/**
 * Create order
 */
const createOrder = async (orderData, user) => {
  const { restaurantId, items } = orderData;

  // Verify restaurant exists
  const restaurant = await Restaurant.findById(restaurantId);
  if (!restaurant) {
    throw new Error('Restaurant not found');
  }

  // Calculate total and prepare order items
  let totalAmount = 0;
  const orderItems = [];


  for (const item of items) {
    // console.log(item);
    console.log(item.menuItemId)
    const menuItem = await MenuItem.findById(item.menuItemId);
    console.log(menuItem);
    if (!menuItem || !menuItem.isAvailable) {
      throw new Error(`Menu item ${item.menuItemId} not found or unavailable`);
    }

    const subtotal = menuItem.price * item.quantity;
    totalAmount += subtotal;

    orderItems.push({
      menuItemId: menuItem._id,
      name: menuItem.name,
      price: menuItem.price,
      quantity: item.quantity,
      subtotal
    });
  }

  // Create order
  const order = await Order.create({
    userId: user._id,
    userCountry: user.country,
    items: orderItems,
    restaurantId,
    restaurantName: restaurant.name,
    totalAmount,
    createdBy: user._id
  });

  return order;
};

/**
 * Place order (checkout & pay) - Only Admin & Manager
 */
const placeOrder = async (orderId, paymentMethodId, userId, userRole, countryFilter = {}) => {
  let query = { _id: orderId, status: ORDER_STATUS.PENDING };

  // Managers can only place their own orders
  if (userRole === 'MANAGER') {
    query.userId = userId;
  }

  // Apply country filter
  if (countryFilter.country) {
    query.userCountry = countryFilter.country;
  }

  const order = await Order.findOne(query);

  if (!order) {
    throw new Error('Order not found or already placed');
  }

  order.paymentMethodId = paymentMethodId;
  order.paymentStatus = PAYMENT_STATUS.PAID;
  order.status = ORDER_STATUS.CONFIRMED;

  await order.save();

  return order;
};

/**
 * Cancel order - Only Admin & Manager
 */
const cancelOrder = async (orderId, userId, userRole, countryFilter = {}) => {
  let query = { _id: orderId };

  // Managers can only cancel their own orders
  if (userRole === 'MANAGER') {
    query.userId = userId;
  }

  // Apply country filter
  if (countryFilter.country) {
    query.userCountry = countryFilter.country;
  }

  const order = await Order.findOne(query);

  if (!order) {
    throw new Error('Order not found or access denied');
  }

  if (order.status === ORDER_STATUS.CANCELLED) {
    throw new Error('Order is already cancelled');
  }

  if (order.status === ORDER_STATUS.DELIVERED) {
    throw new Error('Cannot cancel delivered order');
  }

  order.status = ORDER_STATUS.CANCELLED;
  if (order.paymentStatus === PAYMENT_STATUS.PAID) {
    order.paymentStatus = PAYMENT_STATUS.REFUNDED;
  }

  await order.save();

  return order;
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  placeOrder,
  cancelOrder
};