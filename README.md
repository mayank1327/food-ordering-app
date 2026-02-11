# 🍔 Food Ordering App (Full Stack)

A full-stack **Food Ordering Application** built using **React + Node.js + MongoDB**, featuring **JWT Authentication**, **Role-Based Access Control (RBAC)**, and **Country-Based Access Control**.

This repository contains both:

- ✅ **Backend REST API** (Node.js + Express + MongoDB)
- ✅ **Frontend Web Application** (React + Vite)

---

## 🌟 Features

- 🔐 JWT Authentication & Authorization
- 👥 Role-Based Access Control (Admin, Manager, Member)
- 🌍 Country-Based Data Access Filtering (Bonus)
- 🍽️ Restaurant & Menu Management
- 🛒 Cart and Order System
- 💳 Payment Support
- 📦 Clean Backend + Frontend separation

---

## 🚀 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs

### Frontend
- React
- Vite
- React Router DOM
- Axios
- Context API

---

## 📂 Project Structure

```
food-ordering-app/
│
├── backend/                 # Backend REST API
│   └── README.md
│
├── frontend/                # Frontend React App
│   └── README.md
│
└── README.md                # Main documentation
```

---

## ⚙️ Installation & Setup

### ✅ Prerequisites
- Node.js (v16+)
- MongoDB (Local or Atlas)

---

### 1️⃣ Clone Repository

```bash
git clone <your-repo-url>
cd food-ordering-app
```

---

### 2️⃣ Setup Backend

```bash
cd backend
npm install
```

Create `.env` file inside `backend/`:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/food-ordering-app
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:5173
```

Seed database:

```bash
node seed.js
```

Run backend server:

```bash
npm run dev
```

Backend will run on:

📍 `http://localhost:3000`

---

### 3️⃣ Setup Frontend

```bash
cd ../frontend
npm install
npm run dev
```

Frontend will run on:

📍 `http://localhost:5173`

---

## 👥 Test Credentials

All passwords: `password123`

| Role | Email | Country |
|------|-------|---------|
| Admin | nick@avengers.com | America |
| Manager | marvel@avengers.com | India |
| Manager | america@avengers.com | America |
| Member | thanos@avengers.com | India |
| Member | thor@avengers.com | India |
| Member | travis@avengers.com | America |

---

## 📄 Documentation

For detailed documentation:

- 📌 Backend Documentation → `backend/README.md`
- 📌 Frontend Documentation → `frontend/README.md`

---

## 👨‍💻 Author

**Mayank Mehta**  
📧 Email: mayankmehta1327@gmail.com  

---

## 📄 License

ISC
