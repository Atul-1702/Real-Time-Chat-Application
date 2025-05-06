const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    members: [
      { type: mongoose.SchemaTypes.ObjectId, ref: "Users", required: true },
    ],
    lastMessage: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Messages",
    },
    unreadMessageCount: {
      type: Number,
      default: 0,
      min: [0, "Min length of unread message count should not be negative."],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chat", chatSchema);
