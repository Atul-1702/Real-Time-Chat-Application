const messageCollection = require("../models/message.model");
const chatCollection = require("../models/chat.model");

async function sendNewMessage(req, res) {
  const message = await messageCollection.create(req.body);

  const currentChat = await chatCollection.findOneAndUpdate(
    {
      _id: req.body.chatId,
    },
    {
      lastMessage: message._id,
      $inc: { unreadMessageCount: 1 },
    }
  );

  return res.status(200).json({
    success: true,
    message: "Message send successfully.",
    data: currentChat,
  });
}

async function getAllMessages(request, response) {
  const data = await messageCollection.find({ chatId: request.params.chatId });

  return response.status(200).json({
    success: true,
    message: "Message fetched successfully.",
    data,
  });
}

async function readAllMessages(req, res) {
  const updatedChat = await chatCollection.findByIdAndUpdate(req.body.chatId, {
    unreadMessageCount: 0,
  });

  const messageRead = await messageCollection.updateMany(
    {
      chatId: req.body.chatId,
    },
    { read: true }
  );

  return res.status(200).json({
    success: true,
    message: "Message read successfully.",
    data: messageRead,
  });
}

module.exports = {
  sendNewMessage,
  getAllMessages,
  readAllMessages,
};
