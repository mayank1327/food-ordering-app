# Food Ordering App - Backend

RESTful API backend for a role-based food ordering application with country-based access control.

## 🚀 Features

- **Authentication & Authorization**: JWT-based auth with role-based access control (RBAC)
- **Role Management**: Admin, Manager, and Member roles with different permissions
- **Country-Based Access Control (Bonus)**: Managers and Members can only access data from their country
- **Restaurant Management**: CRUD operations for restaurants
- **Menu Items**: Menu management linked to restaurants
- **Order System**: Create, place, and cancel orders with role-based restrictions
- **Payment Methods**: Payment method management

## 🛠️ Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing

## 📂 Project Structure
```
bakcend/
├── src/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── models/                  # Mongoose schemas
│   │   ├── User.js
│   │   ├── Restaurant.js
│   │   ├── MenuItem.js
│   │   ├── Order.js
│   │   └── PaymentMethod.js
│   ├── controllers/             # Request handlers
│   ├── services/                # Business logic
│   ├── middleware/              # Auth & RBAC middleware
│   ├── routes/                  # API routes
│   ├── utils/                   # Helper functions
│   └── app.js                   # Express app setup
├── .env                         # Environment variables
├── server.js                    # Entry point
├── seed.js                      # Database seeding
└── package.json
```

## ⚙️ Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (running locally or Atlas URI)

### Steps

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**

Create `.env` file in root:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/food-ordering-app
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:5173
```

4. **Start MongoDB**
```bash
mongod
```

5. **Seed the database**
```bash
node seed.js
```

6. **Start the server**
```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

Server will run on `http://localhost:3000`

## 👥 Test Users

All passwords: `password123`

| Role | Email | Country |
|------|-------|---------|
| Admin | nick@avengers.com | America |
| Manager | marvel@avengers.com | India |
| Manager | america@avengers.com | America |
| Member | thanos@avengers.com | India |
| Member | thor@avengers.com | India |
| Member | travis@avengers.com | America |

## 📡 API Endpoints

### Authentication
```
POST   /api/auth/register    - Register new user
POST   /api/auth/login       - Login user
GET    /api/auth/profile     - Get user profile (Protected)
```

### Restaurants
```
GET    /api/restaurants      - Get all restaurants (Protected, Country-filtered)
GET    /api/restaurants/:id  - Get single restaurant (Protected, Country-filtered)
POST   /api/restaurants      - Create restaurant (Admin only)
PUT    /api/restaurants/:id  - Update restaurant (Admin only)
DELETE /api/restaurants/:id  - Delete restaurant (Admin only)
```

### Menu Items
```
GET    /api/menu-items/restaurant/:restaurantId  - Get menu items by restaurant (Protected)
GET    /api/menu-items/:id                       - Get single menu item (Protected)
POST   /api/menu-items                           - Create menu item (Admin only)
PUT    /api/menu-items/:id                       - Update menu item (Admin only)
DELETE /api/menu-items/:id                       - Delete menu item (Admin only)
```

### Orders
```
GET    /api/orders           - Get all orders (Protected, Country-filtered)
GET    /api/orders/:id       - Get single order (Protected, Country-filtered)
POST   /api/orders           - Create order (Protected - All roles)
POST   /api/orders/:id/place - Place order & pay (Admin & Manager only)
POST   /api/orders/:id/cancel - Cancel order (Admin & Manager only)
```

### Payments
```
GET    /api/payments         - Get payment methods (Protected)
GET    /api/payments/:id     - Get single payment method (Protected)
POST   /api/payments         - Add payment method (Protected)
PUT    /api/payments/:id     - Update payment method (Admin only)
DELETE /api/payments/:id     - Delete payment method (Admin only)
```

## 🔒 RBAC (Role-Based Access Control)

| Feature | Admin | Manager | Member |
|---------|-------|---------|--------|
| View restaurants & menu items | ✅ | ✅ | ✅ |
| Create order (add to cart) | ✅ | ✅ | ✅ |
| Place order (checkout & pay) | ✅ | ✅ | ❌ |
| Cancel order | ✅ | ✅ | ❌ |
| Update payment method | ✅ | ❌ | ❌ |

## 🌍 Bonus: Country-Based Access Control

- **Admin**: Can access all countries' data
- **Manager**: Can only access data from their country
- **Member**: Can only access data from their country

**Example:**
- Manager India (marvel@avengers.com) can only see restaurants in India
- Manager America (america@avengers.com) can only see restaurants in America

## 🧪 Testing with Postman

1. **Login** to get JWT token
```json
POST http://localhost:5000/api/auth/login
{
  "email": "marvel@avengers.com",
  "password": "password123"
}
```

2. **Copy the token** from response

3. **Add to headers** in all protected routes:
```
Authorization: Bearer <your-token>
```

## 📝 Sample API Requests

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"marvel@avengers.com","password":"password123"}'
```

### Get Restaurants (Protected)
```bash
curl -X GET http://localhost:3000/api/restaurants \
  -H "Authorization: Bearer <your-token>"
```

### Create Order
```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Authorization: Bearer <your-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "restaurantId": "<restaurant-id>",
    "items": [
      {"menuItemId": "<menu-item-id>", "quantity": 2}
    ]
  }'
```

## 🏗️ Architecture

**Layered Architecture:**
```
Controllers → Services → Models → Database
     ↑
Middleware (Auth, RBAC, Error Handling)
```

**Key Design Patterns:**
- MVC (Model-View-Controller)
- Dependency Injection
- Middleware Pattern
- Repository Pattern (Models)

## 🔐 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Role-based authorization
- Country-based data isolation
- Input validation
- Error handling middleware

## 📦 Dependencies
```json
{
  "express": "^4.18.2",
  "mongoose": "^8.0.3",
  "bcryptjs": "^2.4.3",
  "jsonwebtoken": "^9.0.2",
  "dotenv": "^16.4.5",
  "cors": "^2.8.5"
}
```

## 👨‍💻 Author

**Mayank Mehta**
- Email: mayankmehta1327@gmail.com
- GitHub: [Your GitHub]
- LeetCode: Top 8.72% (650+ problems solved)

## 📄 License

ISC