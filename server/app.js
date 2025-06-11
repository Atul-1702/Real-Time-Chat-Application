const express = require("express");
const cors = require("cors");
const authRouter = require("./routers/auth.router");
const userRouter = require("./routers/user.router");
const { globalErrorHandler } = require("./controllers/errors.controller");
const chatRouter = require("./routers/chat.router");
const AuthMiddleware = require("./middlewares/auth.middleware");
const messageRouter = require("./routers/message.router");

const app = express();

const server = require("http").createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("join-room", (data) => {
    socket.join(data.userId);
  });

  socket.on("send-message", (message) => {
    io.to(message.members[0])
      .to(message.members[1])
      .emit("received-message", message);
  });
});

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/chat", AuthMiddleware, chatRouter);
app.use("/api/message", AuthMiddleware, messageRouter);
app.use(globalErrorHandler);

module.exports = server;
