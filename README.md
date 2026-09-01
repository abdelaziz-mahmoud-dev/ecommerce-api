# E-Commerce API

A full-featured E-Commerce backend REST API built with Node.js, Express, and MongoDB. Includes authentication, product management, shopping cart, order processing, real-time notifications, payment integration, and Docker support.

## Features

- **Authentication & Authorization** — JWT-based auth with role-based access control (User/Admin)
- **Product Management** — Full CRUD operations, admin-protected routes
- **Shopping Cart** — Add, update, remove items with automatic price calculation
- **Order Management** — Create orders from cart, track status, automatic stock reduction
- **Real-time Notifications** — WebSocket integration (Socket.io) for live order status updates
- **Payment Integration** — Stripe payment intent creation
- **Dockerized** — Fully containerized with Docker and Docker Compose

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (jsonwebtoken), bcryptjs
- **Real-time:** Socket.io
- **Payments:** Stripe
- **Containerization:** Docker, Docker Compose

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB running locally (or use the Docker setup below)
- Stripe account (for payment features)

### Installation

1. Clone the repository
```bash
git clone https://github.com/abdelaziz-mahmoud-dev/ecommerce-api.git
cd ecommerce-api
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory:

MONGO_URI=mongodb://localhost:27017/ecommerce-api
PORT=5000
JWT_SECRET=your_jwt_secret_here
STRIPE_SECRET_KEY=your_stripe_secret_key_here


4. Run the server
```bash
node server.js
```

### Running with Docker

```bash
docker-compose up
```

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|--------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive JWT token |

### Products
| Method | Endpoint | Description | Access |
|--------|----------|--------------|--------|
| GET | `/api/products` | Get all products | Public |
| GET | `/api/products/:id` | Get single product | Public |
| POST | `/api/products` | Create product | Admin |
| PUT | `/api/products/:id` | Update product | Admin |
| DELETE | `/api/products/:id` | Delete product | Admin |

### Cart
| Method | Endpoint | Description | Access |
|--------|----------|--------------|--------|
| GET | `/api/cart` | Get user's cart | Private |
| POST | `/api/cart` | Add item to cart | Private |
| PUT | `/api/cart/:productId` | Update item quantity | Private |
| DELETE | `/api/cart/:productId` | Remove item from cart | Private |

### Orders
| Method | Endpoint | Description | Access |
|--------|----------|--------------|--------|
| POST | `/api/orders` | Create order from cart | Private |
| GET | `/api/orders/myorders` | Get logged-in user's orders | Private |
| GET | `/api/orders/:id` | Get order by ID | Private |
| GET | `/api/orders` | Get all orders | Admin |
| PUT | `/api/orders/:id/status` | Update order status | Admin |
| POST | `/api/orders/:id/create-payment` | Create Stripe payment intent | Private |

## Author

**Abdelaziz Mahmoud**
Computer Science and AI student at Benha University
[LinkedIn](https://linkedin.com/in/abdelazizmahmoudcs)