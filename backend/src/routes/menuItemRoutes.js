const express = require('express');
const router = express.Router();
const menuItemController = require('../controllers/menuItemController');
const auth = require('../middleware/auth');
const { roleCheck, countryCheck } = require('../middleware/roleCheck');
const { ROLES } = require('../utils/constants');

// All routes require authentication
router.use(auth);

// Apply country filter for Manager & Member
router.use(countryCheck);

// Get menu items (Everyone)
router.get('/restaurant/:restaurantId', menuItemController.getMenuItemsByRestaurant);
router.get('/:id', menuItemController.getMenuItemById);

// Create, Update, Delete (Admin only)
router.post('/', roleCheck(ROLES.ADMIN), menuItemController.createMenuItem);
router.put('/:id', roleCheck(ROLES.ADMIN), menuItemController.updateMenuItem);
router.delete('/:id', roleCheck(ROLES.ADMIN), menuItemController.deleteMenuItem);

module.exports = router;