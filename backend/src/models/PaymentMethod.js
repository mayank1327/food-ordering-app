const mongoose = require('mongoose');
const { PAYMENT_TYPES } = require('../utils/constants');

const paymentMethodSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required']
    },
    type: {
      type: String,
      enum: Object.values(PAYMENT_TYPES),
      required: [true, 'Payment type is required']
    },
    cardNumber: {
      type: String,
      required: [true, 'Card number is required'],
      trim: true
    },
    cardHolderName: {
      type: String,
      required: [true, 'Card holder name is required'],
      trim: true
    },
    expiryDate: {
      type: String,
      required: [true, 'Expiry date is required'],
      match: [/^(0[1-9]|1[0-2])\/\d{2}$/, 'Expiry date must be in MM/YY format']
    },
    isDefault: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('PaymentMethod', paymentMethodSchema);