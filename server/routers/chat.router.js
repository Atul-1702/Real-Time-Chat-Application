const express = require("express");
const {
  getAllChats,
  createNewChat,
} = require("../controllers/chat.controlller");
const asyncFuncErrorHandler = require("../utils/asyncFuncErrorHandler");

const chatRouter = express.Router();

chatRouter.get("/get-all-chats", asyncFuncErrorHandler(getAllChats));
chatRouter.post("/create-new-chat", asyncFuncErrorHandler(createNewChat));

module.exports = chatRouter;
