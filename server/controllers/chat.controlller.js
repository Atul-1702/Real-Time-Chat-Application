const chatCollection = require("../models/chat.model");

async function getAllChats(request, response) {
  const allUserChats = await chatCollection.find({
    members: { $in: request.body.userId },
  });

  return response.status(200).json({
    success: true,
    message: "All chats fetched successfully",
    data: allUserChats,
  });
}

module.exports = {
  getAllChats,
};
