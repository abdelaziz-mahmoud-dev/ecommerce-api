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

~~~text
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
~~~

---

## ⚙️ Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- MongoDB
- Docker & Docker Compose (optional)
- Stripe account for payment functionality

---

## 📥 Installation

### 1. Clone the repository

~~~bash
git clone https://github.com/abdelaziz-mahmoud-dev/ecommerce-api.git
cd ecommerce-api
~~~

### 2. Install dependencies

~~~bash
npm install
~~~

### 3. Configure environment variables

Create a `.env` file in the root directory:

~~~env
MONGO_URI=mongodb://localhost:27017/ecommerce-api
PORT=5000
JWT_SECRET=your_jwt_secret_here
STRIPE_SECRET_KEY=your_stripe_secret_key_here
~~~

> ⚠️ Never commit your `.env` file or expose secret keys publicly.

### 4. Start the server

~~~bash
node server.js
~~~

The API will run on:

~~~text
http://localhost:5000
~~~

---

## 🐳 Running with Docker

You can run the application using Docker Compose:

~~~bash
docker-compose up
~~~

To stop the containers:

~~~bash
docker-compose down
~~~

---

# 📚 API Documentation

## 🔐 Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive a JWT token |

---

## 📦 Products

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/products` | Get all products | Public |
| GET | `/api/products/:id` | Get a single product | Public |
| POST | `/api/products` | Create a product | Admin |
| PUT | `/api/products/:id` | Update a product | Admin |
| DELETE | `/api/products/:id` | Delete a product | Admin |

---

## 🛒 Cart

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/cart` | Get user's cart | Private |
| POST | `/api/cart` | Add item to cart | Private |
| PUT | `/api/cart/:productId` | Update item quantity | Private |
| DELETE | `/api/cart/:productId` | Remove item from cart | Private |

---

## 📋 Orders

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/orders` | Create order from cart | Private |
| GET | `/api/orders/myorders` | Get logged-in user's orders | Private |
| GET | `/api/orders/:id` | Get order by ID | Private |
| GET | `/api/orders` | Get all orders | Admin |
| PUT | `/api/orders/:id/status` | Update order status | Admin |
| POST | `/api/orders/:id/create-payment` | Create Stripe payment intent | Private |

---

## 🔑 Authentication Flow

Protected endpoints require a valid JWT token.

~~~text
User
 │
 ├── Register / Login
 │
 ▼
JWT Token
 │
 ▼
Protected API Route
 │
 ▼
Authentication Middleware
 │
 ├── User
 │
 └── Admin
~~~

---

## 🔄 Order Flow

~~~text
Browse Products
       │
       ▼
   Add to Cart
       │
       ▼
   Create Order
       │
       ├── Reduce Stock
       │
       ├── Update Order Status
       │
       └── Create Payment Intent
                │
                ▼
              Stripe
~~~

---

## 🔔 Real-Time Communication

The application uses **Socket.io** to provide real-time order status notifications.

When an order status changes, connected clients can receive updates without continuously polling the API.

---

## 💳 Payment Integration

Stripe is integrated using **Payment Intents**.

The payment flow is:

~~~text
Client
  │
  ▼
Create Order
  │
  ▼
Create Payment Intent
  │
  ▼
Stripe
  │
  ▼
Payment Processing
~~~

---

## 🔒 Security

The API implements several security-related practices:

- JWT authentication
- Role-based authorization
- Password hashing with bcrypt
- Protected private routes
- Admin-only operations
- Environment variables for sensitive configuration

---

## 🧪 API Testing

The API can be tested using tools such as:

- Postman
- Insomnia
- Any REST API client

A typical workflow is:

~~~text
Register
   ↓
Login
   ↓
Receive JWT
   ↓
Use JWT on protected endpoints
   ↓
Manage Cart
   ↓
Create Order
   ↓
Process Payment
~~~

---

## 🚧 Future Improvements

- API validation with Joi/Zod
- Centralized error handling
- API rate limiting
- Swagger/OpenAPI documentation
- Automated testing
- Refresh token authentication
- Product search and filtering
- Pagination
- Image upload and product media management
- CI/CD pipeline
- Production deployment

---

## 👨‍💻 Author

**Abdelaziz Mahmoud**

Computer Science and AI Student at Benha University.

Backend Developer interested in building scalable and production-ready applications.

---

## ⭐ Project Goals

This project was built to practice and demonstrate real-world backend development concepts, including:

- RESTful API design
- Authentication & Authorization
- Database modeling
- Business logic
- Payment integration
- Real-time communication
- Containerization with Docker
- Backend project architecture
