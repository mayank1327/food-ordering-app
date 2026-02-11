require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');
const Restaurant = require('./src/models/Restaurant');
const MenuItem = require('./src/models/MenuItem');
const PaymentMethod = require('./src/models/PaymentMethod');
const { ROLES, COUNTRIES, MENU_CATEGORIES, PAYMENT_TYPES } = require('./src/utils/constants');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

// Users Data
const users = [
  {
    name: 'Nick Fury',
    email: 'nick@avengers.com',
    password: 'password123',
    role: ROLES.ADMIN,
    country: COUNTRIES.AMERICA
  },
  {
    name: 'Captain Marvel',
    email: 'marvel@avengers.com',
    password: 'password123',
    role: ROLES.MANAGER,
    country: COUNTRIES.INDIA
  },
  {
    name: 'Captain America',
    email: 'america@avengers.com',
    password: 'password123',
    role: ROLES.MANAGER,
    country: COUNTRIES.AMERICA
  },
  {
    name: 'Thanos',
    email: 'thanos@avengers.com',
    password: 'password123',
    role: ROLES.MEMBER,
    country: COUNTRIES.INDIA
  },
  {
    name: 'Thor',
    email: 'thor@avengers.com',
    password: 'password123',
    role: ROLES.MEMBER,
    country: COUNTRIES.INDIA
  },
  {
    name: 'Travis',
    email: 'travis@avengers.com',
    password: 'password123',
    role: ROLES.MEMBER,
    country: COUNTRIES.AMERICA
  }
];

// Restaurants Data
const restaurants = [
  // India Restaurants
  {
    name: 'Taj Restaurant',
    description: 'Authentic Indian Cuisine with royal flavors',
    address: 'Mumbai, Maharashtra',
    country: COUNTRIES.INDIA,
    cuisine: 'Indian',
    rating: 4.5
  },
  {
    name: 'Spice Garden',
    description: 'Traditional South Indian delicacies',
    address: 'Bangalore, Karnataka',
    country: COUNTRIES.INDIA,
    cuisine: 'South Indian',
    rating: 4.3
  },
  {
    name: 'Punjab Grill',
    description: 'North Indian specialties and tandoor items',
    address: 'Delhi, NCR',
    country: COUNTRIES.INDIA,
    cuisine: 'North Indian',
    rating: 4.6
  },
  // America Restaurants
  {
    name: 'Burger Palace',
    description: 'Gourmet burgers and American classics',
    address: 'New York, NY',
    country: COUNTRIES.AMERICA,
    cuisine: 'American',
    rating: 4.4
  },
  {
    name: 'Pizza Heaven',
    description: 'Wood-fired authentic Italian pizzas',
    address: 'Chicago, IL',
    country: COUNTRIES.AMERICA,
    cuisine: 'Italian',
    rating: 4.7
  },
  {
    name: 'Taco Fiesta',
    description: 'Mexican street food and tacos',
    address: 'Los Angeles, CA',
    country: COUNTRIES.AMERICA,
    cuisine: 'Mexican',
    rating: 4.2
  }
];

