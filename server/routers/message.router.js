const {
  sendNewMessage,
  getAllMessages,
} = require("../controllers/message.controller");
const asyncFuncErrorHandler = require("../utils/asyncFuncErrorHandler");

const messageRouter = require("express").Router();

messageRouter.post("/send-message", asyncFuncErrorHandler(sendNewMessage));
messageRouter.get(
  "/get-all-messages/:chatId",
  asyncFuncErrorHandler(getAllMessages)
);

module.exports = messageRouter;
