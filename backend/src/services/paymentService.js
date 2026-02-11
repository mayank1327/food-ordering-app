const PaymentMethod = require('../models/PaymentMethod');

/**
 * Get all payment methods for a user
 */
const getPaymentMethods = async (userId) => {
  const paymentMethods = await PaymentMethod.find({ userId });
  return paymentMethods;
};

/**
 * Get single payment method by ID
 */
const getPaymentMethodById = async (paymentMethodId, userId, userRole) => {
  let query = { _id: paymentMethodId };

  // Non-admin users can only see their own payment methods
  if (userRole !== 'ADMIN') {
    query.userId = userId;
  }

  const paymentMethod = await PaymentMethod.findOne(query);

  if (!paymentMethod) {
    throw new Error('Payment method not found or access denied');
  }

  return paymentMethod;
};

/**
 * Add payment method
 */
const addPaymentMethod = async (paymentData, userId) => {
  const paymentMethod = await PaymentMethod.create({
    ...paymentData,
    userId
  });

  return paymentMethod;
};

/**
 * Update payment method (Admin only)
 */
const updatePaymentMethod = async (paymentMethodId, updateData) => {
  const paymentMethod = await PaymentMethod.findByIdAndUpdate(
    paymentMethodId,
    updateData,
    { new: true, runValidators: true }
  );

  if (!paymentMethod) {
    throw new Error('Payment method not found');
  }

  return paymentMethod;
};

/**
 * Delete payment method (Admin only)
 */
const deletePaymentMethod = async (paymentMethodId) => {
  const paymentMethod = await PaymentMethod.findByIdAndDelete(paymentMethodId);

  if (!paymentMethod) {
    throw new Error('Payment method not found');
  }

  return paymentMethod;
};

module.exports = {
  getPaymentMethods,
  getPaymentMethodById,
  addPaymentMethod,
  updatePaymentMethod,
  deletePaymentMethod
};