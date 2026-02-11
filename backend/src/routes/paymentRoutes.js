const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const auth = require('../middleware/auth');
const { roleCheck } = require('../middleware/roleCheck');
const { ROLES } = require('../utils/constants');

// All routes require authentication
router.use(auth);

// Get payment methods & Add payment method (Everyone)
router.get('/', paymentController.getPaymentMethods);
router.get('/:id', paymentController.getPaymentMethodById);
router.post('/', paymentController.addPaymentMethod);

// Update & Delete payment method (Admin only)
router.put('/:id', roleCheck(ROLES.ADMIN), paymentController.updatePaymentMethod);
router.delete('/:id', roleCheck(ROLES.ADMIN), paymentController.deletePaymentMethod);

module.exports = router;