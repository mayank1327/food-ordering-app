# 🍔 Food Ordering App (Full Stack)

A full-stack **Food Ordering Application** built using **React + Node.js + MongoDB Atlas**, featuring **JWT Authentication**, **Role-Based Access Control (RBAC)**, and **Country-Based Access Control**.

This repository contains both:

- ✅ **Backend REST API** (Node.js + Express + MongoDB Atlas)  
- ✅ **Frontend Web Application** (React + Vite)

---

## 🌐 Live Demo

🚀 Frontend (Vercel): **https://your-frontend-link.vercel.app**  
⚙️ Backend API (Render): **https://your-backend-link.onrender.com**  

> ⚠️ Note: Backend hosted on Render may take **30–50 seconds** to wake up if inactive.

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
- MongoDB Atlas + Mongoose  
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

## ⚙️ Installation & Setup (Local Setup)

### ✅ Prerequisites
- Node.js (v16+)  
- MongoDB Atlas account OR MongoDB Local  

---

## 1️⃣ Clone Repository

```bash
git clone <your-repo-url>
cd food-ordering-app
```

---

## 🔥 Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```env
PORT=3000
NODE_ENV=development

MONGODB_URI=your_mongodb_atlas_connection_string

JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

CORS_ORIGIN=http://localhost:5173
```

Run backend server:

```bash
npm run dev
```

Backend will run on:

📍 `http://localhost:3000`

---

## 🎨 Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

Frontend will run on:

📍 `http://localhost:5173`

---

## 🚀 Deployment Setup

### Backend (Render)

Set these Environment Variables in Render:

```env
PORT=3000
NODE_ENV=production

MONGODB_URI=your_mongodb_atlas_connection_string

JWT_SECRET=your_secret_key
JWT_EXPIRE=7d

CORS_ORIGIN=https://your-frontend-link.vercel.app
```

Start Command (Render):

```bash
npm start
```

---

### Frontend (Vercel)

Set this environment variable in Vercel:

```env
VITE_API_URL=https://your-backend-link.onrender.com
```

Build Command:

```bash
npm run build
```

Output Directory:

```
dist
```

---

## 👥 Test Credentials

All passwords: `password123`

| Role    | Email                | Country  |
|---------|----------------------|----------|
| Admin   | nick@avengers.com    | America  |
| Manager | marvel@avengers.com  | India    |
| Manager | america@avengers.com | America  |
| Member  | thanos@avengers.com  | India    |
| Member  | thor@avengers.com    | India    |
| Member  | travis@avengers.com  | America  |

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

