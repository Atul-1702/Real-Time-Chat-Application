const express = require("express");
const { getAllChats } = require("../controllers/chat.controlller");
const asyncFuncErrorHandler = require("../utils/asyncFuncErrorHandler");

const chatRouter = express.Router();

chatRouter.get("/get-all-chats", asyncFuncErrorHandler(getAllChats));

module.exports = chatRouter;
