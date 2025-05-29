const {
  sendNewMessage,
  getAllMessages,
  readAllMessages,
} = require("../controllers/message.controller");
const asyncFuncErrorHandler = require("../utils/asyncFuncErrorHandler");

const messageRouter = require("express").Router();

messageRouter.post("/send-message", asyncFuncErrorHandler(sendNewMessage));
messageRouter.get(
  "/get-all-messages/:chatId",
  asyncFuncErrorHandler(getAllMessages)
);

messageRouter.post(
  "/read-all-messages",
  asyncFuncErrorHandler(readAllMessages)
);

module.exports = messageRouter;
