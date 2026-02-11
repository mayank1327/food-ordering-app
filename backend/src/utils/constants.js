// User Roles
const ROLES = {
    ADMIN: 'ADMIN',
    MANAGER: 'MANAGER',
    MEMBER: 'MEMBER'
  };
  
  // Countries
  const COUNTRIES = {
    INDIA: 'India',
    AMERICA: 'America'
  };
  
  // Order Status
  const ORDER_STATUS = {
    PENDING: 'pending',
    CONFIRMED: 'confirmed',
    CANCELLED: 'cancelled',
    DELIVERED: 'delivered'
  };
  
  // Payment Status
  const PAYMENT_STATUS = {
    UNPAID: 'unpaid',
    PAID: 'paid',
    REFUNDED: 'refunded'
  };
  
  // Payment Types
  const PAYMENT_TYPES = {
    CREDIT_CARD: 'credit_card',
    DEBIT_CARD: 'debit_card',
    UPI: 'upi'
  };
  
  // Menu Categories
  const MENU_CATEGORIES = {
    STARTER: 'Starter',
    MAIN_COURSE: 'Main Course',
    DESSERT: 'Dessert',
    BEVERAGE: 'Beverage'
  };
  
  module.exports = {
    ROLES,
    COUNTRIES,
    ORDER_STATUS,
    PAYMENT_STATUS,
    PAYMENT_TYPES,
    MENU_CATEGORIES
  };