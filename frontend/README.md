# Food Ordering App - Frontend

React-based frontend for a role-based food ordering application with intuitive UI and real-time role-based access control.

## 🚀 Features

- **User Authentication**: Login system with JWT token management
- **Role-Based UI**: Different features visible based on user role (Admin, Manager, Member)
- **Restaurant Browsing**: View restaurants filtered by user's country
- **Menu Exploration**: Browse menu items with detailed descriptions
- **Shopping Cart**: Add/remove items with quantity management
- **Order Management**: Create, view, place, and cancel orders
- **Real-time Permissions**: UI adapts based on user role and permissions
- **Country Filtering**: Automatic data filtering based on user's country (Bonus feature)

## 🛠️ Tech Stack

- **React** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API calls
- **Context API** - Global state management

## 📂 Project Structure
```
frontend/
├── src/
│   ├── components/
│   │   └── Navbar.jsx           # Navigation bar with user info
│   ├── pages/
│   │   ├── Login.jsx            # Login page
│   │   ├── Restaurants.jsx      # Restaurant listing
│   │   ├── MenuItems.jsx        # Menu items & cart
│   │   └── Orders.jsx           # Order management
│   ├── context/
│   │   └── AuthContext.jsx      # Authentication state
│   ├── services/
│   │   └── api.js               # API service layer
│   ├── utils/
│   │   └── constants.js         # App constants
│   ├── App.jsx                  # Main app component
│   ├── main.jsx                 # Entry point
│   └── index.css                # Global styles
├── .env                         # Environment variables (optional)
├── package.json
└── vite.config.js
```

## ⚙️ Installation

### Prerequisites
- Node.js (v16 or higher)
- Backend server running on `http://localhost:3000`

### Steps

1. **Navigate to frontend directory**
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## 🌐 Available Routes

| Route | Access | Description |
|-------|--------|-------------|
| `/login` | Public | Login page |
| `/restaurants` | Protected | Restaurant listing |
| `/restaurants/:id` | Protected | Menu items & cart |
| `/orders` | Protected | User's orders |

## 👥 Test Accounts

All passwords: `password123`

### Admin (Full Access)
```
Email: nick@avengers.com
Password: password123
Country: America
```

### Manager India
```
Email: marvel@avengers.com
Password: password123
Country: India
- Can see only India restaurants
- Can place & cancel orders
```

### Manager America
```
Email: america@avengers.com
Password: password123
Country: America
- Can see only America restaurants
- Can place & cancel orders
```

### Member India
```
Email: thanos@avengers.com
OR
Email: thor@avengers.com
Password: password123
Country: India
- Can see only India restaurants
- Can create orders but CANNOT place/cancel
```

### Member America
```
Email: travis@avengers.com
Password: password123
Country: America
- Can see only America restaurants
- Can create orders but CANNOT place/cancel
```

## 🎯 User Flow

### 1. Login
- Navigate to login page
- Enter credentials
- Redirects to restaurants page

### 2. Browse Restaurants
- See restaurants from your country only (Bonus feature!)
- Click on restaurant to view menu

### 3. Add to Cart
- View menu items with prices
- Add items to cart with quantity
- See real-time cart total

### 4. Create Order
- Click "Create Order" button
- **All roles** can create orders
- Members see message: "Manager will complete the payment"

### 5. Manage Orders
- View all your orders
- **Admin & Manager only**: Can place order (checkout & pay)
- **Admin & Manager only**: Can cancel orders
- **Members**: Can only view orders

## 🔒 Role-Based Features

### What Everyone Can Do
- ✅ Login/Logout
- ✅ View restaurants (country-filtered)
- ✅ View menu items
- ✅ Add items to cart
- ✅ Create orders

### Manager & Admin Only
- ✅ Place orders (checkout & pay)
- ✅ Cancel orders

### Admin Only
- ✅ Update payment methods
- ✅ Access all countries' data

## 🌍 Bonus Feature Demo

**Country-Based Access Control:**

1. **Login as Manager India** (`marvel@avengers.com`)
   - See restaurants: Taj Restaurant, Spice Garden, Punjab Grill
   - All from India only ✅

2. **Login as Manager America** (`america@avengers.com`)
   - See restaurants: Burger Palace, Pizza Heaven, Taco Fiesta
   - All from America only ✅

3. **Login as Admin** (`nick@avengers.com`)
   - See ALL restaurants from both countries ✅

## 🎨 UI Features

- **Responsive Design**: Works on desktop and mobile
- **Clean Interface**: Simple, intuitive navigation
- **Role Indicators**: Shows user role and country in navbar
- **Status Badges**: Visual order status (Pending, Confirmed, Cancelled)
- **Interactive Cart**: Real-time quantity updates
- **Permission Messages**: Clear feedback when action is restricted

## 🔄 State Management

**AuthContext** manages:
- User authentication state
- JWT token storage
- Login/logout functionality
- User profile data

**Local State** in components:
- Cart items
- Loading states
- Error messages

## 📡 API Integration

All API calls go through `src/services/api.js`:
```javascript
// Automatic token injection
Authorization: Bearer <token>

// Centralized error handling
// Base URL configuration
```

## 🧪 Testing the App

### Test RBAC (Role-Based Access Control)

1. **Login as Member** (`thanos@avengers.com`)
   - Create an order
   - Try to place order → Should see "Only Manager/Admin can place this order" ✅

2. **Login as Manager** (`marvel@avengers.com`)
   - Create an order
   - Place order → Should work ✅
   - Cancel order → Should work ✅

3. **Login as Admin** (`nick@avengers.com`)
   - Can do everything ✅

### Test Country Filter (Bonus)

1. **Login as India Manager** → See only 3 India restaurants
2. **Logout and login as America Manager** → See only 3 America restaurants
3. **Login as Admin** → See all 6 restaurants

## 🚀 Build for Production
```bash
npm run build
```

Generates optimized production build in `dist/` folder.

## 📦 Dependencies
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.20.0",
  "axios": "^1.6.2"
}
```

## 🔧 Configuration

API base URL is configured in `src/utils/constants.js`:
```javascript
export const API_URL = 'http://localhost:3000/api';
```

Change this for production deployment.

## 📱 Screenshots

### Login Page
- Clean login form
- Test credentials displayed
- Error messages on failed login

### Restaurants Page
- Grid layout of restaurant cards
- Restaurant details (name, cuisine, rating, location)
- Click to view menu

### Menu Items Page
- Two-column layout (menu + cart)
- Add to cart functionality
- Real-time cart updates
- Total calculation

### Orders Page
- List of all orders
- Order details and status
- Action buttons based on role
- Permission messages

## 👨‍💻 Author

**Mayank Mehta**
- Email: mayankmehta1327@gmail.com
- GitHub: [Your GitHub]
- Backend Engineer specializing in Node.js, Express, MongoDB

## 📄 License

ISC

## 🔗 Related

- [Backend Repository](../backend)
- API runs on: `http://localhost:3000`