const { Server } = require('socket.io');

let io;

// خريطة بتربط userId بالـ socket بتاعه
const userSockets = new Map();

const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: '*', // مؤقتًا مفتوح للكل، هنضيقها بعدين لو حبيت
    },
  });

  io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    // الفرونت إند هيبعت الـ userId بتاعه بعد ما يعمل Login
    socket.on('register', (userId) => {
      userSockets.set(userId, socket.id);
      console.log(`User ${userId} registered with socket ${socket.id}`);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
      // نشيله من الخريطة لو كان مسجل
      for (const [userId, socketId] of userSockets.entries()) {
        if (socketId === socket.id) {
          userSockets.delete(userId);
          break;
        }
      }
    });
  });
};

// دالة هنستخدمها في أي مكان في المشروع عشان نبعت إشعار ليوزر معين
const sendNotificationToUser = (userId, event, data) => {
  const socketId = userSockets.get(userId.toString());
  if (socketId && io) {
    io.to(socketId).emit(event, data);
  }
};

module.exports = { initSocket, sendNotificationToUser };