// Menu Items will be added after restaurants are created
const getMenuItems = (restaurantIds) => [
  // Taj Restaurant (India) - restaurantIds[0]
  {
    restaurantId: restaurantIds[0],
    name: 'Chicken Biryani',
    description: 'Fragrant basmati rice with tender chicken',
    price: 350,
    category: MENU_CATEGORIES.MAIN_COURSE,
    isVeg: false
  },
  {
    restaurantId: restaurantIds[0],
    name: 'Paneer Butter Masala',
    description: 'Cottage cheese in rich tomato gravy',
    price: 280,
    category: MENU_CATEGORIES.MAIN_COURSE,
    isVeg: true
  },
  {
    restaurantId: restaurantIds[0],
    name: 'Gulab Jamun',
    description: 'Sweet milk dumplings in sugar syrup',
    price: 80,
    category: MENU_CATEGORIES.DESSERT,
    isVeg: true
  },
  // Spice Garden (India) - restaurantIds[1]
  {
    restaurantId: restaurantIds[1],
    name: 'Masala Dosa',
    description: 'Crispy rice crepe with potato filling',
    price: 120,
    category: MENU_CATEGORIES.MAIN_COURSE,
    isVeg: true
  },
  {
    restaurantId: restaurantIds[1],
    name: 'Idli Sambar',
    description: 'Steamed rice cakes with lentil soup',
    price: 100,
    category: MENU_CATEGORIES.MAIN_COURSE,
    isVeg: true
  },
  {
    restaurantId: restaurantIds[1],
    name: 'Filter Coffee',
    description: 'Traditional South Indian coffee',
    price: 50,
    category: MENU_CATEGORIES.BEVERAGE,
    isVeg: true
  },
  // Punjab Grill (India) - restaurantIds[2]
  {
    restaurantId: restaurantIds[2],
    name: 'Tandoori Chicken',
    description: 'Char-grilled chicken marinated in spices',
    price: 400,
    category: MENU_CATEGORIES.MAIN_COURSE,
    isVeg: false
  },
  {
    restaurantId: restaurantIds[2],
    name: 'Dal Makhani',
    description: 'Creamy black lentils slow-cooked overnight',
    price: 250,
    category: MENU_CATEGORIES.MAIN_COURSE,
    isVeg: true
  },
  // Burger Palace (America) - restaurantIds[3]
  {
    restaurantId: restaurantIds[3],
    name: 'Classic Cheeseburger',
    description: 'Beef patty with cheddar and lettuce',
    price: 12,
    category: MENU_CATEGORIES.MAIN_COURSE,
    isVeg: false
  },
  {
    restaurantId: restaurantIds[3],
    name: 'Veggie Burger',
    description: 'Plant-based patty with avocado',
    price: 10,
    category: MENU_CATEGORIES.MAIN_COURSE,
    isVeg: true
  },
  {
    restaurantId: restaurantIds[3],
    name: 'French Fries',
    description: 'Crispy golden fries',
    price: 5,
    category: MENU_CATEGORIES.STARTER,
    isVeg: true
  },
  // Pizza Heaven (America) - restaurantIds[4]
  {
    restaurantId: restaurantIds[4],
    name: 'Margherita Pizza',
    description: 'Fresh mozzarella and basil',
    price: 15,
    category: MENU_CATEGORIES.MAIN_COURSE,
    isVeg: true
  },
  {
    restaurantId: restaurantIds[4],
    name: 'Pepperoni Pizza',
    description: 'Classic pepperoni and cheese',
    price: 18,
    category: MENU_CATEGORIES.MAIN_COURSE,
    isVeg: false
  },
  {
    restaurantId: restaurantIds[4],
    name: 'Garlic Bread',
    description: 'Toasted bread with garlic butter',
    price: 6,
    category: MENU_CATEGORIES.STARTER,
    isVeg: true
  },
  // Taco Fiesta (America) - restaurantIds[5]
  {
    restaurantId: restaurantIds[5],
    name: 'Chicken Tacos',
    description: 'Three soft tacos with grilled chicken',
    price: 10,
    category: MENU_CATEGORIES.MAIN_COURSE,
    isVeg: false
  },
  {
    restaurantId: restaurantIds[5],
    name: 'Veggie Burrito',
    description: 'Rice, beans, and vegetables wrapped',
    price: 9,
    category: MENU_CATEGORIES.MAIN_COURSE,
    isVeg: true
  },
  {
    restaurantId: restaurantIds[5],
    name: 'Churros',
    description: 'Fried dough with chocolate sauce',
    price: 7,
    category: MENU_CATEGORIES.DESSERT,
    isVeg: true
  }
];

// Payment Methods (for Admin)
const getPaymentMethods = (adminUserId) => [
  {
    userId: adminUserId,
    type: PAYMENT_TYPES.CREDIT_CARD,
    cardNumber: '****4242',
    cardHolderName: 'Nick Fury',
    expiryDate: '12/25',
    isDefault: true
  },
  {
    userId: adminUserId,
    type: PAYMENT_TYPES.DEBIT_CARD,
    cardNumber: '****5678',
    cardHolderName: 'Nick Fury',
    expiryDate: '10/26',
    isDefault: false
  }
];

const seedData = async () => {
  try {
    // Connect to database
    await connectDB();

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await User.deleteMany({});
    await Restaurant.deleteMany({});
    await MenuItem.deleteMany({});
    await PaymentMethod.deleteMany({});
    console.log('✅ Existing data cleared');

    // Create Users
    console.log('👥 Creating users...');
    const createdUsers = await User.create(users);
    console.log(`✅ ${createdUsers.length} users created`);

    // Get Admin user ID
    const adminUser = createdUsers.find(u => u.role === ROLES.ADMIN);

    // Create Restaurants
    console.log('🍽️  Creating restaurants...');
    const createdRestaurants = await Restaurant.insertMany(restaurants);
    console.log(`✅ ${createdRestaurants.length} restaurants created`);

    // Create Menu Items
    console.log('🍕 Creating menu items...');
    const restaurantIds = createdRestaurants.map(r => r._id);
    const menuItems = getMenuItems(restaurantIds);
    const createdMenuItems = await MenuItem.insertMany(menuItems);
    console.log(`✅ ${createdMenuItems.length} menu items created`);

    // Create Payment Methods
    console.log('💳 Creating payment methods...');
    const paymentMethods = getPaymentMethods(adminUser._id);
    const createdPaymentMethods = await PaymentMethod.insertMany(paymentMethods);
    console.log(`✅ ${createdPaymentMethods.length} payment methods created`);

    console.log('\n🎉 SEEDING COMPLETED SUCCESSFULLY!\n');
    console.log('📋 Summary:');
    console.log(`   Users: ${createdUsers.length}`);
    console.log(`   Restaurants: ${createdRestaurants.length}`);
    console.log(`   Menu Items: ${createdMenuItems.length}`);
    console.log(`   Payment Methods: ${createdPaymentMethods.length}`);
    console.log('\n🔐 Login Credentials (all passwords: password123):');
    console.log('   Admin: nick@avengers.com');
    console.log('   Manager India: marvel@avengers.com');
    console.log('   Manager America: america@avengers.com');
    console.log('   Member India: thanos@avengers.com / thor@avengers.com');
    console.log('   Member America: travis@avengers.com');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding Error:', error);
    process.exit(1);
  }
};

// Run seed
seedData();