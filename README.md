# 🛒 E-Commerce REST API

A production-oriented E-Commerce REST API built with **Node.js, Express.js, and MongoDB**.

This project provides authentication and authorization, product management, shopping cart functionality, order processing, real-time order notifications, Stripe payment integration, and Docker support.

---

## 🚀 Features

### 🔐 Authentication & Authorization

- User registration and login
- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control
- User and Admin permissions

### 📦 Product Management

- Create, read, update, and delete products
- Admin-protected product management
- Public product browsing
- Individual product retrieval

### 🛒 Shopping Cart

- Add products to cart
- Update product quantities
- Remove products from cart
- Automatic price calculation
- User-specific carts

### 📋 Order Management

- Create orders directly from the shopping cart
- Retrieve user's orders
- Retrieve individual orders
- Admin order management
- Order status updates
- Automatic stock reduction

### 🔔 Real-Time Notifications

- Real-time order status updates
- WebSocket communication using Socket.io

### 💳 Payments

- Stripe Payment Intent integration
- Payment creation for orders

### 🐳 Docker Support

- Dockerized application
- Docker Compose configuration
- Containerized development environment

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Node.js** | JavaScript Runtime |
| **Express.js** | REST API Framework |
| **MongoDB** | NoSQL Database |
| **Mongoose** | MongoDB ODM |
| **JWT** | Authentication |
| **bcryptjs** | Password Hashing |
| **Socket.io** | Real-Time Communication |
| **Stripe** | Payment Processing |
| **Docker** | Containerization |
| **Docker Compose** | Multi-Container Management |

---

## 📁 Project Structure

```text
ecommerce-api/
│
├── config/
│   └── Database configuration
│
├── controllers/
│   └── Business logic
│
├── middleware/
│   └── Authentication, authorization and request middleware
│
├── models/
│   └── MongoDB/Mongoose models
│
├── routes/
│   └── API route definitions
│
├── utils/
│   └── Utility functions
│
├── Dockerfile
├── docker-compose.yml
├── package.json
├── package-lock.json
├── server.js
└── README.md
