const chatCollection = require("../models/chat.model");

async function createNewChat(request, response) {
  const { members } = request.body;
  const data = await chatCollection.create({ members });
  return response.status(200).json({
    success: true,
    message: "Chat created successfully.",
    data,
  });
}

async function getAllChats(request, response) {
  const allUserChats = await chatCollection
    .find({
      members: { $in: request.body.userId },
    })
    .populate("members")
    .populate("lastMessage")
    .sort({ updatedAt: -1 });

  return response.status(200).json({
    success: true,
    message: "All chats fetched successfully.",
    data: allUserChats,
  });
}

module.exports = {
  getAllChats,
  createNewChat,
};
