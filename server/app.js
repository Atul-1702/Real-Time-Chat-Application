const express = require("express");
const cors = require("cors");
const authRouter = require("./routers/auth.router");
const userRouter = require("./routers/user.router");
const { globalErrorHandler } = require("./controllers/errors.controller");
const chatRouter = require("./routers/chat.router");
const AuthMiddleware = require("./middlewares/auth.middleware");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/chat", AuthMiddleware, chatRouter);
app.use(globalErrorHandler);

module.exports = app;
