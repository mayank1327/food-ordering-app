const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');
const auth = require('../middleware/auth');
const { roleCheck, countryCheck } = require('../middleware/roleCheck');
const { ROLES } = require('../utils/constants');

// All routes require authentication
router.use(auth);

// Apply country filter for Manager & Member
router.use(countryCheck);

// Get all restaurants & get single restaurant (Everyone)
router.get('/', restaurantController.getAllRestaurants);
router.get('/:id', restaurantController.getRestaurantById);

// Create, Update, Delete (Admin only)
router.post('/', roleCheck(ROLES.ADMIN), restaurantController.createRestaurant);
router.put('/:id', roleCheck(ROLES.ADMIN), restaurantController.updateRestaurant);
router.delete('/:id', roleCheck(ROLES.ADMIN), restaurantController.deleteRestaurant);

module.exports = router;