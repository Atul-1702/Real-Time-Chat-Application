const express = require("express");
const authRouter = require("./routers/auth.router");
const userRouter = require("./routers/user.router");
const { globalErrorHandler } = require("./controllers/errors.controller");

const app = express();

app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use(globalErrorHandler);

module.exports = app;
