const mongoose = require('mongoose');
const { COUNTRIES } = require('../utils/constants');

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Restaurant name is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      maxlength: [500, 'Description cannot exceed 500 characters']
    },
    address: {
      type: String,
      required: [true, 'Address is required']
    },
    country: {
      type: String,
      enum: Object.values(COUNTRIES),
      required: [true, 'Country is required']
    },
    cuisine: {
      type: String,
      required: [true, 'Cuisine type is required']
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Restaurant', restaurantSchema);