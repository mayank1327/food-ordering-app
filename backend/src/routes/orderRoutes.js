const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const auth = require('../middleware/auth');
const { roleCheck, countryCheck } = require('../middleware/roleCheck');
const { ROLES } = require('../utils/constants');

// All routes require authentication
router.use(auth);

// Apply country filter for Manager & Member
router.use(countryCheck);

// Get orders & create order (Everyone)
router.get('/', orderController.getAllOrders);
router.get('/:id', orderController.getOrderById);
router.post('/', orderController.createOrder);

// Place order & Cancel order (Admin & Manager only)
router.post('/:id/place', roleCheck(ROLES.ADMIN, ROLES.MANAGER), orderController.placeOrder);
router.post('/:id/cancel', roleCheck(ROLES.ADMIN, ROLES.MANAGER), orderController.cancelOrder);

module.exports = router;