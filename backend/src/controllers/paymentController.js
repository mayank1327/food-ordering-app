const paymentService = require('../services/paymentService');

/**
 * @desc    Get all payment methods
 * @route   GET /api/payments
 * @access  Private
 */
const getPaymentMethods = async (req, res, next) => {
  try {
    const paymentMethods = await paymentService.getPaymentMethods(req.user._id);

    res.status(200).json({
      success: true,
      count: paymentMethods.length,
      data: paymentMethods
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single payment method
 * @route   GET /api/payments/:id
 * @access  Private
 */
const getPaymentMethodById = async (req, res, next) => {
  try {
    const paymentMethod = await paymentService.getPaymentMethodById(
      req.params.id,
      req.user._id,
      req.user.role
    );

    res.status(200).json({
      success: true,
      data: paymentMethod
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Add payment method
 * @route   POST /api/payments
 * @access  Private
 */
const addPaymentMethod = async (req, res, next) => {
  try {
    const paymentMethod = await paymentService.addPaymentMethod(req.body, req.user._id);

    res.status(201).json({
      success: true,
      message: 'Payment method added successfully',
      data: paymentMethod
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update payment method
 * @route   PUT /api/payments/:id
 * @access  Private (Admin only)
 */
const updatePaymentMethod = async (req, res, next) => {
  try {
    const paymentMethod = await paymentService.updatePaymentMethod(req.params.id, req.body);

    res.status(200).json({
      success: true,
      message: 'Payment method updated successfully',
      data: paymentMethod
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete payment method
 * @route   DELETE /api/payments/:id
 * @access  Private (Admin only)
 */
const deletePaymentMethod = async (req, res, next) => {
  try {
    await paymentService.deletePaymentMethod(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Payment method deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPaymentMethods,
  getPaymentMethodById,
  addPaymentMethod,
  updatePaymentMethod,
  deletePaymentMethod
};