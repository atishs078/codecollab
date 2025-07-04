const { Server } = require("socket.io");
const roomUsers = {}
const registerSocketServer = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*", // OR your frontend URL
      methods: ["GET", "POST"]
    }
  });

  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    socket.on("join-room", ({ roomId, userName }) => {
  socket.join(roomId);
  console.log(`Socket ${socket.id} joined room ${roomId} as ${userName}`);

  // ✅ Check if user already exists in room
  if (!roomUsers[roomId]) roomUsers[roomId] = [];

  const alreadyJoined = roomUsers[roomId].some(u => u.socketId === socket.id);
  if (!alreadyJoined) {
    roomUsers[roomId].push({ socketId: socket.id, userName });
  }

  io.to(roomId).emit("room-users", roomUsers[roomId]);
});

    socket.on("code-change", ({ roomId, code }) => {
      socket.to(roomId).emit("code-update", code);
    });

    socket.on("disconnect", () => {
      for (const roomId in roomUsers) {
        const prevLength = roomUsers[roomId].length;
        roomUsers[roomId] = roomUsers[roomId].filter(u => u.socketId !== socket.id);

        // If user was removed, notify
        if (roomUsers[roomId].length !== prevLength) {
          io.to(roomId).emit("room-users", roomUsers[roomId]);
        }
      }

      console.log("Client disconnected:", socket.id);
    });
  });
};

module.exports = registerSocketServer;
