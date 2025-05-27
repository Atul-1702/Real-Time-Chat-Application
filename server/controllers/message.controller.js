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
    data: message,
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

module.exports = {
  sendNewMessage,
  getAllMessages,
};
