require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors'); // 1. استدعاء cors
const connectDB = require('./config/db');
const { initSocket } = require('./config/socket');

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

connectDB();

// 2. تفعيل الـ CORS لتسمح للـ Frontend بالاتصال
app.use(cors()); 

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

const server = http.createServer(app);
initSocket(server);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));